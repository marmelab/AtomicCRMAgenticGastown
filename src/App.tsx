import { CRM } from "@/components/atomic-crm/root/CRM";

const companySectors = [
  { value: "golf", label: "Golf" },
  { value: "mairie", label: "Mairie / Collectivité" },
  { value: "jardinage", label: "Entreprise de jardinage" },
  { value: "paysagiste", label: "Paysagiste" },
  { value: "camping", label: "Camping / Loisirs" },
  { value: "autre", label: "Autre" },
];

const dealStages = [
  { value: "prospect", label: "Prospect" },
  { value: "qualification", label: "Qualification" },
  { value: "demonstration", label: "Démonstration" },
  { value: "devis", label: "Devis" },
  { value: "negociation", label: "Négociation" },
  { value: "commande", label: "Commande ✓" },
];

const dealPipelineStatuses = ["commande"];

const App = () => (
  <CRM
    title="Tondix CRM"
    companySectors={companySectors}
    dealStages={dealStages}
    dealPipelineStatuses={dealPipelineStatuses}
    currency="EUR"
    disableTelemetry
  />
);

export default App;
