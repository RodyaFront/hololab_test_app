import {useState} from "react";

function useValidator(options) {
    const initialData = initializeValidatorRules(options)

    const [validator, setValidatorState] = useState(initialData)

    function initializeValidatorRules(options) {
        const rules = {
            touched: false,
        }
        if(options.required === true) {
            rules.required = null
        }
        return rules
    }

    function reset() {
        setValidator(initialData)
    }

    function setValidator() {

    }

    return [validator, setValidator, reset]
}
export default useValidator