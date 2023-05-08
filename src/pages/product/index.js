import './index.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Product(){
    var id = window.location.href.split("/")[4]
    const [data, setData] = useState({});
        
    useEffect(() => {
        axios.get("http://localhost:8088/api/product/"+id)
        .then((response) => {
                console.log("response data: "+response.data);
                setData(response.data);
        })
        .catch((error) => {
                console.log(error);
        });
    }, []);
    return (<div className="container">
    <div className="card">
        <div className="container-fliud">
            <div className="wrapper row">
                <div className="preview col-md-6">
                    
                    <div className="preview-pic tab-content">
                      <div className="tab-pane active" id="pic-1"><img src={data.images!=undefined? data.images[0].image:""} /></div>
                    </div>
                    
                </div>
                <div className="details col-md-6">
                    <h3 className="product-title">{data.name}</h3>
                    <p className="product-description">{data.description}</p>
                    <h5 className="sizes">Giá: {data.price}</h5>
                    <h5 className="sizes">Số lượng còn lại: {data.quantity}</h5>
                    <h5 className="sizes">Ngày đăng: {data.createDate}</h5>
                    <div className="action">
                        <button onClick={AddToCart} className="add-to-cart btn btn-default" type="button">add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>)
}
function AddToCart(){
    console.log("add to cart")
    var id = window.location.href.split("/")[4]
    console.log(id)
    var sendData= {
        productId: id,
        quantity: 1
    }
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    var headers = {
        'token': token
    }
    console.log(token)
    axios.post("http://localhost:8088/api/cart", sendData,{
        headers: headers
      })
    .then((response) => {
            window.alert("Thêm thành công")
            document.cookie = 'token= ' + response.data.userName;
            console.log(response)
    })
    .catch((error) => {
            console.log(error);
    });
}
export {Product}