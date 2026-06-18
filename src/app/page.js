import Header from "./components/Header";
import FormularioAgendamento from "./components/FormularioAgendamento";

export default function Home() {
  return (
    <>
      <a href="#cadastro" className="skip-link">Ir direto para o cadastro</a>

      <Header />

      <main id="conteudo">

        {/* HERO */}
        <section className="hero" id="linux-fundamentos">
          <div className="container hero-grid">
            <div>
              <span className="eyebrow">Barbearia em Barra Mansa</span>
              <h1>O corte certo, <em>sem complicação.</em></h1>
              <p className="lead">
                Agende seu horário em poucos cliques, escolha o serviço e chegue na hora.
                Sem fila, sem espera, sem estresse.
              </p>
              <div className="hero-actions">
                <a href="#cadastro" className="btn btn-primary">Quero agendar meu horário</a>
                <a href="#servicos" className="btn btn-ghost">Ver serviços</a>
              </div>
            </div>

            <div className="ticket" aria-hidden="true">
              <h3>Comanda do dia</h3>
              <div className="ticket-row">
                <span className="label">Corte degradê</span>
                <span className="value">R$ 45</span>
              </div>
              <div className="ticket-row">
                <span className="label">Barba completa</span>
                <span className="value">R$ 35</span>
              </div>
              <div className="ticket-row">
                <span className="label">Sobrancelha</span>
                <span className="value">R$ 15</span>
              </div>
              <div className="ticket-total">
                <span>Combo completo</span>
                <span className="value">R$ 85</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">O que fazemos</span>
              <h2>Serviços</h2>
              <p>Cada serviço é feito com tempo certo, ferramentas certas e atenção total ao seu estilo.</p>
            </div>
            <div className="services-grid">
              <article className="service-card">
                <div className="service-icon" aria-hidden="true">💈</div>
                <h3>Corte de cabelo</h3>
                <p>Do social ao degradê moderno, ajustado ao formato do seu rosto.</p>
                <span className="service-price">A partir de R$ 45</span>
              </article>
              <article className="service-card">
                <div className="service-icon" aria-hidden="true">🪒</div>
                <h3>Barba</h3>
                <p>Toalha quente, navalha e acabamento alinhado ao seu corte.</p>
                <span className="service-price">A partir de R$ 35</span>
              </article>
              <article className="service-card">
                <div className="service-icon" aria-hidden="true">✨</div>
                <h3>Combo completo</h3>
                <p>Corte + barba + sobrancelha em um único horário, com desconto.</p>
                <span className="service-price">R$ 85</span>
              </article>
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Nosso trabalho</span>
              <h2>Alguns cortes recentes</h2>
              <p>Veja exemplos reais de cortes feitos no nosso espaço.</p>
            </div>
            <div className="gallery-grid">
              <figure className="gallery-item">
                <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80" alt="Cliente com corte degradê curto, acabamento na régua" />
                <figcaption className="gallery-cap">Degradê clássico</figcaption>
              </figure>
              <figure className="gallery-item">
                <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80" alt="Cliente recebendo acabamento de barba com navalha" />
                <figcaption className="gallery-cap">Barba alinhada</figcaption>
              </figure>
              <figure className="gallery-item">
                <img src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80" alt="Corte moderno com risco lateral e topo texturizado" />
                <figcaption className="gallery-cap">Topo texturizado</figcaption>
              </figure>
              <figure className="gallery-item">
                <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80" alt="Ambiente interno da barbearia com cadeiras e espelhos" />
                <figcaption className="gallery-cap">Nosso espaço</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Simples assim</span>
              <h2>Como funciona o agendamento</h2>
              <p>Quatro passos, do cadastro à confirmação.</p>
            </div>
            <div className="steps">
              <div className="step">
                <div className="num">01</div>
                <h3>Preencha seus dados</h3>
                <p>Nome, telefone e o serviço de interesse.</p>
              </div>
              <div className="step">
                <div className="num">02</div>
                <h3>Escolha um horário</h3>
                <p>Selecione o dia e o período que funciona para você.</p>
              </div>
              <div className="step">
                <div className="num">03</div>
                <h3>Confirme</h3>
                <p>Revise as informações e envie sua solicitação.</p>
              </div>
              <div className="step">
                <div className="num">04</div>
                <h3>Receba a confirmação</h3>
                <p>Entraremos em contato para confirmar o horário.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section id="depoimentos">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Quem já passou por aqui</span>
              <h2>O que dizem nossos clientes</h2>
            </div>
            <div className="testimonials">
              <article className="testimonial">
                <div className="stars" aria-label="5 de 5 estrelas">★★★★★</div>
                <p>&quot;Atendimento rápido e o corte ficou exatamente como eu pedi. Voltarei sempre.&quot;</p>
                <div className="author"><span className="avatar">R</span> Rafael M.</div>
              </article>
              <article className="testimonial">
                <div className="stars" aria-label="5 de 5 estrelas">★★★★★</div>
                <p>&quot;Agendar pelo site foi muito fácil, em menos de 2 minutos já tinha meu horário marcado.&quot;</p>
                <div className="author"><span className="avatar">B</span> Bruno T.</div>
              </article>
              <article className="testimonial">
                <div className="stars" aria-label="4 de 5 estrelas">★★★★☆</div>
                <p>&quot;Ambiente agradável e profissionais atenciosos. Recomendo o combo completo.&quot;</p>
                <div className="author"><span className="avatar">L</span> Lucas F.</div>
              </article>
            </div>
          </div>
        </section>

        {/* CADASTRO */}
        <section id="cadastro">
          <div className="container">
            <div className="signup-section">
              <div className="signup-grid">
                <div className="signup-info">
                  <span className="eyebrow">Última etapa</span>
                  <h2>Agende seu horário</h2>
                  <p>Preencha o formulário abaixo. É rápido — leva menos de um minuto.</p>
                  <ul>
                    <li><span className="check">✓</span> Confirmação por telefone em até 1 hora</li>
                    <li><span className="check">✓</span> Sem custo para agendar</li>
                    <li><span className="check">✓</span> Você pode remarcar quando quiser</li>
                  </ul>
                </div>
                <FormularioAgendamento />
              </div>
            </div>
          </div>
        </section>

      </main>

      <a className="whatsapp-fab" href="https://wa.me/5524900000000" aria-label="Falar no WhatsApp" target="_blank" rel="noopener">
        💬
      </a>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo"><span>✂</span> Navalha<span> &amp; Cia</span></div>
              <p style={{ marginTop: 12 }}>Rua Josefina Reis, 72 — Barra Mansa, RJ<br />Seg a Sáb, 9h às 19h</p>
            </div>
            <div>
              <h4>Navegação</h4>
              <ul>
                <li><a href="#servicos">Serviços</a></li>
                <li><a href="#galeria">Galeria</a></li>
                <li><a href="#como">Como Funciona</a></li>
                <li><a href="#cadastro">Agendar</a></li>
              </ul>
            </div>
            <div>
              <h4>Contato</h4>
              <ul>
                <li><a href="tel:+5524900000000">(24) 90000-0000</a></li>
                <li><a href="mailto:contato@navalhaecia.com">contato@navalhaecia.com</a></li>
                <li><a href="#cadastro">Dar feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Navalha &amp; Cia. Todos os direitos reservados.</span>
            <span>Feito com ♥ em Barra Mansa</span>
          </div>
        </div>
      </footer>
    </>
  );
}
