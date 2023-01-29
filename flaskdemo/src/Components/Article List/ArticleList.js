import React from 'react'
import AddTile from '../Add Tile/AddTile'
import Tile from '../Tile/Tile'
import './ArticleList.css'
export default function ArticleList(props) {
    return (
        <div className='Article'>
            {
                props.articles && props.articles.map(article => {
                    return (
                        <Tile
                            key={article.id}
                            id={article.id}
                            article={article}
                            Title={article.title}
                            Body={article.body}
                            Date={article.date}
                            url={article.url}
                            Author={props.Author}
                            editArticle={props.editArticle}
                            handleDelete={props.deleteArticle}
                        ></Tile>
                    )
                }
                )
            }
            <AddTile />
        </div>
    )
}
