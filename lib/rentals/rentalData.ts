import { RentalCategory } from "./rentalTypes";

export const rentalCategories: RentalCategory[] = [
  {
    "id": "bars",
    "name": "Bars",
    "subcategories": [
      {
        "id": "default",
        "name": "Bars",
        "description": "Bars for your event needs",
        "items": [
          {
            "id": "magnolia",
            "name": "The MAGNOLIA",
            "subtitle": "6' Customizable Bar",
            "description": "Sleek and timeless, this handmade white wood bar complements any event theme and is easily customizable. Panel Sizing __________ Bar Fits 2 comfortably.",
            "image": "/images/rentals/TheMAGNOLIA6'CustomizableBar.jpg",
            "dimensions": "H 44 L 72.75 W24.25",
            "dimensionsNote": "Fits 2 bartenders comfortably",
            "quantity": "1"
          }
        ]
      },
      {
        "id": "bar",
        "name": "Bar",
        "description": "Bar for your event needs",
        "items": [
          {
            "id": "fiore",
            "name": "The Fiore",
            "subtitle": "6' Italian Tiled White Bar",
            "description": "A modern white bar accented with Italian tiles for a touch of European charm  Bar Fits 2 comfortably.",
            "image": "/images/rentals/TheFiore6'ItalianTiledWhiteBar.jpg",
            "images": [
              "/images/rentals/TheFiore6'ItalianTiledWhiteBar2.jpg"
            ],
            "dimensions": "Height:44in Length:72.75in Width:24.25in",
            "dimensionsNote": "Fits 2 bartenders comfortably",
            "quantity": "1"
          },
          {
            "id": "olive",
            "name": "The Olive",
            "subtitle": "6' Green Tiled Bar",
            "description": "Handmade Wood bar featuring deep green tiles and concrete bartop for a touch of natural ambiance. Bar Fits 2 comfortably.",
            "image": "/images/rentals/TheOlive6'GreenTiledBar.jpg",
            "dimensions": "Height:44in Length:72.75in Width:24.25in",
            "dimensionsNote": "Fits 2 bartenders comfortably",
            "quantity": "1"
          },
          {
            "id": "gardenia",
            "name": "The Gardenia",
            "subtitle": "8' White Drink Display + 8' Fern Wall",
            "description": "2 Arched Bookcases perfect for displaying glassware, florals, or bottles paired with Fern Wall covering remaining sides.",
            "image": "/images/rentals/TheGardenia8'WhiteDrinkDisplay+8'FernWall.jpg",
            "images": [
              "/images/rentals/TheGardenia8'WhiteDrinkDisplay+8'FernWall1.jpg",
              "/images/rentals/TheGardenia8'WhiteDrinkDisplay+8'FernWall3.jpg"
            ],
            "dimensions": "Height: 8ft Length: 4ft Height: 8ft Length: 8ft",
            "dimensionsNote": "Single bookcase: Double bookcase:",
            "quantity": "1"
          },
          {
            "id": "olive-side-table",
            "name": "The Olive: Side Table",
            "subtitle": "4' Green Tiled Bar",
            "description": "Handmade Wood bar featuring deep green tiles and concrete bartop for a touch of natural ambiance.",
            "image": "/images/rentals/TheOlive:SideTable4'GreenTiledBar .jpg",
            "dimensions": "Height: 45in Length: 50in",
            "dimensionsNote": "",
            "quantity": "2"
          }
        ]
      },
      {
        "id": "drink-displays",
        "name": "Drink Displays",
        "description": "Drink Displays for your event needs",
        "items": [
          {
            "id": "gardenia",
            "name": "The Gardenia",
            "subtitle": "8' White Drink Display + 8' Fern Wall",
            "description": "2 Arched Bookcases perfect for displaying glassware, florals, or bottles paired with Fern Wall covering remaining sides.",
            "image": "/images/rentals/TheGardenia8'WhiteDrinkDisplay+8'FernWall.jpg",
            "images": [
              "/images/rentals/TheGardenia8'WhiteDrinkDisplay+8'FernWall1.jpg",
              "/images/rentals/TheGardenia8'WhiteDrinkDisplay+8'FernWall3.jpg"
            ],
            "dimensions": "Height: 8ft Length: 4ft Height: 8ft Length: 8ft",
            "dimensionsNote": "Single bookcase: Double bookcase:",
            "quantity": "1"
          }
        ]
      }
    ]
  },
  {
    "id": "d-cor",
    "name": "Décor",
    "subcategories": [
      {
        "id": "large-d-cor",
        "name": "Large Décor",
        "description": "Large Décor for your event needs",
        "items": [
          {
            "id": "camellia",
            "name": "The Camellia",
            "subtitle": "8' White Arch",
            "description": "Make a statement with our stunning 8ft White Arch — a timeless piece that elevates any event design. Crafted with a smooth, clean finish and graceful curves, this versatile structure serves as the perfect backdrop for ceremonies or photo moments",
            "image": "/images/rentals/TheCamellia8'WhiteArch.jpg",
            "images": [
              "/images/rentals/TheCamellia8'WhiteArch2.jpg"
            ],
            "dimensions": "Height: 8ft Length: 4ft",
            "dimensionsNote": "",
            "quantity": "2"
          },
          {
            "id": "papavero",
            "name": "The Papavero",
            "subtitle": "Large Italian Fountain",
            "description": "Handcrafted Italian-inspired fountain. Designed with intricate blue and yellow mosaic tiles framed by textured white stone",
            "image": "/images/rentals/ThePapaveroLargeItalianFountain.jpg",
            "images": [
              "/images/rentals/ThePapaveroLargeItalianFountain2.jpg",
              "/images/rentals/ThePapaveroLargeItalianFountain3.jpg"
            ],
            "dimensions": "Height: 60in Width: 35in",
            "dimensionsNote": "",
            "quantity": "1"
          },
          {
            "id": "juniper",
            "name": "The Juniper",
            "subtitle": "12' Fern Wall",
            "description": "Lush mix of artificial greenery perfect for photo backdrops or accent walls.",
            "image": "/images/rentals/TheJuniper12'FernWall .png",
            "dimensions": "Height: 8ft Length: 12ft",
            "dimensionsNote": "",
            "quantity": "1"
          }
        ]
      },
      {
        "id": "small-d-cor",
        "name": "Small Décor",
        "description": "Small Décor for your event needs",
        "items": [
          {
            "id": "fern",
            "name": "The Fern",
            "subtitle": "Brass Bird Cage",
            "description": "Whimsical gold bird cage with leaf detail, ideal for candles or florals.",
            "image": "/images/rentals/TheFERNBrassBirdCage.jpg",
            "dimensions": "height: 16.5in Height: 13in",
            "dimensionsNote": "Cage 1: Cage 2:",
            "quantity": "3"
          }
        ]
      },
      {
        "id": "candle-holder-votives",
        "name": "Candle Holder + Votives",
        "description": "Candle Holder + Votives for your event needs",
        "items": [
          {
            "id": "lotus",
            "name": "The Lotus",
            "subtitle": "Tall Glass Candle Holder",
            "description": "Clear glass Taper Candle Holder. Statement pieces for romantic ambient lighting. **Candle sticks must be purchased separately are not included in rental.",
            "image": "/images/rentals/TheLotusTallGlassCandlerHolder.jpg",
            "images": [
              "/images/rentals/TheLotusTallGlassCandlerHolder2.jpg",
              "/images/rentals/TheLotusTallGlassCandlerHolder3.jpg"
            ],
            "dimensions": "Height: 4in",
            "dimensionsNote": "",
            "quantity": "24"
          },
          {
            "id": "jasmine",
            "name": "The Jasmine",
            "subtitle": "Short Glass Candle Holder",
            "description": "Ribbed glass Taper Candle Holder **Candle sticks must be purchased separately are not included in rental.",
            "image": "/images/rentals/TheJasmineShortGlassCandleHolder.jpg",
            "images": [
              "/images/rentals/TheJasmineShortGlassCandleHolder1.jpg"
            ],
            "dimensions": "Height: 2.76in Width: 1.77in",
            "dimensionsNote": "",
            "quantity": "60"
          },
          {
            "id": "lariat-collection",
            "name": "The Lariat Collection",
            "subtitle": "Clear Crystal Candle Holder",
            "description": "Authentic vintage glass pieces with intricate detail. Candle Holder Collection includes 2 Tall Candle Holders and 2 Short Candle Holders",
            "image": "/images/rentals/TheLariatCollectionClearCrystalCandleHolder.jpg",
            "dimensions": "Height: 7in Height 5in",
            "dimensionsNote": "Tall Candle Holder: Short Candle Holder:",
            "quantity": "4"
          }
        ]
      },
      {
        "id": "decanter-vases",
        "name": "Decanter + Vases",
        "description": "Decanter + Vases for your event needs",
        "items": [
          {
            "id": "freesia-collection",
            "name": "The Freesia Collection",
            "subtitle": "Vintage Glass Bud Vase",
            "description": "Small Vintage Glass bottles/ bud vases Timeless accents that bring character and charm to any display.",
            "image": "/images/rentals/TheFreesiaCollectionVintageClearGlassBottles.jpg",
            "images": [
              "/images/rentals/TheFreesiaCollectionVintageClearGlassBottles1.jpg",
              "/images/rentals/TheFreesiaCollectionVintageClearGlassBottles3.jpg"
            ],
            "dimensions": "varies",
            "dimensionsNote": "",
            "quantity": "64"
          },
          {
            "id": "delphinium",
            "name": "The Delphinium",
            "subtitle": "Blue Glass Vase",
            "description": "The tall silhouette and glassy, cloud-blue finish create a serene, romantic statement, perfect for showcasing single stems, airy arrangements, or standing beautifully on its own. Its waved rim adds movement and artistry, making it a subtle yet striking accent for modern or garden-inspired decor.",
            "image": "/images/rentals/TheDelphiniumBlueGlassVase.jpg",
            "dimensions": "varies",
            "dimensionsNote": "",
            "quantity": "3"
          }
        ]
      },
      {
        "id": "trays",
        "name": "Trays",
        "description": "Trays for your event needs",
        "items": [
          {
            "id": "aurelia",
            "name": "The Aurelia",
            "subtitle": "Gold Oval Mirror Tray",
            "description": "Antique Gold polished mirror tray with floral detail around sides and handles. Ideal for styling",
            "image": "/images/rentals/TheAureliaGoldOvalMirrorTray.jpg",
            "images": [
              "/images/rentals/TheAureliaGoldOvalMirrorTray1.jpg"
            ],
            "dimensions": "Length: 20in Width: 11.5in",
            "dimensionsNote": "",
            "quantity": "1"
          }
        ]
      }
    ]
  },
  {
    "id": "lounge-furniture",
    "name": "Lounge Furniture",
    "subcategories": [
      {
        "id": "sofa",
        "name": "Sofa",
        "description": "Sofa for your event needs",
        "items": [
          {
            "id": "bluebell",
            "name": "The Bluebell",
            "subtitle": "Royal Blue Velvet Sofa",
            "description": "Plush, luxurious velvet seating with a bold color statement. Comfortably fits 2/3",
            "image": "/images/rentals/TheBluebellRoyalBlueVelvetSofa.jpg",
            "images": [
              "/images/rentals/TheBluebellRoyalBlueVelvetSofa2.jpg",
              "/images/rentals/TheBluebellRoyalBlueVelvetSofa3.jpg"
            ],
            "dimensions": "Height: 31in Length: 78in Width: 32in",
            "dimensionsNote": "",
            "quantity": "1"
          }
        ]
      },
      {
        "id": "coffee-tables",
        "name": "Coffee Tables",
        "description": "Coffee Tables for your event needs",
        "items": [
          {
            "id": "calendula-oval",
            "name": "The Calendula: Oval",
            "subtitle": "Oval Marbled Coffee Table",
            "description": "",
            "image": "/images/rentals/TheCalendula:OvalOvalMarbledCoffeeTable.jpg",
            "images": [
              "/images/rentals/TheCalendula.jpg",
              "/images/rentals/TheCalendula1.jpg"
            ],
            "dimensions": "Height: 18.5in Length: 47in",
            "dimensionsNote": "",
            "quantity": "1"
          },
          {
            "id": "calendula-round",
            "name": "The Calendula: round",
            "subtitle": "Round Marbled End Table",
            "description": "Elegant side table combining marble textures and gold tones.",
            "image": "/images/rentals/TheCalendula:roundRoundMarbledEndTable .jpg",
            "dimensions": "Height: 24in Diam: 23.75in",
            "dimensionsNote": "",
            "quantity": "1"
          },
          {
            "id": "dahlia",
            "name": "The Dahlia",
            "subtitle": "Brass Mirrored End Table",
            "description": "Beautiful bold blend between goldtone metal and mirrored glass adds a level of depth to any event",
            "image": "/images/rentals/TheDahliaBrassMirroredEndTable.jpg",
            "dimensions": "Height: 32.5in Length: 27in",
            "dimensionsNote": "",
            "quantity": ""
          }
        ]
      }
    ]
  },
  {
    "id": "lighting",
    "name": "Lighting",
    "subcategories": [
      {
        "id": "statement-lighting",
        "name": "Statement Lighting",
        "description": "Statement Lighting for your event needs",
        "items": [
          {
            "id": "indigo-bloom",
            "name": "The Indigo Bloom",
            "subtitle": "Handmade Tassel Chandelier",
            "description": "Handcrafted with artistry and intention, the Royal Blue Tassel Chandelier is a stunning statement piece that brings texture, movement, and depth to any space. Designed with three cascading tiers of soft tassels, it flows effortlessly around a central pendant light, creating a dreamy play of light and shadow.",
            "image": "/images/rentals/TheIndigoBloomHandmadeTasselChandelier .jpg",
            "images": [
              "/images/rentals/TheIndigoBloomHandmadeTasselChandelier2 .jpg",
              "/images/rentals/TheIndigoBloomHandmadeTasselChandelier3.jpg",
              "/images/rentals/TheIndigoBloomHandmadeTasselChandelier4.jpg"
            ],
            "dimensions": "Height: 36in",
            "dimensionsNote": "",
            "quantity": "2"
          }
        ]
      },
      {
        "id": "table-top-lighting",
        "name": "Table Top Lighting",
        "description": "Table Top Lighting for your event needs",
        "items": [
          {
            "id": "poppy",
            "name": "The Poppy",
            "subtitle": "Handmade Floral Taper Candles",
            "description": "Elegant white pillar candles adorned with delicate handmade paper flowers in soft, romantic hues. Each candle features carefully placed blossoms in customizable colors with pearl-like centers that catch the light beautifully. The flowers are artfully arranged along the length of each candle, creating a charming garden-inspired aesthetic.",
            "image": "/images/rentals/ThePoppyHandmadeFloralTaperCandles.jpg",
            "images": [
              "/images/rentals/ThePoppyHandmadeFloralTaperCandles2.jpg",
              "/images/rentals/ThePoppyHandmadeFloralTaperCandles3.jpg",
              "/images/rentals/ThePoppyHandmadeFloralTaperCandles4.jpg"
            ],
            "dimensions": "Customizable Candle & Flower Color for addt'l $20",
            "dimensionsNote": "",
            "quantity": "40"
          }
        ]
      }
    ]
  },
  {
    "id": "table-top",
    "name": "Table Top",
    "subcategories": [
      {
        "id": "dinnerware",
        "name": "Dinnerware",
        "description": "Dinnerware for your event needs",
        "items": [
          {
            "id": "marigold",
            "name": "The Marigold",
            "subtitle": "Gold Beaded Charger",
            "description": "Clear Gold Beaded Charger Plates Elegant base pieces to elevate your table design.",
            "image": "/images/rentals/theMarigoldGoldBeadedCharger.jpg",
            "images": [
              "/images/rentals/theMarigoldGoldBeadedCharger1.jpg",
              "/images/rentals/theMarigoldGoldBeadedCharger2.jpg"
            ],
            "dimensions": "Diam: 13in",
            "dimensionsNote": "Material: Plastic",
            "quantity": "50"
          },
          {
            "id": "petal",
            "name": "The Petal",
            "subtitle": "Pink Floral Plate",
            "description": "Soft, feminine square glass pink plates with intricate floral detailing painted on.",
            "image": "/images/rentals/ThePetalPinkFloralPlate.jpg",
            "images": [
              "/images/rentals/ThePetalPinkFloralPlate3.jpg",
              "/images/rentals/ThePetalPinkFloralPlate4.jpg"
            ],
            "dimensions": "Length: 8in Width: 8in",
            "dimensionsNote": "",
            "quantity": "8"
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "description": "Accessories for your event needs",
        "items": [
          {
            "id": "willow",
            "name": "The Willow",
            "subtitle": "Sage Green Linen Napkin",
            "description": "Sage Green Polyestrer Linen Napkins",
            "image": "/images/rentals/TheWillowSageGreenLinenNapkin.jpg",
            "images": [
              "/images/rentals/TheWillowSageGreenLinenNapkin1.jpg",
              "/images/rentals/TheWillowSageGreenLinenNapkin2.jpg"
            ],
            "dimensions": "Length: 17in Width: 17in",
            "dimensionsNote": "",
            "quantity": "50"
          },
          {
            "id": "rose",
            "name": "The Rose",
            "subtitle": "Gold Rose and Pearl Napkin Ring",
            "description": "Crafted from polished gold metal, this delicate piece features a white rose and pearl detail on either end, creating a soft, romantic charm that complements any tablescape.",
            "image": "/images/rentals/TheROSEGoldRoseandPearlNapkinRing.jpg",
            "images": [
              "/images/rentals/TheROSEGoldRoseandPearlNapkinRing2.jpg"
            ],
            "dimensions": "",
            "dimensionsNote": "",
            "quantity": "49"
          },
          {
            "id": "viola",
            "name": "The Viola",
            "subtitle": "Blue Mediterranean Plate",
            "description": "artisan-crafted pieces inspired by the charm of seaside dining. Each plate is handmade with subtle variations in color and texture, giving every piece its own character. Though designed as plates, their smaller size makes them perfect for use as decorative coasters or layering accents beneath chargers or glassware, adding a sophisticated pop of blue to your setting.",
            "image": "/images/rentals/TheViola BlueMediterraneanPlate.jpg",
            "images": [
              "/images/rentals/TheViolaBlueMediterraneanPlate-Type1.jpg",
              "/images/rentals/TheViolaBlueMediterraneanPlate-Type2.jpg",
              "/images/rentals/TheViolaBlueMediterraneanPlate-Type3.jpg",
              "/images/rentals/TheViolaBlueMediterraneanPlate1.jpg",
              "/images/rentals/TheViolaBlueMediterraneanPlate2.jpg"
            ],
            "dimensions": "Length: 8in Width: 8in",
            "dimensionsNote": "",
            "quantity": "11"
          },
          {
            "id": "lariat-collection",
            "name": "The Lariat Collection",
            "subtitle": "Clear Crystal Assortment",
            "description": "Authentic vintage glass pieces with intricate detail. The Lariat Collection includes: 1 Vase 1 Bowl  2 Tall Candle Holders and 2 Short Candle Holders",
            "image": "/images/rentals/TheLariatCollectionClearCrystalAssortment.jpg",
            "dimensions": "Length: 12in Width: 12in Height: 7.25in Height: 7in Height: 5in",
            "dimensionsNote": "Bowl: Vase: Tall Candle Holder: Shor Candle Holdert:",
            "quantity": "6"
          },
          {
            "id": "mimosa-collection",
            "name": "The Mimosa Collection",
            "subtitle": "Colorful Glass Bottles",
            "description": "Assorted Eclectic and vibrant colored glass bottles; perfect for adding playful texture.",
            "image": "/images/rentals/TheMimosaCollectionColorfulGlassBottles.jpg",
            "images": [
              "/images/rentals/TheMimosaCollectionColorfulGlassBottles1.jpg"
            ],
            "dimensions": "varies",
            "dimensionsNote": "",
            "quantity": ""
          },
          {
            "id": "freesia-collection",
            "name": "The Freesia Collection",
            "subtitle": "Vintage Clear Glass Bottles",
            "description": "Small Vintage Glass bottles/ bud vases Timeless accents that bring character and charm to any display.",
            "image": "/images/rentals/TheFreesiaCollectionVintageClearGlassBottles.jpg",
            "images": [
              "/images/rentals/TheFreesiaCollectionVintageClearGlassBottles1.jpg",
              "/images/rentals/TheFreesiaCollectionVintageClearGlassBottles3.jpg"
            ],
            "dimensions": "varies",
            "dimensionsNote": "",
            "quantity": "64"
          },
          {
            "id": "frostflower",
            "name": "The Frostflower",
            "subtitle": "Tall Drink Cooler",
            "description": "Portable standing cooler, easily customizable ideal for outdoor bar setups.",
            "image": "/images/rentals/TheFrostflowerTallDrinkCooler.jpg",
            "images": [
              "/images/rentals/TheFrostflowerTallDrinkCooler1.jpg"
            ],
            "dimensions": "72 Quart",
            "dimensionsNote": "",
            "quantity": "2"
          }
        ]
      },
      {
        "id": "linens",
        "name": "Linens",
        "description": "Linens for your event needs",
        "items": [
          {
            "id": "snowdrop",
            "name": "The Snowdrop",
            "subtitle": "Solid White Linen | 70 in x 120 in Rectangle",
            "description": "Crisp, clean, and versatile to complement any tablescape.",
            "image": "/images/rentals/TheSnowdropSolidWhiteLinen|70x120Rectangle.jpg",
            "dimensions": "fits 6 ft & 8 ft tables",
            "dimensionsNote": "",
            "quantity": "9"
          }
        ]
      }
    ]
  }
];
