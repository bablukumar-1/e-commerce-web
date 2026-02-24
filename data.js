// =============================================
// FLIPKART CLONE — PRODUCT DATA
// =============================================

const PRODUCTS = [
  // Electronics
  {
    id: 1, category: 'electronics', subcategory: 'Smartphones',
    brand: 'Samsung', name: 'Samsung Galaxy S24 Ultra 5G 256GB',
    price: 129999, originalPrice: 149999, rating: 4.6, reviews: 18432,
    img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'
    ],
    specs: { Display: '6.8" Dynamic AMOLED 2X', Processor: 'Snapdragon 8 Gen 3', RAM: '12 GB', Storage: '256 GB', Camera: '200 MP + 12 MP + 10 MP', Battery: '5000 mAh', OS: 'Android 14' },
    badge: '13% off', inStock: true, sizes: [], colors: ['#1a1a2e','#c0c0c0','#fffde7'],
    tags: ['trending','bestseller'], description: 'Experience the pinnacle of Samsung innovation with the S24 Ultra. Features the most capable camera system ever, built-in S Pen, and AI-powered Galaxy features.',
    offers: ['10% off on HDFC Credit Card','Extra ₹3000 off on exchange','6 months free Amazon Prime']
  },
  {
    id: 2, category: 'electronics', subcategory: 'Laptops',
    brand: 'Apple', name: 'Apple MacBook Air M3 13" 8GB 256GB',
    price: 114900, originalPrice: 124999, rating: 4.8, reviews: 9234,
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
      'https://images.unsplash.com/photo-1611186871525-4de2e87e29e3?w=400&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80'
    ],
    specs: { Processor: 'Apple M3 (8-core CPU)', RAM: '8 GB Unified', Storage: '256 GB SSD', Display: '13.6" Liquid Retina', Battery: '18 hours', Weight: '1.24 kg', OS: 'macOS Sonoma' },
    badge: '8% off', inStock: true, sizes: [], colors: ['#c0c0c0','#ffd700','#1a1a2e'],
    tags: ['bestseller'], description: 'Supercharged by M3 chip, MacBook Air blasts through everyday tasks and gets way more done than ever before — without a fan.',
    offers: ['No cost EMI from ₹9575/mo','Free shipping','1 year warranty']
  },
  {
    id: 3, category: 'electronics', subcategory: 'Headphones',
    brand: 'Sony', name: 'Sony WH-1000XM5 Wireless ANC Headphones',
    price: 26990, originalPrice: 34990, rating: 4.7, reviews: 23145,
    img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    ],
    specs: { 'ANC': 'Industry-leading', Battery: '30 hours', Connectivity: 'Bluetooth 5.2', Codec: 'LDAC, AAC, SBC', Weight: '250 g', Foldable: 'No' },
    badge: '23% off', inStock: true, sizes: [], colors: ['#1a1a2e','#c8b5a0'],
    tags: ['trending','deal'], description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with crystal clear hands-free calling.',
    offers: ['5% cashback with Flipkart Axis Card','15 days return policy']
  },
  {
    id: 4, category: 'electronics', subcategory: 'Tablets',
    brand: 'Apple', name: 'Apple iPad Air 11" M2 128GB WiFi',
    price: 59900, originalPrice: 64900, rating: 4.7, reviews: 7891,
    img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80'],
    specs: { Chip: 'Apple M2', Display: '11" Liquid Retina', Storage: '128 GB', Camera: '12 MP rear', Battery: 'Up to 10 hours', Weight: '462 g' },
    badge: '8% off', inStock: true, sizes: [], colors: ['#1a73e8','#e0e0e0','#9c27b0'],
    tags: [], description: 'Supercharged for all your creating, studying, and connecting. Apple M2 with blazing-fast performance.',
    offers: ['No cost EMI from ₹4991/mo']
  },
  {
    id: 5, category: 'electronics', subcategory: 'Smartwatches',
    brand: 'Apple', name: 'Apple Watch Series 10 GPS 46mm',
    price: 44900, originalPrice: 49900, rating: 4.8, reviews: 5623,
    img: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80'],
    specs: { Display: 'OLED Always-On', GPS: 'Yes', Battery: '18 hours', 'Water Resistance': '50m', 'Health Sensors': 'ECG, Blood Oxygen, Temperature' },
    badge: '10% off', inStock: true, sizes: [], colors: ['#c0c0c0','#1a1a2e','#e74c3c'],
    tags: ['trending'], description: 'The most advanced version of Apple Watch. Thinner and lighter than ever with the largest display yet.',
    offers: ['Free insurance worth ₹999','Easy EMI options']
  },
  {
    id: 6, category: 'electronics', subcategory: 'Cameras',
    brand: 'Canon', name: 'Canon EOS R50 Mirrorless Camera 18-45mm Kit',
    price: 69990, originalPrice: 79990, rating: 4.5, reviews: 3421,
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80'],
    specs: { Sensor: '24.2 MP APS-C', Processor: 'DIGIC X', AF: 'Dual Pixel CMOS AF II', Video: '4K 30fps', Battery: '390 shots', Weight: '375 g' },
    badge: '12% off', inStock: true, sizes: [], colors: [],
    tags: [], description: 'Perfect for content creators. Compact body with powerful creative tools and intelligent AF.',
    offers: ['Extra ₹2000 off on HDFC','Free camera bag worth ₹1999']
  },

  // Fashion
  {
    id: 7, category: 'fashion', subcategory: 'Men T-Shirts',
    brand: 'Nike', name: 'Nike Dri-FIT Training T-Shirt Premium',
    price: 1795, originalPrice: 2999, rating: 4.4, reviews: 12890,
    img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80'],
    specs: { Material: '100% Polyester', Fit: 'Standard Fit', 'Care Instruction': 'Machine Wash', Country: 'India' },
    badge: '40% off', inStock: true, sizes: ['XS','S','M','L','XL','XXL'], colors: ['#1a1a2e','#2874f0','#e74c3c','#ffffff'],
    tags: ['deal'], description: 'Light and breathable fabric keeps you cool as you dominate your workout.',
    offers: ['Try & Buy available','15 days easy returns']
  },
  {
    id: 8, category: 'fashion', subcategory: 'Women Dresses',
    brand: 'Zara', name: 'Zara Floral Midi Wrap Dress Summer Collection',
    price: 2499, originalPrice: 4999, rating: 4.3, reviews: 6721,
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80'],
    specs: { Material: 'Viscose', Fit: 'Wrap', Length: 'Midi', Occasion: 'Casual/Party' },
    badge: '50% off', inStock: true, sizes: ['XS','S','M','L','XL'], colors: ['#ff6b9d','#4a90d9','#f0c040'],
    tags: ['trending','deal'], description: 'The perfect summer dress with a flattering wrap silhouette and dreamy floral print.',
    offers: ['Free delivery above ₹499','7 days return policy']
  },
  {
    id: 9, category: 'fashion', subcategory: 'Sneakers',
    brand: 'Adidas', name: 'Adidas Ultraboost 24 Running Shoes',
    price: 14999, originalPrice: 19999, rating: 4.6, reviews: 8934,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'],
    specs: { 'Sole Material': 'Continental Rubber', Closure: 'Lace-Up', Occasion: 'Sports', Material: 'Primeknit +' },
    badge: '25% off', inStock: true, sizes: ['6','7','8','9','10','11'], colors: ['#1a1a2e','#ffffff','#e74c3c'],
    tags: ['bestseller'], description: 'Unleash your best run with BOOST cushioning and PRIMEKNIT+ upper for an amazing feel.',
    offers: ['Try in store','30 days return policy']
  },
  {
    id: 10, category: 'fashion', subcategory: 'Jeans',
    brand: "Levi's", name: "Levi's 511 Slim Fit Men's Jeans",
    price: 3599, originalPrice: 5999, rating: 4.4, reviews: 21340,
    img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80'],
    specs: { Material: '99% Cotton 1% Elastane', Fit: 'Slim', Rise: 'Mid Rise', Closure: 'Zip fly with button' },
    badge: '40% off', inStock: true, sizes: ['28','30','32','34','36','38'], colors: ['#1565c0','#212121','#546e7a'],
    tags: [], description: "The 511 Slim fit jeans sit below the waist and are slim through the thigh and leg opening.",
    offers: ['Try & Buy','Easy 30 days return']
  },

  // Home & Kitchen
  {
    id: 11, category: 'home', subcategory: 'Air Fryers',
    brand: 'Philips', name: 'Philips HD9200 Air Fryer 1500W 4.1L',
    price: 5999, originalPrice: 10999, rating: 4.5, reviews: 34520,
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'],
    specs: { Capacity: '4.1 L', Wattage: '1500 W', Technology: 'Rapid Air', Temperature: 'Up to 200°C', Warranty: '2 years' },
    badge: '45% off', inStock: true, sizes: [], colors: ['#212121','#ffffff'],
    tags: ['bestseller','deal'], description: 'Enjoy healthier cooking with up to 90% less fat using Rapid Air technology.',
    offers: ['5% cashback','Free recipe book worth ₹499']
  },
  {
    id: 12, category: 'home', subcategory: 'Coffee Makers',
    brand: 'Nespresso', name: 'Nespresso Vertuo Pop Coffee Machine',
    price: 8990, originalPrice: 12990, rating: 4.6, reviews: 4512,
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80'],
    specs: { Capacity: '0.56 L water tank', Wattage: '1260 W', 'Brew Sizes': '5', Connectivity: 'Bluetooth', Pressure: '19 bar' },
    badge: '31% off', inStock: true, sizes: [], colors: ['#e74c3c','#2874f0','#212121'],
    tags: ['trending'], description: 'The easiest and most accessible way into the world of Vertuo coffee.',
    offers: ['Free 28 capsules worth ₹1200']
  },
  {
    id: 13, category: 'home', subcategory: 'Robot Vaccum',
    brand: 'iRobot', name: 'iRobot Roomba i3+ Self-Emptying Robot Vacuum',
    price: 34900, originalPrice: 49900, rating: 4.4, reviews: 2341,
    img: 'https://images.unsplash.com/photo-1597862624811-9a6f83d95dac?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1597862624811-9a6f83d95dac?w=400&q=80'],
    specs: { 'Self-Empty Base': 'Yes', Runtime: 'Up to 75 min', Navigation: 'Smart Mapping', 'Filter Type': 'High-Efficiency', App: 'iRobot Home' },
    badge: '30% off', inStock: true, sizes: [], colors: [],
    tags: [], description: 'Empties itself for up to 60 days, so you can forget about vacuuming for months at a time.',
    offers: ['Free installation service','1 year extended warranty available']
  },

  // Books
  {
    id: 14, category: 'books', subcategory: 'Self Help',
    brand: 'Penguin', name: 'Atomic Habits by James Clear (Paperback)',
    price: 349, originalPrice: 799, rating: 4.8, reviews: 89320,
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'],
    specs: { Author: 'James Clear', Publisher: 'Penguin Random House', Pages: '320', Language: 'English', 'ISBN-13': '978-0735211292' },
    badge: '56% off', inStock: true, sizes: [], colors: [],
    tags: ['bestseller'], description: 'The #1 New York Times bestseller. Over 10 million copies sold! Tiny changes, remarkable results.',
    offers: ['Free delivery with Flipkart Plus']
  },
  {
    id: 15, category: 'books', subcategory: 'Fiction',
    brand: 'Bloomsbury', name: 'Harry Potter Complete 7 Book Collection',
    price: 2499, originalPrice: 5599, rating: 4.9, reviews: 45670,
    img: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&q=80'],
    specs: { Author: 'J.K. Rowling', Publisher: 'Bloomsbury', Books: '7', Language: 'English', Edition: 'New Paperback' },
    badge: '55% off', inStock: true, sizes: [], colors: [],
    tags: ['bestseller','trending'], description: 'The complete Harry Potter series in one beautiful collection. Timeless fantasy adventure.',
    offers: ['Free tote bag worth ₹299']
  },

  // Sports
  {
    id: 16, category: 'sports', subcategory: 'Fitness',
    brand: 'Decathlon', name: 'Domyos 900 Premium Yoga Mat 6mm Non-Slip',
    price: 999, originalPrice: 1999, rating: 4.5, reviews: 28900,
    img: 'https://images.unsplash.com/photo-1601925228842-2e2cc0c4f0f1?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1601925228842-2e2cc0c4f0f1?w=400&q=80'],
    specs: { Material: 'PVC', Thickness: '6 mm', Dimensions: '185 x 62 cm', Weight: '1 kg', 'Non-Slip': 'Yes' },
    badge: '50% off', inStock: true, sizes: [], colors: ['#9c27b0','#2874f0','#388e3c'],
    tags: ['deal'], description: 'Premium non-slip yoga mat with superior grip for your daily yoga practice.',
    offers: ['Free carry strap','7 days return']
  },
  {
    id: 17, category: 'sports', subcategory: 'Cycling',
    brand: 'Trek', name: 'Trek FX 3 Disc Hybrid Bicycle 2024',
    price: 89990, originalPrice: 99990, rating: 4.6, reviews: 1234,
    img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80'],
    specs: { Frame: 'Aluminium Alpha Gold', Gears: '11-speed', Brakes: 'Hydraulic Disc', Wheel: '700c', Suspension: 'None' },
    badge: '10% off', inStock: true, sizes: ['S','M','L','XL'], colors: ['#1a1a2e','#e74c3c'],
    tags: [], description: 'Versatile, fast and refined. FX 3 Disc is the ultimate commuting and fitness hybrid.',
    offers: ['Free assembly','1 year warranty']
  },

  // Beauty
  {
    id: 18, category: 'beauty', subcategory: 'Skincare',
    brand: "L'Oréal", name: "L'Oréal Paris Revitalift 1.5% Pure Hyaluronic Acid Serum",
    price: 799, originalPrice: 1799, rating: 4.4, reviews: 15634,
    img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80'],
    specs: { Volume: '30 ml', Skin: 'All skin types', SPF: 'None', Cruelty: 'No', Vegan: 'No' },
    badge: '56% off', inStock: true, sizes: [], colors: [],
    tags: ['bestseller'], description: 'Instantly plumps skin with 1.5% pure Hyaluronic Acid. 72-hour moisturization.',
    offers: ['Buy 2 get 10% extra off','Free mini cleanser above ₹999']
  },
  {
    id: 19, category: 'beauty', subcategory: 'Haircare',
    brand: 'Dyson', name: 'Dyson Supersonic Hair Dryer HD15',
    price: 37900, originalPrice: 42900, rating: 4.7, reviews: 5234,
    img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=80'],
    specs: { Wattage: '1600 W', 'Speed Settings': '3', 'Heat Settings': '4', Weight: '641 g', Attachments: '5' },
    badge: '12% off', inStock: true, sizes: [], colors: ['#e74c3c','#1a1a2e'],
    tags: ['trending'], description: "Dyson's most powerful, fast-drying, and versatile hair dryer engineered for all hair types.",
    offers: ['6 month no-cost EMI','Free storage case']
  },

  // Grocery
  {
    id: 20, category: 'grocery', subcategory: 'Organic',
    brand: 'Organic India', name: 'Organic India Tulsi Green Tea 25 Tea Bags',
    price: 149, originalPrice: 199, rating: 4.3, reviews: 42100,
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    imgs: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80'],
    specs: { Bags: '25', Weight: '37.5 g', Organic: 'Yes', Caffeine: 'Low', 'Shelf Life': '24 months' },
    badge: '25% off', inStock: true, sizes: [], colors: [],
    tags: [], description: 'USDA Certified Organic. Refreshing blend of antioxidant-rich green tea with adaptogenic Tulsi.',
    offers: ['Buy 3 for ₹399','Free shipping above ₹300']
  }
];

// Hero slides data
const HERO_SLIDES = [
  {
    gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1400&q=80',
    tag: '🔥 Big Billion Days',
    title: 'Smartphones Up to 60% Off',
    sub: 'Shop the biggest sale of the year – limited stock!'
  },
  {
    gradient: 'linear-gradient(135deg,#172337,#0d1b2a)',
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1400&q=80',
    tag: '💻 Super Tech Sale',
    title: 'Laptops & Accessories',
    sub: 'MacBook, Dell XPS, HP Spectre — best prices guaranteed'
  },
  {
    gradient: 'linear-gradient(135deg,#1a0a2e,#2a0a4e)',
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1400&q=80',
    tag: '👗 Fashion Week',
    title: 'End of Season Sale',
    sub: 'Top brands at up to 70% off — new arrivals every day'
  },
  {
    gradient: 'linear-gradient(135deg,#0a2a1a,#0a3a2a)',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80',
    tag: '🏠 Home Makeover',
    title: 'Kitchen & Home Appliances',
    sub: 'Free delivery + installation on refrigerators, ACs & more'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🛍️' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'home', name: 'Home & Kitchen', icon: '🏠' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'grocery', name: 'Grocery', icon: '🛒' }
];

const BRANDS = ['Samsung','Apple','Sony','Nike','Adidas','Zara','Philips','Nespresso','Canon','iRobot','Decathlon','Trek',"L'Oréal",'Dyson','Organic India','Penguin','Bloomsbury',"Levi's"];

const OFFERS_DATA = [
  { icon: '🚀', title: 'Free Delivery', desc: 'On orders above ₹499' },
  { icon: '🔄', title: '10 Day Returns', desc: 'Hassle-free returns' },
  { icon: '🔒', title: '100% Secure', desc: 'Safe & secure payments' },
  { icon: '📞', title: '24/7 Support', desc: 'Dedicated customer care' }
];
