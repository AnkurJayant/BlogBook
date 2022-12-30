from datetime import datetime
import urllib.parse
from sqlalchemy.engine import create_engine
from flask import Flask, jsonify, request
from flask_sqlalchemy  import SQLAlchemy
from flask_cors import CORS, cross_origin

from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS']='Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = ('mysql://root:%s@localhost/flask' % urllib.parse.quote_plus("Mysql@94211"))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id','title','body','date')

class Articles(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    title=db.Column(db.String(100))
    body = db.Column(db.Text())
    date=db.Column(db.DateTime,default=datetime.now)

    def __init__(self,title,body):
        self.title = title
        self.body = body

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

@app.route("/get",methods=['GET']) # if you do not give any methods it's by default set to GET
@cross_origin()
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)

    return jsonify(results)

@app.route("/get/<id>/",methods=['GET']) 
@cross_origin()
def post_details(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)

@app.route("/add",methods=['POST']) # if you do not give any methods it's by default set to GET
@cross_origin()
def add_articles():
    title = request.json['title']
    body = request.json['body']

    articles = Articles(title,body)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)

@app.route("/update/<id>/",methods=['PUT']) # if you do not give any methods it's by default set to GET
@cross_origin()
def udpate_article(id):
    article = Articles.query.get(id)
    title = request.json['title']
    body = request.json['body']

    article.title=title
    article.body=body 

    db.session.commit()
    return article_schema.jsonify(article)

@app.route("/delete/<id>/",methods=['DELETE']) # if you do not give any methods it's by default set to GET
@cross_origin()
def delete_article(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()
    
    return article_schema.jsonify(article)


if __name__ == "__main__":  
    app.run(debug=True)

