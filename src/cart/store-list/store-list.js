import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, runTransaction, where, documentId, getDoc } from 'firebase/firestore';
import AddStore from "./add-store/add-store";
import ViewStore from "./view-store/view-store";
import { auth, db } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
        setStatus(false);
        props.onStoreItemView(storeList.filter(item => item.id === id)[0]);
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid xs={12} md={12}>
                    <Item>
                        <AddStore onAddStore={handleAddNewStore} />
                    </Item>
                </Grid>

                <Grid xs={12} md={12}>
                    <Item>
                        <ViewStore list={storeList} onViewItemList={handleViewItemList} />
                    </Item>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default StoreList;