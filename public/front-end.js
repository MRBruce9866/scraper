
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

$(".buttonSave").on("click",function(){
    var id =$(this).data("id")
    console.log(id)
    $.post("/saveArticle/"+id).then(function(data){
        if(data){
        location.reload()
        }
    })
})
$(".buttonDelete").on("click",function(){
    var id=$(this).data("id")
    console.log(id)
    $.post("/removeSaved/"+id)
    .then(function(data){
        if(data){
            console.log("post successful")
            location.reload()
        }
    })

})

function update(){
    $.get("/").
    then(function(data){
        console.log("connection successful")
    })
}