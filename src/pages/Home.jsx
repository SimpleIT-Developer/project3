import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://erp-simpleit.sytes.net:8051/api/framework/v1/Branches', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (err) {
        console.error('Erro ao buscar dados', err);
      }
    };
    fetchData();
  }, []);

  const filtrado = data.filter(item => item.Description?.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Filiais</h2>
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Código da Filial</th>
            <th>Descrição</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>CGC</th>
          </tr>
        </thead>
        <tbody>
          {filtrado.map((item, index) => (
            <tr key={index}>
              <td>{item.Code}</td>
              <td>{item.Description}</td>
              <td>{item.City}</td>
              <td>{item.State}</td>
              <td>{item.CGC}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}