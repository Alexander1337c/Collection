import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Spiner from '../Layout/Spiner'
import { connect } from 'react-redux'
import ProfileItem from './ProfileItem'
import { getProfiles } from '../../actions/profile'
import './ProfileItem.css'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles()
    }, [getProfiles])

    return (
        <div className="container">
            {loading ? (
                <Spiner />
            ) : (
                    <Fragment>
                        <h1 className='large '>Коллекции</h1>
                        <div className='profiles'>
                            {profiles.length > 0 ? (
                                profiles.map(profile => (
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                            ) : (
                                    <Spiner />
                                )}
                        </div>
                    </Fragment>
                )}
        </div>

    )

}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getProfiles }
)(Profiles);
