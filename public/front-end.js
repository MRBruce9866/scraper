
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