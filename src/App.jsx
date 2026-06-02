import { useState, useEffect, useRef } from 'react'
import {
  motion, useScroll, useTransform, useInView,
  AnimatePresence, useMotionValue, useSpring,
} from 'framer-motion'
import {
  Zap, Crown, Sparkles, Smile, Wand2, Eye, Activity, CalendarCheck,
  ChevronDown, Phone, MessageCircle, MapPin, Clock, Star,
  Menu, X, ArrowRight, Shield, Heart, Award,
} from 'lucide-react'
import './index.css'

const WA = 'https://wa.me/5551303922224?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20gratuita.'
const PHONE = '(51) 3039-2224'
const EASE = [0.76, 0, 0.24, 1]

/* ── Scroll Progress ───────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9000] origin-left"
      style={{ scaleX: scrollYProgress, background: 'linear-gradient(90deg,#8B6D35,#B8965A,#D4AF72)' }}
    />
  )
}

/* ── Animated Counter ──────────────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  useEffect(() => {
    if (!inView) return
    let start = null
    const dur = 2000
    const tick = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(e * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return <span ref={ref}>{val}{suffix}</span>
}

/* ── Scroll Reveal ─────────────────────────────────────────────── */
function Rev({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ── Magnetic Button ───────────────────────────────────────────── */
function Mag({ children, className = '', style = {}, href, target: t, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return href ? (
    <motion.a ref={ref} href={href} target={t}
      rel={t === '_blank' ? 'noopener noreferrer' : undefined}
      className={className} style={{ ...style, x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.a>
  ) : (
    <motion.button ref={ref} className={className} style={{ ...style, x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
      {children}
    </motion.button>
  )
}

/* ── Marquee ───────────────────────────────────────────────────── */
function Marquee() {
  const txt = 'RADIANTE IMPLANTES · SAPIRANGA · TRANSFORMANDO SORRISOS · '
  const arr = Array(10).fill(txt)
  return (
    <div className="overflow-hidden py-3 border-y"
      style={{ borderColor: 'rgba(184,150,90,0.18)', background: '#1A1410' }}>
      <div className="marquee-track">
        {[...arr, ...arr].map((t, i) => (
          <span key={i} className="text-[11px] tracking-[0.28em] font-medium mx-3 flex-shrink-0"
            style={{ color: '#B8965A', fontFamily: 'var(--font-body)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Navbar ────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Por Que Nós', href: '#porquenos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <>
      <motion.nav className="fixed top-[3px] left-0 right-0 z-[900] flex items-center justify-between px-6 md:px-12"
        style={{
          height: scrolled ? 64 : 80,
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          background: scrolled ? 'rgba(26,20,16,0.93)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(184,150,90,0.14)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}>
        <a href="#hero" className="flex flex-col leading-none">
          <span className="font-bold tracking-[0.18em] text-[22px] md:text-[26px]"
            style={{ fontFamily: 'var(--font-display)', color: '#D4AF72' }}>
            RADIANTE
          </span>
          <span className="tracking-[0.4em] text-[10px] font-light"
            style={{ color: '#B8965A' }}>
            IMPLANTES
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm font-medium transition-colors duration-200 hover:text-[#D4AF72]"
              style={{ color: '#C5B8A8', fontFamily: 'var(--font-body)' }}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Mag href={WA} target="_blank"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg,#8B6D35,#B8965A)',
              color: '#F9F6F0', fontFamily: 'var(--font-body)',
              boxShadow: '0 2px 20px rgba(184,150,90,0.25)',
            }}>
            <MessageCircle size={15} /> Agendar Consulta
          </Mag>
          <button className="md:hidden p-2" style={{ color: '#B8965A' }}
            onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[800] flex flex-col pt-24 px-6 pb-8"
            style={{ background: 'rgba(26,20,16,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease: EASE }}>
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href}
                className="py-4 border-b text-xl font-medium"
                style={{ borderColor: 'rgba(184,150,90,0.15)', color: '#C5B8A8', fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, ease: EASE }}
                onClick={() => setOpen(false)}>
                {l.label}
              </motion.a>
            ))}
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              className="mt-8 py-4 rounded-full text-center font-medium text-sm"
              style={{ background: 'linear-gradient(135deg,#8B6D35,#B8965A)', color: '#F9F6F0' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: EASE }}
              onClick={() => setOpen(false)}>
              Agendar Consulta via WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Hero ──────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const line1 = 'Transformando'
  const line2 = 'sorrisos'
  const line3 = 'com excelência.'
  const all = [...line1, ' ', ...line2, ' ', ...line3]

  return (
    <section id="hero" ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#1A1410' }}>

      {/* Parallax bg glow */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%,rgba(184,150,90,0.09) 0%,transparent 70%)',
        }} />
      </motion.div>

      {/* SVG arco decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.svg viewBox="0 0 1200 700" className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.06 }}>
          <motion.path d="M -100 600 Q 300 -80 700 350 Q 950 560 1300 80"
            stroke="#D4AF72" strokeWidth="1.5" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.4 }} />
          <motion.path d="M 0 700 Q 400 0 800 400 Q 1050 600 1400 120"
            stroke="#B8965A" strokeWidth="0.8" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.7 }} />
        </motion.svg>

        {/* Ornamento canto direito */}
        <motion.svg viewBox="0 0 200 200"
          className="absolute bottom-16 right-8 md:right-20 w-28 h-28 md:w-44 md:h-44"
          style={{ opacity: 0.1 }}
          initial={{ rotate: -45, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.8, delay: 1.2, ease: EASE }}>
          <circle cx="100" cy="100" r="80" stroke="#D4AF72" strokeWidth="0.8" fill="none" />
          <circle cx="100" cy="100" r="55" stroke="#B8965A" strokeWidth="0.5" fill="none" />
          <path d="M100 20 L100 180 M20 100 L180 100" stroke="#D4AF72" strokeWidth="0.5" />
          <path d="M43 43 L157 157 M43 157 L157 43" stroke="#B8965A" strokeWidth="0.4" />
        </motion.svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Headline stagger por linha */}
        <h1 className="leading-none mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          {/* linha 1 */}
          <div className="flex flex-wrap justify-center text-[clamp(3rem,9vw,6.5rem)] font-light"
            style={{ color: '#F9F6F0' }}>
            {line1.split('').map((c, i) => (
              <motion.span key={i} style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45 + i * 0.05, ease: EASE }}>
                {c}
              </motion.span>
            ))}
          </div>

          {/* linha 2 — dourada + itálica */}
          <div className="flex flex-wrap justify-center text-[clamp(3rem,9vw,6.5rem)] italic font-light"
            style={{
              background: 'linear-gradient(135deg,#8B6D35 0%,#B8965A 40%,#D4AF72 80%,#E8D5A8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
            {line2.split('').map((c, i) => (
              <motion.span key={i} style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45 + (line1.length + 1 + i) * 0.05, ease: EASE }}>
                {c}
              </motion.span>
            ))}
          </div>

          {/* linha 3 — cinza */}
          <div className="flex flex-wrap justify-center text-[clamp(2rem,6vw,4.5rem)] font-light"
            style={{ color: '#7A6E65' }}>
            {line3.split('').map((c, i) => (
              <motion.span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}
                initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45 + (line1.length + line2.length + 2 + i) * 0.05, ease: EASE }}>
                {c === ' ' ? ' ' : c}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subtítulo */}
        <motion.p className="max-w-md text-base md:text-lg mb-10 leading-relaxed"
          style={{ color: '#7A6E65', fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: EASE }}>
          Especialistas em implantes dentários em Sapiranga — RS.
          Tecnologia, cuidado e resultados que duram para sempre.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: EASE }}>
          <Mag href={WA} target="_blank"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm sm:text-base"
            style={{
              background: 'linear-gradient(135deg,#8B6D35,#B8965A,#D4AF72)',
              color: '#1A1410', fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 32px rgba(184,150,90,0.38)',
            }}>
            <MessageCircle size={18} /> Agendar pelo WhatsApp
          </Mag>
          <Mag href="#sobre"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm sm:text-base border"
            style={{ borderColor: 'rgba(184,150,90,0.4)', color: '#C5B8A8', background: 'transparent' }}>
            Conheça a clínica <ArrowRight size={16} />
          </Mag>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }}>
        <span className="text-[10px] tracking-[0.25em]" style={{ color: '#7A6E65' }}>SCROLL</span>
        <motion.div className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom,#B8965A,transparent)' }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>
    </section>
  )
}

/* ── Services ──────────────────────────────────────────────────── */
const SERVICES = [
  { Icon: Zap,          label: 'Implantes Dentários',    desc: 'Reabilitação permanente com titânio de alta pureza. Resultado natural e duradouro.' },
  { Icon: Crown,        label: 'Próteses sobre Implante', desc: 'Próteses fixas e removíveis com estética e funcionalidade superiores.' },
  { Icon: Sparkles,     label: 'Clareamento Dental',      desc: 'Técnicas avançadas para um sorriso até 8 tons mais claro com segurança.' },
  { Icon: Smile,        label: 'Ortodontia',              desc: 'Aparelhos metálicos, estéticos e alinhadores invisíveis para todas as idades.' },
  { Icon: Wand2,        label: 'Restaurações Estéticas',  desc: 'Resinas e porcelanas que restauram a forma e a beleza dos dentes.' },
  { Icon: Eye,          label: 'Lentes de Contato',       desc: 'Facetas ultrafinas de porcelana para transformação estética definitiva.' },
  { Icon: Activity,     label: 'Tratamento de Canal',     desc: 'Endodontia precisa e sem dor para salvar seu dente natural.' },
  { Icon: CalendarCheck,label: 'Consulta e Avaliação',    desc: 'Avaliação gratuita completa com diagnóstico e plano de tratamento.' },
]

/* ── Clinic Photo ──────────────────────────────────────────────── */
function ClinicPhoto() {
  return (
    <section className="py-16 md:py-24 px-6" style={{ background: '#F9F6F0' }}>
      <div className="max-w-6xl mx-auto">
        <Rev>
          <div
            className="relative w-full rounded-2xl overflow-hidden border"
            style={{
              borderColor: 'rgba(184,150,90,0.25)',
              aspectRatio: '16 / 7',
              minHeight: 220,
              background: 'linear-gradient(135deg, #251C14 0%, #1A1410 60%, #2C1F0E 100%)',
            }}
          >
            {/* Ornamentos de canto */}
            {[
              'top-0 left-0 border-t border-l rounded-tl-2xl',
              'top-0 right-0 border-t border-r rounded-tr-2xl',
              'bottom-0 left-0 border-b border-l rounded-bl-2xl',
              'bottom-0 right-0 border-b border-r rounded-br-2xl',
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-8 h-8 md:w-12 md:h-12 ${cls}`}
                style={{ borderColor: '#B8965A' }}
              />
            ))}

            {/* Linhas decorativas horizontais */}
            <div
              className="absolute left-12 right-12 md:left-20 md:right-20 top-1/2 -translate-y-1/2 h-px opacity-20"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF72, transparent)' }}
            />

            {/* Texto central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="w-10 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #B8965A, transparent)' }}
              />
              <p
                className="text-base md:text-lg tracking-[0.18em] font-light"
                style={{ fontFamily: 'var(--font-display)', color: '#7A6E65', letterSpacing: '0.2em' }}
              >
                Foto da Radiante
              </p>
              <div
                className="w-10 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #B8965A, transparent)' }}
              />
            </div>
          </div>
        </Rev>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="servicos" className="py-24 md:py-32 px-6" style={{ background: '#F9F6F0' }}>
      <div className="max-w-6xl mx-auto">
        <Rev className="text-center mb-16">
          <p className="text-[11px] tracking-[0.32em] mb-3 font-medium" style={{ color: '#B8965A' }}>
            NOSSOS TRATAMENTOS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-light mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#2C1F0E' }}>
            Cuidado especializado<br />
            <em style={{ color: '#B8965A' }}>em cada detalhe</em>
          </h2>
          <div className="w-10 h-px mx-auto mt-4" style={{ background: '#B8965A' }} />
        </Rev>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map(({ Icon, label, desc }, i) => (
            <Rev key={label} delay={0.08 + i * 0.07}>
              <motion.div
                className="group p-6 rounded-2xl border h-full flex flex-col gap-4"
                style={{ background: '#fff', borderColor: 'rgba(184,150,90,0.12)' }}
                whileHover={{ scale: 1.03, y: -4, boxShadow: '0 8px 40px rgba(184,150,90,0.18)', borderColor: 'rgba(184,150,90,0.4)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(184,150,90,0.1)' }}>
                  <Icon size={20} style={{ color: '#B8965A' }} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-medium mb-1.5 leading-snug text-[1.02rem]"
                    style={{ fontFamily: 'var(--font-display)', color: '#2C1F0E' }}>
                    {label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#7A6E65' }}>{desc}</p>
                </div>
              </motion.div>
            </Rev>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Authority ─────────────────────────────────────────────────── */
function AuthoritySection() {
  const stats = [
    { val: 10,  suffix: '+', label: 'Anos de experiência',   sub: 'Excelência comprovada' },
    { val: 500, suffix: '+', label: 'Implantes realizados',  sub: 'Resultados duradouros' },
    { val: 107, suffix: '',  label: 'Avaliações 5 estrelas', sub: 'Google Reviews' },
    { val: 98,  suffix: '%', label: 'Pacientes satisfeitos', sub: 'Taxa de recomendação' },
  ]

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ background: '#1A1410' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%,rgba(184,150,90,0.05) 0%,transparent 70%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <Rev className="text-center mb-16">
          <p className="text-[11px] tracking-[0.32em] mb-3 font-medium" style={{ color: '#B8965A' }}>NOSSA TRAJETÓRIA</p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#F9F6F0' }}>
            Números que refletem<br />
            <em style={{ color: '#D4AF72' }}>nossa dedicação</em>
          </h2>
        </Rev>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map(({ val, suffix, label, sub }, i) => (
            <Rev key={label} delay={0.1 + i * 0.1} className="text-center">
              <div className="text-5xl md:text-6xl lg:text-7xl font-light mb-2 leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: 'linear-gradient(135deg,#8B6D35,#D4AF72)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                <Counter target={val} suffix={suffix} />
              </div>
              <div className="font-medium text-sm mb-1" style={{ color: '#F9F6F0' }}>{label}</div>
              <div className="text-xs" style={{ color: '#7A6E65' }}>{sub}</div>
            </Rev>
          ))}
        </div>

        <Rev className="text-center max-w-2xl mx-auto">
          <p className="text-2xl md:text-3xl font-light italic leading-relaxed"
            style={{ fontFamily: 'var(--font-display)', color: '#C5B8A8' }}>
            "Clínica odontológica que oferece tratamentos diversos,<br />
            com atendimento humanizado e especializado,<br />
            priorizando o bem-estar de cada paciente."
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-px" style={{ background: '#B8965A' }} />
          </div>
        </Rev>
      </div>
    </section>
  )
}

/* ── Why Choose ────────────────────────────────────────────────── */
function WhyChooseSection() {
  const pillars = [
    { Icon: Award,  title: 'Tecnologia Avançada',   desc: 'Equipamentos de última geração: tomografia cone beam, scanner intraoral e planejamento 3D para execução precisa.', tag: 'Diagnóstico digital · CAD/CAM' },
    { Icon: Heart,  title: 'Atendimento Humanizado', desc: 'Cada paciente é único. Escutamos, acolhemos e personalizamos o tratamento para garantir conforto e confiança total.', tag: 'Avaliação gratuita · Plano personalizado' },
    { Icon: Shield, title: 'Equipe Especializada',  desc: 'Profissionais qualificados e continuamente atualizados nas melhores práticas nacionais e internacionais.', tag: 'Especialistas em implantes e estética' },
  ]

  return (
    <section id="porquenos" className="py-24 md:py-32 px-6" style={{ background: '#F9F6F0' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <Rev>
              <p className="text-[11px] tracking-[0.32em] mb-3 font-medium" style={{ color: '#B8965A' }}>POR QUE NOS ESCOLHER</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', color: '#2C1F0E' }}>
                Três razões para confiar o seu sorriso a nós
              </h2>
              <div className="w-10 h-px mb-7" style={{ background: '#B8965A' }} />
              <p className="text-base leading-relaxed mb-8" style={{ color: '#7A6E65' }}>
                Não somos apenas uma clínica — somos parceiros na jornada de transformação do seu sorriso.
              </p>
              <Mag href={WA} target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
                style={{
                  background: 'linear-gradient(135deg,#8B6D35,#B8965A)',
                  color: '#F9F6F0', fontFamily: 'var(--font-body)',
                  boxShadow: '0 2px 20px rgba(184,150,90,0.25)',
                }}>
                Agendar avaliação gratuita <ArrowRight size={14} />
              </Mag>
            </Rev>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-5">
            {pillars.map(({ Icon, title, desc, tag }, i) => (
              <Rev key={title} delay={0.15 + i * 0.1}>
                <div className="flex gap-5 p-6 rounded-2xl border"
                  style={{ background: '#fff', borderColor: 'rgba(184,150,90,0.12)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(184,150,90,0.1)' }}>
                    <Icon size={22} style={{ color: '#B8965A' }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1.5 text-lg"
                      style={{ fontFamily: 'var(--font-display)', color: '#2C1F0E' }}>
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-2" style={{ color: '#7A6E65' }}>{desc}</p>
                    <p className="text-xs font-medium" style={{ color: '#B8965A' }}>{tag}</p>
                  </div>
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ──────────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Romulo Haack', initial: 'R', text: 'Melhor da região, referência no quesito clínica odontológica. Profissionais de alto nível e ambiente acolhedor.' },
  { name: 'Miria Brasil',  initial: 'M', text: 'Lugar top, com profissionais atenciosos e qualificados!! Recomendo muito para quem busca qualidade e cuidado.' },
  { name: 'Igor Roberto',  initial: 'I', text: 'No primeiro contato, fui recebido com muita educação pela equipe. Tratamento impecável do início ao fim.' },
]

function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 md:py-32 px-6" style={{ background: '#1A1410' }}>
      <div className="max-w-5xl mx-auto">
        <Rev className="text-center mb-16">
          <p className="text-[11px] tracking-[0.32em] mb-3 font-medium" style={{ color: '#B8965A' }}>O QUE DIZEM NOSSOS PACIENTES</p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#F9F6F0' }}>
            Avaliações reais,<br /><em style={{ color: '#D4AF72' }}>resultados concretos</em>
          </h2>
        </Rev>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ name, initial, text }, i) => (
            <Rev key={name} delay={0.1 + i * 0.12}>
              <div className="p-6 rounded-2xl h-full flex flex-col border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(184,150,90,0.15)' }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={13} fill="#D4AF72" stroke="none" />)}
                </div>
                <p className="text-[1.08rem] leading-relaxed flex-1 mb-6 italic"
                  style={{ fontFamily: 'var(--font-display)', color: '#C5B8A8' }}>
                  "{text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#8B6D35,#B8965A)', color: '#F9F6F0' }}>
                    {initial}
                  </div>
                  <div>
                    <div className="font-medium text-sm" style={{ color: '#F9F6F0' }}>{name}</div>
                    <div className="text-xs" style={{ color: '#7A6E65' }}>Google Reviews ✓</div>
                  </div>
                </div>
              </div>
            </Rev>
          ))}
        </div>

        <Rev delay={0.45} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="#D4AF72" stroke="none" />)}
          </div>
          <span className="text-3xl font-light" style={{ fontFamily: 'var(--font-display)', color: '#D4AF72' }}>4,9</span>
          <span className="text-sm" style={{ color: '#7A6E65' }}>baseado em 107 avaliações verificadas no Google</span>
        </Rev>
      </div>
    </section>
  )
}

/* ── CTA Central ───────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#8B6D35,#B8965A,#D4AF72)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%,rgba(255,255,255,0.08) 0%,transparent 70%)' }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <Rev>
          <p className="text-[11px] tracking-[0.32em] mb-4 font-medium opacity-60" style={{ color: '#1A1410' }}>OFERTA ESPECIAL</p>
          <h2 className="text-4xl md:text-5xl font-light mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#1A1410' }}>
            Agende sua avaliação<br /><em>gratuita hoje</em>
          </h2>
          <p className="text-base md:text-lg mb-10 opacity-70 max-w-xl mx-auto" style={{ color: '#1A1410' }}>
            Sem compromisso. Nosso especialista analisa seu caso e apresenta o plano ideal para você.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Mag href={WA} target="_blank"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm"
              style={{
                background: '#1A1410', color: '#D4AF72', fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 24px rgba(26,20,16,0.35)',
              }}>
              <MessageCircle size={18} /> Agendar pelo WhatsApp
            </Mag>
            <a href={`tel:+555130392224`}
              className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: '#1A1410' }}>
              <Phone size={16} /> {PHONE}
            </a>
          </div>
        </Rev>
      </div>
    </section>
  )
}

/* ── About ─────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="sobre" className="py-24 md:py-32 px-6" style={{ background: '#F9F6F0' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Rev>
            <p className="text-[11px] tracking-[0.32em] mb-3 font-medium" style={{ color: '#B8965A' }}>SOBRE A CLÍNICA</p>
            <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: '#2C1F0E' }}>
              Radiante em cada<br /><em style={{ color: '#B8965A' }}>detalhe</em>
            </h2>
            <div className="w-10 h-px mb-7" style={{ background: '#B8965A' }} />
            <p className="text-base leading-relaxed mb-8" style={{ color: '#7A6E65' }}>
              A Clínica Radiante Implantes nasceu com a missão de oferecer tratamentos odontológicos
              de excelência em Sapiranga e região, unindo tecnologia avançada ao acolhimento humano.
              Cada sorriso transformado é uma história que celebramos.
            </p>

            {[
              { Icon: MapPin, title: 'Endereço', body: 'Av. 20 de Setembro, 3419 — sala 02\nSapiranga — RS, 93800-030' },
              { Icon: Clock,  title: 'Horários', body: 'Segunda a Sexta: 08h às 19h\nSábado: 08h às 12h' },
              { Icon: Phone,  title: 'Telefone / WhatsApp', body: PHONE, href: `tel:+555130392224` },
            ].map(({ Icon, title, body, href }) => (
              <div key={title} className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(184,150,90,0.1)' }}>
                  <Icon size={17} style={{ color: '#B8965A' }} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-medium text-sm mb-0.5" style={{ color: '#2C1F0E' }}>{title}</div>
                  {href
                    ? <a href={href} className="text-sm" style={{ color: '#B8965A' }}>{body}</a>
                    : <div className="text-sm whitespace-pre-line" style={{ color: '#7A6E65' }}>{body}</div>}
                </div>
              </div>
            ))}
          </Rev>

          <Rev delay={0.2}>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(184,150,90,0.15)', height: 420 }}>
              <iframe
                title="Localização Clínica Radiante Implantes"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3467.5!2d-51.0050!3d-29.6380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951964e65e3c2a77%3A0x0!2sAv.+20+de+Setembro%2C+3419+-+Sapiranga%2C+RS!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%" height="100%"
                style={{ border: 0, filter: 'sepia(15%) contrast(1.05) brightness(0.95)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Rev>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ───────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'O implante dentário é doloroso?', a: 'O procedimento é realizado sob anestesia local, portanto você não sente dor durante a cirurgia. No pós-operatório pode haver leve desconforto por 2–3 dias, facilmente controlado com medicação prescrita. A grande maioria dos pacientes se surpreende com o quão tranquilo é o processo.' },
  { q: 'Quanto tempo dura um implante dentário?', a: 'Com higiene e manutenção adequadas, um implante de titânio pode durar a vida toda. A taxa de sucesso é superior a 98% em 10 anos quando bem cuidados. A prótese sobre o implante pode precisar de substituição a cada 10–15 anos.' },
  { q: 'Qual é o tempo total do tratamento?', a: 'Varia de paciente para paciente. A osseointegração (fusão com o osso) leva de 3 a 6 meses. Em alguns casos usamos protocolos de carga imediata, onde a prótese provisória é instalada no mesmo dia da cirurgia.' },
  { q: 'O plano de saúde cobre implantes?', a: 'Na maioria dos casos, planos de saúde não cobrem implantes por serem considerados procedimento eletivo. Oferecemos avaliação gratuita, parcelamento facilitado e planos de tratamento acessíveis para diversas realidades.' },
  { q: 'Qualquer pessoa pode fazer implante?', a: 'A grande maioria dos adultos é candidata. Na avaliação gratuita analisamos saúde bucal, densidade óssea e histórico médico para definir o melhor plano. Em casos de perda óssea, técnicas como enxerto ósseo podem viabilizar o implante.' },
]

function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 md:py-32 px-6" style={{ background: '#1A1410' }}>
      <div className="max-w-3xl mx-auto">
        <Rev className="text-center mb-14">
          <p className="text-[11px] tracking-[0.32em] mb-3 font-medium" style={{ color: '#B8965A' }}>DÚVIDAS FREQUENTES</p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#F9F6F0' }}>
            Perguntas sobre<br /><em style={{ color: '#D4AF72' }}>implantes dentários</em>
          </h2>
        </Rev>

        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Rev key={q} delay={0.05 + i * 0.07}>
              <div className="rounded-xl border overflow-hidden"
                style={{ borderColor: 'rgba(184,150,90,0.15)', background: 'rgba(255,255,255,0.03)' }}>
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
                  style={{ color: open === i ? '#D4AF72' : '#C5B8A8' }}
                  onClick={() => setOpen(open === i ? null : i)}>
                  <span className="text-[1.03rem] font-medium pr-4"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {q}
                  </span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}
                    className="flex-shrink-0">
                    <ChevronDown size={18} style={{ color: '#B8965A' }} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div key="body"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}>
                      <p className="px-5 pb-5 pt-4 text-sm leading-relaxed"
                        style={{ color: '#7A6E65', borderTop: '1px solid rgba(184,150,90,0.1)' }}>
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Rev>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Final CTA ─────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ background: '#251C14' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(184,150,90,0.06) 0%,transparent 70%)' }} />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <Rev>
          <div className="mb-6 flex justify-center">
            <motion.div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(184,150,90,0.12)', border: '1px solid rgba(184,150,90,0.2)' }}
              animate={{ boxShadow: ['0 0 0 0 rgba(184,150,90,0.3)','0 0 0 20px rgba(184,150,90,0)','0 0 0 0 rgba(184,150,90,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}>
              <MessageCircle size={26} style={{ color: '#D4AF72' }} strokeWidth={1.5} />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#F9F6F0' }}>
            Pronto para transformar<br /><em style={{ color: '#D4AF72' }}>o seu sorriso?</em>
          </h2>
          <p className="text-base mb-10" style={{ color: '#7A6E65' }}>
            Entre em contato agora. Atendimento rápido e avaliação gratuita sem compromisso.
          </p>
          <Mag href={WA} target="_blank"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-base"
            style={{
              background: 'linear-gradient(135deg,#8B6D35,#B8965A,#D4AF72)',
              color: '#1A1410', fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 40px rgba(184,150,90,0.4)',
            }}>
            <MessageCircle size={20} /> Falar com a equipe
          </Mag>
        </Rev>
      </div>
    </section>
  )
}

/* ── Footer ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t" style={{ background: '#1A1410', borderColor: 'rgba(184,150,90,0.12)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="font-bold tracking-[0.18em] text-xl"
                style={{ fontFamily: 'var(--font-display)', color: '#D4AF72' }}>RADIANTE</div>
              <div className="tracking-[0.4em] text-[10px] font-light" style={{ color: '#B8965A' }}>IMPLANTES</div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#7A6E65' }}>
              Clínica odontológica especializada em implantes dentários em Sapiranga — RS.
              Transformando sorrisos com excelência e cuidado.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-4" style={{ color: '#C5B8A8' }}>Contato</h4>
            <div className="flex flex-col gap-3 text-sm" style={{ color: '#7A6E65' }}>
              <a href="tel:+555130392224" className="hover:text-[#B8965A] transition-colors flex items-center gap-2">
                <Phone size={14} style={{ color: '#B8965A' }} /> {PHONE}
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="hover:text-[#B8965A] transition-colors flex items-center gap-2">
                <MessageCircle size={14} style={{ color: '#B8965A' }} /> WhatsApp
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#B8965A' }} />
                <span>Av. 20 de Setembro, 3419 — sala 02, Sapiranga — RS</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-4" style={{ color: '#C5B8A8' }}>Horários</h4>
            <div className="flex flex-col gap-2 text-sm" style={{ color: '#7A6E65' }}>
              <div className="flex items-center gap-2"><Clock size={14} style={{ color: '#B8965A' }} /> Seg — Sex: 08h às 19h</div>
              <div className="flex items-center gap-2"><Clock size={14} style={{ color: '#B8965A' }} /> Sábado: 08h às 12h</div>
              <div className="mt-2 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill="#D4AF72" stroke="none" />)}
                <span className="ml-1">4,9 · 107 avaliações</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: 'rgba(184,150,90,0.1)', color: '#7A6E65' }}>
          <span>© {new Date().getFullYear()} Clínica Radiante Implantes. Todos os direitos reservados.</span>
          <span>Sapiranga — RS, Brasil</span>
        </div>
      </div>
    </footer>
  )
}

/* ── WhatsApp Float (mobile) ───────────────────────────────────── */
function WAFloat() {
  return (
    <motion.a href={WA} target="_blank" rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="wa-float w-14 h-14 rounded-full items-center justify-center shadow-xl"
      style={{ background: 'linear-gradient(135deg,#8B6D35,#B8965A)', boxShadow: '0 4px 24px rgba(184,150,90,0.5)' }}
      animate={{ boxShadow: ['0 4px 24px rgba(184,150,90,0.4)','0 4px 32px rgba(184,150,90,0.7)','0 4px 24px rgba(184,150,90,0.4)'] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
      <MessageCircle size={24} style={{ color: '#F9F6F0' }} />
    </motion.a>
  )
}

/* ── App ───────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ClinicPhoto />
        <ServicesSection />
        <Marquee />
        <AuthoritySection />
        <WhyChooseSection />
        <TestimonialsSection />
        <CTASection />
        <AboutSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <WAFloat />
    </>
  )
}
