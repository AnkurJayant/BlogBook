import logo from './logo.svg';
import './App.css';
import Star from './Component/Star';
import { useEffect, useState } from 'react';

function App() {
  const [starArr,setArr] = useState([])
  const [activeID,setID] = useState(0)

  useEffect(()=>{
    let newArr=[]
    for(let i=0;i<activeID;i++){
      newArr.push(<Star key={i} color="blue" click={clickHandler}/>)
    }
    newArr.push(<Star  color="red" click={clickHandler}/>)
    for(let i=activeID+1;i<5;i++){
      newArr.push(<Star key={i} color="black" click={clickHandler}/>)
    }

    setArr(newArr)
  },[activeID])
  
  useEffect(()=>{
    console.log(starArr)
  },[starArr])

  function clickHandler(id){
    setID(id)
  }

  useEffect(()=>{
    let newArr=[]
    for(let i=0;i<5;i++){
      newArr.push(<Star key={i} id={i} color="black" click={clickHandler}/>)
    }
    setArr(newArr)
  },[])

  return (
    <div className="App" style={{justifyContent:'center'}}>   
      {activeID}
      {starArr}
    </div>
  );
}

export default App;
