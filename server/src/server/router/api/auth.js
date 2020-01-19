import express from 'express';
import customers from '../../controllers/authController';
import { yupValidationSignIn, yupValidationSignUp } from '../../utils/yupValidation';
import checkToken from '../../utils/checkToken';

const router = express.Router();

router.post('/signin', yupValidationSignIn, customers.login);
router.post('/signup', yupValidationSignUp, customers.createUser);
router.get('/get-user', checkToken, customers.getCurrentUser);
router.put('/set-photo', checkToken, customers.changeProfilePicture);
router.put('/', checkToken, customers.editUser);

export default router;
