const express = require('express');
const router = express.Router();
const { createComplaint  , getUserComplaints , deleteTicket } = require('../controllers/ticketController');
const { auth, admin} = require('../middleware/authMiddleware');

router.post('/complaint', auth, createComplaint);
router.get('/complaints', auth, getUserComplaints);
router.delete('/complaints/:id', auth, deleteTicket);


// router.put('/:id', auth, admin, updateComplaint);
// router.get('/all', auth, admin, getComplaints);



module.exports = router;
