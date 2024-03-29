import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const NavBar = ({user}) => {
    return ( 
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Vidly</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/movies">Movies</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/customers">Customers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
              </li>
              {!user && 
              <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
              </React.Fragment>}
              {user && 
              <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">{user.name}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
              </li>
              </React.Fragment>}
            </ul>
          </div>
        </div>
      </nav>
     );
}
 
export default NavBar;