import express from 'express';
import {
  Welcome,
  allUsers,
  allVendors,
  deleteUser,
  editUser,
  findUser,
  login,
  register,
  updatePassword,
  verifyEmail,
  getUserInfo
} from '../controllers/user.controller';

import { VerifyAccessToken } from '../middleware/verfiyToken';
import { addFeedback, addReview, selectFeedback } from '../controllers/review.controller';

const router = express.Router();

// Route definitions
router.get('/', Welcome);

router.get('/finduser/:id', findUser);
router.get('/allusers', allUsers);
router.get('/allvendors', allVendors);

router.post('/register', register);
router.patch('/updateuser/:id', editUser);
router.patch('/updatepassword/:id', updatePassword);

router.delete('/deleteuser/:id', VerifyAccessToken, deleteUser);

router.post('/login', login);
router.post('/addreview/:id', addReview);
router.post('/addfeedback/:id', addFeedback);

router.get('/getfeedback/:id', selectFeedback);

router.get('/verfiy-email', verifyEmail);
router.get('/user-info/:id', getUserInfo);

export default router;
