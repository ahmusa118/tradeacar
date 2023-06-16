const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  region: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  mileage: {
    type: Number
  },
  vin: {
    type: String,
    required: true
  },
  registered: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  negotiable: {
    type: String,
    required: true
  },
  sellerPhoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    validate: {
      validator: function (array) {
        return array.every(item => item.match(/\.(jpg|jpeg|png)$/));
      },
      message: 'Invalid image format. Only JPG, JPEG, and PNG files are allowed.'
    }
  },
  adpaid: {
    type: String,
    default: 'no'
  },
  subscriptiontype: {
    type: String,
    default: 'none'
  }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
