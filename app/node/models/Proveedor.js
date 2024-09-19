import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import TipoProveedor from './TipoProveedor.js'; // Usa import en lugar de require

const Proveedor = sequelize.define('Proveedor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'clave primaria de la tabla cliente'
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'nombre de la institucion juridica o individual'
    },
    direccion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'direccion de la institucion juridica o individual'
    },
    telefono: {
        type: DataTypes.STRING(25),
        allowNull: false,
        comment: 'telefono de la institucion juridica o individual'
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'email de la institucion juridica o individual'
    },
    nit: {
        type: DataTypes.STRING(15),
        allowNull: false,
        comment: 'codigo de identificacion tributararia del cliente'
    },
    tipo_proveedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'clave foranea proveniente de la tabla tipo_proveedor'
    }
}, {
    tableName: 'proveedor',
    timestamps: false,
    comment: 'Tabla para almacenar los datos de los proveedores',
});

// Definir la relación con el modelo TipoCliente
Proveedor.belongsTo(TipoProveedor, {
    foreignKey: 'tipo_proveedor_id',
    as: 'tipoProveedor',
});

export default Proveedor;
