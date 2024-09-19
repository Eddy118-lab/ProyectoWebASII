import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import Material from './Material.js'; // Asegúrate de importar el modelo correcto
import FacturaProveedor from './FacturaProveedor.js'; // Asegúrate de importar el modelo correcto

const DetallFactProvee = sequelize.define('DetallFactProvee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Clave primaria de la tabla detall_fact_provee'
    },
    cantidad: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        comment: 'Cantidad de material en la factura'
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Precio unitario del material'
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Subtotal de la línea de detalle'
    },
    descuento: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: 'Descuento aplicado a la línea de detalle'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Total después de aplicar el descuento'
    },
    material_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Clave foránea que referencia al material'
    },
    factura_proveedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Clave foránea que referencia a la factura del proveedor'
    }
}, {
    tableName: 'detall_fact_provee',
    timestamps: false,
    comment: 'Tabla para almacenar los detalles de las facturas de proveedores',
});

// Definir las relaciones
DetallFactProvee.belongsTo(Material, {
    foreignKey: 'material_id',
    as: 'material',
});

DetallFactProvee.belongsTo(FacturaProveedor, {
    foreignKey: 'factura_proveedor_id',
    as: 'facturaProveedor',
});

export default DetallFactProvee;
