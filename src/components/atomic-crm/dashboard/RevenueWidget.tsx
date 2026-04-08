import { useGetList } from "ra-core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { Deal } from "../types";

const startOfMonth = () => {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const startOfYear = () => {
  const d = new Date();
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

export const RevenueWidget = () => {
  const { data: monthDeals } = useGetList<Deal>("deals", {
    pagination: { page: 1, perPage: 500 },
    filter: {
      "stage@eq": "commande",
      "updated_at@gte": startOfMonth(),
    },
  });

  const { data: yearDeals } = useGetList<Deal>("deals", {
    pagination: { page: 1, perPage: 500 },
    filter: {
      "stage@eq": "commande",
      "updated_at@gte": startOfYear(),
    },
  });

  const monthCA = monthDeals?.reduce((sum, d) => sum + (d.amount ?? 0), 0) ?? 0;
  const yearCA = yearDeals?.reduce((sum, d) => sum + (d.amount ?? 0), 0) ?? 0;

  const tondeusesMonth = monthDeals?.filter((d) => d.deal_type === "tondeuse").reduce((s, d) => s + (d.amount ?? 0), 0) ?? 0;
  const entretiensMonth = monthDeals?.filter((d) => d.deal_type === "entretien").reduce((s, d) => s + (d.amount ?? 0), 0) ?? 0;

  const formatEur = (n: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatEur(monthCA)}</div>
        <p className="text-xs text-muted-foreground mt-1">ce mois</p>
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>🚜 Tondeuses</span>
            <span>{formatEur(tondeusesMonth)}</span>
          </div>
          <div className="flex justify-between">
            <span>🔧 Entretiens</span>
            <span>{formatEur(entretiensMonth)}</span>
          </div>
          <div className="flex justify-between font-medium text-foreground pt-1 border-t">
            <span>Année {new Date().getFullYear()}</span>
            <span>{formatEur(yearCA)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
