
$("#scrape").on("click",function(){
    var timer
    $("#load").show()
    $.get("/scrape",function(response){
        if(response){
            timer=setTimeout(function(){
                location.reload() 
            },2000)
        }  
})
})

$("#clear").on("click",function(){
    console.log("clicked")
    $.post("/clear",function(response){
        location.reload()
    })
})

$("#buttonSave").on("click",function(){
    var id =$(this).data("id")
    console.log(id)
    $.post("/saveArticle/"+id).then(function(data){
        if(data){
            console.log("post successful")
        }
    })
})