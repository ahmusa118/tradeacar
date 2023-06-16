const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
const PayStack = require('paystack-node')
app.use(cors())
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');
const ejs = require('ejs');
const authenticateToken = require('./auth/Authtoken');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const url = require('url');
const jwt=require('jsonwebtoken')
require("dotenv").config()
const mongoose=require('mongoose')
const multer=require('multer')
const Car = require('./models/Car');
const Signupmodel=require('./models/Signupmodel')
let dat=null
app.set('view engine', 'ejs');
const APIKEY = 'sk_test_f2c71386864743ac7450134fc0e65b7ae3fc588a';
const environment = 'test'; // Use 'live' for production environment
const secretKey = require('./config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the Multer upload instance


// Use Multer middleware for file uploads
const upload = multer({
  storage: storage,
  limits: { files: 5 } // Set the maximum number of files allowed to 5
});

app.get('/cars', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = 5;

  try {
    const cars = await Car.find({adpaid:'yes'})
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json('Error fetching cars');
  }
})
app.get('/i',(req,res)=>{
    res.send('hello')
})
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', async (data, callback) => { // Added callback function
      const { senderEmail, receiverEmail, text } = data;
      const sender = await Signupmodel.findOne({ email: senderEmail });
      const receiver = await Signupmodel.findOne({ email: receiverEmail });

      if (!sender || !receiver) {
          console.log("One or more users not found");
          callback({ status: 'failed', message: 'One or more users not found' }); // Send back error message
          return;
      } else {
          const message = {
              senderEmail,
              text
          }

          sender.messages.push(message);
          receiver.messages.push(message);
          
          await sender.save();
          await receiver.save();

          io.emit('message', data); // Send the message to all connected clients
          callback({ status: 'success' }); // Send back success status
      }
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});



// POST route for uploading images
app.post('/upload', upload.array('images', 5), (req, res) => {
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


app.post('/search', async (req, res) => {
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
  } = req.body;

  // Construct a query object
 let query = {};

  // Only include properties in the query object if they are not empty
  if(region !== '') query.region = { $regex: new RegExp(region, 'i') };
  if(make !== '') query.make = { $regex: new RegExp(make, 'i') };
  if(color !== '') query.color = { $regex: new RegExp(color, 'i') };
  if(condition !== '') query.condition = { $regex: new RegExp(condition, 'i') };
  if(transmission !== '') query.transmission = { $regex: new RegExp(transmission, 'i') };
  if(vin !== '') query.vin = { $regex: new RegExp(vin, 'i') };
  if(registered !== '') query.registered = { $regex: new RegExp(registered, 'i') };
  if(description !== '') query.description = { $regex: new RegExp(description, 'i') };
  if(negotiable !== '') query.negotiable = { $regex: new RegExp(negotiable, 'i') };

  // For mileage and price, check if the values are within a certain range
  if(mileage[1] > 100) query.mileage = { $gte: mileage[0], $lte: mileage[1] };
  if(price[1] > 100) query.price = { $gte: price[0], $lte: price[1] };

  try {
    const cars = await Car.find({
    $and: [
      query, 
      { adpaid: 'yes' }
    ]
  })
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get("/ind/:name", function(req, res) {
    const {name}=req.params
  res.sendFile(__dirname +'/uploads' +"/"+ name);
})

app.get('/chg/:email/:vin', (req, res) => {
  const email = req.params.email; // Replace with your email value
const vin=req.params.vin
  // Render the paystack template and pass the email variable as data
  res.render('paystack', { email,vin });
});

const paystack = new PayStack(APIKEY, environment);

app.get('/',(req,res)=>{
    res.send('api running')
})

app.post('/userdetails', (req, res) => {
  const {
    email,
    phone,
    firstName,
    lastName,
    password,
    nextOfKin,
    nextOfKinPhone,
    address,
    state
  } = req.body;

  const newUser = new Signupmodel({
    email,
    phone,
    firstName,
    lastName,
    password,
    nextOfKin,
    nextOfKinPhone,
    address,
    state,
    messages: []  // Empty array
  });

  newUser.save()
    .then(() => {
      res.status(200).send('user data saved man');
    })
    .catch((error) => {
      res.status(500).send('Error saving user data');
      console.error('Error saving user data:', error);
    });
});


app.post('/charge', async (req, res) => {
  // Log the payment details received from Paystack
  console.log(req.body);

  // Assume that 'paymentSuccessful' is a field in req.body that indicates whether the payment was successful
  if (req.body.paymentResponse.status === 'success') {
    try {
      const data = await Car.findOne({ email: req.body.email, vin: req.body.vin });
      if (data) {
        data.adpaid= 'yes';
       data.save();
        res.json({ success: true, message: 'Payment details received and data saved' });
      } else {
        res.status(400).json({ success: false, message: 'No matching Car found in database' });
      }
    } catch (error) {
      console.error('Error saving car data:', error);
      res.status(500).json({ success: false, message: 'Error saving car data' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Payment error' });
  }
})


app.post('/login', async (req, res) => {
const det = await Signupmodel.findOne({
  email: { $regex: new RegExp(req.body.email, 'i') },
  password: req.body.password
});
  if (!det) {
    res.status(404).json({ error: 'wrong username or password' });
  } else {
      
    const token = jwt.sign({ userId: det._id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
      dat=det.email

  }
})

server.listen(3000, () => {
    console.log('listening on *:3000');
})

app.get('/dashboard', authenticateToken, async (req, res) => {
  const userId = req.userId;

  const house = await Signupmodel.findById(userId);

  if (!house) {
    res.status(404).json({ error: 'details not found' });
  } else {
    res.json(house);
  }
})

app.get('/getmessages', async (req, res) => {
    const { email } = req.query;

    try {
        const user = await Signupmodel.findOne({ email: email });

        // If user not found, return an error
        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        // Send user's messages as response
        res.status(200).json(user.messages);
    } catch (error) {
        res.status(500).send("Error fetching messages");
        console.error('Error fetching messages:', error);
    }
});





  /*try {
    // Find both sender and receiver
  

    // If either user not found, return an error
    if (!sender || !receiver) {
      res.status(404).send("One or more users not found");
      return;
    }

    // Create a message object
  
  } catch (error) {
    res.status(500).send("Error saving message");
    console.error('Error saving message:', error);


 /*const message = {
      senderEmail,
      text
    };

    // Add the message to both users' messages arrays
    sender.messages.push(message);
    receiver.messages.push(message);

    // Save both users' documents
    await sender.save();
    await receiver.save();*/
    

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    // Continue with your code after successful connection
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    // Handle error
  }
}

connectToMongoDB();
