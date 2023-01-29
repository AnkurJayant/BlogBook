import React from 'react'
import AddLogo from '../../LOGOs/Add Logo.png'
import {Link} from 'react-router-dom'
import './AddTile.css'
export default function AddTile() {
    const handleAddClick = ()=>{
        window.location.href='add'
    }
  return (
    <div className="addTile card" 
        style={{
                width: '17rem',
                height:'20rem', 
                background:'#6c718b'
            }}>
        <div className="zoom card-body" 
            style={{
                padding:0,
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                cursor:'pointer'
                }}>
            <img onClick={handleAddClick} style={{height:230, width:230}} src={AddLogo} ></img>
        </div>
    </div>  
    )
}
