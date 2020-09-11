import React, { Fragment,Component, PropTypes,useState,useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Link, Redirect} from 'react-router-dom';
import DateFnsUtils from "@date-io/date-fns"; // import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddrSearch from './AddrSearch.js';
import Select_type from '../Select_type';


function Form(props){
  const { register, handleSubmit, setValue } = useForm();

    const [types, setTypes] = useState(<></>);


  const onSubmit = data => {
    console.log(data);
    const formData = new FormData();
    const arr = Object.entries(data);
    // form에 데이터를 다 넣음
    for(let i in arr){
      if(typeof arr[i][1] == "object"){
        formData.append(arr[i][0],arr[i][1][0]);
      }
      formData.append(arr[i][0],arr[i][1]);
    }
    props.method(formData);
  };

  const pick_arr = new Array;
  const pick_key_arr = new Array;
  const file_arr = new Array;
  const pick_key_box = new Array;
  let s = 0;
  for(let i in props.datas){
    if(props.datas[i].field_type == "date"){
      pick_arr[i] = "";
      pick_key_arr[s] = props.datas[i].field_name;
      pick_key_box[s] = i;
      s++;
    }
    if(props.datas[i].field_type == "file"){
      file_arr[i] = props.datas[i].field_name;
    }
  }
  // 달력 input 표시하는 부분
  const [ pick, setPick ] = useState({dp:pick_arr});
  const change_bnt = (selectedDate,name,key) => {
    if(selectedDate != null){
      for (let i in pick_key_box) {
        pick_arr[pick_key_box[i]] = pick.dp[pick_key_box[i]];
      }
      pick_arr[key] = selectedDate;

      setPick({dp:pick_arr});
      let rs = new Date(selectedDate);
      rs.setHours(rs.getHours()+9)
      setValue(name,rs.toISOString().substr(0,10));
    }
  }
  // 달력 file 이벤트 및 결과처리 담당하는 부분
  // 메인 컴포넌트에서 메소드 이름받아서 체인지 처리합니다
  const setFiles = e =>{
    setValue(e.target.name,e.target.files[0]);
    if(props.file_method){
        props.file_method(e.target.name,e.target.files[0]);
    }
  }
  useEffect(() => {
    if(props.datas){
      for(let i in props.datas){
        register({ name: file_arr[i]});
      }
    }

  },[]);

  // 구글 주소찾기에서 주소를 찾아줍니다.
  const [addrBox,setAddrBox] = useState();
  const close_a = () => setAddrBox(<></>);
  const complet_a = (name,value,lat,lng) => {
    setValue(name,value);
    setValue(name+"_lat",lat);
    setValue(name+"_lng",lng);
    setAddrBox(<></>);
  };
  const setAdress = name =>{
    setAddrBox(<AddrSearch name={name} complet={complet_a} close={close_a}/>);
  }

  // form에 값을 업데이트 합니다.
  useEffect(() => {
    const item_data = new Array;
    if(props.update_item != undefined){
      for (let [key, value] of Object.entries(props.update_item)) {
        setValue(key,value);
      }
      for(var i in pick_key_arr){
        if(props.update_item[pick_key_arr[i]] != undefined && props.update_item[pick_key_arr[i]] != ''){
          let rs = new Date(props.update_item[pick_key_arr[i]]);
          pick_arr[pick_key_box[i]] = rs;
        }
      }
      setPick({dp:pick_arr});
    }
  },[props.update_item]);

  const form_com = props.datas.map((datas,key)=> {

    switch (datas.field_type) {

      case 'checkbox':
        const place_ck = datas.display_name.split('\n');
        const val_ck = datas.options.split('\n');
        const dck = datas.options.split('\n');
        const checkbox = [];

        for(let i in place_ck){
            checkbox[i] =
            <label key={datas.field_name+"checkbox"+i}>
            <input type={datas.field_type} name={datas.field_name} value={val_ck[i]} ref={register}/>{place_ck[i]}
            </label>;
        }
        return(<div className={"form_div "+datas.field_name} key={datas.field_name}>{checkbox}</div>);
      break;

      case 'radio':
        const place_ra = datas.labels.split('|');
        const val_ra = datas.options.split('|');
        const radio = [];
        for(let i in place_ra){
            radio[i] =
            <label key={datas.field_name+"radio"+i}>
              <input type={datas.field_type} name={datas.field_name} value={val_ra[i]} ref={register} required={datas.req}/>{place_ra[i]}
            </label>;
        }
        return(<div className={"form_div "+datas.field_name} key={datas.field_name}>
                <p className="name_b">{datas.display_name}</p>
                {radio}
               </div>);
      break;

      case 'select':
        const place_se = datas.display_name.split('|');
        const val_se = datas.options.split('|');
        const select = [];
        for(let i in place_se){
            select[i] = <option key={datas.field_name+"select"+i} value={val_se[i]}>{place_se[i]}</option>;
        }
        return(<div className={"form_div "+datas.field_name} key={datas.field_name}><select name={datas.field_name} ref={register}> {select}</select></div>);
      break;

      case 'date2':
        return(
            <div className={"form_div "+datas.field_name} key={datas.field_name}>
                <div className="StartDate date__column"> 
                    <p className="name_b"><i className="far fa-calendar"></i></p>
                    <DatePicker
                    selected={pick.dp[key]}
                    onChange={(d)=> change_bnt(d,datas.field_name,key)}
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="Start Dates"
                    />
                    <input type='hidden' name={datas.field_name} ref={register} />
                </div>
                <div className="EndDate date__column"> 
                    <p className="name_b"><i className="far fa-calendar"></i></p>
                    <DatePicker
                    selected={pick.dp[key]}
                    onChange={(d)=> change_bnt(d,datas.field_name,key)}
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="End Dates"
                    />
                    <input type='hidden' name={datas.field_name} ref={register} />
                </div>
            </div>
            /*
          <div className={"form_div "+datas.field_name} key={datas.field_name}>
            <p className="name_b"><i class="far fa-calendar"></i></p>
            <DatePicker
              selected={pick.dp[key]}
              onChange={(d)=> change_bnt(d,datas.field_name,key)}
              dateFormat="yyyy-MM-dd"
              showMonthDropdown
              showYearDropdown
              placeholderText={datas.placeholder}
            />
            <input type='hidden' name={datas.field_name} ref={register} />
          </div>
          */
          );
      break;
      case 'date':
        return(
            <div className={"form_div "+datas.field_name} key={datas.field_name}>
                <p className="name_b">
                    {datas.display_name}
                    {/* <i class="far fa-calendar"></i> */}
                </p>
                {datas.icons != undefined && datas.icons != null &&
                    <p className="name_i">
                        <i className={datas.icons}></i> 
                    </p>
                }
                <DatePicker
                selected={pick.dp[key]}
                onChange={(d)=> change_bnt(d,datas.field_name,key)}
                dateFormat="yyyy-MM-dd"
                showMonthDropdown
                showYearDropdown
                placeholderText={datas.placeholder}
                />
                <input type='hidden' name={datas.field_name} ref={register} />
            </div>
       
          );
      break;

      case 'file':
        return(
          <div className={"form_div "+datas.field_name} key={datas.field_name}>
            <p className={"img_"+datas.field_name}></p>
            <p className="name_b">{datas.display_name}</p>
            <input type={datas.field_type} name={datas.field_name} id={datas.field_name} placeholder={datas.display_name} onChange={setFiles}/>
          </div>
          );
      break;
    
      //추가 20-04-28
      case 'file2':
        return(
          <div className={"form_div "+datas.field_name} key={datas.field_name}>
            <p className={"img_"+datas.field_name}></p>
            <input type="file" name={datas.field_name} id={datas.field_name} placeholder={datas.display_name} onChange={setFiles}/>
          </div>
          );
      break;

      case 'hidden':
        return(<input type={datas.field_type} name={datas.field_name} ref={register}/>);
      break;
      case 'address':
        return(
          <div className={"form_div "+datas.field_name} key={datas.field_name}>
            <p className="name_b">{datas.display_name}</p>
            <input
              type='text'
              name={datas.field_name}
              placeholder={datas.placeholder}
              ref={register}
              required={datas.req}
              minLength={datas.min}
              onClick={()=>setAdress(datas.field_name)}
              readOnly
            />
            <input type='hidden' name={datas.field_name+"_lat"} ref={register}/>
            <input type='hidden' name={datas.field_name+"_lng"} ref={register}/>
          </div>
        );
      break;
      case 'address2':
        return(
          <div className={"form_div "+datas.field_name} key={datas.field_name}>
            <p className="name_b"><i className="fas fa-map-marker-alt"></i></p>
            <input
              type='text'
              name={datas.field_name}
              placeholder={datas.placeholder}
              ref={register}
              required={datas.req}
              minLength={datas.min}
              onClick={()=>setAdress(datas.field_name)}
              readOnly
            />
            <input type='hidden' name={datas.field_name+"_lat"} ref={register}/>
            <input type='hidden' name={datas.field_name+"_lng"} ref={register}/>
          </div>
        );
      break;

      case 'textarea':
        if(datas.min == undefined){datas.min = 0;}
        return(<div className={"form_div "+datas.field_name} key={datas.field_name}>
          <p className="name_b">{datas.display_name}</p>
          <textarea
            name={datas.field_name}
            placeholder={datas.display_name}
            ref={register}
            required={datas.req}
            minLength={datas.min}
          />
        </div>);
      break;
    
      case 'interest':
        return(
            <div className={"form_div "+datas.field_name} key={datas.field_name}>
            <p className="name_b">{datas.display_name}</p>
            <input
              type='text'
              name={datas.field_name}
              ref={register}
              required={datas.req}
              onClick={()=>setTypes(<Select_type 
                location = {
                   {state : {backPath : props.pathname}}
              }/>)}
              readOnly
            />
          </div>
        );
      break;

      default:
        if(datas.min == undefined){datas.min = 0;}
        return(<div className={"form_div "+datas.field_name} key={datas.field_name}>
          <p className="name_b">{datas.display_name}</p>
          <input
            type={datas.field_type}
            name={datas.field_name}
            placeholder={datas.placeholder}
            ref={register}
            required={datas.req}
            minLength={datas.min}
          />
        </div>);
      break;
    }
  });
  //CusInput 기능
  return(<>
    <form onSubmit={handleSubmit(onSubmit)}>
      {form_com}
      {props.CusInput}
      <div className="submit__button-column">
      <input type="submit" value={props.sbname} className='sbname'/>
      {
      props.ssbname != undefined?
        <Link to="/">
          <input type="submit" value={props.ssbname} className='ssbname'/>
        </Link>
      :<></>
      }
      </div>
    </form>
    {addrBox}{types}
  </>)
}
export default Form;




// 컴포넌트 만들기 예제
// const [values, setReactSelect] = useState({
//   selectedOption: []
// });
// const handleMultiChange = selectedOption =>{
//   setValue("reactSelect", selectedOption);
//   setReactSelect({ selectedOption});
// };
// const hanleChange = e => {
//   setValue("antDInput", e.target.value);
// };
