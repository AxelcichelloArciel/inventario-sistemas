import express from 'express';
import * as PCsController from '../controllers/PCsController.js';
import * as InsumosController from "../controllers/InsumosController.js";

const router = express.Router();

//Rutas definidas para PCs
router.get('/pcs/:id', PCsController.getPC);
router.get('/pcs', PCsController.getAllPCs);
router.post("/addPC", PCsController.addPC);
router.delete('/pcs/:id', PCsController.deletePC);
router.put('/pcs/:id', PCsController.updatePC);


//Rutas defindas para el inventario de componentes
router.get('/insumos', InsumosController.getAllInsumos);
router.put(`/insumos/:id`, InsumosController.consumirInsumo);
router.delete('/insumos/:id', InsumosController.deleteInsumo);

export default router;
