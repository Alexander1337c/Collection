import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spiner from '../Layout/Spiner'
import { searchProfiles } from '../../actions/profile'
import ProfileItem from '../profiles/ProfileItem'
import { Link } from 'react-router-dom'

const Search = ({ searchProfiles }) => {

    // const text = useRef('')

    // const onChange = e => {
    //     searchProfiles(text.current.value)
    // }

    return (
        <form className="form-inline my-2 my-lg-0 ml-auto">
            <div className="wrapper">
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    ref={text}
                // onChange={onChange}
                />

                <label className="label-line"></label>
                <Link className="search-btn" to="#">
                    <i className="fas fa-search"></i>
                </Link>
            </div>
        </form>
    )
}


Search.propTypes = {
    searchProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { searchProfiles })(Search)