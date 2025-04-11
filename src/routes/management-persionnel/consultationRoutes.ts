// src/routes/consultation.route.ts
import express from 'express';
import {
  getConsultations,
  addConsultation,
  updateConsultation,
  deleteConsultation,
} from '../../controllers/management-persionnel/consultation.controller';

const consultationRoutes = express.Router();
consultationRoutes.get('/', getConsultations);
consultationRoutes.post('/', addConsultation);
consultationRoutes.patch('/', updateConsultation);
consultationRoutes.delete('/', deleteConsultation);

export default consultationRoutes;