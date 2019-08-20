var db = require("../models")
var axios = require("axios");
var cheerio = require("cheerio");

module.exports=function(app){
    app.get("/scrape",function(req,resp){
        axios.get("http://www.ign.com/").then(function(response){

        var $= cheerio.load(response.data);
        $("article .item-body").each(function(i,element){
            var result={}
            var placeholder
            result.title=$(this).find(".item-title-link").text();
            placeholder=$(this).find("img").attr("src");
            result.link=$(this).find("a").attr("href")
            console.log(result.link)
            var stripped = placeholder.substring(0, placeholder.indexOf('&') + '&'.length);
            result.image=stripped
            db.Article.create(result).then(function(dbArticle){
        })
        .catch(function(err){
            console.log(err)
        })
        })
    })
        // db.Article.find({},function(err,data){
        //     console.log(data)
        //     var handlebarObj={
        //         data:data
        //     };
        //     resp.render("index",handlebarObj)
        // })
        resp.redirect("/")
    })
    app.get("/",function(req,resp){
        db.Article.find({},function(err,data){
            console.log(data)
            var handlebarObj={
                data:data
            };
            resp.render("index",handlebarObj)
        })
        })
    app.post("/clear",function(req,resp){
        db.Article.remove({},function(err,data){
            resp.redirect("/")
        })
    })
  
}
