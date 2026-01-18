import { createToken, getTokenData } from "./src/services/token.service"; 

// Test 1: Créer un token
const token = createToken("foo@bar.com");
console.log("✅ Token créé pour foo@bar.com: ", token);
console.log("\n");

// Test 2: Vérifier les données initiales
let data = getTokenData(token);
console.log("✅ Données initiales:", data);
console.log("\n");

// Test 3: Simuler 79 500 mots utilisés
if (data) {
  data.wordsUsedToday = 79500;
  console.log("✅ 79 500 mots simulés utilisés");
  console.log("Données:", data);
  console.log("\n");
}

// Test 4: Simuler le changement de jour
if (data) {
  data.lastResetDate = "2026-01-17"; // hier
  const today = new Date().toISOString().split("T")[0];
  console.log("✅ Dernière date reset changée à hier:", data.lastResetDate);
  console.log("Aujourd'hui:", today);
  console.log("Compteur devrait reset ✅");
  console.log("\n");
}
