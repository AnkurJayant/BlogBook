import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ArticleList from './Components/Article List/ArticleList';
import AddArticle from './Components/Add Article/AddArticle';
import APIService from './Components/APIService';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const [articles, setArticles] = useState([]);

  const [searchOn, setSearchOn] = useState(false)
  const [searchString, setSearchString] = useState('')
  const [searchResult, setSearchResult] = useState([])

  // Fetch blogs:
  useEffect(() => {
    APIService.getArticles().then(data => {
      setArticles(data)
    }
    ).catch(error =>
      console.log(error)
    )
  }, [])
  
  //SearchBar
  useEffect(() => {
    console.log(searchOn)
    console.log(searchString)
    if (searchOn) {
      const newArticleSet = articles.filter(article => {
        return article.title.includes(searchString)
      })
      setSearchResult(newArticleSet)
    } else {
      setSearchResult([])
    }
  }, [searchOn, searchString])

  const deleteArticle = (id) => {
    const newArticles = articles.filter(art => art.id !== id)
    setArticles(newArticles)
  }

  const updateArticles = (article) => {
    let newArticles = articles.map(Blog => {
      if (Blog.id === article.id) {
        Blog.title = article.title
        Blog.body = article.body
        Blog.url = article.url
        return Blog
      } else {
        return Blog
      }
    })
    setArticles(newArticles)
  }

  return (
    <Router>
      <div className="App">
        <Navbar articlessss={articles} setArticles={setArticles} setSearchOn={setSearchOn} searchString={setSearchString} />
        <Routes>
          <Route path="/" exact element={<ArticleList Author='Ankur' articles={searchOn ? searchResult : articles} deleteArticle={deleteArticle} editArticle={updateArticles}></ArticleList>}></Route>
          <Route path='/add' element={<AddArticle setArticles={setArticles} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
