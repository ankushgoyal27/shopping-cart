import { useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, runTransaction, where, documentId } from 'firebase/firestore';
import AddStore from "./add-store/add-store";
import ViewStore from "./view-store/view-store";
import { auth, db } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const StoreList = props => {

    const [storeList, setStoreList] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        //if (user?.stores) {
        const q = query(collection(db, 'stores'),
            where(documentId(), "in", ["WQzLSIVVfSItBIARFQbU", "AFdvE1AF27Zj0VTjoR1r"]))
        onSnapshot(q, (querySnapshot) => {
            setStoreList(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        //}
    }, [])

    const handleAddNewStore = async (name) => {
        try {
            await runTransaction(db, async (transaction) => {
                const userStoresRef = doc(db, "userStores", user.email);
                const userStoresInfo = await transaction.get(userStoresRef);

                let userStores = [];
                if (userStoresInfo?.ids) {
                    userStores = userStoresInfo?.ids;
                }
                console.log(userStores);

                const addStoreRef = doc(collection(db, 'stores'));
                await transaction.set(addStoreRef, {
                    "storeName": name,
                    "desired": [],
                    "sharedWith": [user.email]
                });
                console.log(addStoreRef.id);

                userStores.push(addStoreRef.id);
                await transaction.update(userStoresRef, {
                    "ids": userStores
                })

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
            <AddStore onAddStore={handleAddNewStore} />
            <ViewStore list={storeList} onViewItemList={handleViewItemList} />
        </>
    )
}

export default StoreList;