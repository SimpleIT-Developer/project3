import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [branches, setBranches] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("http://erp-simpleit.sytes.net:8051/api/framework/v1/Branches", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(err => {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  const filtered = branches.filter(b =>
    b.Description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Filiais</h2>
      <input
        placeholder="Filtrar por Descrição"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <table border="1" cellPadding={8} style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>CGC</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(branch => (
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