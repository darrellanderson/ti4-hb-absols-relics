import {
  Card,
  GameObject,
  Player,
  Rotator,
  Vector,
} from "@tabletop-playground/api";
import {
  AbstractRightClickCard,
  Broadcast,
  CardUtil,
  DeletedItemsContainer,
} from "ttpg-darrell";

const ACTION_FETCH_COMPONENTS = "*Fetch Components";

type DeckAndCardsNsidType = {
  deckNsidPrefix: string;
  cardNsids: Array<string>;
};

/**
 * Fetched related components to this card.
 * (This belongs in the main mod?)
 */
export class RightClickFetchComponents extends AbstractRightClickCard {
  private readonly _fetchDeckAndCards: Array<DeckAndCardsNsidType> = [];
  private readonly _fetchGameObjects: Array<string> = [];
  private _removeClickedObjAfterFetch: boolean = false;

  constructor(cardNsid: string) {
    const customActionHandler = (
      object: GameObject,
      player: Player,
      identifier: string,
    ): void => {
      if (identifier === ACTION_FETCH_COMPONENTS) {
        this._fetchComponents(object, player);
      }
    };

    super(cardNsid, ACTION_FETCH_COMPONENTS, customActionHandler);
  }

  addFetchCard(deckNsidPrefix: string, cardNsids: Array<string>): this {
    this._fetchDeckAndCards.push({ deckNsidPrefix, cardNsids });
    return this;
  }

  addFetchGameObject(objNsid: string): this {
    this._fetchGameObjects.push(objNsid);
    return this;
  }

  setRemoveClickedObjAfterFetch(remove: boolean): this {
    this._removeClickedObjAfterFetch = remove;
    return this;
  }

  _fetchComponents(clickedObj: GameObject, player: Player): void {
    if (clickedObj instanceof Card && clickedObj.isInHolder()) {
      Broadcast.broadcastOne(
        player,
        "Cannot fetch components while the card is in a holder.",
        Broadcast.ERROR,
      );
      return;
    }

    const spawnPos: Vector = clickedObj.getPosition().add([0, 0, 10]);
    const cardRot: Rotator = new Rotator(0, 0, 180);
    const fetched: Array<GameObject> = [];

    // Fetch cards.
    for (const deckAndCards of this._fetchDeckAndCards) {
      const card: Card = this._spawnDeckAndExtractCard(
        deckAndCards.deckNsidPrefix,
        deckAndCards.cardNsids,
        spawnPos,
      );
      card.setRotation(cardRot);
      fetched.push(card);
      spawnPos.z += 3;
    }

    // Fetch game obejcts.
    for (const objNsid of this._fetchGameObjects) {
      const obj: GameObject = this._spawnGameObject(objNsid, spawnPos);
      if (obj instanceof Card) {
        obj.setRotation(cardRot);
      }
      fetched.push(obj);
      spawnPos.z += 3;
    }

    // Position objects in a spread.
    const deltaY: number = 3;
    const p0: Vector = clickedObj
      .getPosition()
      .subtract([0, (deltaY * (fetched.length - 1)) / 2, 0]);
    // TODO XXX

    // Maybe remove clicked object after fetching.
    if (this._removeClickedObjAfterFetch) {
      DeletedItemsContainer.destroyWithoutCopying(clickedObj);
    }
  }

  _spawnDeckAndExtractCard(
    deckNsidPrefix: string,
    cardNsids: Array<string>,
    pos: Vector,
  ): Card {
    const deck: Card = TI4.spawn.spawnMergeDecksWithNsidPrefixOrThrow(
      deckNsidPrefix,
      pos,
    );

    // "card" might be a deck if more than one card extracted.
    const card: Card | undefined = new CardUtil().filterCards(
      deck,
      (candidateCardNsid: string): boolean => {
        return cardNsids.includes(candidateCardNsid);
      },
    );
    if (!card) {
      throw new Error(
        `No cards with NSIDs "${cardNsids.join(", ")}" not found in deck "${deckNsidPrefix}"`,
      );
    } else if (card.getStackSize() < cardNsids.length) {
      throw new Error(
        `Not all cards with NSIDs "${cardNsids.join(", ")}" were found in deck "${deckNsidPrefix}"`,
      );
    }

    if (deck.getStackSize() > 0) {
      DeletedItemsContainer.destroyWithoutCopying(deck);
    }
    return card;
  }

  _spawnGameObject(objNsid: string, pos: Vector): GameObject {
    return TI4.spawn.spawnOrThrow(objNsid, pos);
  }
}
