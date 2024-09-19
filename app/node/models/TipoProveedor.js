import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

const TipoProveedor = sequelize.define('TipoProveedor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'clave primaria de la tabla tipo_proveedor'
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'descripcion breve del tipo de proveedor existente'
    }
}, {
    tableName: 'tipo_proveedor',
    timestamps: false,
    comment: 'Tabla para almacenar los tipos de proveedores',
});

export default TipoProveedor;