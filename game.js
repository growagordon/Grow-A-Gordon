import { auth, db } from './firebase-config.js';
import { plantEmojis, plantRarities } from './plants.js';
import { renderPlant, updateUserInfoUI } from './ui.js';

let currentUser = null;

// Funkcja ładowania roślin użytkownika
async function loadUserPlants() {
  const userDocRef = db.collection('users').doc(currentUser.uid);
  const doc = await userDocRef.get();
  const data = doc.data();

  if (!data) return;

  const { plants = [], coins = 0, name = "?" } = data;

  document.getElementById("plants-container").innerHTML = "";
  updateUserInfoUI(name, coins);

  plants.forEach((plant, index) => {
    const plantElement = renderPlant(plant, () => sellPlant(index));
    document.getElementById("plants-container").appendChild(plantElement);
  });
}

// Funkcja sprzedaży rośliny
async function sellPlant(index) {
  const userDocRef = db.collection('users').doc(currentUser.uid);
  const doc = await userDocRef.get();
  const data = doc.data();
  const plant = data.plants[index];

  const rarity = plantRarities[plant.name] || "common";
  const prices = {
    common: 10,
    rare: 25,
    event: 50,
    admin: 100,
    mythical: 250
  };

  const value = prices[rarity] || 5;
  data.coins += value;
  data.plants.splice(index, 1);

  await userDocRef.set(data);
  loadUserPlants();
}

// Sprawdź zalogowanie
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    loadUserPlants();
  } else {
    window.location.href = "login.html";
  }
});