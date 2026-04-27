export const categories = [
  { id: 'burgers', name: 'Burgers', emoji: '🍔', color: '#D62300' },
  { id: 'fries', name: 'Fries & Sides', emoji: '🍟', color: '#F5A623' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤', color: '#1A73E8' },
  { id: 'desserts', name: 'Desserts', emoji: '🍦', color: '#C2185B' },
  { id: 'wraps', name: 'Wraps', emoji: '🌯', color: '#388E3C' },
];

export const menuItems = [
  // Burgers
  {
    id: 'b1', categoryId: 'burgers', name: 'Crispy Chicken Royale', price: 290, rating: 4.8,
    calories: 540, isVeg: false, isBestseller: true, isNew: false,
    description: 'Crispy chicken patty with signature mayo, fresh lettuce, and tomato on a toasted sesame bun.',
    tags: ['Spicy', 'Bestseller'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
    addOns: [
      { id: 'ao1', name: 'Extra Cheese', price: 24 },
      { id: 'ao2', name: 'Extra Patty', price: 49 },
      { id: 'ao3', name: 'Jalapeños', price: 15 },
    ],
  },
  {
    id: 'b2', categoryId: 'burgers', name: 'Veg Makhani Burst', price: 90, rating: 4.3,
    calories: 380, isVeg: true, isBestseller: false, isNew: true,
    description: 'Rich makhani-spiced veggie patty with creamy sauce and crunchy onions.',
    tags: ['Veg', 'New'],
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80',
    addOns: [
      { id: 'ao1', name: 'Extra Cheese', price: 24 },
      { id: 'ao4', name: 'Grilled Onions', price: 10 },
    ],
  },
  {
    id: 'b3', categoryId: 'burgers', name: 'Spicy Paneer King', price: 790, rating: 4.6,
    calories: 620, isVeg: true, isBestseller: true, isNew: false,
    description: 'Paneer patty marinated in bold spices, lettuce, onion rings, and BK special sauce.',
    tags: ['Veg', 'Spicy', 'Bestseller'],
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?w=500&q=80',
    addOns: [
      { id: 'ao1', name: 'Extra Cheese', price: 24 },
      { id: 'ao3', name: 'Jalapeños', price: 15 },
    ],
  },
  {
    id: 'b4', categoryId: 'burgers', name: 'Whopper Jr.', price: 199, rating: 4.5,
    calories: 490, isVeg: false, isBestseller: false, isNew: false,
    description: 'Flame-grilled beef patty with tomatoes, lettuce, mayo, and pickles.',
    tags: ['Classic'],
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=80',
    addOns: [
      { id: 'ao1', name: 'Extra Cheese', price: 24 },
      { id: 'ao2', name: 'Extra Patty', price: 49 },
    ],
  },
  {
    id: 'b5', categoryId: 'burgers', name: 'Double Stacker King', price: 850, rating: 4.9,
    calories: 880, isVeg: false, isBestseller: true, isNew: false,
    description: 'Two flame-grilled beef patties, double cheese, crispy bacon, special sauce.',
    tags: ['Bestseller', 'Premium'],
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80',
    addOns: [
      { id: 'ao2', name: 'Extra Patty', price: 49 },
      { id: 'ao5', name: 'Bacon', price: 59 },
    ],
  },
  {
    id: 'b6', categoryId: 'burgers', name: 'Korean Spicy Crunch', price: 320, rating: 4.7,
    calories: 560, isVeg: false, isBestseller: false, isNew: true,
    description: 'Korean-marinated crispy chicken, gochujang mayo, kimchi slaw.',
    tags: ['Spicy', 'New', 'Korean'],
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80',
    addOns: [
      { id: 'ao1', name: 'Extra Cheese', price: 24 },
      { id: 'ao3', name: 'Jalapeños', price: 15 },
    ],
  },
  // Fries & Sides
  {
    id: 'f1', categoryId: 'fries', name: 'Fries (King)', price: 250, rating: 4.9,
    calories: 380, isVeg: true, isBestseller: true, isNew: false,
    description: 'Golden crispy fries seasoned with our signature peri peri blend.',
    tags: ['Veg', 'Bestseller'],
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80',
    addOns: [],
  },
  {
    id: 'f2', categoryId: 'fries', name: 'Chicken Nuggets', price: 290, rating: 4.3,
    calories: 310, isVeg: false, isBestseller: false, isNew: false,
    description: 'Crispy golden nuggets with your choice of dipping sauce.',
    tags: ['Classic'],
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80',
    addOns: [],
  },
  {
    id: 'f3', categoryId: 'fries', name: 'Garlic Bread', price: 180, rating: 4.9,
    calories: 220, isVeg: true, isBestseller: false, isNew: false,
    description: 'Toasted garlic bread with herbed butter and bbq dip.',
    tags: ['Veg'],
    image: 'https://images.unsplash.com/photo-1619985632461-f33748ef7f6a?w=500&q=80',
    addOns: [],
  },
  {
    id: 'f4', categoryId: 'fries', name: 'Veg Pizza Puff', price: 220, rating: 4.6,
    calories: 280, isVeg: true, isBestseller: false, isNew: false,
    description: 'Flaky puff pastry filled with paneer, lettuce, and onion.',
    tags: ['Veg'],
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80',
    addOns: [],
  },
  // Drinks
  {
    id: 'd1', categoryId: 'drinks', name: 'Coca-Cola (L)', price: 95, rating: 4.6,
    calories: 140, isVeg: true, isBestseller: true, isNew: false,
    description: 'Ice-cold Coca-Cola, perfectly paired with any BK meal.',
    tags: ['Classic'],
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80',
    addOns: [],
  },
  {
    id: 'd2', categoryId: 'drinks', name: 'Chocolate Shake', price: 150, rating: 4.9,
    calories: 480, isVeg: true, isBestseller: false, isNew: false,
    description: 'Rich, thick chocolate milkshake made with real milk.',
    tags: ['Premium'],
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80',
    addOns: [],
  },
  {
    id: 'd3', categoryId: 'drinks', name: 'Fanta Orange (L)', price: 95, rating: 4.3,
    calories: 160, isVeg: true, isBestseller: false, isNew: false,
    description: 'Refreshing Fanta Orange, ice cold and bubbly.',
    tags: ['Classic'],
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500&q=80',
    addOns: [],
  },
  // Desserts
  {
    id: 'ds1', categoryId: 'desserts', name: 'Lava Cake', price: 85, rating: 4.9,
    calories: 320, isVeg: true, isBestseller: true, isNew: false,
    description: 'Warm chocolate lava cake with a molten center.',
    tags: ['Veg', 'Bestseller'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80',
    addOns: [],
  },
  {
    id: 'ds2', categoryId: 'desserts', name: 'Vanilla Soft Serve', price: 39, rating: 4.6,
    calories: 150, isVeg: true, isBestseller: false, isNew: false,
    description: 'Creamy soft-serve vanilla ice cream in a crispy cone.',
    tags: ['Veg', 'Classic'],
    image: 'https://images.unsplash.com/photo-1516559228984-e7e5f42bcc23?w=500&q=80',
    addOns: [],
  },
  {
    id: 'ds3', categoryId: 'desserts', name: 'Chocolate Sundae', price: 65, rating: 4.4,
    calories: 240, isVeg: true, isBestseller: false, isNew: false,
    description: 'Creamy ice cream topped with rich chocolate fudge sauce.',
    tags: ['Veg'],
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80',
    addOns: [],
  },
  // Wraps
  {
    id: 'w1', categoryId: 'wraps', name: 'Chicken Tikka Wrap', price: 199, rating: 4.5,
    calories: 410, isVeg: false, isBestseller: true, isNew: false,
    description: 'Tikka-spiced grilled chicken, lettuce, onion, and tangy chutney in a soft wrap.',
    tags: ['Bestseller', 'Spicy'],
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80',
    addOns: [],
  },
  {
    id: 'w2', categoryId: 'wraps', name: 'Crispy Veggie Wrap', price: 159, rating: 4.3,
    calories: 350, isVeg: true, isBestseller: false, isNew: true,
    description: 'Crispy veggies, lettuce, and chipotle mayo wrapped in warm tortilla.',
    tags: ['Veg', 'New'],
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80',
    addOns: [],
  },
];

export const deals = [
  {
    id: 'deal1',
    title: 'Buy 1 Get 1 FREE',
    subtitle: 'On all Whopper meals',
    badge: 'App Only',
    color: '#F5A623',
    emoji: '🔥',
  },
  {
    id: 'deal2',
    title: '₹99 Meal Deal',
    subtitle: 'Burger + Fries + Drink',
    badge: 'Limited Time',
    color: '#D62300',
    emoji: '⚡',
  },
  {
    id: 'deal3',
    title: 'Crown Member Offer',
    subtitle: 'Extra 2x points today',
    badge: 'Members Only',
    color: '#1A1A2E',
    emoji: '👑',
  },
];

export const mockUser = {
  name: 'Rachel',
  crownPoints: 1240,
  tier: 'Gold',
  recentOrders: ['b1', 'f1', 'd1'],
};
