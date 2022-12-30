import React, { useEffect } from 'react'

export default function (props) {
  const [color,setColor] = React.useState(props.color)
  const [id,setid] = React.useState(props.id)
  
  const clickHandler=()=>{
    props.click(id)
  }  
  useEffect(()=>{setColor(props.color)},[props.color])
  return (
    <div onClick={clickHandler}>
        <p style={{color}} >
            *{color}
        </p>
    </div>
  )
}
