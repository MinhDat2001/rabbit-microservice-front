import {Cart} from "../pages/cart"
import { Product } from "../pages/product"
import {ListProduct} from "../pages/listProduct"
import {Layout} from "../layout"
const userRoute = [
    { path: '/cart', component: Cart, Layout:Layout  },
    { path: '/product/*', component: Product, Layout:Layout  },
    { path: '', component: ListProduct, Layout:Layout  }

]

export {userRoute}