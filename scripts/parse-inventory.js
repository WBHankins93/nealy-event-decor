const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = XLSX.readFile('scripts/data/Inventory.xlsx');

// Get all sheet names
console.log('📊 Sheet names:', workbook.SheetNames);
console.log('');

// Process each sheet
workbook.SheetNames.forEach((sheetName, index) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Sheet ${index + 1}: "${sheetName}"`);
  console.log('='.repeat(60));
  
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { 
    defval: '', // Default value for empty cells
    raw: false  // Get formatted values
  });
  
  console.log(`\nTotal rows: ${data.length}`);
  console.log('\nFirst few rows:');
  console.log(JSON.stringify(data.slice(0, 5), null, 2));
  
  // Get column names
  if (data.length > 0) {
    console.log('\nColumn names:');
    console.log(Object.keys(data[0]));
  }
});

// Save a JSON version for easier inspection
const allData = {};
workbook.SheetNames.forEach(sheetName => {
  const worksheet = workbook.Sheets[sheetName];
  allData[sheetName] = XLSX.utils.sheet_to_json(worksheet, { 
    defval: '',
    raw: false
  });
});

fs.writeFileSync('scripts/data/inventory-parsed.json', JSON.stringify(allData, null, 2));
console.log('\n✅ Saved parsed data to scripts/data/inventory-parsed.json');

