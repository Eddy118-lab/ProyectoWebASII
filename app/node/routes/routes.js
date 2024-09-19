import express from 'express';
import {
    deletedata, getdata, getdataone, postdata, putdata
} from '../controllers/controller.js';
import {
    deleteCliente, getClientes, getClienteById, createCliente, updateCliente
} from '../controllers/ClienteController.js';
import {
    deleteTipoCliente, getTipoClientes, getTipoClienteById, createTipoCliente, updateTipoCliente
} from '../controllers/TipoClienteController.js';
import {
    deleteProveedor, getProveedores, getProveedorById, createProveedor, updateProveedor
} from '../controllers/ProveedorController.js';
import {
    deleteTipoProveedor, getTipoProveedores, getTipoProveedorById, createTipoProveedor, updateTipoProveedor
} from '../controllers/TipoProveedorController.js';
import {
    deleteMaterial, getMaterials, getMaterialById, createMaterial, updateMaterial
} from '../controllers/MaterialController.js';  // Asegúrate de que la ruta sea correcta
import {
    deleteFactura, getFacturas, getFacturaById, createFactura, updateFactura
} from '../controllers/FacturaProveedorController.js'; // Importar el controlador de facturas
import { login } from '../controllers/LoginController.js'; // Importar el controlador de login

// Importar los controladores para DetallFactProvee y PagoProveedor
import {
    deleteDetallFactProvee, getDetallFactProvees, getDetallFactProveeById, createDetallFactProvee, updateDetallFactProvee
} from '../controllers/DetallFactProveeController.js';
import {
    deletePagoProveedor, getPagosProveedores, getPagoProveedorById, createPagoProveedor, updatePagoProveedor
} from '../controllers/PagoProveedorController.js';
import{
    deleteColaborador,getPersonal, getPersolaById, createColaborador, updateColaborador
}from'../controllers/GestionPersonalController.js';

const router = express.Router();

//// CRUD DE USUARIOS
router.get('/usuario', getdata);
router.get('/usuario/:id', getdataone);
router.post('/usuario', postdata);
router.put('/usuario/:id', putdata);
router.delete('/usuario/:id', deletedata);

///// CRUD DE CLIENTES
router.get('/clientes', getClientes);
router.get('/clientes/:id', getClienteById);
router.post('/clientes', createCliente);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);

///// CRUD DE TIPOS DE CLIENTE
router.get('/tipos-clientes', getTipoClientes);
router.get('/tipos-clientes/:id', getTipoClienteById);
router.post('/tipos-clientes', createTipoCliente);
router.put('/tipos-clientes/:id', updateTipoCliente);
router.delete('/tipos-clientes/:id', deleteTipoCliente);

///// CRUD DE PROVEEDORES
router.get('/proveedores', getProveedores);
router.get('/proveedores/:id', getProveedorById);
router.post('/proveedores', createProveedor);
router.put('/proveedores/:id', updateProveedor);
router.delete('/proveedores/:id', deleteProveedor);

///// CRUD DE TIPOS DE PROVEEDORES
router.get('/tipos-proveedores', getTipoProveedores);
router.get('/tipos-proveedores/:id', getTipoProveedorById);
router.post('/tipos-proveedores', createTipoProveedor);
router.put('/tipos-proveedores/:id', updateTipoProveedor);
router.delete('/tipos-proveedores/:id', deleteTipoProveedor);

///// CRUD DE MATERIALES
router.get('/materiales', getMaterials);
router.get('/materiales/:id', getMaterialById);
router.post('/materiales', createMaterial);
router.put('/materiales/:id', updateMaterial);
router.delete('/materiales/:id', deleteMaterial);

///// CRUD DE FACTURAS DE PROVEEDORES
router.get('/facturas-proveedores', getFacturas);  // Obtener todas las facturas
router.get('/facturas-proveedores/:id', getFacturaById);  // Obtener una factura por ID
router.post('/facturas-proveedores', createFactura);  // Crear una nueva factura
router.put('/facturas-proveedores/:id', updateFactura);  // Actualizar una factura
router.delete('/facturas-proveedores/:id', deleteFactura);  // Eliminar una factura

///// CRUD DE DETALLES DE FACTURAS DE PROVEEDORES
router.get('/detalles-facturas-proveedores', getDetallFactProvees);  // Obtener todos los detalles de facturas
router.get('/detalles-facturas-proveedores/:id', getDetallFactProveeById);  // Obtener un detalle de factura por ID
router.post('/detalles-facturas-proveedores', createDetallFactProvee);  // Crear un nuevo detalle de factura
router.put('/detalles-facturas-proveedores/:id', updateDetallFactProvee);  // Actualizar un detalle de factura
router.delete('/detalles-facturas-proveedores/:id', deleteDetallFactProvee);  // Eliminar un detalle de factura

///// CRUD DE PAGOS A PROVEEDORES
router.get('/pagos-proveedores', getPagosProveedores);  // Obtener todos los pagos a proveedores
router.get('/pagos-proveedores/:id', getPagoProveedorById);  // Obtener un pago a proveedor por ID
router.post('/pagos-proveedores', createPagoProveedor);  // Crear un nuevo pago a proveedor
router.put('/pagos-proveedores/:id', updatePagoProveedor);  // Actualizar un pago a proveedor
router.delete('/pagos-proveedores/:id', deletePagoProveedor);  // Eliminar un pago a proveedor

///// CRUD DE GESTION DE PERSONAL
router.get('/conductores', getPersonal);
router.get('/conductores/:id', getPersolaById);
router.post('/conductores', createColaborador);
router.put('/conductores/:id', updateColaborador);
router.delete('/conductores/:id', deleteColaborador);

///// INICIO DE SESIÓN
router.post('/login', login); // Ruta para el login

export default router;
