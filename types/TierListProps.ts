import TierInterface from "../interfaces/Tier";
type TierListProps = {
    tierListObject: { id?:string, name: string, media:string, tiers: TierInterface[] };
    editable: boolean;
    validateCallback: (tierListObject: { name: string, media:string, tiers: TierInterface[] }) => void;


}

export default TierListProps;
