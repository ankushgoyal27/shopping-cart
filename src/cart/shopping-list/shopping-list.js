import { useEffect, useState } from "react";
import AddItem from "./add-item/add-item";
import ListItem from "./item-list/item-list";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

const ShoppingList = props => {

    const [storeData, setStoreData] = useState([]);
    const [status, setStatus] = useState(true);


    useEffect(() => {
        const fetchData = async () => {

            const docRef = doc(db, "cart", props.itemList.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data())
                setStoreData(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        if (status) {
            fetchData();
        }
    }, [props.itemList.id, status]);

    const addItemInList = async (item) => {
        try {
            const docRef = doc(db, "cart", props.itemList.id);
            await updateDoc(docRef, {

                "desired": arrayUnion({
                    itemName: item.itemName,
                    category: item.category,
                    quantity: item.quantity,
                    unit: item.unit,
                    pricePerUnit: item.pricePerUnit,
                    date: new Date()
                })

            })
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItemFromList = async (index) => {
        try {
            setStatus(false);
            const data = storeData.desired[index];
            const docRef = doc(db, "cart", props.itemList.id);
            await updateDoc(docRef, {

                "desired": arrayRemove(data)

            }).then(() => {
                setStatus(true);
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {/* <AddItem onAddItem={addItemInList} />
            <ListItem list={itemList} onDeleteItem={deleteItemFromList} /> */}

            <AddItem onAddItem={addItemInList} />
            {
                storeData.desired?.length > 0 &&
                <ListItem list={storeData.desired} data={storeData.desired} onDeleteItem={deleteItemFromList} />
            }
        </>
    )
}

export default ShoppingList;