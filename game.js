import { auth, db } from './firebase-config.js';
import { renderPlant, updateUserInfoUI } from './ui.js';
import { plantRarities, plantEmojis } from './plants.js';

let currentUser = null;
let userData = null;

async function loadUserData() {
  if (!currentUser) return;
  const userDocRef = db.collection('users').doc(currentUser.uid);
  const doc = await userDocRef.get();
  userData = doc.data() || { plants: [], coins: 0, name: "Nieznany", codeFlags: {} };
  updateUserInfoUI(userData.name, userData.coins);
  renderPlants();
  restockShop();
}

function renderPlants() {
  const container = document.getElementById('plants-container');
  container.innerHTML = '';

  if (!userData.plants || userData.plants.length === 0) {
    container.textContent = 'Brak roślin 😢';
    return;
  }

  userData.plants.forEach((plant, idx) => {
    const plantElement = renderPlant(plant, async () => {
      await sellPlant(idx);
    });
    container.appendChild(plantElement);
  });
}

async function sellPlant(index) {
  if (!userData || !userData.plants[index]) return;
  const plant = userData.plants[index];
  const rarity = plantRarities[plant.name] || 'common';

  const prices = {
    common: 10,
    rare: 25,
    event: 50,
    admin: 100,
    mythical: 250
  };
  const value = prices[rarity] || 5;

  userData.coins += value;
  userData.plants.splice(index, 1);
  await saveUserData();
  updateUserInfoUI(userData.name, userData.coins);
  renderPlants();
}

async function saveUserData() {
  const userDocRef = db.collection('users').doc(currentUser.uid);
  await userDocRef.set(userData);
}

async function redeemCode() {
  const codeInput = document.getElementById('codeInput');
  if (!codeInput) return;
  const code = codeInput.value.trim().toLowerCase();
  if (!code) return alert("Wpisz kod.");

  if (!userData.codeFlags) userData.codeFlags = {};

  switch(code) {
    case 'owneristhebestpeopleinentireworld':
      if (userData.codeFlags.ownerShopUnlocked) {
        alert('Kod już wykorzystany!');
      } else {
        userData.codeFlags.ownerShopUnlocked = true;
        alert('Odblokowano sklep właściciela!');
      }
      break;

    case 'start':
      for(let i=0; i<3; i++) {
        userData.plants.push({ name: "Carrot", age: 0 });
      }
      alert('Dodano 3 marchewki do twojego ogródka!');
      break;

    case 'cocodes':
      if (userData.codeFlags.cocodes) {
        alert('Kod już wykorzystany!');
      } else {
        userData.codeFlags.cocodes = true;
        alert('Zwiększono szansę pojawienia się roślin w sklepie o 10%!');
      }
      break;

    case 'admimangoes':
      if (userData.codeFlags.admimangoes) {
        alert('Kod już wykorzystany!');
      } else {
        userData.codeFlags.admimangoes = true;
        alert('Zwiększono szansę pojawienia się wszystkich roślin w sklepach do 75%!');
      }
      break;

    default:
      alert('Nieznany kod.');
      return;
  }

  await saveUserData();
  codeInput.value = '';
  await loadUserData();
}

function generateShopPlants() {
  const allPlantNames = Object.keys(plantEmojis);
  const shopPlants = [];

  const defaultChance = 0.5;
  const cocodesBonus = userData.codeFlags?.cocodes ? 0.10 : 0;
  const admimangoesBonus = userData.codeFlags?.admimangoes ? 0.75 : 0;

  const finalChance = Math.min(1, defaultChance + cocodesBonus + admimangoesBonus);

  allPlantNames.forEach(name => {
    if (Math.random() < finalChance) {
      shopPlants.push({ name, age: 0 });
    }
  });

  return shopPlants;
}

function renderShop(plants) {
  const shopDiv = document.getElementById('shop');
  shopDiv.innerHTML = '';