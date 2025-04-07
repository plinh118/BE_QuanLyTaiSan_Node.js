import express from 'express';
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer
} from '../../controllers/management-persionnel/customer.controller';

const router = express.Router();

router.get('/', getCustomers);
router.post('/', addCustomer);
router.patch('/', updateCustomer); 
router.delete('/', deleteCustomer);

export default router;