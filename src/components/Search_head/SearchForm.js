import React,{ Component,useState,useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import {Redirect,Link} from 'react-router-dom';
import { useDispatch, useSelector,connect } from "react-redux";
import { set_text } from "../../actions";
import "./style.scss";
import * as co from '../../common';

function SearchForm(props){
  const scText = props.scText.split("@");
  const[ac_title,setAc_title] = useState(scText[0]);
  const[ac_loc,setAc_loc] = useState(scText[1]);
  const[startDate,setStartDate] = useState(scText[2]);
  const[endDate,setEndDate] = useState(scText[3]);
  const dispatch = useDispatch();
  const subData = () =>{
    const textArr = [ac_title,ac_loc,startDate,endDate]; 
    dispatch(set_text(textArr.join("@")));
    props.history.push("/main");
    console.log(textArr);
  }
  return(
    <div className="SearchForm fix_layout">
      <div className="boxs">
        <Link to="/main"><span className="can_bnt"><i className="fas fa-times-circle"></i></span></Link>
        <h1 className="title">Post Search</h1>
        <input type="text" value={ac_title} placeholder="Title" onChange={(e)=>setAc_title(e.target.value)}/>
        <input type="text" value={ac_loc} placeholder="Location" onChange={(e)=>setAc_loc(e.target.value)}/>
        <input type="text" value={startDate} placeholder="StartDate" onChange={(e)=>setStartDate(e.target.value)}/>
        <input type="text" value={endDate} placeholder="EndDate" onChange={(e)=>setEndDate(e.target.value)}/>
      </div>
      <div className="subData" onClick={()=>subData()}>Search</div>
    </div>
  );
}
let mapStateToProps = (state) =>{
    return {
        scText: state.scText_val.scText
    };
}
SearchForm = connect(mapStateToProps)(SearchForm);
export default SearchForm;
//<button className="txet_button">recommendation</button>
