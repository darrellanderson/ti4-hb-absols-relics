import { refPackageId } from "@tabletop-playground/api";
import { HomebrewModuleType } from "ti4-ttpg-ts";

import { REMOVE_NSIDS } from "./data/remove.data";

const packageId: string = refPackageId;

export const homebrew: HomebrewModuleType = {
  sourceAndPackageId: {
    source: "hb.absol.relics",
    packageId,
  },
  remove: REMOVE_NSIDS,
};
