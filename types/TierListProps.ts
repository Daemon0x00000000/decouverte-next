import TierProps from "./TierProps";
type TierListProps = {
    tierList: { name: string, tiers: TierProps[] };

    setTierList: any;

    editable: boolean;

}

export default TierListProps;
