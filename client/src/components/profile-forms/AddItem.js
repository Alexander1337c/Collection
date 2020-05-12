import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addItem } from '../../actions/profile'
import './Additem.css'

const AddItem = ({ addItem, history }) => {
    const [formData, setFormData] = useState({
        title: '',
        file: '',
        tags: ''
    })
    const { title, file, tags } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)
        formData.append('tags', tags)
        addItem(formData, history)

    }
    console.log(formData)
    return (
        <Fragment>
            <h1 className="mt">Добавление айтема</h1>
            <form onSubmit={onSubmit}>
                <div className="wrapper-add">
                    <div className="field" >
                        <input type='file' className='input-file' name='file' onChange={(e) => {
                            setFormData({ ...formData, [e.target.name]: e.target.files[0] })
                        }} />
                        <label htmlFor='file'>Выбрать файл</label>
                    </div>
                    <div className='wrapp-input'>
                        <div className="form-input">
                            <input type="text" className="input-txt" name='title' value={title} onChange={e => onChange(e)} placeholder="Название" autoComplete='off' />
                        </div>
                        <div className="form-input">
                            <input type="text" className="input-txt" name='tags' value={tags} onChange={e => onChange(e)} placeholder="Тэги" />
                            <label htmlFor='tags' className="labelfor-tags">Тэги вписываем через запятую. Пример "Стикеры, Книги, Красный"</label>
                        </div>
                        <div className="form-input">
                            <input type="submit" className="btn btn-my" />
                        </div>
                    </div>

                </div>
            </form>
        </Fragment>
    )
}

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired
};

export default connect(
    null,
    { addItem }
)(withRouter(AddItem));
