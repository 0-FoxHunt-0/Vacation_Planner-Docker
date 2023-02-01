import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">

            {/* <NavLink to="/">🏠 Home</NavLink>
            <span> | </span>
            <NavLink to="/list">📃 List</NavLink>
            <span> | </span>
            <NavLink to="/add">➕ Add</NavLink> */}

            <nav className="navbar navbar-dark sticky-top navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">VacationVortex</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link"
                                    aria-current="page"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/list"
                                >
                                    List
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/add"
                                >
                                    Add
                                </NavLink>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" id="searchForm">
                            <div id="searchErrorsDiv"></div>
                            <input
                                className="form-control me-2"
                                id="searchBar"
                                type="search text"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" id="searchButton" type="submit">
                                Search
                            </button>
                        </form>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link auth-link"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/register"
                                >
                                    Register
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Menu;
