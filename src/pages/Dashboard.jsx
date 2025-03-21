import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [branches, setBranches] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get("http://erp-simpleit.sytes.net:8051/api/framework/v1/Branches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBranches(response.data.items || []);
      } catch (error) {
        console.error("Erro ao buscar filiais", error);
      }
    };

    fetchBranches();
  }, []);

  const filtered = branches.filter((item) =>
    item.Description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Filiais</h2>
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: 10, padding: 8 }}
      />
      <table border="1" cellPadding="10" cellSpacing="0">
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
          {filtered.map((item) => (
            <tr key={item.Code}>
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
};

export default Dashboard;