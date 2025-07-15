const {Schema, model} = require('../connection');

const uploadcodeSchema = new Schema({
    filename: {type:String, required:true,unique:true},
    content:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
});


module.exports = model('contact',uploadcodeSchema);