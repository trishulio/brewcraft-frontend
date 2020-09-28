import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';


export const ModalActionUI = ({onSubmit}) => {
    const [el, setEl] = useState(null);


    useEffect(() => {
        const interval = setInterval(() => {
            const element = document.getElementsByClassName('modal-footer')[0];
            if (element) {
                setEl(element);
                clearInterval(interval)
            }
        }, 50);
    }, []);

    if (el === null) {
        return el;
    }

    return ReactDOM.createPortal(
        <Button onClick={onSubmit}>Submit</Button>,
        el
    );
}