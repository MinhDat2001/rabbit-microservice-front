import './index.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Cart(){
  let carts = [];   
  const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    var headers = {
        'token': token
    }
  const [data, setData] = useState([]);
  const [stories, setStories] = useState([]);

   // initialize array that will contain object from nested axios requests
   let newStories = [];
  useEffect(() => {
      const getCart=async ()=>{
      const u = await axios.get("http://localhost:8088/api/cart", {
        headers:headers
      })
      .then(async (response) => {
              const datas=response.data;

            return  Promise.all(
                datas.map(element => 
                  {
                   return  axios
                        .get(
                           `http://localhost:8088/api/product/${element.productId}`)
                        .then(result => {
                           const cartDetail=
                                    { username:element.userName,
                                      quantity: element.quantity,
                                      status: element.status,
                                      product:result.data
                                    }
            
                           return cartDetail;
                        })
                        .catch(err => {
                           console.log(err);
                        });
                  })
      
              )
          
      })
      setData(u)
      }
      getCart()
  }, []);


    return (<section className="h-100 h-custom">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
  
              <div className="row">
  
                <div className="col-lg-7">
  
                  <div className="card mb-3">
                    <div className="card-body">

                    {data.map(() => (
                            <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                  className="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}}/>
                              </div>
                              <div className="ms-3">
                                <h5>{data.length}</h5>
                                <p className="small mb-0">256GB, Navy Blue</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{width: "50px"}}>
                                <h5 className="fw-normal mb-0">2</h5>
                              </div>
                              <div style={{width: "80px"}}>
                                <h5 className="mb-0">$900</h5>
                              </div>
                              <a href="#!" style={{color: "#cecece"}}><i className="fas fa-trash-alt"></i></a>
                            </div>
                          </div>
                    ))}
                      
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
  
                  <div className="card bg-primary text-white rounded-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Card details</h5>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                          className="img-fluid rounded-3" style={{width: "45px"}} alt="Avatar"/>
                      </div>

                      <form className="mt-4">
                        <div className="form-outline form-white mb-4">
                          <input type="text" id="typeName" className="form-control form-control-lg" siez="17"
                            placeholder="Họ tên" />
                          <label className="form-label">Họ tên</label>
                        </div>
  
                        <div className="form-outline form-white mb-4">
                          <input type="text" id="typeText" className="form-control form-control-lg" siez="17"
                            placeholder="Địa chỉ" minLength="1" maxLength="50" />
                          <label className="form-label">Địa chỉ</label>
                        </div>
  
                        <div className="form-outline form-white mb-4">
                          <input type="text" id="typeText" className="form-control form-control-lg" siez="17"
                            placeholder="Số điện thoại" minLength="7" maxLength="12" />
                          <label className="form-label">Số điện thoại</label>
                        </div>
  
                      </form>
  
                      <hr className="my-4"/>
  
                      <div className="d-flex justify-content-between mb-4">
                        <p className="mb-2">Tổng tiền</p>
                        <p className="mb-2">$4818.00</p>
                      </div>
  
                      <button type="button" className="btn btn-info btn-block btn-lg">
                        <div className="d-flex justify-content-between">
                          <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                        </div>
                      </button>
  
                    </div>
                  </div>
  
                </div>
  
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>);
}

export {Cart}