const complaintModel = require('../models/complaint');

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintModel.find().populate('user', 'name email');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { status, response, assignee } = req.body;
    const complaint = await complaintModel.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status || complaint.status;
    complaint.response = response || complaint.response;
    complaint.assignee = assignee || complaint.assignee;

    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllComplaints, updateComplaintStatus };
