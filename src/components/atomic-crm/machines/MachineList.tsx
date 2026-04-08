import { useRecordContext } from "ra-core";
import { CreateButton } from "@/components/admin/create-button";
import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";
import { TopToolbar } from "../layout/TopToolbar";

const MachineListActions = () => (
  <TopToolbar>
    <CreateButton label="resources.machines.action.new" />
  </TopToolbar>
);

const ModelField = (_props: { label?: string | boolean }) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
      {record.product_id ? (
        <ReferenceField source="product_id" reference="products" link={false} />
      ) : (
        record.modele_libre ?? "—"
      )}
    </span>
  );
};

export const MachineList = () => (
  <List sort={{ field: "id", order: "DESC" }} actions={<MachineListActions />}>
    <DataTable>
      <DataTable.Col source="company_id" label="Client">
        <ReferenceField source="company_id" reference="companies" link="show" />
      </DataTable.Col>
      <DataTable.Col label="Modèle">
        <ModelField />
      </DataTable.Col>
      <DataTable.Col source="numero_serie" label="N° série" />
      <DataTable.Col source="date_achat" label="Date d'achat" />
    </DataTable>
  </List>
);
