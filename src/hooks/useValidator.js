import {useState} from "react";

function useValidator() {
    const [touched, setTouched] = useState(null)
    const [required, setRequired] = useState(null)
    const [valid, setValid] = useState(null)

    function reset() {
        setTouched(null)
    }

    return {touched, required, valid, reset}
}

export default useValidator