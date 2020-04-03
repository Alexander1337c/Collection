import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

import './Register.css'

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Пароли не совпадают', 'danger')
        }
        else {
            register({ name, email, password })
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Fragment>
            <h1 className="register">Регистрация</h1>
            <div className="card">
                <h5 className="card-title"><i className="fas fa-user"></i>Регистрация пользователя</h5>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={e => onChange(e)}
                            required
                        />
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">Имя</span>
                        </label>
                    </div>
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
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="password2"
                            value={password2}
                            onChange={e => onChange(e)}
                            required />
                        <label htmlFor="password" className="label-name">
                            <span className="content-name">Подтверждение пароля</span>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-info" value='Register'>Регистрация</button>
                    <p className='my-1'>
                        Уже есть аккаунт? <Link className="log" to='/login'>Войти</Link>
                    </p>
                </form>

            </div>

        </Fragment>

    )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, register })(Register)