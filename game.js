// Importy nie zmienione:
import { auth, db } from './firebase-config.js';
import { renderPlant } from './ui.js';
import { plantRarities } from './plants.js';

let currentUser, userData;

// 🔄 Funkcja inicjalizacyjna
export function initializeGame() {
  auth.onAuthStateChanged(u => {
    if (u) {
      currentUser = u;
      loadUserData();
      setInterval(restockShop, 120000);
    } else {
      window.location.href = 'login.html';
    }
  });
}

async function loadUserData() {
  const docRef = db.collection('users').doc(currentUser.uid);
  const snap = await docRef.get();
  userData = snap.exists ? snap.data() : { plants: [], coins: 0, name: "Nieznany", codeFlags: {} };
  updateUserInfoUI();  // teraz działa poprawnie
  renderPlants();
  restockShop();
}

function renderPlants() {
  const c = document.getElementById('plants-container');
  c.innerHTML = '';
  if (!userData.plants.length) return c.textContent = 'Brak roślin 😢';
  userData.plants.forEach((p, i) => {
    const el = renderPlant(p, async () => await sellPlant(i));
    c.appendChild(el);
  });
}

async function sellPlant(i) {
  const p = userData.plants[i];
  if (!p) return;
  const v = { common:10, rare:25, event:50, admin:100, mythical:250 }[plantRarities[p.name]||'common'] || 5;
  userData.coins += v;
  userData.plants.splice(i, 1);
  await save();
  updateUserInfoUI();
  renderPlants();
}

async function save() {
  await db.collection('users').doc(currentUser.uid).set(userData);
}

export async function redeemCode() {
  const c = document.getElementById('codeInput');
  const code = c.value.trim().toLowerCase();
  if (!code) return alert("Wpisz kod.");
  userData.codeFlags = userData.codeFlags || {};

  switch(code) {
    case 'owneristhebestpeopleinentireworld':
      userData.codeFlags.ownerShop = true;
      alert('Odblokowano sklep właściciela!');
      break;
    case 'start':
      for(let x=0; x<3; x++) userData.plants.push({ name: "Carrot", age:0 });
      alert('Dodano 3 marchewki!');
      break;
    case 'cocodes':
      userData.codeFlags.cocodes = true;
      alert('Do sklepu +10% eventowych!');
      break;
    case 'admimangoes':
      userData.codeFlags.admimangoes = true;
      alert('Sklepy 75% eventowych!');
      break;
    default:
      alert('Nieznany kod');
      return;
  }

  await save();
  c.value = '';
  loadUserData();
}

function genShop() {
  const names = Object.keys(plantEmojis);
  const { cocodes, admimangoes } = userData.codeFlags || {};
  const base = (cocodes ? 0.1 : 0) + (admimangoes ? 0.75 : 0) + 0.5;
  return names.filter(n => {
    const r = plantRarities[n];
    if (['admin', 'mythical'].includes(r) && !userData.codeFlags.ownerShop) return false;
    return Math.random() < base;
  }).slice(0,6).map(n => ({ name: n, age:0 }));
}

function renderShop(pl) {
  const s = document.getElementById('shop');
  s.innerHTML = '';
  pl.forEach((p, i) => {
    const d = document.createElement('div');
    d.textContent = `${plantEmojis[p.name]||'❓'} ${p.name}`;
    d.onclick = () => buyPlant(i);
    s.appendChild(d);
  });
}

async function buyPlant(i) {
  const shop = genShop();
  const p = shop[i];
  const cost = { common:10, rare:25, event:50 }[plantRarities[p.name]||'common'] || 5;
  if (userData.coins < cost) return alert('Za mało monet!');
  userData.coins -= cost;
  userData.plants.push(p);
  await save();
  updateUserInfoUI();
  renderPlants();
  restockShop();
}

export function restockShop() {
  renderShop(genShop());
}

// 🧩 Poprawiona funkcja aktualizacji UI:
function updateUserInfoUI() {
  document.getElementById('username').textContent = userData.name;
  document.getElementById('coins').textContent = userData.coins;
}