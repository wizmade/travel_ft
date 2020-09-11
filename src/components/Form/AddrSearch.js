import React, {useState,useEffect} from 'react';
import Axios from 'axios';
import "../css/AddrSearch.scss";
import {useInput,SITE_URL,formData} from '../../common';


function AddrSearch(props){

  const [address,setAdress] = useState('');
  const [description,setDescription] = useState(<></>);
  const complet = (description,place_id) =>{

    const method = "app_addr/search_locations/";
    const url = SITE_URL+method+place_id;
    Axios.get(url, formData).then(res => {
        props.complet(props.name,description,res.data.item.lat,res.data.item.lng);
    });
  }
  const geoSearch = () =>{
    const method = "app_addr/search_latlng/";
    const url = SITE_URL+method+address;
    formData.append("method",method);

    Axios.get(url, formData).then(res => {
      if(res.data.resultItem.result == "N"){
        alert(res.data.resultItem.msg);
        return false;
      }else{
        const lists = res.data.item.map((data,key)=> {
          return(<div key={key} className='click_box' onClick={() => complet(data.description,data.place_id)}>{data.description}</div>);
        });
        setDescription(lists);
      }
    });
  }
  return(
    <div className='fix_layout addr_box'>
      <h1 className="title">
        Address search
        <span onClick={props.close}>X</span>
      </h1>
      <div className="sc_box">
        <input type="text" className="address" onChange={e => setAdress(e.target.value)}  placeholder="Please enter your address" />
        <button type="button" className="sc_bnt" onClick={geoSearch}>search</button>
      </div>
      {description}
    </div>
  );
}
export default AddrSearch;
