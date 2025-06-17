// game.js let coins = 200; let selectedPlant = null; let gardenState = Array(25).fill(null); let activeEvent = null;

function initGame() { updateCoinDisplay(); drawGarden(); restockShop(); rollEvent(); }

function updateCoinDisplay() { document.getElementById("coins").innerText = Monety: $${coins}; }

function drawGarden() { const garden = document.getElementById("garden"); garden.innerHTML = ""; for (let i = 0; i < gardenState.length; i++) { const plot = document.createElement("div"); plot.className = "plot"; const plant = gardenState[i]; if (plant) { const emoji = getGrowthEmoji(plant); plot.textContent = emoji; } plot.addEventListener("click", () => plantSeed(i)); garden.appendChild(plot); } }

function getGrowthEmoji(plant) { const stage = plant.stage; if (plant.id === 'gordon') { return stage === 'small' ? "👦" : stage === 'medium' ? "🔨" : plant.emoji; } if (plant.rarity === 'admin') { return stage === 'small' ? "✨" : stage === 'medium' ? "🌰" : plant.emoji; } if (plant.rarity === 'event') { return stage === 'small' ? "💐" : stage === 'medium' ? "🎄" : plant.emoji; } return stage === 'small' ? "🌱" : stage === 'medium' ? "🌳" : plant.emoji; }

function plantSeed(index) { if (gardenState[index]) return; if (!selectedPlant) return alert("Wybierz roślinę ze sklepu!"); if (coins < selectedPlant.price) return alert("Za mało monet!");

coins -= selectedPlant.price; updateCoinDisplay(); gardenState[index] = { ...selectedPlant, stage: 'small' }; drawGarden(); }

function restockShop() { const shop = document.getElementById("shop"); shop.innerHTML = ""; const available = getRandomPlants(); available.forEach(plant => { const btn = document.createElement("button"); btn.innerText = ${plant.name} ${plant.emoji} - $${plant.price}; btn.onclick = () => selectPlant(plant); shop.appendChild(btn); }); }

function selectPlant(plant) { selectedPlant = plant; document.getElementById("status").innerText = Wybrano: ${plant.name}; }

function redeemCode() { const code = document.getElementById("codeInput").value.trim(); if (code === "cocodeisverybig") { alert("Cocode aktywowany! Zwiększono szansę na rzadkie rośliny."); } else if (code === "ownercode" && isOwner()) { document.getElementById("ownerShop").style.display = "block"; loadOwnerShop(); } else if (code === "admingo") { alert("Admingo aktywowany. Sklep teraz ma równe szanse na wszystkie rośliny!"); } else { alert("Nieznany kod"); } }

function isOwner() { return true; // uproszczenie }

function loadOwnerShop() { const ownerDiv = document.getElementById("owner-shop-items"); ownerDiv.innerHTML = ""; plants.forEach(plant => { const btn = document.createElement("button"); btn.innerText = ${plant.name} ${plant.emoji}; btn.onclick = () => selectPlant({ ...plant, price: 0 }); ownerDiv.appendChild(btn); }); }

function getRandomPlants() { const available = []; while (available.length < 5) { const p = plants[Math.floor(Math.random() * plants.length)]; if (p.rarity !== 'admin' && p.rarity !== 'event' && !available.includes(p)) { available.push(p); } } return available; }

function rollEvent() { const roll = Math.random() * 100; if (roll < 2) activeEvent = "Lunar Festival"; else if (roll < 5) activeEvent = "Love Festival"; else if (roll < 8) activeEvent = "Luck Festival"; else if (roll < 11) activeEvent = "Harvest Haunt"; else if (roll < 15) activeEvent = "Sweetfest"; else if (roll < 19) activeEvent = "Winter’s Gift"; else activeEvent = null; document.getElementById("status").innerText += activeEvent ?  | Aktywny event: ${activeEvent} : ""; }

setInterval(restockShop, 120000); window.onload = initGame;

