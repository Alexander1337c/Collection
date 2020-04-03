import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import Spiner from '../Layout/Spiner'
import moment from 'moment';
import './ProfileTop.css'

const ProfileTable = ({
    item: {
        file: { data },
        title,
        tags
    }
}) => {

    return (
        <Fragment>

            <div className='grid'>
                <div className='img-grid'>
                    <img className="img-size" src={`data:image/*;base64,${data}`} alt={data.name} />
                </div>
                <div className='text-grid'>
                    <p>Название: <span>{title}</span> </p>
                    <p>Тэги: <span>{tags}</span></p>
                </div>
            </div>




        </Fragment>
    )
}

ProfileTable.propTypes = {
    item: PropTypes.object.isRequired
}

export default ProfileTable
