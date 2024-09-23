import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/FlujoCompra.css';

const FlujoCompra = () => {
  // Estados para manejar los datos del flujo de compra
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [materiales, setMateriales] = useState([]);
  const [materialSeleccionado, setMaterialSeleccionado] = useState(null);
  const [cantidadMaterial, setCantidadMaterial] = useState(0);
  const [listaCompra, setListaCompra] = useState([]);
  const [facturaId, setFacturaId] = useState(null);
  const [montoPago, setMontoPago] = useState(0);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Cargar proveedores y materiales desde la API
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/proveedores');
        setProveedores(response.data);
      } catch (err) {
        setError('Error al cargar los proveedores.');
      }
    };

    const fetchMateriales = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/materiales');
        setMateriales(response.data);
      } catch (err) {
        setError('Error al cargar los materiales.');
      }
    };

    fetchProveedores();
    fetchMateriales();
  }, []);

  // Manejar selección de proveedor
  const handleSelectProveedor = (e) => {
    const proveedor = proveedores.find(p => p.id === parseInt(e.target.value));
    setProveedorSeleccionado(proveedor);
    setError('');
  };

  // Manejar selección de material
  const handleSelectMaterial = (e) => {
    const material = materiales.find(m => m.id === parseInt(e.target.value));
    setMaterialSeleccionado(material);
    setError('');
  };

  // Manejar cambio de cantidad del material
  const handleCantidadChange = (e) => {
    const cantidad = parseInt(e.target.value);
    if (cantidad > 0) {
      setCantidadMaterial(cantidad);
      setError('');
    } else {
      setError('La cantidad debe ser mayor que cero.');
    }
  };

  // Agregar material a la lista de compra
  const handleAddMaterial = () => {
    if (!materialSeleccionado) {
      setError('Debe seleccionar un material.');
      return;
    }
    if (cantidadMaterial <= 0) {
      setError('La cantidad debe ser mayor que cero.');
      return;
    }
    if (cantidadMaterial > materialSeleccionado.cantidad) {
      setError(`La cantidad seleccionada excede la disponibilidad del material. Disponibles: ${materialSeleccionado.cantidad}`);
      return;
    }

    const nuevoMaterial = {
      ...materialSeleccionado,
      cantidad: cantidadMaterial,
    };

    setListaCompra([...listaCompra, nuevoMaterial]);
    setMaterialSeleccionado(null);
    setCantidadMaterial(0);
    setMensaje('Material agregado a la lista de compra.');
    setError('');
  };

  // Crear factura
  const handleCrearFactura = async () => {
    if (!proveedorSeleccionado) {
      setError('Debe seleccionar un proveedor antes de registrar la factura.');
      return;
    }
    if (listaCompra.length === 0) {
      setError('Debe agregar al menos un material a la lista de compra.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/facturas-proveedores', {
        proveedor_id: proveedorSeleccionado.id,
        monto: listaCompra.reduce((acc, item) => acc + item.cantidad * item.costo, 0),
      });

      setFacturaId(response.data.id);
      setMontoPago(response.data.monto);
      setMensaje('Factura registrada exitosamente.');
      setError('');
    } catch (err) {
      setError('Error al registrar la factura.');
    }
  };

  // Realizar pago
  const handlePago = async () => {
    if (!facturaId) {
      setError('Debe registrar una factura antes de realizar el pago.');
      return;
    }

    try {
      await axios.post('/api/pagos-proveedores', {
        factura_proveedor_id: facturaId,
        monto: montoPago,
        metodo_pago: 'transferencia',
      });

      setMensaje('Pago realizado exitosamente.');
      setError('');
    } catch (err) {
      setError('Error al realizar el pago.');
    }
  };

  return (
    <div>
      <h1>Flujo de Compra</h1>

      {/* Mostrar errores */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

      {/* Seleccionar Proveedor */}
      <div>
        <h2>Seleccionar Proveedor</h2>
        <select onChange={handleSelectProveedor} value={proveedorSeleccionado?.id || ''}>
          <option value="">Seleccione un proveedor</option>
          {proveedores.map(proveedor => (
            <option key={proveedor.id} value={proveedor.id}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Seleccionar Material */}
      <div>
        <h2>Agregar Material a la Compra</h2>
        <select onChange={handleSelectMaterial} value={materialSeleccionado?.id || ''}>
          <option value="">Seleccione un material</option>
          {materiales.map(material => (
            <option key={material.id} value={material.id}>
              {material.nombre} - Disponibles: {material.cantidad}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={cantidadMaterial}
          onChange={handleCantidadChange}
          placeholder="Cantidad"
        />
        <button onClick={handleAddMaterial} disabled={!materialSeleccionado || cantidadMaterial <= 0}>
          Agregar Material
        </button>
      </div>

      {/* Lista de Compra */}
      <div>
        <h2>Lista de Compra</h2>
        <ul>
          {listaCompra.map((item, index) => (
            <li key={index}>
              {item.nombre} - {item.cantidad} unidades - Costo por unidad: {item.costo} Q
            </li>
          ))}
        </ul>
        <button onClick={handleCrearFactura} disabled={!proveedorSeleccionado || listaCompra.length === 0}>
          Registrar Factura
        </button>
      </div>

      {/* Realizar Pago */}
      {facturaId && (
        <div>
          <h2>Pago</h2>
          <p>Monto a pagar: Q{montoPago}</p>
          <button onClick={handlePago}>
            Realizar Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default FlujoCompra;
