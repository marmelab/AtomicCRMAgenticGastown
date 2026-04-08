import type { Product } from "../types";
import { ProductCreate } from "./ProductCreate";
import { ProductEdit } from "./ProductEdit";
import { ProductList } from "./ProductList";

export default {
  list: ProductList,
  create: ProductCreate,
  edit: ProductEdit,
  recordRepresentation: (record: Product) =>
    `${record.marque} ${record.reference} — ${record.nom_commercial}`,
};
