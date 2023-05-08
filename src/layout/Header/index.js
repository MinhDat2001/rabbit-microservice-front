import './index.css';
import { Link } from 'react-router-dom';

function Header() {
    var responseHTML = (
        <div className="header">
            <div className="navbar">
                <div className="header_container">
                    <ul>
                        <li>
                            <Link to={'/'} className="navItem">
                                Cửa hàng
                            </Link>
                        </li>
                        <li>
                            <Link to={'/cart'} className="navItem">
                                Giỏ hàng
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
    return responseHTML;
}
export default Header;
