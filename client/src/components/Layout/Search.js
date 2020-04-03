import React from 'react'
import { Link } from 'react-router-dom'


const Search = () => {
    return (
        <form className="form-inline my-2 my-lg-0 ml-auto">
            <div className="wrapper">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <label className="label-line"></label>
                <Link className="search-btn" to="#">
                    <i className="fas fa-search"></i>
                </Link>
            </div>
        </form>
    )
}
export default Search