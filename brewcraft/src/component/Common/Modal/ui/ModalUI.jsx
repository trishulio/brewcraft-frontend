import React from 'react';
import styles from './Modal.module.css';

export const ModalUI = ({content, handleModalClose}) => {
    return <div className={styles.Modal}>
        <div className={styles['Modal-Body']}>
            <span
                onClick={handleModalClose}
                className={styles['Modal-Close']}>&times;</span>
            {content}
        </div>
    </div>
}