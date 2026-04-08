import { MachineCreate } from "./MachineCreate";
import { MachineEdit } from "./MachineEdit";
import { MachineList } from "./MachineList";

export { MachineInputs } from "./MachineInputs";

export default {
  list: MachineList,
  create: MachineCreate,
  edit: MachineEdit,
  recordRepresentation: (record: any) =>
    record.numero_serie ?? record.modele_libre ?? `Machine #${record.id}`,
};
