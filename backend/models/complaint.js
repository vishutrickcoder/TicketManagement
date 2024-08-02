const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  complaint: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  response: { type: String },
  assignee: { type:String} 
} ,{timestamps:true});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
