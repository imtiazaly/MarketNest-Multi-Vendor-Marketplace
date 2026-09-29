// src/data/mockData.ts
import { User, Vendor, Product, Order, ProductCategory } from "@/types";

export const PRODUCT_CATEGORIES: (ProductCategory | "All")[] = [
  "All",
  "Home & Living",
  "Electronics",
  "Fashion",
  "Art & Crafts",
  "Wellness",
];

// ==========================================
// 1. 20+ REALISTIC INDEPENDENT STUDIOS
// ==========================================
export const MOCK_VENDORS: Vendor[] = [
  {
    id: "vnd-1",
    name: "Nordic Living Studio",
    slug: "nordic-living-studio",
    description:
      "Curated minimalist Scandinavian home decor, handcrafted ceramics, and timeless furniture.",
    logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 142,
    totalProducts: 12,
    totalSales: 48200,
    joinedDate: "2024-01-15",
    isVerified: true,
    email: "hello@nordicliving.com",
    phone: "+45 33 12 34 56",
    address: "Copenhagen, Denmark",
  },
  {
    id: "vnd-2",
    name: "Vance Tech Labs",
    slug: "vance-tech-labs",
    description:
      "Ergonomic workspace gear, high-fidelity audio accessories, and premium mechanical peripherals.",
    logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&h=400&fit=crop",
    rating: 4.8,
    totalReviews: 198,
    totalProducts: 11,
    totalSales: 94200,
    joinedDate: "2023-11-20",
    isVerified: true,
    email: "support@vancetech.com",
    phone: "+1 (555) 876-5432",
    address: "San Francisco, CA, USA",
  },
  {
    id: "vnd-3",
    name: "Artisan Leatherworks",
    slug: "artisan-leatherworks",
    description:
      "Handcrafted full-grain leather wallets, messenger bags, and timeless travel companions.",
    logo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 89,
    totalProducts: 10,
    totalSales: 38400,
    joinedDate: "2024-02-01",
    isVerified: true,
    email: "craft@artisanleather.com",
    phone: "+44 20 7946 0912",
    address: "Florence & London",
  },
  {
    id: "vnd-4",
    name: "Kyoto Woodcraft",
    slug: "kyoto-woodcraft",
    description:
      "Traditional Japanese joinery, hinoki cypress tableware, and precision hand-carved kitchenware.",
    logo: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=400&fit=crop",
    rating: 5.0,
    totalReviews: 76,
    totalProducts: 10,
    totalSales: 29800,
    joinedDate: "2024-03-10",
    isVerified: true,
    email: "master@kyotowood.jp",
    phone: "+81 75 211 4321",
    address: "Kyoto, Japan",
  },
  {
    id: "vnd-5",
    name: "Atelier Terracotta",
    slug: "atelier-terracotta",
    description:
      "Sculptural architectural clay planters, raw stoneware vases, and earth-glazed decor.",
    logo: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1200&h=400&fit=crop",
    rating: 4.8,
    totalReviews: 64,
    totalProducts: 11,
    totalSales: 22400,
    joinedDate: "2024-02-14",
    isVerified: true,
    email: "info@atelierterracotta.es",
    phone: "+34 93 456 7890",
    address: "Barcelona, Spain",
  },
  {
    id: "vnd-6",
    name: "Lumina Lighting Studio",
    slug: "lumina-lighting-studio",
    description:
      "Architectural brass desk lamps, ambient pleated pendant lights, and warm glowing home fixtures.",
    logo: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 112,
    totalProducts: 10,
    totalSales: 54100,
    joinedDate: "2023-12-05",
    isVerified: true,
    email: "contact@luminalight.de",
    phone: "+49 30 901820",
    address: "Berlin, Germany",
  },
  {
    id: "vnd-7",
    name: "Solstice Botanicals",
    slug: "solstice-botanicals",
    description:
      "Cold-pressed botanical oils, organic herbal tea infusions, and mineral bath soaks.",
    logo: "https://images.unsplash.com/photo-1608248597359-54845512b9d9?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 135,
    totalProducts: 11,
    totalSales: 31900,
    joinedDate: "2024-01-20",
    isVerified: true,
    email: "care@solsticebotanicals.com",
    phone: "+1 (503) 234-9871",
    address: "Portland, OR, USA",
  },
  {
    id: "vnd-8",
    name: "Nomad Loom",
    slug: "nomad-loom",
    description:
      "Authentic handwoven Berber wool rugs, organic Belgian linen cushions, and soft textured throws.",
    logo: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=400&fit=crop",
    rating: 4.7,
    totalReviews: 53,
    totalProducts: 10,
    totalSales: 41200,
    joinedDate: "2024-02-18",
    isVerified: true,
    email: "weave@nomadloom.fr",
    phone: "+33 1 42 68 55 00",
    address: "Marrakech & Paris",
  },
  {
    id: "vnd-9",
    name: "Apex Peripherals",
    slug: "apex-peripherals",
    description:
      "CNC machined aluminum desk accessories, magnetic cable organizers, and precision mouse mats.",
    logo: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1200&h=400&fit=crop",
    rating: 4.8,
    totalReviews: 88,
    totalProducts: 10,
    totalSales: 62000,
    joinedDate: "2024-01-10",
    isVerified: true,
    email: "gear@apexperipherals.com",
    phone: "+1 (512) 890-1234",
    address: "Austin, TX, USA",
  },
  {
    id: "vnd-10",
    name: "Velvet & Thread",
    slug: "velvet-and-thread",
    description:
      "Sustainably woven raw linen overshirts, relaxed merino wool knitwear, and timeless silhouettes.",
    logo: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop",
    rating: 4.8,
    totalReviews: 72,
    totalProducts: 10,
    totalSales: 47600,
    joinedDate: "2023-10-15",
    isVerified: true,
    email: "atelier@velvetthread.it",
    phone: "+39 02 8765 4321",
    address: "Milan, Italy",
  },
  {
    id: "vnd-11",
    name: "Kanso Ceramics",
    slug: "kanso-ceramics",
    description:
      "Wabi-sabi tea bowls, textured speckled ramen bowls, and hand-pinched porcelain vessels.",
    logo: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 104,
    totalProducts: 10,
    totalSales: 35600,
    joinedDate: "2024-02-25",
    isVerified: true,
    email: "clay@kansoceramics.jp",
    phone: "+81 3 5432 1098",
    address: "Tokyo, Japan",
  },
  {
    id: "vnd-12",
    name: "Timber & Iron Guild",
    slug: "timber-iron-guild",
    description:
      "Heavy reclaimed walnut floating shelves, hand-forged steel bookends, and solid timber consoles.",
    logo: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1580481077195-c328a37ea71a?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 61,
    totalProducts: 10,
    totalSales: 51200,
    joinedDate: "2024-01-05",
    isVerified: true,
    email: "forge@timberironguild.com",
    phone: "+1 (206) 555-0199",
    address: "Seattle, WA, USA",
  },
  {
    id: "vnd-13",
    name: "Aura Soundworks",
    slug: "aura-soundworks",
    description:
      "Audiophile open-back planar headphones, walnut headphone stands, and braided copper cables.",
    logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 125,
    totalProducts: 10,
    totalSales: 112000,
    joinedDate: "2023-09-12",
    isVerified: true,
    email: "sound@aurasoundworks.se",
    phone: "+46 8 123 456 78",
    address: "Stockholm, Sweden",
  },
  {
    id: "vnd-14",
    name: "Haven Candle Co.",
    slug: "haven-candle-co",
    description:
      "Small-batch hand-poured coconut soy candles scented with amber, cedarwood, and wild bergamot.",
    logo: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=1200&h=400&fit=crop",
    rating: 4.8,
    totalReviews: 83,
    totalProducts: 10,
    totalSales: 26800,
    joinedDate: "2024-02-10",
    isVerified: true,
    email: "glow@havencandles.co.uk",
    phone: "+44 131 496 0123",
    address: "Edinburgh, Scotland",
  },
  {
    id: "vnd-15",
    name: "Obsidian Coffee Lab",
    slug: "obsidian-coffee-lab",
    description:
      "Manual ceramic pour-over drippers, precision burr hand grinders, and insulated barista carafes.",
    logo: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=400&fit=crop",
    rating: 5.0,
    totalReviews: 94,
    totalProducts: 10,
    totalSales: 43500,
    joinedDate: "2024-01-22",
    isVerified: true,
    email: "brew@obsidiancoffeelab.com.au",
    phone: "+61 3 9012 3456",
    address: "Melbourne, Australia",
  },
  {
    id: "vnd-16",
    name: "Wildflower Paper Co.",
    slug: "wildflower-paper-co",
    description:
      "Letterpress botanical art prints, handmade deckle-edge cotton journals, and archival ink stationery.",
    logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=1200&h=400&fit=crop",
    rating: 4.8,
    totalReviews: 47,
    totalProducts: 10,
    totalSales: 18900,
    joinedDate: "2024-03-01",
    isVerified: true,
    email: "press@wildflowerpaper.com",
    phone: "+1 (828) 255-0987",
    address: "Asheville, NC, USA",
  },
  {
    id: "vnd-17",
    name: "Basalt & Form",
    slug: "basalt-and-form",
    description:
      "Honed Icelandic volcanic stone coasters, basalt bookends, and raw slate cheese boards.",
    logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 38,
    totalProducts: 10,
    totalSales: 21500,
    joinedDate: "2024-03-05",
    isVerified: true,
    email: "stone@basaltform.is",
    phone: "+354 511 2345",
    address: "Reykjavik, Iceland",
  },
  {
    id: "vnd-18",
    name: "Analog Chrono Works",
    slug: "analog-chrono-works",
    description:
      "Warm glow nixie tube desk clocks, minimalist brushed titanium wall dials, and mechanical timers.",
    logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 69,
    totalProducts: 10,
    totalSales: 73000,
    joinedDate: "2023-11-01",
    isVerified: true,
    email: "time@analogchrono.kr",
    phone: "+82 2 3456 7890",
    address: "Seoul, South Korea",
  },
  {
    id: "vnd-19",
    name: "Heritage Woolens",
    slug: "heritage-woolens",
    description:
      "Heavy cable-knit aran sweaters, pure wool picnic blankets, and brushed alpaca winter beanies.",
    logo: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalReviews: 92,
    totalProducts: 10,
    totalSales: 58000,
    joinedDate: "2023-12-15",
    isVerified: true,
    email: "wool@heritagewoolens.ie",
    phone: "+353 1 496 1234",
    address: "Galway, Ireland",
  },
  {
    id: "vnd-20",
    name: "Oasis Botanical Apothecary",
    slug: "oasis-apothecary",
    description:
      "Rosehip seed facial elixirs, antioxidant cleansing balms, and wildcrafted lavender body polishes.",
    logo: "https://images.unsplash.com/photo-1608248597359-54845512b9d9?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=400&fit=crop",
    rating: 4.8,
    totalReviews: 87,
    totalProducts: 10,
    totalSales: 34100,
    joinedDate: "2024-01-30",
    isVerified: true,
    email: "glow@oasisapothecary.com",
    phone: "+1 (805) 646-0123",
    address: "Ojai, CA, USA",
  },
];

// ==========================================
// 2. USERS (Customer, Admin, and 20 Makers)
// ==========================================
export const MOCK_USERS: User[] = [
  {
    id: "usr-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    role: "customer",
  },
  ...MOCK_VENDORS.map((v, idx) => ({
    id: `usr-vnd-${idx + 1}`,
    name: v.name,
    email: v.email,
    avatar: v.logo,
    role: "vendor" as const,
    vendorId: v.id,
  })),
  {
    id: "usr-admin",
    name: "MarketNest Admin",
    email: "admin@marketnest.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "admin",
  },
];

// ==========================================
// 3. 200+ RICH PRODUCTS GENERATION
// ==========================================
// 10 distinct products per vendor = 200 high-quality items!
const PRODUCT_CATALOG_BLUEPRINTS: Record<
  string,
  {
    category: ProductCategory;
    items: {
      title: string;
      price: number;
      compareAtPrice?: number;
      image: string;
      desc: string;
      tags: string[];
    }[];
  }
> = {
  "vnd-1": {
    category: "Home & Living",
    items: [
      {
        title: "Minimalist Ceramic Arc Vase",
        price: 68,
        compareAtPrice: 85,
        image:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&fit=crop",
        desc: "Hand-thrown stoneware ceramic vase featuring a modern sculptural silhouette and matte off-white glaze finish.",
        tags: ["Ceramic", "Minimalist", "Vase"],
      },
      {
        title: "Nordic Walnut Dining Chair",
        price: 210,
        compareAtPrice: 250,
        image:
          "https://images.unsplash.com/photo-1580481077195-c328a37ea71a?w=800&fit=crop",
        desc: "Solid American walnut dining chair with ergonomic curved backrest and natural linen cushioned seat.",
        tags: ["Furniture", "Walnut", "Scandinavian"],
      },
      {
        title: "Stoneware Ripple Fruit Bowl",
        price: 54,
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
        desc: "Organic textured ceramic centerpiece bowl inspired by seaside ripples.",
        tags: ["Ceramic", "Tableware"],
      },
      {
        title: "Oak Pedestal Side Table",
        price: 175,
        compareAtPrice: 220,
        image:
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&fit=crop",
        desc: "Solid white oak tripod pedestal table with rounded beveled edges and wax oil finish.",
        tags: ["Oak", "Table", "Furniture"],
      },
      {
        title: "Cast Iron Abstract Candleholder",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&fit=crop",
        desc: "Heavy textured matte black cast iron taper candle holder with geometric balance.",
        tags: ["Cast Iron", "Candle", "Decor"],
      },
      {
        title: "Fluted Ceramic Planter with Saucer",
        price: 62,
        image:
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&fit=crop",
        desc: "Porous unglazed terracotta planter with drainage hole and integrated saucer plate.",
        tags: ["Planter", "Ceramic"],
      },
      {
        title: "Woven Paper Cord Footstool",
        price: 130,
        image:
          "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&fit=crop",
        desc: "Solid ash wood frame with traditional hand-woven Danish paper cord seating.",
        tags: ["Footstool", "Woodwork"],
      },
      {
        title: "Smoked Glass Carafe & Tumbler Set",
        price: 58,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&fit=crop",
        desc: "Mouth-blown smoked borosilicate glass bedside water carafe with nested drinking cup.",
        tags: ["Glassware", "Carafe"],
      },
      {
        title: "Ash Wood Wall Shelf with Brass Brackets",
        price: 88,
        compareAtPrice: 110,
        image:
          "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&fit=crop",
        desc: "Clean horizontal ash wood floating shelf suspended by solid brushed brass straps.",
        tags: ["Shelf", "Brass", "Storage"],
      },
      {
        title: "Linen Arch Wall Hanging",
        price: 72,
        image:
          "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&fit=crop",
        desc: "Raw textured linen textile tapestry framed by natural birch dowels.",
        tags: ["Textile", "Wall Art"],
      },
    ],
  },
  "vnd-2": {
    category: "Electronics",
    items: [
      {
        title: "Wireless ANC Studio Headphones",
        price: 249,
        compareAtPrice: 299,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop",
        desc: "40mm custom beryllium drivers with hybrid active noise cancellation, 45-hour battery life, and buttery sheepskin ear cushions.",
        tags: ["Audio", "Headphones", "Wireless"],
      },
      {
        title: "Custom Mechanical Keyboard (Hot-swappable)",
        price: 185,
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&fit=crop",
        desc: "CNC Anodized aluminum case with gasket mount structure, factory-lubed linear switches, and dye-sub PBT keycaps.",
        tags: ["Mechanical Keyboard", "Tech", "Workstation"],
      },
      {
        title: "Solid Walnut Headphone Stand",
        price: 52,
        image:
          "https://images.unsplash.com/photo-1584679109597-c656b19974c9?w=800&fit=crop",
        desc: "Ergonomic curved solid walnut headphone cradle with heavy powder-coated steel base.",
        tags: ["Accessories", "Walnut", "Audio"],
      },
      {
        title: "Braided USB-C Aviator Cable",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&fit=crop",
        desc: "Double-sleeved coiled paracord mechanical keyboard cable with detachable GX16 aviator connector.",
        tags: ["Cable", "Keyboard", "Tech"],
      },
      {
        title: "Hi-Res Desktop USB DAC & Amp",
        price: 145,
        compareAtPrice: 175,
        image:
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&fit=crop",
        desc: "ESS Sabre 32-bit DAC chip supporting DSD512 and MQA decoding with a balanced 4.4mm output.",
        tags: ["Audio", "DAC", "Hi-Fi"],
      },
      {
        title: "Ergonomic Vertical Wireless Mouse",
        price: 78,
        image:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&fit=crop",
        desc: "57-degree natural handshake posture mouse with whisper-quiet mechanical switches and dual Bluetooth.",
        tags: ["Mouse", "Ergonomics"],
      },
      {
        title: "Aluminum MagSafe Wireless Charger Pad",
        price: 49,
        image:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&fit=crop",
        desc: "15W fast wireless charging pad weighted with recycled aluminum and trimmed in vegetable-tanned leather.",
        tags: ["Charger", "Wireless"],
      },
      {
        title: "Rotary Media Knob Controller",
        price: 64,
        image:
          "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&fit=crop",
        desc: "Programmable aluminum stepped dial with RGB backlighting for volume, scrubbing, and hotkeys.",
        tags: ["Desk", "Controller"],
      },
      {
        title: "Noise-Cancelling True Wireless Earbuds",
        price: 139,
        compareAtPrice: 169,
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&fit=crop",
        desc: "Graphene dynamic drivers with transparency mode, IPX5 sweat resistance, and wireless charging case.",
        tags: ["Earbuds", "Wireless", "Audio"],
      },
      {
        title: "Magnetic Desk Cable Weight",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&fit=crop",
        desc: "Dense solid zinc alloy desktop cable anchor holding up to 3 charging cables.",
        tags: ["Accessories", "Organization"],
      },
    ],
  },
  "vnd-3": {
    category: "Fashion",
    items: [
      {
        title: "Heritage Full-Grain Leather Briefcase",
        price: 320,
        compareAtPrice: 380,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&fit=crop",
        desc: "Vegetable-tanned full-grain leather laptop satchel built with solid brass hardware, YKK zippers, and 16-inch sleeve.",
        tags: ["Leather", "Briefcase", "Work"],
      },
      {
        title: "Slim Bifold Leather Card Wallet",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&fit=crop",
        desc: "Ultra-compact RFID-blocking wallet holding up to 8 cards and folded cash. Hand-stitched with waxed linen thread.",
        tags: ["Wallet", "Accessories", "Leather"],
      },
      {
        title: "Horween Leather Minimalist Passport Cover",
        price: 56,
        image:
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&fit=crop",
        desc: "Travel companion crafted from famous Chicago Horween Dublin leather with boarding pass slot.",
        tags: ["Travel", "Leather"],
      },
      {
        title: "Full-Grain Leather Camera Strap",
        price: 42,
        image:
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&fit=crop",
        desc: "Cushioned neck strap with heavy-duty split rings and anti-scratch leather bumpers.",
        tags: ["Camera", "Photography", "Leather"],
      },
      {
        title: "Vintage Brass Key Ring & Leather Clasp",
        price: 24,
        image:
          "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&fit=crop",
        desc: "Heavy solid sand-cast brass snap shackle with bridle leather loop.",
        tags: ["Keyring", "EDC"],
      },
      {
        title: "Handmade Leather Field Notes Journal Cover",
        price: 38,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop",
        desc: "Fits standard 3.5x5.5 inch pocket memo books with interior pen sleeve.",
        tags: ["Journal", "Stationery"],
      },
      {
        title: "Full-Grain Leather Duffle Travel Bag",
        price: 360,
        compareAtPrice: 420,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&fit=crop",
        desc: "Weekend travel duffle with reinforced base feet, luggage tag, and padded shoulder strap.",
        tags: ["Luggage", "Travel", "Duffle"],
      },
      {
        title: "Leather Desk Valet Tray",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fit=crop",
        desc: "Corner-snapping catch-all tray for keys, coins, and watch.",
        tags: ["Valet", "Desk"],
      },
      {
        title: "Waxed Canvas & Leather Apron",
        price: 89,
        image:
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&fit=crop",
        desc: "Heavy 16oz canvas workshop apron with adjustable leather cross-back harness.",
        tags: ["Workshop", "Apron"],
      },
      {
        title: "Braided Leather Bracelet with Magnetic Clasp",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1611591475152-4777543827e5?w=800&fit=crop",
        desc: "Bolo cord braided leather cuff with matte black stainless steel magnetic lock.",
        tags: ["Jewelry", "Bracelet"],
      },
    ],
  },
  "vnd-4": {
    category: "Home & Living",
    items: [
      {
        title: "Hinoki Cypress Tea Tray",
        price: 95,
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&fit=crop",
        desc: "Naturally aromatic Japanese cypress wood tray with traditional concealed mortise joints.",
        tags: ["Woodwork", "Tea", "Japanese"],
      },
      {
        title: "Hand-Carved Walnut Salad Servers",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&fit=crop",
        desc: "Pair of organic contoured serving spoons treated with cold-pressed walnut oil.",
        tags: ["Kitchen", "Woodwork"],
      },
      {
        title: "Cherry Wood Chopstick Rest Set (4pcs)",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&fit=crop",
        desc: "Minimalist pebble-shaped chopstick rests hand-planed from wild mountain cherry.",
        tags: ["Tableware", "Japanese"],
      },
      {
        title: "Zelkova Wood Rice Bowl",
        price: 52,
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
        desc: "Turned Japanese zelkova bowl sealed with natural clear urushi lacquer.",
        tags: ["Bowl", "Wood"],
      },
      {
        title: "Bespoke Hinoki Bath Stool",
        price: 110,
        compareAtPrice: 140,
        image:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&fit=crop",
        desc: "Traditional onsen bath stool naturally resistant to humidity with soothing cedar aroma.",
        tags: ["Bath", "Stool"],
      },
      {
        title: "Cedarwood Incense Holder Tray",
        price: 34,
        image:
          "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&fit=crop",
        desc: "Elongated channel tray catching all falling ash with brass incense bead.",
        tags: ["Incense", "Meditation"],
      },
      {
        title: "End-Grain Cutting Board",
        price: 145,
        image:
          "https://images.unsplash.com/photo-1580481077195-c328a37ea71a?w=800&fit=crop",
        desc: "Heavy 2-inch thick checkered cutting block gentle on knife edges.",
        tags: ["Kitchen", "Cutting Board"],
      },
      {
        title: "Hand-Turned Wooden Matcha Whisk Holder",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&fit=crop",
        desc: "Preserves the delicate curved shape of your bamboo chasen whisk.",
        tags: ["Matcha", "Tea"],
      },
      {
        title: "Japanese Kanna Planed Coasters (Set of 4)",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&fit=crop",
        desc: "Silky smooth end-grain drink coasters showcasing natural growth rings.",
        tags: ["Coasters", "Woodwork"],
      },
      {
        title: "Ash Wood Desktop Book Stand",
        price: 65,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop",
        desc: "Foldable cookbook and tablet easel with magnetic angle lock.",
        tags: ["Desk", "Organization"],
      },
    ],
  },
  "vnd-5": {
    category: "Home & Living",
    items: [
      {
        title: "Terracotta Pedestal Planter",
        price: 74,
        compareAtPrice: 90,
        image:
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&fit=crop",
        desc: "Elevated fluted terracotta plant pot baked in Mediterranean wood-fired kilns.",
        tags: ["Planter", "Terracotta"],
      },
      {
        title: "Unglazed Ochre Amphora Vase",
        price: 88,
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
        desc: "Dual-handled ancient Mediterranean vessel silhouette crafted with rough grogged clay.",
        tags: ["Vase", "Ceramic"],
      },
      {
        title: "Earthy Ceramic Pouring Pitcher",
        price: 52,
        image:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&fit=crop",
        desc: "Drip-free spout water and sangria jug with raw clay base.",
        tags: ["Pitcher", "Tableware"],
      },
      {
        title: "Clay Tapas Ramekins (Set of 6)",
        price: 42,
        image:
          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&fit=crop",
        desc: "Oven-to-table traditional clay dishes for olives, oils, and warm tapas.",
        tags: ["Kitchen", "Tapas"],
      },
      {
        title: "Chunky Stoneware Mug with Raw Foot",
        price: 34,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&fit=crop",
        desc: "14oz coffee mug featuring a comfortable two-finger handle and cream glaze.",
        tags: ["Mug", "Ceramic"],
      },
      {
        title: "Terracotta Herb Pots Trio with Tray",
        price: 68,
        image:
          "https://images.unsplash.com/photo-1584679109597-c656b19974c9?w=800&fit=crop",
        desc: "Trio of 4-inch kitchen windowsill pots for basil, mint, and thyme.",
        tags: ["Herbs", "Planters"],
      },
      {
        title: "Sculptural Clay Totem Candle Holder",
        price: 46,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&fit=crop",
        desc: "Stackable geometric terracotta shapes designed to hold dinner tapers.",
        tags: ["Candleholder", "Decor"],
      },
      {
        title: "Raw Earth Jewelry Catch-all Dish",
        price: 26,
        image:
          "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&fit=crop",
        desc: "Irregular organic rim bowl with speckled volcanic ash accents.",
        tags: ["Jewelry", "Dish"],
      },
      {
        title: "Terracotta Wine Cooler Cylinder",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&fit=crop",
        desc: "Natural evaporative cooling keeps white wine chilled without ice.",
        tags: ["Wine", "Entertaining"],
      },
      {
        title: "Hand-pinched Clay Spoon Rest",
        price: 20,
        image:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&fit=crop",
        desc: "Stovetop tool rest glazed with food-safe satin cream.",
        tags: ["Kitchen", "Ceramic"],
      },
    ],
  },
  "vnd-6": {
    category: "Home & Living",
    items: [
      {
        title: "Solid Brass Task Desk Lamp",
        price: 189,
        compareAtPrice: 225,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&fit=crop",
        desc: "Articulated brushed brass desk luminaire with dimmable warm 2700K LED and touch switch.",
        tags: ["Lighting", "Brass", "Lamp"],
      },
      {
        title: "Pleated Linen Pendant Shade",
        price: 94,
        image:
          "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&fit=crop",
        desc: "Conical origami-folded Belgian linen ceiling shade diffusing soft glow.",
        tags: ["Lighting", "Pendant"],
      },
      {
        title: "Mushroom Cordless Ambient Table Lamp",
        price: 78,
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&fit=crop",
        desc: "USB-C rechargeable bedside lamp with 3 color temperatures and 20hr battery life.",
        tags: ["Lamp", "Cordless"],
      },
      {
        title: "Smoked Glass Globe Sconce",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&fit=crop",
        desc: "Hardwired wall light with hand-blown tinted sphere and aged bronze backing.",
        tags: ["Sconce", "Lighting"],
      },
      {
        title: "Minimalist Arc Floor Lamp",
        price: 240,
        compareAtPrice: 290,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&fit=crop",
        desc: "Sweeping powder-coated steel cantilever lamp resting in a heavy travertine stone base.",
        tags: ["Floor Lamp", "Lighting"],
      },
      {
        title: "Porcelain Acoustic Speaker Lamp",
        price: 135,
        image:
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&fit=crop",
        desc: "Combination Bluetooth speaker and mood lantern encased in translucent bone china.",
        tags: ["Speaker", "Lamp"],
      },
      {
        title: "Adjustable Clip-on Headboard Reading Light",
        price: 52,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop",
        desc: "Flexible gooseneck reading spotlight with padded brass clamp.",
        tags: ["Reading", "Light"],
      },
      {
        title: "Vintage Filament Edison Bulb (Pack of 3)",
        price: 26,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&fit=crop",
        desc: "Spiral tungsten-style LED filament bulbs casting a cozy 2200K amber hue.",
        tags: ["Bulbs", "Lighting"],
      },
      {
        title: "Perforated Metal Lantern with Handle",
        price: 64,
        image:
          "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&fit=crop",
        desc: "Outdoor patio lantern projecting starry shadows on surrounding surfaces.",
        tags: ["Lantern", "Outdoor"],
      },
      {
        title: "Ceramic Orb Touch Dimmer Lamp",
        price: 82,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop",
        desc: "Matte terracotta base with milk glass globe activated by simple surface touch.",
        tags: ["Lighting", "Modern"],
      },
    ],
  },
  "vnd-7": {
    category: "Wellness",
    items: [
      {
        title: "Wild Rosehip & Sea Buckthorn Facial Oil",
        price: 54,
        image:
          "https://images.unsplash.com/photo-1608248597359-54845512b9d9?w=800&fit=crop",
        desc: "Cold-pressed organic botanical facial serum rich in vitamins A, C, and essential omegas.",
        tags: ["Skincare", "Organic", "Wellness"],
      },
      {
        title: "French Green Clay Purifying Mask",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&fit=crop",
        desc: "Detoxifying facial powder blended with matcha green tea and chamomile buds.",
        tags: ["Clay", "Mask", "Facial"],
      },
      {
        title: "Himalayan Pink Salt Bath Soak with Lavender",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&fit=crop",
        desc: "Mineral-rich coarse bath crystals infused with French lavender and sweet almond oil.",
        tags: ["Bath", "Relaxation"],
      },
      {
        title: "Artisan Dry Body Brush with Sisal Bristles",
        price: 22,
        image:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&fit=crop",
        desc: "Exfoliating natural plant fiber brush set in beechwood for lymphatic drainage.",
        tags: ["Body Brush", "Wellness"],
      },
      {
        title: "Restorative Chamomile & Valerian Herbal Tea",
        price: 18,
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&fit=crop",
        desc: "Organic loose leaf caffeine-free botanical blend for deep restful sleep.",
        tags: ["Tea", "Herbal"],
      },
      {
        title: "Rose Quartz Gua Sha & Facial Roller Duo",
        price: 34,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop",
        desc: "Hand-carved natural crystal contouring set soothing tension and puffiness.",
        tags: ["Gua Sha", "Beauty"],
      },
      {
        title: "Aromatherapy Shower Steamer Tablets (Set of 6)",
        price: 24,
        image:
          "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&fit=crop",
        desc: "Eucalyptus and peppermint essential oil tablets transforming showers into a spa.",
        tags: ["Aromatherapy", "Shower"],
      },
      {
        title: "Raw Shea Butter & Vanilla Bean Body Balm",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1608248597359-54845512b9d9?w=800&fit=crop",
        desc: "Ultra-hydrating whipped moisturizer for dry elbows, hands, and cuticles.",
        tags: ["Body Balm", "Moisturizer"],
      },
      {
        title: "Silk Sleep Eye Mask with Lavender Sachet",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&fit=crop",
        desc: "Pure mulberry silk padded eye cover blocking 100% light with gentle scent.",
        tags: ["Sleep", "Silk"],
      },
      {
        title: "Botanical Room & Pillow Mist",
        price: 26,
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&fit=crop",
        desc: "Cedarwood, sage, and sweet orange linen spray in amber glass bottle.",
        tags: ["Mist", "Fragrance"],
      },
    ],
  },
  "vnd-8": {
    category: "Home & Living",
    items: [
      {
        title: "Hand-Knotted Moroccan Wool Rug (5x8 ft)",
        price: 420,
        compareAtPrice: 510,
        image:
          "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&fit=crop",
        desc: "Plush un-dyed cream sheep wool rug woven with subtle geometric diamond patterns by Atlas artisans.",
        tags: ["Rug", "Wool", "Textiles"],
      },
      {
        title: "Organic Washed Linen Throw Blanket",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&fit=crop",
        desc: "Stonewashed breathable French flax blanket finished with frayed eyelash fringes.",
        tags: ["Blanket", "Linen"],
      },
      {
        title: "Heavy Woven Bouclé Cushion Cover",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1580481077195-c328a37ea71a?w=800&fit=crop",
        desc: "Tactile textured cream bouclé decorative pillow case with hidden zipper.",
        tags: ["Cushion", "Decor"],
      },
      {
        title: "Chunky Hand-Spun Wool Floor Pouf",
        price: 135,
        image:
          "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&fit=crop",
        desc: "Sturdy structured ottoman filled with recycled cotton batting for casual seating.",
        tags: ["Pouf", "Seating"],
      },
      {
        title: "Hand-Dyed Indigo Linen Table Runner",
        price: 52,
        image:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&fit=crop",
        desc: "Shibori-dyed natural linen runner bringing relaxed artisan elegance to the dining table.",
        tags: ["Table Runner", "Indigo"],
      },
      {
        title: "Waffle Weave Organic Cotton Bath Towel Set",
        price: 68,
        image:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&fit=crop",
        desc: "Ultra-absorbent honeycombed cotton bath sheet and hand towel in warm oatmeal.",
        tags: ["Towels", "Bath"],
      },
      {
        title: "Macramé Botanical Plant Hanger",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&fit=crop",
        desc: "Braided unbleached cotton cord hanger suspended from a natural driftwood ring.",
        tags: ["Macrame", "Planter"],
      },
      {
        title: "Hand-Loomed Alpaca Wool Scarf",
        price: 85,
        image:
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&fit=crop",
        desc: "Featherweight Peruvian baby alpaca scarf offering superior insulation.",
        tags: ["Scarf", "Alpaca"],
      },
      {
        title: "Tufted Geometric Wall Tapestry",
        price: 95,
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&fit=crop",
        desc: "Multi-level loop pile wool wall hanging bringing warmth and acoustic dampening to walls.",
        tags: ["Tapestry", "Art"],
      },
      {
        title: "Quilted Cotton Linen Bed Coverlet",
        price: 180,
        compareAtPrice: 220,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop",
        desc: "Stitched channel quilt in muted sage green suitable for year-round layering.",
        tags: ["Bedding", "Quilt"],
      },
    ],
  },
  "vnd-9": {
    category: "Electronics",
    items: [
      {
        title: "CNC Aluminum Desk Pad (Slate Grey)",
        price: 74,
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&fit=crop",
        desc: "Anodized sandblasted aluminum workstation mat backed with non-slip cork.",
        tags: ["Desk Pad", "Aluminum", "Tech"],
      },
      {
        title: "Titanium Mechanical Switch Puller Tool",
        price: 24,
        image:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&fit=crop",
        desc: "Grade 5 titanium precision tool for custom keyboard builders.",
        tags: ["Keyboard", "Tools"],
      },
      {
        title: "Magnetic Modular Desk Organizer Tray",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&fit=crop",
        desc: "Snap-together interlocking aluminum trays for pens, USB drives, and calipers.",
        tags: ["Organization", "Desk"],
      },
      {
        title: "Low-Profile Wrist Rest for 75% Keyboards",
        price: 38,
        image:
          "https://images.unsplash.com/photo-1584679109597-c656b19974c9?w=800&fit=crop",
        desc: "Milled from solid resin-stabilized American walnut wood.",
        tags: ["Wrist Rest", "Keyboard"],
      },
      {
        title: "Aluminum Under-Desk Headphone Hanger",
        price: 22,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop",
        desc: "3M VHB adhesive clamp supporting heavy planar headphones out of sight.",
        tags: ["Hanger", "Audio"],
      },
      {
        title: "Weighted Brass Pen and Stylus Stand",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop",
        desc: "Micro-suction base brass pedestal holding your favorite writing instrument upright.",
        tags: ["Pen Stand", "Desk"],
      },
      {
        title: "Custom Dye-Sub PBT Keycap Set (Japanese Roots)",
        price: 68,
        image:
          "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&fit=crop",
        desc: "134-key cherry profile thick PBT keycaps with crisp sublegends.",
        tags: ["Keycaps", "Keyboard"],
      },
      {
        title: "Heavy Brass Desk Spinning Top EDC",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&fit=crop",
        desc: "Silicon nitride ceramic contact ball spinning for up to 8 minutes on smooth surfaces.",
        tags: ["EDC", "Desk Toy"],
      },
      {
        title: "Aluminum Monitor Riser Stand",
        price: 92,
        image:
          "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&fit=crop",
        desc: "Ergonomic screen elevator storing full-size keyboard beneath with side USB hub.",
        tags: ["Monitor Stand", "Ergonomics"],
      },
      {
        title: "Ceramic Lube Station for Keyboard Switches",
        price: 35,
        image:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&fit=crop",
        desc: "Holds 36 switch stems and housings simultaneously for custom switch modding.",
        tags: ["Keyboard", "Station"],
      },
    ],
  },
  "vnd-10": {
    category: "Fashion",
    items: [
      {
        title: "Relaxed Fit Belgian Linen Overshirt",
        price: 135,
        compareAtPrice: 165,
        image:
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&fit=crop",
        desc: "Breathable heavy-weight linen button-up tailored with horn buttons and double chest pockets.",
        tags: ["Linen", "Shirt", "Fashion"],
      },
      {
        title: "Wide-Leg Organic Cotton Chino Trousers",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&fit=crop",
        desc: "Pleated front casual trousers in stone beige crafted from 100% GOTS certified cotton twill.",
        tags: ["Pants", "Chino"],
      },
      {
        title: "Chunky Ribbed Wool Fisherman Beanie",
        price: 38,
        image:
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&fit=crop",
        desc: "Non-scratch merino wool watch cap with adjustable fold-over cuff.",
        tags: ["Beanie", "Wool"],
      },
      {
        title: "Raw Denim Workwear Chore Jacket",
        price: 160,
        compareAtPrice: 195,
        image:
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&fit=crop",
        desc: "13oz Japanese selvedge denim utility jacket developing unique fades over time.",
        tags: ["Jacket", "Denim"],
      },
      {
        title: "Woven Silk Knit Tie in Forest Green",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&fit=crop",
        desc: "Square-bottom textured Italian silk necktie for smart casual outfits.",
        tags: ["Tie", "Accessories"],
      },
      {
        title: "Heavyweight Cotton Boxy Tee (2-Pack)",
        price: 52,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fit=crop",
        desc: "260 GSM combed cotton vintage cut t-shirt holding its structure through daily washes.",
        tags: ["T-Shirt", "Basics"],
      },
      {
        title: "Brushed Mohair Blend Scarf",
        price: 78,
        image:
          "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&fit=crop",
        desc: "Ultra-soft fuzzy winter blanket scarf featuring bold neutral color blocks.",
        tags: ["Scarf", "Winter"],
      },
      {
        title: "Waxed Canvas Utility Tote Bag",
        price: 84,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&fit=crop",
        desc: "Water-resistant commuter tote featuring bridle leather shoulder handles.",
        tags: ["Tote", "Bag"],
      },
      {
        title: "Camp Collar Embroidered Resort Shirt",
        price: 95,
        image:
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&fit=crop",
        desc: "Lightweight rayon-cotton blend shirt decorated with tonal botanical chainstitch.",
        tags: ["Shirt", "Resort"],
      },
      {
        title: "Minimalist Leather Dress Belt with Brass Buckle",
        price: 58,
        image:
          "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&fit=crop",
        desc: "32mm wide vegetable-tanned leather belt with beveled and burnished edges.",
        tags: ["Belt", "Leather"],
      },
    ],
  },
  // Vendors 11 to 20:
  "vnd-11": {
    category: "Art & Crafts",
    items: [
      {
        title: "Wabi-Sabi Shino Glaze Matcha Bowl",
        price: 64,
        image:
          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&fit=crop",
        desc: "Hand-pinched ceramic chawan with intentional crackle glaze and tactile thumb rest.",
        tags: ["Ceramic", "Matcha", "Art"],
      },
      {
        title: "Speckled Ceramic Ramen Bowls (Set of 2)",
        price: 76,
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
        desc: "Deep 32oz noodle soup bowls equipped with matching ceramic soup ladles.",
        tags: ["Bowls", "Kitchen"],
      },
      {
        title: "Rough Clay Pour-Over Dripper Cone",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&fit=crop",
        desc: "Internal spiral ribs designed for optimum extraction rate and paper filter fit.",
        tags: ["Coffee", "Ceramic"],
      },
      {
        title: "Ceramic Ikebana Flower Frog Vase",
        price: 42,
        image:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&fit=crop",
        desc: "Shallow stoneware water dish with built-in metal kenzan pin frog.",
        tags: ["Ikebana", "Flowers"],
      },
      {
        title: "Handmade Ceramic Butter Bell Crock",
        price: 38,
        image:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&fit=crop",
        desc: "French water crock keeping butter spreadable at room temperature without spoiling.",
        tags: ["Butter", "Kitchen"],
      },
      {
        title: "Sake Bottle & Ochoko Cups (3-Piece Set)",
        price: 58,
        image:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&fit=crop",
        desc: "Tokkuri decanter and two dipping cups glazed in stormy iron blue.",
        tags: ["Sake", "Entertaining"],
      },
      {
        title: "Speckled Stoneware Olive Oil Bottle",
        price: 44,
        image:
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&fit=crop",
        desc: "Opaque ceramic cruet with weighted stainless steel flap pourer.",
        tags: ["Oil", "Kitchen"],
      },
      {
        title: "Minimalist Ceramic Salt Cellar with Wooden Spoon",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&fit=crop",
        desc: "Countertop pinch pot with loose-fit cedar lid.",
        tags: ["Salt", "Countertop"],
      },
      {
        title: "Architectural Ceramic Bookends",
        price: 55,
        image:
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&fit=crop",
        desc: "Weighted hollow ceramic stepped arch bookends with velvet bottoms.",
        tags: ["Bookends", "Decor"],
      },
      {
        title: "Hand-Carved Ceramic Incense Vessel",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&fit=crop",
        desc: "Smoky raku-fired burner bowl supporting stick and cone incense.",
        tags: ["Incense", "Ceramic"],
      },
    ],
  },
  "vnd-12": {
    category: "Home & Living",
    items: [
      {
        title: "Reclaimed Wood Floating Shelf (36-inch)",
        price: 88,
        image:
          "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&fit=crop",
        desc: "Salvaged historic timber shelf with hidden heavy-duty steel mounting rod system.",
        tags: ["Wood", "Shelf", "Rustic"],
      },
      {
        title: "Hand-Forged Steel Triangle Bookends",
        price: 46,
        image:
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&fit=crop",
        desc: "Blackened raw steel plates with visible anvil hammer textures.",
        tags: ["Steel", "Bookends"],
      },
      {
        title: "Live Edge Walnut Catch-all Tray",
        price: 58,
        image:
          "https://images.unsplash.com/photo-1580481077195-c328a37ea71a?w=800&fit=crop",
        desc: "Carved from single walnut log preserving natural bark edge contour.",
        tags: ["Walnut", "Tray"],
      },
      {
        title: "Industrial Pipe and Wood Coat Rack",
        price: 72,
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&fit=crop",
        desc: "Cast malleable iron pipe fixtures anchored to charred yakisugi cedar plank.",
        tags: ["Coat Rack", "Entryway"],
      },
      {
        title: "Heavy Timber Bench with Steel Hairpin Legs",
        price: 195,
        compareAtPrice: 240,
        image:
          "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&fit=crop",
        desc: "2-person entryway seating bench made from 3-inch thick fir beam.",
        tags: ["Bench", "Furniture"],
      },
      {
        title: "Magnetic Wooden Knife Bar (18-inch)",
        price: 54,
        image:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&fit=crop",
        desc: "Neodymium magnet array embedded seamlessly behind figured maple wood.",
        tags: ["Knife Bar", "Kitchen"],
      },
      {
        title: "Cast Iron Bottle Opener Wall Mount",
        price: 24,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&fit=crop",
        desc: "Vintage style beer cap popper with magnetic cap catcher.",
        tags: ["Bar", "Opener"],
      },
      {
        title: "Solid Walnut Paper Towel Holder",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&fit=crop",
        desc: "One-handed tear kitchen roll stand with weighted iron core.",
        tags: ["Kitchen", "Paper Towel"],
      },
      {
        title: "Steel Firewood Log Carrier with Stand",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&fit=crop",
        desc: "Canvas sling resting in clean geometric tubular steel fireplace rack.",
        tags: ["Fireplace", "Storage"],
      },
      {
        title: "Hand-Carved Wooden Dough Bowl",
        price: 68,
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
        desc: "Elongated centerpiece trough for fruit, bread, or botanicals.",
        tags: ["Bowl", "Rustic"],
      },
    ],
  },
  "vnd-13": {
    category: "Electronics",
    items: [
      {
        title: "Planar Magnetic Open-Back Headphones",
        price: 380,
        compareAtPrice: 450,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop",
        desc: "Ultra-thin 100mm planar transducer diaphragm delivering expansive holographic soundstage.",
        tags: ["Audiophile", "Headphones"],
      },
      {
        title: "Custom Braided OCC Silver Audio Cable",
        price: 85,
        image:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&fit=crop",
        desc: "8-core monocrystalline pure silver cable with 4.4mm balanced pentaconn termination.",
        tags: ["Cable", "Audio"],
      },
      {
        title: "Curved Acrylic Headphone Display Stand",
        price: 34,
        image:
          "https://images.unsplash.com/photo-1584679109597-c656b19974c9?w=800&fit=crop",
        desc: "Clear smoked acrylic omega arch keeping headband tension intact.",
        tags: ["Stand", "Audio"],
      },
      {
        title: "Portable High-Power DAC Dongle",
        price: 68,
        image:
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&fit=crop",
        desc: "Dual Cirrus Logic CS43131 chips driving 300-ohm cans directly from smartphones.",
        tags: ["DAC", "Audio"],
      },
      {
        title: "Perforated Lambskin Replacement Ear Pads",
        price: 42,
        image:
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&fit=crop",
        desc: "Memory foam angled rings wrapped in genuine breathable leather.",
        tags: ["Pads", "Headphones"],
      },
      {
        title: "Felt Audio Equipment Dust Cover",
        price: 26,
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&fit=crop",
        desc: "Laser-cut 3mm acoustic felt mat protecting tube amps and turntables.",
        tags: ["Dust Cover", "Audio"],
      },
      {
        title: "Hard-shell Travel Case for Large Over-Ears",
        price: 39,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&fit=crop",
        desc: "EVA ballistic nylon shell with dedicated internal cable pouch.",
        tags: ["Case", "Travel"],
      },
      {
        title: "Anti-Vibration Turntable Isolation Feet (4-pack)",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&fit=crop",
        desc: "Sorbothane elastomer core dampening floor vibrations and acoustic feedback.",
        tags: ["Turntable", "Hi-Fi"],
      },
      {
        title: "Carbon Fiber Stylus Cleaning Brush",
        price: 19,
        image:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&fit=crop",
        desc: "Million-bristle micro brush safely clearing static and dust from vinyl needles.",
        tags: ["Vinyl", "Cleaning"],
      },
      {
        title: "Heavy Solid Brass Record Stabilizer Weight",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&fit=crop",
        desc: "420g vinyl clamp flattening warped records for cleaner bass tracking.",
        tags: ["Vinyl", "Record Weight"],
      },
    ],
  },
  "vnd-14": {
    category: "Home & Living",
    items: [
      {
        title: "Amber & Smoked Cedarwood Soy Candle",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&fit=crop",
        desc: "Hand-poured 10oz candle in matte black glass with crackling wooden wick. 60-hour burn.",
        tags: ["Candle", "Soy", "Fragrance"],
      },
      {
        title: "Wild Fig & Bergamot Reed Diffuser",
        price: 42,
        image:
          "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&fit=crop",
        desc: "Flameless natural rattan reeds dispersing crisp mediterranean fragrance for 4+ months.",
        tags: ["Diffuser", "Fragrance"],
      },
      {
        title: "Matte Black Candle Wick Trimmer & Snuffer Set",
        price: 24,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&fit=crop",
        desc: "Stainless steel care tools preventing smoke and extending candle life.",
        tags: ["Candle Care", "Tools"],
      },
      {
        title: "Palo Santo & White Sage Ceramic Burner Dish",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&fit=crop",
        desc: "Dedicated holy wood holder bowl with brass center clamp.",
        tags: ["Smudge", "Burner"],
      },
      {
        title: "Highland Pine & Moss Travel Tin Candle",
        price: 18,
        image:
          "https://images.unsplash.com/photo-1608248597359-54845512b9d9?w=800&fit=crop",
        desc: "Compact seamless brass tin candle for hotel rooms and cabin getaways.",
        tags: ["Travel", "Candle"],
      },
      {
        title: "Honey & Toasted Tobacco Pillar Candle",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop",
        desc: "Beeswax-blend ribbed column candle burning cleanly with zero soot.",
        tags: ["Pillar", "Beeswax"],
      },
      {
        title: "Apothecary Match Bottle with Strike Pad",
        price: 16,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop",
        desc: "Corked vintage glass bottle filled with 60 slow-burning 4-inch black safety matches.",
        tags: ["Matches", "Decor"],
      },
      {
        title: "Cardamom & Sea Salt Room Spray",
        price: 26,
        image:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&fit=crop",
        desc: "Instant aroma refresh for upholstery, curtains, and living spaces.",
        tags: ["Room Spray", "Aroma"],
      },
      {
        title: "Beeswax Taper Candles (Set of 4)",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&fit=crop",
        desc: "10-inch hand-dipped pure beeswax dinner tapers emitting natural honey scent.",
        tags: ["Tapers", "Dinner"],
      },
      {
        title: "Soy Wax Melt Cubes (Vanilla & Sandalwood)",
        price: 14,
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
        desc: "6-piece snap bar for wax warmers delivering up to 40 hours of fragrance.",
        tags: ["Wax Melts", "Home"],
      },
    ],
  },
  "vnd-15": {
    category: "Home & Living",
    items: [
      {
        title: "Matte Black Gooseneck Pour-Over Kettle",
        price: 78,
        compareAtPrice: 95,
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&fit=crop",
        desc: "Ergonomic counterbalance handle with built-in lid thermometer for exact 93°C water flow.",
        tags: ["Coffee", "Kettle", "Barista"],
      },
      {
        title: "Precision Conical Burr Manual Hand Grinder",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&fit=crop",
        desc: "Stainless steel 48mm heptagonal burrs delivering consistent espresso to French press grind.",
        tags: ["Coffee Grinder", "Barista"],
      },
      {
        title: "Double-Wall Insulated Glass Coffee Server",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&fit=crop",
        desc: "600ml heat-resistant carafe keeping brewed coffee piping hot without outer condensation.",
        tags: ["Carafe", "Coffee"],
      },
      {
        title: "Espresso Puck Screen & Solid Tamper (58mm)",
        price: 44,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fit=crop",
        desc: "Calibrated 30lb spring tamper paired with 150-micron dispersion screen.",
        tags: ["Espresso", "Tamper"],
      },
      {
        title: "Rechargable Digital Coffee Scale with Timer",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&fit=crop",
        desc: "0.1g high-precision load cell with auto-tare and flow-rate tracking.",
        tags: ["Scale", "Coffee"],
      },
      {
        title: "Ceramic Cortado Tumblers (Set of 2)",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&fit=crop",
        desc: "4.5oz fluted handleless cups designed specifically for 1:1 espresso and milk.",
        tags: ["Cups", "Coffee"],
      },
      {
        title: "Barista Silicone Tamping Station Mat",
        price: 22,
        image:
          "https://images.unsplash.com/photo-1584679109597-c656b19974c9?w=800&fit=crop",
        desc: "Corner-edge non-slip silicone bumper protecting kitchen countertops.",
        tags: ["Barista", "Mat"],
      },
      {
        title: "Glass Cold Brew Immersion Pitcher (1 Liter)",
        price: 39,
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&fit=crop",
        desc: "Ultra-fine removable mesh core brewing smooth acid-free cold concentrate.",
        tags: ["Cold Brew", "Pitcher"],
      },
      {
        title: "WDT Needle Espresso Distribution Tool",
        price: 25,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&fit=crop",
        desc: "0.35mm acupuncture grade stainless steel wires declumping espresso grind.",
        tags: ["WDT", "Espresso"],
      },
      {
        title: "Vacuum Sealed Coffee Bean Canister",
        price: 34,
        image:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&fit=crop",
        desc: "One-way CO2 degassing valve and date tracker preserving roast freshness.",
        tags: ["Canister", "Storage"],
      },
    ],
  },
  "vnd-16": {
    category: "Art & Crafts",
    items: [
      {
        title: "Pressed Wildflower Archival Art Print",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&fit=crop",
        desc: "Giclée print on 310gsm cotton rag capturing real preserved mountain meadow flora.",
        tags: ["Art Print", "Botanical", "Wall Decor"],
      },
      {
        title: "Deckle-Edge Handmade Cotton Sketchbook",
        price: 38,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop",
        desc: "120 pages of recycled cold-press watercolor paper hand-stitched in raw linen.",
        tags: ["Journal", "Sketchbook"],
      },
      {
        title: "Solid Oak Floating Poster Hanger Frame",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&fit=crop",
        desc: "Strong magnetic wooden bars clamping prints without punching holes.",
        tags: ["Frame", "Poster"],
      },
      {
        title: "Calligraphy Brass Dip Pen & Ink Set",
        price: 44,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&fit=crop",
        desc: "Hand-turned brass nib holder with three flexible nibs and carbon black ink.",
        tags: ["Calligraphy", "Stationery"],
      },
      {
        title: "Botanical Plant Cyanotype Sun Print",
        price: 52,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop",
        desc: "Original Prussian blue exposure of fern fronds developed in natural sunlight.",
        tags: ["Cyanotype", "Art"],
      },
      {
        title: "Hand-Carved Wooden Wax Seal Stamp",
        price: 26,
        image:
          "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&fit=crop",
        desc: "Solid brass stamp head engraved with olive branch motif.",
        tags: ["Wax Seal", "Crafts"],
      },
      {
        title: "Artisanal Mineral Watercolor Paint Pan Set",
        price: 58,
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
        desc: "12 half-pans mulled by hand using pure earth pigments and gum arabic.",
        tags: ["Watercolor", "Paint"],
      },
      {
        title: "Letterpress Thank You Note Cards (Box of 10)",
        price: 22,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&fit=crop",
        desc: "Deep embossed typographic impression on thick cotton cardstock with matching envelopes.",
        tags: ["Stationery", "Cards"],
      },
      {
        title: "Ceramic Palette for Artists",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&fit=crop",
        desc: "Glossy white porcelain tray with 10 mixing wells that never stain.",
        tags: ["Palette", "Art Supplies"],
      },
      {
        title: "Japanese Washi Masking Tape Collector Box",
        price: 24,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fit=crop",
        desc: "Set of 6 rolls featuring botanical illustrations and gold foil stamping.",
        tags: ["Washi Tape", "Crafts"],
      },
    ],
  },
  "vnd-17": {
    category: "Home & Living",
    items: [
      {
        title: "Icelandic Basalt Stone Coasters (Set of 4)",
        price: 44,
        image:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&fit=crop",
        desc: "Cut from natural porous volcanic lava stone absorbing glass condensation instantly.",
        tags: ["Coasters", "Stone", "Decor"],
      },
      {
        title: "Honed Slate Serving Board with Brass Handles",
        price: 58,
        image:
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&fit=crop",
        desc: "Food-grade mineral-oiled natural dark slate platter for charcuterie and cheeses.",
        tags: ["Cheese Board", "Slate"],
      },
      {
        title: "Volcanic Ash Sculptural Paperweight",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop",
        desc: "Raw organic basalt rock specimen hand-polished on one reflective facet.",
        tags: ["Paperweight", "Desk"],
      },
      {
        title: "Stone Mortar and Pestle (Granite)",
        price: 65,
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
        desc: "Heavy unpolished 6-inch basin for crushing whole spices, pesto, and garlic.",
        tags: ["Mortar", "Kitchen"],
      },
      {
        title: "Basalt Taper Candle Holder",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&fit=crop",
        desc: "Dense dark stone cylinder bored with precise standard candle socket.",
        tags: ["Candleholder", "Stone"],
      },
      {
        title: "Whiskey Chilling Stones in Wooden Caddy",
        price: 29,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fit=crop",
        desc: "9 non-porous soapstone cubes chilling spirits without diluting flavor.",
        tags: ["Whiskey", "Bar"],
      },
      {
        title: "Carved Stone Soap Dish with Drainage",
        price: 24,
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&fit=crop",
        desc: "Self-draining angled channels keeping bar soaps dry and firm.",
        tags: ["Soap Dish", "Bath"],
      },
      {
        title: "Sculptural Slate Bookends Pair",
        price: 68,
        image:
          "https://images.unsplash.com/photo-1580481077195-c328a37ea71a?w=800&fit=crop",
        desc: "Rough split-face slate blocks with soft padded undersides.",
        tags: ["Bookends", "Office"],
      },
      {
        title: "Basalt Salt and Pepper Cellars with Spoons",
        price: 38,
        image:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&fit=crop",
        desc: "Twin stacked mini bowls carved from volcanic stone.",
        tags: ["Salt", "Kitchen"],
      },
      {
        title: "Raw Stone Aromatherapy Oil Diffuser",
        price: 35,
        image:
          "https://images.unsplash.com/photo-1608248597359-54845512b9d9?w=800&fit=crop",
        desc: "Porous lava stone naturally absorbing essential oils for gradual passive scenting.",
        tags: ["Diffuser", "Aroma"],
      },
    ],
  },
  "vnd-18": {
    category: "Electronics",
    items: [
      {
        title: "IN-14 Vintage Nixie Tube Desk Clock",
        price: 260,
        compareAtPrice: 310,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&fit=crop",
        desc: "Authentic cold-cathode glass tubes mounted in CNC walnut chassis with RGB underglow.",
        tags: ["Clock", "Nixie", "Vintage"],
      },
      {
        title: "Brushed Titanium Minimalist Wall Dial",
        price: 125,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fit=crop",
        desc: "Silent sweeping quartz movement with raw titanium disc face.",
        tags: ["Clock", "Wall Decor"],
      },
      {
        title: "Mechanical Flip Clock with Acrylic Shield",
        price: 88,
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&fit=crop",
        desc: "Auto-flipping retro gear clock powered by a single D-battery.",
        tags: ["Clock", "Retro"],
      },
      {
        title: "Solid Brass Heavyweight Desk Paperweight Hourglass",
        price: 46,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&fit=crop",
        desc: "30-minute timing hourglass filled with magnetic black iron sand.",
        tags: ["Hourglass", "Desk"],
      },
      {
        title: "Rotary Pomodoro Productivity Mechanical Timer",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&fit=crop",
        desc: "Mechanical spring timer with crisp visual red elapsed disk.",
        tags: ["Timer", "Productivity"],
      },
      {
        title: "Retro Glow Vacuum Tube Audio Preamp",
        price: 175,
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&fit=crop",
        desc: "Dual 6J1 vacuum tubes adding warm analog harmonics to active speakers.",
        tags: ["Audio", "Preamp"],
      },
      {
        title: "Analog Barometer and Weather Station",
        price: 95,
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&fit=crop",
        desc: "Dial barometer, thermometer, and hygrometer set in mahogany plaque.",
        tags: ["Weather", "Barometer"],
      },
      {
        title: "Vintage Meter Style USB Multimeter",
        price: 42,
        image:
          "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&fit=crop",
        desc: "Moving coil needle gauge displaying realtime voltage and wattage output.",
        tags: ["Tech", "Tester"],
      },
      {
        title: "Brass Perpetual Desk Calendar",
        price: 34,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop",
        desc: "Sliding brass rings calculating month and day without battery or expiration.",
        tags: ["Calendar", "Brass"],
      },
      {
        title: "Mechanical Metronome with Bell",
        price: 55,
        image:
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&fit=crop",
        desc: "Traditional clockwork pendulum metronome for acoustic musicians.",
        tags: ["Music", "Metronome"],
      },
    ],
  },
  "vnd-19": {
    category: "Fashion",
    items: [
      {
        title: "Hand-Knit Traditional Aran Cable Sweater",
        price: 185,
        compareAtPrice: 220,
        image:
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&fit=crop",
        desc: "Knit in Galway from 100% pure untreated Irish new wool containing natural water-resistant lanolin.",
        tags: ["Sweater", "Aran", "Wool"],
      },
      {
        title: "Pure Merino Wool Tartan Throw",
        price: 115,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&fit=crop",
        desc: "Heritage muted check blanket woven on traditional shuttle looms.",
        tags: ["Blanket", "Wool"],
      },
      {
        title: "Seamless Donegal Tweed Flat Cap",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&fit=crop",
        desc: "Speckled wool newsboy cap lined with quilted satin for chilly days.",
        tags: ["Cap", "Tweed"],
      },
      {
        title: "Chunky Knit Fingerless Wool Gloves",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&fit=crop",
        desc: "Keep palms warm while leaving fingers free for keyboard and phone typing.",
        tags: ["Gloves", "Wool"],
      },
      {
        title: "Lambswool Cable Knit Cardigan",
        price: 145,
        image:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&fit=crop",
        desc: "Cozy shawl collar button-up cardigan with genuine football leather buttons.",
        tags: ["Cardigan", "Knitwear"],
      },
      {
        title: "Hand-Dyed Chunky Wool Beanie",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&fit=crop",
        desc: "Spun from thick roving yarn with snug elastic rib.",
        tags: ["Beanie", "Winter"],
      },
      {
        title: "Tweed Wool Travel Duffle Backpack",
        price: 160,
        image:
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&fit=crop",
        desc: "Waterproofed tweed wool body trimmed in harness leather.",
        tags: ["Backpack", "Tweed"],
      },
      {
        title: "Alpaca Blend Bed Socks (2-Pack)",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1584679109597-c656b19974c9?w=800&fit=crop",
        desc: "Non-binding elastic cuff lounge socks keeping toes warm all night.",
        tags: ["Socks", "Alpaca"],
      },
      {
        title: "Irish Linen & Wool Fringe Shawl",
        price: 78,
        image:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&fit=crop",
        desc: "Versatile evening wrap blending crisp linen with insulating lambswool.",
        tags: ["Shawl", "Wrap"],
      },
      {
        title: "Wool Cedar Balls Wardrobe Freshener (Pack of 12)",
        price: 18,
        image:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&fit=crop",
        desc: "Protects fine knitwear naturally against moths with aromatic cedar heartwood.",
        tags: ["Care", "Wardrobe"],
      },
    ],
  },
  "vnd-20": {
    category: "Wellness",
    items: [
      {
        title: "California Poppy & Blue Tansy Face Oil",
        price: 58,
        compareAtPrice: 72,
        image:
          "https://images.unsplash.com/photo-1608248597359-54845512b9d9?w=800&fit=crop",
        desc: "Calming botanical infusion soothing redness and delivering deep cellular hydration.",
        tags: ["Facial Oil", "Skincare", "Wellness"],
      },
      {
        title: "Wildcrafted Lavender Balancing Facial Mist",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&fit=crop",
        desc: "Steam-distilled floral water toning pores and setting mineral makeup.",
        tags: ["Facial Mist", "Lavender"],
      },
      {
        title: "Activated Charcoal & Tea Tree Cleansing Bar",
        price: 16,
        image:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&fit=crop",
        desc: "Cold-process detox soap bar pulling impurities from oily and blemish-prone skin.",
        tags: ["Soap", "Cleanser"],
      },
      {
        title: "Wild Orange & Frankincense Lip Treatment",
        price: 14,
        image:
          "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&fit=crop",
        desc: "Rich nourishing salve with beeswax, shea butter, and uplifting citrus notes.",
        tags: ["Lip Balm", "Organic"],
      },
      {
        title: "Dead Sea Mineral Mud Mask",
        price: 34,
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&fit=crop",
        desc: "Authentic therapeutic mineral silt clarifying clogged pores and restoring bounce.",
        tags: ["Mud Mask", "Facial"],
      },
      {
        title: "Golden Jojoba Cold-Pressed Hair Serum",
        price: 38,
        image:
          "https://images.unsplash.com/photo-1608248597359-54845512b9d9?w=800&fit=crop",
        desc: "Weightless botanical shine oil smoothing split ends and taming flyaways.",
        tags: ["Hair", "Serum"],
      },
      {
        title: "Eucalyptus Aromatherapy Shower Spritz",
        price: 26,
        image:
          "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&fit=crop",
        desc: "Mist into warm steam before showering to open nasal passages and clear head.",
        tags: ["Shower", "Aroma"],
      },
      {
        title: "Calendula Soothing Hand Salve",
        price: 22,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop",
        desc: "Emergency relief for gardener hands and weather-chapped skin.",
        tags: ["Hand Salve", "Organic"],
      },
      {
        title: "Herbal Foot Soak Crystals with Peppermint",
        price: 25,
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop",
        desc: "Epsom salt and tea tree soak relieving tired aching feet after long walks.",
        tags: ["Foot Soak", "Bath"],
      },
      {
        title: "Scented Soy Massage Candle (Warm Cocoa & Almond)",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&fit=crop",
        desc: "Melt pool warms into a skin-safe nourishing body oil for relaxing massages.",
        tags: ["Massage", "Candle"],
      },
    ],
  },
};

// Build the 200+ Products Array dynamically from blueprints
export const MOCK_PRODUCTS: Product[] = [];

Object.entries(PRODUCT_CATALOG_BLUEPRINTS).forEach(
  ([vId, { category, items }]) => {
    const vendor = MOCK_VENDORS.find((v) => v.id === vId);
    const vendorName = vendor ? vendor.name : "Independent Studio";

    items.forEach((item, itemIdx) => {
      const slug = item.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-");

      const id = `prod-${vId}-${itemIdx + 1}`;
      const rating = Number((4.6 + (itemIdx % 5) * 0.1).toFixed(1));
      const reviewCount = 12 + itemIdx * 7;

      MOCK_PRODUCTS.push({
        id,
        title: item.title,
        slug: `${slug}-${vId}`,
        description: item.desc,
        price: item.price,
        compareAtPrice: item.compareAtPrice,
        category,
        tags: item.tags,
        images: [item.image],
        stock: 12 + ((itemIdx * 3) % 25),
        vendorId: vId,
        vendorName,
        rating,
        reviewCount,
        reviews: [
          {
            id: `rev-${id}-1`,
            userId: "usr-1",
            userName: "Alex Morgan",
            userAvatar:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            comment:
              "Incredible quality. Arrived beautifully packaged directly from the maker.",
            createdAt: "2024-08-15T10:30:00Z",
          },
        ],
        isFeatured: itemIdx === 0, // Har studio ka pehla product featured
        createdAt: new Date(Date.now() - itemIdx * 86400000 * 3).toISOString(),
      });
    });
  },
);

// ==========================================
// 4. SEED ORDERS
// ==========================================
export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-9821",
    userId: "usr-1",
    customerName: "Alex Morgan",
    customerEmail: "alex@example.com",
    shippingAddress: {
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      postalCode: "97477",
      country: "USA",
    },
    items: [
      {
        productId: "prod-vnd-1-1",
        productTitle: "Minimalist Ceramic Arc Vase",
        productImage:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&fit=crop",
        price: 68.0,
        quantity: 1,
        vendorId: "vnd-1",
        vendorName: "Nordic Living Studio",
      },
      {
        productId: "prod-vnd-2-1",
        productTitle: "Wireless ANC Studio Headphones",
        productImage:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop",
        price: 249.0,
        quantity: 1,
        vendorId: "vnd-2",
        vendorName: "Vance Tech Labs",
      },
    ],
    totalAmount: 317.0,
    subtotal: 317.0,
    shippingFee: 0.0,
    tax: 0.0,
    status: "Processing",
    createdAt: "2024-09-20T14:32:00Z",
  },
];