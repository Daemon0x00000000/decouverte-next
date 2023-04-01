import TierInterface from "../interfaces/Tier";
type TierListProps = {
    tierList: { name: string, media:string, tiers: TierInterface[] };

    tierlistDispatch: any;

    editable: boolean;

    setTierListRef: (ref: Node|null) => void;

}

export default TierListProps;
