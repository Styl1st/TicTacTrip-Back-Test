import { justifyText } from "./src/services/justify.service"; 

const text = "Voici un texte très long que je souhaite justifier sur 80 caractères par ligne afin de voir si le système fonctionne correctement.";

const justified = justifyText(text, 80);
console.log(justified);
console.log("\n---\n");
console.log("Longueur des lignes:");
justified.split("\n").forEach((line, i) => {
  console.log(`Ligne ${i + 1}: ${line.length} caractères`);
});
