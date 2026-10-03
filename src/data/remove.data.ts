/* List of NSIDs (or limited NSID prefixes) to remove after adding homebrew.
 *
 * NSIDs can be specific cards, objects, tokens, etc.  OR they can be
 * NSID prefixes so long as the prefix is all of the source or name fields.
 *
 * For instance, to remove all agenda cards:
 * "card.agenda:base/*",
 * "card.agenda:pok/*"
 *
 * DO NOT remove "card.agenda:*" unless you want to remove ALL agenda cards,
 * including ones this homebrew adds.
 */
export const REMOVE_NSIDS: Array<string> = [
  "card.relic:pok/*",
  "card.relic:codex.affinity/*",
];
