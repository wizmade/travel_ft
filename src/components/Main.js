import React, { Component, PropTypes,useEffect,useState } from 'react';
import List_card from './List_card/';
import Search_head from './Search_head/index';
import { connect } from 'react-redux';
import {withRouter,useParams, Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { update_head,set_textMate } from "../actions";
import * as co from "../common.js";
import Axios from 'axios';
import Modal from './Modal';

function Main(props){
  const dispatch = useDispatch();
  dispatch(update_head());
  dispatch(set_textMate(""));
  const method = "app_accompany/accom_list";
  const url = co.SITE_URL+method;
  const[list,setList] = useState();
  const[order,setOrder] = useState("");
  const form = new FormData();

  useEffect(() => {
    const pram = "order="+order+"&sctext="+props.scText;
    console.log("scText "+props.scText);
    const urls = url+"?"+pram;
    
    const rs = Axios.get(urls).then(res=>{
        console.log(res.data);

        if(Array.isArray(res.data)){
            const lists = res.data.map((data,key) =>{
                if(data.ac_condition === "100") {
                    return(
                        <List_card
                            image={"http://1.234.44.171/uploads/accs/"+data.ac_img}
                            title={data.ac_title}
                            text={data.ac_loc}
                            date={data.ac_date}
                            start={data.ac_start}
                            end={data.ac_end}
                            idx={data.ac_idx}
                            memImage={data.mem_photo}
                            name={data.mem_username}
                            tag={data.ac_tag}
                            star={data.mem_star}
                            key={key}
                        />
                    )
                }
            });
            setList(lists);
        }else{
            alert("No results were found for your search.");
            props.history.push("/SearchForm");
        }
    });
  },[order,props.scText]);

  return(
    <div className="app_content open">
      <Search_head
        bntTag="Who are you looking for?"
        setOrder={setOrder}
      />
      <h2 className="main_title">Today</h2>
      {list}
    </div>
  );
}
let mapStateToProps = (state) =>{
    return {
      scText: state.scText_val.scText,
    };
}
Main = connect(mapStateToProps)(Main);
// {idx != ''?<Info idx={idx} onClick={() =>{setIdx('')} }/>:<div></div>}
export default Main;
