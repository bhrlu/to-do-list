import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


let conterId=0;
const App = () => {
    const [inputItems, setInputItems] = useState([]);
    const [inputValue, setInputValue] = useState("");
 
    const handleInputAdd = (event) => {
        event.preventDefault();
        setInputItems([...inputItems, { id: conterId++, value: inputValue, complete:false }]);
        setInputValue("");
    }

    const handledAddToTop = (event) => {
      let id=+event.target.getAttribute("id");
      let newArray=inputItems;
      let objectIndex = newArray.findIndex(obj=>obj.id ===id);
      if(objectIndex!==0){
        let temp=newArray[objectIndex];
        newArray[objectIndex]=newArray[objectIndex-1];
        newArray[objectIndex-1]=temp;
        setInputItems([...newArray]);
      }
    }
    const handleAddToBottom = (event)=>{
      let id=+event.target.getAttribute("id");
      let newArray=inputItems;
      let objectIndex = newArray.findIndex(obj=>obj.id ===id);
      if(objectIndex!==newArray.length-1){
        let temp=newArray[objectIndex];
        newArray[objectIndex]=newArray[objectIndex+1];
        newArray[objectIndex+1]=temp;
        setInputItems([...newArray]);
      }
    }
    const handleRemove = (event)=>{
      const id = +event.target.getAttribute("id");
      setInputItems(inputItems.filter(item => item.id !==id));
    }
    const handleDone = (event)=>{
      const id = +event.target.getAttribute("id");
      let done = inputItems.find(item =>item.id ===id);
      if(event.target.checked===true){
        done.complete=true
       inputItems.sort((a,b)=>a.complete - b.complete)
      }else{
        done.complete=false;
        inputItems.sort((a,b)=>a.complete - b.complete)
      }
      setInputItems([...inputItems]);
    }



    return (
    <div >
      <form onSubmit={handleInputAdd}>
        <input type = "text"
        className='forminput'
        value = { inputValue }
        onChange = {e => setInputValue(e.target.value)}
        />
        </form>
        <ul>
          {inputItems.map(item => (
            <li  key={item.id}>
              <input type="checkbox" id={item.id} value={item.value} onChange={handleDone}  />
                <label className={item.complete ? 'done' : 'notdone'}>{item.value}</label> <br></br>
                <button id={item.id} onClick={handledAddToTop}>Add to top</button>
                <button id={item.id} onClick={handleAddToBottom} >Add to bottom</button>
                <button id={item.id} onClick={handleRemove}>Remove</button>
            </li>))}
        </ ul>

        </div>
    )
};

ReactDOM.render(
   <App /> ,
    document.getElementById('root')
);

