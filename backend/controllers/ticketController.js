const ticketModel= require('../models/complaint');


const createComplaint = async (req, res) => {
  const { complaint } = req.body;
  const userId = req.user.userId;

  const newComplaint = new ticketModel({
    user: userId,
    complaint
  });

  const createdComplaint = await newComplaint.save();
  res.status(201).json(createdComplaint);
};

const getUserComplaints = async (req, res) => {
  const complaints = await ticketModel.find({user: req.user.userId}).populate('user', 'name email');
  res.json(complaints);
};

const deleteTicket = async (req, res) => {
      const ticket = await ticketModel.findById(req.params.id);

      if (!ticket) {
          return res.status(404).json({ message: 'Complaint not found' });
      }
      await ticketModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Complaint deleted successfully' });
};

// const getComplaints = async (req, res) => {
//   try {
//     const complaints = await ticketModel.find().populate('user', 'name email');
//     res.json(complaints);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching complaints', error });
//   }
// };


// const updateComplaint = async (req, res) => {
//   try {
//     const { response, status, assignee } = req.body;

//     const complaint = await Complaint.findById(req.params.id);
//     if (complaint) {
//       complaint.response = response;
//       complaint.status = status || complaint.status;
//       complaint.assignee = assignee;

//       const updatedComplaint = await complaint.save();
//       res.json(updatedComplaint);
//     } else {
//       res.status(404).json({ message: 'Complaint not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating complaint', error });
//   }
// };



module.exports ={ createComplaint,getUserComplaints ,deleteTicket} ;
