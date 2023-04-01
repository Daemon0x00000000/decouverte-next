import TierInterface from "./Tier";

interface TierListInterface {
    id?: string;
    name: string;

    media: string;
    tiers: TierInterface[];
}

export default TierListInterface;
