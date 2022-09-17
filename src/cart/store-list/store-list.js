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
        const q = query(collection(db, 'cart'),
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


        //const userDocRef = doc(db, "user", user.uid);
        try {
            await runTransaction(db, async (transaction) => {
                //const userDoc = await transaction.get(userDocRef);
                const userDocRef = doc(db, "users", user.uid);
                const userInfo = await transaction.get(userDocRef);
                const userData = userInfo.data();
                let userStores = [];

                if (userData?.stores) {
                    userStores = userData?.stores;
                }
                console.log(userStores);

                const addStoreRef = doc(collection(db, 'cart'));
                await transaction.set(addStoreRef, {
                    "storeName": name,
                    "desired": [],
                    "sharedWith": [user.uid]
                });
                console.log(addStoreRef.id);

                userStores.push(addStoreRef.id);

                await transaction.update(userDocRef, {
                    "stores": userStores
                })

            })
        } catch (err) {
            console.log(err)
        }

        // try {
        //     console.log(name);
        //     await addDoc(collection(db, 'cart'), {
        //         "storeName": name,
        //         "desired": []

        //     })
        // } catch (err) {
        //     console.log(err)
        // }
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