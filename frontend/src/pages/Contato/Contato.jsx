import { useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Instagram, Send, CheckCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import styles from './Contato.module.css'

function PageHero() {
  return (
    <section className="page-hero">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'var(--color-accent-yellow)', fontWeight: 600, marginBottom: 12, fontSize: 'var(--font-size-sm)' }}>
          Fale conosco
        </p>
        <h1>Vamos conversar?</h1>
        <p>
          Seja para contratar nossos serviços, tirar dúvidas ou cadastrar seu currículo,
          estamos prontos para te atender.
        </p>
      </div>
    </section>
  )
}

const interesseOptions = [
  { value: '', label: 'Selecione seu interesse' },
  { value: 'contratar', label: 'Quero contratar serviço (empresa)' },
  { value: 'candidato', label: 'Sou candidato — quero me cadastrar' },
  { value: 'proposta', label: 'Solicitar proposta comercial' },
  { value: 'parceria', label: 'Proposta de parceria' },
  { value: 'outro', label: 'Outro assunto' },
]

const initialForm = {
  nome: '',
  email: '',
  telefone: '',
  empresa: '',
  interesse: '',
  mensagem: '',
}

function ContatoForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório'
    if (!form.email.trim()) errs.email = 'E-mail é obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'E-mail inválido'
    if (!form.interesse) errs.interesse = 'Selecione seu interesse'
    if (!form.mensagem.trim()) errs.mensagem = 'Mensagem é obrigatória'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    // Simula envio — em produção conectar com backend
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className={styles.successState}>
        <CheckCircle size={56} color="var(--color-success)" />
        <h3>Mensagem enviada com sucesso!</h3>
        <p>
          Recebemos seu contato e retornaremos em até <strong>1 dia útil</strong>.
          Fique de olho no seu e-mail: <strong>{form.email}</strong>
        </p>
        <Button variant="secondary" size="md" onClick={() => { setForm(initialForm); setSubmitted(false) }}>
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className="grid grid--2">
        <div className="form-group">
          <label className="form-label" htmlFor="nome">Nome completo *</label>
          <input
            id="nome"
            name="nome"
            type="text"
            className="form-input"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
          />
          {errors.nome && <span className="form-error">{errors.nome}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">E-mail *</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="telefone">Telefone / WhatsApp</label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            className="form-input"
            placeholder="(11) 99999-9999"
            value={form.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="empresa">Empresa (opcional)</label>
          <input
            id="empresa"
            name="empresa"
            type="text"
            className="form-input"
            placeholder="Nome da empresa"
            value={form.empresa}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="interesse">Qual é o seu interesse? *</label>
        <select
          id="interesse"
          name="interesse"
          className="form-select"
          value={form.interesse}
          onChange={handleChange}
        >
          {interesseOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.interesse && <span className="form-error">{errors.interesse}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="mensagem">Mensagem *</label>
        <textarea
          id="mensagem"
          name="mensagem"
          className="form-textarea"
          placeholder="Descreva sua necessidade ou dúvida..."
          rows={5}
          value={form.mensagem}
          onChange={handleChange}
        />
        {errors.mensagem && <span className="form-error">{errors.mensagem}</span>}
      </div>

      <Button type="submit" variant="accent" size="lg" disabled={loading}>
        {loading ? 'Enviando...' : (
          <>
            <Send size={16} />
            Enviar mensagem
          </>
        )}
      </Button>
    </form>
  )
}

function InfoCard() {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoSection}>
        <h3>Informações de contato</h3>
        <div className={styles.infoList}>
          <a href="tel:+5511999999999" className={styles.infoItem}>
            <div className="icon-circle icon-circle--primary">
              <Phone size={20} />
            </div>
            <div>
              <p className={styles.infoLabel}>Telefone / WhatsApp</p>
              <p className={styles.infoValue}>(11) 99999-9999</p>
            </div>
          </a>

          <a href="mailto:contato@unigestao.com.br" className={styles.infoItem}>
            <div className="icon-circle icon-circle--yellow">
              <Mail size={20} />
            </div>
            <div>
              <p className={styles.infoLabel}>E-mail</p>
              <p className={styles.infoValue}>contato@unigestao.com.br</p>
            </div>
          </a>

          <div className={styles.infoItem}>
            <div className="icon-circle icon-circle--orange">
              <MapPin size={20} />
            </div>
            <div>
              <p className={styles.infoLabel}>Localização</p>
              <p className={styles.infoValue}>São Paulo, SP — Brasil</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className={styles.infoSection}>
        <h3>Redes sociais</h3>
        <div className={styles.socialList}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
            <Linkedin size={20} />
            <div>
              <p className={styles.infoLabel}>LinkedIn</p>
              <p className={styles.infoValue}>UNI Gestão de Pessoas</p>
            </div>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
            <Instagram size={20} />
            <div>
              <p className={styles.infoLabel}>Instagram</p>
              <p className={styles.infoValue}>@unigestaodepessoas</p>
            </div>
          </a>
        </div>
      </div>

      <hr className="divider" />

      <div className={styles.infoSection}>
        <h3>Horário de atendimento</h3>
        <div className={styles.horariosGrid}>
          <div>
            <p className={styles.infoLabel}>Segunda a Sexta</p>
            <p className={styles.infoValue}>08h00 – 18h00</p>
          </div>
          <div>
            <p className={styles.infoLabel}>WhatsApp</p>
            <p className={styles.infoValue}>Seg – Sex, até 20h</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Contato() {
  return (
    <>
      <PageHero />

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.formSection}>
              <h2>Envie uma mensagem</h2>
              <p className={styles.formIntro}>
                Preencha o formulário e retornaremos em até 1 dia útil. Promessa.
              </p>
              <ContatoForm />
            </div>

            <InfoCard />
          </div>
        </div>
      </section>

      {/* FAQ rápido */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <h2>Perguntas frequentes</h2>
            <p>Respostas para as dúvidas mais comuns.</p>
          </div>
          <div className="grid grid--2">
            {faq.map((item) => (
              <div key={item.pergunta} className={styles.faqItem}>
                <h4>{item.pergunta}</h4>
                <p>{item.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const faq = [
  {
    pergunta: 'Qual o custo do serviço de recrutamento?',
    resposta: 'Nossos honorários são baseados no salário da posição preenchida. O investimento é feito somente após a contratação do candidato — sem custo em caso de não preenchimento da vaga.',
  },
  {
    pergunta: 'Quanto tempo demora o processo seletivo?',
    resposta: 'Em média, apresentamos os finalistas em 10 a 15 dias úteis após o briefing. Para posições executivas via Hunting, o prazo pode ser de 20 a 30 dias.',
  },
  {
    pergunta: 'Existe garantia de reposição?',
    resposta: 'Sim. Oferecemos garantia de 90 dias para processos de R&S e de 6 meses para Hunting. Caso o candidato não se adapte, refazemos o processo sem custo adicional.',
  },
  {
    pergunta: 'Vocês atendem empresas de qual porte?',
    resposta: 'Atendemos empresas de todos os portes — desde startups até grandes corporações. Cada solução é personalizada para a realidade e o momento do cliente.',
  },
  {
    pergunta: 'Os candidatos recebem feedback?',
    resposta: 'Sim, sempre. Acreditamos que feedback é um direito de quem participa de um processo seletivo. Todos os candidatos recebem retorno, independentemente do resultado.',
  },
  {
    pergunta: 'Como funciona a avaliação psicológica?',
    resposta: 'A avaliação é conduzida por nossa psicóloga especialista, utilizando instrumentos validados pelo CFP. Os resultados integram um relatório completo apresentado à empresa contratante.',
  },
]
