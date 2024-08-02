const express = require('express');
const router = express.Router();
const {getAllComplaints , updateComplaintStatus} = require('../controllers/adminController');
const { auth, admin} = require('../middleware/authMiddleware');

router.get('/complaints', auth,admin, getAllComplaints);
router.post('/complaints/:id', auth, admin, updateComplaintStatus);


module.exports = router;
