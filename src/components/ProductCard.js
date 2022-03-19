function ProductCard({product}) {
    function dispatchOpenModal(e, productData){
        const event = new CustomEvent('openModal', {
            detail: productData,
            bubbles: true,
        })
        e.target.dispatchEvent(event)
    }

    return (
        <div className="product-card">
            <div className="product-card__inner">
                <div className="product-card__type">{
                    product?.category
                }</div>
                <div className="product-card__title">{product?.name}</div>
                <div className="product-card__footer">
                    <div className="product-card__price price-value">{product?.price}</div>
                    <div className="product-card__button button" onClick={(e)=>dispatchOpenModal(e,product)}>Buy</div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard