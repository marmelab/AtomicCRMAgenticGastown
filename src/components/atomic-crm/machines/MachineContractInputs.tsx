import { required } from "ra-core";
import { ReferenceInput } from "@/components/admin/reference-input";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { DateInput } from "@/components/admin/date-input";
import { SelectInput } from "@/components/admin/select-input";

const statutChoices = [
  { id: "actif", name: "Actif" },
  { id: "expiré", name: "Expiré" },
  { id: "résilié", name: "Résilié" },
];

export const MachineContractInputs = ({ showMachine = true }: { showMachine?: boolean }) => (
  <div className="space-y-4 w-full">
    {showMachine && (
      <ReferenceInput source="machine_id" reference="machines">
        <AutocompleteInput
          label="Machine"
          optionText={(r: any) => r?.numero_serie ?? r?.modele_libre ?? `#${r?.id}`}
          validate={required()}
          helperText={false}
        />
      </ReferenceInput>
    )}
    <ReferenceInput source="service_id" reference="services" filter={{ "active@eq": true }}>
      <AutocompleteInput
        label="Contrat d'entretien"
        optionText="nom"
        validate={required()}
        helperText={false}
      />
    </ReferenceInput>
    <DateInput source="date_debut" label="Date de début" validate={required()} helperText={false} />
    <DateInput source="date_renouvellement" label="Date de renouvellement" validate={required()} helperText={false} />
    <SelectInput
      source="statut"
      choices={statutChoices}
      defaultValue="actif"
      helperText={false}
    />
  </div>
);
