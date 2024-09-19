// Modelo FacturaProveedor
import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import Proveedor from './Proveedor.js';

const FacturaProveedor = sequelize.define('factura_proveedor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Clave primaria de la tabla factura_proveedor'
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha de emisión de la factura'
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Monto total de la factura'
    },
    proveedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Clave foránea que referencia al proveedor que emitió la factura'
    }
}, {
    tableName: 'factura_proveedor',
    timestamps: false,
    comment: 'Tabla para almacenar las facturas de los proveedores'
});

// Relación: Una factura pertenece a un proveedor
FacturaProveedor.belongsTo(Proveedor, {
    foreignKey: 'proveedor_id',
    as: 'proveedor'
});

export default FacturaProveedor;
