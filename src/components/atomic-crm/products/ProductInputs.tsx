import { required } from "ra-core";
import { TextInput } from "@/components/admin/text-input";
import { NumberInput } from "@/components/admin/number-input";
import { BooleanInput } from "@/components/admin/boolean-input";

export const ProductInputs = () => (
  <div className="space-y-4 w-full">
    <TextInput source="marque" validate={required()} helperText={false} />
    <TextInput source="reference" validate={required()} helperText={false} />
    <TextInput source="nom_commercial" validate={required()} helperText={false} />
    <NumberInput source="prix_ht" validate={required()} min={0} helperText={false} />
    <TextInput source="description" multiline rows={3} helperText={false} />
    <BooleanInput source="active" helperText={false} />
  </div>
);
