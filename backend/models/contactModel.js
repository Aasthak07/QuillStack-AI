const {Schema, model} = require('../connection');

const contactSchema = new Schema({
    name: String,
    email: {type:String, required:true,unique:true},
    message:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
});




module.exports = model('contact',contactSchema);