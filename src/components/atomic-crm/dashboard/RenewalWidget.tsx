import { useGetList, useGetMany } from "ra-core";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import type { Company, Machine, MachineContract, Service } from "../types";

const in30Days = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
};

const today = () => new Date().toISOString().split("T")[0];

const daysUntil = (dateStr: string) => {
  const diff =
    new Date(dateStr + "T00:00:00Z").getTime() -
    new Date(today() + "T00:00:00Z").getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const urgencyClass = (days: number) => {
  if (days <= 7) return "border-red-400 text-red-700";
  if (days <= 15) return "border-orange-400 text-orange-700";
  return "border-yellow-400 text-yellow-700";
};

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

  const machineIds = (renewals ?? []).map((c) => c.machine_id);
  const { data: machines } = useGetMany<Machine>(
    "machines",
    { ids: machineIds },
    { enabled: machineIds.length > 0 },
  );

  const companyIds = [
    ...new Set((machines ?? []).map((m) => m.company_id)),
  ];
  const { data: companies } = useGetMany<Company>(
    "companies",
    { ids: companyIds },
    { enabled: companyIds.length > 0 },
  );

  const serviceIds = (renewals ?? []).map((c) => c.service_id);
  const { data: services } = useGetMany<Service>(
    "services",
    { ids: serviceIds },
    { enabled: serviceIds.length > 0 },
  );

  const machineMap = Object.fromEntries((machines ?? []).map((m) => [m.id, m]));
  const companyMap = Object.fromEntries((companies ?? []).map((c) => [c.id, c]));
  const serviceMap = Object.fromEntries((services ?? []).map((s) => [s.id, s.nom]));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Renouvellements à venir
          {renewals?.length ? (
            <Badge variant="destructive" className="ml-2 text-xs">
              {renewals.length}
            </Badge>
          ) : null}
        </CardTitle>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {!renewals?.length ? (
          <p className="text-sm text-muted-foreground">
            Aucun renouvellement dans les 30 jours.
          </p>
        ) : (
          <div className="space-y-2">
            {renewals.map((contract) => {
              const machine = machineMap[contract.machine_id];
              const company = machine ? companyMap[machine.company_id] : undefined;
              const serviceName = serviceMap[contract.service_id];
              const days = daysUntil(contract.date_renouvellement);
              return (
                <div
                  key={contract.id}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="min-w-0 flex-1 mr-2">
                    {company ? (
                      <Link
                        to={`/companies/${company.id}/show`}
                        className="font-medium hover:underline truncate block"
                      >
                        {company.name}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                    {serviceName && (
                      <span className="text-xs text-muted-foreground">
                        {serviceName}
                      </span>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 ${urgencyClass(days)}`}
                  >
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
