const restaurants = [
  {
    "img": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80",
    "name": "Spice Villa",
    "rating": 4.7,
    "food_type": "Punjabi",
    "price_for_two": 750,
    "location": "Navrangpura",
    "distance_km": 2.3,
    "offer": "20% Cashback",
    "serves_alcohol": false,
    "opening_time": "8:00",
    "closing_time": "18:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    "name": "Urban Tadka",
    "rating": 4.4,
    "food_type": "Fast Food",
    "price_for_two": 600,
    "location": "SG Highway",
    "distance_km": 1.4,
    "offer": "10% off",
    "serves_alcohol": false,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "name": "The Green Plate",
    "rating": 4.3,
    "food_type": "Cafe",
    "price_for_two": 600,
    "location": "Ellis Bridge",
    "distance_km": 2.8,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": false,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80",
    "name": "Royal Zaika",
    "rating": 4.0,
    "food_type": "Punjabi",
    "price_for_two": 750,
    "location": "Naranpura",
    "distance_km": 1.4,
    "offer": "10% off",
    "serves_alcohol": true,
    "opening_time": "12:00",
    "closing_time": "22:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1589308078058-918dc4b23f04?auto=format&fit=crop&w=600&q=80",
    "name": "Flavours of Gujarat",
    "rating": 4.4,
    "food_type": "South Indian",
    "price_for_two": 300,
    "location": "Paldi",
    "distance_km": 2.6,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": false,
    "opening_time": "10:00",
    "closing_time": "20:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    "name": "Caf\u00e9 Aroma",
    "rating": 4.9,
    "food_type": "Fast Food",
    "price_for_two": 900,
    "location": "Satellite",
    "distance_km": 1.8,
    "offer": "10% off",
    "serves_alcohol": false,
    "opening_time": "10:00",
    "closing_time": "20:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "name": "Masala Street",
    "rating": 4.8,
    "food_type": "Cafe",
    "price_for_two": 900,
    "location": "SG Highway",
    "distance_km": 2.5,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": false,
    "opening_time": "10:00",
    "closing_time": "20:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "name": "Food Garage",
    "rating": 3.9,
    "food_type": "Cafe",
    "price_for_two": 450,
    "location": "Navrangpura",
    "distance_km": 2.4,
    "offer": "Free Dessert",
    "serves_alcohol": true,
    "opening_time": "12:00",
    "closing_time": "22:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1589308078058-918dc4b23f04?auto=format&fit=crop&w=600&q=80",
    "name": "The Hungry Bowl",
    "rating": 3.6,
    "food_type": "South Indian",
    "price_for_two": 750,
    "location": "Ellis Bridge",
    "distance_km": 1.9,
    "offer": "No Offer",
    "serves_alcohol": true,
    "opening_time": "8:00",
    "closing_time": "18:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    "name": "Saffron Kitchen",
    "rating": 4.7,
    "food_type": "North Indian",
    "price_for_two": 1200,
    "location": "Satellite",
    "distance_km": 2.6,
    "offer": "Free Dessert",
    "serves_alcohol": true,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    "name": "Bite & Brew",
    "rating": 4.7,
    "food_type": "North Indian",
    "price_for_two": 750,
    "location": "Paldi",
    "distance_km": 1.2,
    "offer": "No Offer",
    "serves_alcohol": false,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1589308078058-918dc4b23f04?auto=format&fit=crop&w=600&q=80",
    "name": "The Grand Feast",
    "rating": 3.7,
    "food_type": "South Indian",
    "price_for_two": 450,
    "location": "Isanpur",
    "distance_km": 1.6,
    "offer": "No Offer",
    "serves_alcohol": true,
    "opening_time": "12:00",
    "closing_time": "22:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1604908177522-f0887b497b59?auto=format&fit=crop&w=600&q=80",
    "name": "Tandoori Flames",
    "rating": 4.0,
    "food_type": "Chinese",
    "price_for_two": 600,
    "location": "Vejalpur",
    "distance_km": 2.7,
    "offer": "No Offer",
    "serves_alcohol": true,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1601924582975-7aa6c4dbde8b?auto=format&fit=crop&w=600&q=80",
    "name": "The Veg House",
    "rating": 3.6,
    "food_type": "Mexican",
    "price_for_two": 450,
    "location": "Maninagar",
    "distance_km": 1.1,
    "offer": "20% Cashback",
    "serves_alcohol": true,
    "opening_time": "8:00",
    "closing_time": "18:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    "name": "Caf\u00e9 Blossom",
    "rating": 4.7,
    "food_type": "North Indian",
    "price_for_two": 600,
    "location": "SG Highway",
    "distance_km": 1.4,
    "offer": "10% off",
    "serves_alcohol": true,
    "opening_time": "12:00",
    "closing_time": "22:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1589308078058-918dc4b23f04?auto=format&fit=crop&w=600&q=80",
    "name": "Blue Salt Diner",
    "rating": 5.0,
    "food_type": "South Indian",
    "price_for_two": 900,
    "location": "Bopal",
    "distance_km": 2.2,
    "offer": "No Offer",
    "serves_alcohol": false,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "name": "Curry Palace",
    "rating": 4.7,
    "food_type": "Cafe",
    "price_for_two": 450,
    "location": "Satellite",
    "distance_km": 1.1,
    "offer": "20% Cashback",
    "serves_alcohol": false,
    "opening_time": "9:00",
    "closing_time": "19:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    "name": "The Table Yard",
    "rating": 4.9,
    "food_type": "North Indian",
    "price_for_two": 450,
    "location": "SG Highway",
    "distance_km": 2.4,
    "offer": "No Offer",
    "serves_alcohol": false,
    "opening_time": "10:00",
    "closing_time": "20:00"
  },
  
  {
    "img": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "name": "Fork & Spoon",
    "rating": 4.3,
    "food_type": "Cafe",
    "price_for_two": 300,
    "location": "Vejalpur",
    "distance_km": 1.2,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": false,
    "opening_time": "9:00",
    "closing_time": "19:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    "name": "Taste Town",
    "rating": 4.5,
    "food_type": "North Indian",
    "price_for_two": 450,
    "location": "Maninagar",
    "distance_km": 2.0,
    "offer": "No Offer",
    "serves_alcohol": false,
    "opening_time": "10:00",
    "closing_time": "20:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1604908177522-f0887b497b59?auto=format&fit=crop&w=600&q=80",
    "name": "Nukkad Adda",
    "rating": 4.2,
    "food_type": "Chinese",
    "price_for_two": 900,
    "location": "Maninagar",
    "distance_km": 2.4,
    "offer": "Free Dessert",
    "serves_alcohol": true,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1601924582975-7aa6c4dbde8b?auto=format&fit=crop&w=600&q=80",
    "name": "Mirch Masala",
    "rating": 3.7,
    "food_type": "Mexican",
    "price_for_two": 1200,
    "location": "Vastrapur",
    "distance_km": 1.8,
    "offer": "10% off",
    "serves_alcohol": false,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    "name": "The Great Thali",
    "rating": 4.7,
    "food_type": "North Indian",
    "price_for_two": 900,
    "location": "Paldi",
    "distance_km": 2.3,
    "offer": "20% Cashback",
    "serves_alcohol": false,
    "opening_time": "9:00",
    "closing_time": "19:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1589308078058-918dc4b23f04?auto=format&fit=crop&w=600&q=80",
    "name": "Chatkara Junction",
    "rating": 4.0,
    "food_type": "South Indian",
    "price_for_two": 1200,
    "location": "Bopal",
    "distance_km": 3.0,
    "offer": "No Offer",
    "serves_alcohol": true,
    "opening_time": "12:00",
    "closing_time": "22:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    "name": "Bawarchi Tales",
    "rating": 4.5,
    "food_type": "North Indian",
    "price_for_two": 900,
    "location": "Chandkheda",
    "distance_km": 2.1,
    "offer": "10% off",
    "serves_alcohol": true,
    "opening_time": "10:00",
    "closing_time": "20:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1547592166-23ac45744ffd?auto=format&fit=crop&w=600&q=80",
    "name": "Street King",
    "rating": 4.9,
    "food_type": "Italian",
    "price_for_two": 600,
    "location": "Maninagar",
    "distance_km": 1.3,
    "offer": "Free Dessert",
    "serves_alcohol": true,
    "opening_time": "12:00",
    "closing_time": "22:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1547592166-23ac45744ffd?auto=format&fit=crop&w=600&q=80",
    "name": "Dine Divine",
    "rating": 4.3,
    "food_type": "Italian",
    "price_for_two": 900,
    "location": "Vejalpur",
    "distance_km": 1.1,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": false,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "name": "Garam Masala Hub",
    "rating": 4.8,
    "food_type": "Cafe",
    "price_for_two": 450,
    "location": "Vastrapur",
    "distance_km": 1.6,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": false,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1589308078058-918dc4b23f04?auto=format&fit=crop&w=600&q=80",
    "name": "Zaika Gully",
    "rating": 3.7,
    "food_type": "South Indian",
    "price_for_two": 900,
    "location": "Paldi",
    "distance_km": 1.7,
    "offer": "20% Cashback",
    "serves_alcohol": false,
    "opening_time": "9:00",
    "closing_time": "19:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1604908177522-f0887b497b59?auto=format&fit=crop&w=600&q=80",
    "name": "Caf\u00e9 Delight",
    "rating": 3.7,
    "food_type": "Chinese",
    "price_for_two": 300,
    "location": "Isanpur",
    "distance_km": 2.9,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": false,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1604908177522-f0887b497b59?auto=format&fit=crop&w=600&q=80",
    "name": "Bhookha Sher",
    "rating": 4.5,
    "food_type": "Chinese",
    "price_for_two": 1200,
    "location": "Naranpura",
    "distance_km": 1.5,
    "offer": "20% Cashback",
    "serves_alcohol": false,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1601924582975-7aa6c4dbde8b?auto=format&fit=crop&w=600&q=80",
    "name": "Happy Stomach",
    "rating": 4.2,
    "food_type": "Mexican",
    "price_for_two": 1200,
    "location": "Navrangpura",
    "distance_km": 1.4,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": true,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1589308078058-918dc4b23f04?auto=format&fit=crop&w=600&q=80",
    "name": "Khana Khazana",
    "rating": 3.9,
    "food_type": "South Indian",
    "price_for_two": 750,
    "location": "Bopal",
    "distance_km": 1.8,
    "offer": "20% Cashback",
    "serves_alcohol": false,
    "opening_time": "12:00",
    "closing_time": "22:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    "name": "La Pinoz Bistro",
    "rating": 3.9,
    "food_type": "Fast Food",
    "price_for_two": 300,
    "location": "Isanpur",
    "distance_km": 1.1,
    "offer": "No Offer",
    "serves_alcohol": false,
    "opening_time": "10:00",
    "closing_time": "20:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1547592166-23ac45744ffd?auto=format&fit=crop&w=600&q=80",
    "name": "Swad Sagar",
    "rating": 4.8,
    "food_type": "Italian",
    "price_for_two": 600,
    "location": "Naranpura",
    "distance_km": 2.1,
    "offer": "20% Cashback",
    "serves_alcohol": true,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1604908177522-f0887b497b59?auto=format&fit=crop&w=600&q=80",
    "name": "The Desi Pot",
    "rating": 4.5,
    "food_type": "Chinese",
    "price_for_two": 1200,
    "location": "Navrangpura",
    "distance_km": 2.9,
    "offer": "10% off",
    "serves_alcohol": false,
    "opening_time": "8:00",
    "closing_time": "18:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    "name": "Zesty Spoon",
    "rating": 4.9,
    "food_type": "North Indian",
    "price_for_two": 750,
    "location": "Vastrapur",
    "distance_km": 1.4,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": true,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1547592166-23ac45744ffd?auto=format&fit=crop&w=600&q=80",
    "name": "Mehfil E Zaika",
    "rating": 3.8,
    "food_type": "Italian",
    "price_for_two": 300,
    "location": "Vastrapur",
    "distance_km": 2.1,
    "offer": "Free Dessert",
    "serves_alcohol": false,
    "opening_time": "12:00",
    "closing_time": "22:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1604908177522-f0887b497b59?auto=format&fit=crop&w=600&q=80",
    "name": "Urban Rasoi",
    "rating": 3.8,
    "food_type": "Chinese",
    "price_for_two": 750,
    "location": "Vastrapur",
    "distance_km": 2.3,
    "offer": "20% Cashback",
    "serves_alcohol": false,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1601924582975-7aa6c4dbde8b?auto=format&fit=crop&w=600&q=80",
    "name": "Flame & Fry",
    "rating": 4.0,
    "food_type": "Mexican",
    "price_for_two": 900,
    "location": "Naranpura",
    "distance_km": 2.4,
    "offer": "20% Cashback",
    "serves_alcohol": false,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80",
    "name": "Rolling Feast",
    "rating": 4.9,
    "food_type": "Punjabi",
    "price_for_two": 450,
    "location": "Navrangpura",
    "distance_km": 1.3,
    "offer": "No Offer",
    "serves_alcohol": true,
    "opening_time": "10:00",
    "closing_time": "20:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "name": "Kitchen Stories",
    "rating": 4.6,
    "food_type": "Cafe",
    "price_for_two": 600,
    "location": "Ellis Bridge",
    "distance_km": 2.8,
    "offer": "10% off",
    "serves_alcohol": true,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80",
    "name": "The Taste Hub",
    "rating": 4.7,
    "food_type": "Punjabi",
    "price_for_two": 600,
    "location": "Bopal",
    "distance_km": 3.0,
    "offer": "20% Cashback",
    "serves_alcohol": false,
    "opening_time": "10:00",
    "closing_time": "20:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "name": "Food Lounge",
    "rating": 4.6,
    "food_type": "Cafe",
    "price_for_two": 750,
    "location": "Chandkheda",
    "distance_km": 2.5,
    "offer": "20% Cashback",
    "serves_alcohol": true,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "name": "Nawab\u2019s Kitchen",
    "rating": 4.5,
    "food_type": "Cafe",
    "price_for_two": 450,
    "location": "SG Highway",
    "distance_km": 2.7,
    "offer": "20% Cashback",
    "serves_alcohol": true,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80",
    "name": "Caf\u00e9 Leaf",
    "rating": 5.0,
    "food_type": "Punjabi",
    "price_for_two": 1200,
    "location": "Satellite",
    "distance_km": 1.1,
    "offer": "10% off",
    "serves_alcohol": false,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80",
    "name": "Bistro Yard",
    "rating": 3.8,
    "food_type": "Punjabi",
    "price_for_two": 300,
    "location": "Maninagar",
    "distance_km": 1.2,
    "offer": "No Offer",
    "serves_alcohol": false,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1601924582975-7aa6c4dbde8b?auto=format&fit=crop&w=600&q=80",
    "name": "Hunger Tales",
    "rating": 4.1,
    "food_type": "Mexican",
    "price_for_two": 900,
    "location": "Isanpur",
    "distance_km": 2.1,
    "offer": "No Offer",
    "serves_alcohol": true,
    "opening_time": "13:00",
    "closing_time": "23:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    "name": "Sizzling Tava",
    "rating": 3.6,
    "food_type": "North Indian",
    "price_for_two": 600,
    "location": "Maninagar",
    "distance_km": 1.7,
    "offer": "Buy 1 Get 1",
    "serves_alcohol": false,
    "opening_time": "11:00",
    "closing_time": "21:00"
  },
  {
    "img": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    "name": "The Curry Craft",
    "rating": 3.2,
    "food_type": "Fast Food",
    "price_for_two": 900,
    "location": "Navrangpura",
    "distance_km": 1.5,
    "offer": "10% off",
    "serves_alcohol": true,
    "opening_time": "9:00",
    "closing_time": "19:00"
  },
  {
    "img": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
    "name": "The Grand Pavilion",
    "rating": 4.5,
    "food_type": "North Indian, Chinese, Continental",
    "price_for_two": 1200,
    "location": "CG Road",
    "distance": 2.3,
    "offers_and_deals": "50% off ",
    "serves_alcohol": true,
    "opening_time": 12,
    "closing_time": 22
  },
  {
    "img": "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800",
    "name": "Spice Garden Restaurant",
    "rating": 4.2,
    "food_type": "Gujarati Thali, South Indian",
    "price_for_two": 800,
    "location": "Satellite",
    "distance": 1.7,
    "offers_and_deals": "20% off",
    "serves_alcohol": false,
    "opening_time": 11,
    "closing_time": 21
  }
];

const restaurantImages = [
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3298042/pexels-photo-3298042.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3297882/pexels-photo-3297882.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3297882/pexels-photo-3297882.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3298042/pexels-photo-3298042.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=800"
];

// Copy image URLs from `restaurantImages` into each restaurant object's `img` property
// so every restaurant has a fixed image. We assign by index so the mapping is stable
// even when the list is filtered or re-ordered.
restaurants.forEach((r, i) => {
  r.img = restaurantImages[i % restaurantImages.length];
});

// keep a copy of the original restaurants order so we can always restore it
const originalRestaurantsOrder = restaurants.slice();





const root = document.querySelector('.root');

// create a card element for one restaurant
function createCard(rest, imgSrc, idx){
  const card = document.createElement('div');
  card.id = 'card';

  // attach index so click handler can find the restaurant
  card.dataset.idx = String(idx);

  const images = document.createElement('img');
  images.src = imgSrc;

  const rest_details = document.createElement('div');
  rest_details.id = 'details';

  const first = document.createElement('div'); first.id = 'first';
  const second = document.createElement('div'); second.id = 'second';
  const third = document.createElement('div'); third.id = 'third';

  const rest_name = document.createElement('div'); rest_name.id = 'rest_name'; rest_name.textContent = rest.name;
  const rate = document.createElement('div'); rate.id = 'rate'; rate.textContent = rest.rating + '★';
  first.appendChild(rest_name); first.appendChild(rate);

  const food_detail = document.createElement('div'); food_detail.id = 'food_detail'; food_detail.textContent = rest.food_type;
  const price = document.createElement('div'); price.id = 'price'; price.textContent = '₹' + rest.price_for_two + ' For Two';
  second.appendChild(food_detail); second.appendChild(price);

  const locat = document.createElement('div'); locat.id = 'location_of_rest'; locat.textContent = '⚲ ' + rest.location;
  const dist = document.createElement('div'); dist.id = 'distance_of_rest'; dist.textContent = rest.distance_km + 'Km';
  third.appendChild(locat); third.appendChild(dist);

  rest_details.appendChild(first); rest_details.appendChild(second); rest_details.appendChild(third);
  card.appendChild(images); card.appendChild(rest_details);
  // open expanded view when clicked
  card.addEventListener('click', (e)=>{
    // prevent clicks from any inner interactive elements triggering multiple times
    openExpandedCard(rest);
  });

  return card;
}

// render list into .root
function renderRestaurants(list){
  root.innerHTML = '';
  list.forEach((rest, idx) => {
    // use the restaurant's own img so filtering doesn't re-map images by index
    root.appendChild(createCard(rest, rest.img, idx));
  });
}

// initial render (use original order)
renderRestaurants(originalRestaurantsOrder);

// ---------- Filter & sort functionality ----------
// (Filters label/button removed from HTML; price sort buttons are permanent)
// const filtersBtn = document.getElementById('filters');
const dealsBtn = document.getElementById('deals');
const ratingBtn = document.getElementById('Good_rest');
const wineBtn = document.getElementById('Wine');
const servingBtn = document.getElementById('Serving');

// Inject a small CSS rule for active filter buttons to mimic :hover appearance
const styleEl = document.createElement('style');
styleEl.textContent = `
  .filter-active {
    /* background will be driven by --hover-bg which we try to compute below; fallback used */
    background: var(--hover-bg, #e0e0e0) !important;
    color: var(--hover-color, inherit) !important;
  }
`;
document.head.appendChild(styleEl);

// Active filters tracking
const activeFilters = {
  deals: false,
  rating4: false,
  wine: false,
  serving: false // mapped to 'Open Now' or other semantics depending on dataset
};

// active sort: null | 'low' | 'high'
let activeSort = null;

// helper: try to find a :hover rule that applies to `el` and return its background-color
function findHoverBackgroundForElement(el){
  try{
    for(const sheet of Array.from(document.styleSheets)){
      let rules;
      try{ rules = sheet.cssRules; } catch(e){ continue; }
      for(const rule of Array.from(rules)){
        if(rule.type === CSSRule.STYLE_RULE && rule.selectorText && rule.selectorText.includes(':hover')){
          const baseSelector = rule.selectorText.replace(/:hover/g,'').trim();
          try{
            const matches = document.querySelectorAll(baseSelector);
            if(Array.from(matches).includes(el)){
              const bg = rule.style.backgroundColor || rule.style.background;
              if(bg) return bg;
            }
          }catch(e){ /* ignore invalid selectors */ }
        }
      }
    }
  }catch(e){ /* ignore */ }
  return null;
}

// apply active filters to originalRestaurantsOrder and render result
function applyFilters(){
  let filtered = originalRestaurantsOrder.slice();

  if(activeFilters.deals){
    filtered = filtered.filter(r => {
      const offer = (r.offer || r.offers_and_deals || '').toString();
      return offer && offer.trim() !== '' && offer.toLowerCase() !== 'no offer';
    });
  }

  if(activeFilters.rating4){
    filtered = filtered.filter(r => Number(r.rating) >= 4);
  }

  if(activeFilters.wine){
    filtered = filtered.filter(r => r.serves_alcohol === true);
  }

  if(activeFilters.serving){
    // Interpret 'Serving' as 'Open Now' (best-effort): show restaurants where current time between opening and closing
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    filtered = filtered.filter(r => {
      try{
        const ot = r.opening_time;
        const ct = r.closing_time;
        let openMin, closeMin;
        if(typeof ot === 'number') openMin = ot * 60; else openMin = timeStrToMinutes(String(ot));
        if(typeof ct === 'number') closeMin = ct * 60; else closeMin = timeStrToMinutes(String(ct));
        // simple same-day check
        return nowMinutes >= openMin && nowMinutes <= closeMin;
      }catch(e){ return false; }
    });
  }

  // apply active sort if any (maintain current filtered order, then sort by price)
  if(activeSort === 'low'){
    filtered = filtered.slice().sort((a,b)=> (a.price_for_two||0) - (b.price_for_two||0));
  } else if(activeSort === 'high'){
    filtered = filtered.slice().sort((a,b)=> (b.price_for_two||0) - (a.price_for_two||0));
  }

  renderRestaurants(filtered);
}

// toggle helper for a button and filter key
function attachToggle(button, filterKey){
  if(!button) return;
  button.addEventListener('click', () => {
    const isActive = activeFilters[filterKey];
    if(!isActive){
      // activate
      const hoverBg = findHoverBackgroundForElement(button);
      if(hoverBg) button.style.setProperty('--hover-bg', hoverBg);
      button.classList.add('filter-active');
      activeFilters[filterKey] = true;
    } else {
      // deactivate
      button.classList.remove('filter-active');
      button.style.removeProperty('--hover-bg');
      activeFilters[filterKey] = false;
    }
    // re-apply filters and render
    applyFilters();
  });
}

// helper: show sort controls (two buttons) next to Filters button
function toggleSortControls(){
  let controls = document.getElementById('sortControls');
  if(controls){
    controls.remove();
    return;
  }
  controls = document.createElement('div');
  controls.id = 'sortControls';
  controls.style.display = 'flex';
  controls.style.gap = '8px';
  controls.style.marginLeft = '8px';

  const lowBtn = document.createElement('button');
  lowBtn.textContent = 'Price: Low → High';
  lowBtn.id = 'priceLow';
  lowBtn.className = 'small-filter';

  const highBtn = document.createElement('button');
  highBtn.textContent = 'Price: High → Low';
  highBtn.id = 'priceHigh';
  highBtn.className = 'small-filter';

  lowBtn.addEventListener('click', () => {
    const sorted = [...restaurants].sort((a,b)=> a.price_for_two - b.price_for_two);
    renderRestaurants(sorted);
    controls.remove();
  });

  highBtn.addEventListener('click', () => {
    const sorted = [...restaurants].sort((a,b)=> b.price_for_two - a.price_for_two);
    renderRestaurants(sorted);
    controls.remove();
  });

  controls.appendChild(lowBtn);
  controls.appendChild(highBtn);
}

// wire up filter toggle behavior to buttons (click toggles filter + appearance)
attachToggle(dealsBtn, 'deals');
attachToggle(ratingBtn, 'rating4');
attachToggle(wineBtn, 'wine');
attachToggle(servingBtn, 'serving');

// price sort buttons (permanent in the header) - toggle behavior
const priceLowBtn = document.getElementById('priceLow');
const priceHighBtn = document.getElementById('priceHigh');

function attachSortToggle(button, sortKey){
  if(!button) return;
  button.addEventListener('click', ()=>{
    if(activeSort === sortKey){
      // deactivate
      activeSort = null;
      button.classList.remove('filter-active');
      button.style.removeProperty('--hover-bg');
    } else {
      // activate this sort and deactivate the other
      activeSort = sortKey;
      const hoverBg = findHoverBackgroundForElement(button);
      if(hoverBg) button.style.setProperty('--hover-bg', hoverBg);
      button.classList.add('filter-active');
      if(sortKey === 'low' && priceHighBtn){ priceHighBtn.classList.remove('filter-active'); priceHighBtn.style.removeProperty('--hover-bg'); }
      if(sortKey === 'high' && priceLowBtn){ priceLowBtn.classList.remove('filter-active'); priceLowBtn.style.removeProperty('--hover-bg'); }
    }
    applyFilters();
  });
}

attachSortToggle(priceLowBtn, 'low');
attachSortToggle(priceHighBtn, 'high');

// Open Now: check current time is between opening_time and closing_time (simple check, same day)
function timeStrToMinutes(t){
  if(!t) return 0;
  const [h,m] = t.split(':').map(x=>parseInt(x,10));
  return h*60 + (isNaN(m) ? 0 : m);
}

// (Serving button uses toggle behavior attached earlier; no separate click handler needed)

// Clear all active filters and restore original order + button styles
function clearAllFilters(){
  Object.keys(activeFilters).forEach(k => activeFilters[k] = false);
  [dealsBtn, ratingBtn, wineBtn, servingBtn].forEach(btn => {
    if(!btn) return;
    btn.classList.remove('filter-active');
    btn.style.removeProperty('--hover-bg');
  });
  // clear sort state as well
  activeSort = null;
  if(priceLowBtn){ priceLowBtn.classList.remove('filter-active'); priceLowBtn.style.removeProperty('--hover-bg'); }
  if(priceHighBtn){ priceHighBtn.classList.remove('filter-active'); priceHighBtn.style.removeProperty('--hover-bg'); }
  renderRestaurants(originalRestaurantsOrder);
}

// double-click any filter button to clear all filters (optional convenience)
[dealsBtn, ratingBtn, wineBtn, servingBtn, priceLowBtn, priceHighBtn].forEach(btn => {
  if(!btn) return;
  btn.addEventListener('dblclick', clearAllFilters);
});


  // Theme toggle logic: persists choice and applies on load
  (function(){
    const KEY = 'site-theme';
    const btn = document.getElementById('themeToggle');
    const html = document.documentElement;

    function applyTheme(theme){
      if(theme === 'dark'){
        html.setAttribute('data-theme','dark');
        try{ document.body.setAttribute('data-theme','dark'); }catch(e){}
        if(btn) btn.textContent = '☀️';
        if(btn) btn.setAttribute('aria-pressed','true');
        console.log('Theme applied: dark');
      } else {
        html.removeAttribute('data-theme');
        try{ document.body.removeAttribute('data-theme'); }catch(e){}
        if(btn) btn.textContent = '🌙';
        if(btn) btn.setAttribute('aria-pressed','false');
        console.log('Theme applied: light');
      }
    }

    // Determine initial theme: saved value -> prefers-color-scheme -> light
    try{
      const saved = localStorage.getItem(KEY);
      if(saved){
        applyTheme(saved);
      } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        applyTheme('dark');
      } else {
        applyTheme('light');
      }
    }catch(e){
      // ignore storage errors
    }

    if(!btn) return;

    btn.addEventListener('click', () => {
      const cur = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try{ localStorage.setItem(KEY, next); }catch(e){}
    });

  })();


  // ---------- Expanded card / modal functionality ----------
  const extraDetailsPool = [
    'Chef special recommendation: try the signature spice platter with house chutneys.',
    'Family-friendly seating and free highchairs available on request.',
    'Live music on weekends from 7pm to 10pm.',
    'Wheelchair accessible entrance and restroom facilities.',
    'Sourcing locally-grown produce and seasonal ingredients.',
    'Private dining and event catering available — contact the manager.',
    'Popular for quick lunches and business meetings.',
    '100% vegetarian options clearly labeled on the menu.',
    'Outdoor seating with a small garden view.',
    'Pet-friendly patio during daytime hours.'
  ];

  function pickRandomDetails(n = 2){
    const copy = extraDetailsPool.slice();
    const out = [];
    for(let i=0;i<n && copy.length;i++){
      const idx = Math.floor(Math.random()*copy.length);
      out.push(copy.splice(idx,1)[0]);
    }
    return out;
  }

  function isOpenNow(r){
    try{
      const now = new Date();
      const nowMin = now.getHours()*60 + now.getMinutes();
      const ot = r.opening_time;
      const ct = r.closing_time;
      let openMin = (typeof ot === 'number') ? ot*60 : timeStrToMinutes(String(ot));
      let closeMin = (typeof ct === 'number') ? ct*60 : timeStrToMinutes(String(ct));
      // if closeMin < openMin assume closes next day (handle simple case)
      if(closeMin < openMin){
        return nowMin >= openMin || nowMin <= closeMin;
      }
      return nowMin >= openMin && nowMin <= closeMin;
    }catch(e){ return false; }
  }

  function openExpandedCard(rest){
    // prevent multiple overlays
    if(document.getElementById('expandedOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'expandedOverlay';
    overlay.className = 'expanded-overlay';

    const card = document.createElement('div');
    card.className = 'expanded-card';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'expanded-close';
    closeBtn.setAttribute('aria-label','Close details');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', closeExpandedCard);

    // Image
    const img = document.createElement('img');
    img.className = 'expanded-img';
    img.src = rest.img;
    img.alt = rest.name;

    // Content area
    const content = document.createElement('div');
    content.className = 'expanded-content';

    const titleRow = document.createElement('div');
    titleRow.className = 'expanded-titleRow';
    const nameEl = document.createElement('h2'); nameEl.textContent = rest.name;
    titleRow.appendChild(nameEl);
    // place rating under the name (left-aligned) to avoid overlap with the close button
    const rateEl = document.createElement('div'); rateEl.className = 'expanded-rate'; rateEl.textContent = rest.rating + ' ★';
    const rateRow = document.createElement('div'); rateRow.className = 'expanded-rateRow';
    rateRow.appendChild(rateEl);

    const metaRow = document.createElement('div'); metaRow.className = 'expanded-meta';
    const openNow = isOpenNow(rest);
    const openEl = document.createElement('div'); openEl.className = 'expanded-open'; openEl.textContent = openNow ? 'Open Now' : 'Closed';
    const alcoholEl = document.createElement('div'); alcoholEl.className = 'expanded-alcohol'; alcoholEl.textContent = rest.serves_alcohol ? 'Serves Alcohol' : 'No Alcohol';
    const locEl = document.createElement('div'); locEl.className = 'expanded-location'; locEl.textContent = '📍 ' + (rest.location || 'Unknown');
    const offerEl = document.createElement('div'); offerEl.className = 'expanded-offer'; offerEl.textContent = rest.offer || rest.offers_and_deals || 'No Offer';
    metaRow.appendChild(openEl); metaRow.appendChild(alcoholEl); metaRow.appendChild(locEl); metaRow.appendChild(offerEl);

    const foodType = document.createElement('div'); foodType.className = 'expanded-foodType'; foodType.textContent = 'Cuisine: ' + (rest.food_type || 'Various');

    // Menu (generate a few items based on food type)
    const menu = document.createElement('div'); menu.className = 'expanded-menu';
    const menuTitle = document.createElement('h4'); menuTitle.textContent = 'Sample Menu';
    const menuList = document.createElement('ul'); menuList.className = 'expanded-menu-list';
    const sampleItems = generateMenuItems(rest.food_type);
    sampleItems.forEach(it => {
      const li = document.createElement('li'); li.textContent = it; menuList.appendChild(li);
    });
    menu.appendChild(menuTitle); menu.appendChild(menuList);

    // Random extra details
    const details = document.createElement('div'); details.className = 'expanded-details';
    const picks = pickRandomDetails(3);
    picks.forEach(p => {
      const pEl = document.createElement('p'); pEl.textContent = p; details.appendChild(pEl);
    });

    content.appendChild(titleRow);
    content.appendChild(rateRow);
    content.appendChild(metaRow);
    content.appendChild(foodType);
    content.appendChild(menu);
    content.appendChild(details);

    card.appendChild(closeBtn);
    card.appendChild(img);
    card.appendChild(content);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // lock scrolling
    document.body.style.overflow = 'hidden';

    // append then trigger opening animation
    // use requestAnimationFrame so CSS transition runs
    requestAnimationFrame(()=>{
      overlay.classList.add('open');
      card.classList.add('open');
    });

    // close when clicking on overlay background
    overlay.addEventListener('click', (ev)=>{
      if(ev.target === overlay) closeExpandedCard();
    });

    // close on Escape
    function escHandler(e){ if(e.key === 'Escape') closeExpandedCard(); }
    document.addEventListener('keydown', escHandler);

    // store ref so close can remove listener
    overlay._escHandler = escHandler;
  }

  function closeExpandedCard(){
    const overlay = document.getElementById('expandedOverlay');
    if(!overlay) return;
    // remove Escape listener if stored
    if(overlay._escHandler) document.removeEventListener('keydown', overlay._escHandler);

    const card = overlay.querySelector('.expanded-card');
    if(card){
      // trigger closing animation
      card.classList.remove('open');
      card.classList.add('closing');
    }
    overlay.classList.remove('open');

    // wait for transition to finish before removing from DOM
    const onTransitionEnd = (ev)=>{
      // only handle when the overlay's opacity transition ends or card's transform ends
      if(ev.target === overlay || ev.target === card){
        overlay.removeEventListener('transitionend', onTransitionEnd);
        if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.body.style.overflow = ''; // restore
      }
    };
    // listen on both overlay and card to be safe
    overlay.addEventListener('transitionend', onTransitionEnd);
    if(card) card.addEventListener('transitionend', onTransitionEnd);
  }

  function generateMenuItems(foodType){
    // simple small menu generation by cuisine keywords
    const lower = (foodType||'').toLowerCase();
    const base = [];
    if(lower.includes('north') || lower.includes('punjabi') || lower.includes('thali')){
      base.push('Tandoori Roti', 'Paneer Butter Masala', 'Dal Makhani', 'Jeera Rice');
    } else if(lower.includes('south')){
      base.push('Masala Dosa', 'Idli Sambhar', 'Coconut Chutney', 'Filter Coffee');
    } else if(lower.includes('chinese')){
      base.push('Vegetable Manchurian', 'Fried Rice', 'Chilli Paneer', 'Hot & Sour Soup');
    } else if(lower.includes('italian')){
      base.push('Margherita Pizza', 'Pasta Alfredo', 'Garlic Bread', 'Tiramisu');
    } else if(lower.includes('mexican')){
      base.push('Tacos', 'Burrito Bowl', 'Nachos', 'Quesadilla');
    } else if(lower.includes('fast')){
      base.push('Cheese Burger', 'Fries', 'Fried Chicken', 'Milkshake');
    } else if(lower.includes('cafe')){
      base.push('Cappuccino', 'Club Sandwich', 'Caesar Salad', 'Brownie');
    } else {
      base.push('Chef Special', 'Seasonal Salad', 'House Curry', 'Rice Bowl');
    }
    // return 4 items
    return base.slice(0,4);
  }

  // ---------- Authentication (Login / Signup) popups ----------
  function createAuthModal(type = 'login'){
    // type: 'login' or 'signup'
    const overlay = document.createElement('div');
    overlay.className = 'auth-overlay';
    overlay.id = 'authOverlay';

    const modal = document.createElement('div'); modal.className = 'auth-modal';

    const header = document.createElement('div'); header.className = 'auth-header';
    const title = document.createElement('h3'); title.textContent = (type === 'login') ? 'Log In' : 'Sign Up';
    const closeBtn = document.createElement('button'); closeBtn.className = 'auth-close'; closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', ()=>{ closeAuthModal(); });
    header.appendChild(title); header.appendChild(closeBtn);

    const form = document.createElement('form'); form.className = 'auth-form'; form.setAttribute('novalidate','');

    // username/email
    const lblUser = document.createElement('label'); lblUser.textContent = (type === 'login') ? 'Username or Email' : 'Choose a Username';
    const inpUser = document.createElement('input'); inpUser.type = 'text'; inpUser.name = 'username'; inpUser.required = true;

    // password
    const lblPass = document.createElement('label'); lblPass.textContent = 'Password';
    const inpPass = document.createElement('input'); inpPass.type = 'password'; inpPass.name = 'password'; inpPass.required = true;

    form.appendChild(lblUser); form.appendChild(inpUser);
    form.appendChild(lblPass); form.appendChild(inpPass);

    if(type === 'signup'){
      const lblConfirm = document.createElement('label'); lblConfirm.textContent = 'Confirm Password';
      const inpConfirm = document.createElement('input'); inpConfirm.type = 'password'; inpConfirm.name = 'confirm'; inpConfirm.required = true;
      form.appendChild(lblConfirm); form.appendChild(inpConfirm);
    }

    const actions = document.createElement('div'); actions.className = 'auth-actions';
    const submitBtn = document.createElement('button'); submitBtn.type = 'submit'; submitBtn.textContent = (type === 'login') ? 'Log In' : 'Create Account';
    const switchBtn = document.createElement('button'); switchBtn.type = 'button'; switchBtn.className = 'auth-switch'; switchBtn.textContent = (type === 'login') ? 'Sign Up' : 'Log In';
    actions.appendChild(submitBtn); actions.appendChild(switchBtn);

    form.appendChild(actions);

    // small submission handler (no backend) — just validate and pretend to login/signup
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const u = inpUser.value.trim();
      const p = inpPass.value;
      if(!u || !p){
        alert('Please fill in username and password');
        return;
      }
      if(type === 'signup'){
        const conf = form.querySelector('input[name="confirm"]').value;
        if(p !== conf){ alert('Passwords do not match'); return; }
        // fake signup success
        alert('Account created for ' + u + '. You are now logged in.');
      } else {
        // fake login success
        alert('Welcome back, ' + u + '!');
      }
      closeAuthModal();
    });

    switchBtn.addEventListener('click', ()=>{
      closeAuthModal();
      // open the other modal
      openAuthModal(type === 'login' ? 'signup' : 'login');
    });

    modal.appendChild(header); modal.appendChild(form); overlay.appendChild(modal);

    // close on background click
    overlay.addEventListener('click', (ev)=>{ if(ev.target === overlay) closeAuthModal(); });

    // Esc to close
    function esc(e){ if(e.key === 'Escape') closeAuthModal(); }
    overlay._esc = esc;
    document.addEventListener('keydown', esc);

    return overlay;
  }

  function openAuthModal(type='login'){
      if(document.getElementById('authOverlay')) return;
      const overlay = createAuthModal(type);
      document.body.appendChild(overlay);
      // prevent background scroll while modal is open
      document.body.style.overflow = 'hidden';
      // animate open: add classes after append so transitions run
      const modal = overlay.querySelector('.auth-modal');
      requestAnimationFrame(()=>{
        overlay.classList.add('open');
        if(modal) modal.classList.add('open');
      });
  }

  function closeAuthModal(){
      const overlay = document.getElementById('authOverlay');
      if(!overlay) return;
      if(overlay._esc) document.removeEventListener('keydown', overlay._esc);

      const modal = overlay.querySelector('.auth-modal');
      // trigger closing animation
      if(modal){
        modal.classList.remove('open');
        modal.classList.add('closing');
      }
      overlay.classList.remove('open');

      // cleanup after transitions finish
      const onEnd = (ev) => {
        // ensure we remove only once
        if(ev.target !== overlay && ev.target !== modal) return;
        overlay.removeEventListener('transitionend', onEnd);
        if(modal) modal.removeEventListener('transitionend', onEnd);
        if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.body.style.overflow = '';
      };
      overlay.addEventListener('transitionend', onEnd);
      if(modal) modal.addEventListener('transitionend', onEnd);
  }

  // wire header buttons (they exist in index.html with ids)
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  if(loginBtn) loginBtn.addEventListener('click', ()=> openAuthModal('login'));
  if(signupBtn) signupBtn.addEventListener('click', ()=> openAuthModal('signup'));
