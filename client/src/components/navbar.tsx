import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
// import { IShopContext, ShopContext } from "../context/shop-context";
import { useCookies } from "react-cookie";

export const Navbar = () => {
//   const { availableMoney, isAuthenticated, setIsAuthenticated } =
//     useContext<IShopContext>(ShopContext);

//   const logout = () => {
//     setIsAuthenticated(false);
//   };

  return (
    <div className="navbar">
      
      <div className="navbarTitle">
        <h1>George Shop</h1>
      </div>
      
      <div className="navbarLinks">
            <Link to="/">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/checkout">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
      </div>

    </div>
   );
};