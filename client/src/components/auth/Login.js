import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

import './Register.css'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password)
    }


    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Fragment>
            <h1 className="register">Вход</h1>
            <div className="card">
                <h5 className="card-title"><i className="fas fa-user"></i>Вход в аккаунт</h5>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            required />
                        <label htmlFor="email" className="label-name">
                            <span className="content-name">Email</span>
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            required />
                        <label htmlFor="password" className="label-name">
                            <span className="content-name">Пароль</span>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-info" value='Login'>Войти<i className="fas fa-sign-in-alt" /></button>
                    <p className='my-1'>
                        Нет аккаунта? <Link className="log" to='/register'>Регистрация</Link>
                    </p>
                </form>
            </div>
        </Fragment>

    )
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)