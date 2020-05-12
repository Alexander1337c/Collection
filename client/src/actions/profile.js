import axios from 'axios'
import { setAlert } from './alert'
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    UPDATE_LIKES,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SEARCH_PROFILE

} from './types'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/profile/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },

        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/profile/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Collecion Update' : 'Collection Created', 'success'))
        if (!edit) {
            history.push('/dashboard')
        }
        console.log(formData)
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
//add item
export const addItem = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const res = await axios.put('/api/profile/item', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Item добавлен', 'success'))

        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
//Delte item
export const deleteItem = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/item/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Item удален', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
//Delete Collection
export const deleteCollection = id => async dispatch => {
    if (window.confirm('Вы уверены что хотите удалить коллекцию?'))
        try {
            const res = await axios.delete(`/api/profile/${id}`)

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
            dispatch(setAlert('Коллекция удалена', 'success'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
}

//Delete Profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Вы уверены что хотите удалить аккаунт?'))
        try {
            await axios.delete('/api/profile')

            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })

            dispatch(setAlert('Ваш аккаунт удален', 'secondary'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
}

// Add comment
export const addComment = (profileId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(
            `/api/profile/comment/${profileId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Комментарий добавлен', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete comment
export const deleteComment = (profileId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/profile/comment/${profileId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Комментарий удален', 'secondary'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
export const searchProfiles = (text) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/?q=${text}`);
        dispatch({
            type: SEARCH_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};