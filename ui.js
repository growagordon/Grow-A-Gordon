import { plantEmojis, plantRarities } from './plants.js';

export function renderPlant(plant, onSell) {
  const div = document.createElement('div');
  div.className = 'plant';
  div.innerHTML = `
    <span class="emoji">${plantEmojis[plant.name] || '❓'}</span>
    <div class="info">
      <strong>${plant.name}</strong><br>
      Wiek: ${plant.age || 0} dni<br>
      Rzadkość: ${plantRarities[plant.name] || 'unknown'}
    </div>
    <button class="sell-btn">Sprzedaj</button>
  `;
  div.querySelector('.sell-btn').addEventListener('click', () => onSell());
  return div;
}

export function updateUserInfoUI(name, coins) {
  const usernameEl = document.getElementById('username-display');
  const coinsEl = document.getElementById('coin-display');
  if(usernameEl) usernameEl.textContent = `👤 ${name}`;
  if(coinsEl) coinsEl.textContent = `💰 ${coins}`;
}