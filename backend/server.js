const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db  = require('./config/db.js')

const dotenv = require("dotenv");
const UserRoute = require('./routes/userRoute.js')
const UserComplaintRoute = require('./routes/ticketRoute.js')
const adminRoute = require('./routes/adminRoute.js')

const app = express();

dotenv.config()
app.use(cors());
app.use(express.json());

db()





// app.post('/register', async (req, res) => {
//   const { username, password, role } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, password: hashedPassword, role });
//   await user.save();
//   res.status(201).send(user);
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (user && await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({ userId: user._id, role: user.role }, 'secret');
//     res.send({ token });
//   } else {
//     res.status(401).send('Invalid credentials');
//   }
// });

// app.post('/complaints', async (req, res) => {
//   const complaint = new Complaint(req.body);
//   await complaint.save();
//   res.status(201).send(complaint);
// });

// app.get('/complaints', async (req, res) => {
//   const complaints = await Complaint.find();
//   res.send(complaints);
// });

// app.put('/complaints/:id', async (req, res) => {
//   const { id } = req.params;
//   const complaint = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
//   res.send(complaint);
// });


app.use("/api/user", UserRoute)
app.use('/api/ticket', UserComplaintRoute);
app.use('/api/admin' , adminRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
