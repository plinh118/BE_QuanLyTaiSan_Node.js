import express from 'express';
import {
  getIntellectualProperties,
  addIntellectualProperty,
  updateIntellectualProperty,
  deleteIntellectualProperty
} from '../../controllers/management-product/intellectualProperty.controller';

const intellectualPropertyRoutes = express.Router();

intellectualPropertyRoutes.get('/', getIntellectualProperties);
intellectualPropertyRoutes.post('/', addIntellectualProperty);
intellectualPropertyRoutes.patch('/', updateIntellectualProperty);
intellectualPropertyRoutes.delete('/', deleteIntellectualProperty);

export default intellectualPropertyRoutes;