import TierInterface from "../interfaces/Tier";
import {Session} from "next-auth";
type TierListProps = {
    tierListObject: { id?:string, name: string, media:string, tiers: TierInterface[] };
    session: Session|null;
    editable: boolean;
    validateCallback: (tierListObject: { name: string, media:string, tiers: TierInterface[] }) => void;


}

export default TierListProps;
