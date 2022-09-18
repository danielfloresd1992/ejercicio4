import { useState } from 'react';
import './style.css';

export const Modal = ({ keyModal, showModal, title, text }) => {

    return(
        <div className={keyModal ? 'modal' : 'modal modal-hiden'}>
            <div className="modal-contains">
                <div className='modal-head'>
                    <span className='head-title'>{title}</span>
                    <button className='head-btn'onClick={showModal}>X</button>
                </div>
                <div className="modal-text">
                    <span>{text}</span>
                </div>
                <div className="modal-containBtn">
                    <button className="modal-btn" onClick={showModal}>👍 Confirm</button>
                </div>
            </div>
        </div>
    );
};
