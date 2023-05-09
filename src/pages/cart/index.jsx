import './index.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const token = document.cookie
  .split('; ')
  .find((row) => row.startsWith('token='))
  ?.split('=')[1];

function Cart() {
  async function Checkout() {
    console.log(dataRef.current)
    var dataSend=[]
    dataRef.current.map((item)=>{
      dataSend.push({productId:item.product.id,
        quantity:item.quantity
      })
    })
    if (ValidateInput() === 1) {
      var headers = {
        'token': token
      }
      await axios.post("http://localhost:8088/api/order/create-order", dataSend, {
        headers: headers,
        params: { name: document.getElementById("Name").value.trim(),
                  address: document.getElementById("Address").value.trim(),
                  phone: document.getElementById("Phone").value.trim()  }
      })
        .then((response) => {
          console.log(response.data)
          console.log(dataSend)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
  }
  function ValidateInput() {
    var name = document.getElementById("Name").value.trim()
    var address = document.getElementById("Address").value.trim()
    var phone = document.getElementById("Phone").value.trim()
    if (name === "" || name === undefined || address === "" || address === undefined || phone === "" || phone === undefined) {
      window.alert("Không để trống")
      return 1
    }
    return 0
  }  
  let carts = [];
  const dataRef= useRef()
  var headers = {
    'token': token
  }
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  // initialize array that will contain object from nested axios requests
  let newStories = [];
  useEffect(() => {
    const getCart = async () => {
      const u = await axios.get("http://localhost:8088/api/cart", {
        headers: headers
      })
        .then(async (response) => {
          const datas = response.data;

          return Promise.all(
            datas.map(element => {
              return axios
                .get(
                  `http://localhost:8088/api/product/${element.productId}`)
                .then(result => {
                  const cartDetail =
                  {
                    username: element.userName,
                    quantity: element.quantity,
                    status: element.status,
                    product: result.data
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
      dataRef.current=u
    }
    getCart()
  }, []);
  useEffect(() => {
    // lấy products
    axios.get("http://localhost:8088/api/user", {
      headers: headers
    })
      .then((response) => {
        document.getElementById("Name").value=response.data.name
        document.getElementById("Address").value=response.data.address
        document.getElementById("Phone").value=response.data.phone
      })
      .catch((error) => {
        console.log(error);
      });
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

                      {data.map((item) => (
                        <div  className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <img
                                src={item.product.images[0].image ? item.product.images[0].image : ""}
                                className="img-fluid rounded-3" alt="Shopping item" style={{ width: "65px" }} />
                            </div>
                            <div className="ms-3">
                              <h5>{item.product.name}</h5>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <div style={{ width: "50px" }}>
                              <h5 className="fw-normal mb-0">{item.product.quantity}</h5>
                            </div>
                            <div style={{ width: "150px" }}>
                              <h5 className="mb-0">{item.product.price} vnđ</h5>
                            </div>
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
                        <h5 className="mb-0">Thông tin người dùng</h5>
                      </div>

                      <form className="mt-4">
                        <div className="form-outline form-white mb-4">
                          <input  type="text" id="Name" className="form-control form-control-lg"
                            placeholder="Họ tên" />
                          <label className="form-label">Họ tên</label>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <input type="text" id="Address" className="form-control form-control-lg"
                            placeholder="Địa chỉ" minLength="1" maxLength="50" />
                          <label className="form-label">Địa chỉ</label>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <input type="text" id="Phone" className="form-control form-control-lg"
                            placeholder="Số điện thoại" minLength="7" maxLength="12" />
                          <label className="form-label">Số điện thoại</label>
                        </div>

                      </form>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <p className="mb-2">Tổng tiền</p>
                        <p className="mb-2">1 000 000 vnd</p>
                      </div>

                      <button type="button" className="btn btn-info btn-block btn-lg">
                        <div className="d-flex justify-content-between">
                          <span onClick={Checkout}>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
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

export { Cart }