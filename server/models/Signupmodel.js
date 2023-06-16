const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signUpSchema = new Schema({
email: {
type: String,
required: true,
unique:true,
lowercase: true,
},
phone: {
type: String,
required: true
},
firstName:{
type: String,
required: true
},
lastName:{
type: String,
required: true
},
password:{
type: String,
required: true
},
nextOfKin:{
type: String,
required: true
},
nextOfKinPhone:{
type: String,
required: true
},
address:{
type: String,
required: true
},
state:{
type: String,
required: true
},
messages: {
  type: [{
    sender: {
      type: String
   
    },
    text: {
      type: String
 
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}




});

const Signupmodel = mongoose.model('Signupmodel', signUpSchema);

module.exports = Signupmodel;

