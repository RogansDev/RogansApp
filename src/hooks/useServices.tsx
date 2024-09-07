import { useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { servicesRemove } from '../state/ServicesSlice';
import { db } from '../firebase';

const useServices = () => {

    const state = useSelector((state: any) => state)
    const [services, setServicess] = useState([]);
    const [loadingServices, setLoadingServices] = useState(false);
    const servicesCollection = collection(db, "services");
    const dispatch = useDispatch();

    const getServices = async () => {
        setLoadingServices(true)

        if (state.services.services.length > 0) {
            setServicess(state.services.services);
            setLoadingServices(false);
        } else {
            const data = await getDocs(servicesCollection);
            // @ts-ignore
            setServicess(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoadingServices(false);
        }

    }
// @ts-ignore
    const deleteServices = async (id) => {

        const servicesDoc = doc(db, "services", id);
        await deleteDoc(servicesDoc);
        dispatch(servicesRemove(id));
        getServices();

    }

    return { getServices, deleteServices, services, loadingServices }
}


export default useServices