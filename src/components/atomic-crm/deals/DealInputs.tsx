import { required, useTranslate } from "ra-core";
import { AutocompleteArrayInput } from "@/components/admin/autocomplete-array-input";
import { ReferenceArrayInput } from "@/components/admin/reference-array-input";
import { ReferenceInput } from "@/components/admin/reference-input";
import { TextInput } from "@/components/admin/text-input";
import { NumberInput } from "@/components/admin/number-input";
import { DateInput } from "@/components/admin/date-input";
import { SelectInput } from "@/components/admin/select-input";
import { useWatch } from "react-hook-form";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

import { contactOptionText } from "../misc/ContactOption";
import { useConfigurationContext } from "../root/ConfigurationContext";
import { AutocompleteCompanyInput } from "../companies/AutocompleteCompanyInput.tsx";

export const DealInputs = () => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-8">
      <DealInfoInputs />

      <div className={`flex gap-6 ${isMobile ? "flex-col" : "flex-row"}`}>
        <DealLinkedToInputs />
        <Separator orientation={isMobile ? "horizontal" : "vertical"} />
        <DealMiscInputs />
      </div>
    </div>
  );
};

const DealInfoInputs = () => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <TextInput source="name" validate={required()} helperText={false} />
      <TextInput source="description" multiline rows={3} helperText={false} />
    </div>
  );
};

const DealLinkedToInputs = () => {
  const translate = useTranslate();
  return (
    <div className="flex flex-col gap-4 flex-1">
      <h3 className="text-base font-medium">
        {translate("resources.deals.inputs.linked_to")}
      </h3>
      <ReferenceInput source="company_id" reference="companies">
        <AutocompleteCompanyInput
          label="resources.deals.fields.company_id"
          validate={required()}
          modal
        />
      </ReferenceInput>

      <ReferenceArrayInput source="contact_ids" reference="contacts_summary">
        <AutocompleteArrayInput
          label="resources.deals.fields.contact_ids"
          optionText={contactOptionText}
          helperText={false}
        />
      </ReferenceArrayInput>
    </div>
  );
};

const DealMiscInputs = () => {
  const { dealStages } = useConfigurationContext();
  const translate = useTranslate();
  const dealType = useWatch({ name: "deal_type", defaultValue: "tondeuse" });

  return (
    <div className="flex flex-col gap-4 flex-1">
      <h3 className="text-base font-medium">
        {translate("resources.deals.field_categories.misc")}
      </h3>

      <SelectInput
        source="deal_type"
        label="Type"
        choices={[
          { id: "tondeuse", name: "🚜 Tondeuse" },
          { id: "entretien", name: "🔧 Entretien" },
        ]}
        defaultValue="tondeuse"
        helperText={false}
      />

      {dealType === "tondeuse" && (
        <ReferenceInput source="product_id" reference="products" filter={{ "active@eq": true }}>
          <AutocompleteInput
            label="Tondeuse (catalogue)"
            optionText="nom_commercial"
            helperText={false}
          />
        </ReferenceInput>
      )}

      {dealType === "entretien" && (
        <ReferenceInput source="service_id" reference="services" filter={{ "active@eq": true }}>
          <AutocompleteInput
            label="Contrat d'entretien"
            optionText="nom"
            helperText={false}
          />
        </ReferenceInput>
      )}

      {dealType === "entretien" && (
        <ReferenceInput source="machine_id" reference="machines">
          <AutocompleteInput
            label="Machine concernée (optionnel)"
            optionText={(record: any) => record?.numero_serie ?? record?.modele_libre ?? `Machine #${record?.id}`}
            helperText={false}
          />
        </ReferenceInput>
      )}

      <NumberInput source="amount" defaultValue={0} helperText={false} validate={required()} />
      <DateInput
        validate={required()}
        source="expected_closing_date"
        helperText={false}
        defaultValue={new Date().toISOString().split("T")[0]}
      />
      <SelectInput
        source="stage"
        choices={dealStages}
        optionText="label"
        optionValue="value"
        defaultValue="prospect"
        helperText={false}
        validate={required()}
      />
    </div>
  );
};
