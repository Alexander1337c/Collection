import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './ProfileItem.css'
import { connect } from 'react-redux'
import { addLike, removeLike } from '../../actions/profile'

const ProfileItem = ({
    addLike,
    removeLike,
    profile: {
        _id,
        user: { name },
        descr,
        title,
        item,
        file: { data },
        likes,
        comments
    },
    auth
}) => (
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

                <p>Айтемы: {item.length > 0 ? <span>{item.length}</span> : <span>нет</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary my-primary'>
                    Посмотреть
                    </Link>
                <div className='footer-card'>
                    <div className='comments'>
                        Комментарии: {' '}
                        {comments.length > 0 ? (
                            <span className='comment-count'>{comments.length}</span>
                        ) : (<span className='comment-count'>нет</span>)}
                    </div>
                    <div className='like'>
                        <button className='btn btn-light' onClick={() => addLike(_id)} type='button'>
                            <i className='fas fa-thumbs-up' />{' '}
                            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                        </button>
                        <button className='btn btn-light' onClick={() => removeLike(_id)} type='button'>
                            <i className='fas fa-thumbs-down' />
                        </button>
                    </div>
                </div>
            </div>
        </div >

    )

ProfileItem.defaultProps = {
    showActions: true
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
