import {cart} from "../pages/cart"
import { product } from "../pages/product"
import {listProduct} from "../pages/listProduct"
const userRoute = [
    { path: '/cart', component: cart },
    { path: '/product/*', component: product },
    { path: '', component: listProduct }

]

export {userRoute}