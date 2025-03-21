import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BranchesPage() {
  const [branches, setBranches] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://erp-simpleit.sytes.net:8051/api/framework/v1/Branches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBranches(response.data.items || []);
      } catch (error) {
        console.error("Erro ao buscar filiais:", error);
      }
    };

    fetchBranches();
  }, []);

  const filtered = branches.filter((branch) =>
    branch.Description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Filiais</h2>
      <input
        type="text"
        placeholder="Filtrar por nome..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
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
          {filtered.map((branch) => (
            <tr key={branch.Code}>
              <td>{branch.Code}</td>
              <td>{branch.Description}</td>
              <td>{branch.City}</td>
              <td>{branch.State}</td>
              <td>{branch.CGC}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}