import React,{useEffect,useState} from 'react';
import Form from '../Form/';
import * as co from '../../common';
import Axios from 'axios';
import { Link,Redirect } from "react-router-dom";
import { FaBeer,FaArrowLeft } from 'react-icons/fa';
import "./Accompany.scss";
function Add_Accompany(props){
  const [red , setRed ] = useState(<div></div>);
  const datas = [
      
    { field_name:"ac_tag", 
      field_type: "select" , 
      display_name:"Select one of the options below|Ride Sharing|Meal Sharing|Tour Sharing|Experience Sharing|Others",
      options : "|Ride Sharing|Meal Sharing|Tour Sharing|Experience Sharing|Others",
      req:false  },  //여행컨셉
    { field_name:"ac_loc", field_type: "address2" , display_name:"Location",placeholder: "city" , req:true}, //도시
    { field_name:"ac_start", field_type: "date" , display_name:"StartDate",req:true,placeholder:"StartDate" ,icons:"far fa-calendar"}, // 여행기간
    { field_name:"ac_end", field_type: "date" , display_name:"EndDate",req:true,placeholder:"EndDate",icons:"far fa-calendar"}, // 여행기간
    { field_name:"ac_title", field_type: "text" , display_name:"Title" , req:true }, //동행 제목
    { field_name:"ac_memo", field_type: "textarea" , display_name:"Description",req:false},  //메모
    { field_name:"ac_img", field_type: "file" , display_name:"Image",req:false}  //이미지
    /*
    { field_name:"ac_title", field_type: "text" , display_name:"Title" , req:true }, //동행 제목
    { field_name:"ac_loc", field_type: "address" , display_name:"Location", req:true}, //도시
    { field_name:"ac_start", field_type: "date" , display_name:"StartDate",req:true}, // 시작일자
    { field_name:"ac_end", field_type: "date" , display_name:"EndDate",req:true},  //끝일자
    { field_name:"ac_tag", field_type: "text" , display_name:"Tag",req:false},  //이미지
    { field_name:"ac_img", field_type: "file" , display_name:"Image",req:false},  //이미지
    { field_name:"ac_memo", field_type: "textarea" , display_name:"Description",req:false},  //메모
    */
  ]
  
  const Add_Accompany = async (form)=> {
    const method = "app_accompany/add_accom";
    const url = co.SITE_URL+method;
    form.append("method",method);
    form.append("mem_userid",localStorage.mem_userid);
    const rs = await co.a_Axios(url,form);
    if(rs.resultItem.result == "N"){
      alert(rs.resultItem.msg);
      setRed(<Redirect to="/login"></Redirect>);
    }else if(rs.resultItem.result == "Y"){
      alert(rs.resultItem.msg);
      setRed(<Redirect to="/main"></Redirect>);
    }
  }

  return(
    <div className="add_box_parent">
        <div className="add_box_gr"></div>
        <div className="add_box">
            <Form datas={datas} method={Add_Accompany} sbname="POST" />
            {red}
        </div>
    </div>
  )
}



export default Add_Accompany;
