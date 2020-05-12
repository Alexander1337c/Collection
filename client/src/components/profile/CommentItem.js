import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/profile'
import './Comments.css'

const CommentItem = ({
    profileId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment
}) => {
    return (
        <div className='post-item'>
            <div className='profile-item'>
                <Link to={`/profile/${user}`}>
                    <img className='round-img' src={avatar} alt={name} />
                    <p className='name'>{name}</p>
                </Link>
            </div>
            <div className='profile-item-text'>
                <p className='post-date'>
                    Дата: <Moment format='DD/MM/YYYY'>{date}</Moment>
                </p>
                <p className='my-1'>{text}</p>
            </div>


            {auth.isAuthenticated !== true || user === auth.user._id && (
                <div className='delete-icon'>
                    <button
                        onClick={() => deleteComment(profileId, _id)}
                        type='button'
                        className='my-btn'
                    >
                        удалить<i className='fas fa-times' />
                    </button>
                </div>
            )}
        </div>
    )
}



CommentItem.propTypes = {
    profileId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { deleteComment }
)(CommentItem);