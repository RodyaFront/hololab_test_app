import ProductCard from "./components/ProductCard";
import OrderModal from "./components/OrderModal";
import {useEffect, useRef, useState} from "react";
import {productCardsController} from "./services/productCardsController";
import CartIcon from "./components/icons/CartIcon";
import LoadingScreen from "./components/LoadingScreen";


function App() {
    const appRef = useRef(null)
    const [dialog, setDialog] = useState(false)
    const [cards, setCards] = useState([])
    const [modalData, setModalData] = useState({})
    const [cheapestBtnVisible, setCheapestBtnVisible] = useState(false)
    const [cheapestCard, setCheapestCard] = useState(null)

    useEffect(async () => {
        appRef.current.addEventListener('openModal', (event) => handleModalEvent(true, event))
        appRef.current.addEventListener('closeModal', () => handleModalEvent(false))
        const cards = await productCardsController.getCards()
        if(!cards) {
            return
        }
        setCards(fixCards(cards))
        console.log(fixCards(cards))
        setCheapestCard(getCheapestCard(cards))
    }, [])

    function handleModalEvent(state, event) {
        if(event?.detail) {
            setModalData(event.detail)
        }
        setDialog(state)
    }

    function fixCards(cards = []) {
        return cards.map((card,idx) => {
            card.id = idx
            return card
        })
    }

    function getCheapestCard(cards) {
        return cards.reduce((cheapest, product) => {
            if(product.price < cheapest.price) {
                return product
            }
            return cheapest
        },cards[0])
    }

    function handleBuyCheapest() {
        setDialog(true)
        setModalData(cheapestCard)
    }
    return (
        <div className="App" ref={appRef}>
            <LoadingScreen />
            <div className="container">
                <section className='product-card-container'>
                    {cards?.map(card => <ProductCard product={card} key={card.id}/>)}
                </section>
                <div className="buy-cheapest-btn">
                    <div className="button reverse" onClick={handleBuyCheapest}>Buy cheapest</div>
                </div>
                <div className={`buy-cheapest-btn mobile ${cheapestBtnVisible ? 'visible' : ''}`}>
                    <div className="button reverse" onClick={handleBuyCheapest}>Buy cheapest</div>
                    <div className="buy-cheapest-btn__toggle" onClick={()=>setCheapestBtnVisible(!cheapestBtnVisible)}>
                        <CartIcon width='50px' height='50px'/>
                    </div>
                </div>
            </div>
            <OrderModal dialog={dialog} formData={modalData}/>
        </div>
    );
}

export default App;
