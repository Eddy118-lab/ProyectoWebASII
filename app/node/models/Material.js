// ./models/Material.js
import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import Proveedor from './Proveedor.js'; // Usa import en lugar de require

const Material = sequelize.define('Material', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Clave primaria de la tabla material'
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Nombre del material'
    },
    descripcion: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Descripción del material'
    },
    unidad_medida: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Unidad de medida del material'
    },
    costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Costo del material'
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'cantidad del material en existencia'
    },
    proveedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Clave foránea proveniente de la tabla proveedor'
    }
}, {
    tableName: 'material',
    timestamps: false,
    comment: 'Tabla para almacenar los datos de los materiales',
});

// Definir la relación con el modelo Proveedor
Material.belongsTo(Proveedor, {
    foreignKey: 'proveedor_id',
    as: 'proveedor',
});

export default Material;
