import './index.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function ListProduct() {
        const [data, setData] = useState([]);
        
        useEffect(() => {
                // lấy products
                axios.get("http://localhost:8088/api/product/")
                .then((response) => {
                        console.log(response.data);
                        setData(response.data);
                })
                .catch((error) => {
                        console.log(error);
                });
                }, []);
        return (<section className="section-products">
                <div className="container">
                        <div className="row">
                                <div className="col-md-6 col-lg-4 col-xl-3" style={{display:"flex"}}>
                                        {data.map((item, index) => (
                                                <div className="single-product">
                                                        <Link to={'/product/'+item.id}>
                                                                <img className="product-img" src={item.name} />
                                                        </Link>
                                                        <div className="part-2">
                                                                <h3 className="product-title">{item.name}</h3>
                                                                <h4 className="product-price">{item.price} vnđ</h4>
                                                        </div>
                                                </div>
                                        ))}
                                </div>
                        </div>
                </div>
        </section>);
}

export { ListProduct }