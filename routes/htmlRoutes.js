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
                if(result.title&&result.image&&result.link&&result.paragraph){
                    db.Article.create(result).then(function(dbArticle){
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                }else{
                    return
                }
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
    app.post("/saveArticle/:id",function(req,resp){
        console.log(req.params.id)
        db.Article.findOneAndUpdate({
            _id:req.params.id},
            {$set:
                {"saved":true}
            },function(err,data){
            if(err)throw err
            resp.sendStatus(200)
        }).catch(function(err){
            console.log(err)
        })
    })
    app.get("/saved",function(req,resp){
        db.Article.find({"saved":true},function(err,data){
            if(err){
                throw err
            }else
            var handlebarObj={
                data:data
            }
            resp.render("saved",handlebarObj)
        })
    })
}
