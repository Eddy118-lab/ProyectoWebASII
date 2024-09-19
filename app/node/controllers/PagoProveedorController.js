import PagoProveedor from '../models/PagoProveedor.js';
import FacturaProveedor from '../models/FacturaProveedor.js'; // Asegúrate de importar el modelo correcto

// Obtener todos los pagos a proveedores
export const getPagosProveedores = async (req, res) => {
    try {
        const pagosProveedores = await PagoProveedor.findAll({
            include: { model: FacturaProveedor, as: 'facturaProveedor' } // Incluir la factura del proveedor en la respuesta
        });
        console.log(pagosProveedores);  // Verifica la respuesta aquí
        res.json(pagosProveedores);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un pago a proveedor por ID
export const getPagoProveedorById = async (req, res) => {
    try {
        const pagoProveedor = await PagoProveedor.findByPk(req.params.id, {
            include: { model: FacturaProveedor, as: 'facturaProveedor' }
        });
        if (pagoProveedor) {
            res.json(pagoProveedor);
        } else {
            res.status(404).json({ message: 'Pago a proveedor no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo pago a proveedor
export const createPagoProveedor = async (req, res) => {
    try {
        const pagoProveedor = await PagoProveedor.create(req.body);
        res.status(201).json(pagoProveedor);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un pago a proveedor
export const updatePagoProveedor = async (req, res) => {
    try {
        const pagoProveedor = await PagoProveedor.findByPk(req.params.id);
        if (!pagoProveedor) {
            return res.status(404).json({ message: 'Pago a proveedor no encontrado' });
        }
        await pagoProveedor.update(req.body);
        res.json(pagoProveedor);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un pago a proveedor
export const deletePagoProveedor = async (req, res) => {
    try {
        const result = await PagoProveedor.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Pago a proveedor eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Pago a proveedor no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
