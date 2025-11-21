const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Helper function to generate ID from name
function generateId(name) {
  return name
    .toLowerCase()
    .replace(/^the\s+/i, '') // Remove "The " prefix
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to generate image path from name
function generateImagePath(name, subtitle) {
  // Remove "The " prefix and space, but we'll add it back to the filename
  let baseName = name.replace(/^The\s+/i, '');
  
  // Combine name and subtitle, remove special characters but keep apostrophes
  // Then add "The" back at the beginning if the original name had it
  let fullName = subtitle 
    ? `${baseName}${subtitle}`.replace(/[^a-zA-Z0-9\s']/g, '').replace(/\s+/g, '')
    : baseName.replace(/[^a-zA-Z0-9\s']/g, '').replace(/\s+/g, '');
  
  // Add "The" prefix back if original name started with "The"
  if (name.match(/^The\s+/i)) {
    fullName = 'The' + fullName;
  }
  
  return `/images/rentals/${fullName}.jpg`;
}

// Helper function to generate additional image paths (for numbered variants)
function generateAdditionalImagePath(basePath, number) {
  // Convert "/images/rentals/TheFiore6'ItalianTiledWhiteBar.jpg" 
  // to "/images/rentals/TheFiore6'ItalianTiledWhiteBar2.jpg"
  return basePath.replace(/\.jpg$/, `${number}.jpg`);
}

// Helper to clean text
function cleanText(text) {
  if (!text || typeof text !== 'string') return '';
  return text.trim();
}

// Helper function to separate dimensions from additional notes
function parseDimensions(dimensionsText) {
  if (!dimensionsText || typeof dimensionsText !== 'string') {
    return { dimensions: '', dimensionsNote: '' };
  }
  
  const text = dimensionsText.trim();
  
  // More precise patterns to match measurements
  // Match patterns like "Height: 44 in" or "H 44" or "Height 44 in"
  const measurementPatterns = [
    /\b(?:Height|H)\s*:?\s*[\d.]+(?:\s*(?:in|ft|cm|m))?\b/gi,
    /\b(?:Width|W)\s*:?\s*[\d.]+(?:\s*(?:in|ft|cm|m))?\b/gi,
    /\b(?:Length|L)\s*:?\s*[\d.]+(?:\s*(?:in|ft|cm|m))?\b/gi,
    /\b(?:Diameter|Diam)\s*:?\s*[\d.]+(?:\s*(?:in|ft|cm|m))?\b/gi,
    /\b(?:Depth|D)\s*:?\s*[\d.]+(?:\s*(?:in|ft|cm|m))?\b/gi,
    /\b[\d.]+(?:\s*(?:in|ft|cm|m))?\s*x\s*[\d.]+(?:\s*(?:in|ft|cm|m))?\b/gi, // Format like "8x8" or "4 ft x 8 ft"
    /\b[\d.]+\s*(?:Quart|qt|Gallon|gal|Liters?|L)\b/gi, // Volume measurements
  ];
  
  // Extract all measurements with their positions
  const measurementMatches = [];
  measurementPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      measurementMatches.push({
        text: match[0],
        index: match.index,
        length: match[0].length
      });
    }
  });
  
  // Sort by position and remove overlapping/duplicate matches
  measurementMatches.sort((a, b) => a.index - b.index);
  const uniqueMeasurements = [];
  let lastEnd = -1;
  
  measurementMatches.forEach(match => {
    // Only add if it doesn't overlap with previous match
    if (match.index >= lastEnd) {
      uniqueMeasurements.push(match.text.trim());
      lastEnd = match.index + match.length;
    }
  });
  
  // Format measurements: remove space between number and unit
  const formattedMeasurements = uniqueMeasurements.map(measurement => {
    // Remove space between number and unit (e.g., "44 in" -> "44in")
    return measurement.replace(/([\d.]+)\s+(in|ft|cm|m)\b/gi, '$1$2');
  });
  
  // Build the dimensions string with proper formatting
  const dimensions = formattedMeasurements.join(' ');
  
  // Get the rest of the text as notes
  let notes = text;
  uniqueMeasurements.forEach(measurement => {
    // Remove the measurement from notes, being careful with word boundaries
    const escapedMeasurement = measurement.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    notes = notes.replace(new RegExp(escapedMeasurement, 'gi'), '').trim();
  });
  
  // Clean up notes - remove extra spaces, separators, and partial words
  notes = notes
    .replace(/\s+/g, ' ')
    .replace(/^[,\-–—\s]+/, '')
    .replace(/[,\-–—\s]+$/, '')
    .replace(/\b(?:Lengt|Widt|Heigh|Dep|Diam)\b/gi, '') // Remove partial dimension words
    .trim();
  
  // If no measurements found but text exists, treat entire text as dimensions
  // (for cases like "varies" or "custom")
  if (uniqueMeasurements.length === 0 && text.length > 0) {
    return {
      dimensions: text,
      dimensionsNote: ''
    };
  }
  
  return {
    dimensions: dimensions,
    dimensionsNote: notes
  };
}

// Read the Excel file
const workbook = XLSX.readFile('scripts/data/Inventory-updated.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rawData = XLSX.utils.sheet_to_json(worksheet, { 
  defval: '',
  raw: false
});

// Map column names to readable names
const columnMap = {
  'Inventory:': 'category',
  '__EMPTY': 'itemType',
  '__EMPTY_1': 'name',
  '__EMPTY_2': 'subtitle',
  '__EMPTY_3': 'description',
  '__EMPTY_4': 'dimensions',
  '__EMPTY_5': 'quantity',
  '__EMPTY_6': 'cost',
  'Photos': 'photoStock',
  '__EMPTY_7': 'photoStock2',
  '__EMPTY_8': 'photoCustom1',
  '__EMPTY_9': 'photoCustom2',
  '__EMPTY_10': 'photoCustom3',
};

// Parse the data
let currentCategory = null;
let currentSubcategory = null;
const categories = {};
const categoryOrder = [];

rawData.forEach((row, index) => {
  // Skip header row
  if (index === 0) return;
  
  const category = cleanText(row['Inventory:'] || '');
  const itemType = cleanText(row['__EMPTY'] || '');
  const name = cleanText(row['__EMPTY_1'] || '');
  const subtitle = cleanText(row['__EMPTY_2'] || '');
  const description = cleanText(row['__EMPTY_3'] || '');
  const dimensions = cleanText(row['__EMPTY_4'] || '');
  const quantity = cleanText(row['__EMPTY_5'] || '');
  
  // Skip empty rows
  if (!category && !name && !itemType) return;
  
  // Check if this is a main category - Only the 5 main categories we want to display
  const mainCategories = ['Bars', 'Décor', 'Lounge Furniture', 'Lighting', 'Table Top'];
  
  if (mainCategories.includes(category)) {
    currentCategory = category;
    currentSubcategory = null;
    
    if (!categories[currentCategory]) {
      categories[currentCategory] = {
        name: currentCategory,
        id: generateId(currentCategory),
        subcategories: []
      };
      categoryOrder.push(currentCategory);
    }
    return;
  }
  
  // Check if this is a subcategory (has category but no name/itemType)
  // BUT first check if this category is actually a main category we want to track
  // If it's a main category, skip it (we only want the 5 filtered ones)
  if (category && !name && !itemType) {
    // Don't create subcategories for main categories that we're filtering out
    if (mainCategories.includes(category)) {
      // This is a main category header, not a subcategory
      return;
    }
    
    currentSubcategory = category.trim();
    
    if (currentCategory && categories[currentCategory]) {
      // Check if subcategory already exists
      const existingSub = categories[currentCategory].subcategories.find(
        sub => sub.name === currentSubcategory || sub.id === generateId(currentSubcategory)
      );
      
      if (!existingSub) {
        categories[currentCategory].subcategories.push({
          id: generateId(currentSubcategory),
          name: currentSubcategory,
          description: '', // Will be filled from existing data if needed
          items: []
        });
      }
    }
    return;
  }
  
  // This is an item row
  if (name && currentCategory && categories[currentCategory]) {
    // Find the current subcategory or use the last one
    let subcategory = categories[currentCategory].subcategories[
      categories[currentCategory].subcategories.length - 1
    ];
    
    // If no subcategory exists, create a default one
    if (!subcategory) {
      subcategory = {
        id: 'default',
        name: currentCategory,
        description: '',
        items: []
      };
      categories[currentCategory].subcategories.push(subcategory);
    }
    
    // Create the item
    const itemId = generateId(name);
    
    // Parse dimensions to separate measurements from additional notes
    const { dimensions: cleanDimensions, dimensionsNote } = parseDimensions(dimensions);
    
    const item = {
      id: itemId,
      name: name,
      subtitle: subtitle || '',
      description: description || '',
      image: generateImagePath(name, subtitle),
      dimensions: cleanDimensions || '',
      dimensionsNote: dimensionsNote || '',
      quantity: quantity || '',
    };
    
    // Check for additional images (photoCustom columns)
    // Use the same baseImagePath that was set for the main image
    const additionalImages = [];
    if (row['__EMPTY_8'] === 'TRUE' || row['__EMPTY_8'] === true) additionalImages.push(generateAdditionalImagePath(item.image, 2));
    if (row['__EMPTY_9'] === 'TRUE' || row['__EMPTY_9'] === true) additionalImages.push(generateAdditionalImagePath(item.image, 3));
    if (row['__EMPTY_10'] === 'TRUE' || row['__EMPTY_10'] === true) additionalImages.push(generateAdditionalImagePath(item.image, 4));
    
    if (additionalImages.length > 0) {
      item.images = additionalImages;
    }
    
    subcategory.items.push(item);
  }
});

// Convert to the format expected by rentalData.ts
const rentalCategories = categoryOrder.map(catName => {
  const cat = categories[catName];
  // Filter out empty subcategories - only keep subcategories that have items
  const subcategoriesWithItems = cat.subcategories
    .filter(sub => sub.items && sub.items.length > 0)
    .map(sub => ({
      id: sub.id,
      name: sub.name,
      description: sub.description || `${sub.name} for your event needs`,
      items: sub.items
    }));
  
  return {
    id: cat.id,
    name: cat.name,
    subcategories: subcategoriesWithItems
  };
});

// Generate TypeScript code
const tsCode = `import { RentalCategory } from "./rentalTypes";

export const rentalCategories: RentalCategory[] = ${JSON.stringify(rentalCategories, null, 2)};
`;

// Write to file
fs.writeFileSync('lib/rentals/rentalData.ts', tsCode);

console.log('✅ Successfully updated rentalData.ts');
console.log(`📊 Processed ${rentalCategories.length} categories`);
console.log(`📦 Total items: ${rentalCategories.reduce((sum, cat) => 
  sum + cat.subcategories.reduce((subSum, sub) => subSum + sub.items.length, 0), 0
)}`);

// Also save a JSON version for reference
fs.writeFileSync('scripts/data/rental-data-updated.json', JSON.stringify(rentalCategories, null, 2));
console.log('📄 Also saved to scripts/data/rental-data-updated.json for reference');

