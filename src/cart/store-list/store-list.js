import { useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, runTransaction, where, documentId, getDoc } from 'firebase/firestore';
import AddStore from "./add-store/add-store";
import ViewStore from "./view-store/view-store";
import { auth, db } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const StoreList = props => {

    const [storeList, setStoreList] = useState([]);
    const [user] = useAuthState(auth);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        const fetchStoreData = async () => {
            if (user?.email) {
                const userStoreRef = doc(db, "userStores", user?.email);
                const userStoreDoc = await getDoc(userStoreRef);

                if (userStoreDoc.data()?.ids.length) {
                    const q = query(collection(db, 'stores'),
                        where(documentId(), "in", userStoreDoc.data()?.ids))
                    onSnapshot(q, (querySnapshot) => {
                        setStoreList(querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })))
                    })
                }
            }
        }
        if (status) {
            fetchStoreData();
        }
    }, [user, status])

    const handleAddNewStore = async (name) => {
        try {
            setStatus(false);
            await runTransaction(db, async (transaction) => {
                const userStoresRef = doc(db, "userStores", user.email);
                const userStoresInfo = await transaction.get(userStoresRef);

                let userStores = [];
                if (userStoresInfo.data()?.ids.length) {
                    userStores = userStoresInfo.data()?.ids;
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
                setStatus(true);
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