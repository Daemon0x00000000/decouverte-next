"use client";
import {useState} from "react";
import styles from "styles/Modal.module.css";
import {FaPlusCircle} from "react-icons/fa";
import {createPortal} from "react-dom";

type ModalProps = {
    children: any,
    title: string,
    successCallback: () => void
}

export default function Modal({children, title, successCallback}: ModalProps) {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle] = useState(title);
    const [modalContent] = useState(children);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const onModalClose = () => {
        closeModal();
    }

    const onModalSuccess = () => {
        successCallback();
        closeModal();
    }

    return (
        <>
            <button className={`${styles.modalButton} ${styles.btnAdd}`} onClick={openModal}><FaPlusCircle size={30}/><span className={styles.btnAddText}>{title}</span></button>
            {createPortal(
                <div className={styles.modal} style={{display: showModal ? "block" : "none"}} onClick={e => {
                    if (e.target === e.currentTarget) {
                        closeModal();
                    } else {
                        e.stopPropagation();
                    }
                }}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>{modalTitle}</h2>
                            <span className={styles.close} onClick={onModalClose}>&times;</span>
                        </div>
                        <div className={styles.modalBody}>
                            {modalContent}
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.modalButton} onClick={onModalClose}>Annuler</button>
                            <button className={styles.modalButton} onClick={onModalSuccess}>Valider</button>
                        </div>
                    </div>
                </div>
                , document.body
            )}

        </>
    );
}
