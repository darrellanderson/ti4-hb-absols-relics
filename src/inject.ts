import { OnCardBecameSingletonOrDeck } from "ttpg-darrell";
import { homebrew } from "./homebrew";
import { NSID_TO_TEMPLATE_ID } from "./nsid-to-template-id"; // generated
import { RightClickFetchComponents } from "./lib/right-click-fetch-components";

homebrew.nsidToTemplateId = NSID_TO_TEMPLATE_ID;

TI4.homebrewRegistry.load(homebrew);

new OnCardBecameSingletonOrDeck().init(); // The one in TI4-TTPG-TS context does not apply to this context

new RightClickFetchComponents("card.relic:hb.absol.relics/jr-xs445-0")
  .addFetchCard("card.relic-landscape:hb.absol.relics/", [
    "card.relic-landscape:hb.absol.relics/jr-xs445-0",
  ])
  .setRemoveClickedObjAfterFetch(true)
  .init();

new RightClickFetchComponents("card.relic:hb.absol.relics/nano-forge")
  .addFetchCard("card.legendary-planet:hb.absol.relics/", [
    "card.legendary-planet:hb.absol.relics/nano-forge",
  ])
  .init();

new RightClickFetchComponents("card.relic:hb.absol.relics/quantumcore")
  .addFetchCard("card.relic-landscape:hb.absol.relics/", [
    "card.relic-landscape:hb.absol.relics/quantumcore",
  ])
  .setRemoveClickedObjAfterFetch(true)
  .init();

new RightClickFetchComponents("card.relic:hb.absol.relics/plenary-orbital")
  .addFetchCard("card.relic-landscape:hb.absol.relics/", [
    "card.relic-landscape:hb.absol.relics/plenary-orbital",
  ])
  .setRemoveClickedObjAfterFetch(true)
  .init();

new RightClickFetchComponents("card.relic:hb.absol.relics/tyrants-lament")
  .addFetchCard("card.relic-landscape:hb.absol.relics/", [
    "card.relic-landscape:hb.absol.relics/tyrants-lament",
  ])
  .setRemoveClickedObjAfterFetch(true)
  .init();
