import { useState, useRef, useCallback } from 'react'
import {
  Upload,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Linkedin,
  FileText,
  Shield,
  Clock,
  Star,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useBancoTalentos } from '../../hooks/useBancoTalentos'
import './BancoTalentos.css'

/* ============================================================
   Constantes de configuração do formulário
   ============================================================ */

const AREAS_INTERESSE = [
  { value: '', label: 'Selecione sua área de interesse' },
  { value: 'administrativo', label: 'Administrativo / Secretariado' },
  { value: 'comercial', label: 'Comercial / Vendas' },
  { value: 'contabilidade', label: 'Contabilidade / Finanças' },
  { value: 'engenharia', label: 'Engenharia' },
  { value: 'juridico', label: 'Jurídico' },
  { value: 'logistica', label: 'Logística / Supply Chain' },
  { value: 'marketing', label: 'Marketing / Comunicação' },
  { value: 'operacional', label: 'Operacional / Produção' },
  { value: 'rh', label: 'Recursos Humanos' },
  { value: 'saude', label: 'Saúde' },
  { value: 'tecnologia', label: 'Tecnologia da Informação' },
  { value: 'outro', label: 'Outro' },
]

const ARQUIVO_TIPOS_ACEITOS = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const ARQUIVO_EXTENSOES = '.pdf,.doc,.docx'
const ARQUIVO_MAX_MB = 5
const ARQUIVO_MAX_BYTES = ARQUIVO_MAX_MB * 1024 * 1024

const FORM_INICIAL = {
  nome: '',
  email: '',
  telefone: '',
  areaInteresse: '',
  pretensaoSalarial: '',
  linkedin: '',
  resumo: '',
  termos: false,
}

/* ============================================================
   Hero
   ============================================================ */

function PageHero() {
  return (
    <section className="page-hero">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p className="page-hero__eyebrow">Banco de Talentos</p>
        <h1>Cadastre seu currículo</h1>
        <p>
          Faça parte do nosso banco de talentos e seja encontrado pelas melhores
          empresas. Conectamos profissionais qualificados a oportunidades reais.
        </p>
      </div>

      {/* Decorações */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: -60, right: -60,
          width: 320, height: 320, borderRadius: '50%',
          background: 'var(--color-accent-yellow)', opacity: 0.06,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: -40, left: '30%',
          width: 200, height: 200, borderRadius: '50%',
          background: 'var(--color-accent-orange)', opacity: 0.06,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}

/* ============================================================
   Upload de arquivo
   ============================================================ */

function FileUploadArea({ arquivo, onSelect, onRemove, error }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) onSelect(file)
  }, [onSelect])

  const handleChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) onSelect(file)
    // Reseta o input para permitir selecionar o mesmo arquivo novamente
    e.target.value = ''
  }, [onSelect])

  function formatarTamanho(bytes) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const areaClass = [
    'uploadArea',
    dragging ? 'uploadArea--active' : '',
    error ? 'uploadArea--error' : '',
    arquivo ? 'uploadArea--hasFile' : '',
  ].filter(Boolean).join(' ')

  if (arquivo) {
    return (
      <div className={areaClass}>
        <div className="uploadIcon uploadIcon--success">
          <CheckCircle size={28} />
        </div>
        <p className="uploadFileName">{arquivo.name}</p>
        <p className="uploadFileSize">{formatarTamanho(arquivo.size)}</p>
        <button
          type="button"
          className="uploadRemoveBtn"
          onClick={onRemove}
          aria-label="Remover arquivo selecionado"
        >
          <X size={12} style={{ display: 'inline', marginRight: 4 }} />
          Remover arquivo
        </button>
      </div>
    )
  }

  return (
    <div
      className={areaClass}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      aria-label="Área de upload de currículo. Clique ou arraste o arquivo aqui"
    >
      <input
        ref={inputRef}
        type="file"
        accept={ARQUIVO_EXTENSOES}
        className="uploadInput"
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="uploadIcon">
        <Upload size={26} />
      </div>
      <p className="uploadTitle">
        {dragging ? 'Solte o arquivo aqui' : 'Clique ou arraste seu currículo'}
      </p>
      <p className="uploadSubtitle">
        PDF, DOC ou DOCX — máximo {ARQUIVO_MAX_MB} MB
      </p>
    </div>
  )
}

/* ============================================================
   Formulário principal
   ============================================================ */

function FormularioCadastro() {
  const [form, setForm] = useState(FORM_INICIAL)
  const [arquivo, setArquivo] = useState(null)
  const [errors, setErrors] = useState({})

  const { mutate, isPending, isSuccess, isError, error, reset } = useBancoTalentos()

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    const novoValor = type === 'checkbox' ? checked : value
    setForm((f) => ({ ...f, [name]: novoValor }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  function handleArquivoSelect(file) {
    if (!ARQUIVO_TIPOS_ACEITOS.includes(file.type)) {
      setErrors((prev) => ({ ...prev, curriculo: 'Formato inválido. Use PDF, DOC ou DOCX.' }))
      return
    }
    if (file.size > ARQUIVO_MAX_BYTES) {
      setErrors((prev) => ({ ...prev, curriculo: `Arquivo muito grande. Máximo ${ARQUIVO_MAX_MB} MB.` }))
      return
    }
    setArquivo(file)
    setErrors((prev) => ({ ...prev, curriculo: '' }))
  }

  function handleArquivoRemove() {
    setArquivo(null)
  }

  function validar() {
    const errs = {}

    if (!form.nome.trim()) {
      errs.nome = 'Nome completo é obrigatório'
    }

    if (!form.email.trim()) {
      errs.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Informe um e-mail válido'
    }

    if (!form.telefone.trim()) {
      errs.telefone = 'Telefone é obrigatório'
    }

    if (!form.areaInteresse) {
      errs.areaInteresse = 'Selecione uma área de interesse'
    }

    if (!form.resumo.trim()) {
      errs.resumo = 'Apresentação pessoal é obrigatória'
    } else if (form.resumo.trim().length < 50) {
      errs.resumo = 'Escreva pelo menos 50 caracteres na sua apresentação'
    }

    if (!arquivo) {
      errs.curriculo = 'Anexe seu currículo (PDF, DOC ou DOCX)'
    }

    if (!form.termos) {
      errs.termos = 'Você deve aceitar os termos de privacidade para continuar'
    }

    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validar()

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Scroll para o primeiro campo com erro
      const primeiroErro = document.querySelector('.form-error')
      primeiroErro?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    mutate({ ...form, curriculo: arquivo })
  }

  function handleNovoCadastro() {
    setForm(FORM_INICIAL)
    setArquivo(null)
    setErrors({})
    reset()
  }

  // Estado de sucesso
  if (isSuccess) {
    return (
      <div className="successState">
        <div className="successIcon">
          <CheckCircle size={44} />
        </div>
        <h3>Currículo cadastrado com sucesso!</h3>
        <p>
          Seu perfil foi incluído no nosso banco de talentos. Assim que surgir uma
          oportunidade compatível com seu perfil, entraremos em contato pelo e-mail{' '}
          <strong>{form.email}</strong>.
        </p>
        <Button variant="secondary" size="md" onClick={handleNovoCadastro}>
          Cadastrar outro currículo
        </Button>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {/* Erro geral de API */}
      {isError && (
        <div className="errorBanner" role="alert">
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>
            Ocorreu um erro ao enviar seu cadastro.{' '}
            {error?.message || 'Tente novamente em instantes.'}
          </span>
        </div>
      )}

      {/* Linha: nome + email */}
      <div className="grid grid--2">
        <div className="form-group">
          <label className="form-label" htmlFor="nome">
            Nome completo *
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            className="form-input"
            placeholder="Seu nome completo"
            value={form.nome}
            onChange={handleChange}
            autoComplete="name"
            aria-required="true"
            aria-describedby={errors.nome ? 'erro-nome' : undefined}
          />
          {errors.nome && (
            <span id="erro-nome" className="form-error" role="alert">
              {errors.nome}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            aria-required="true"
            aria-describedby={errors.email ? 'erro-email' : undefined}
          />
          {errors.email && (
            <span id="erro-email" className="form-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Linha: telefone + área de interesse */}
      <div className="grid grid--2">
        <div className="form-group">
          <label className="form-label" htmlFor="telefone">
            Telefone / WhatsApp *
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            className="form-input"
            placeholder="(11) 99999-9999"
            value={form.telefone}
            onChange={handleChange}
            autoComplete="tel"
            aria-required="true"
            aria-describedby={errors.telefone ? 'erro-telefone' : undefined}
          />
          {errors.telefone && (
            <span id="erro-telefone" className="form-error" role="alert">
              {errors.telefone}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="areaInteresse">
            Área de interesse *
          </label>
          <select
            id="areaInteresse"
            name="areaInteresse"
            className="form-select"
            value={form.areaInteresse}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.areaInteresse ? 'erro-area' : undefined}
          >
            {AREAS_INTERESSE.map((op) => (
              <option key={op.value} value={op.value} disabled={op.value === ''}>
                {op.label}
              </option>
            ))}
          </select>
          {errors.areaInteresse && (
            <span id="erro-area" className="form-error" role="alert">
              {errors.areaInteresse}
            </span>
          )}
        </div>
      </div>

      {/* Linha: pretensão salarial + linkedin (opcionais) */}
      <div className="grid grid--2">
        <div className="form-group">
          <label className="form-label" htmlFor="pretensaoSalarial">
            Pretensão salarial <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(opcional)</span>
          </label>
          <input
            id="pretensaoSalarial"
            name="pretensaoSalarial"
            type="text"
            className="form-input"
            placeholder="Ex: R$ 5.000 – R$ 7.000"
            value={form.pretensaoSalarial}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="linkedin">
            LinkedIn <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(opcional)</span>
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            className="form-input"
            placeholder="linkedin.com/in/seu-perfil"
            value={form.linkedin}
            onChange={handleChange}
            autoComplete="url"
          />
        </div>
      </div>

      {/* Resumo / apresentação pessoal */}
      <div className="form-group">
        <label className="form-label" htmlFor="resumo">
          Apresentação pessoal *
        </label>
        <textarea
          id="resumo"
          name="resumo"
          className="form-textarea"
          placeholder="Conte um pouco sobre você: sua experiência, principais competências, conquistas e o que busca na próxima oportunidade..."
          rows={6}
          value={form.resumo}
          onChange={handleChange}
          aria-required="true"
          aria-describedby={errors.resumo ? 'erro-resumo' : undefined}
          style={{ minHeight: 150 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {errors.resumo ? (
            <span id="erro-resumo" className="form-error" role="alert">
              {errors.resumo}
            </span>
          ) : (
            <span />
          )}
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              color: form.resumo.length < 50 ? 'var(--color-text-muted)' : 'var(--color-success)',
              marginLeft: 'auto',
            }}
          >
            {form.resumo.length} caracteres
          </span>
        </div>
      </div>

      {/* Upload de currículo */}
      <div className="form-group">
        <label className="form-label">
          Currículo (PDF, DOC ou DOCX) *
        </label>
        <FileUploadArea
          arquivo={arquivo}
          onSelect={handleArquivoSelect}
          onRemove={handleArquivoRemove}
          error={!!errors.curriculo}
        />
        {errors.curriculo && (
          <span className="form-error" role="alert">
            {errors.curriculo}
          </span>
        )}
      </div>

      {/* Aceite de termos */}
      <div className="form-group">
        <label className="checkboxGroup">
          <input
            type="checkbox"
            name="termos"
            className="checkboxInput"
            checked={form.termos}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.termos ? 'erro-termos' : undefined}
          />
          <span className="checkboxLabel">
            Concordo com a{' '}
            <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              Política de Privacidade
            </Link>{' '}
            da UNI Gestão de Pessoas e autorizo o uso dos meus dados para fins de
            recrutamento e seleção, conforme a LGPD (Lei n° 13.709/2018).
          </span>
        </label>
        {errors.termos && (
          <span id="erro-termos" className="form-error" role="alert">
            {errors.termos}
          </span>
        )}
      </div>

      <div>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={isPending}
          full
        >
          {isPending ? (
            <>
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 16,
                  height: 16,
                  border: '2px solid rgba(34,73,118,0.3)',
                  borderTopColor: 'var(--color-primary)',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }}
              />
              Enviando cadastro...
            </>
          ) : (
            <>
              <Upload size={18} />
              Cadastrar no Banco de Talentos
            </>
          )}
        </Button>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--spacing-sm)' }}>
          * Campos obrigatórios. Seus dados são protegidos conforme a LGPD.
        </p>
      </div>
    </form>
  )
}

/* ============================================================
   Sidebar informativa
   ============================================================ */

const AREAS_DESTAQUE = [
  'Administrativo', 'Comercial', 'Contabilidade', 'Engenharia',
  'Jurídico', 'Logística', 'Marketing', 'RH', 'Saúde', 'TI',
]

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Como funciona */}
      <div className="infoCard">
        <h3>Como funciona?</h3>
        <ul className="infoList">
          {[
            {
              icon: <FileText size={16} />,
              cor: 'primary',
              titulo: 'Cadastre seu currículo',
              desc: 'Preencha o formulário e anexe seu CV. Simples e rápido.',
            },
            {
              icon: <Star size={16} />,
              cor: 'yellow',
              titulo: 'Analisamos seu perfil',
              desc: 'Nossa equipe avalia seu currículo e mapeia as melhores oportunidades.',
            },
            {
              icon: <Briefcase size={16} />,
              cor: 'orange',
              titulo: 'Somos o elo',
              desc: 'Quando surgir uma vaga compatível, entramos em contato com você.',
            },
            {
              icon: <CheckCircle size={16} />,
              cor: 'success',
              titulo: 'Entrevista humanizada',
              desc: 'Processos seletivos que respeitam e valorizam cada candidato.',
            },
          ].map(({ icon, cor, titulo, desc }) => (
            <li key={titulo} className="infoItem">
              <div className={`infoItemIcon infoItemIcon--${cor}`}>
                {icon}
              </div>
              <div className="infoItemText">
                <strong>{titulo}</strong>
                {desc}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Áreas com vagas frequentes */}
      <div className="areasCard">
        <h3>Áreas com mais oportunidades</h3>
        <div className="areaTagList">
          {AREAS_DESTAQUE.map((area) => (
            <span key={area} className="areaTag">{area}</span>
          ))}
        </div>
      </div>

      {/* Segurança dos dados */}
      <div className="infoCard">
        <h3>Seus dados estão seguros</h3>
        <ul className="infoList">
          <li className="infoItem">
            <div className="infoItemIcon infoItemIcon--primary">
              <Shield size={16} />
            </div>
            <div className="infoItemText">
              <strong>Conformidade LGPD</strong>
              Seus dados são usados exclusivamente para fins de recrutamento.
            </div>
          </li>
          <li className="infoItem">
            <div className="infoItemIcon infoItemIcon--yellow">
              <Clock size={16} />
            </div>
            <div className="infoItemText">
              <strong>Retenção de 2 anos</strong>
              Seu cadastro permanece ativo por 2 anos. Você pode solicitar exclusão a qualquer momento.
            </div>
          </li>
        </ul>
      </div>
    </aside>
  )
}

/* ============================================================
   Seção CTA — para empresas
   ============================================================ */

function CtaEmpresas() {
  return (
    <section className="section">
      <div className="container">
        <div className="ctaSection">
          <h3>Você é empresa e busca talentos?</h3>
          <p>
            Acesse nosso banco de talentos qualificados e encontre o profissional
            ideal para a sua equipe. Fale com nosso time agora.
          </p>
          <Button to="/contato" variant="primary" size="lg">
            Solicitar acesso ao banco de talentos
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Página raiz
   ============================================================ */

export function BancoTalentos() {
  return (
    <>
      <PageHero />

      <section className="section">
        <div className="container">
          <div className="layout">
            {/* Formulário */}
            <div className="formSection">
              <h2>Preencha seus dados</h2>
              <p className="formIntro">
                Cadastre seu currículo em nosso banco de talentos e seja encontrado
                pelas melhores empresas parceiras. O processo é gratuito, rápido e
                totalmente seguro.
              </p>
              <FormularioCadastro />
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </section>

      <CtaEmpresas />

      {/* Keyframe de spin para o loading do botão */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
