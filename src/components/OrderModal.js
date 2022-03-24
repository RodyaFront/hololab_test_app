import {useEffect, useRef} from "react";
import OrderForm from "./OrderForm";

function OrderModal({dialog, formData, switchModal}) {
    const modalRef = useRef(null)
    const MODAL_INNER_CLASS = 'modal-window'

    useEffect(()=>{
        window.addEventListener('keydown', handleModalKeydown)
        modalRef.current.onclick = handleModalOutsideClick
    },[])

    useEffect(()=> ()=>{
        window.removeEventListener('keydown', handleModalKeydown)
    }, [])

    function handleModalOutsideClick(e) {
        const {path} = e
        const clickInside = findElementInPathByClass(MODAL_INNER_CLASS, path)
        if(!clickInside) closeModal()
    }

    function findElementInPathByClass(elementClass = '', pathArr = []) {
        return pathArr.reduce((reducer, current) => {
            const containsClass = !!current?.classList?.contains(elementClass)
            if(containsClass){
                return reducer = containsClass
            }
            return reducer
        },false)
    }

    function closeModal() {
        modalRef.current.dispatchEvent(new Event('closeModal',{bubbles: true}))
    }

    function handleModalKeydown(e) {
        if(e.keyCode === 27) closeModal()
    }

    return (
        <div className={`modal ${dialog ? 'active' : ''}`} ref={modalRef}>
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