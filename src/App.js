import ProductCard from "./components/ProductCard";
import OrderModal from "./components/OrderModal";
import {useEffect, useRef, useState} from "react";
import {productCardsController} from "./services/productCardsController";


function App() {
    const appRef = useRef(null)
    const [dialog, setDialog] = useState(false)
    const [cards, setCards] = useState([])
    const [modalData, setModalData] = useState({})
    useEffect(async () => {
        appRef.current.addEventListener('openModal', (event) => handleModalEvent(true, event))
        appRef.current.addEventListener('closeModal', () => handleModalEvent(false))
        setCards(await productCardsController.getCards())
    }, [])

    function handleModalEvent(state, event) {
        if(event?.detail) {
            setModalData(event.detail)
        }
        setDialog(state)
    }

    function handleBuyCheapest() {
        const cheapest = cards.reduce((cheapest, product) => {
            if(product.price < cheapest.price) {
                return product
            }
            return cheapest
        },cards[0])

        setDialog(true)
        setModalData(cheapest)
    }

    return (
        <div className="App" ref={appRef}>
            <div className="container">
                <section className='product-card-container'>
                    {cards?.map(card => <ProductCard product={card} key={card.id}/>)}
                </section>
                <div className="buy-cheapest-btn">
                    <div className="button reverse" onClick={handleBuyCheapest}>Buy cheapest</div>
                </div>
            </div>
            <OrderModal dialog={dialog} formData={modalData}/>
        </div>
    );
}

export default App;
