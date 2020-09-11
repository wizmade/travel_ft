import React,{ Component,useState,useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import {Redirect,Link} from 'react-router-dom';

import "./style.scss";
import * as co from '../../common';

function Search_head(props){
  return(
    <div className="Search_head">
        <Link to="/SearchForm">
            <div className="Search_bnt">
            <span><FaSearch props={props} className='FaSearch'/></span>{props.bntTag}
            </div>
        </Link>
        <button onClick={()=>props.setOrder("ac_date")} className="txet_button">Dates</button>
        <button onClick={()=>props.setOrder("ac_loc")} className="txet_button">Location</button>
        <button onClick={()=>props.setOrder("ac_idx")} className="txet_button">Lately</button>
        <button onClick={()=>props.setOrder("mem_star")} className="txet_button">Popularity</button>
    </div>
    );
}

export default Search_head;
//<button className="txet_button">recommendation</button>
