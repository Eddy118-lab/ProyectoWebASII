import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

const Conductor = sequelize.define('conductor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'clave primaria de la tabla conductor'
    },
    primer_nom: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'primer nombre del colaborador'
    },
    segundo_nombre: {
        type: DataTypes.STRING(75),
        allowNull: false,
        comment: 'segundo nombre del colaborador'
    },
    primer_apell: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'primer apellido del colaborador'
    },
    segundo_apell: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'segundo nombre del colaborador'
    },
    no_licencia: {
        type: DataTypes.STRING(15),
        allowNull: false,
        comment: 'identificación del número correspondiente a la licencia de conducción'
    },
    telefono: {
        type: DataTypes.STRING(25),
        allowNull: false,
        comment: 'telefono del colaborador'
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'email del colaborador'
    },
    fecha_contratacion: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'fecha de contratación del colaborador'
    }
}, {
    tableName: 'conductor',
    timestamps: false,
    comment: 'Tabla para almacenar los datos de la Gestión de Personal',
});

export default Conductor;