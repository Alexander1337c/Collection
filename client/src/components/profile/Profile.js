import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spiner from '../Layout/Spiner'
import ProfileTop from './ProfileTop'
import { getProfileById } from '../../actions/profile'
import ProfileTable from './ProfileTable'
import Comments from './Comments'
import CommentItem from './CommentItem'

const Profile = ({
    getProfileById,
    profile: { profile, loading },
    match
}) => {
    const nullProfile = !profile;
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id, nullProfile]);
    return (
        <Fragment>
            {profile === null || loading ? <Spiner /> : <Fragment>
                <div className='profile-grid my-1'>
                    <ProfileTop profile={profile} />

                    <div className='profile-grid'>
                        <h3 className='item'>Айтемы</h3>
                        <div className='grid-wrap'>
                            {profile.item.length > 0 ? (
                                <Fragment>
                                    {profile.item.map(item => (
                                        <ProfileTable
                                            key={item._id}
                                            item={item}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                    <h4>Нет...</h4>
                                )}
                        </div>

                    </div>

                </div>
                <Comments profileId={profile._id} />
                <div className='comments'>
                    {profile.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} profileId={profile._id} />
                    ))}
                </div>

                <Link to='/profiles' className='btn btn-light'>
                    Назад
                </Link>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(Profile);
