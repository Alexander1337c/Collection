import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Spiner from '../Layout/Spiner'
import DashboardActios from './DashboardActions'
import Collection from './Collection'
import './Dashboard.css'

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    return loading && profile === null ? <Spiner /> : <Fragment>
        <h1 className='large-text'>Коллекции</h1>
        <p className='lead'><i className="fas fa-user"></i>Добро пожаловать <span className="userName">{user && user.name}</span></p>
        {profile !== null ? (
            <Fragment>
                <DashboardActios />
                <Collection item={profile.item} />
                <div className='my-2'>
                    <button className="btn btn-danger" onClick={() => deleteAccount()}><i className='fas fa-user-minus'></i>
                        Удалить аккаунт</button>
                </div>
            </Fragment>
        ) : (
                <Fragment>
                    <p>У вас пока нет коллекций. Создайте свою первую коллекцию</p>
                    <Link to='/create-profile' className="btn btn-primary my-1">
                        Создать коллекцию
                    </Link>
                </Fragment>)}
    </Fragment>



}
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)