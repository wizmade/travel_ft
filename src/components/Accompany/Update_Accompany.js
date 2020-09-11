import React,{useEffect,useState} from 'react';
import Form from '../Form/';
import {SITE_URL} from '../../common';
import Axios from 'axios';
import { Link,Redirect,useParams} from "react-router-dom";
import { FaBeer,FaArrowLeft } from 'react-icons/fa';
import "./Accompany.scss";
import membnt from '../../img/membnt.png';
function Update_Accompany(props){
  const [red , setRed ] = useState(<div></div>);
  const datas = [
    { field_name:"ac_img", field_type: "file" , display_name:"Image",req:false},  //이미지
    {field_name:"ac_tag", 
    field_type: "select" , 
    display_name:"Select one of the options below|Ride Sharing|Meal Sharing|Tour Sharing|Experience Sharing|Others",
    options : "|Ride Sharing|Meal Sharing|Tour Sharing|Experience Sharing|Others",
    req:false  },  //여행컨셉
    { field_name:"ac_loc", field_type: "address2" , display_name:"Location",placeholder: "city" , req:true}, //도시
    { field_name:"ac_start", field_type: "date" , display_name:"StartDate",req:true,placeholder:"StartDate" ,icons:"far fa-calendar"}, // 여행기간
    { field_name:"ac_end", field_type: "date" , display_name:"EndDate",req:true,placeholder:"EndDate",icons:"far fa-calendar"}, // 여행기간
    { field_name:"ac_title", field_type: "text" , display_name:"Title" , req:true }, //동행 제목
    { field_name:"ac_memo", field_type: "textarea" , display_name:"Description",req:false}  //메모
   

    // { field_name:"ac_img", field_type: "file" , display_name:"Image",req:false},  //이미지
    // { field_name:"ac_title", field_type: "text" , display_name:"Title" , req:true }, //동행 제목
    // { field_name:"ac_loc", field_type: "address" , display_name:"Location", req:true}, //도시
    // { field_name:"ac_start", field_type: "date" , display_name:"StartDate",req:true}, // 시작일자
    // { field_name:"ac_end", field_type: "date" , display_name:"EndDate",req:true},  //끝일자
    // { field_name:"ac_tag", field_type: "text" , display_name:"Tag",req:false},  //이미지
    // { field_name:"ac_memo", field_type: "textarea" , display_name:"Description",req:false},  //메모
  ]
  let {idx} = useParams();
  const Update_Accompany = async (form)=> {
    const method = "app_accompany/update_accom";
    const url = SITE_URL+method;
    form.append("ac_idx",idx);
    form.append("method",method);
    Axios.post(url,form).then((res)=>{
      alert(res.data.resultItem.msg);
      setRed(<Redirect to="/List_Accompany"></Redirect>);
    });
  }
  const [ac_img , setAc_img ] = useState(membnt);
  const url = SITE_URL+"app_accompany/accom_info/"+idx;
  const [info , setInfo] = useState();
  useEffect(() => {
    Axios.get(url).then(res => {
      setInfo(res.data);
      setAc_img(res.data.ac_img);
    });
  },[]);
  const file_method = (name,file) =>{
    switch (name) {
      case "ac_img":
        if(file != undefined){
          setAc_img(URL.createObjectURL(file));
        }else{
          setAc_img(membnt);
        }
      break;
    }
  }
  return(<>
    <div className="add_box_gr"></div>
    <div className="add_box update_box">
      <span onClick={()=>props.history.goBack()} className='back_bnt'><i className="fas fa-times-circle"></i></span>
      <label htmlFor="ac_img">
        <img className='ac_photo' src={ac_img}/>
      </label>
      <Form datas={datas} method={Update_Accompany} sbname="POST" file_method={(name,val)=>file_method(name,val)} update_item={info}/>
      {red}
    </div>
  </>)
}



export default Update_Accompany;
