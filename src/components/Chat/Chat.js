import React, { Component, PropTypes,useEffect,useState } from 'react';
import List_card from '../List_card/';
import Search_head from '../Search_head/';
import { Link,useParams } from "react-router-dom";
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { update_head } from "../../actions";
import './Chat.scss';
import {SITE_URL} from "../../common.js";


function Chat(){
  // 헤드를 초기화 할때 사용
  const dispatch = useDispatch();
  dispatch(update_head());
  const form = new FormData();
  const[list,setList] = useState(<></>);
  useEffect(() => {
    const method = "/chat/list/"+localStorage.mem_userid;
    const url = SITE_URL+method;
    form.append("method",method);
    Axios.get(url,form).then(res => {
        if(res.data != null && res.data != undefined  && Object.keys(res.data).length != 0){
            const lists = res.data.map((val,key) => (
                <ListAcom
                key={key}
                image={"http://1.234.44.171/uploads/accs/"+val.img}
                title={val.title}
                loc={'Preparing to chat..'}
                idx={val.ro_idx}
                />
        ));
        setList(lists);
      }else{
        setList(<NoneAcom/>);
      }
    });
  },[]);
  return(
    <div className="chat_box app_content">
      {list}
    </div>
  );
}

export function ListAcom(props){
  return(
    <Link to={'/ChatRoom/'+props.idx}>
      <div className="listAcom">
        <img src={props.image}/>
        <div className="content">
          <p className="title">{props.title}</p>
          <p className="loc">{props.loc}</p>
        </div>
      </div>
    </Link>
  );
}

export function NoneAcom(props){
    return(
        <div className="NoneAcom">
        <p>There is no accompanying article</p>
        <Link to='/Add_Accompany' className="link">AddAccompany</Link>
        </div>
    );
}

export default Chat;
