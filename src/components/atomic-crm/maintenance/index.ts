import type { Service } from "../types";
import { MaintenanceCreate } from "./MaintenanceCreate";
import { MaintenanceEdit } from "./MaintenanceEdit";
import { MaintenanceList } from "./MaintenanceList";

export default {
  list: MaintenanceList,
  create: MaintenanceCreate,
  edit: MaintenanceEdit,
  recordRepresentation: (record: Service) =>
    `${record.nom} (${record.frequence} — ${record.prix_ht} €)`,
};
