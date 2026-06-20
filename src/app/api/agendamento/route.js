import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

const SERVICOS_VALIDOS = [
  'Corte de cabelo',
  'Barba',
  'Combo completo'
];

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

    const dataEscolhida = new Date(
      dados.data + 'T00:00:00'
    );

    if (dataEscolhida < hoje) {
      erros.push(
        'A data deve ser igual ou posterior a hoje.'
      );
    }
  }

  return erros;
}

export async function GET() {
  try {
    const pool = getPool();

    const resultado = await pool.query(`
      SELECT
        a.id_agendamento,
        c.nome,
        c.telefone,
        s.nome_servico,
        a.data_agendamento,
        a.data_cadastro,
        a.observacao
      FROM agendamento a
      JOIN cliente c
        ON c.id_cliente = a.id_cliente
      JOIN servico s
        ON s.id_servico = a.id_servico
      ORDER BY a.data_agendamento ASC,
               a.data_cadastro DESC
    `);

    return NextResponse.json({
      ok: true,
      agendamento: resultado.rows
    });
  } catch (erro) {
    console.error(erro);

    return NextResponse.json(
      {
        ok: false,
        erro: 'Erro ao buscar agendamento.'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  let dados;

  try {
    dados = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        erros: ['Corpo da requisição inválido.']
      },
      { status: 400 }
    );
  }

  const erros = validarAgendamento(dados);

  if (erros.length > 0) {
    return NextResponse.json(
      { ok: false, erros },
      { status: 400 }
    );
  }

  try {
    const pool = getPool();

    const clienteResult = await pool.query(
      `
      INSERT INTO cliente (nome, telefone)
      VALUES ($1, $2)
      RETURNING id_cliente
      `,
      [
        dados.nome.trim(),
        dados.telefone.trim()
      ]
    );

    const id_cliente =
      clienteResult.rows[0].id_cliente;

    const servicoResult = await pool.query(
      `
      SELECT id_servico
      FROM servico
      WHERE nome_servico = $1
      LIMIT 1
      `,
      [dados.servico]
    );

    if (servicoResult.rows.length === 0) {
      throw new Error('Serviço não encontrado.');
    }

    const id_servico =
      servicoResult.rows[0].id_servico;

    const resultado = await pool.query(
      `
      INSERT INTO agendamento
      (
        id_cliente,
        id_servico,
        data_agendamento,
        observacao
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id_agendamento
      `,
      [
        id_cliente,
        id_servico,
        dados.data,
        dados.observacoes?.trim() || null
      ]
    );

    return NextResponse.json(
      {
        ok: true,
        mensagem:
          'Agendamento criado com sucesso.',
        id: resultado.rows[0].id_agendamento
      },
      { status: 201 }
    );
  } catch (erro) {
    console.error(erro);

    return NextResponse.json(
      {
        ok: false,
        erro: 'Erro ao salvar agendamento.'
      },
      { status: 500 }
    );
  }
}