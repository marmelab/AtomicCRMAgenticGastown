import type {
  Company,
  Contact,
  ContactNote,
  Deal,
  DealNote,
  Machine,
  MachineContract,
  Product,
  Sale,
  Service,
  Tag,
  Task,
} from "../../../types";
import type { ConfigurationContextValue } from "../../../root/ConfigurationContext";

export interface Db {
  companies: Company[];
  contacts: Contact[];
  contact_notes: ContactNote[];
  deals: Deal[];
  deal_notes: DealNote[];
  sales: Sale[];
  tags: Tag[];
  tasks: Task[];
  configuration: Array<{ id: number; config: ConfigurationContextValue }>;
  products: Product[];
  services: Service[];
  machines: Machine[];
  machine_contracts: MachineContract[];
}
