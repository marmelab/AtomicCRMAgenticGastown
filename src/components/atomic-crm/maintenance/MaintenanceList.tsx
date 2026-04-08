import { useRecordContext } from "ra-core";
import { CreateButton } from "@/components/admin/create-button";
import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { SearchInput } from "@/components/admin/search-input";
import { Badge } from "@/components/ui/badge";
import { TopToolbar } from "../layout/TopToolbar";

const MaintenanceListActions = () => (
  <TopToolbar>
    <CreateButton label="Nouveau contrat" />
  </TopToolbar>
);

const FrequenceField = (_props: { label?: string | boolean }) => {
  const record = useRecordContext();
  if (!record) return null;
  const labels: Record<string, string> = {
    annuel: "Annuel",
    semestriel: "Semestriel",
    trimestriel: "Trimestriel",
  };
  return <span>{labels[record.frequence] ?? record.frequence}</span>;
};

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

export const MaintenanceList = () => (
  <List
    filters={filters}
    actions={<MaintenanceListActions />}
    sort={{ field: "nom", order: "ASC" }}
  >
    <DataTable>
      <DataTable.Col source="nom" />
      <DataTable.Col source="reference" />
      <DataTable.Col label="Fréquence">
        <FrequenceField />
      </DataTable.Col>
      <DataTable.NumberCol source="prix_ht" label="Prix HT (€)" />
      <DataTable.Col label="Statut">
        <ActiveField />
      </DataTable.Col>
    </DataTable>
  </List>
);
