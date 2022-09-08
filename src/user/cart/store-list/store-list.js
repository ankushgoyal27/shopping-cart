import { useEffect, useState } from "react";
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import AddStore from "./add-store/add-store";
import ViewStore from "./view-store/view-store";
import { db } from "../../../firebaseConfig";

const StoreList = props => {

    const [storeList, setStoreList] = useState([]);

    useEffect(() => {
        console.log("useEffect")
        const q = query(collection(db, 'cart'))
        onSnapshot(q, (querySnapshot) => {
            setStoreList(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    const addNewStore = async (name) => {
        try {
            console.log(name);
            await addDoc(collection(db, 'cart'), {
                "storeName": name,
                "desired": []

            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleViewItemList = (id) => {
        props.onStoreItemView(storeList.filter(item => item.id === id)[0]);

    }

    return (
        <>
            <AddStore onAddStore={addNewStore} />
            <ViewStore list={storeList} onViewItemList={handleViewItemList} />
        </>
    )
}

export default StoreList;