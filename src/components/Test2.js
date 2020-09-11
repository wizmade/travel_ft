import React, { PureComponent } from 'react'

function testInput(text) {
    const [val,setVal] = useState(text);
    const onChange = (e) => {
        setVal(e.target.value);
    }
    return {value:val, onChange:onChanges};
}

function Test() {
    const id = useInput("아이디");
    const pass = useInput("아이디");
    const submit = () => {
        console.log(form.get('text'));
    }

    const form = new FormData();
    
    
}

export default Test2