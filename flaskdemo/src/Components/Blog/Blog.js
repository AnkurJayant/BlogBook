import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState, useEffect } from 'react'
import APIService from '../APIService';

export default function Blog(props) {
  const [title, setTitle] = useState(props.Title)
  const [body, setBody] = useState(props.Body)
  const [url, setURL] = useState(props.url)

  const callUpdate = () => {
    APIService.UpdateArticle(props.articleID, { title, body, url }).then(response => {
      props.editArticle(response)
    }).then(response => {
      // console.log(response)
      setUpdateBlog(false)
      props.handleClickOpen()
    }).catch(err => console.log(err))
  }
  const callDelete = (articleID) => {
    APIService.DeleteArticle(articleID).then(
      () => {
        props.handleDelete(articleID)
      }
    ).catch(error => console.log(error))
  }
  const [updateBlog, setUpdateBlog] = useState(false);

  const dialogButtonStyle = {
    margin: '0px',
  }
  useEffect(() => { console.log('props open changed', props.open) }, [props.open])
  useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = props.descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  const handleEdit = () => {
    props.handleClose()
    setUpdateBlog(true)
  }


  return (
    <>
      {/* BLOG DIALOG BOX */}
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        scroll='body'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        maxWidth='md'
      >
        <img src={props.url} className="w-100" />
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={false}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={props.descriptionElementRef}
            tabIndex={-1}
          >
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={dialogButtonStyle} onClick={handleEdit}>Edit</Button>
          <Button style={dialogButtonStyle} onClick={() => callDelete(props.articleID)}>Delete</Button>
          <Button style={dialogButtonStyle} onClick={() => props.handleClose(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* UPDATE DIALOG BOX */}
      <Dialog
        id='updateDialog'
        open={updateBlog}
        onClose={() => props.handleClose()}
        scroll='body'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        maxWidth='md'
      >
        <img src={props.url} className="w-100" />
        <DialogTitle id="scroll-dialog-title">
          <label htmlFor='title' className='form-label'>Title</label>
          <input onChange={(e) => { setTitle(e.target.value) }} type='text' className='form-control' value={title}></input>
        </DialogTitle>
        <DialogContent dividers={false}>

          <DialogContentText
            id="scroll-dialog-description"
            ref={props.descriptionElementRef}
            tabIndex={-1}
          >
            <label htmlFor='URL' className='form-label'>Image URL</label>
            <input onChange={(e) => { setURL(e.target.value) }} type='text' className='form-control' value={url}></input>
            <label htmlFor='body' className='form-label'>Body</label>
            <textarea
              style={{
                height: `${body.length * 0.7 < 90 ? 90 : body.length * 0.4
                  }px`
              }}
              onChange={(e) => { setBody(e.target.value) }}
              type='text'
              className='form-control'
              value={body}>
            </textarea>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={dialogButtonStyle} onClick={callUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
