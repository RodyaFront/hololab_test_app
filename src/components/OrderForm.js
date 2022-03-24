import {useEffect, useRef, useState} from "react";

function OrderForm({reset}) {
    const formRef = useRef(null)
    const initialValidation = {
        name: {},
        number: {},
    }
    const initialFormData = {
        name: '',
        number: '',
    }
    const validationRules = {
        name: {type: 'string'},
        number: {type: 'number'}
    }
    const [validation, setValidation] = useState(initialValidation)
    const [formData, setFormData] = useState(initialFormData)

    useEffect(() => {
        const isModalClosing = !reset
        if (isModalClosing) restFormData()
    }, [reset])

    function restFormData() {
        setFormData(initialFormData)
        setValidation(initialValidation)
    }

    function validateOnBlur({target}) {
        const {name: inputName} = target
        const newValidation = {...validation}
        const value = formData[inputName]
        const rules = validationRules[inputName]

        newValidation[inputName].valid = checkValueValidity(value, rules)
        newValidation[inputName].empty = !checkValueValidity(value, rules) && value === ''
        newValidation[inputName].touched = true

        if (value === '') {
            newValidation[inputName].valid = true
        }

        setValidation(newValidation)
    }

    function checkValueValidity(value, rules) {
        if (value === '') {
            return false
        }

        if (rules.type === 'string') {
            return validateStringValue(value)
        }
        if (rules.type === 'number') {
            return validateNumberValue(value)
        }

        return false
    }

    function validateStringValue(value) {
        const haveNumbers = value.search(/\d/) !== -1
        return !haveNumbers;

    }

    function validateNumberValue(value) {
        const reg = new RegExp('^[0-9]+$');
        const haveOnlyNumbers = reg.test(value)
        return haveOnlyNumbers;

    }

    function handleSubmitOrder() {

        if (isFormValid()) submitOrder()
    }

    function dispatchCloseModal() {
        formRef.current
            .dispatchEvent(new CustomEvent('closeModal', {bubbles: true}))
    }

    function submitOrder() {
        dispatchCloseModal()
    }

    function isFormValid() {
        const newValidation = {...validation}
        let isValid = true;
        for (const key of Object.keys(validation)) {
            const value = formData[key]
            const rules = validationRules[key]
            if (value === '') {
                newValidation[key].empty = true
                newValidation[key].touched = true
            }
            newValidation[key].valid = checkValueValidity(value, rules)

            if (isValid) {
                isValid = newValidation[key].valid
            }
        }
        setValidation(newValidation)
        return isValid
    }

    return (
        <div className="modal__form form" ref={formRef}>
            <div className='form__item'>
                <input
                    type="text"
                    placeholder='Name'
                    name="name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    onBlur={validateOnBlur}
                />
            </div>
            {validation?.name?.empty && validation?.name?.touched &&
                <div className="form__error">This field is required.</div>}
            {!validation?.name?.valid && validation?.name?.touched &&
                <div className="form__error">Only letters allowed.</div>}
            <div className='form__item'>
                <input
                    type="text"
                    placeholder='Number'
                    name="number"
                    value={formData.number}
                    onChange={e => setFormData({...formData, number: e.target.value})}
                    onBlur={validateOnBlur}
                />
            </div>
            {validation?.number?.empty && validation?.number?.touched &&
                <div className="form__error">This field is required.</div>}
            {!validation?.number?.valid && validation?.number?.touched &&
                <div className="form__error">Only numbers allowed.</div>}
            <div className="form__button" onClick={handleSubmitOrder}><span>Order</span></div>
        </div>
    )
}

export default OrderForm