import { useGetList } from "ra-core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import type { MachineContract } from "../types";

const in30Days = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
};

const today = () => new Date().toISOString().split("T")[0];

export const RenewalWidget = () => {
  const { data: renewals } = useGetList<MachineContract>("machine_contracts", {
    pagination: { page: 1, perPage: 20 },
    sort: { field: "date_renouvellement", order: "ASC" },
    filter: {
      "statut@eq": "actif",
      "date_renouvellement@gte": today(),
      "date_renouvellement@lte": in30Days(),
    },
  });

  const daysUntil = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const urgencyClass = (days: number) => {
    if (days <= 7) return "border-red-400 text-red-700";
    if (days <= 15) return "border-orange-400 text-orange-700";
    return "border-yellow-400 text-yellow-700";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Renouvellements à venir
          {renewals?.length ? (
            <Badge variant="destructive" className="ml-2 text-xs">{renewals.length}</Badge>
          ) : null}
        </CardTitle>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {!renewals?.length ? (
          <p className="text-sm text-muted-foreground">Aucun renouvellement dans les 30 jours.</p>
        ) : (
          <div className="space-y-2">
            {renewals.map((contract) => {
              const days = daysUntil(contract.date_renouvellement);
              return (
                <div key={contract.id} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Contrat #{contract.id}</span>
                  <Badge variant="outline" className={urgencyClass(days)}>
                    dans {days}j
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
