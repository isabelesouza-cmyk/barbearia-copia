import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

const SERVICOS_VALIDOS = ['Corte de cabelo', 'Barba', 'Combo completo'];

function validarAgendamento(dados) {
  const erros = [];
  if (!dados.nome || dados.nome.trim().split(' ').length < 2) {
    erros.push('Informe seu nome completo.');
  }
  const telefoneLimpo = (dados.telefone || '').replace(/\D/g, '');
  if (telefoneLimpo.length < 10) {
    erros.push('Informe um telefone válido com DDD.');
  }
  if (!SERVICOS_VALIDOS.includes(dados.servico)) {
    erros.push('Serviço inválido.');
  }
  if (!dados.data) {
    erros.push('Informe a data do agendamento.');
  } else {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataEscolhida = new Date(dados.data + 'T00:00:00');
    if (dataEscolhida < hoje) erros.push('A data deve ser igual ou posterior a hoje.');
  }
  return erros;
}

export async function GET() {
  try {
    const pool = getPool();
    const [linhas] = await pool.query(
      `SELECT id, nome, telefone, servico, data_agendamento, observacoes, criado_em
       FROM agendamento ORDER BY data_agendamento ASC, criado_em DESC`
    );
    return NextResponse.json({ ok: true, agendamento: linhas });
  } catch (erro) {
    console.error(erro);
    return NextResponse.json({ ok: false, erro: 'Erro ao buscar agendamento.' }, { status: 500 });
  }
}

export async function POST(request) {
  let dados;
  try {
    dados = await request.json();
  } catch {
    return NextResponse.json({ ok: false, erros: ['Corpo da requisição inválido.'] }, { status: 400 });
  }

  const erros = validarAgendamento(dados);
  if (erros.length > 0) {
    return NextResponse.json({ ok: false, erros }, { status: 400 });
  }

  try {
    const pool = getPool();
    const [resultado] = await pool.query(
      `INSERT INTO agendamento (nome, telefone, servico, data_agendamento, observacoes)
       VALUES (?, ?, ?, ?, ?)`,
      [dados.nome.trim(), dados.telefone.trim(), dados.servico, dados.data, dados.observacoes?.trim() || null]
    );
    return NextResponse.json({ ok: true, mensagem: 'Agendamento criado com sucesso.', id: resultado.insertId }, { status: 201 });
  } catch (erro) {
    console.error(erro);
    return NextResponse.json({ ok: false, erro: 'Erro ao salvar agendamento.' }, { status: 500 });
  }
}
