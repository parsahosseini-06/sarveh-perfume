import { useEffect, useRef, useState } from 'react'

const PHONE = '۰۹۹۱۲۱۴۹۸۳۱'
const TEL = 'tel:09912149831'
const STORE_MAP = 'https://www.google.com/maps/search/?api=1&query=Asadabadi+St+41st+St+Yousef+Abad+Tehran'
const EVENT_MAP = 'https://www.google.com/maps/search/?api=1&query=Roobero+Mansion+Valiasr+Tehran'

// Sample catalogue for the demo: prices, notes and collections are placeholders.
const PRODUCTS = [
  { id: 'Kirke', name: 'Tiziana Terenzi Kirke', cat: 'women', notes: 'میوه‌ای · شیرین · سرحال', price: '۱٬۴۵۰٬۰۰۰', img: '/img/kirke.jpg', alt: 'شیشه‌ی سروه با رایحه‌ی Kirke میان پاستیل‌های رنگی', top: true },
  { id: 'Lyra', name: 'Tiziana Terenzi Lyra', cat: 'women', notes: 'لیمو · وانیل · کارامل', price: '۱٬۴۵۰٬۰۰۰', img: '/img/lyra.jpg', alt: 'شیشه‌ی سروه با رایحه‌ی Lyra میان لیمو، کیک و کارامل' },
  { id: 'CH', name: 'CH', cat: 'unisex', notes: 'مرکبات · گل سفید · چوب', price: '۱٬۱۸۰٬۰۰۰', img: '/img/ch.jpg', alt: 'شیشه‌ی سروه با رایحه‌ی CH میان مرکبات، گل و چوب' },
  { id: 'Tobacco', name: 'Tobacco', cat: 'men', notes: 'تنباکو · وانیل · کاکائو', price: '۱٬۳۲۰٬۰۰۰', img: '/img/tobacco.jpg', alt: 'شیشه‌ی سروه با رایحه‌ی Tobacco میان وانیل، کاکائو و تنباکو' },
  { id: 'Molecule 02', name: 'Molecule 02', cat: 'unisex', notes: 'مینرال · چوب · تمیز', price: '۱٬۲۵۰٬۰۰۰', img: '/img/molecule.jpg', alt: 'شیشه‌ی سروه با رایحه‌ی Molecule 02 روی سنگ و کریستال' },
]

const TABS = [['all', 'همه'], ['women', 'زنانه'], ['men', 'مردانه'], ['unisex', 'یونی‌سکس']]

const NAV = [['#bestsellers', 'پرفروش‌ها'], ['#story', 'چرا سروه'], ['#gift', 'بگ هدیه'], ['#event', 'ایونت‌ها'], ['#faq', 'سوالات']]

const REVIEWS = [
  { name: 'نگار', scent: 'Kirke', text: 'Kirke رو برای خودم گرفتم؛ ماندگاریش عالیه و شیشه‌ش با اون درب چوبی روی میزم خیلی شیک به نظر می‌رسه.' },
  { name: 'امیر', scent: 'Tobacco', text: 'رفتم شعبه‌ی یوسف‌آباد و با حوصله چند تا رایحه رو برام تست کردن. آخرش Tobacco رو برداشتم و پشیمون نیستم.' },
  { name: 'سارا', scent: 'Lyra', text: 'برای تولد دوستم Lyra رو با بگ هدیه گرفتم. بسته‌بندیش اون‌قدر قشنگ بود که اول از خود بگ عکس گرفت!' },
]

const FAQ = [
  ['اگر رایحه را نپسندم، می‌توانم مرجوع کنم؟', 'بله. سروه در صورت عدم رضایت، مرجوعی را می‌پذیرد. کافی است تا ۷ روز بعد از دریافت سفارش با ما تماس بگیرید.'],
  ['رایحه‌های سروه چه نسبتی با عطرهای معروف دارند؟', 'رایحه‌های سروه الهام‌گرفته از عطرهای شناخته‌شده‌اند و با تمرکز روی کیفیت تهیه می‌شوند. نام روی لیبل فقط برای این است که راحت‌تر رایحه‌ی دلخواهتان را پیدا کنید.'],
  ['ماندگاری عطرها چقدر است؟', 'بسته به رایحه و نوع پوست، معمولاً بین ۶ تا ۸ ساعت. رایحه‌های گرم مثل Tobacco ماندگاری بیشتری دارند.'],
  ['چه حجم‌هایی دارید؟', 'همه‌ی رایحه‌ها در شیشه‌ی ۵۰ میلی‌لیتری سروه عرضه می‌شوند. برای تست، نمونه‌ی کوچک هم در شعبه‌ی حضوری موجود است.'],
  ['ارسال چطور و چقدر طول می‌کشد؟', 'در تهران با پیک در همان روز یا روز بعد، و برای شهرهای دیگر با پست پیشتاز در ۲ تا ۴ روز کاری.'],
  ['می‌توانم قبل از خرید، رایحه را تست کنم؟', 'حتماً. به شعبه‌ی حضوری ما در یوسف‌آباد سر بزنید، یا در ایونت‌هایی که سروه در آن‌ها حضور دارد رایحه‌ها را از نزدیک تجربه کنید.'],
]

const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])

const ICONS = {
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  bag: <><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12l5 5 9-10" />,
  drop: <path d="M12 3c-4 4-6 7-6 10a6 6 0 0 0 12 0c0-3-2-6-6-10z" />,
  star: <path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.8z" />,
  return: <><path d="M4 12a8 8 0 1 0 3-6.2" /><path d="M4 4v4h4" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  calendar: <><path d="M4 6h16v14H4z" /><path d="M4 10h16" /><path d="M8 3v5M16 3v5" /></>,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  women: <><path d="M9 3h6v3H9z" /><path d="M7 8h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z" /></>,
  men: <><path d="M8 2h8v4H8z" /><path d="M6 6h12v15H6z" /><path d="M9 11h6v5H9z" /></>,
  unisex: <><path d="M5 5h5v3H5z" /><path d="M4 8h7v13H4z" /><path d="M15 9h4v2h-4z" /><path d="M14 11h6v10h-6z" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /></>,
}

function Icon({ name, size = 20, stroke = 1.6 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  )
}

function Logo({ small }) {
  return (
    <span className={small ? 'logo logo--small' : 'logo'}>
      <svg aria-hidden="true" width="36" height="12" viewBox="0 0 36 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M2 4c5-3 9 3 16 0s11-3 16 0" /><path d="M6 8c5-3 9 3 16 0s9-2 12 0" />
      </svg>
      <span className="logo__word">SARVEH</span>
      {!small && <span className="logo__sub">PERFUME</span>}
    </span>
  )
}

// Fades sections in once as they enter the viewport; CSS skips it for reduced motion.
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const [cart, setCart] = useState(0)
  const [added, setAdded] = useState(null)
  const [live, setLive] = useState('')
  const [filter, setFilter] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const timer = useRef()
  useReveal()
  useEffect(() => () => clearTimeout(timer.current), [])

  const add = (id) => {
    clearTimeout(timer.current)
    setCart((c) => c + 1)
    setAdded(id)
    setLive(`${id} به سبد اضافه شد`)
    timer.current = setTimeout(() => setAdded(null), 1600)
  }

  const products = PRODUCTS.filter((p) => filter === 'all' || p.cat === filter)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip" href="#content">رفتن به محتوای اصلی</a>
      <p className="sr" aria-live="polite">{live}</p>

      <div className="announce">
        <span>پذیرش مرجوعی در صورت عدم رضایت</span>
        <span className="hide-m" aria-hidden="true">|</span>
        <span className="hide-m">شعبه‌ی حضوری: تهران، یوسف‌آباد، خیابان ۴۱</span>
      </div>

      <header className="wrap header">
        <div className="header__side">
          <button className="icon-btn burger" aria-label={menuOpen ? 'بستن منو' : 'منو'} aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
          <nav className="nav" aria-label="منوی اصلی">
            {NAV.map(([href, label]) => <a key={href} className="u" href={href}>{label}</a>)}
          </nav>
        </div>
        <a href="#" aria-label="سروه — صفحه‌ی اصلی"><Logo /></a>
        <div className="header__side header__side--end">
          <button className="icon-btn hide-m" aria-label="جستجو"><Icon name="search" /></button>
          <button className="icon-btn hide-m" aria-label="حساب کاربری"><Icon name="user" /></button>
          <button className="icon-btn cart" aria-label={cart ? `سبد خرید، ${fa(cart)} مورد` : 'سبد خرید'}>
            <Icon name="bag" />
            {cart > 0 && <span className="cart__count" aria-hidden="true">{fa(cart)}</span>}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav id="mobile-menu" className="wrap mobile-menu" aria-label="منوی موبایل">
          {[...NAV, ['#store', 'شعبه‌ی حضوری']].map(([href, label]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
        </nav>
      )}

      <main id="content">
        <div className="wrap">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero__text in">
              <p className="eyebrow eyebrow--gold">رایحه‌های دست‌چین، تمرکز روی کیفیت</p>
              <h1 id="hero-title" className="t-h1">رایحه‌هایی که<br />در خاطر می‌مانند</h1>
              <p className="lead lead--dark">عطرهای انتخاب‌شده در شیشه‌ی اختصاصی سروه، با درب چوبی طبیعی. اگر راضی نبودید، مرجوعی را می‌پذیریم.</p>
              <div className="actions">
                <a className="btn btn--light" href="#bestsellers">خرید از کالکشن <Icon name="arrow" size={18} stroke={1.8} /></a>
                <a className="btn btn--ghost" href={TEL}>مشاوره: {PHONE}</a>
              </div>
            </div>
            <figure className="hero__product in in--2">
              <img src="/img/ch.jpg" alt="شیشه‌ی سروه با رایحه‌ی CH میان مرکبات، گل و چوب" width="614" height="824" />
              <figcaption><span className="latin">CH</span><span>۱٬۱۸۰٬۰۰۰ تومان</span></figcaption>
              <button className="btn btn--ghost btn--block" onClick={() => add('CH')} aria-label={added === 'CH' ? 'CH به سبد اضافه شد' : 'افزودن CH به سبد'}>
                {added === 'CH' ? <><Icon name="check" size={18} stroke={1.8} />افزوده شد</> : 'افزودن CH به سبد'}
              </button>
            </figure>
            <ul className="hero__perks in in--3 hide-m">
              <li><Icon name="drop" size={26} stroke={1.4} />رایحه‌های دست‌چین</li>
              <li><Icon name="star" size={26} stroke={1.4} />تمرکز روی کیفیت</li>
              <li><Icon name="bag" size={26} stroke={1.4} />بسته‌بندی با بگ سروه</li>
              <li><Icon name="return" size={26} stroke={1.4} />مرجوعی در صورت عدم رضایت</li>
            </ul>
          </section>

          <nav className="cats" aria-label="دسته‌بندی‌ها">
            <a className="cat" href="#bestsellers" onClick={() => setFilter('women')}><Icon name="women" size={28} stroke={1.3} />کالکشن زنانه</a>
            <a className="cat" href="#bestsellers" onClick={() => setFilter('men')}><Icon name="men" size={28} stroke={1.3} />کالکشن مردانه</a>
            <a className="cat" href="#bestsellers" onClick={() => setFilter('unisex')}><Icon name="unisex" size={28} stroke={1.3} />یونی‌سکس</a>
            <a className="cat" href="#gift"><Icon name="bag" size={28} stroke={1.3} />بگ هدیه</a>
            <a className="cat" href="#event"><Icon name="calendar" size={28} stroke={1.3} />ایونت‌ها</a>
            <a className="cat cat--all" href="#bestsellers" onClick={() => setFilter('all')}><Icon name="grid" size={28} stroke={1.3} />همه‌ی عطرها</a>
          </nav>
        </div>

        <section id="bestsellers" className="wrap sec" aria-labelledby="best-title">
          <div className="sec-head rv">
            <div>
              <p className="eyebrow">محبوب‌ترین‌ها</p>
              <h2 id="best-title" className="t-h2">پرفروش‌های سروه</h2>
            </div>
            <a className="u link-arrow" href="#bestsellers" onClick={() => setFilter('all')}>مشاهده‌ی همه‌ی عطرها <Icon name="arrow" size={16} stroke={1.8} /></a>
          </div>
          <div className="tabs" role="group" aria-label="فیلتر کالکشن">
            {TABS.map(([id, label]) => (
              <button key={id} className={filter === id ? 'tab is-active' : 'tab'} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>
            ))}
          </div>
          <div className="products rv">
            {products.map((p) => (
              <article key={p.id} className="card">
                <div className="card__media">
                  <img src={p.img} alt={p.alt} width="616" height="824" loading="lazy" />
                  {p.top && <span className="badge">محبوب</span>}
                </div>
                <div className="card__body">
                  <h3 className="latin card__name">{p.name}</h3>
                  <p className="card__notes">{p.notes} · ۵۰ میل</p>
                  <div className="card__buy">
                    <p className="price">{p.price} <span>تومان</span></p>
                    <button className={added === p.id ? 'round-btn is-added' : 'round-btn'} onClick={() => add(p.id)} aria-label={added === p.id ? `${p.id} به سبد اضافه شد` : `افزودن ${p.id} به سبد`}>
                      <Icon name={added === p.id ? 'check' : 'plus'} size={18} stroke={1.8} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="sec band band--sand" aria-labelledby="story-title">
          <div className="wrap split">
            <figure className="split__media rv">
              <img src="/img/lyra.jpg" alt="شیشه‌ی سروه با رایحه‌ی Lyra میان لیمو، کیک، وانیل و کارامل" width="621" height="829" loading="lazy" />
            </figure>
            <div className="split__text">
              <div className="stack rv">
                <p className="eyebrow">چرا سروه؟</p>
                <h2 id="story-title" className="t-h2">یک شیشه، یک امضا</h2>
                <p className="lead">هر رایحه را دست‌چین می‌کنیم و در شیشه‌ای می‌ریزیم که مخصوص خود سروه است: شیشه‌ی شفاف، درب چوبی طبیعی و لیبلی ساده که فقط اسم رایحه را می‌گوید.</p>
              </div>
              <ol className="pillars rv">
                <li><span className="latin">01</span><div><h3>رایحه‌های دست‌چین</h3><p>فقط رایحه‌هایی را نگه می‌داریم که خودمان عاشقشان شده‌ایم.</p></div></li>
                <li><span className="latin">02</span><div><h3>تمرکز روی کیفیت</h3><p>کیفیت اسانس و ماندگاری، معیار اول انتخاب ماست.</p></div></li>
                <li><span className="latin">03</span><div><h3>خرید بی‌دغدغه</h3><p>اگر رایحه را نپسندیدید، مرجوعی را می‌پذیریم.</p></div></li>
              </ol>
            </div>
          </div>
        </section>

        <section id="event" className="sec band band--maroon" aria-labelledby="event-title">
          <div className="wrap split split--event">
            <div className="split__text stack rv">
              <p className="eyebrow eyebrow--rose">ایونت ویژه‌ی مهر</p>
              <h2 id="event-title" className="t-h2">رویداد بار؛<br />سروه را حضوری تجربه کنید</h2>
              <p className="lead lead--rose">رویدادی برای طراحان و تولیدکنندگان ایرانی در حیاط عمارت روبرو. سروه با میز تست رایحه آنجاست؛ بیایید، بو کنید و انتخاب کنید.</p>
              <dl className="event-facts">
                <div><dt>تاریخ</dt><dd>۱۴ تا ۱۷ مهر</dd></div>
                <div><dt>ساعت</dt><dd>۴ تا ۱۰ شب</dd></div>
                <div><dt>مکان</dt><dd>چهارراه ولیعصر، بن‌بست کیانپور</dd></div>
              </dl>
              <div className="actions">
                <a className="btn btn--cream" href={EVENT_MAP} target="_blank" rel="noopener"><Icon name="pin" size={18} stroke={1.7} />مسیریابی</a>
                <button className="btn btn--ghost">افزودن به تقویم</button>
              </div>
            </div>
            <figure className="photo-badge event-photo rv">
              <img src="/img/event.jpg" alt="یکی از مهمانان در غرفه‌ی سروه، رایحه را روی مچ دستش تست می‌کند" width="622" height="829" loading="lazy" />
              <span className="photo-badge__tag photo-badge__tag--cream">۱۴ تا ۱۷ مهر</span>
            </figure>
          </div>
        </section>

        <section className="wrap sec" aria-labelledby="reviews-title">
          <div className="stack rv sec-head--stack">
            <p className="eyebrow">نظر مشتریان</p>
            <h2 id="reviews-title" className="t-h2">«چقدر شبیهشه!»</h2>
          </div>
          <div className="reviews">
            <figure className="photo-badge reviews__reel rv">
              <img src="/img/reel.jpg" alt="واکنش بعد از تست رایحه: چقدر شبیهشه!" width="621" height="828" loading="lazy" />
              <span className="photo-badge__tag">از ریلز سروه</span>
            </figure>
            <div className="reviews__grid">
              {REVIEWS.map((r) => (
                <blockquote key={r.name} className="review rv">
                  <span className="stars" role="img" aria-label="۵ از ۵ ستاره">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={16} stroke={0} />)}</span>
                  <p>{r.text}</p>
                  <footer><cite>{r.name}</cite><span className="latin">{r.scent}</span></footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="gift" className="wrap" aria-labelledby="gift-title">
          <div className="gift rv">
            <figure className="gift__art"><GiftBag /></figure>
            <div className="stack">
              <p className="eyebrow">بگ هدیه</p>
              <h2 id="gift-title" className="t-h2">هدیه‌ای که<br />خودش حرف می‌زند</h2>
              <p className="lead">رایحه‌ی دلخواهتان را انتخاب کنید؛ ما آن را در بگ اختصاصی سروه آماده می‌کنیم تا از همان لحظه‌ی اول، حس یک هدیه‌ی خاص را بدهد.</p>
              <ul className="checks">
                <li><Icon name="check" size={18} stroke={1.8} />بگ اختصاصی سروه</li>
                <li><Icon name="check" size={18} stroke={1.8} />کارت پیام به انتخاب شما</li>
                <li><Icon name="check" size={18} stroke={1.8} />ارسال مستقیم برای عزیزانتان</li>
              </ul>
              <a className="btn btn--dark btn--start" href="#bestsellers">انتخاب هدیه</a>
            </div>
          </div>
        </section>

        <section id="faq" className="wrap sec faq" aria-labelledby="faq-title">
          <div className="stack rv faq__intro">
            <p className="eyebrow">سوالات متداول</p>
            <h2 id="faq-title" className="t-h2">قبل از خرید<br />بدانید</h2>
            <p className="lead">جواب سوالتان را پیدا نکردید؟</p>
            <a className="btn btn--line btn--start" href={TEL}>تماس: {PHONE}</a>
          </div>
          <div className="faq__list rv">
            {FAQ.map(([q, a]) => (
              <details key={q} className="faq__item">
                <summary>{q}<Icon name="plus" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="store" className="sec band band--sand" aria-labelledby="store-title">
          <div className="wrap split split--store">
            <div className="split__text stack rv">
              <p className="eyebrow">شعبه‌ی حضوری</p>
              <h2 id="store-title" className="t-h2">از نزدیک<br />بو کنید، انتخاب کنید</h2>
              <dl className="facts">
                <div><dt>آدرس</dt><dd>تهران، یوسف‌آباد، خیابان اسدآبادی، خیابان چهل‌ویکم</dd></div>
                <div><dt>ساعت کاری</dt><dd>شنبه تا پنجشنبه، ۱۱ صبح تا ۸ شب</dd></div>
                <div><dt>تلفن</dt><dd><a className="u" href={TEL}>{PHONE}</a></dd></div>
              </dl>
              <div className="actions">
                <a className="btn btn--dark" href={TEL}>تماس بگیرید</a>
                <a className="btn btn--line" href={STORE_MAP} target="_blank" rel="noopener">مسیریابی</a>
              </div>
            </div>
            <a className="map rv" href={STORE_MAP} target="_blank" rel="noopener" aria-label="باز کردن آدرس شعبه در نقشه">
              <MapArt />
              <span className="map__pin"><span>سروه · یوسف‌آباد</span><Icon name="pin" size={34} stroke={1.2} /></span>
              <span className="map__open">باز کردن در نقشه</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer__cols">
            <div className="footer__brand">
              <Logo small />
              <p>رایحه‌های دست‌چین، تمرکز روی کیفیت.</p>
              <a className="u latin footer__ig" href="https://www.instagram.com/sarveh_perfume" target="_blank" rel="noopener"><Icon name="instagram" size={18} />@sarveh_perfume</a>
            </div>
            <nav aria-label="فروشگاه">
              <p>فروشگاه</p>
              <a className="u" href="#bestsellers" onClick={() => setFilter('women')}>کالکشن زنانه</a>
              <a className="u" href="#bestsellers" onClick={() => setFilter('men')}>کالکشن مردانه</a>
              <a className="u" href="#bestsellers" onClick={() => setFilter('unisex')}>یونی‌سکس</a>
              <a className="u" href="#gift">بگ هدیه</a>
            </nav>
            <nav aria-label="راهنما">
              <p>راهنما</p>
              <a className="u" href="#faq">سوالات متداول</a>
              <a className="u" href="#faq">شرایط مرجوعی</a>
              <a className="u" href="#faq">ارسال سفارش</a>
              <a className="u" href="#event">ایونت‌ها</a>
            </nav>
            <div>
              <p>تماس</p>
              <span>تهران، یوسف‌آباد، خیابان اسدآبادی، خیابان ۴۱</span>
              <a className="u" href={TEL}>{PHONE}</a>
            </div>
          </div>
          <div className="footer__base">
            <span>© ۱۴۰۵ عطر سروه</span>
            <span>دموی طراحی — قیمت‌ها، نظرها و برخی متن‌ها نمونه‌اند.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

function GiftBag() {
  const petals = (cx, cy, rx, ry, d) => [0, 72, 144, 216, 288].map((r) => (
    <ellipse key={r} cx={cx} cy={cy - d} rx={rx} ry={ry} transform={`rotate(${r} ${cx} ${cy})`} />
  ))
  return (
    <svg role="img" aria-label="بگ هدیه‌ی سروه با شیشه‌ی عطر و گل‌های سفید" viewBox="0 0 400 300">
      <path d="M92 150c8-58 74-92 140-84s104 40 112 88-26 96-96 104-148-20-156-108z" fill="#E8D5B0" opacity="0.55" />
      <path d="M248 92c30-6 60 12 64 38s-20 40-46 36-48-68-18-74z" fill="#EFDFC2" opacity="0.7" />
      <ellipse cx="205" cy="264" rx="150" ry="6" fill="#3B2A1E" opacity="0.08" />
      <g fill="none" stroke="#3B2A1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M178 112C177 72 206 70 206 112" />
        <path d="M214 112C214 70 243 72 242 112" />
        <path d="M270 110L296 118L298 254L272 262Z" fill="#F1E9DC" />
        <path d="M270 110L284 128L285 258" strokeWidth="1" />
        <path d="M150 110H270L272 262H148Z" fill="#FBF8F3" />
        <path d="M150 122H270" strokeWidth="1" />
      </g>
      <g fill="#E8D5B0" stroke="#9A743C" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M210 104C194 90 184 112 210 108Z" />
        <path d="M210 104C226 90 236 112 210 108Z" />
        <path d="M209 107L200 126M211 107L221 125" fill="none" strokeLinecap="round" />
        <circle cx="210" cy="106" r="3" />
      </g>
      <g transform="translate(192 166)" fill="none" stroke="#1C1915" strokeWidth="1.3" strokeLinecap="round">
        <path d="M2 4c5-3 9 3 16 0s11-3 16 0" /><path d="M6 8c5-3 9 3 16 0s9-2 12 0" />
      </g>
      <text x="211" y="200" direction="ltr" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="15" fontWeight="500" letterSpacing="4" fill="#1C1915">SARVEH</text>
      <text x="211" y="213" direction="ltr" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="6" letterSpacing="3" fill="#5E554A">PERFUME</text>
      <g stroke="#3B2A1E" strokeWidth="1.3" strokeLinejoin="round">
        <rect x="100" y="170" width="30" height="24" rx="2" fill="#E3C9A0" />
        <path d="M106 174v16M113 173v18M121 175v14" stroke="#B08D5E" strokeWidth="0.8" fill="none" />
        <rect x="108" y="194" width="14" height="6" fill="#F4EEE2" />
        <rect x="86" y="200" width="58" height="64" rx="6" fill="#FBF6EA" />
        <rect x="91" y="208" width="48" height="51" rx="3" fill="#EAD9A8" opacity="0.65" stroke="none" />
        <rect x="99" y="220" width="32" height="24" fill="#FFFFFF" strokeWidth="0.8" />
        <path d="M107 230c3-2 5 2 8 0s6-2 8 0" fill="none" strokeWidth="0.8" strokeLinecap="round" />
      </g>
      <g stroke="#3B2A1E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M318 262C320 232 328 208 344 188" fill="none" />
        <path d="M326 228c-12-2-18-10-18-18 10 2 16 8 18 18z" fill="#DCE3CF" />
        <path d="M333 214c10-6 20-6 26-2-6 8-16 8-26 2z" fill="#DCE3CF" />
        <path d="M346 262C348 244 352 230 362 218" fill="none" />
        <g fill="#FFFFFF">{petals(344, 186, 5, 9, 10)}{petals(362, 217, 3.5, 6, 7)}</g>
        <circle cx="344" cy="186" r="3.4" fill="#D9B98A" />
        <circle cx="362" cy="217" r="2.4" fill="#D9B98A" />
      </g>
    </svg>
  )
}

function MapArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="400" fill="#E6DCCB" />
      <g stroke="#F7F2EA">
        <path d="M-20 120 L620 80" strokeWidth="22" />
        <path d="M-20 290 L620 250" strokeWidth="14" />
        <path d="M180 -20 L220 420" strokeWidth="18" />
        <path d="M400 -20 L380 420" strokeWidth="12" />
      </g>
      <g stroke="#EFE7DA" strokeWidth="6">
        <path d="M0 200 L600 190" /><path d="M300 -20 L310 420" />
      </g>
      <rect x="430" y="300" width="120" height="70" rx="10" fill="#D8CDB9" />
      <rect x="40" y="20" width="110" height="70" rx="10" fill="#D8CDB9" />
    </svg>
  )
}
