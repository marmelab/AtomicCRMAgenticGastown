import { CreateBase, Form } from "ra-core";
import { Card, CardContent } from "@/components/ui/card";
import { FormToolbar } from "../layout/FormToolbar";

import { ProductInputs } from "./ProductInputs";

export const ProductCreate = () => (
  <CreateBase redirect="list">
    <div className="mt-2 flex lg:mr-72">
      <div className="flex-1">
        <Form defaultValues={{ active: true }}>
          <Card>
            <CardContent>
              <ProductInputs />
              <FormToolbar />
            </CardContent>
          </Card>
        </Form>
      </div>
    </div>
  </CreateBase>
);
