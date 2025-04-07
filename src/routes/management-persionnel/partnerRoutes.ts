import express from 'express';
import {
  getPartners,
  addPartner,
  updatePartner,
  deletePartner
} from '../../controllers/management-persionnel/partner.controller';

const partnerRoutes = express.Router();

partnerRoutes.get('/', getPartners);
partnerRoutes.post('/', addPartner);
partnerRoutes.patch('/', updatePartner);
partnerRoutes.delete('/', deletePartner);

export default partnerRoutes;