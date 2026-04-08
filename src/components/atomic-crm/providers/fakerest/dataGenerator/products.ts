import type { Product } from "../../../types";

export const generateProducts = (): Product[] => [
  { id: 1, marque: "Husqvarna", reference: "430X", nom_commercial: "Automower 430X", prix_ht: 4200, description: "Robot tondeuse pour grandes surfaces jusqu'à 3200 m².", active: true },
  { id: 2, marque: "Husqvarna", reference: "535", nom_commercial: "Rider 535", prix_ht: 6800, description: "Tondeuse autoportée robuste pour terrains accidentés.", active: true },
  { id: 3, marque: "Stihl", reference: "RMI 632", nom_commercial: "iMow RMI 632", prix_ht: 3900, description: "Robot tondeuse connecté Bluetooth.", active: true },
  { id: 4, marque: "Stiga", reference: "A 5000", nom_commercial: "Autoclip A 5000", prix_ht: 5100, description: "Tondeuse robot professionnelle 5000 m².", active: true },
  { id: 5, marque: "Honda", reference: "HF 2417", nom_commercial: "HF 2417 HTE", prix_ht: 3200, description: "Tondeuse autoportée à éjection arrière.", active: false },
];
