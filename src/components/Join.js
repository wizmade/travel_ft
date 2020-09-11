import React,{useEffect,useState} from 'react';
import Form from './Form/';
import * as co from '../common';
import Axios from 'axios';
import { Link,Redirect } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import "./css/join.scss";
import membnt from '../img/membnt.png';

function Join(props){

  const [red , setRed ] = useState(<div></div>);
  const [mem_photo , setMem_photo ] = useState(membnt);
  const datas = [
    { field_name:"mem_photo", field_type: "file" , display_name:"Photo:",req:true}, // 사진
    { field_name:"mem_userid", field_type: "text" , display_name:"Userid:" , req:true ,min:5}, // 아이디
    { field_name:"password", field_type: "password" , display_name:"Password:", req:true ,min:4}, //비밀번호
    { field_name:"password_ck", field_type: "password" , display_name:"Pass Check:", req:true,min:4}, //비밀번호
    { field_name:"mem_username", field_type: "text" , display_name:"Name:",req:true}, // 이름
    { field_name:"mem_sex", field_type:"radio", labels:"men|women", options:"1|2", display_name:"Gender:",req:true}, // 성별
    { field_name:"mem_birthday", field_type: "date" , display_name:"Birthday:",req:true}, // 생년월일
    { field_name:"mem_address1", field_type: "address" , display_name:"Residence:",req:true}, // 거주지
    { field_name:"mem_ethn", field_type: "text" , display_name:"Ethnicity:",req:true},  //국가
    { field_name:"mem_lang", field_type: "text" , display_name:"Language:",req:true}, // 언어
    { field_name:"mem_job", field_type: "text" , display_name:"Job:",req:true}, // 언어
    { field_name:"mem_in", field_type: "text" , display_name:"Interests:",req:true}, // 흥미
  ]

  const Join_form = async (form)=> {
    const method = "app_member/member_join";
    const url = co.SITE_URL+method;
    form.append("method",method);
    const rs = await co.a_Axios(url,form);
    if(rs.resultItem.result == "N"){
      alert(rs.resultItem.msg);
    }else if(rs.resultItem.result == "Y"){
      alert(rs.resultItem.msg);
      setRed(<Redirect to="/login"></Redirect>);
    }
    console.log(rs);
    //setRed(<Redirect to="/"></Redirect>);
  }

  const file_method = (name,file) =>{
    switch (name) {
      case "mem_photo":
        if(file != undefined){
          setMem_photo(URL.createObjectURL(file));
        }else{
          setMem_photo(membnt);
        }
      break;
    }
  }
  return(
    <div className="join_box">
      <h1>
        <Link to="/login">
           <IoIosArrowBack className='IoIosArrowBack'/>
        </Link>
      </h1>
      <div className="photo_box">
        <label htmlFor="mem_photo">
        <i class="fas fa-user-circle fa-9x"></i>
        </label>
      </div>
      <Form datas={datas} method={Join_form} sbname="MEMBER JOIN" file_method={file_method}/>
      {red}
    </div>
  )
}

export default Join;
