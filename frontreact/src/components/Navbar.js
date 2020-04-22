import React from 'react';
import {withRouter,Link} from 'react-router-dom';

const Navbar = ({setSearch_query,searchItem}) => {

	return (
            <div className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">TP CryptoApp</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" type="button" href="/">Home <span class="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" type="button" href="/top5">Top 5<span class="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" type="button" href="/top20">Top 20<span class="sr-only">(current)</span></a>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"  onChange={(e)=>setSearch_query(e.target.value)}></input>
                <Link className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={searchItem} to="/search_result">Search</Link>
                </form>
            </div>
            </div>
	);
}

export default withRouter (Navbar);