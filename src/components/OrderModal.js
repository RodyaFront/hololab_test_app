import {useEffect, useRef, useState} from "react";
import OrderForm from "./OrderForm";

function OrderModal({dialog, formData}) {
    const modalRef = useRef(null)
    const [modalState, setModalState] = useState(false)

    function closeModal() {
        modalRef.current
            .dispatchEvent(getCloseModalEvent())
    }

    useEffect(()=> {
        setModalState(dialog)
        if(!dialog){
            return window.removeEventListener('keydown', handleModalKeydown)
        }
        window.addEventListener('keydown', handleModalKeydown)
    }, [dialog])

    function handleModalKeydown(e) {
        if(e.keyCode === 27) closeModal()
    }

    function getCloseModalEvent() {
        return new CustomEvent('closeModal',{bubbles: true})
    }

    return (
        <div className={`modal ${modalState ? 'active' : ''}`} ref={modalRef}>
            <div className="modal__inner">
                <div className="modal__close" onClick={closeModal}/>
                <div className="modal__type">{formData?.category}</div>
                <div className="modal__title">{formData?.name}</div>
                <div className="modal__price price-value">{formData?.price}</div>
                <OrderForm reset={dialog}/>
            </div>
        </div>
    )
}

export default OrderModal