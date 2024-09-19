import TipoProveedor from '../models/TipoProveedor.js'; // Asegúrate de que la ruta sea correcta

// Obtener todos los tipos de proveedores
export const getTipoProveedores = async (req, res) => {
    try {
        const tipoProveedores = await TipoProveedor.findAll();
        console.log(tipoProveedores);  // Verifica la respuesta aquí
        res.json(tipoProveedores);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un tipo de proveedor por ID
export const getTipoProveedorById = async (req, res) => {
    try {
        const tipoProveedor = await TipoProveedor.findByPk(req.params.id);
        if (tipoProveedor) {
            res.json(tipoProveedor);
        } else {
            res.status(404).json({ message: 'Tipo de proveedor no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo tipo de proveedor
export const createTipoProveedor = async (req, res) => {
    try {
        const tipoProveedor = await TipoProveedor.create(req.body);
        res.status(201).json(tipoProveedor);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un tipo de proveedor
export const updateTipoProveedor = async (req, res) => {
    try {
        const tipoProveedor = await TipoProveedor.findByPk(req.params.id);
        if (!tipoProveedor) {
            return res.status(404).json({ message: 'Tipo de proveedor no encontrado' });
        }
        await tipoProveedor.update(req.body);
        res.json(tipoProveedor);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un tipo de proveedor
export const deleteTipoProveedor = async (req, res) => {
    try {
        const result = await TipoProveedor.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Tipo de proveedor eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Tipo de proveedor no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
