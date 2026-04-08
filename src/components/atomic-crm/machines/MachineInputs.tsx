import { useWatch } from "react-hook-form";
import { required } from "ra-core";
import { ReferenceInput } from "@/components/admin/reference-input";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { TextInput } from "@/components/admin/text-input";
import { DateInput } from "@/components/admin/date-input";

export const MachineInputs = ({ showCompany = true }: { showCompany?: boolean }) => {
  const productId = useWatch({ name: "product_id" });

  return (
    <div className="space-y-4 w-full">
      {showCompany && (
        <ReferenceInput source="company_id" reference="companies">
          <AutocompleteInput
            label="Client"
            optionText="name"
            validate={required()}
            helperText={false}
          />
        </ReferenceInput>
      )}
      <ReferenceInput source="product_id" reference="products" filter={{ "active@eq": true }}>
        <AutocompleteInput
          label="Modèle (catalogue)"
          optionText="nom_commercial"
          helperText={false}
        />
      </ReferenceInput>
      {!productId && (
        <TextInput
          source="modele_libre"
          label="Modèle (hors catalogue)"
          helperText="Si la tondeuse n'est pas dans votre catalogue"
        />
      )}
      <TextInput source="numero_serie" label="Numéro de série" helperText={false} />
      <DateInput source="date_achat" label="Date d'achat" helperText={false} />
    </div>
  );
};
