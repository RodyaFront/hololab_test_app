import {useEffect, useRef, useState} from "react";
import OrderForm from "./OrderForm";

function OrderModal({dialog, formData}) {
    const modalRef = useRef(null)
    const MODAL_INNER_CLASS = 'modal-window'
    const [modalState, setModalState] = useState(false)

    useEffect(()=>{
        modalRef.current.onclick = handleModalOutsideClick
    },[])

    useEffect(()=> {
        setModalState(dialog)
        if(!dialog){
            return window.removeEventListener('keydown', handleModalKeydown)
        }
        window.addEventListener('keydown', handleModalKeydown)
    }, [dialog])

    function handleModalOutsideClick(e) {
        const {path} = e

        const clickInside = path.reduce((reducer, current) => {
            const containsInnerModal = !!current?.classList?.contains(MODAL_INNER_CLASS)
            if(containsInnerModal){
                return reducer = containsInnerModal
            }
            return reducer
        },false)

        if(!clickInside) {
            closeModal()
        }
    }

    function closeModal() {
        modalRef.current
            .dispatchEvent(getCloseModalEvent())
    }

    function handleModalKeydown(e) {
        if(e.keyCode === 27) closeModal()
    }

    function getCloseModalEvent() {
        return new CustomEvent('closeModal',{bubbles: true})
    }

    return (
        <div className={`modal ${modalState ? 'active' : ''}`} ref={modalRef}>
            <div className={`modal__inner ${MODAL_INNER_CLASS}`}>
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