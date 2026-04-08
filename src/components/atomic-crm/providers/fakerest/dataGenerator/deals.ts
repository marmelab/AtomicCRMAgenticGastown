import { add } from "date-fns";
import { datatype, lorem, random } from "faker/locale/en_US";

// Use Tondix-specific stages so demo data matches the app configuration
const tondixDealStages = [
  { value: "prospect" },
  { value: "qualification" },
  { value: "demonstration" },
  { value: "devis" },
  { value: "negociation" },
  { value: "commande" },
];
import type { Deal } from "../../../types";
import type { Db } from "./types";
import { randomDate } from "./utils";

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

export const generateDeals = (db: Db): Deal[] => {
  const deals = Array.from(Array(50).keys()).map((id) => {
    const company = random.arrayElement(db.companies);
    company.nb_deals = (company.nb_deals ?? 0) + 1;
    const contacts = random.arrayElements(
      db.contacts.filter((contact) => contact.company_id === company.id),
      datatype.number({ min: 1, max: 3 }),
    );
    const lowercaseName = lorem.words();
    const created_at = randomDate(new Date(company.created_at)).toISOString();

    const expected_closing_date = randomDate(
      new Date(created_at),
      add(new Date(created_at), { months: 6 }),
    )
      .toISOString()
      .split("T")[0];

    const dealType: "tondeuse" | "entretien" =
      id % 3 === 0 ? "entretien" : "tondeuse";
    const stage = random.arrayElement(tondixDealStages).value;

    // "commande" deals get a recent updated_at (current month/year) so the
    // RevenueWidget has data to display in demo mode
    const updatedAt =
      stage === "commande"
        ? randomDate(daysAgo(60), daysAgo(1)).toISOString()
        : randomDate(new Date(created_at)).toISOString();

    return {
      id,
      name: lowercaseName[0].toUpperCase() + lowercaseName.slice(1),
      company_id: company.id,
      contact_ids: contacts.map((contact) => contact.id),
      stage,
      deal_type: dealType,
      product_id:
        dealType === "tondeuse" && db.products?.length
          ? db.products[id % db.products.length].id
          : undefined,
      service_id:
        dealType === "entretien" && db.services?.length
          ? db.services[id % db.services.length].id
          : undefined,
      description: lorem.paragraphs(datatype.number({ min: 1, max: 4 })),
      amount: datatype.number(1000) * 100,
      created_at,
      updated_at: updatedAt,
      expected_closing_date,
      sales_id: company.sales_id!,
      index: 0,
    };
  });
  // compute index based on stage
  tondixDealStages.forEach((stage) => {
    deals
      .filter((deal) => deal.stage === stage.value)
      .forEach((deal, index) => {
        deals[deal.id].index = index;
      });
  });
  return deals;
};
