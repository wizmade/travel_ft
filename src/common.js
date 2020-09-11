import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import  { useDispatch } from 'react-redux';

// 페이지 로그인 처리
export const SITE_URL = "http://1.234.44.171/app/";
export const formData = new FormData();

export async function login_ck(mem_userid,mem_password,props){
  if(mem_userid == "" || mem_password == "") {
    alert('Please check your ID,PW'); 
    return false;
  }
  const method = "/app_member/mem_login";
  const url = SITE_URL+method;

  formData.append("mem_userid",mem_userid);
  formData.append("mem_password",mem_password);
  formData.append("method",method);

  const rs = await Axios.post(url, formData).then(res => {
    if(res.data.resultItem.result == "Y"){
      localStorage.setItem("mem_userid",mem_userid);
      alert(res.data.resultItem.msg);
      return mem_userid;
    }else{
      alert(res.data.resultItem.msg);
      return false;
    }
  }).catch(err => {
    console.log(err);
    return false;
  });
  if (!rs) {
    return rs;
  }
  const rs2 = await Axios.post(SITE_URL+"app_member/mem_info/"+mem_userid).then(res => {
    const data = res.data.item;
    if(data.mem_interests != "" && data.mem_types != "") {return true;}
    else {return false;}
  });
  if(rs != ""){
    if(rs2) {
        props.history.push("/main");
    }
    else {
        props.history.push({
            pathname: "/Select_type",
            state : { backPath : "Login" }
          });
    }
  }
  return rs;
}
export async function mem_form_data() {
  const method = "app_member/mem_form_data";
  const url = SITE_URL+method;
  formData.append("method",method);
  const rs = await Axios.post(url, formData).then(res => {return res.data});

  return rs;
}

export async function a_Axios(url,form) {
  const rs = await Axios.post(url, form).then(res => {
    return res.data;
  });
  return rs;
}


export function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const onChange = e => {
    const {
      target: { value }
    } = e;
    //console.log(value);
    setValue(value);
  };
  return {value,onChange};
}
