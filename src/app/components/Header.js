"use client";

import { useState } from "react";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header>
      <nav className="nav" aria-label="Navegação principal">
        <div className="logo">
          <span>✂</span> Navalha<span> &amp; Cia</span>
        </div>

        <button
          className="menu-toggle"
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          onClick={() => setMenuAberto((a) => !a)}
        >
          ☰ Menu
        </button>

        <ul id="menu-principal" className={`menu ${menuAberto ? "open" : ""}`}>
          <li><a href="#linux-fundamentos">Início</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#como-funciona">Como Funciona</a></li>
          <li><a href="#depoimentos">Depoimentos</a></li>
          <li><a href="#cadastro" className="btn btn-primary" style={{ padding: "10px 20px" }}>Agendar</a></li>
        </ul>
      </nav>
    </header>
  );
}
