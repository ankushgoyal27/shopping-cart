import { useState } from "react";
import ShoppingList from "./shopping-list/shopping-list";
import StoreList from "./store-list/store-list";

const Cart = () => {

    const [storeView, setStoreView] = useState({});

    const storeItemView = view => {
        setStoreView(view);
    }

    return (
        <>
            {!storeView.hasOwnProperty('id') && <StoreList onStoreItemView={storeItemView} />}
            {storeView.hasOwnProperty('id') && <ShoppingList itemList={storeView} />}
        </>
    )
}

export default Cart;