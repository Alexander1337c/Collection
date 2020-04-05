import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
            totalResults: 0,
            totalPages: 0,
            currentPageNo: 0,
        };

        this.cancel = '';
    }
    SearchResult = (query) => {
        const searchUrl = `http://localhost:3000/profile/${query}`;
        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        })
            .then(res => {
                const total = res.data.total;
                const totalPagesCount = this.getPageCount(total, 20);
                const resultNotFoundMsg = !res.data.hits.length
                    ? 'There are no more search results. Please try a new search'
                    : '';
                    console.log(res)
                this.setState({
                    results: res.data.hits,
                    message: resultNotFoundMsg,
                    totalResults: total,
                    totalPages: totalPagesCount,
                    loading: false
                })
            })
            .catch(error => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch the data. Please check network'
                    })
                }
            })
    }

    handleOnInputChange = (event) => {
        const query = event.target.value;
        if (!query) {
            this.setState({ query, results: {}, message: '', totalPages: 0, totalResults: 0 });
        } else {
            this.setState({ query, loading: true, message: '' }, () => {
                this.SearchResult( query);
            });
        }
    };
    render() {
        const { query } = this.state
        return (
            <form className="form-inline my-2 my-lg-0 ml-auto">
                <div className="wrapper">
                    <input
                        className="form-control mr-sm-2"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        name='query'
                        value={query}
                        onChange={this.handleOnInputChange}
                    />
                    <label className="label-line"></label>
                    <Link className="search-btn" to="#">
                        <i className="fas fa-search"></i>
                    </Link>
                </div>
            </form>
        )
    }
}

export default Search