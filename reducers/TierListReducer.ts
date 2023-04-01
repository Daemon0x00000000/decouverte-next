import TierItem from "../interfaces/TierItem";
import TierInterface from "../interfaces/Tier";
import TierListInterface from "../interfaces/TierListInterface";
import {Reducer} from "react";

type Action =
    | { type: "ADD_TIER", payload: { name: string, color: string } }
    | { type: "ADD_ITEM", payload: { tierIndex: number, encodedImage: string } }
    | { type: "REMOVE_TIER", payload: { tierIndex: number } }
    | { type: "REMOVE_ITEM", payload: { tierIndex: number, itemIndex: number } }
    | { type: "UPDATE_TIER_NAME", payload: { tierIndex: number, name: string } }
    | { type: "UPDATE_TIER_COLOR", payload: { tierIndex: number, color: string } }
    | { type: "UPDATE_TIERS", payload: { tiers: TierInterface[] } }
    | { type: "UPDATE_TIERLIST_NAME", payload: { name: string } }
    | { type: "DRAG_DROP_ITEM", payload: { tierIndex: number, newItems: TierItem[] } }

const tierListReducer: Reducer<TierListInterface,Action> = (state, action) => {
    switch (action.type) {
        case "ADD_TIER":
            return {
                ...state,
                tiers: [...state.tiers, {
                    name: action.payload.name,
                    color: action.payload.color,
                    items: []
                }]
        };
        case "ADD_ITEM":
            return {
                ...state,
                tiers: state.tiers.map((tier, index) => {
                    if (index === action.payload.tierIndex) {
                        return {
                            ...tier,
                            items: [...tier.items, {
                                id: 'ITEM'+Math.random().toString(36).substr(2, 9),
                                encodedImage: action.payload.encodedImage
                            } as TierItem]
                        }
                    }
                    return tier;
                })
        };
        case "REMOVE_TIER":
            return {
                ...state,
                tiers: state.tiers.filter((tier, index) => index !== action.payload.tierIndex)
        };
        case "REMOVE_ITEM":
            return {
                ...state,
                tiers: state.tiers.map((tier, index) => {
                    if (tier.items.filter((item, itemIndex) => itemIndex !== action.payload.itemIndex).length !== tier.items.length - 1) {
                        console.log("Removing item " + action.payload.itemIndex + " from tier " + index)
                    }
                    return index === action.payload.tierIndex ? {
                        ...tier,
                        items: tier.items.filter((item, itemIndex) => itemIndex !== action.payload.itemIndex)
                    } : tier;
                })
            };


        case "UPDATE_TIER_NAME":
            return {
                ...state,
                tiers: state.tiers.map((tier, index) => {
                    if (index === action.payload.tierIndex) {
                        return {
                            ...tier,
                            name: action.payload.name
                        }
                    }
                    return tier;
                })
        };
        case "UPDATE_TIER_COLOR":
            return {
                ...state,
                tiers: state.tiers.map((tier, index) => {
                    if (index === action.payload.tierIndex) {
                        return {
                            ...tier,
                            color: action.payload.color
                        }
                    }
                    return tier;
                })
        };
        case "UPDATE_TIERS":
            return {
                ...state,
                tiers: action.payload.tiers
        };
        case "DRAG_DROP_ITEM":
            return {
                ...state,
                tiers: state.tiers.map((tier, index) => {
                    if (index === action.payload.tierIndex) {
                        return {
                            ...tier,
                            items: action.payload.newItems
                        }
                    }
                    return tier;
                })
        };
        case "UPDATE_TIERLIST_NAME":
            return {
                ...state,
                name: action.payload.name
            }
        default:
            return state;
    }
}

export default tierListReducer;
