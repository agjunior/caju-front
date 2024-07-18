import { createContext, useState, useCallback } from "react";

type TModalContext = {
    isOpen: boolean,
    message?: string;
    onConfirm: () => void;
    openModal: (onConfirm: () => void, message?: string) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<TModalContext>({
    isOpen: false,
    message: '',
    onConfirm: () => {},
    openModal: () => {},
    closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState<() => void>(() => { });

    const openModal = useCallback((onConfirmCallback: () => void, message?: string) => {
        if (message) setMessage(message);
        setOnConfirm(() => onConfirmCallback);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setMessage('');
        setOnConfirm(() => { });
    }, []);

    return (
        <ModalContext.Provider value={{ isOpen, message, onConfirm, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};