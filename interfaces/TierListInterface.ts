import TierInterface from "./Tier";

interface TierListInterface {
    id?: string;
    name: string;

    media: string;
    tiers: TierInterface[];
    votes?: {
        points: string;
    }[];
    score?: number;
}

export default TierListInterface;
