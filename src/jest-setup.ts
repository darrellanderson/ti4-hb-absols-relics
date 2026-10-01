import { SetupPlayerSlotColors, resetGlobalThisTI4 } from "ti4-ttpg-ts";
import { addObjectTemplatesToMockWorld } from "ti4-ttpg-ts/mock";

beforeEach(() => {
  addObjectTemplatesToMockWorld(); // does a MockWorld._reset!
  resetGlobalThisTI4();
  new SetupPlayerSlotColors().setup(); // normally part of table state creation
});
