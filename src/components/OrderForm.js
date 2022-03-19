import {useEffect, useState} from "react";

function OrderForm() {
    const [validation, setValidation] = useState({
        name: {},
        number: {},
    })
    const [formData, setFormData] = useState({
        name: '',
        number: '',
    })
    const validationRules = {
        name: { type: 'string' },
        number: { type: 'number' }
    }

    function handleInputBlur({target}) {
        const {name: inputName} = target
        const newValidation = {...validation}
        const value = formData[inputName]
        const rules = validationRules[inputName]

        newValidation[inputName].valid = checkValueValidity(value, rules)
        newValidation[inputName].empty = !checkValueValidity(value, rules) && value === ''
        newValidation[inputName].touched = true

        if(value === '') {
            newValidation[inputName].valid = true
        }

        setValidation(newValidation)
    }

    function checkValueValidity(value, rules) {
        if(value === '') {
            return false
        }

        if(rules.type === 'string') {
            return validateStringValue(value)
        }
        if(rules.type === 'number') {
            return validateNumberValue(value)
        }

        return false

        function validateStringValue(){
            const haveNumbers = value.search(/\d/) != -1
            if(haveNumbers) {
                return false
            }
            return true
        }
        function validateNumberValue(){
            const reg = new RegExp('^[0-9]+$');
            const haveOnlyNumbers = reg.test(value)
            if(haveOnlyNumbers) {
                return true
            }
            return false
        }
    }

    function handleSubmitOrder() {
        const newValidation = {...validation}
        for(const key of Object.keys(validation)) {
            const value = formData[key]
            const rules = validationRules[key]
            if(value === '') {
                newValidation[key].empty = true
                newValidation[key].touched = true
            }
            newValidation[key].valid =  checkValueValidity(value, rules)
        }
        setValidation(newValidation)
        console.log(newValidation)
    }

    return (
        <div className="modal__form form">
            <div className='form__item'>
                <input
                    type="text"
                    placeholder='Name'
                    name="name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    onBlur={handleInputBlur}
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
                    onBlur={handleInputBlur}
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