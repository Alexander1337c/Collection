import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { addLike, removeLike } from '../../actions/profile'
import './ProfileItem.css'
import { connect } from 'react-redux'

const ProfileItem = ({
    addLike,
    removeLike,
    profile: {
        user: { _id, name, avatar },
        descr,
        title,
        file: { data },
        likes,
        comments
    },
    auth
}) => {
    return (
        <div className='profile-wrap'>
            <div className='profile'>
                <div className='img-coll'>
                    <img className="sizeIMG" src={`data:image/*;base64,${data}`} alt={data.name} />
                </div>

            </div>
            <div className='text'>
                <p>Название: <span>{title.slice(0, 15)}</span> </p>
                <p>Автор: <span>{name}</span></p>
                <p>Описание: <span>{descr.slice(0, 15)}...</span></p>
                <Link to={`/profile/${_id}`} className='btn btn-primary my-primary'>
                    Посмотреть
        </Link>
                <div className='footer-card'>
                    <div className='comments'>
                        Комментарии {' '}
                        {comments.length > 0 && (
                            <span className='comment-count'>{comments.length}</span>
                        )}
                    </div>
                    <div className='like'>
                        <button onClick={e => addLike(_id)} type='button'>
                            <i className='fas fa-thumbs-up' />{' '}
                            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                        </button>
                        <button onClick={e => removeLike(_id)} type='button'>
                            <i className='fas fa-thumbs-down' />
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike })(ProfileItem)
