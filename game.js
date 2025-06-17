// game.js
import { auth, db } from './firebase-config.js';
import { renderPlant, updateUserInfoUI } from './ui.js';
import { plantRarities } from './plants.js';

let currentUser = null;

async function loadUserPlants() {
  const userDocRef = db.collection('users').doc(currentUser.uid);
  const doc = await userDocRef.get();
  const data = doc.data();
  if (!data) return;

  const { plants = [], coins = 0, name = "Nieznany" } = data;

  const container = document.getElementById('plants-container');
  container.innerHTML = '';

  updateUserInfoUI(name, coins);

  plants.forEach((plant, index) => {
    const plantElement = renderPlant(plant, async () => {
      await sellPlant(index);
    });
    container.appendChild(plantElement);
  });
}

async function sellPlant(index) {
  const userDocRef = db.collection('users').doc(currentUser.uid);
  const doc = await userDocRef.get();
  const data = doc.data();

  const plant = data.plants[index];
  if (!plant) return;

  const rarity = plantRarities[plant.name] || 'common';
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
  await loadUserPlants();
}

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    loadUserPlants();
  } else {
    window.location.href = 'login.html';
  }
});