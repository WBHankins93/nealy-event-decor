// Rental Inventory Data
// This file contains all rental items organized by category
// Update this file as you add new inventory items

import { RentalCategory } from './rentalTypes';

export const rentalCategories: RentalCategory[] = [
  {
    id: 'bars',
    name: 'Bars',
    description: 'Handcrafted bars for your beverage service needs',
    order: 1,
    items: [
      {
        id: 'bar-magnolia',
        name: 'The Magnolia',
        subtitle: '6\' White Bar',
        description: 'Sleek and timeless, this handmade white wood bar complements any event theme and is easily customizable. Bar Fits 2 comfortably.',
        dimensions: 'H 44" L 72.75" W 24.25"',
        quantity: 1,
      },
      {
        id: 'bar-fiore',
        name: 'The Fiore',
        subtitle: '6\' Italian Tiled White Bar',
        description: 'A modern white bar accented with Italian tiles for a touch of European charm. Bar Fits 2 comfortably.',
        dimensions: 'H 44" L 72.75" W 24.25"',
        quantity: 1,
      },
      {
        id: 'bar-olive',
        name: 'The Olive',
        subtitle: '6\' Green Tiled Bar',
        description: 'Handmade Wood bar featuring deep green tiles and concrete bartop for a touch of natural ambiance. Bar Fits 2 comfortably.',
        dimensions: 'H 44" L 72.75" W 24.25"',
        quantity: 1,
      },
      {
        id: 'bar-gardenia',
        name: 'The Gardenia',
        subtitle: '8\' White Drink Display + 8\' Fern Wall',
        description: '2 Arched Bookcases perfect for displaying glassware, florals, or bottles paired with Fern Wall covering remaining sides.',
        dimensions: '8x8 2(4x8)',
        quantity: 1,
      },
      {
        id: 'bar-olive-side',
        name: 'The Olive: Side Table',
        subtitle: '4\' Green Tiled Bar',
        description: 'Handmade Wood bar featuring deep green tiles and concrete bartop for a touch of natural ambiance.',
        dimensions: 'H 45" L 50.5"/49"',
        quantity: 2,
      },
    ],
  },
  {
    id: 'large-decor',
    name: 'Large Décor',
    description: 'Statement pieces to transform your event space',
    order: 2,
    items: [
      {
        id: 'decor-camellia',
        name: 'The Camellia',
        subtitle: '8\' White Arch',
        description: 'Make a statement with our stunning 8ft White Arch — a timeless piece that elevates any event design. Crafted with a smooth, clean finish and graceful curves, this versatile structure serves as the perfect backdrop for ceremonies or photo moments.',
        dimensions: '4x8',
        quantity: 2,
      },
      {
        id: 'decor-papavero',
        name: 'The Papavero',
        subtitle: 'Large Italian Fountain',
        description: 'Handcrafted Italian-inspired fountain. Designed with intricate blue and yellow mosaic tiles framed by textured white stone.',
        quantity: 1,
      },
      {
        id: 'decor-juniper',
        name: 'The Juniper',
        subtitle: '12\' Fern Wall',
        description: 'Lush mix of artificial greenery perfect for photo backdrops or accent walls.',
        dimensions: '8x8',
        quantity: 1,
      },
    ],
  },
  {
    id: 'small-decor',
    name: 'Small Décor',
    description: 'Charming accents to add personality to your event',
    order: 3,
    items: [
      {
        id: 'decor-fern',
        name: 'The Fern',
        subtitle: 'Brass Bird Cage',
        description: 'Whimsical gold bird cage with leaf detail, ideal for candles or florals.',
        dimensions: '13" x 13" x 16.5"',
        quantity: 1,
      },
    ],
  },
  {
    id: 'candle-holders',
    name: 'Candle Holders & Votives',
    description: 'Elegant lighting solutions for ambient atmosphere',
    order: 4,
    items: [
      {
        id: 'candle-lotus',
        name: 'The Lotus',
        subtitle: 'Tall Glass Candle Holder',
        description: 'Clear glass Taper Candle Holder. Statement pieces for romantic ambient lighting. **Candle sticks must be purchased separately are not included in rental.',
        dimensions: 'H 4"',
        quantity: 24,
      },
      {
        id: 'candle-jasmine',
        name: 'The Jasmine',
        subtitle: 'Short Glass Candle Holder',
        description: 'Ribbed glass Taper Candle Holder. **Candle sticks must be purchased separately are not included in rental.',
        dimensions: 'H 2.76" D 1.77"',
        quantity: 60,
      },
      {
        id: 'candle-lariat',
        name: 'The Lariat Collection',
        subtitle: 'Clear Crystal Candle Holder',
        description: 'Authentic vintage glass pieces with intricate detail. Candle Holder Collection includes 2 Tall Candle Holders and 2 Short Candle Holders.',
        quantity: 4,
      },
      {
        id: 'candle-amaryllis',
        name: 'The Amaryllis',
        subtitle: 'Blue Glass Candle Holder',
        description: 'Small Blue Round Glass Bowl Tea candle holder.',
        quantity: 3,
      },
    ],
  },
  {
    id: 'vases-vessels',
    name: 'Vases & Vessels',
    description: 'Beautiful containers for florals and displays',
    order: 5,
    items: [
      {
        id: 'vase-freesia',
        name: 'The Freesia Collection',
        subtitle: 'Vintage Glass Bud Vase',
        description: 'Small Vintage Glass bottles/bud vases. Timeless accents that bring character and charm to any display.',
        dimensions: 'Varies',
        quantity: 64,
      },
      {
        id: 'vase-delphinium',
        name: 'The Delphinium',
        subtitle: 'Blue Glass Vase',
        description: 'The tall silhouette and glassy, cloud-blue finish create a serene, romantic statement, perfect for showcasing single stems, airy arrangements, or standing beautifully on its own. Its waved rim adds movement and artistry, making it a subtle yet striking accent for modern or garden-inspired decor.',
        dimensions: 'H 9" x 12.5"',
        quantity: 3,
      },
      {
        id: 'tray-aurelia',
        name: 'The Aurelia',
        subtitle: 'Gold Oval Mirror Tray',
        description: 'Antique Gold polished mirror tray with floral detail around sides and handles. Ideal for styling.',
        dimensions: 'L 20" D 11.5"',
        quantity: 1,
      },
    ],
  },
  {
    id: 'lounge-furniture',
    name: 'Lounge Furniture',
    description: 'Comfortable seating and tables for lounge areas',
    order: 6,
    items: [
      {
        id: 'lounge-bluebell',
        name: 'The Bluebell',
        subtitle: 'Royal Blue Velvet Sofa',
        description: 'Plush, luxurious velvet seating with a bold color statement. Comfortably fits 2/3.',
        dimensions: 'Seats 3/4',
        quantity: 1,
      },
      {
        id: 'lounge-calendula-oval',
        name: 'The Calendula: Oval',
        subtitle: 'Oval Marbled Coffee Table',
        description: 'Elegant centerpiece combining marble textures and gold tones.',
        dimensions: 'H 18.5" L 47"',
        quantity: 1,
      },
      {
        id: 'lounge-calendula-round',
        name: 'The Calendula: Round',
        subtitle: 'Round Marbled End Table',
        description: 'Elegant side table combining marble textures and gold tones.',
        dimensions: 'H 24" L 23.75"',
        quantity: 1,
      },
      {
        id: 'lounge-dahlia',
        name: 'The Dahlia',
        subtitle: 'Brass Mirrored End Table',
        description: 'Beautiful bold blend between goldtone metal and mirrored glass adds a level of depth to any event.',
        dimensions: 'H 32.5" L 27"',
        quantity: 1,
      },
    ],
  },
  {
    id: 'lighting',
    name: 'Lighting',
    description: 'Stunning lighting to set the mood',
    order: 7,
    items: [
      {
        id: 'lighting-indigo',
        name: 'The Indigo Bloom',
        subtitle: 'Handmade Tassel Chandelier',
        description: 'Handcrafted with artistry and intention, the Royal Blue Tassel Chandelier is a stunning statement piece that brings texture, movement, and depth to any space. Designed with three cascading tiers of soft tassels, it flows effortlessly around a central pendant light, creating a dreamy play of light and shadow.',
        dimensions: '34" before bulb',
        quantity: 2,
      },
      {
        id: 'lighting-poppy',
        name: 'The Poppy',
        subtitle: 'Handmade Floral Taper Candles',
        description: 'Elegant white pillar candles adorned with delicate handmade paper flowers in soft, romantic hues. Each candle features carefully placed blossoms in customizable colors with pearl-like centers that catch the light beautifully. The flowers are artfully arranged along the length of each candle, creating a charming garden-inspired aesthetic.',
        dimensions: 'Customizable Candle/Flower Color $20',
        quantity: 40,
      },
    ],
  },
  {
    id: 'dinnerware',
    name: 'Dinnerware & Table Settings',
    description: 'Elegant place settings for your tables',
    order: 8,
    items: [
      {
        id: 'dinnerware-marigold',
        name: 'The Marigold',
        subtitle: 'Gold Beaded Charger',
        description: 'Clear Gold Beaded Charger Plates. Elegant base pieces to elevate your table design.',
        dimensions: '13" round / Plastic',
        quantity: 50,
      },
      {
        id: 'dinnerware-petal',
        name: 'The Petal',
        subtitle: 'Pink Floral Plate',
        description: 'Soft, feminine square glass pink plates with intricate floral detailing painted on.',
        dimensions: '8"',
        quantity: 8,
      },
      {
        id: 'dinnerware-viola',
        name: 'The Viola',
        subtitle: 'Blue Mediterranean Plate',
        description: 'Artisan-crafted pieces inspired by the charm of seaside dining. Each plate is handmade with subtle variations in color and texture, giving every piece its own character. Though designed as plates, their smaller size makes them perfect for use as decorative coasters or layering accents beneath chargers or glassware, adding a sophisticated pop of blue to your setting.',
        dimensions: 'L 8" D 8"',
        quantity: 11,
      },
    ],
  },
  {
    id: 'linens-accessories',
    name: 'Linens & Accessories',
    description: 'Finishing touches for your table design',
    order: 9,
    items: [
      {
        id: 'linen-willow',
        name: 'The Willow',
        subtitle: 'Sage Green Linen Napkin',
        description: 'Sage Green Polyester Linen Napkins.',
        dimensions: '17" x 17"',
        quantity: 50,
      },
      {
        id: 'linen-rose',
        name: 'The Rose',
        subtitle: 'Gold Rose and Pearl Napkin Ring',
        description: 'Crafted from polished gold metal, this delicate piece features a white rose and pearl detail on either end, creating a soft, romantic charm that complements any tablescape.',
        quantity: 49,
      },
      {
        id: 'linen-snowdrop',
        name: 'The Snowdrop',
        subtitle: 'Solid White Linen',
        description: 'Crisp, clean, and versatile to complement any tablescape.',
        dimensions: '70x120 Rectangle - 6ft & 8ft tables',
        quantity: 9,
      },
    ],
  },
  {
    id: 'collections',
    name: 'Collections & Sets',
    description: 'Curated sets for cohesive styling',
    order: 10,
    items: [
      {
        id: 'collection-lariat',
        name: 'The Lariat Collection',
        subtitle: 'Clear Crystal Assortment',
        description: 'Authentic vintage glass pieces with intricate detail. The Lariat Collection includes: 1 Vase, 1 Bowl, 2 Tall Candle Holders and 2 Short Candle Holders.',
        quantity: 6,
      },
      {
        id: 'collection-mimosa',
        name: 'The Mimosa Collection',
        subtitle: 'Colorful Glass Bottles',
        description: 'Assorted eclectic and vibrant colored glass bottles; perfect for adding playful texture.',
        dimensions: 'Varies',
        quantity: 1,
      },
      {
        id: 'collection-freesia-bottles',
        name: 'The Freesia Collection',
        subtitle: 'Vintage Clear Glass Bottles',
        description: 'Small Vintage Glass bottles/bud vases. Timeless accents that bring character and charm to any display.',
        dimensions: 'Varies',
        quantity: 100,
      },
    ],
  },
  {
    id: 'event-essentials',
    name: 'Event Essentials',
    description: 'Practical items for event setup',
    order: 11,
    items: [
      {
        id: 'essential-frostflower',
        name: 'The Frostflower',
        subtitle: 'Tall Drink Cooler',
        description: 'Portable standing cooler, easily customizable ideal for outdoor bar setups.',
        dimensions: '72 Quart',
        quantity: 2,
      },
    ],
  },
];

// Helper function to get all items across all categories
export const getAllRentalItems = () => {
  return rentalCategories.flatMap((category) => category.items);
};

// Helper function to find a specific item by ID
export const getRentalItemById = (itemId: string) => {
  const allItems = getAllRentalItems();
  return allItems.find((item) => item.id === itemId);
};

// Helper function to find a category by ID
export const getRentalCategoryById = (categoryId: string) => {
  return rentalCategories.find((category) => category.id === categoryId);
};

// Helper function to search items by name or description
export const searchRentalItems = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return getAllRentalItems().filter(
    (item) =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.subtitle.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery)
  );
};