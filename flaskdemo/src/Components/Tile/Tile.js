import React from 'react'
import Blog from '../Blog/Blog';
import './Tile.css'
import '../../App.css'

export default function Tile(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);

  return (
    <div className="card" style={{ width: '17rem', height: '20rem', background: '#c8cbcf' }} >
      <div className="zoom bg-image hover-zoom" onClick={() => handleClickOpen()}>
        <img height={170} src={props.url} className="w-100" />
      </div>
      <div className="card-body" onClick={() => handleClickOpen()}>
        <h5 className="card-title">{props.Title}</h5>
        <h6 className="Date card-text">{props.Date}</h6>
        <h6 className="Author card-text">Created By: {props.Author}</h6>
      </div>
      <Blog
        articleID={props.id}
        url={props.url}
        Body={props.Body}
        descriptionElementRef={descriptionElementRef}
        open={open}
        Title={props.Title}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        editArticle={props.editArticle}
        handleDelete={props.handleDelete}
      />
    </div>
  )
}
