import type { Machine, MachineContract } from "../../../types";
import type { Db } from "./types";

const MODELES_LIBRES = [
  "Kubota G23",
  "John Deere X350",
  "Toro TimeCutter 4225",
  "Hustler Raptor",
  "Ferris IS700",
];

const daysFromNow = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};

const pastDate = (yearsAgo: number, monthOffset: number): string => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - yearsAgo);
  d.setMonth(d.getMonth() - monthOffset);
  d.setDate(15);
  return d.toISOString().split("T")[0];
};

export const generateMachines = (db: Db): Machine[] => {
  const machines: Machine[] = [];
  let id = 1;

  // Give machines to the first 18 companies (1–2 machines each)
  const companies = db.companies.slice(0, 18);
  for (let ci = 0; ci < companies.length; ci++) {
    const company = companies[ci];
    const count = ci % 3 === 0 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const useProduct = i === 0 && db.products.length > 0;
      machines.push({
        id,
        company_id: company.id,
        product_id: useProduct ? db.products[id % db.products.length].id : undefined,
        modele_libre: !useProduct ? MODELES_LIBRES[id % MODELES_LIBRES.length] : undefined,
        numero_serie: `SN-${String(id).padStart(5, "0")}`,
        date_achat: pastDate(id % 3, id % 6),
      });
      id++;
    }
  }

  return machines;
};

export const generateMachineContracts = (db: Db): MachineContract[] => {
  if (!db.machines.length || !db.services.length) return [];

  const contracts: MachineContract[] = [];
  // Upcoming renewals spread over next 30 days (feed the dashboard widget)
  const upcomingDays = [4, 8, 12, 17, 23, 28];

  db.machines.forEach((machine, index) => {
    const service = db.services[index % db.services.length];
    const isUpcoming = index < upcomingDays.length;

    if (isUpcoming) {
      // Active contract expiring in next 30 days → visible in RenewalWidget
      const startDate = pastDate(1, 0);
      const renewDate = daysFromNow(upcomingDays[index]);
      contracts.push({
        id: contracts.length + 1,
        machine_id: machine.id,
        service_id: service.id,
        date_debut: startDate,
        date_renouvellement: renewDate,
        statut: "actif",
      });
    } else if (index % 3 === 0) {
      // Expired contract (historical)
      contracts.push({
        id: contracts.length + 1,
        machine_id: machine.id,
        service_id: service.id,
        date_debut: pastDate(2, 0),
        date_renouvellement: pastDate(1, 0),
        statut: "expiré",
      });
    } else {
      // Active contract renewing far in the future
      contracts.push({
        id: contracts.length + 1,
        machine_id: machine.id,
        service_id: service.id,
        date_debut: pastDate(0, 6),
        date_renouvellement: daysFromNow(90 + index * 10),
        statut: "actif",
      });
    }
  });

  return contracts;
};
