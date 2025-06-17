// plants.js

const plantEmojis = {
  // Sweetfest
  "Candy Blossom": "🍭",
  "Sugarbud": "🍬",
  "Honeylure": "🍯",

  // Love Festival
  "Roseberry": "🌹",
  "Heartbloom": "💖",
  "Amora Petal": "💞",

  // Lunar Festival
  "Moon Mango": "🌕",
  "Dream Lotus": "🪷",

  // Luck Festival
  "Goldleaf Clover": "🍀",
  "Wishroot": "🌠",
  "Lucky Orchid": "🌸",

  // Harvest Haunt
  "Ember Vine": "🔥",
  "Spookleaf": "👻",

  // Winter’s Gift
  "Chillberry": "🔵",
  "Frostleaf Fern": "❄️",
  "Starlight Ivy": "✨",

  // Zwykłe
  "Carrot": "🥕",
  "Strawberry": "🍓",
  "Blueberry": "🫐",
  "Orange Tulip": "🌷",
  "Tomato": "🍅",
  "Daffodil": "🌼",
  "Corn": "🌽",
  "Pumpkin": "🎃",
  "Watermelon": "🍉",
  "Bamboo": "🎋",
  "Apple": "🍎",
  "Coconut": "🥥",
  "Cactus": "🌵",
  "Dragon Fruit": "🐉",
  "Mango": "🥭",
  "Mushroom": "🍄",
  "Grape": "🍇",
  "Pepper": "🌶️",
  "Cacao": "🍫",
  "Beanstalk": "🌱",
  "Ember Lily": "🌺",
  "Sugar Apple": "🍏",

  // Adminowe
  "Cocode": "🟤",
  "Ownerler": "💪",
  "Admingo": "🟠",

  // Specjalny Gordan
  "Gordan": "😎"
};

const plantRarities = {
  // Eventowe
  "Candy Blossom": "event",
  "Sugarbud": "event",
  "Honeylure": "event",
  "Roseberry": "event",
  "Heartbloom": "event",
  "Amora Petal": "event",
  "Moon Mango": "event",
  "Dream Lotus": "event",
  "Goldleaf Clover": "event",
  "Wishroot": "event",
  "Lucky Orchid": "event",
  "Ember Vine": "event",
  "Spookleaf": "event",
  "Chillberry": "event",
  "Frostleaf Fern": "event",
  "Starlight Ivy": "event",

  // Zwykłe
  "Carrot": "common",
  "Strawberry": "common",
  "Blueberry": "common",
  "Orange Tulip": "common",
  "Tomato": "common",
  "Daffodil": "common",
  "Corn": "common",
  "Pumpkin": "common",
  "Watermelon": "common",
  "Bamboo": "common",
  "Apple": "common",
  "Coconut": "common",
  "Cactus": "common",
  "Dragon Fruit": "rare",
  "Mango": "common",
  "Mushroom": "common",
  "Grape": "common",
  "Pepper": "common",
  "Cacao": "common",
  "Beanstalk": "rare",
  "Ember Lily": "rare",
  "Sugar Apple": "common",

  // Adminowe
  "Cocode": "admin",
  "Ownerler": "admin",
  "Admingo": "admin",

  // Specjalny Gordan
  "Gordan": "mythical"
};