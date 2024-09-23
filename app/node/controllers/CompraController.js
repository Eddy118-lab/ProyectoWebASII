// controllers/CompraController.js

import sequelize from "../database/db.js";
import { FacturaProveedor, DetallFactProvee, PagoProveedor, Proveedor, Material } from '../models/index.js'; // Asegúrate de exportar todos los modelos en un índice

/**
 * Realiza una compra completa: crea una factura, sus detalles y un pago asociado.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const realizarCompra = async (req, res) => {
    const { proveedorId, materiales, facturaInfo, pagoInfo } = req.body;

    // Validaciones básicas
    if (!proveedorId || !materiales || materiales.length === 0 || !facturaInfo) {
        return res.status(400).json({ message: 'Datos de compra incompletos.' });
    }

    const transaction = await sequelize.transaction();

    try {
        // Verificar que el proveedor exista
        const proveedor = await Proveedor.findByPk(proveedorId, { transaction });
        if (!proveedor) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Proveedor no encontrado.' });
        }

        // Crear la factura del proveedor
        const factura = await FacturaProveedor.create({
            fecha: facturaInfo.fecha,
            monto: facturaInfo.monto,
            proveedor_id: proveedorId
        }, { transaction });

        // Crear los detalles de la factura y actualizar el stock de materiales
        for (const item of materiales) {
            const { material_id, cantidad, precio_unitario, descuento } = item;

            // Verificar que el material exista
            const material = await Material.findByPk(material_id, { transaction });
            if (!material) {
                await transaction.rollback();
                return res.status(404).json({ message: `Material con ID ${material_id} no encontrado.` });
            }

            // Calcular subtotal y total
            const subtotal = cantidad * precio_unitario;
            const total = descuento ? subtotal - descuento : subtotal;

            // Crear el detalle de la factura
            await DetallFactProvee.create({
                cantidad,
                precio_unitario,
                subtotal,
                descuento: descuento || 0,
                total,
                material_id,
                factura_proveedor_id: factura.id
            }, { transaction });

            // Actualizar la cantidad en existencia del material
            material.cantidad += cantidad;
            await material.save({ transaction });
        }

        // Crear el pago al proveedor si se proporciona información de pago
        if (pagoInfo) {
            const { fecha, monto, metodo_pago } = pagoInfo;

            // Validar que el monto del pago no exceda el monto de la factura
            if (monto > facturaInfo.monto) {
                await transaction.rollback();
                return res.status(400).json({ message: 'El monto del pago excede el monto de la factura.' });
            }

            await PagoProveedor.create({
                fecha,
                monto,
                metodo_pago,
                factura_proveedor_id: factura.id
            }, { transaction });
        }

        // Confirmar la transacción
        await transaction.commit();
        res.status(201).json({ message: 'Compra realizada exitosamente.', facturaId: factura.id });

    } catch (error) {
        // Revertir la transacción en caso de error
        if (transaction) await transaction.rollback();
        console.error('Error al realizar la compra:', error);
        res.status(500).json({ message: 'Error al realizar la compra.', error: error.message });
    }
};
