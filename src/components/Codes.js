import React, { useState,useEffect} from 'react';

function Test(){
  const form = new FormData();
  const [list,setList] = useState({});
  const sbm = (f) =>{
    console.log("text1 "+f.get("text1"));
    console.log("text2 "+f.get("text2"));
  }

  useEffect(() => {
    const rss = {text1:"안녕?",text2:"집에가!"}
    const aa = ["text1","text2"];
    const oo = {};
    oo[aa[0]] = rss.text1;
    oo[aa[1]] = rss.text2;
    setList(oo);
  },[]);

  //console.log(list.text1);
  return(
    <div className="fix_layout">
      <Text form={form} name="text1" value={list.text1}/>
      <Text form={form} name="text2" value={list.text2}/>
      <input type="button" value="전송"  onClick={()=>sbm(form)}/>
    </div>
  );
}

export function Text(props){
  const [text,setText] = useState('');
  const onchange_ac = (value) =>{
    setText(value);
    props.form.append(props.name,value);
    props.form.set(props.name,value);
    console.log(props.form.get(props.name));
  }
  useEffect(() => {
    if(props.value != undefined){
      onchange_ac(props.value);
    }
  },[props.value]);
  return(
    <div>
      <input value={text} onChange={(e)=>onchange_ac(e.target.value)}/>
    </div>
  );
}



export default Test;
