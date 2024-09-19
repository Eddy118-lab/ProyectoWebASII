import DetallFactProvee from '../models/DetallFactProvee.js';
import Material from '../models/Material.js'; // Asegúrate de importar el modelo correcto
import FacturaProveedor from '../models/FacturaProveedor.js'; // Asegúrate de importar el modelo correcto

// Obtener todos los detalles de la factura de proveedor
export const getDetallFactProvees = async (req, res) => {
    try {
        const detallFactProvees = await DetallFactProvee.findAll({
            include: [
                { model: Material, as: 'material' }, // Incluir el material en la respuesta
                { model: FacturaProveedor, as: 'facturaProveedor' } // Incluir la factura del proveedor en la respuesta
            ]
        });
        console.log(detallFactProvees);  // Verifica la respuesta aquí
        res.json(detallFactProvees);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un detalle de la factura de proveedor por ID
export const getDetallFactProveeById = async (req, res) => {
    try {
        const detallFactProvee = await DetallFactProvee.findByPk(req.params.id, {
            include: [
                { model: Material, as: 'material' },
                { model: FacturaProveedor, as: 'facturaProveedor' }
            ]
        });
        if (detallFactProvee) {
            res.json(detallFactProvee);
        } else {
            res.status(404).json({ message: 'Detalle de factura no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo detalle de factura de proveedor
export const createDetallFactProvee = async (req, res) => {
    try {
        const detallFactProvee = await DetallFactProvee.create(req.body);
        res.status(201).json(detallFactProvee);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un detalle de factura de proveedor
export const updateDetallFactProvee = async (req, res) => {
    try {
        const detallFactProvee = await DetallFactProvee.findByPk(req.params.id);
        if (!detallFactProvee) {
            return res.status(404).json({ message: 'Detalle de factura no encontrado' });
        }
        await detallFactProvee.update(req.body);
        res.json(detallFactProvee);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un detalle de factura de proveedor
export const deleteDetallFactProvee = async (req, res) => {
    try {
        const result = await DetallFactProvee.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Detalle de factura eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Detalle de factura no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
