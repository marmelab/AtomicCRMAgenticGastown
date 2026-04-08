import defaultMessages from "ra-language-english";
import polyglotI18nProvider from "ra-i18n-polyglot";
import type { TranslationMessages } from "ra-core";

// TODO: Move these messages to ra-core when available in the next minor release.
// Remove this override once ra-core ships built-in guesser translations.
const guesserMessages = {
  guesser: {
    empty: {
      title: "No data to display",
      message: "Please check your data provider",
    },
  },
};

const customMessages = {
  resources: {
    products: {
      name: "Tondeuse |||| Tondeuses",
      action: { new: "Ajouter une tondeuse" },
    },
    services: {
      name: "Contrat d'entretien |||| Contrats d'entretien",
      action: { new: "Ajouter un contrat" },
    },
    machines: {
      name: "Machine |||| Parc machines",
      action: { new: "Ajouter une machine" },
    },
    machine_contracts: {
      name: "Contrat |||| Contrats",
      action: { new: "Ajouter un contrat" },
    },
  },
};

export const i18nProvider = polyglotI18nProvider(
  () =>
    ({
      ...defaultMessages,
      ...customMessages,
      ra: {
        ...defaultMessages.ra,
        ...guesserMessages,
      },
    }) as TranslationMessages,
  "en",
  [{ name: "en", value: "English" }],
  { allowMissing: true },
);
