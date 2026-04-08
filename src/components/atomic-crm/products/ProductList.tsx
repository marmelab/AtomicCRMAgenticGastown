import { useRecordContext } from "ra-core";
import { CreateButton } from "@/components/admin/create-button";
import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { SearchInput } from "@/components/admin/search-input";
import { Badge } from "@/components/ui/badge";
import { TopToolbar } from "../layout/TopToolbar";

const ProductListActions = () => (
  <TopToolbar>
    <CreateButton label="Nouveau modèle" />
  </TopToolbar>
);

const ActiveField = (_props: { label?: string | boolean }) => {
  const record = useRecordContext();
  if (!record) return null;
  return record.active ? (
    <Badge variant="outline" className="border-green-400">Actif</Badge>
  ) : (
    <Badge variant="outline" className="border-gray-300 text-gray-400">Inactif</Badge>
  );
};

const filters = [<SearchInput source="q" alwaysOn key="search" />];

export const ProductList = () => (
  <List
    filters={filters}
    actions={<ProductListActions />}
    sort={{ field: "marque", order: "ASC" }}
  >
    <DataTable>
      <DataTable.Col source="marque" />
      <DataTable.Col source="reference" />
      <DataTable.Col source="nom_commercial" />
      <DataTable.NumberCol source="prix_ht" label="Prix HT (€)" />
      <DataTable.Col label="Statut">
        <ActiveField />
      </DataTable.Col>
    </DataTable>
  </List>
);
