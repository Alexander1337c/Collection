import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
export const DashboardActions = () => {
    return (
        <div>
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle "></i>
                Редактировать
            </Link>
            <Link to="/create-profile" className="btn btn-light">
                <i className="fas fa-plus "></i>
                Добавить колеекцию
            </Link>
            <Link to="/add-item" className="btn btn-light">
                <i className="fas fa-plus "></i>
                Добавить айтемы
            </Link>
        </div>
    )
}
export default DashboardActions