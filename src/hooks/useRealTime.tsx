/*eslint-disable*/
import { ref, set, remove, onValue, update, get, child } from 'firebase/database';
import { dbRealtime } from '../firebase';

const useRealtime = () => {

    const createRegister = async (title: string, body: string) => {
        const newNotificationRef = ref(dbRealtime, 'notificaciones/' + Date.now());
        set(newNotificationRef, { title, body });
    };

    const deleteRegister = async (id: string) => {
        const notificationRef = ref(dbRealtime, 'notificaciones/' + id);
        remove(notificationRef);
    };

    const readAllRegister = (callback: any) => {
        const notificationsRef = ref(dbRealtime, 'notificaciones');
        onValue(notificationsRef, (snapshot) => {
            const data = snapshot.val();
            callback(data ? data : {});
        });
    };
    
    const readAnRegister = (id: string, callback: any) => {
        const notificationRef = ref(dbRealtime, 'notificaciones/' + id);
        get(child(dbRealtime, `notificaciones/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            } else {
                callback(null);
            }
        });
    };


    const updateRegister = (id: string, title: string, body: string) => {
        const notificationRef = ref(dbRealtime, 'notificaciones/' + id);
        update(notificationRef, { title, body });
    };

    return {
        createRegister,
        deleteRegister,
        readAllRegister,
        readAnRegister,
        updateRegister,
    };
};

export default useRealtime;
