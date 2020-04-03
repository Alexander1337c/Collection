import React, { useEffect, useState, useMemo, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile } from '../../actions/profile'
import './CreateProfile.css'

const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "300px",
    height: "330px",
    marginRight: "50px",
    borderWidth: 2,
    borderRadius: "0.25rem",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
};

const activeStyle = {
    borderColor: "#2196f3"
};

const acceptStyle = {
    borderColor: "#00e676"
};

const rejectStyle = {
    borderColor: "#ff1744"
};
const thumb = {
    position: "relative",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    width: "auto",
    height: 200,
    boxSizing: "border-box"
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
};
const img = {
    width: "100%"
};

const CreateProfile = ({ createProfile, history }) => {
    const [files, setFiles] = useState([]);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open
    } = useDropzone({
        accept: "image/*",
        noClick: true,
        noKeyboard: true,
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        },

    });
    const [formData, setFormdata] = useState({
        title: '',
        descr: '',
        file: ''
    })
    const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value })
    const onFileChange = e => {
        setFormdata({ ...formData, [e.target.name]: e.target.files[0] })

    }
    console.log(formData)
    const { title, descr, file } = formData


    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)
        formData.append('descr', descr)
        createProfile(formData, history)

    }


    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} alt='' />
            </div>
            {/* <i className="far fa-trash-alt" onClick={() => { deleteMode(file.id) }}></i> */}
        </div>

    ));

    useEffect(
        () => () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );
    return (
        <Fragment>
            <h1 className="mt">Добавление коллекции</h1>
            <form onSubmit={onSubmit}>
                <div className="wrapper-1">
                    <div className="field" {...getRootProps({ style })} >
                        <input {...getInputProps({ name: "file", onChange: onFileChange })} />
                        <div className="wrap-field">
                            <p>Перетащите файл сюда</p>
                            <button type="button" className="btn btn-outline-secondary" onClick={open}>Выбрать файл</button>
                            <aside className="thumbsContainer">
                                {thumbs}
                            </aside>
                        </div>

                    </div>
                    <div className="form-input">
                        <input type="text" name='title' value={title} onChange={onChange} className="input-txt" placeholder="Название коллекции" />
                        <textarea className="form-control" name='descr' value={descr} onChange={onChange} aria-label="With textarea" placeholder="Введите короткое описание"></textarea>
                        <input type="submit" className="btn btn-primary my-1" />
                    </div>
                </div>
            </form>

            <Link className='btn btn-light my-1' to='/dashboard'>
                Назад
            </Link>
        </Fragment>

    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(null, { createProfile })(withRouter(CreateProfile))
