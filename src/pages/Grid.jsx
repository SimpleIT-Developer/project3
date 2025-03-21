import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Grid = () => {
  const [branches, setBranches] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    fetch("http://erp-simpleit.sytes.net:8051/api/framework/v1/Branches", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setBranches(data))
      .catch(() => navigate("/"));
  }, []);

  return (
    <div>
      <h2>Filiais</h2>
      <input
        type="text"
        placeholder="Filtrar por nome"
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
      />
      <table>
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
          {branches
            .filter((b) => b.Description.toLowerCase().includes(filter))
            .map((branch) => (
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
};

export default Grid;