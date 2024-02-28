import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { popupsRemove } from '../state/PopUpSlice';

const usePopUp = () => {

    const state = useSelector((state: any) => state)
    const [popups, setPupUps] = useState([]);
    const [loadingPopUps, setLoadingPopUps] = useState(false);
    const popupsCollection = collection(db, "popups");
    const dispatch = useDispatch();

    const getPopups = async () => {
        setLoadingPopUps(true)

        if (state.popups.popups.length > 0) {
            setPupUps(state.popups.popups);
            setLoadingPopUps(false);
        } else {
            const data = await getDocs(popupsCollection);
            setPupUps(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoadingPopUps(false);
        }

    }

    const deletePopups = async (id) => {

        const popupsDoc = doc(db, "popups", id);
        await deleteDoc(popupsDoc);
        dispatch(popupsRemove(id));
        getPopups();

    }

    return { getPopups, deletePopups, popups, loadingPopUps }
}


export default usePopUp