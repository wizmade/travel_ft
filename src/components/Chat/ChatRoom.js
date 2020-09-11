import React, { Component, PropTypes,useEffect ,useState,useRef} from 'react';
import { Link,useParams } from "react-router-dom";
import { FaBeer,FaArrowLeft } from 'react-icons/fa';
import Axios from 'axios';
import axios from 'axios';
import './Chat.scss';
import {SITE_URL} from "../../common.js";
import { connect,useDispatch } from 'react-redux';
import { soketOn } from "../../actions";
import { resetWarningCache } from 'prop-types';
import { useCallback } from 'react';

function ChatRoom(props){

  const chatTemp = new Array;
  const [ch_msgs, setsCh_msg] = useState(console.log("ss111s"));
  const [ch_msg, setCh_msg] = useState('');
  const [list , setList] = useState([]);
  const [chat , setChat] = useState(chatTemp);
  const ch_msg_box = useRef(null);
  const mem_list = useRef(null);
  const [memList , setMemList] = useState({});
  const [accompany , setAccompany] = useState({});
  const onScroll = e =>{
    console.log(e.currentTarget.getBoundingClientRect().top);
    console.log(e.clientY);
  }
  let {idx} = useParams();
  // 채팅을 보내는 부분
  const emit = () =>{
    const form = new FormData();
    form.append("ro_idx",idx);
    form.append("ch_msg",ch_msg);
    form.append("mem_userid",localStorage.mem_userid);
    const url = SITE_URL+"chat/add_chat";

    props.socket.emit('add_chat',{
      ro_idx: idx,
      ch_msg: ch_msg,
      mem_userid:localStorage.mem_userid
    });
    Axios.post(url,form);
    setCh_msg('');
    ch_msg_box.current.focus();
  }

  const scrollDown = () =>{
    if(document.getElementById("chatting_box")){
      document.getElementById("chatting_box").scrollTo(0,10000);
    }
  }
  // 채팅목록을 불러오는부분
  const url = SITE_URL+"chat/chat_room/"+idx;
  const info_url = SITE_URL+"chat/chat_info/"+idx;
  useEffect(() => {
    // 채팅목록을 가져옵니다.
    Axios.get(url).then(res => {
      if(res.data.resultItem.result == "N"){
        //alert(res.data.resultItem.msg);
      }else{
        setList(res.data.item);
        console.log(res.data.item);
        if(document.getElementById("chatting_box")){
          document.getElementById("chatting_box").scrollTo(0,1000);
        }
      }
    });
    Axios.get(info_url).then(res => {
        console.log(res.data);
        setMemList(res.data.item.mem_list);
        setAccompany(res.data.item.accompany);
    });
    // 방정보들을 가져옵니다.
    props.socket.off("roomGet_"+idx); // 리액트에서 필수적임 누수방지
    props.socket.on('roomGet_'+idx,(data) => {
      console.log("ss??");
      chatTemp.push({ro_idx: data.ro_idx, ch_msg: data.ch_msg, mem_userid: data.mem_userid});
      setChat(chatTemp);
      // 하위컴포넌터 리사이클
      setCh_msg('대화를받는중입니다.');
      setCh_msg('');
      document.getElementById("chatting_box").scrollTo(0,10000);
    });
  },[]);


  return(
    <div className="chat_layout fix_layout">
      <div className="chat_layout head">
        <div className="side">
          <span onClick={()=>props.history.goBack()}>X</span>
        </div>
        <div className="title"> {accompany.ac_title}</div>
        <div className="side"></div>
      </div>
      <div className="chatting_box" id="chatting_box">
        <ChatMsg item={list} memList={memList} chat={chat}/>
      </div>
      <div className="send_box" >
        <textarea
          ref={ch_msg_box}
          className='content'
          value={ch_msg}
          onChange={(e)=>{setCh_msg(e.target.value);}}
          onClick={scrollDown}
        />
        <button className='bnt' onClick={emit}>SEND</button>
      </div>
    </div>
  );
}

export function ChatMsg(props){
  // 기존챗팅목록을 불러옵니다
    let tempMem_userid = '';
    const search = (userid) => {
        const memlist = props.memList;
        for(let i=0; i<memlist.length; i++) {
            if(memlist[i].mem_userid === userid) {
                return memlist[i].mem_photo;
            }
        }
    } 
    const temp =  props.item.map((val,key) => {
        let cks = '';
        let userBox = '';
        if(localStorage.mem_userid == val.mem_userid){
            cks = "right";
        }else {
            cks = "left";
            if(tempMem_userid != val.mem_userid){
                const photo = search(val.mem_userid);
                userBox = <div className={"chatImg"}>
                            <span>{val.mem_userid}</span>
                            <Link to={"/memberInfo/"+val.mem_userid}>
                                <img src={"http://1.234.44.171/uploads/member_photo/"+photo} />
                            </Link>
                        </div>;
            }
        }

        tempMem_userid = val.mem_userid;
        return(
            <div key={key} className={"ch_msg"}>
                {userBox}
                <div className={"chatText "+ cks}>
                {val.ch_msg}
                </div>
            </div>
        );
    });
    
    /// 소캣통신으로 데이터를 받아옵니다.
    const [chatDom ,setChatDom] = useState();
    useEffect(() => {
        const chatDoms = props.chat.map((val,keys) => {
            let cks = '';
            let userBox = '';

            if(localStorage.mem_userid == val.mem_userid){
                cks = "right";
            }else {
                cks = "left";
                if(tempMem_userid != val.mem_userid){
                    const photo = search(val.mem_userid);
                    userBox = <div className={"chatImg"}>
                            <span>{val.mem_userid}</span>
                            <img src={"http://1.234.44.171/uploads/member_photo/"+photo}/>
                            </div>;
                }
            }
        tempMem_userid = val.mem_userid;
        return(
            <div key={keys} className={"ch_msg"}>
            {userBox}
            <div className={"chatText "+ cks}>
                {val.ch_msg}
            </div>
            </div>
        );
        });
        setChatDom(chatDoms);
    },[props.chat.length]);

    return(<>
        {temp}
        {chatDom}
    </>);

}
let mapStateToProps = (state) =>{
    return {
        socket: state.socketio.socket
    };
}
ChatRoom = connect(mapStateToProps)(ChatRoom);

export default ChatRoom;
