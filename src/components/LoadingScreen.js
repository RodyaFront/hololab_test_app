import {useEffect, useRef, useState} from "react";

function LoadingScreen() {
    const loadingRef = useRef(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 1500)
    }, [])
    return (
        <div className={`loading-screen ${loading ? 'show' : ''}`} ref={loadingRef}>
            <div className="loading-screen__items">
                <div className="item"/>
                <div className="item"/>
            </div>
        </div>
    )
}

export default LoadingScreen