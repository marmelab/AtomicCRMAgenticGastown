import type { Service } from "../../../types";

export const generateMaintenance = (): Service[] => [
  { id: 1, nom: "Entretien Essentiel", reference: "ENT-ESS", frequence: "annuel", prix_ht: 290, description_prestations: "Révision complète, remplacement des lames, nettoyage.", active: true },
  { id: 2, nom: "Entretien Premium", reference: "ENT-PREM", frequence: "semestriel", prix_ht: 480, description_prestations: "2 révisions/an, remplacement pièces d'usure, assistance prioritaire.", active: true },
  { id: 3, nom: "Entretien Intensif", reference: "ENT-INT", frequence: "trimestriel", prix_ht: 790, description_prestations: "4 passages/an, tout inclus, prêt de machine en cas d'immobilisation.", active: true },
];
