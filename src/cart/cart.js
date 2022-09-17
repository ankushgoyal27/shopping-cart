import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import ShoppingList from "./shopping-list/shopping-list";
import StoreList from "./store-list/store-list";

const Cart = () => {

    const [storeView, setStoreView] = useState({});

    const storeItemView = view => {
        setStoreView(view);
    }

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            console.log(JSON.stringify(user.uid))
        } else {
            navigate('/signin')
        };
    }, [user, navigate])

    const handleLogout = () => {
        signOut(auth);
    }

    return (
        <>
            <button type="button" onClick={handleLogout}>Logout</button>
            {!storeView.hasOwnProperty('id') && <StoreList onStoreItemView={storeItemView} />}
            {storeView.hasOwnProperty('id') && <ShoppingList itemList={storeView} />}
        </>
    )
}

export default Cart;