import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin" && senha === "123") {
      localStorage.setItem("token", "meu-token");
      navigate("/home");
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Entrar
        </button>
        {erro && <p style={styles.erro}>{erro}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f0f0",
  },
  box: {
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "100%",
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    padding: 10,
    width: "100%",
    fontSize: 16,
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  erro: {
    marginTop: 10,
    color: "red",
  },
};
