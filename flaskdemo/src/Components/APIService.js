
export default class APIService{
    static getArticles(){
        return fetch('http://localhost:5000/get',{'method':'GET',headers:{'Content-Type':'application/json'}}).then(response=>
        response.json())

    }
    static DeleteArticle(id){
        return fetch(`http://localhost:5000/delete/${id}/`,{'method':'DELETE',headers:{'Content-Type':'application/json'}}).then(
            response=>response.json()
        )
    }
    static UpdateArticle(id,body){
        return fetch(`http://localhost:5000/update/${id}/`,{'method':'PUT',body:JSON.stringify(body),headers:{'Content-Type':'application/json'}}).then(res=>{
                return res.json()
        }
        )
    }
    static AddArticle(body){
        return fetch(`http://localhost:5000/add/`,{'method':'PUT',body:JSON.stringify(body),headers:{'Content-Type':'apolication/json'}}).then(res=>{
            return res.json()
        })
    }

}
