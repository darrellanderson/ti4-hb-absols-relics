import { AbstractGen, GenExtDeck, generate } from "ti4-hb-helper";
import { homebrew } from "./homebrew";

it("generate", async () => {
  let abstractGen: AbstractGen;
  const errors: Array<string> = [];

  abstractGen = new GenExtDeck(homebrew)
    .setDeckType("relic")
    .setIsLandscape(false)
    .setIsSharedBack(true)
    .setTag("card-relic");
  await abstractGen.generate(errors);
  await abstractGen.writeOutputFiles();

  abstractGen = new GenExtDeck(homebrew)
    .setDeckType("relic-landscape")
    .setIsLandscape(true)
    .setIsSharedBack(true);
  await abstractGen.generate(errors);
  await abstractGen.writeOutputFiles();

  // Normally built from injected systems/planets data,
  // but "nano-forge" is an attachment with a legendary planet card.
  abstractGen = new GenExtDeck(homebrew)
    .setDeckType("legendary-planet")
    .setIsLandscape(true)
    .setIsSharedBack(false)
    .setTag("card-legendary-planet");
  await abstractGen.generate(errors);
  await abstractGen.writeOutputFiles();

  await generate(homebrew);

  if (errors.length > 0) {
    throw new Error("ext gen:\n" + errors.join("\n"));
  }
}, 300000);
