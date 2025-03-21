
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [branches, setBranches] = useState([])
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('access_token')

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }

    const fetchData = async () => {
      try {
        const res = await axios.get('http://erp-simpleit.sytes.net:8051/api/framework/v1/Branches', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setBranches(res.data)
      } catch {
        localStorage.removeItem('access_token')
        navigate('/')
      }
    }

    fetchData()
  }, [])

  const filtered = branches.filter((b) =>
    b.Description?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div style={{ padding: 20 }}>
      <h2>Filiais</h2>
      <input
        placeholder="Filtrar por nome"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
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
          {filtered.map((b) => (
            <tr key={b.Code}>
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
  )
}
