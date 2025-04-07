import { Router } from 'express';
import { getDashboardStatistics } from '../controllers/dashboardController';

const dashboardRoutes = Router();

dashboardRoutes.get('/', getDashboardStatistics);

export default dashboardRoutes;