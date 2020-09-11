import React, { useState,useEffect} from 'react';

///커스텀훅
function useInput(text){
    const [val,setVal]= useState(text);
    const onChanges = (e) =>{
        setVal(e.target.value); 
    }
    return{value:val,onChange:onChanges};
}

function Test(){
    const id = useInput("아이디");
    const pass = useInput("아이디");
    const submit = ()=>{
        console.log(form.get('text'));
        
    }
    const form = new FormData();
    //console.log(list.text1);
    return(
        <div className="fix_layout">
            <Text form={form} name="text" />
            <input {...id}/>
            <input {...pass}/>
            <input type="button" value="전송" onClick={submit}/>
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
      <input value={text} onChange={(e)=>onchange_ac(e.target.value)} />
    </div>
  );
}



export default Test;
