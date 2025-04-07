import express from 'express';
import {
  getPersonnel,
  addPersonnel,
  updatePersonnel,
  deletePersonnel
} from '../../controllers/management-persionnel/personnel.controller';

const personnelRoutes = express.Router();

personnelRoutes.get('/', getPersonnel);
personnelRoutes.post('/', addPersonnel);
personnelRoutes.patch('/', updatePersonnel);
personnelRoutes.delete('/', deletePersonnel);

export default personnelRoutes;