import TierInterface from "../interfaces/Tier";
type TierListProps = {
    tierList: { name: string, tiers: TierInterface[] };

    tierlistDispatch: any;

    editable: boolean;

}

export default TierListProps;
