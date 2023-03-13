import TierInterface from "./Tier";

interface TierListInterface {
    id?: string;
    name: string;
    tiers: TierInterface[];
}

export default TierListInterface;
