import { OnCardBecameSingletonOrDeck } from "ttpg-darrell";
import { homebrew } from "./homebrew";
import { NSID_TO_TEMPLATE_ID } from "./nsid-to-template-id"; // generated
import { RightClickFetchComponents } from "./lib/right-click-fetch-components";

homebrew.nsidToTemplateId = NSID_TO_TEMPLATE_ID;

TI4.homebrewRegistry.load(homebrew);

new OnCardBecameSingletonOrDeck().init();

// Quantumcore (get landscape version)
new RightClickFetchComponents("card.relic:hb.absol.relics/quantumcore")
  .addFetchCard("card.relic-landscape:hb.absol.relics/", [
    "card.relic-landscape:hb.absol.relics/quantumcore",
  ])
  .setRemoveClickedObjAfterFetch(true)
  .init();
