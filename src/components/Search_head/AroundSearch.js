import React,{ Component,useState,useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import {Redirect,Link,useParams} from 'react-router-dom';
import { useDispatch, useSelector,connect } from "react-redux";
import { set_textMate, set_textEvent } from "../../actions";
import "./style.scss";
import * as co from '../../common';

function AroundSearch(props) {
    let {pathname} = useParams() ;
    let scText = "";    
    if(pathname === "MateAround") {
        scText = props.scTextMate.split("@");
    } else if(pathname === "EventAround") {
        scText = props.scTextEvent.split("@");
    }
    const[mem_gender,setMem_gender] = useState(scText[0]);
    const[mem_ageMin,setMem_ageMin] = useState(scText[1]);
    const[mem_ageMax,setMem_ageMax] = useState(scText[2]);
    const[mem_lang,setLang] = useState(scText[3]);
    const[mem_ethn,setEthn] = useState(scText[4]);
    const[mem_distn,setDistn] = useState(scText[5]);
    const[unit,setUnit] = useState(scText[6]);
    const dispatch = useDispatch();
    const subData = () =>{
        const textArr = [mem_gender,mem_ageMin,mem_ageMax,mem_lang,mem_ethn,mem_distn,unit]; 
        if(pathname === "MateAround") {
            dispatch(set_textMate(textArr.join("@")));
        } else if(pathname === "EventAround") {
            dispatch(set_textEvent(textArr.join("@")));
        }
        props.history.push("/"+pathname);
        console.log(textArr);
    }
    return(
        <div className="SearchForm fix_layout">
        <div className="boxs">
            <span className="can_bnt" onClick={()=>props.history.goBack()}><i className="fas fa-times-circle"></i></span>
            <h1 className="title">Discover Filters</h1>
            <input type="text" value={mem_ageMin} placeholder="Age Min" onChange={(e)=>setMem_ageMin(e.target.value)}/>
            <input type="text" value={mem_ageMax} placeholder="Age Max" onChange={(e)=>setMem_ageMax(e.target.value)}/>
            <input type="text" value={mem_lang} placeholder="Languege" onChange={(e)=>setLang(e.target.value)}/>
            <input type="text" value={mem_ethn} placeholder="Ethnicity" onChange={(e)=>setEthn(e.target.value)}/>
            <input type="text" value={mem_distn} placeholder="Distance" onChange={(e)=>setDistn(e.target.value)}/>
            <div className="distance_unit">
                <span className="unit_title">Gender</span>
                <div className="btn_row">
                <button className={mem_gender==="Male"?"active":"non-active"} value="Male" onClick={(e)=>setMem_gender(e.target.value)}>MALE</button>
                <button className={mem_gender==="Female"?"active":"non-active"} value="Female" onClick={(e)=>setMem_gender(e.target.value)}>FEMALE</button>
                </div>
            </div>
            <div className="distance_unit">
                <span className="unit_title">Distance Unit</span>
                <div className="btn_row">
                <button className={unit==="km"?"active":"non-active"} value="km" onClick={(e)=>setUnit(e.target.value)}>KM</button>
                <button className={unit==="mile"?"active":"non-active"} value="mile" onClick={(e)=>setUnit(e.target.value)}>MILE</button>
                </div>
            </div>
            
        </div>
        <div className="subData" onClick={()=>subData()}>Search</div>
        </div>
    )
}
let mapStateToProps = (state) =>{
    return {
        scTextMate : state.scTextMate_val.scTextMate,
        scTextEvent : state.scTextEvent_val.scTextEvent
    };
}
AroundSearch = connect(mapStateToProps)(AroundSearch);

export default AroundSearch;