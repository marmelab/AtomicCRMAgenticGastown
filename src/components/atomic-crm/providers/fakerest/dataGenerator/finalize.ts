import type { Db } from "./types";

export const finalize = (db: Db) => {
  // set contact status according to the latest note
  db.contact_notes
    .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
    .forEach((note) => {
      db.contacts[note.contact_id as number].status = note.status;
    });

  // compute nb_machines per company
  db.machines.forEach((machine) => {
    const company = db.companies.find((c) => c.id === machine.company_id);
    if (company) company.nb_machines = (company.nb_machines ?? 0) + 1;
  });

  // compute nb_active_contracts per company (via machine → company)
  db.machine_contracts
    .filter((c) => c.statut === "actif")
    .forEach((contract) => {
      const machine = db.machines.find((m) => m.id === contract.machine_id);
      if (!machine) return;
      const company = db.companies.find((c) => c.id === machine.company_id);
      if (company)
        company.nb_active_contracts = (company.nb_active_contracts ?? 0) + 1;
    });
};
