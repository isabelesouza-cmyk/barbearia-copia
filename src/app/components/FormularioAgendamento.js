"use client";

import { useState } from "react";

const SERVICOS = [
  { value: "", label: "Selecione..." },
  { value: "Corte de cabelo", label: "Corte de cabelo — R$ 45" },
  { value: "Barba", label: "Barba — R$ 35" },
  { value: "Combo completo", label: "Combo completo — R$ 85" },
];

const hojeISO = new Date().toISOString().split("T")[0];

export default function FormularioAgendamento() {
  const [etapa, setEtapa] = useState(1);
  const [form, setForm] = useState({ nome: "", telefone: "", servico: "", data: "", obs: "" });
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState(null);

  function atualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function validarEtapa1() {
    const novosErros = {};
    if (form.nome.trim().split(" ").length < 2 || form.nome.trim().length < 4)
      novosErros.nome = "Digite seu nome completo.";
    if (form.telefone.replace(/\D/g, "").length < 10)
      novosErros.telefone = "Digite um telefone válido.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function validarEtapa2() {
    const novosErros = {};
    if (!form.servico) novosErros.servico = "Escolha um serviço.";
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    const dataEscolhida = form.data ? new Date(form.data + "T00:00:00") : null;
    if (!dataEscolhida || dataEscolhida < hoje) novosErros.data = "Escolha uma data a partir de hoje.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function irParaEtapa2() { if (validarEtapa1()) { setErros({}); setEtapa(2); } }
  function irParaEtapa3() { if (validarEtapa2()) { setErros({}); setEtapa(3); } }
  function voltar(n) { setErros({}); setEtapa(n); }

  async function enviarFormulario(e) {
    e.preventDefault();
    setEnviando(true);
    setStatus(null);

    const dados = {
      nome: form.nome.trim(),
      telefone: form.telefone.trim(),
      servico: form.servico,
      data: form.data,
      observacoes: form.obs.trim(),
    };

    try {
      const resposta = await fetch("/api/agendamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      const resultado = await resposta.json();
      if (!resposta.ok || !resultado.ok) {
        throw new Error(resultado.erros ? resultado.erros.join(" ") : resultado.erro || "Erro ao enviar.");
      }
      setStatus({ tipo: "success", mensagem: `✅ Agendamento recebido! Confirmaremos pelo telefone ${dados.telefone} em breve.` });
      setForm({ nome: "", telefone: "", servico: "", data: "", obs: "" });
      setErros({});
      setEtapa(1);
    } catch (erro) {
      setStatus({ tipo: "error", mensagem: `⚠️ ${erro.message}` });
    } finally {
      setEnviando(false);
    }
  }

  const servicoSelecionado = SERVICOS.find((s) => s.value === form.servico);
  const dataFormatada = form.data
    ? new Date(form.data + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <div>
      <div className="progress" aria-hidden="true">
        <div className={`dot ${etapa >= 1 ? "active" : ""}`}></div>
        <div className={`dot ${etapa >= 2 ? "active" : ""}`}></div>
        <div className={`dot ${etapa >= 3 ? "active" : ""}`}></div>
      </div>

      <form onSubmit={enviarFormulario} noValidate aria-describedby="formStatus">

        {/* Etapa 1 */}
        <div className={`form-step ${etapa === 1 ? "active" : ""}`}>
          <div className="field">
            <label htmlFor="nome">Nome completo</label>
            <input type="text" id="nome" autoComplete="name" required
              className={erros.nome ? "invalid" : ""}
              value={form.nome} onChange={(e) => atualizarCampo("nome", e.target.value)} />
            {erros.nome && <span className="error-msg show">{erros.nome}</span>}
          </div>
          <div className="field">
            <label htmlFor="telefone">Telefone / WhatsApp</label>
            <input type="tel" id="telefone" autoComplete="tel" placeholder="(24) 90000-0000" required
              className={erros.telefone ? "invalid" : ""}
              value={form.telefone} onChange={(e) => atualizarCampo("telefone", e.target.value)} />
            {erros.telefone && <span className="error-msg show">{erros.telefone}</span>}
          </div>
          <div className="form-nav">
            <span></span>
            <button type="button" className="btn btn-primary" onClick={irParaEtapa2}>Continuar</button>
          </div>
        </div>

        {/* Etapa 2 */}
        <div className={`form-step ${etapa === 2 ? "active" : ""}`}>
          <div className="field">
            <label htmlFor="servico">Serviço desejado</label>
            <select id="servico" required value={form.servico} onChange={(e) => atualizarCampo("servico", e.target.value)}>
              {SERVICOS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            {erros.servico && <span className="error-msg show">{erros.servico}</span>}
          </div>
          <div className="field">
            <label htmlFor="data">Data preferida</label>
            <input type="date" id="data" required min={hojeISO}
              className={erros.data ? "invalid" : ""}
              value={form.data} onChange={(e) => atualizarCampo("data", e.target.value)} />
            {erros.data && <span className="error-msg show">{erros.data}</span>}
          </div>
          <div className="form-nav">
            <button type="button" className="btn btn-ghost" onClick={() => voltar(1)}>Voltar</button>
            <button type="button" className="btn btn-primary" onClick={irParaEtapa3}>Continuar</button>
          </div>
        </div>

        {/* Etapa 3 */}
        <div className={`form-step ${etapa === 3 ? "active" : ""}`}>
          <div className="field">
            <p style={{ fontWeight: 700, marginBottom: 4 }}>Confira seus dados</p>
            <ul className="summary-list">
              <li><span className="k">Nome</span><span>{form.nome}</span></li>
              <li><span className="k">Telefone</span><span>{form.telefone}</span></li>
              <li><span className="k">Serviço</span><span>{servicoSelecionado?.label}</span></li>
              <li><span className="k">Data</span><span>{dataFormatada}</span></li>
            </ul>
          </div>
          <div className="field">
            <label htmlFor="obs">Observações (opcional)</label>
            <textarea id="obs" rows={3} placeholder="Ex.: prefiro o período da tarde"
              value={form.obs} onChange={(e) => atualizarCampo("obs", e.target.value)} />
            <span className="hint">Esse campo é opcional.</span>
          </div>
          <div className="form-nav">
            <button type="button" className="btn btn-ghost" onClick={() => voltar(2)}>Voltar</button>
            <button type="submit" className="btn btn-primary" disabled={enviando}>
              {enviando ? <><span className="spinner" aria-hidden="true"></span> Enviando...</> : "Confirmar agendamento"}
            </button>
          </div>
        </div>

      </form>

      <div id="formStatus" role="status" aria-live="polite"
        className={`feedback-box ${status ? status.tipo : ""} ${status ? "" : "hidden"}`}>
        {status?.mensagem}
      </div>
    </div>
  );
}
