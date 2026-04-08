import { required } from "ra-core";
import { TextInput } from "@/components/admin/text-input";
import { NumberInput } from "@/components/admin/number-input";
import { SelectInput } from "@/components/admin/select-input";
import { BooleanInput } from "@/components/admin/boolean-input";

const frequenceChoices = [
  { id: "annuel", name: "Annuel" },
  { id: "semestriel", name: "Semestriel" },
  { id: "trimestriel", name: "Trimestriel" },
];

export const MaintenanceInputs = () => (
  <div className="space-y-4 w-full">
    <TextInput source="nom" validate={required()} helperText={false} />
    <TextInput source="reference" validate={required()} helperText={false} />
    <SelectInput
      source="frequence"
      choices={frequenceChoices}
      validate={required()}
      helperText={false}
    />
    <NumberInput source="prix_ht" validate={required()} min={0} helperText={false} />
    <TextInput source="description_prestations" multiline rows={4} helperText={false} />
    <BooleanInput source="active" helperText={false} defaultValue={true} />
  </div>
);
