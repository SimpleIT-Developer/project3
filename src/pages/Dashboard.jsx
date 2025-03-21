
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [branches, setBranches] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      const res = await fetch('http://erp-simpleit.sytes.net:8051/api/framework/v1/Branches', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBranches(data.items || []);
    };
    fetchData();
  }, []);

  const filtered = branches.filter(b => b.Description.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={{ padding: 20 }}>
      <h2>Filiais</h2>
      <input placeholder="Filtrar por nome" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <table border="1" cellPadding="5" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>City</th>
            <th>State</th>
            <th>CGC</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b, i) => (
            <tr key={i}>
              <td>{b.Code}</td>
              <td>{b.Description}</td>
              <td>{b.City}</td>
              <td>{b.State}</td>
              <td>{b.CGC}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
