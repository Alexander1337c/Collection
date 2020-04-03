import React from 'react';
import PropTypes from 'prop-types';
import './ProfileTop.css'

const ProfileTop = ({
    profile: {
        user: { name },
        title,
        descr,
        file: { data }
    }
}) => {
    return (
        <div>
            <h2>Автор: <span>{name}</span></h2>
            <div className='wrap-top'>
                <div className='img-top'>
                    <img className="sizeIMG" src={`data:image/*;base64,${data}`} alt={data.name} />
                </div>
                <div className='text-top'>
                    <div className='text-title'>
                        <h2>Название: <span>{title}</span></h2>
                    </div>
                    <div className='text-name'>
                        <p>Описание: <span>{descr}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop;