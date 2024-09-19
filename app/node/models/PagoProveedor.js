import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import FacturaProveedor from './FacturaProveedor.js'; // Asegúrate de importar el modelo correcto

const PagoProveedor = sequelize.define('PagoProveedor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Clave primaria de la tabla pago_proveedor'
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha del pago al proveedor'
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Monto del pago al proveedor'
    },
    metodo_pago: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'metodo de pago al proveedor'
    },
    factura_proveedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Clave foránea que referencia a la factura del proveedor'
    }
}, {
    tableName: 'pago_proveedor',
    timestamps: false,
    comment: 'Tabla para almacenar los pagos realizados a proveedores',
});

// Definir la relación con el modelo FacturaProveedor
PagoProveedor.belongsTo(FacturaProveedor, {
    foreignKey: 'factura_proveedor_id',
    as: 'facturaProveedor',
});

export default PagoProveedor;
