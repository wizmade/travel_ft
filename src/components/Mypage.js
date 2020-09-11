import React,{useEffect,useState} from 'react';
import Form from './Form/';
import {SITE_URL} from '../common';
import Axios from 'axios';
import { Link,Redirect } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import "./css/mypage.scss";
import membnt from '../img/membnt.png';

function Mypage(props){
    console.log(props);
  const [red , setRed ] = useState(<></>);
  const [mem_item,setMem_item] = useState();
  const [mem_photo , setMem_photo ] = useState(membnt);
  useEffect(()=>{
    const method = "app_member/mem_info/"+localStorage.mem_userid;
    const url = SITE_URL+method;
    Axios.get(url).then(res=>{
      setMem_photo("http://1.234.44.171/uploads/member_photo/"+res.data.item.mem_photo);
      setMem_item(res.data.item);
  
    });
  },[]);

  const datas = [
    { field_name:"mem_photo", field_type: "file" , display_name:"Photo:",req:true}, // 사진
    { field_name:"mem_userid", field_type: "hidden" ,req:true}, // 아이디
    { field_name:"mem_username", field_type: "text" , display_name:"Name:",req:true}, // 이름
    { field_name:"mem_sex", field_type:"radio", labels:"men|women", options:"1|2", display_name:"Gender:",req:true}, // 성별
    { field_name:"mem_birthday", field_type: "date" , display_name:"Birthday:"}, // 생년월일
    { field_name:"mem_address1", field_type: "address" , display_name:"Residence:"}, // 거주지
    { field_name:"mem_ethn", field_type: "text" , display_name:"Ethnicity:",req:true},  //국가
    { field_name:"mem_lang", field_type: "text" , display_name:"Language:",req:true}, // 언어
    { field_name:"mem_job", field_type: "text" , display_name:"Job:",req:true}, // 언어
    { field_name:"mem_types", field_type: "interest" , display_name:"types:",req:false}, //여행타입
    { field_name:"mem_interests", field_type: "interest" , display_name:"Interests:",req:false}, // 흥미
  ]

  const member_update = (form)=> {
    const method = "app_member/member_update";
    const url = SITE_URL+method;
    form.append("method",method);
    const rs = Axios.post(url,form).then(res=>{
      alert(res.data.resultItem.msg);
      setRed(<Redirect to="/main"/>);
    });
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
    <div className="mypage_box">
      <h1>
        <Link to="/login">
           <IoIosArrowBack className='IoIosArrowBack'/>
        </Link>
      </h1>
      <div className="photo_box">
        <label htmlFor="mem_photo">
          <img src={mem_photo}/>
        </label>
      </div>
      <Form datas={datas} method={member_update} sbname="INFO UPDATE" file_method={file_method} update_item={mem_item} pathname={"MyPage"}/>
      {red}
    </div>
  )
}

export default Mypage;
