import express from 'express';
import * as PCsController from '../controllers/PCsController.js';

const router = express.Router();

router.get('/pcs/:id', PCsController.getPC);
router.get('/pcs', PCsController.getAllPCs);
router.post("/addPC", PCsController.addPC);
router.delete('/pcs/:id', PCsController.deletePC);

export default router;
