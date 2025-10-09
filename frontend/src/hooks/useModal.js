import { useState, useCallback } from 'react';

const useModal = () => {
    const [modals, setModals] = useState({});

    const openModal = useCallback((modalName, props = {}) => {
        setModals((prev) => ({
            ...prev,
            [modalName]: { isActive: true, props },
        }));
    }, []);

    const closeModal = useCallback((modalName, props = {}) => {
        setModals((prev) => ({
            ...prev,
            [modalName]: { isActive: false, props },
        }));
    }, []);

    const closeAllModals = useCallback(() => {
        setModals({});
    }, []);

    return [modals, openModal, closeModal, closeAllModals];
};
export default useModal;
