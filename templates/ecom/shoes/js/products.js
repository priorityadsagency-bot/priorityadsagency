/**
 * Master Central Shoe Product Database
 * Exactly 30 Unique Shoes across 6 Categories (5 in each):
 * 1. Running Shoes (5)
 * 2. Casual Shoes (5)
 * 3. Sneakers (5)
 * 4. Sports Shoes (5)
 * 5. Formal Shoes (5)
 * 6. Walking Shoes (5)
 *
 * Each product has unique IDs, names, images, colors, sizes, descriptions,
 * prices, ratings, review counts, and distinct customer reviews.
 */

export const SHOE_CATEGORIES = [
  { id: 'running', name: 'Running Shoes', icon: 'fa-person-running', desc: 'Engineered for speed, marathon stamina & cloud-like cushion' },
  { id: 'casual', name: 'Casual Shoes', icon: 'fa-shoe-prints', desc: 'Effortless everyday style, premium leather loafers & slip-ons' },
  { id: 'sneakers', name: 'Sneakers', icon: 'fa-fire', desc: 'Streetwear culture, heritage classics & high-top retro icons' },
  { id: 'sports', name: 'Sports Shoes', icon: 'fa-trophy', desc: 'Court, turf, gym & field performance grip footwear' },
  { id: 'formal', name: 'Formal Shoes', icon: 'fa-briefcase', desc: 'Handcrafted Italian Oxfords, wingtip brogues & monk straps' },
  { id: 'walking', name: 'Walking Shoes', icon: 'fa-person-walking', desc: 'Max arch support, orthopedic memory foam & slip-ins' }
];

export const PRODUCTS = [
  // ==========================================
  // 1. RUNNING SHOES (5 Products)
  // ==========================================
  {
    id: 'SHOE-RUN-001',
    name: 'Nike Air Zoom Pegasus 40 Turbo',
    brand: 'Nike',
    category: 'running',
    categoryName: 'Running Shoes',
    badge: 'Flipkart Assured',
    tag: 'Best Seller',
    price: 7499,
    originalPrice: 11999,
    discount: 37,
    rating: 4.6,
    ratingCount: 18420,
    reviewCount: 2890,
    ratingBreakdown: { 5: 68, 4: 20, 3: 7, 2: 3, 1: 2 },
    colors: [
      {
        name: 'Crimson Red / Black',
        hex: '#d92534',
        mainImage: 'img/1542291026-7eec264c27ff.webp',
        gallery: [
          'img/1542291026-7eec264c27ff.webp',
          'img/1606107557195-0e29a4b5b4aa.webp',
          'img/1514989940723-e8e51635b782.webp',
          'img/1584735935682-2f2b69dff9d2.webp'
        ]
      },
      {
        name: 'Midnight Black / Gold',
        hex: '#1a1a1a',
        mainImage: 'img/1606107557195-0e29a4b5b4aa.webp',
        gallery: [
          'img/1606107557195-0e29a4b5b4aa.webp',
          'img/1542291026-7eec264c27ff.webp',
          'img/1514989940723-e8e51635b782.webp'
        ]
      },
      {
        name: 'Electric Blue',
        hex: '#0066cc',
        mainImage: 'img/1514989940723-e8e51635b782.webp',
        gallery: [
          'img/1514989940723-e8e51635b782.webp',
          'img/1542291026-7eec264c27ff.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: false }
    ],
    description: 'A responsive workhorse designed for pavement running. The Nike Air Zoom Pegasus 40 brings spring to your step using lightweight Nike React foam and dual Zoom Air units situated in the forefoot and heel. Engineered single-layer mesh creates an inviting feel and fit.',
    highlights: [
      'Dual Zoom Air units deliver energized toe-off and heel transitions',
      'Engineered mesh upper for optimized breathability during 10K+ runs',
      'Midfoot band hugs the arch for structured stability without pinch points',
      'Waffle-inspired rubber outsole provides high-wear abrasion resistance'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Running & Marathons',
      'Outer Material': 'Engineered Mesh',
      'Sole Material': 'Rubber + React Foam',
      'Closure': 'Lace-Ups',
      'Weight': '265 g (per single shoe UK 8)',
      'Care Instructions': 'Wipe with damp cloth; air dry away from direct sunlight',
      'Country of Origin': 'Vietnam',
      'Warranty': '6 Months Manufacturer Defect Warranty'
    },
    reviews: [
      {
        id: 'rev-run1-1',
        author: 'Karan Mehra',
        verified: true,
        rating: 5,
        date: '14 Oct 2026',
        location: 'Bengaluru, Karnataka',
        title: 'Unbelievable energy return for marathon prep!',
        comment: 'Clocked over 80km in these shoes already. The Zoom Air unit at the forefoot provides immediate response on road asphalt. True to UK 9 size.',
        helpfulCount: 54
      },
      {
        id: 'rev-run1-2',
        author: 'Arjun Swaminathan',
        verified: true,
        rating: 5,
        date: '28 Sep 2026',
        location: 'Chennai, Tamil Nadu',
        title: 'Worth every rupee, pure comfort.',
        comment: 'Lightweight, doesn’t cause sweaty feet even in Chennai humidity, and heel support prevents Achilles fatigue.',
        helpfulCount: 39
      },
      {
        id: 'rev-run1-3',
        author: 'Vivek Rawat',
        verified: true,
        rating: 4,
        date: '10 Aug 2026',
        location: 'Dehradun, Uttarakhand',
        title: 'Great cushion, slightly snug around toe-box',
        comment: 'Very solid build and gorgeous crimson red color. If you have wide feet, order half a size up for extra room.',
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'SHOE-RUN-002',
    name: 'Adidas Ultraboost Light Performance',
    brand: 'Adidas',
    category: 'running',
    categoryName: 'Running Shoes',
    badge: 'Flipkart Assured',
    tag: 'Trending',
    price: 8999,
    originalPrice: 15999,
    discount: 43,
    rating: 4.8,
    ratingCount: 12150,
    reviewCount: 1940,
    ratingBreakdown: { 5: 75, 4: 16, 3: 6, 2: 2, 1: 1 },
    colors: [
      {
        name: 'Cloud White / Core Grey',
        hex: '#f5f5f5',
        mainImage: 'img/1584735935682-2f2b69dff9d2.webp',
        gallery: [
          'img/1584735935682-2f2b69dff9d2.webp',
          'img/1587563871167-1ee9c731aefb.webp',
          'img/1514989940723-e8e51635b782.webp'
        ]
      },
      {
        name: 'Solar Orange',
        hex: '#ff5500',
        mainImage: 'img/1587563871167-1ee9c731aefb.webp',
        gallery: [
          'img/1587563871167-1ee9c731aefb.webp',
          'img/1584735935682-2f2b69dff9d2.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: false },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever made with 30% lighter Light BOOST material. Primeknit+ textile upper conforms to the natural shape of your foot with sock-like lockdown.',
    highlights: [
      'Revolutionary Light BOOST midsole gives ultimate energy return',
      'Continental Rubber outsole gives unmatched traction on wet & dry roads',
      'Linear Energy Push system integrated on the sole boosts stiffness',
      'Upper yarn contains at least 50% Parley Ocean Plastic'
    ],
    specifications: {
      'Ideal For': 'Men & Women',
      'Occasion': 'Long Distance Road Running',
      'Outer Material': 'Primeknit+ Eco Fabric',
      'Sole Material': 'Continental Rubber + Light BOOST',
      'Closure': 'Lace-Ups',
      'Weight': '250 g',
      'Care Instructions': 'Use sneaker foam cleanser, avoid machine washing',
      'Country of Origin': 'Indonesia',
      'Warranty': '1 Year Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-run2-1',
        author: 'Siddharth Iyer',
        verified: true,
        rating: 5,
        date: '02 Nov 2026',
        location: 'Mumbai, Maharashtra',
        title: 'Feels like walking on clouds!',
        comment: 'Lightest Ultraboost edition yet. The Continental grip is phenomenal in rains. Best investment for daily running.',
        helpfulCount: 68
      },
      {
        id: 'rev-run2-2',
        author: 'Priya Nambiar',
        verified: true,
        rating: 4,
        date: '19 Oct 2026',
        location: 'Kochi, Kerala',
        title: 'Superb cushioning and looks sleek',
        comment: 'Premium finish, primeknit hugs like a sock. Delivered in pristine Flipkart box within 2 days.',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'SHOE-RUN-003',
    name: 'Puma Deviate Nitro 2 Carbon',
    brand: 'Puma',
    category: 'running',
    categoryName: 'Running Shoes',
    badge: 'Flipkart Assured',
    tag: 'Top Rated',
    price: 6299,
    originalPrice: 10499,
    discount: 40,
    rating: 4.4,
    ratingCount: 9340,
    reviewCount: 1420,
    ratingBreakdown: { 5: 60, 4: 25, 3: 9, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Cyber Yellow / Lime',
        hex: '#a6ff00',
        mainImage: 'img/1608231387042-66d1773070a5.webp',
        gallery: [
          'img/1608231387042-66d1773070a5.webp',
          'img/1584735935682-2f2b69dff9d2.webp'
        ]
      },
      {
        name: 'Royal Navy / White',
        hex: '#002244',
        mainImage: 'img/1514989940723-e8e51635b782.webp',
        gallery: [
          'img/1514989940723-e8e51635b782.webp',
          'img/1608231387042-66d1773070a5.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: false },
      { size: 'UK 11', inStock: false }
    ],
    description: 'The Deviate Nitro 2 makes running faster feel effortless. Features a full-length INNOPLATE carbon composite plate acting as a lever to propel you forward with maximum energy transfer alongside nitrogen-infused NITRO Elite foam.',
    highlights: [
      'Nitrogen-infused NITRO Elite foam gives maximum rebound',
      'Full-length carbon composite INNOPLATE propels stride forwards',
      'PUMAGRIP durable rubber compound handles wet pavements easily',
      'Reflective elements for early morning and evening runners'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Speed Training & Intervals',
      'Outer Material': 'Breathable Engineered Mesh',
      'Sole Material': 'PUMAGRIP Rubber + NITRO Foam',
      'Closure': 'Lace-Ups',
      'Weight': '248 g',
      'Care Instructions': 'Do not bleach; clean sole with soft brush',
      'Country of Origin': 'India',
      'Warranty': '3 Months Manufacturer Warranty'
    },
    reviews: [
      {
        id: 'rev-run3-1',
        author: 'Rohan Deshmukh',
        verified: true,
        rating: 5,
        date: '21 Sep 2026',
        location: 'Pune, Maharashtra',
        title: 'Carbon plate for this price is unbeatable!',
        comment: 'Shaved 45 seconds off my 5K personal best. The propulsive rocker sensation is noticeable from step one.',
        helpfulCount: 47
      },
      {
        id: 'rev-run3-2',
        author: 'Sameer Khan',
        verified: true,
        rating: 4,
        date: '04 Oct 2026',
        location: 'Hyderabad, Telangana',
        title: 'Snappy and feather-light',
        comment: 'Super fast delivery. Color is vibrant and turns heads on the jogging track.',
        helpfulCount: 20
      }
    ]
  },
  {
    id: 'SHOE-RUN-004',
    name: 'ASICS Gel-Nimbus 26 Plush Max Cushion',
    brand: 'ASICS',
    category: 'running',
    categoryName: 'Running Shoes',
    badge: 'Flipkart Assured',
    tag: 'Popular',
    price: 9499,
    originalPrice: 14999,
    discount: 36,
    rating: 4.7,
    ratingCount: 15280,
    reviewCount: 2490,
    ratingBreakdown: { 5: 72, 4: 18, 3: 6, 2: 3, 1: 1 },
    colors: [
      {
        name: 'Ocean Sky Blue',
        hex: '#4a90e2',
        mainImage: 'img/1595950653106-6c9ebd614d3a.webp',
        gallery: [
          'img/1595950653106-6c9ebd614d3a.webp',
          'img/1542291026-7eec264c27ff.webp',
          'img/1584735935682-2f2b69dff9d2.webp'
        ]
      },
      {
        name: 'Pure Platinum Grey',
        hex: '#e5e4e2',
        mainImage: 'img/1584735935682-2f2b69dff9d2.webp',
        gallery: [
          'img/1584735935682-2f2b69dff9d2.webp',
          'img/1595950653106-6c9ebd614d3a.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'The Gel-Nimbus 26 provides the softest landing properties of any ASICS shoe. Rearfoot PureGEL technology is 65% softer than standard GEL, pairing with FF BLAST PLUS ECO cushioning made from approximately 24% bio-based material.',
    highlights: [
      'PureGEL technology provides cloud-soft impact absorption',
      'FF BLAST PLUS ECO cushioning delivers plush, lightweight comfort',
      'Soft engineered knit upper wraps the foot in plush luxurious comfort',
      'AHARPLUS heel plug rubber improves durability at high wear areas'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Recovery Runs & Daily Mileage',
      'Outer Material': 'Engineered Stretch Knit',
      'Sole Material': 'AHARPLUS Rubber & PureGEL',
      'Closure': 'Lace-Ups',
      'Weight': '290 g',
      'Care Instructions': 'Brush off loose dirt, wipe clean with damp sponge',
      'Country of Origin': 'Vietnam',
      'Warranty': '6 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-run4-1',
        author: 'Dr. Alok Verma',
        verified: true,
        rating: 5,
        date: '17 Nov 2026',
        location: 'New Delhi, Delhi',
        title: 'Saved my knees! Ultimate shock absorption',
        comment: 'As an orthopedic surgeon who runs 6 days a week, this shoe has the best impact mitigation technology on the market today.',
        helpfulCount: 92
      },
      {
        id: 'rev-run4-2',
        author: 'Kunal Joshi',
        verified: true,
        rating: 4,
        date: '29 Oct 2026',
        location: 'Ahmedabad, Gujarat',
        title: 'Luxuriously comfortable',
        comment: 'Wore it on a 15km half marathon rehearsal. No hot spots, no blisters, amazing heel fit.',
        helpfulCount: 35
      }
    ]
  },
  {
    id: 'SHOE-RUN-005',
    name: 'Saucony Endorphin Speed 3 Pro Racer',
    brand: 'Saucony',
    category: 'running',
    categoryName: 'Running Shoes',
    badge: 'Flipkart Assured',
    tag: 'New Arrival',
    price: 8199,
    originalPrice: 13999,
    discount: 41,
    rating: 4.5,
    ratingCount: 6890,
    reviewCount: 980,
    ratingBreakdown: { 5: 64, 4: 22, 3: 8, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Flame Orange / Cobalt',
        hex: '#e67e22',
        mainImage: 'img/1575537302964-96cd47c06b1b.webp',
        gallery: [
          'img/1575537302964-96cd47c06b1b.webp',
          'img/1542291026-7eec264c27ff.webp'
        ]
      },
      {
        name: 'Pitch Black',
        hex: '#222222',
        mainImage: 'img/1606107557195-0e29a4b5b4aa.webp',
        gallery: [
          'img/1606107557195-0e29a4b5b4aa.webp',
          'img/1575537302964-96cd47c06b1b.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Equipped with a reimagined winged nylon plate supporting your run from toe-off to landing. SPEEDROLL Technology propels you forward with the feeling of continuous momentum, fueled by ultralight PWRRUNPB foam.',
    highlights: [
      'Winged S-curve nylon plate centers foot for stable velocity',
      'Ultralight PWRRUNPB foam gives snap and bounce',
      'SPEEDROLL geometry creates an effortless forward roll',
      'FORMFIT design hugs every curve of your foot comfortably'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Race Day & Tempo Workouts',
      'Outer Material': 'Ultralight Monomesh',
      'Sole Material': 'XT-900 Carbon Rubber + PWRRUNPB',
      'Closure': 'Lace-Ups',
      'Weight': '229 g',
      'Care Instructions': 'Spot clean only; store in shoe bag',
      'Country of Origin': 'Vietnam',
      'Warranty': '6 Months Manufacturer Defect'
    },
    reviews: [
      {
        id: 'rev-run5-1',
        author: 'Manish Chawla',
        verified: true,
        rating: 5,
        date: '08 Nov 2026',
        location: 'Chandigarh, Punjab',
        title: 'The gold standard tempo shoe',
        comment: 'So versatile. Handles easy paces comfortably but comes alive when you drop below 4:30 min/km pace.',
        helpfulCount: 28
      }
    ]
  },

  // ==========================================
  // 2. CASUAL SHOES (5 Products)
  // ==========================================
  {
    id: 'SHOE-CAS-001',
    name: 'Clarks Un Structured Suede Penny Loafer',
    brand: 'Clarks',
    category: 'casual',
    categoryName: 'Casual Shoes',
    badge: 'Flipkart Assured',
    tag: 'Best Seller',
    price: 3999,
    originalPrice: 6999,
    discount: 42,
    rating: 4.3,
    ratingCount: 7420,
    reviewCount: 1110,
    ratingBreakdown: { 5: 58, 4: 26, 3: 10, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Tan Brown Suede',
        hex: '#8b4513',
        mainImage: 'img/1533867617858-e7b97e060509.webp',
        gallery: [
          'img/1533867617858-e7b97e060509.webp',
          'img/1549298916-b41d501d3772.webp',
          'img/1560769629-975ec94e6a86.webp'
        ]
      },
      {
        name: 'Espresso Black',
        hex: '#211c1d',
        mainImage: 'img/1549298916-b41d501d3772.webp',
        gallery: [
          'img/1549298916-b41d501d3772.webp',
          'img/1533867617858-e7b97e060509.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Combining timeless British styling with unmatched all-day comfort. Handcrafted from velvety suede with internal air circulation channels. Perfect for smart-casual Fridays, airport travel, and weekend outings.',
    highlights: [
      'Genuine Italian suede upper with tonal saddle strap detailing',
      'Dual-density OrthoLite footbed absorbs shock & resists foot odor',
      'Flexible lightweight rubber driving sole for effortless pedal grip',
      'Unstructured construction bends naturally with your stride'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Smart Casual & Semi-Formal',
      'Outer Material': 'Premium Suede Leather',
      'Sole Material': 'Flexible Rubber Grip',
      'Closure': 'Slip-On',
      'Weight': '310 g',
      'Care Instructions': 'Use suede cleaner and suede brush; avoid water exposure',
      'Country of Origin': 'India',
      'Warranty': '3 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-cas1-1',
        author: 'Varun Sen',
        verified: true,
        rating: 5,
        date: '05 Nov 2026',
        location: 'Kolkata, West Bengal',
        title: 'Pure class and comfort',
        comment: 'Looks fantastic with chinos and linen shirts. Suede quality is supple and rich. Clarks craftsmanship never fails.',
        helpfulCount: 44
      },
      {
        id: 'rev-cas1-2',
        author: 'Abhishek Mathur',
        verified: true,
        rating: 4,
        date: '14 Oct 2026',
        location: 'Jaipur, Rajasthan',
        title: 'Very comfortable slip-on',
        comment: 'Wore it for an entire conference standing 6 hours. Zero soreness in the heels.',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'SHOE-CAS-002',
    name: 'Woodland Rugged Nubuck Low-Cut Hiker',
    brand: 'Woodland',
    category: 'casual',
    categoryName: 'Casual Shoes',
    badge: 'Flipkart Assured',
    tag: 'Heavy Duty',
    price: 3499,
    originalPrice: 5495,
    discount: 36,
    rating: 4.5,
    ratingCount: 11870,
    reviewCount: 2130,
    ratingBreakdown: { 5: 66, 4: 21, 3: 8, 2: 3, 1: 2 },
    colors: [
      {
        name: 'Camel Brown Nubuck',
        hex: '#c19a6b',
        mainImage: 'img/1520639888713-7851133b1ed0.webp',
        gallery: [
          'img/1520639888713-7851133b1ed0.webp',
          'img/1549298916-b41d501d3772.webp'
        ]
      },
      {
        name: 'Olive Forest Green',
        hex: '#556b2f',
        mainImage: 'img/1549298916-b41d501d3772.webp',
        gallery: [
          'img/1549298916-b41d501d3772.webp',
          'img/1520639888713-7851133b1ed0.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'Built for the adventurous spirit who demands rugged longevity. Thick milled nubuck leather pairs with deep-lugged rubber outsoles engineered to bite into gravel, dirt, and rough city terrain.',
    highlights: [
      'Heavy-gauge water-resistant genuine nubuck leather upper',
      'Deep cleated tread pattern prevents slips on slippery surfaces',
      'Rust-proof brass eyelets with reinforced cord laces',
      'Padded leather collar provides firm ankle cushioning'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Outdoor Casual & Weekend Treks',
      'Outer Material': 'Nubuck Leather',
      'Sole Material': 'Deep-Tread Thermoplastic Rubber',
      'Closure': 'Lace-Ups',
      'Weight': '420 g',
      'Care Instructions': 'Apply leather conditioner regularly to retain sheen',
      'Country of Origin': 'India',
      'Warranty': '6 Months Warranty against manufacturing defects'
    },
    reviews: [
      {
        id: 'rev-cas2-1',
        author: 'Jagdish Chauhan',
        verified: true,
        rating: 5,
        date: '20 Oct 2026',
        location: 'Shimla, Himachal Pradesh',
        title: 'Built like a military tank!',
        comment: 'Woodland never disappoints with toughness. Hiked up to Kufri in these, zero issues with water or rocky slopes.',
        helpfulCount: 52
      }
    ]
  },
  {
    id: 'SHOE-CAS-003',
    name: 'Red Tape Athleisure Slip-on Comfort Knit',
    brand: 'Red Tape',
    category: 'casual',
    categoryName: 'Casual Shoes',
    badge: 'Flipkart Assured',
    tag: 'Mega Discount',
    price: 1799,
    originalPrice: 4899,
    discount: 63,
    rating: 4.2,
    ratingCount: 24190,
    reviewCount: 4320,
    ratingBreakdown: { 5: 56, 4: 25, 3: 11, 2: 5, 1: 3 },
    colors: [
      {
        name: 'Heather Charcoal Grey',
        hex: '#888888',
        mainImage: 'img/1560769629-975ec94e6a86.webp',
        gallery: [
          'img/1560769629-975ec94e6a86.webp',
          'img/1533867617858-e7b97e060509.webp'
        ]
      },
      {
        name: 'Navy Blue / White',
        hex: '#1a2a4f',
        mainImage: 'img/1514989940723-e8e51635b782.webp',
        gallery: [
          'img/1514989940723-e8e51635b782.webp',
          'img/1560769629-975ec94e6a86.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'An easy slip-on lifestyle shoe with soft woven textile upper and memory tech insole. Designed for college students, daily office commuters, and relaxed evening strolls.',
    highlights: [
      'Memory foam insole molds to foot contours',
      'Breathable seamless stretch knit upper keeps feet ventilated',
      'Shock-absorbing EVA sole provides featherweight step',
      'Elastic collar allows quick slip-in without tying laces'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Daily Casual & College Wear',
      'Outer Material': 'Breathable Knit Fabric',
      'Sole Material': 'Lightweight EVA',
      'Closure': 'Slip-On / Elasticated',
      'Weight': '215 g',
      'Care Instructions': 'Hand wash with mild detergent; dry in shade',
      'Country of Origin': 'India',
      'Warranty': '45 Days Manufacturer Warranty'
    },
    reviews: [
      {
        id: 'rev-cas3-1',
        author: 'Deepak Soni',
        verified: true,
        rating: 5,
        date: '11 Nov 2026',
        location: 'Lucknow, Uttar Pradesh',
        title: 'Best value for money on Flipkart!',
        comment: 'Got it for ₹1,799 in festive sale. Super lightweight and fits like a dream with jeans.',
        helpfulCount: 71
      }
    ]
  },
  {
    id: 'SHOE-CAS-004',
    name: 'Bata Comfit Lightweight Canvas Deck',
    brand: 'Bata',
    category: 'casual',
    categoryName: 'Casual Shoes',
    badge: 'Flipkart Assured',
    tag: 'Budget Pick',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.1,
    ratingCount: 16340,
    reviewCount: 2750,
    ratingBreakdown: { 5: 50, 4: 28, 3: 13, 2: 6, 1: 3 },
    colors: [
      {
        name: 'Sand Beige',
        hex: '#d2b48c',
        mainImage: 'img/1525966222134-fcfa99b8ae77.webp',
        gallery: [
          'img/1525966222134-fcfa99b8ae77.webp',
          'img/1560769629-975ec94e6a86.webp'
        ]
      },
      {
        name: 'Denim Blue',
        hex: '#3b5998',
        mainImage: 'img/1560769629-975ec94e6a86.webp',
        gallery: [
          'img/1560769629-975ec94e6a86.webp',
          'img/1525966222134-fcfa99b8ae77.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'A classic low-top canvas shoe with clean minimalist lines. Cushioned footbed and vulcanized rubber sole deliver reliable grip and timeless casual appeal.',
    highlights: [
      'Durable 100% cotton canvas upper with reinforced stitch seams',
      'Textured rubber bumper toe protects against scuffs',
      'Comfit insole provides arch comfort for walking',
      'Clean low-profile silhouette pairs with shorts or denim'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Casual Day-to-Day',
      'Outer Material': 'Heavy-Weight Cotton Canvas',
      'Sole Material': 'Vulcanized Rubber',
      'Closure': 'Lace-Ups',
      'Weight': '280 g',
      'Care Instructions': 'Wipe dirt with damp cloth',
      'Country of Origin': 'India',
      'Warranty': '90 Days Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-cas4-1',
        author: 'Suraj Pillai',
        verified: true,
        rating: 4,
        date: '18 Oct 2026',
        location: 'Thiruvananthapuram, Kerala',
        title: 'Simple, neat and durable',
        comment: 'Good everyday shoe. Canvas is strong and sole doesn’t wear out quickly.',
        helpfulCount: 26
      }
    ]
  },
  {
    id: 'SHOE-CAS-005',
    name: 'Hush Puppies Bounce Tech Derby Casual',
    brand: 'Hush Puppies',
    category: 'casual',
    categoryName: 'Casual Shoes',
    badge: 'Flipkart Assured',
    tag: 'Premium Suede',
    price: 4299,
    originalPrice: 7999,
    discount: 46,
    rating: 4.4,
    ratingCount: 5210,
    reviewCount: 860,
    ratingBreakdown: { 5: 62, 4: 24, 3: 8, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Burnished Tan',
        hex: '#99582a',
        mainImage: 'img/1549298916-b41d501d3772.webp',
        gallery: [
          'img/1549298916-b41d501d3772.webp',
          'img/1533867617858-e7b97e060509.webp'
        ]
      },
      {
        name: 'Matte Black',
        hex: '#1e1e1e',
        mainImage: 'img/1533867617858-e7b97e060509.webp',
        gallery: [
          'img/1533867617858-e7b97e060509.webp',
          'img/1549298916-b41d501d3772.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Designed around the patented Bounce footbed that provides high energy return with every stride. Soft full-grain leather upper with open Derby lacing for relaxed comfort in business-casual setups.',
    highlights: [
      'Bounce eco-friendly footbed absorbs shock consistently',
      'Supple tumbled leather gives an instant broken-in comfort feel',
      'Breathable microfiber lining regulates shoe climate',
      'Flexible PU molded outsole is non-marking and silent'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Business Casual & Evening Dinners',
      'Outer Material': 'Genuine Tumbled Leather',
      'Sole Material': 'Shock-Absorbing Polyurethane',
      'Closure': 'Lace-Ups',
      'Weight': '330 g',
      'Care Instructions': 'Use neutral wax shoe polish',
      'Country of Origin': 'India',
      'Warranty': '6 Months Warranty'
    },
    reviews: [
      {
        id: 'rev-cas5-1',
        author: 'Rajiv Sengupta',
        verified: true,
        rating: 5,
        date: '25 Sep 2026',
        location: 'Kolkata, West Bengal',
        title: 'The definition of all-day comfort',
        comment: 'Hush Puppies Bounce technology really works. No foot ache after 8 hours of standing.',
        helpfulCount: 38
      }
    ]
  },

  // ==========================================
  // 3. SNEAKERS (5 Products)
  // ==========================================
  {
    id: 'SHOE-SNK-001',
    name: 'Nike Air Jordan 1 Retro High OG Chicago',
    brand: 'Nike',
    category: 'sneakers',
    categoryName: 'Sneakers',
    badge: 'Flipkart Assured',
    tag: 'Grail Sneaker',
    price: 11495,
    originalPrice: 16995,
    discount: 32,
    rating: 4.9,
    ratingCount: 29830,
    reviewCount: 6420,
    ratingBreakdown: { 5: 88, 4: 8, 3: 2, 2: 1, 1: 1 },
    colors: [
      {
        name: 'Varsity Red / Black / White',
        hex: '#bf0a30',
        mainImage: 'img/1552346154-21d32810aba3.webp',
        gallery: [
          'img/1552346154-21d32810aba3.webp',
          'img/1607522370275-f14206abe5d3.webp',
          'img/1539185441755-769473a23570.webp'
        ]
      },
      {
        name: 'Royal Blue / Black',
        hex: '#0038a8',
        mainImage: 'img/1607522370275-f14206abe5d3.webp',
        gallery: [
          'img/1607522370275-f14206abe5d3.webp',
          'img/1552346154-21d32810aba3.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'The sneaker that changed basketball and streetwear forever. Crafted with premium full-grain leather panels, retro Nike Air branding on the padded nylon tongue, and the iconic Wings insignia stamped onto the collar.',
    highlights: [
      'Encapsulated Air-Sole unit in the heel cushions every landing',
      'Premium full-grain leather upper offers structure and heritage style',
      'Solid rubber cupsole with deep flex grooves and concentric traction circle',
      'Comes with extra black and red replacement laces in collector box'
    ],
    specifications: {
      'Ideal For': 'Men & Women',
      'Occasion': 'Streetwear & Collector',
      'Outer Material': 'Full-Grain Genuine Leather',
      'Sole Material': 'Rubber Cupsole with Air Unit',
      'Closure': 'High-Top Lace-Ups',
      'Weight': '440 g',
      'Care Instructions': 'Use specialized sneaker protector wipes',
      'Country of Origin': 'Vietnam',
      'Warranty': '1 Year Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-snk1-1',
        author: 'Kabir Singhania',
        verified: true,
        rating: 5,
        date: '15 Nov 2026',
        location: 'Mumbai, Maharashtra',
        title: 'Authentic 100%! The holy grail is home',
        comment: 'Verified with UV light and stitching inspection. Flipkart Assured delivery was fast and double-boxed. Absolutely iconic.',
        helpfulCount: 142
      },
      {
        id: 'rev-snk1-2',
        author: 'Tanmay Bhatia',
        verified: true,
        rating: 5,
        date: '01 Nov 2026',
        location: 'Delhi, NCR',
        title: 'Leather smells incredible',
        comment: 'The Chicago colorway looks 10x better in person. Leather softness is superior to standard dunks.',
        helpfulCount: 88
      }
    ]
  },
  {
    id: 'SHOE-SNK-002',
    name: 'Converse Chuck Taylor All Star 70s High Vintage',
    brand: 'Converse',
    category: 'sneakers',
    categoryName: 'Sneakers',
    badge: 'Flipkart Assured',
    tag: 'Vintage Classic',
    price: 3799,
    originalPrice: 5499,
    discount: 30,
    rating: 4.6,
    ratingCount: 38910,
    reviewCount: 7100,
    ratingBreakdown: { 5: 70, 4: 18, 3: 7, 2: 3, 1: 2 },
    colors: [
      {
        name: 'Classic Black / Egret',
        hex: '#111111',
        mainImage: 'img/1607522370275-f14206abe5d3.webp',
        gallery: [
          'img/1607522370275-f14206abe5d3.webp',
          'img/1552346154-21d32810aba3.webp'
        ]
      },
      {
        name: 'Parchment Cream White',
        hex: '#fffdd0',
        mainImage: 'img/1525966222134-fcfa99b8ae77.webp',
        gallery: [
          'img/1525966222134-fcfa99b8ae77.webp',
          'img/1607522370275-f14206abe5d3.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: false }
    ],
    description: 'The Chuck 70 is built off of the original 1970s design with premium materials and extraordinary attention to detail. Features heavier 12oz organic canvas, gloss egret foxing, winged tongue stitching, and cushioned OrthoLite insole.',
    highlights: [
      'Heavier 12oz durable organic canvas upper',
      'OrthoLite cushioned footbed offers all-day arch comfort',
      'Vintage license plate heel patch with 1970s script logo',
      'Higher glossy rubber sidewall foxing with contrast pinstripe'
    ],
    specifications: {
      'Ideal For': 'Men & Women (Unisex)',
      'Occasion': 'Casual, Concerts & College',
      'Outer Material': '12oz Organic Cotton Canvas',
      'Sole Material': 'Vulcanized Gloss Rubber',
      'Closure': 'High-Top Lace-Ups',
      'Weight': '380 g',
      'Care Instructions': 'Hand wash canvas with soap water; air dry',
      'Country of Origin': 'Vietnam',
      'Warranty': '3 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-snk2-1',
        author: 'Ananya Saxena',
        verified: true,
        rating: 5,
        date: '27 Oct 2026',
        location: 'Pune, Maharashtra',
        title: 'Much more comfortable than normal Chucks!',
        comment: 'The Chuck 70 cushioning makes an enormous difference. The gloss rubber sole looks so high-end.',
        helpfulCount: 63
      }
    ]
  },
  {
    id: 'SHOE-SNK-003',
    name: 'Puma Suede Classic XXI Heritage',
    brand: 'Puma',
    category: 'sneakers',
    categoryName: 'Sneakers',
    badge: 'Flipkart Assured',
    tag: 'Streetwear Icon',
    price: 4199,
    originalPrice: 6999,
    discount: 40,
    rating: 4.5,
    ratingCount: 18600,
    reviewCount: 3240,
    ratingBreakdown: { 5: 65, 4: 21, 3: 8, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Forest Green / White',
        hex: '#1e4620',
        mainImage: 'img/1608231387042-66d1773070a5.webp',
        gallery: [
          'img/1608231387042-66d1773070a5.webp',
          'img/1525966222134-fcfa99b8ae77.webp'
        ]
      },
      {
        name: 'Peacoat Navy',
        hex: '#1d2951',
        mainImage: 'img/1525966222134-fcfa99b8ae77.webp',
        gallery: [
          'img/1525966222134-fcfa99b8ae77.webp',
          'img/1608231387042-66d1773070a5.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Making an impact since 1968, the Suede Classic is a cornerstone of B-Boy, hip-hop, and sneaker culture. Featuring velvet-soft full suede upper, leather Formstrip overlay, and metallic gold foil Puma Suede callout.',
    highlights: [
      'Full suede upper with comfortable synthetic lining',
      'Comfort sockliner provides gentle step-in cushioning',
      'Rubber midsole and outsole for durable traction',
      'Includes original wide white fat laces and standard laces'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Casual & Lifestyle',
      'Outer Material': 'Full Suede Leather',
      'Sole Material': 'Rubber',
      'Closure': 'Lace-Ups',
      'Weight': '350 g',
      'Care Instructions': 'Do not wet; clean with suede eraser',
      'Country of Origin': 'Cambodia',
      'Warranty': '3 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-snk3-1',
        author: 'Gaurav Nair',
        verified: true,
        rating: 5,
        date: '09 Oct 2026',
        location: 'Bengaluru, Karnataka',
        title: 'Timeless silhouette, looks brilliant with cargos',
        comment: 'Forest green shade is deep and luxurious. Cushioning is surprisingly good for a flat sole sneaker.',
        helpfulCount: 39
      }
    ]
  },
  {
    id: 'SHOE-SNK-004',
    name: 'Vans Old Skool Skate Low Side-Stripe',
    brand: 'Vans',
    category: 'sneakers',
    categoryName: 'Sneakers',
    badge: 'Flipkart Assured',
    tag: 'Classic',
    price: 3299,
    originalPrice: 4999,
    discount: 34,
    rating: 4.7,
    ratingCount: 22480,
    reviewCount: 4110,
    ratingBreakdown: { 5: 74, 4: 16, 3: 6, 2: 2, 1: 2 },
    colors: [
      {
        name: 'Black & True White',
        hex: '#222222',
        mainImage: 'img/1525966222134-fcfa99b8ae77.webp',
        gallery: [
          'img/1525966222134-fcfa99b8ae77.webp',
          'img/1539185441755-769473a23570.webp'
        ]
      },
      {
        name: 'Racing Red',
        hex: '#cb2026',
        mainImage: 'img/1539185441755-769473a23570.webp',
        gallery: [
          'img/1539185441755-769473a23570.webp',
          'img/1525966222134-fcfa99b8ae77.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: false }
    ],
    description: 'First known as the Vans #36, the Old Skool debuted in 1977 with a unique new addition: a random doodle drawn by founder Paul Van Doren, originally known as the jazz stripe. Features reinforced toe caps to withstand repeated wear.',
    highlights: [
      'Iconic low-top skate shoe with signature leather Sidestripe',
      'Durable suede and 10 oz canvas uppers',
      'Signature Vans rubber waffle outsoles grip board pedals',
      'Supportive padded collar cushions the ankle joint'
    ],
    specifications: {
      'Ideal For': 'Men & Women',
      'Occasion': 'Skating & Casual Streetwear',
      'Outer Material': 'Suede & Canvas Blend',
      'Sole Material': 'Signature Waffle Gum Rubber',
      'Closure': 'Lace-Ups',
      'Weight': '360 g',
      'Care Instructions': 'Spot clean with mild soapy water',
      'Country of Origin': 'Vietnam',
      'Warranty': '3 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-snk4-1',
        author: 'Rithvik Menon',
        verified: true,
        rating: 5,
        date: '03 Nov 2026',
        location: 'Kochi, Kerala',
        title: 'The quintessential skate sneaker',
        comment: 'Goes with literally any outfit. Jeans, chinos, track pants. Extremely sturdy construction.',
        helpfulCount: 51
      }
    ]
  },
  {
    id: 'SHOE-SNK-005',
    name: 'New Balance 574 Core Classic Retro',
    brand: 'New Balance',
    category: 'sneakers',
    categoryName: 'Sneakers',
    badge: 'Flipkart Assured',
    tag: 'Retro Runner',
    price: 6499,
    originalPrice: 9999,
    discount: 35,
    rating: 4.6,
    ratingCount: 14750,
    reviewCount: 2680,
    ratingBreakdown: { 5: 69, 4: 20, 3: 7, 2: 3, 1: 1 },
    colors: [
      {
        name: 'Iconic Grey / White',
        hex: '#808080',
        mainImage: 'img/1539185441755-769473a23570.webp',
        gallery: [
          'img/1539185441755-769473a23570.webp',
          'img/1584735935682-2f2b69dff9d2.webp'
        ]
      },
      {
        name: 'Vintage Burgundy',
        hex: '#581845',
        mainImage: 'img/1584735935682-2f2b69dff9d2.webp',
        gallery: [
          'img/1584735935682-2f2b69dff9d2.webp',
          'img/1539185441755-769473a23570.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'Designed as a reliable shoe that could do a lot of different things rather than as a platform for revolutionary technology. ENCAP midsole cushioning combines soft foam with a durable polyurethane rim to deliver all-day support.',
    highlights: [
      'ENCAP midsole cushioning delivers high durability and edge stability',
      'Suede and mesh upper offers breathable premium retro aesthetic',
      'Spacious rounded toe-box accommodates broad feet comfortably',
      'Durable rubber outsole provides grip on outdoor surfaces'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Daily Lifestyle & Casual Wear',
      'Outer Material': 'Premium Suede & Breathable Mesh',
      'Sole Material': 'ENCAP Polyurethane Rim & EVA',
      'Closure': 'Lace-Ups',
      'Weight': '330 g',
      'Care Instructions': 'Use suede brush for suede portions; wipe mesh',
      'Country of Origin': 'Vietnam',
      'Warranty': '6 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-snk5-1',
        author: 'Sanjay Dutt Gupta',
        verified: true,
        rating: 5,
        date: '22 Oct 2026',
        location: 'Gurugram, Haryana',
        title: 'Most comfortable lifestyle sneaker',
        comment: 'Grey 574 is a true design classic. Fits true to size, arch support is supportive, and cushioning feels great.',
        helpfulCount: 45
      }
    ]
  },

  // ==========================================
  // 4. SPORTS SHOES (5 Products)
  // ==========================================
  {
    id: 'SHOE-SPT-001',
    name: 'Under Armour Curry Flow Basketball High-Top',
    brand: 'Under Armour',
    category: 'sports',
    categoryName: 'Sports Shoes',
    badge: 'Flipkart Assured',
    tag: 'Pro Athlete',
    price: 8499,
    originalPrice: 13999,
    discount: 39,
    rating: 4.7,
    ratingCount: 8940,
    reviewCount: 1320,
    ratingBreakdown: { 5: 71, 4: 19, 3: 6, 2: 2, 1: 2 },
    colors: [
      {
        name: 'Golden State Royal / Yellow',
        hex: '#1d428a',
        mainImage: 'img/1579338559194-a162d19bf842.webp',
        gallery: [
          'img/1579338559194-a162d19bf842.webp',
          'img/1512374382149-233c42b6a83b.webp'
        ]
      },
      {
        name: 'Stealth Black / Silver',
        hex: '#434b4d',
        mainImage: 'img/1512374382149-233c42b6a83b.webp',
        gallery: [
          'img/1512374382149-233c42b6a83b.webp',
          'img/1579338559194-a162d19bf842.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'Rubberless cushioning technology makes this shoe light and ridiculously grippy on hardwood. UA Flow foam eliminates the heavy rubber outsole, delivering better court feel so you can stop on a dime and sprint back faster.',
    highlights: [
      'UA Flow cushioning technology gives crazy grip without squeaking',
      'Warp upper acts like mini seatbelts holding your foot securely',
      'TPE-blend sockliner with low compression set for energy return',
      'Internal midfoot shank provides torsional rigidity for hard cuts'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Indoor Basketball & Court Sports',
      'Outer Material': 'UA Warp Engineered Knit',
      'Sole Material': 'UA Flow Rubberless Cushion',
      'Closure': 'Lace-Ups',
      'Weight': '355 g',
      'Care Instructions': 'Use soft cloth; avoid outdoor asphalt wear',
      'Country of Origin': 'Vietnam',
      'Warranty': '6 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-spt1-1',
        author: 'Nikhil Rane',
        verified: true,
        rating: 5,
        date: '07 Nov 2026',
        location: 'Mumbai, Maharashtra',
        title: 'Insane bite on indoor wooden courts!',
        comment: 'Zero court slippage. Lateral containment is rock solid for quick crossover cuts.',
        helpfulCount: 41
      }
    ]
  },
  {
    id: 'SHOE-SPT-002',
    name: 'Nike Mercurial Vapor 15 Turf Soccer Cleats',
    brand: 'Nike',
    category: 'sports',
    categoryName: 'Sports Shoes',
    badge: 'Flipkart Assured',
    tag: 'Football Pro',
    price: 5995,
    originalPrice: 8995,
    discount: 33,
    rating: 4.8,
    ratingCount: 11430,
    reviewCount: 2120,
    ratingBreakdown: { 5: 78, 4: 15, 3: 4, 2: 2, 1: 1 },
    colors: [
      {
        name: 'Metallic Copper / White',
        hex: '#b87333',
        mainImage: 'img/1511556532299-8f662fc26c06.webp',
        gallery: [
          'img/1511556532299-8f662fc26c06.webp',
          'img/1579338559194-a162d19bf842.webp'
        ]
      },
      {
        name: 'Glacier Blue / Neon',
        hex: '#71a6d2',
        mainImage: 'img/1579338559194-a162d19bf842.webp',
        gallery: [
          'img/1579338559194-a162d19bf842.webp',
          'img/1511556532299-8f662fc26c06.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Dominate the artificial pitch with explosive speed. Features an all-new soccer-specific Zoom Air unit loaded directly into the plate, providing an extra level of springy underfoot feel so you can move faster across the pitch.',
    highlights: [
      'Turf-specific Zoom Air unit in outsole delivers bouncy responsiveness',
      'Speed cage inside structure secures foot to the plate without excess weight',
      'NikeSkin mesh material overlay gives barefoot touch when dribbling',
      'Molded rubber studs generate high-speed acceleration on turf'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Football & Artificial Turf Play',
      'Outer Material': 'NikeSkin Textured Synthetic',
      'Sole Material': 'Multi-Studded Turf Rubber',
      'Closure': 'Lace-Ups',
      'Weight': '235 g',
      'Care Instructions': 'Rinse turf rubber crumbs; do not machine dry',
      'Country of Origin': 'Vietnam',
      'Warranty': '6 Months Warranty'
    },
    reviews: [
      {
        id: 'rev-spt2-1',
        author: 'Faizan Merchant',
        verified: true,
        rating: 5,
        date: '10 Nov 2026',
        location: 'Goa',
        title: 'Ball control is surgical',
        comment: 'Playing 7-a-side weekly turf matches. Grip on wet artificial grass is extraordinary. Snug performance fit.',
        helpfulCount: 56
      }
    ]
  },
  {
    id: 'SHOE-SPT-003',
    name: 'ASICS Gel-Rocket 11 Indoor Court Courtmaster',
    brand: 'ASICS',
    category: 'sports',
    categoryName: 'Sports Shoes',
    badge: 'Flipkart Assured',
    tag: 'Court Master',
    price: 4199,
    originalPrice: 5999,
    discount: 30,
    rating: 4.6,
    ratingCount: 9880,
    reviewCount: 1540,
    ratingBreakdown: { 5: 68, 4: 21, 3: 7, 2: 2, 1: 2 },
    colors: [
      {
        name: 'White & Directoire Blue',
        hex: '#002fa7',
        mainImage: 'img/1587563871167-1ee9c731aefb.webp',
        gallery: [
          'img/1587563871167-1ee9c731aefb.webp',
          'img/1512374382149-233c42b6a83b.webp'
        ]
      },
      {
        name: 'Black & Pure Gold',
        hex: '#ffd700',
        mainImage: 'img/1512374382149-233c42b6a83b.webp',
        gallery: [
          'img/1512374382149-233c42b6a83b.webp',
          'img/1587563871167-1ee9c731aefb.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'A multi-purpose indoor court shoe offering great stability and easy movement for badminton, squash, and volleyball players. Designed with flexible upper construction and Gel cushioning technology in the heel.',
    highlights: [
      'GEL technology cushioning improves impact absorption during smashes',
      'TRUSSTIC application in midsole improves stability during quick transitions',
      'Side wrap-up construction adds lateral containment',
      'Gum rubber non-marking sole provides reliable traction on wooden and synthetic courts'
    ],
    specifications: {
      'Ideal For': 'Men & Women',
      'Occasion': 'Badminton, Squash, Volleyball',
      'Outer Material': 'Breathable Mesh & Synthetic Leather',
      'Sole Material': 'Non-Marking Gum Rubber',
      'Closure': 'Lace-Ups',
      'Weight': '295 g',
      'Care Instructions': 'Wipe clean; indoor court use only',
      'Country of Origin': 'Cambodia',
      'Warranty': '6 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-spt3-1',
        author: 'Pranav Kashyap',
        verified: true,
        rating: 5,
        date: '12 Oct 2026',
        location: 'Bengaluru, Karnataka',
        title: 'Ideal for club badminton',
        comment: 'Doesn’t skid on wooden floors, ankle support is steady when lunging for backhand shots.',
        helpfulCount: 33
      }
    ]
  },
  {
    id: 'SHOE-SPT-004',
    name: 'Adidas Barricade 13 Tennis Hardcourt Pro',
    brand: 'Adidas',
    category: 'sports',
    categoryName: 'Sports Shoes',
    badge: 'Flipkart Assured',
    tag: 'Tennis Champion',
    price: 7599,
    originalPrice: 12999,
    discount: 41,
    rating: 4.5,
    ratingCount: 6210,
    reviewCount: 910,
    ratingBreakdown: { 5: 63, 4: 23, 3: 8, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Lucid Lemon / Black',
        hex: '#dfff00',
        mainImage: 'img/1512374382149-233c42b6a83b.webp',
        gallery: [
          'img/1512374382149-233c42b6a83b.webp',
          'img/1582588678413-dbf45f4823e9.webp'
        ]
      },
      {
        name: 'Core Black / Silver',
        hex: '#111111',
        mainImage: 'img/1582588678413-dbf45f4823e9.webp',
        gallery: [
          'img/1582588678413-dbf45f4823e9.webp',
          'img/1512374382149-233c42b6a83b.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Control the court with the legendary Barricade. Intuitive lacing system creates a lockdown fit by matching the neoprene tongue to your foot shape. Geofit system in the heel fills remaining gaps for total connection.',
    highlights: [
      'Adiwear herringbone outsole balances traction and durability on hardcourts',
      'Asymmetrical lacing locks foot during rapid baseline slides',
      'Bounce cushioning midsole delivers high spring-back energy',
      'Adituff abrasion-resistant toe wrap shields against court drag'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Hardcourt Tennis & Pickleball',
      'Outer Material': 'Breathable Mesh with RPU Overlays',
      'Sole Material': 'Adiwear 6 High-Durability Rubber',
      'Closure': 'Asymmetrical Lacing',
      'Weight': '395 g',
      'Care Instructions': 'Wipe court dust with microfiber cloth',
      'Country of Origin': 'Vietnam',
      'Warranty': '6 Months Outsole Guarantee'
    },
    reviews: [
      {
        id: 'rev-spt4-1',
        author: 'Devanshu Bhatt',
        verified: true,
        rating: 5,
        date: '28 Sep 2026',
        location: 'New Delhi, Delhi',
        title: 'Unrivaled stability on hard tennis courts',
        comment: 'If you slide a lot like Djokovic on baseline, this is the only shoe that won’t wear out within months.',
        helpfulCount: 29
      }
    ]
  },
  {
    id: 'SHOE-SPT-005',
    name: 'Reebok Nano X4 Cross-Training Gym Shoe',
    brand: 'Reebok',
    category: 'sports',
    categoryName: 'Sports Shoes',
    badge: 'Flipkart Assured',
    tag: 'CrossFit Gear',
    price: 6999,
    originalPrice: 11999,
    discount: 41,
    rating: 4.7,
    ratingCount: 10340,
    reviewCount: 1820,
    ratingBreakdown: { 5: 73, 4: 17, 3: 6, 2: 2, 1: 2 },
    colors: [
      {
        name: 'Army Green / Black',
        hex: '#4b5320',
        mainImage: 'img/1582588678413-dbf45f4823e9.webp',
        gallery: [
          'img/1582588678413-dbf45f4823e9.webp',
          'img/1587563871167-1ee9c731aefb.webp'
        ]
      },
      {
        name: 'Triple White',
        hex: '#ffffff',
        mainImage: 'img/1587563871167-1ee9c731aefb.webp',
        gallery: [
          'img/1587563871167-1ee9c731aefb.webp',
          'img/1582588678413-dbf45f4823e9.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'The official shoe of fitness. The Nano X4 eliminates unnecessary material weight with an updated Flexweave woven upper and an advanced ventilation panel, while the Lift and Run (L.A.R) chassis system stabilizes heavy lifting.',
    highlights: [
      'Lift and Run (L.A.R) chassis adapts for heavy squats and box jumps',
      'Flexweave woven textile upper provides target stretch and durability',
      'TPU heel clip locks the rearfoot for olympic barbell lifts',
      'Floatride Energy Foam in forefoot provides responsive running cushion'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'CrossFit, Weightlifting & HIIT',
      'Outer Material': 'Flexweave Woven Textile',
      'Sole Material': 'Dual-Compound High Traction Rubber',
      'Closure': 'Lace-Ups',
      'Weight': '330 g',
      'Care Instructions': 'Air dry; avoid soaking in water',
      'Country of Origin': 'Vietnam',
      'Warranty': '6 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-spt5-1',
        author: 'Vikram Rajput',
        verified: true,
        rating: 5,
        date: '04 Nov 2026',
        location: 'Jaipur, Rajasthan',
        title: 'Heel feels glued to the platform on 140kg squats',
        comment: 'Firm heel base yet flexible enough for double unders and 400m treadmill runs. Essential gym shoe.',
        helpfulCount: 46
      }
    ]
  },

  // ==========================================
  // 5. FORMAL SHOES (5 Products)
  // ==========================================
  {
    id: 'SHOE-FOR-001',
    name: 'Bata Formal Handcrafted Italian Oxford',
    brand: 'Bata',
    category: 'formal',
    categoryName: 'Formal Shoes',
    badge: 'Flipkart Assured',
    tag: 'Corporate Classic',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.3,
    ratingCount: 19820,
    reviewCount: 3420,
    ratingBreakdown: { 5: 59, 4: 25, 3: 9, 2: 4, 1: 3 },
    colors: [
      {
        name: 'Jet Black Gloss',
        hex: '#0a0a0a',
        mainImage: 'img/1614252235316-8c857d38b5f4.webp',
        gallery: [
          'img/1614252235316-8c857d38b5f4.webp',
          'img/1543163521-1bf539c55dd2.webp',
          'img/1595341888016-a392ef81b7de.webp'
        ]
      },
      {
        name: 'Rich Dark Tan',
        hex: '#654321',
        mainImage: 'img/1543163521-1bf539c55dd2.webp',
        gallery: [
          'img/1543163521-1bf539c55dd2.webp',
          'img/1614252235316-8c857d38b5f4.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'An executive Oxford shoe characterized by closed lacing and cap-toe construction. Crafted from high-gloss top-grain leather that pairs effortlessly with tailored suits, tuxedoes, and sharp boardroom attire.',
    highlights: [
      'Genuine top-grain leather with lustrous mirror-shine finish',
      'Closed lacing Oxford construction delivers razor-sharp silhouette',
      'Cushioned leather lining prevents sock friction and heel blister',
      'Slip-resistant TPR formal sole with reinforced stacked heel'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Formal Boardroom & Weddings',
      'Outer Material': 'Top-Grain Leather',
      'Sole Material': 'Durable Thermo Plastic Rubber',
      'Closure': 'Lace-Ups (Closed Oxford)',
      'Weight': '370 g',
      'Care Instructions': 'Use black wax shoe polish; buff with horsehair brush',
      'Country of Origin': 'India',
      'Warranty': '90 Days Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-for1-1',
        author: 'Ashwin Nair',
        verified: true,
        rating: 5,
        date: '14 Oct 2026',
        location: 'Bengaluru, Karnataka',
        title: 'Looked magnificent at my wedding reception',
        comment: 'High shine without feeling stiff. Shined up with Kiwi wax polish and it looked like a 10K shoe.',
        helpfulCount: 61
      },
      {
        id: 'rev-for1-2',
        author: 'Sameer Sen',
        verified: true,
        rating: 4,
        date: '02 Sep 2026',
        location: 'Kolkata, West Bengal',
        title: 'Very formal and comfortable',
        comment: 'Sole has good cushioning for a formal shoe. Value for money.',
        helpfulCount: 24
      }
    ]
  },
  {
    id: 'SHOE-FOR-002',
    name: 'Clarks Oliver Wingtip Medallion Brogue',
    brand: 'Clarks',
    category: 'formal',
    categoryName: 'Formal Shoes',
    badge: 'Flipkart Assured',
    tag: 'Gentleman Choice',
    price: 5499,
    originalPrice: 9999,
    discount: 45,
    rating: 4.7,
    ratingCount: 6410,
    reviewCount: 1190,
    ratingBreakdown: { 5: 75, 4: 17, 3: 5, 2: 2, 1: 1 },
    colors: [
      {
        name: 'Hand-Burnished Tan',
        hex: '#8b5a2b',
        mainImage: 'img/1533867617858-e7b97e060509.webp',
        gallery: [
          'img/1533867617858-e7b97e060509.webp',
          'img/1614252235316-8c857d38b5f4.webp'
        ]
      },
      {
        name: 'Deep Burgundy Wine',
        hex: '#541414',
        mainImage: 'img/1614252235316-8c857d38b5f4.webp',
        gallery: [
          'img/1614252235316-8c857d38b5f4.webp',
          'img/1533867617858-e7b97e060509.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Imbued with classic English heritage, the Oliver Wingtip Brogue boasts intricate perforated medallion detailing across the toe and serrated pinking edges. Hand-burnished by master shoemakers for depth of patina.',
    highlights: [
      'Full-grain calfskin leather hand-burnished for rich two-tone gradient',
      'Intricate traditional brogue punching and wingtip medallion pattern',
      'Dual density foam footbed cushions long office hours',
      'Leather welt with durable rubber island insert for wet weather grip'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Formal, Corporate & Black Tie',
      'Outer Material': 'Full-Grain Calfskin Leather',
      'Sole Material': 'Leather Welt with Rubber Inlay',
      'Closure': 'Lace-Ups',
      'Weight': '410 g',
      'Care Instructions': 'Apply luxury cream polish, keep cedar shoe trees inside',
      'Country of Origin': 'India',
      'Warranty': '6 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-for2-1',
        author: 'Ramanathan Swamy',
        verified: true,
        rating: 5,
        date: '05 Nov 2026',
        location: 'Chennai, Tamil Nadu',
        title: 'Masterpiece of shoemaking!',
        comment: 'The brogue perforations are clean and symmetrical. Hand-burnished tan tone looks stunning with blue and grey suits.',
        helpfulCount: 47
      }
    ]
  },
  {
    id: 'SHOE-FOR-003',
    name: 'Red Tape Formal Double Monk Strap Executive',
    brand: 'Red Tape',
    category: 'formal',
    categoryName: 'Formal Shoes',
    badge: 'Flipkart Assured',
    tag: 'Modern Formal',
    price: 2199,
    originalPrice: 5999,
    discount: 63,
    rating: 4.4,
    ratingCount: 15920,
    reviewCount: 2870,
    ratingBreakdown: { 5: 64, 4: 21, 3: 9, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Cognac Brown',
        hex: '#9e472a',
        mainImage: 'img/1543163521-1bf539c55dd2.webp',
        gallery: [
          'img/1543163521-1bf539c55dd2.webp',
          'img/1614252235316-8c857d38b5f4.webp'
        ]
      },
      {
        name: 'Glossy Black',
        hex: '#1a1a1a',
        mainImage: 'img/1614252235316-8c857d38b5f4.webp',
        gallery: [
          'img/1614252235316-8c857d38b5f4.webp',
          'img/1543163521-1bf539c55dd2.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'Elevate your tailored wardrobe with double buckle monk straps. Cut from smooth polished leather with elasticated buckle gussets that allow you to slide in easily without unbuckling every time.',
    highlights: [
      'Twin silver-finish metal buckle closures with hidden elastic gussets',
      'Smooth premium crust leather upper with clean chisel toe silhouette',
      'Padded collar and moisture-wicking sockliner',
      'Lightweight TPR outsole prevents heel slipping on smooth tiles'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Formal Meetings & Evening Galas',
      'Outer Material': 'Crust Leather',
      'Sole Material': 'TPR Formal Sole',
      'Closure': 'Double Buckle Monk Strap',
      'Weight': '360 g',
      'Care Instructions': 'Use wax polish and soft flannel cloth',
      'Country of Origin': 'India',
      'Warranty': '45 Days Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-for3-1',
        author: 'Kunal Malhotra',
        verified: true,
        rating: 5,
        date: '19 Oct 2026',
        location: 'Chandigarh, Punjab',
        title: 'Dapper and eye-catching!',
        comment: 'Received compliments from my colleagues on the first day itself. Great leather finish for ₹2,199.',
        helpfulCount: 38
      }
    ]
  },
  {
    id: 'SHOE-FOR-004',
    name: 'Hush Puppies Executive Leather Derby Comfort',
    brand: 'Hush Puppies',
    category: 'formal',
    categoryName: 'Formal Shoes',
    badge: 'Flipkart Assured',
    tag: 'All Day Formal',
    price: 4799,
    originalPrice: 7999,
    discount: 40,
    rating: 4.5,
    ratingCount: 8300,
    reviewCount: 1460,
    ratingBreakdown: { 5: 67, 4: 20, 3: 7, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Charcoal Black',
        hex: '#1c1c1c',
        mainImage: 'img/1595341888016-a392ef81b7de.webp',
        gallery: [
          'img/1595341888016-a392ef81b7de.webp',
          'img/1614252235316-8c857d38b5f4.webp'
        ]
      },
      {
        name: 'Cordovan Brown',
        hex: '#4b2e2e',
        mainImage: 'img/1614252235316-8c857d38b5f4.webp',
        gallery: [
          'img/1614252235316-8c857d38b5f4.webp',
          'img/1595341888016-a392ef81b7de.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Engineered specifically for professionals who spend long hours on their feet. Features an open-lacing Derby vamp for broad arch flexibility, lined with sheepskin leather and integrated with a high-rebound polyurethane footbed.',
    highlights: [
      'ZeroG ultra-lightweight technology reduces fatigue by 40%',
      'Supple full-grain leather upper with waterproof treatment',
      'Removable contoured memory footbed fits custom orthotics',
      'Shock-absorbing EVA heel cup dissipates heel strike vibration'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Formal & Daily Corporate Commute',
      'Outer Material': 'Full-Grain Sheepskin Leather',
      'Sole Material': 'ZeroG Lightweight PU Sole',
      'Closure': 'Lace-Ups (Derby)',
      'Weight': '315 g',
      'Care Instructions': 'Use leather lotion to nourish hide',
      'Country of Origin': 'India',
      'Warranty': '6 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-for4-1',
        author: 'Anil Kulkarni',
        verified: true,
        rating: 5,
        date: '30 Oct 2026',
        location: 'Pune, Maharashtra',
        title: 'Like running shoes disguised as formals!',
        comment: 'I walk over 4 km daily between metro and office. No blister, no heel ache. 10/10.',
        helpfulCount: 52
      }
    ]
  },
  {
    id: 'SHOE-FOR-005',
    name: 'Woodland Classic City Chelsea Dress Boot',
    brand: 'Woodland',
    category: 'formal',
    categoryName: 'Formal Shoes',
    badge: 'Flipkart Assured',
    tag: 'Signature Boot',
    price: 4195,
    originalPrice: 6495,
    discount: 35,
    rating: 4.6,
    ratingCount: 12110,
    reviewCount: 2340,
    ratingBreakdown: { 5: 69, 4: 19, 3: 7, 2: 3, 1: 2 },
    colors: [
      {
        name: 'Onyx Black Leather',
        hex: '#0f0f0f',
        mainImage: 'img/1608256246200-53e635b5b65f.webp',
        gallery: [
          'img/1608256246200-53e635b5b65f.webp',
          'img/1549298916-b41d501d3772.webp'
        ]
      },
      {
        name: 'Rustic Brown',
        hex: '#593e2b',
        mainImage: 'img/1549298916-b41d501d3772.webp',
        gallery: [
          'img/1549298916-b41d501d3772.webp',
          'img/1608256246200-53e635b5b65f.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'A handsome Chelsea boot that balances formal sophistication with Woodland’s renowned toughness. Twin heavy-duty elastic side gussets and pull loops make sliding in effortless. Looks sharp paired with slim trousers or dark denim.',
    highlights: [
      'Full-grain oily pull-up leather develops rich character with age',
      'Dual elastic stretch panels allow snug slip-on fit',
      'Sturdy Goodyear welt stitch adds longevity and water resistance',
      'Low profile rubber sole with textured forefoot traction pad'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Formal, Smart Casual & Winter Events',
      'Outer Material': 'Pull-Up Genuine Leather',
      'Sole Material': 'Durable Vulcanized Rubber',
      'Closure': 'Slip-On (Chelsea Gussets)',
      'Weight': '460 g',
      'Care Instructions': 'Use Woodland leather wax conditioner',
      'Country of Origin': 'India',
      'Warranty': '6 Months Warranty'
    },
    reviews: [
      {
        id: 'rev-for5-1',
        author: 'Harshvardhan Rao',
        verified: true,
        rating: 5,
        date: '08 Nov 2026',
        location: 'Hyderabad, Telangana',
        title: 'Outstanding Chelsea boots!',
        comment: 'Looks identical to ₹15,000 designer boots. Leather quality is thick and elastic hasn’t stretched out.',
        helpfulCount: 43
      }
    ]
  },

  // ==========================================
  // 6. WALKING SHOES (5 Products)
  // ==========================================
  {
    id: 'SHOE-WLK-001',
    name: 'Skechers GO WALK 6 Dynamic Strides Memory Foam',
    brand: 'Skechers',
    category: 'walking',
    categoryName: 'Walking Shoes',
    badge: 'Flipkart Assured',
    tag: 'Walking Champion',
    price: 3999,
    originalPrice: 6499,
    discount: 38,
    rating: 4.7,
    ratingCount: 31450,
    reviewCount: 5820,
    ratingBreakdown: { 5: 75, 4: 17, 3: 5, 2: 2, 1: 1 },
    colors: [
      {
        name: 'Charcoal Grey / Orange',
        hex: '#3b3b3b',
        mainImage: 'img/1584735935682-2f2b69dff9d2.webp',
        gallery: [
          'img/1584735935682-2f2b69dff9d2.webp',
          'img/1560769629-975ec94e6a86.webp'
        ]
      },
      {
        name: 'Navy Blue / White',
        hex: '#1b263b',
        mainImage: 'img/1560769629-975ec94e6a86.webp',
        gallery: [
          'img/1560769629-975ec94e6a86.webp',
          'img/1584735935682-2f2b69dff9d2.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'Step into peak walking comfort with Skechers GO WALK 6. Features lightweight ULTRA GO cushioning, Air-Cooled Goga Mat insole, and high-rebound Hyper Pillar Technology for added arch and underfoot support on morning walks.',
    highlights: [
      'High-rebound ultra-lightweight Hyper Pillars support natural foot strike',
      'Air-Cooled Goga Mat breathable insole with high-rebound cushioning',
      'Stretch Fit slip-on engineered knit upper for sock-like feel',
      'Ortholite comfort foam insole layer adds long-term cushioning'
    ],
    specifications: {
      'Ideal For': 'Men & Women (Senior Citizens friendly)',
      'Occasion': 'Daily Morning Walks & Sightseeing Travel',
      'Outer Material': 'Engineered Stretch Knit',
      'Sole Material': 'Dual-Density Hyper Pillar Ultra GO Sole',
      'Closure': 'Slip-On (Hands-Free Fit)',
      'Weight': '210 g (Ultralight)',
      'Care Instructions': 'Machine washable on gentle cycle cold; air dry',
      'Country of Origin': 'Vietnam',
      'Warranty': '3 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-wlk1-1',
        author: 'Sunil Gavaskar K.',
        verified: true,
        rating: 5,
        date: '16 Nov 2026',
        location: 'Bengaluru, Karnataka',
        title: 'Godsend for plantar fasciitis and heel spur',
        comment: 'My morning 6km walk is completely pain-free now. You literally feel the pillars bounce you up with each step.',
        helpfulCount: 94
      },
      {
        id: 'rev-wlk1-2',
        author: 'Kamala Narang',
        verified: true,
        rating: 5,
        date: '01 Nov 2026',
        location: 'Ahmedabad, Gujarat',
        title: 'Gifted to my father, he loves them',
        comment: 'So easy to slip on without bending over or tying laces. Very stable grip.',
        helpfulCount: 48
      }
    ]
  },
  {
    id: 'SHOE-WLK-002',
    name: 'Reebok Walk Ultra 7 DMX Foam Ortho',
    brand: 'Reebok',
    category: 'walking',
    categoryName: 'Walking Shoes',
    badge: 'Flipkart Assured',
    tag: 'Orthopedic Cushion',
    price: 2999,
    originalPrice: 5599,
    discount: 46,
    rating: 4.4,
    ratingCount: 14290,
    reviewCount: 2410,
    ratingBreakdown: { 5: 62, 4: 24, 3: 8, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Cloud White / Slate Grey',
        hex: '#eaeaea',
        mainImage: 'img/1579338559194-a162d19bf842.webp',
        gallery: [
          'img/1579338559194-a162d19bf842.webp',
          'img/1584735935682-2f2b69dff9d2.webp'
        ]
      },
      {
        name: 'Triple Black',
        hex: '#121212',
        mainImage: 'img/1606107557195-0e29a4b5b4aa.webp',
        gallery: [
          'img/1606107557195-0e29a4b5b4aa.webp',
          'img/1579338559194-a162d19bf842.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Moving air cushioning transitions air from heel to forefoot and back as you walk. Combination leather and textile upper gives structured support while MemoryTech foam sockliner provides first-feel comfort.',
    highlights: [
      'DMX cushioning moves air from heel to toe for dynamic stride assist',
      'MemoryTech foam footbed delivers tailored underfoot molding',
      'Supportive leather overlays keep the foot aligned inside the shoe',
      'High-abrasion rubber outsole gives grip on tiled and wet pavement'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Brisk Walking & Fitness',
      'Outer Material': 'Breathable Mesh & Supportive Leather Overlays',
      'Sole Material': 'DMX Air Cushion & High Abrasion Rubber',
      'Closure': 'Lace-Ups',
      'Weight': '290 g',
      'Care Instructions': 'Wipe with soft damp cloth',
      'Country of Origin': 'Vietnam',
      'Warranty': '3 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-wlk2-1',
        author: 'Girish Chandra',
        verified: true,
        rating: 5,
        date: '21 Oct 2026',
        location: 'Lucknow, Uttar Pradesh',
        title: 'Very supportive for heavy walkers',
        comment: 'I weigh 92kg and regular walking shoes collapse quickly. DMX foam keeps its bounce intact after 3 months.',
        helpfulCount: 37
      }
    ]
  },
  {
    id: 'SHOE-WLK-003',
    name: 'Puma Softride Rift Everyday Walker Slip-On',
    brand: 'Puma',
    category: 'walking',
    categoryName: 'Walking Shoes',
    badge: 'Flipkart Assured',
    tag: 'Soft Foam',
    price: 2699,
    originalPrice: 4999,
    discount: 46,
    rating: 4.3,
    ratingCount: 20180,
    reviewCount: 3740,
    ratingBreakdown: { 5: 60, 4: 25, 3: 9, 2: 4, 1: 2 },
    colors: [
      {
        name: 'Puma Black / White',
        hex: '#1a1a1a',
        mainImage: 'img/1608231387042-66d1773070a5.webp',
        gallery: [
          'img/1608231387042-66d1773070a5.webp',
          'img/1560769629-975ec94e6a86.webp'
        ]
      },
      {
        name: 'High Risk Red',
        hex: '#e63946',
        mainImage: 'img/1542291026-7eec264c27ff.webp',
        gallery: [
          'img/1542291026-7eec264c27ff.webp',
          'img/1608231387042-66d1773070a5.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'Engineered with SOFTRIDE foam, the softest foam in Puma’s arsenal. Bootie slip-on silhouette with bold lateral Puma branding and a TPU cage that anchors the lacing system for stability.',
    highlights: [
      'SOFTRIDE foam midsole provides extreme cushioning for all-day comfort',
      'SoftFoam+ sockliner gives instant step-in ease and long-lasting rebound',
      'Slip-on bootie construction with asymmetrical collar',
      'Zoned rubber outsole pods provide multi-surface grip'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Fitness Walks & Casual Travel',
      'Outer Material': 'Breathable Engineered Knit',
      'Sole Material': 'SOFTRIDE EVA & Zoned Rubber',
      'Closure': 'Slip-On with Integrated Laces',
      'Weight': '240 g',
      'Care Instructions': 'Hand wash sole; wipe upper with clean cloth',
      'Country of Origin': 'India',
      'Warranty': '3 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-wlk3-1',
        author: 'Karthik Raja',
        verified: true,
        rating: 5,
        date: '06 Nov 2026',
        location: 'Coimbatore, Tamil Nadu',
        title: 'Ultra soft insole!',
        comment: 'Takes walking to another level. SoftFoam feels pillowy on heel strike. Great price on Flipkart.',
        helpfulCount: 50
      }
    ]
  },
  {
    id: 'SHOE-WLK-004',
    name: 'Salomon Speedcross Vibe All-Terrain Trail Walker',
    brand: 'Salomon',
    category: 'walking',
    categoryName: 'Walking Shoes',
    badge: 'Flipkart Assured',
    tag: 'All Terrain',
    price: 9299,
    originalPrice: 14999,
    discount: 38,
    rating: 4.8,
    ratingCount: 8120,
    reviewCount: 1670,
    ratingBreakdown: { 5: 79, 4: 14, 3: 4, 2: 2, 1: 1 },
    colors: [
      {
        name: 'Magnet Black / Phantom',
        hex: '#252525',
        mainImage: 'img/1520639888713-7851133b1ed0.webp',
        gallery: [
          'img/1520639888713-7851133b1ed0.webp',
          'img/1584735935682-2f2b69dff9d2.webp'
        ]
      },
      {
        name: 'Burnt Ochre Trail',
        hex: '#b3541e',
        mainImage: 'img/1549298916-b41d501d3772.webp',
        gallery: [
          'img/1549298916-b41d501d3772.webp',
          'img/1520639888713-7851133b1ed0.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true },
      { size: 'UK 11', inStock: true }
    ],
    description: 'An aggressive grip monster engineered for technical hill walks, forest trails, and uneven mountain paths. Mud Contagrip deep chevron lugs bite into soft terrain, mud, and scree with unshakeable stability.',
    highlights: [
      'Mud Contagrip outsole with deep multidirectional chevron lugs',
      'Quicklace one-pull lacing system with lace pocket garage',
      'Sensifit cradles the foot from midsole to lacing system',
      'EnergyCell+ high-rebound midsole foam compound provides exceptional energy return'
    ],
    specifications: {
      'Ideal For': 'Men',
      'Occasion': 'Nature Hikes, Hill Walking & Trail Travel',
      'Outer Material': 'Ripstop Anti-Debris Mesh & Welded TPU',
      'Sole Material': 'Mud Contagrip Aggressive Rubber',
      'Closure': 'Quicklace Single-Pull Drawcord',
      'Weight': '320 g',
      'Care Instructions': 'Hose down with cold water; dry away from heat sources',
      'Country of Origin': 'Vietnam',
      'Warranty': '1 Year Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-wlk4-1',
        author: 'Tenzing Norbu',
        verified: true,
        rating: 5,
        date: '24 Oct 2026',
        location: 'Gangtok, Sikkim',
        title: 'The undisputed king of hill paths',
        comment: 'Walking on wet mountain slopes or muddy jungle trails, you will never slip. Quicklace is super convenient.',
        helpfulCount: 65
      }
    ]
  },
  {
    id: 'SHOE-WLK-005',
    name: 'Adidas Cloudfoam Pure 2.0 Walker Lite',
    brand: 'Adidas',
    category: 'walking',
    categoryName: 'Walking Shoes',
    badge: 'Flipkart Assured',
    tag: 'Featherlight',
    price: 3199,
    originalPrice: 5999,
    discount: 46,
    rating: 4.5,
    ratingCount: 26730,
    reviewCount: 4920,
    ratingBreakdown: { 5: 68, 4: 20, 3: 7, 2: 3, 1: 2 },
    colors: [
      {
        name: 'Core Black / Grey Five',
        hex: '#2b2b2b',
        mainImage: 'img/1518002171953-a080ee817e1f.webp',
        gallery: [
          'img/1518002171953-a080ee817e1f.webp',
          'img/1584735935682-2f2b69dff9d2.webp'
        ]
      },
      {
        name: 'White Tint',
        hex: '#f8f9fa',
        mainImage: 'img/1584735935682-2f2b69dff9d2.webp',
        gallery: [
          'img/1584735935682-2f2b69dff9d2.webp',
          'img/1518002171953-a080ee817e1f.webp'
        ]
      }
    ],
    sizes: [
      { size: 'UK 6', inStock: true },
      { size: 'UK 7', inStock: true },
      { size: 'UK 8', inStock: true },
      { size: 'UK 9', inStock: true },
      { size: 'UK 10', inStock: true }
    ],
    description: 'Crisp, clean style meets pillow-soft Cloudfoam cushioning. Designed for city walks, casual errands, and staying comfortable through thousands of daily steps. Primegreen recycled materials upper.',
    highlights: [
      'Cloudfoam memory sockliner molds to the contours of your arch',
      'Cloudfoam midsole and outsole combined unit keeps total weight under 210g',
      'Textile lining creates friction-free sock comfort',
      'Made with Primegreen high-performance recycled materials'
    ],
    specifications: {
      'Ideal For': 'Men & Women',
      'Occasion': 'Daily Walking & Errands',
      'Outer Material': 'Primegreen Recycled Knit',
      'Sole Material': 'Ultra-Cushioned Cloudfoam EVA',
      'Closure': 'Lace-Ups',
      'Weight': '205 g',
      'Care Instructions': 'Wipe clean; air dry',
      'Country of Origin': 'Indonesia',
      'Warranty': '3 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'rev-wlk5-1',
        author: 'Ritika Bannerjee',
        verified: true,
        rating: 5,
        date: '12 Nov 2026',
        location: 'Kolkata, West Bengal',
        title: 'Super light, feels like nothing on my feet!',
        comment: 'Walk 10,000 steps daily for fitness and these make it completely effortless. Extremely soft cushioning.',
        helpfulCount: 42
      }
    ]
  }
];

// Verify product count
if (PRODUCTS.length !== 30) {
  console.error(`Warning: Expected 30 products, but found ${PRODUCTS.length}`);
}
