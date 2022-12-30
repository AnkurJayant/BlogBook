import React,{useEffect,useState} from 'react'
import './AddArticle.css'
import APIService from '../APIService'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';



export default function AddArticle(props) {
    const handleAdd=(body)=>{
        if(blogBody!==''&&blogTitle!==''&&imageURL!==''){
            fetch(`http://localhost:5000/add`,{'method':'POST',body:JSON.stringify(body),headers:{'Content-Type':'application/json'}}).then(res=>{
                return res.json()
            }).then(response=>
                props.setArticles(art=>{
                        return [...art,{title:response.title,body:response.body,url:response.url}]})
            ).then(
                confirmAlert({
                    message: 'Your blog has been added!',
                    buttons: [
                      {
                        label: 'Okay',
                        onClick: ()=> {window.location.href='/add'}
                    }
                    ]
                  })    
           )  
        }else{
            confirmAlert({
                message: 'You must provide all the fields!',
                buttons: [
                  {
                    label: 'Okay',
                  }
                ]
              }) 
        }
    }
    const [blogTitle,setBlogTitle] = useState('')
    const [blogBody, setBlogBody] =  useState('')
    const [imageURL,setImageURL] = useState('')

  return (
    <>
    <div className='addBlog' style={{border:'3px solid #373737'}}>
        <h2 style={{margin:'15px'}}>New Blog</h2>
        <div className='inputForm'>
            <div className="form-group">
                <label htmlFor="inputText">Blog Title</label>  
                <input onChange={(e)=>{setBlogTitle(e.target.value)}} type="text" className="form-control" id="inputText" aria-describedby="emailHelp" placeholder="A witty title for your Blog." required></input>
            </div>
            
            <div className="form-group">
                <label htmlFor="inputURL">Image URL</label>
                <input onChange={(e)=>{setImageURL(e.target.value)}} type="text" className="form-control" id="inputURL" placeholder="A relevant Image URL for your blog." required></input>
            </div>
            <div className="form-group">
                <label htmlFor="inputDescription">Blog description</label>
                <textarea style={{height:'180px'}}onChange={(e)=>{setBlogBody(e.target.value)}} className="form-control" id="inputDescription" rows="3" placeholder='Please provide a description for your blog.' required></textarea>
            </div>
            <button className='btn btn-primary' onClick={()=>handleAdd({title:blogTitle,body:blogBody,url:imageURL})}>Submit</button>
        </div> 
            
    </div>
    </>
)
}
