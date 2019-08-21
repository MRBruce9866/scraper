var db = require("../models")
var axios = require("axios");
var cheerio = require("cheerio");

module.exports=function(app){
    app.get("/scrape",function(req,resp){

        var scrapeUrl=["https://www.howtogeek.com/t/gaming/","https://www.howtogeek.com/t/gaming/page/2/","https://www.howtogeek.com/t/gaming/page/3/","https://www.howtogeek.com/t/gaming/page/4/","https://www.howtogeek.com/t/gaming/page/5/"]
        var selectURL=scrapeUrl[Math.floor(Math.random()*scrapeUrl.length)]
        console.log(selectURL)
        axios.get(selectURL).then(function(response){

            var $= cheerio.load(response.data);
            $("article").each(function(i,element){
                var result={}
                //var placeholder
                result.title=$(this).find("h2").text();
                result.image=$(this).find("img").attr("src");
                result.link=$(this).find("a").attr("href")
                result.paragraph=$(this).find(".entry-content").text()
                // var stripped = placeholder.substring(0, placeholder.indexOf('&') + '&'.length);
                // result.image=stripped
                db.Article.create(result).then(function(dbArticle){
            })
            .catch(function(err){
                console.log(err)
            })
            })
        })

    //     axios.get("http://www.ign.com/").then(function(response){

    //     var $= cheerio.load(response.data);
    //     $("article .item-body").each(function(i,element){
    //         var result={}
    //         var placeholder
    //         result.title=$(this).find(".item-title-link").text();
    //         placeholder=$(this).find("img").attr("src");
    //         result.link=$(this).find("a").attr("href")
    //         console.log(result.link)
    //         var stripped = placeholder.substring(0, placeholder.indexOf('&') + '&'.length);
    //         result.image=stripped
    //         db.Article.create(result).then(function(dbArticle){
    //     })
    //     .catch(function(err){
    //         console.log(err)
    //     })
    //     })
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
