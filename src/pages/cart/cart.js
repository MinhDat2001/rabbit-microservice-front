function CartItem({ cart }) {
    <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
            <div>
                <img
                    src={cart.product.images[0].image}
                    className="img-fluid rounded-3" alt="Shopping item" style={{ width: "65px" }} />
            </div>
            <div className="ms-3">
                <h5>{cart.product.name}</h5>
            </div>
        </div>
        <div className="d-flex flex-row align-items-center">
            <div style={{ width: "50px" }}>
                <h5 className="fw-normal mb-0">{cart.quantity}</h5>
            </div>
            <div style={{ width: "80px" }}>
                <h5 className="mb-0">{cart.product.price}</h5>
            </div>
            <a href="#!" style={{ color: "#cecece" }}><i className="fas fa-trash-alt"></i></a>
        </div>
    </div>
}
export {CartItem}