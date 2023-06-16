const bodyParser=require('body-parser')
const Car = require('./../models/Car');
const upload = multer({
  storage: storage,
  limits: { files: 5 } // Set the maximum number of files allowed to 5
});
const multer=require('multer')
function Uploadcardetails(req, res) => {
    const {
      region,
      make,
      color,
      condition,
      transmission,
      mileage,
      vin,
      registered,
      description,
      price,
      negotiable,
      sellerPhoneNumber,
      email,
    } = req.body;

    const images = req.files.map((file) => file.path);
  /*dat=email*/
    const car = new Car({
      region,
      make,
      color,
      condition,
      transmission,
      mileage,
      vin,
      registered,
      description,
      price,
      negotiable,
      sellerPhoneNumber,
      email,
      images,
    });

    car.save()
      .then(() => {
        res.status(200).send('Car data saved successfully');
      })
      .catch((error) => {
        res.status(500).send('Error saving car data');
        console.error('Error saving car data:', error);
      });
  })
module.exports = Uploadcardetails
