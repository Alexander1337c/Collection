import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment';
import { connect } from 'react-redux'
import { deleteItem } from '../../actions/profile'
import './Collection.css'

const Collection = ({ item, deleteItem }) => {

    const items = item.map((i, index) => (
        <tr key={i._id}>
            <td>{index + 1}</td>
            <td><img className="sizeIMG" src={`data:image/*;base64,${i.file.data}`} alt={i.file.name} /></td>
            <td>{i.title}</td>
            <td>{i.tags}</td>
            <td><Moment format="DD/MM/YYYY">{moment.utc(i.date)}</Moment></td>
            <td><button className='btn btn-outline-danger' onClick={() => deleteItem(i._id)}>Удалить</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className='my-2' style={{ marginTop: '15px' }}>Айтемы</h2>
            <table className='table'>
                <thead style={{ textAlign: 'center' }} >
                    <tr>
                        <th>№</th>
                        <th style={{ width: '0.1em' }}>Изображение</th>
                        <th>Название</th>
                        <th>Тэги</th>
                        <th>Дата создания</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>{items}</tbody>
            </table>
        </Fragment>
    )
}

Collection.propTypes = {
    item: PropTypes.array.isRequired,
    deleteItem: PropTypes.func.isRequired
}

export default connect(null, { deleteItem })(Collection)
