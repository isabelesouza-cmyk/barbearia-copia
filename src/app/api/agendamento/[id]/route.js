import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET(
  request,
  { params }
) {
  try {
    const pool = getPool();

    const resultado = await pool.query(
      `
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
      WHERE a.id_agendamento = $1
      `,
      [params.id]
    );

    if (resultado.rows.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          erro: 'Agendamento não encontrado.'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      agendamento: resultado.rows[0]
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

export async function DELETE(
  request,
  { params }
) {
  try {
    const pool = getPool();

    const resultado = await pool.query(
      `
      DELETE FROM agendamento
      WHERE id_agendamento = $1
      RETURNING id_agendamento
      `,
      [params.id]
    );

    if (resultado.rows.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          erro: 'Agendamento não encontrado.'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      mensagem:
        'Agendamento removido com sucesso.'
    });
  } catch (erro) {
    console.error(erro);

    return NextResponse.json(
      {
        ok: false,
        erro: 'Erro ao excluir agendamento.'
      },
      { status: 500 }
    );
  }
}