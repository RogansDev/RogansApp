import { useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { packagesRemove } from '../state/PackageSlice';

const usePackages = () => {

    const state = useSelector((state: any) => state)
    const [packages, setPackages] = useState([]);
    const [loadingPackage, setLoadingPackage] = useState(false);
    const packagesCollection = collection(db, "packages");
    const dispatch = useDispatch();

    const getPackages = async () => {
        setLoadingPackage(true)

        if (state.packages.packages.length > 0) {
            setPackages(state.packages.packages);
            setLoadingPackage(false);
        } else {
            const data : any = await getDocs(packagesCollection);
            setPackages(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
            setLoadingPackage(false);
        }

    }

    const deletePackages = async (id: any) => {

        const packagesDoc = doc(db, "packages", id);
        await deleteDoc(packagesDoc);
        dispatch(packagesRemove(id));
        getPackages();

    }

    return { getPackages, deletePackages, packages, loadingPackage }
}


export default usePackages