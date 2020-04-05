import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/profile'
import './Comments.css'

const Comments = ({ profileId, addComment }) => {
    const [text, setText] = useState('')
    return (
        <div className='post-form'>
            <div className='bg-my'>
                <h3>Комментарии...</h3>
            </div>
            <form
                className='form-my'
                onSubmit={e => {
                    e.preventDefault();
                    addComment(profileId, { text });
                    setText('');
                }}
            >
                <textarea className='textArea'
                    name='text'
                    cols='30'
                    rows='5'
                    placeholder=' Оставьте комментарий'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                />
                <input type='submit' className='btn btn-dark my-1' value='Отправить' />
            </form>
        </div>
    );

}

Comments.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(Comments)
