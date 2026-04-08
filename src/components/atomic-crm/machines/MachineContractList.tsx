import { useGetList } from "ra-core";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { MachineContract } from "../types";

const STATUT_COLORS: Record<string, string> = {
  actif: "border-green-400 text-green-700",
  "expiré": "border-orange-400 text-orange-700",
  "résilié": "border-gray-300 text-gray-500",
};

export const MachineContractList = ({ machineId }: { machineId: string | number }) => {
  const { data: contracts, isPending } = useGetList<MachineContract>("machine_contracts", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "date_renouvellement", order: "ASC" },
    filter: { "machine_id@eq": machineId },
  });

  return (
    <div className="mt-3 ml-2 border-l-2 border-muted pl-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contrats d'entretien</span>
        <Link to={`/machine_contracts/create?source=${JSON.stringify({ machine_id: machineId })}`}>
          <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
            <Plus className="h-3 w-3" /> Ajouter
          </Button>
        </Link>
      </div>
      {isPending ? (
        <p className="text-xs text-muted-foreground">Chargement...</p>
      ) : !contracts?.length ? (
        <p className="text-xs text-muted-foreground">Aucun contrat.</p>
      ) : (
        <div className="space-y-1">
          {contracts.map((c) => (
            <div key={c.id} className="flex justify-between items-center text-xs">
              <span>Contrat #{c.service_id} — renouvellement le {c.date_renouvellement}</span>
              <Badge variant="outline" className={`text-xs ${STATUT_COLORS[c.statut] ?? ""}`}>
                {c.statut}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
