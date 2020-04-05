import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Search from './Search'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import './Navbar.css'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard"><i class="far fa-file-alt"></i>Коллекции</NavLink>
            </li>
            <li className="nav-item">
                <a className="logout" onClick={logout} href='/login'>Выйти
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Регистрация<span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Вход</NavLink>
            </li>
        </ul>
    )
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Collections</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Search />
                {!loading && (
                    <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                )}
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)