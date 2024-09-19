import FacturaProveedor from '../models/FacturaProveedor.js';
import Proveedor from '../models/Proveedor.js';

// Obtener todas las facturas
export const getFacturas = async (req, res) => {
    try {
        const facturas = await FacturaProveedor.findAll({
            include: { model: Proveedor, as: 'proveedor' } // Incluir el proveedor en la respuesta
        });
        res.json(facturas);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener una factura por ID
export const getFacturaById = async (req, res) => {
    try {
        const factura = await FacturaProveedor.findByPk(req.params.id, {
            include: { model: Proveedor, as: 'proveedor' }
        });
        if (factura) {
            res.json(factura);
        } else {
            res.status(404).json({ message: 'Factura no encontrada' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear una nueva factura
export const createFactura = async (req, res) => {
    try {
        const factura = await FacturaProveedor.create(req.body);
        res.status(201).json(factura);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar una factura
export const updateFactura = async (req, res) => {
    try {
        const factura = await FacturaProveedor.findByPk(req.params.id);
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        await factura.update(req.body);
        res.json(factura);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar una factura
export const deleteFactura = async (req, res) => {
    try {
        const result = await FacturaProveedor.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Factura eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Factura no encontrada' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
