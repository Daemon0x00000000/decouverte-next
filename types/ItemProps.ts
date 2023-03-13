type ItemProps = {
    id: string;
    index: number;
    encodedImage: string;
    removeCallback: (index:number) => void;
}

export default ItemProps;
