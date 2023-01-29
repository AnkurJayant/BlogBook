import { usePreviousProps } from '@mui/utils';
import React,{useState} from 'react'
import blogLogo from '../../LOGOs/Blog Logo.png'
import './Navbar.css'
export default function Navbar(props) {
  const [searchResult,setSearchResult] = useState(props.articlessss);

  const searchEvent = (title) =>{
    if(title!==''){
      props.setSearchOn(true)
      props.searchString(title)
    }else{
      props.setSearchOn(false)
      props.searchString('')
    }
  }
    const navbarStyle={
        display: 'flex', 
        justifyContent: 'space-between', 
        height:'70px',
        borderRadius: '10px',
        margin:'0px',
        background:'#6c718b',
        border:'4px solid #373737',
          
    }
    const logoStyle={
        marginLeft: '8px', 
        borderRadius: '10px', 
        height: '60px'
    }
    const headingStyle={
        fontFamily: 'cursive',
        margin: 'none'
    }
    const searchIconStyle={
      margin:'0px',
      height:'39px'
    }
    const searchBarStyle={
      display:'flex',
      flexDirection:'row',
      marginRight:'20px'
    }
    const BlogBookStyle={
      display:'flex',
      alignItems:'center'
    }
  return (
    <nav style={navbarStyle} className="navbar navbar-expand-lg">
          <div style={BlogBookStyle} className="form-group">
            <img style={logoStyle} src={blogLogo} ></img>
            <a className="dashboard navbar-brand" href="/"><h1 style={headingStyle}>BlogBook</h1></a>
          </div>
          <div style={searchBarStyle}className="form-group">
            <input onChange={(e)=>searchEvent(e.target.value)} style={{borderRadius:'0px',background:'#c8cbcf'}} type="text" className="form-control" id="inputText" aria-describedby="emailHelp" placeholder="Search a blog." ></input>
          </div>
    </nav>
  )
}
