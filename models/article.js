var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },  
    paragraph:{
        type:String,
        required:true
    },
    saved:{
        type:Boolean,
        default:false
    },
    note:{
        type: Schema.Types.ObjectId,
        ref:"Note"
    }
})

var Article=mongoose.model("Article",ArticleSchema)

module.exports= Article;