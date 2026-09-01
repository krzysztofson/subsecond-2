export type Lang = 'en' | 'pl';

export const STORAGE_KEY = 'subsecond-lang';

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    'nav.services': 'What we do',
    'nav.clients': 'Who we work with',
    'nav.work': 'Results',
    'nav.packages': 'Packages',
    'nav.process': 'Process',
    'nav.faq': 'FAQ',
    'nav.menu': 'Open menu',
    'nav.menuClose': 'Close menu',
    'nav.cta': 'Book a free revenue review',

    'hero.line1': 'Your site is leaking inquiries you never see.',
    'hero.line2': 'Buried contact. Nothing after hours. Looks cheaper than the fees you charge.',
    'hero.sub':
      'A slow or weak site bleeds qualified leads every day. We find the leaks on a free 30-min call, then fix the system that keeps costing you work.',
    'hero.cta': 'Book a free revenue review',
    'hero.ctaNote': '30 min · We use your live site · Not a sales pitch',
    'hero.scroll': 'Scroll',

    'philosophy.eyebrow': 'Philosophy',
    'philosophy.l1': 'We take on a few firms at a time.',
    'philosophy.l2': 'Not a factory. Not a closed shop.',
    'philosophy.l3':
      'Full bench on every project. No junior handoff. We stay until the site stops leaking.',

    'services.eyebrow': 'Services',
    'services.heading': 'What we do',
    'services.s1.title': 'Web Design & Development',
    'services.s1.desc':
      'Your site is the first proof of the fees you charge. If it looks cheaper than your rates, prospects notice before they ever call. We build sites that match what you charge \u2014 faster trust, more inquiries, fewer conversations that go nowhere.',
    'services.s2.title': 'AI Assistants & Chatbots',
    'services.s2.desc':
      'Most inquiries land when your office is closed \u2014 and without capture, that traffic just leaves. Our AI assistants qualify and capture leads 24/7, evenings, weekends, and after hours, so nothing walks away unanswered.',
    'services.s3.title': 'Automation (n8n / Make)',
    'services.s3.desc':
      'Remove the admin work that eats billable hours \u2014 seamlessly connecting your website with tools like HubSpot, Pipedrive, Notion, and Slack for follow-ups, CRM updates, onboarding, and reporting \u2014 so your team spends time on work clients pay for.',
    'services.s4.title': 'Conversion Rate Optimisation',
    'services.s4.desc':
      'Buried contact forms and confusing paths cost you prospects who were ready to reach out. We find where qualified visitors drop off \u2014 and fix the leak.',

    'clients.eyebrow': 'Clients',
    'clients.heading': 'Who we work with',
    'clients.body':
      'We work with B2B companies where one new client pays for the entire project \u2014 law firms, private clinics, consultancies, premium service providers. You\u2019ve built a serious business. Your site should not look cheaper than the fees you charge.',
    'clients.cheap': 'If you\u2019re optimising for the lowest price, we\u2019re not it.',
    'clients.best': 'If you\u2019re optimising for clients who pay premium fees \u2014 let\u2019s talk.',

    'work.eyebrow': 'Work',
    'work.heading': 'Selected results',
    'work.intro':
      'Measured outcomes from B2B projects across Poland — websites, AI systems, and automation built to move revenue.',
    'work.stat1.value': '24',
    'work.stat1.label': 'Projects delivered',
    'work.stat2.value': '+38%',
    'work.stat2.label': 'Avg. inquiry growth',
    'work.stat3.value': '94%',
    'work.stat3.label': 'Client retention',
    'work.stat4.value': '4.2\u00d7',
    'work.stat4.label': 'Avg. ROI in 12 months',
    'work.case1.meta': 'Law firm \u00b7 Warsaw',
    'work.case1.title': 'Website redesign & conversion optimisation',
    'work.case1.package': 'Foundation + CRO',
    'work.case1.metric': '+47%',
    'work.case1.metricLabel': 'Qualified inquiries in 90 days',
    'work.case1.desc':
      'Repositioned the firm online and rebuilt the contact flow. High-intent form submissions and phone inquiries rose within the first quarter after launch.',
    'work.case2.meta': 'Private clinic \u00b7 Krak\u00f3w',
    'work.case2.title': 'Website, AI assistant & lead qualification',
    'work.case2.package': 'Growth',
    'work.case2.metric': '+62%',
    'work.case2.metricLabel': 'After-hours leads captured',
    'work.case2.desc':
      'AI assistant now handles patient inquiries outside clinic hours \u2014 qualifying intent and booking callbacks before the front desk opens.',
    'work.case3.meta': 'B2B consultancy \u00b7 Gda\u0144sk',
    'work.case3.title': 'Full-stack automation & digital systems',
    'work.case3.package': 'Partner',
    'work.case3.metric': '14 hrs',
    'work.case3.metricLabel': 'Admin time recovered per week',
    'work.case3.desc':
      'Automated CRM updates, client onboarding, and reporting \u2014 freeing senior consultants for billable work that actually moves revenue.',

    'testimonial.quote':
      '\u201cThey didn\u2019t just build us a website \u2014 they rebuilt how clients find us. Inquiries are up, and the ones we get are actually worth our time.\u201d',
    'testimonial.role': 'Managing Partner, Warsaw law firm',

    'packages.eyebrow': 'Packages',
    'packages.heading': 'How we work together',
    'packages.includes': 'What\u2019s included',
    'packages.cta': 'Book a free revenue review',
    'packages.p1.desc':
      'Turn your website into a credible sales asset. For firms whose current site is costing them inquiries they never even know about. Clean, fast, built to convert visitors into conversations.',
    'packages.p1.i1': 'Discovery & conversion strategy session',
    'packages.p1.i2': 'Custom design \u2014 up to 8 pages',
    'packages.p1.i3': 'Fast, mobile-first development',
    'packages.p1.i4': 'Contact forms & inquiry tracking setup',
    'packages.p1.i5': 'SEO foundations & analytics',
    'packages.p1.i6': '30 days post-launch support',
    'packages.p1.i7': 'Full ownership of all assets',
    'packages.p1.timeline': 'Typical timeline: 6\u20138 weeks',
    'packages.p1.price': 'From $3,000',
    'packages.p2.desc':
      'Website plus the systems that compound revenue over time \u2014 a done-for-you retainer with no dev team required on your end. AI lead capture, automation, and ongoing optimisation mean performance improves after launch, not just on launch day.',
    'packages.p2.i1': 'Everything in Foundation',
    'packages.p2.i2': 'AI assistant for lead capture & qualification',
    'packages.p2.i3': 'Core automation (CRM sync, follow-ups, notifications)',
    'packages.p2.i4': 'Find the leaks & fix the first ones',
    'packages.p2.i5': 'Monthly CRO & site improvements',
    'packages.p2.i6': 'Monthly reporting on inquiries & conversion',
    'packages.p2.timeline': 'Typical timeline: 10\u201312 weeks + ongoing retainer',
    'packages.p2.price': 'From $6,200 + $620/mo',
    'packages.p3.desc':
      'Your external digital team, on retainer \u2014 full system, full automation, strategic input, and every change made for you, so you never need to hire your own developers. For companies that want digital as a competitive advantage, not a checkbox.',
    'packages.p3.i1': 'Everything in Growth',
    'packages.p3.i2': 'Full automation suite across your stack, including custom n8n/Make blueprints',
    'packages.p3.i3': 'Custom integrations & advanced AI workflows',
    'packages.p3.i4': 'Strategic roadmap with quarterly reviews',
    'packages.p3.i5': 'Priority support & dedicated channel',
    'packages.p3.i6': 'Landing pages & campaign support on retainer',
    'packages.p3.timeline': 'Typical timeline: 12\u201316 weeks + ongoing retainer',
    'packages.p3.price': 'From $10,000 + $1,250/mo',

    'process.eyebrow': 'Process',
    'process.heading': 'How a project looks',
    'process.st1.title': 'Discovery',
    'process.st1.desc':
      'We map where leads and revenue are leaking today \u2014 before we touch a single pixel. Goals, audience, competition, current gaps.',
    'process.st2.title': 'Strategy & Design',
    'process.st2.desc':
      'We design for your sales cycle \u2014 not a template that looks good but doesn\u2019t convert. A considered visual and structural proposal built for your specific goals.',
    'process.st3.title': 'Build',
    'process.st3.desc':
      'Fast, clean, documented. You start earning from the investment sooner \u2014 and you\u2019re never left wondering what\u2019s happening.',
    'process.st4.title': 'Launch & Retain',
    'process.st4.desc':
      'We don\u2019t disappear after launch. Retainer clients get ongoing development, monthly reporting on inquiries and conversion \u2014 a done-for-you service, so you never need your own dev team.',

    'faq.eyebrow': 'FAQ',
    'faq.heading': 'Common questions',
    'faq.q1': 'How long does a project take?',
    'faq.a1':
      'Foundation projects typically run 6\u20138 weeks. Growth and Partner take 10\u201316 weeks for the initial build, then shift to an ongoing retainer. We\u2019ll give you a specific timeline on the revenue review call.',
    'faq.q2': 'What happens on the free revenue review?',
    'faq.a2':
      '30 minutes, no pitch. We review your current site and funnel, identify where leads or revenue are leaking, and outline what fixing it would involve \u2014 with honest scope and ballpark numbers.',
    'faq.q3': 'Who is not a good fit?',
    'faq.a3':
      'Companies optimising purely for the lowest price, or those needing a template site in under two weeks. We work best with B2B firms who care about quality inquiries and long-term digital performance.',
    'contact.eyebrow': 'Contact',
    'contact.heading': 'Ready to stop leaving revenue on the table?',
    'contact.body':
      'Book a free 30-minute revenue review. We\u2019ll show you where prospects drop off, what\u2019s limiting inquiries, and what it would take to fix it \u2014 with honest numbers, not a sales pitch.',
    'contact.steps.heading': 'What happens on the call',
    'contact.steps.s1.title': 'We listen',
    'contact.steps.s1.desc':
      'Your business, goals, and how clients find you today \u2014 no questionnaire, just a conversation.',
    'contact.steps.s2.title': 'We diagnose',
    'contact.steps.s2.desc':
      'Where your funnel leaks, what\u2019s costing you inquiries, and what quick wins exist before any build.',
    'contact.steps.s3.title': 'You get clarity',
    'contact.steps.s3.desc':
      'Honest scope, ballpark investment, and a recommended path \u2014 whether that\u2019s with us or not.',
    'contact.cta': 'Book a free revenue review',

    'contact.fallback.heading': 'Not ready to book a slot?',
    'contact.fallback.body': 'Tell us what’s leaking. We reply — even if you didn’t pick a time.',
    'contact.fallback.name': 'Name',
    'contact.fallback.email': 'Work email',
    'contact.fallback.site': 'Site URL',
    'contact.fallback.leak': 'What’s leaking?',
    'contact.fallback.submit': 'Send',

    'booking.close': 'Close booking widget',

    'footer.tagline': 'Stop leaking inquiries.',
  },

  pl: {
    'nav.services': 'Co robimy',
    'nav.clients': 'Z kim pracujemy',
    'nav.work': 'Rezultaty',
    'nav.packages': 'Pakiety',
    'nav.process': 'Proces',
    'nav.faq': 'FAQ',
    'nav.menu': 'Otw\u00f3rz menu',
    'nav.menuClose': 'Zamknij menu',
    'nav.cta': 'Um\u00f3w bezp\u0142atn\u0105 analiz\u0119 przychod\u00f3w',

    'hero.line1': 'Twoja strona gubi zapytania, o kt\u00f3rych nawet nie wiesz.',
    'hero.line2':
      'Kontakt schowany. Zero obs\u0142ugi po godzinach. Wygl\u0105da taniej ni\u017c stawki, kt\u00f3re bierzesz.',
    'hero.sub':
      'Wolna lub s\u0142aba strona codziennie traci warto\u015bciowe leady. Podczas bezp\u0142atnej 30-minutowej rozmowy znajdujemy przecieki, a potem naprawiamy system, kt\u00f3ry wci\u0105\u017c kosztuje Ci\u0119 klient\u00f3w.',
    'hero.cta': 'Um\u00f3w bezp\u0142atn\u0105 analiz\u0119 przychod\u00f3w',
    'hero.ctaNote': '30 minut \u00b7 Analizujemy Twoj\u0105 \u017cyw\u0105 stron\u0119 \u00b7 Zero sprzeda\u017cowego pitchu',
    'hero.scroll': 'Przewi\u0144',

    'philosophy.eyebrow': 'Filozofia',
    'philosophy.l1': 'Pracujemy z kilkoma firmami naraz.',
    'philosophy.l2': 'Nie fabryka. Nie zamkni\u0119ty klub.',
    'philosophy.l3':
      'Pe\u0142ny zesp\u00f3\u0142 przy ka\u017cdym projekcie. Bez oddawania Ci\u0119 juniorowi. Zostajemy, dop\u00f3ki strona nie przestanie przecieka\u0107.',

    'services.eyebrow': 'Us\u0142ugi',
    'services.heading': 'Co robimy',
    'services.s1.title': 'Projektowanie i tworzenie stron',
    'services.s1.desc':
      'Twoja strona to pierwszy dow\u00f3d stawek, kt\u00f3re bierzesz. Je\u015bli wygl\u0105da taniej ni\u017c Twoje ceny, klienci zauwa\u017c\u0105 to, zanim zadzwoni\u0105. Budujemy strony, kt\u00f3re dor\u00f3wnuj\u0105 Twoim stawkom \u2014 szybsze zaufanie, wi\u0119cej zapyta\u0144, mniej rozm\u00f3w, kt\u00f3re nigdzie nie prowadz\u0105.',
    'services.s2.title': 'Asystenci AI i chatboty',
    'services.s2.desc':
      'Wi\u0119kszo\u015b\u0107 zapyta\u0144 trafia do Ciebie, gdy biuro jest zamkni\u0119te \u2014 a bez przechwytywania ten ruch po prostu odchodzi. Nasi asystenci AI kwalifikuj\u0105 i przechwytuj\u0105 leady 24/7, wieczorami, w weekendy i po godzinach, \u017ceby nic nie zosta\u0142o bez odpowiedzi.',
    'services.s3.title': 'Automatyzacja (n8n / Make)',
    'services.s3.desc':
      'Usuwamy administracj\u0119, kt\u00f3ra zjada godziny rozliczalne \u2014 \u0142\u0105cz\u0105c Twoj\u0105 stron\u0119 z narz\u0119dziami takimi jak HubSpot, Pipedrive, Notion czy Slack do follow-up\u00f3w, aktualizacji CRM, onboardingu i raportowania \u2014 \u017ceby zesp\u00f3\u0142 robi\u0142 to, za co klienci p\u0142ac\u0105.',
    'services.s4.title': 'Optymalizacja konwersji (CRO)',
    'services.s4.desc':
      'Schowane formularze kontaktowe i niejasne \u015bcie\u017cki kosztuj\u0105 Ci\u0119 klient\u00f3w, kt\u00f3rzy byli gotowi si\u0119 odezwa\u0107. Znajdujemy, gdzie kwalifikowani odwiedzaj\u0105cy rezygnuj\u0105 \u2014 i uszczelniamy przeciek.',

    'clients.eyebrow': 'Klienci',
    'clients.heading': 'Z kim pracujemy',
    'clients.body':
      'Pracujemy z firmami B2B, gdzie jeden nowy klient sp\u0142aca ca\u0142y projekt \u2014 kancelariami prawnymi, prywatnymi klinikami, firmami doradczymi, dostawcami us\u0142ug premium. Zbudowa\u0142e\u015b powa\u017cny biznes. Twoja strona nie powinna wygl\u0105da\u0107 taniej ni\u017c stawki, kt\u00f3re bierzesz.',
    'clients.cheap': 'Je\u015bli optymalizujesz pod najni\u017csz\u0105 cen\u0119 \u2014 nie jeste\u015bmy dla Ciebie.',
    'clients.best':
      'Je\u015bli optymalizujesz pod klient\u00f3w p\u0142ac\u0105cych premium \u2014 porozmawiajmy.',

    'work.eyebrow': 'Realizacje',
    'work.heading': 'Wybrane rezultaty',
    'work.intro':
      'Mierzalne wyniki projekt\u00f3w B2B w Polsce \u2014 strony, systemy AI i automatyzacja zbudowane pod przych\u00f3d.',
    'work.stat1.value': '24',
    'work.stat1.label': 'Zrealizowanych projekt\u00f3w',
    'work.stat2.value': '+38%',
    'work.stat2.label': '\u015ar. wzrost zapyta\u0144',
    'work.stat3.value': '94%',
    'work.stat3.label': 'Retencja klient\u00f3w',
    'work.stat4.value': '4,2\u00d7',
    'work.stat4.label': '\u015ar. ROI w 12 miesi\u0119cy',
    'work.case1.meta': 'Kancelaria prawna \u00b7 Warszawa',
    'work.case1.title': 'Redesign strony i optymalizacja konwersji',
    'work.case1.package': 'Foundation + CRO',
    'work.case1.metric': '+47%',
    'work.case1.metricLabel': 'Wi\u0119cej kwalifikowanych zapyta\u0144 w 90 dni',
    'work.case1.desc':
      'Przeprojektowali\u015bmy pozycjonowanie online i \u015bcie\u017ck\u0119 kontaktu. Wysokointencyjne formularze i telefony wzros\u0142y w pierwszym kwartale po wdro\u017ceniu.',
    'work.case2.meta': 'Prywatna klinika \u00b7 Krak\u00f3w',
    'work.case2.title': 'Strona, asystent AI i kwalifikacja lead\u00f3w',
    'work.case2.package': 'Growth',
    'work.case2.metric': '+62%',
    'work.case2.metricLabel': 'Lead\u00f3w poza godzinami pracy',
    'work.case2.desc':
      'Asystent AI obs\u0142uguje zapytania pacjent\u00f3w po godzinach \u2014 kwalifikuje intencj\u0119 i umawia callbacki, zanim otworzy recepcja.',
    'work.case3.meta': 'Firma doradcza B2B \u00b7 Gda\u0144sk',
    'work.case3.title': 'Pe\u0142na automatyzacja i systemy digital',
    'work.case3.package': 'Partner',
    'work.case3.metric': '14 godz.',
    'work.case3.metricLabel': 'Odzyskane godziny admina tygodniowo',
    'work.case3.desc':
      'Zautomatyzowali\u015bmy CRM, onboarding klient\u00f3w i raportowanie \u2014 uwalniaj\u0105c senior\u00f3w pod rozliczaln\u0105 prac\u0119, kt\u00f3ra realnie nap\u0119dza przych\u00f3d.',

    'testimonial.quote':
      '\u201cNie zbudowali nam tylko strony \u2014 przebudowali spos\u00f3b, w jaki klienci nas znajduj\u0105. Zapyta\u0144 jest wi\u0119cej, a te, kt\u00f3re dostajemy, naprawd\u0119 maj\u0105 sens.\u201d',
    'testimonial.role': 'Managing Partner, kancelaria prawna, Warszawa',

    'packages.eyebrow': 'Pakiety',
    'packages.heading': 'Jak wsp\u00f3\u0142pracujemy',
    'packages.includes': 'Co zawiera',
    'packages.cta': 'Um\u00f3w bezp\u0142atn\u0105 analiz\u0119 przychod\u00f3w',
    'packages.p1.desc':
      'Zamie\u0144 stron\u0119 w wiarygodne narz\u0119dzie sprzeda\u017cowe. Dla firm, kt\u00f3rych obecna witryna kosztuje ich zapytania, o kt\u00f3rych nawet nie wiedz\u0105. Czysta, szybka, zaprojektowana \u017ceby zamienia\u0107 odwiedzaj\u0105cych w rozmowy.',
    'packages.p1.i1': 'Discovery i sesja strategii konwersji',
    'packages.p1.i2': 'Projekt na miar\u0119 \u2014 do 8 podstron',
    'packages.p1.i3': 'Szybki development mobile-first',
    'packages.p1.i4': 'Formularze kontaktowe i \u015bledzenie zapyta\u0144',
    'packages.p1.i5': 'Fundamenty SEO i analityka',
    'packages.p1.i6': '30 dni wsparcia po wdro\u017ceniu',
    'packages.p1.i7': 'Pe\u0142na w\u0142asno\u015b\u0107 wszystkich materia\u0142\u00f3w',
    'packages.p1.timeline': 'Typowy czas: 6\u20138 tygodni',
    'packages.p1.price': 'Od 12\u00a0000 PLN',
    'packages.p2.desc':
      'Strona plus systemy, kt\u00f3re mno\u017c\u0105 przych\u00f3d w czasie \u2014 retainer w modelu \u201ezrobimy to za Ciebie\u201d, bez potrzeby posiadania w\u0142asnego zespo\u0142u deweloperskiego. Przechwytywanie lead\u00f3w AI, automatyzacja i ci\u0105g\u0142a optymalizacja sprawiaj\u0105, \u017ce wyniki rosn\u0105 po wdro\u017ceniu, nie tylko w dniu launchu.',
    'packages.p2.i1': 'Wszystko z pakietu Foundation',
    'packages.p2.i2': 'Asystent AI do przechwytywania i kwalifikacji lead\u00f3w',
    'packages.p2.i3': 'Automatyzacja core (CRM, follow-upy, powiadomienia)',
    'packages.p2.i4': 'Namierzamy przecieki i naprawiamy pierwsze',
    'packages.p2.i5': 'Miesi\u0119czne CRO i ulepszenia strony',
    'packages.p2.i6': 'Miesi\u0119czne raporty z zapyta\u0144 i konwersji',
    'packages.p2.timeline': 'Typowy czas: 10\u201312 tygodni + retainer',
    'packages.p2.price': 'Od 25\u00a0000 PLN + 2\u00a0500 PLN/msc',
    'packages.p3.desc':
      'Tw\u00f3j zewn\u0119trzny zesp\u00f3\u0142 digital w modelu retainer \u2014 pe\u0142ny system, pe\u0142na automatyzacja, wsparcie strategiczne i ka\u017cda zmiana wykonana za Ciebie, bez potrzeby zatrudniania w\u0142asnych developer\u00f3w. Dla firm, kt\u00f3re traktuj\u0105 digital jako przewag\u0119 konkurencyjn\u0105, nie obowi\u0105zek.',
    'packages.p3.i1': 'Wszystko z pakietu Growth',
    'packages.p3.i2': 'Pe\u0142na automatyzacja w ca\u0142ym stacku, w tym w\u0142asne szablony n8n/Make',
    'packages.p3.i3': 'Integracje na miar\u0119 i zaawansowane workflow AI',
    'packages.p3.i4': 'Roadmapa strategiczna z kwartalnymi review',
    'packages.p3.i5': 'Priorytetowe wsparcie i dedykowany kana\u0142',
    'packages.p3.i6': 'Landing page\u2019e i wsparcie kampanii w retainerze',
    'packages.p3.timeline': 'Typowy czas: 12\u201316 tygodni + retainer',
    'packages.p3.price': 'Od 40\u00a0000 PLN + 5\u00a0000 PLN/msc',

    'process.eyebrow': 'Proces',
    'process.heading': 'Jak wygl\u0105da projekt',
    'process.st1.title': 'Analiza wst\u0119pna',
    'process.st1.desc':
      'Mapujemy, gdzie dzi\u015b uciekaj\u0105 leady i przych\u00f3d \u2014 zanim dotkniemy cho\u0107by jednego piksela. Cele, odbiorcy, konkurencja, obecne luki.',
    'process.st2.title': 'Strategia i projekt',
    'process.st2.desc':
      'Projektujemy pod Tw\u00f3j cykl sprzeda\u017cy \u2014 nie szablon, kt\u00f3ry \u0142adnie wygl\u0105da, ale nie konwertuje. Przemy\u015blana propozycja wizualna i strukturalna, zbudowana dla Twoich cel\u00f3w.',
    'process.st3.title': 'Realizacja',
    'process.st3.desc':
      'Szybko, czysto, z dokumentacj\u0105. Szybciej zaczynasz zarabia\u0107 na inwestycji \u2014 i nigdy nie zastanawiasz si\u0119, co si\u0119 dzieje.',
    'process.st4.title': 'Wdro\u017cenie i rozw\u00f3j',
    'process.st4.desc':
      'Nie znikamy po wdro\u017ceniu. Klienci na retainerze otrzymuj\u0105 ci\u0105g\u0142y rozw\u00f3j, miesi\u0119czne raporty z zapyta\u0144 i konwersji \u2014 us\u0142ug\u0119 w modelu \u201ezrobimy to za Ciebie\u201d, wi\u0119c nigdy nie potrzebujesz w\u0142asnego zespo\u0142u deweloperskiego.',

    'faq.eyebrow': 'FAQ',
    'faq.heading': 'Najcz\u0119stsze pytania',
    'faq.q1': 'Ile trwa projekt?',
    'faq.a1':
      'Foundation to zwykle 6\u20138 tygodni. Growth i Partner wymagaj\u0105 10\u201316 tygodni na start, potem retainer. Konkretny harmonogram dostaniesz na analizie przychod\u00f3w.',
    'faq.q2': 'Co obejmuje bezp\u0142atna analiza przychod\u00f3w?',
    'faq.a2':
      '30 minut, bez pitchu. Przegl\u0105damy Twoj\u0105 stron\u0119 i lejek, pokazujemy gdzie uciekaj\u0105 leady i przych\u00f3d oraz co trzeba zrobi\u0107 \u2014 z uczciwym zakresem i wide\u0142kami cenowymi.',
    'faq.q3': 'Dla kogo to nie jest?',
    'faq.a3':
      'Dla firm szukaj\u0105cych wy\u0142\u0105cznie najni\u017cszej ceny lub template\u2019u w dwa tygodnie. Najlepiej wsp\u00f3\u0142pracujemy z B2B, kt\u00f3rym zale\u017cy na jako\u015bci zapyta\u0144 i d\u0142ugoterminowych wynikach.',
    'contact.eyebrow': 'Kontakt',
    'contact.heading': 'Gotowy przesta\u0107 zostawia\u0107 pieni\u0105dze na stole?',
    'contact.body':
      'Um\u00f3w bezp\u0142atn\u0105 30-minutow\u0105 analiz\u0119 przychod\u00f3w. Poka\u017cemy, gdzie rezygnuj\u0105 prospekci, co ogranicza liczb\u0119 zapyta\u0144 i co trzeba zrobi\u0107, \u017ceby to zmieni\u0107 \u2014 z uczciwymi liczbami, a nie sprzeda\u017cow\u0105 gadk\u0105.',
    'contact.steps.heading': 'Jak wygl\u0105da rozmowa',
    'contact.steps.s1.title': 'S\u0142uchamy',
    'contact.steps.s1.desc':
      'Tw\u00f3j biznes, cele i jak klienci trafiaj\u0105 do Ciebie dzi\u015b \u2014 rozmowa, nie ankieta.',
    'contact.steps.s2.title': 'Diagnozujemy',
    'contact.steps.s2.desc':
      'Gdzie przecieka lejek, co kosztuje Ci\u0119 zapytania i jakie szybkie usprawnienia s\u0105 mo\u017cliwe, zanim zaczniemy budowa\u0107.',
    'contact.steps.s3.title': 'Masz jasno\u015b\u0107',
    'contact.steps.s3.desc':
      'Uczciwy zakres, wide\u0142ki inwestycji i rekomendowany kierunek \u2014 nawet je\u015bli to nie b\u0119dzie z nami.',
    'contact.cta': 'Um\u00f3w bezp\u0142atn\u0105 analiz\u0119 przychod\u00f3w',

    'contact.fallback.heading': 'Nie chcesz jeszcze rezerwowa\u0107 terminu?',
    'contact.fallback.body': 'Napisz, co przecieka. Odpowiadamy \u2014 nawet je\u015bli nie wybierzesz terminu.',
    'contact.fallback.name': 'Imi\u0119',
    'contact.fallback.email': 'Firmowy e-mail',
    'contact.fallback.site': 'Adres strony',
    'contact.fallback.leak': 'Co przecieka?',
    'contact.fallback.submit': 'Wy\u015blij',

    'booking.close': 'Zamknij wid\u017cet rezerwacji',

    'footer.tagline': 'Przesta\u0144 traci\u0107 zapyta\u0144.',
  },
};

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'pl';
}

export function getStoredLang(
  storage: Pick<Storage, 'getItem'> = localStorage,
  browserLang: string = typeof navigator !== 'undefined' ? navigator.language : 'en',
): Lang {
  const stored = storage.getItem(STORAGE_KEY);
  if (isLang(stored)) return stored;
  return browserLang.toLowerCase().startsWith('pl') ? 'pl' : 'en';
}

export interface SetLanguageOptions {
  root?: ParentNode;
  doc?: Document;
  storage?: Pick<Storage, 'setItem'>;
}

/**
 * Swaps every [data-i18n] element's text, persists the choice and updates
 * <html lang> plus the active state of the toggle buttons.
 */
export function setLanguage(lang: Lang, options: SetLanguageOptions = {}): void {
  const doc = options.doc ?? document;
  const root = options.root ?? doc;
  const storage = options.storage ?? localStorage;

  const dict = translations[lang];

  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (key && dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]').forEach(
    (el) => {
      const key = el.dataset.i18nPlaceholder;
      if (key && dict[key] !== undefined) {
        el.placeholder = dict[key];
      }
    },
  );

  root.querySelectorAll<HTMLOptionElement>('option[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (key && dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  root.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria;
    if (key && dict[key] !== undefined) {
      el.setAttribute('aria-label', dict[key]);
    }
  });

  doc.documentElement.lang = lang;
  storage.setItem(STORAGE_KEY, lang);

  root.querySelectorAll<HTMLElement>('[data-lang]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });

  const menuToggle = root.querySelector<HTMLElement>('#nav-toggle');
  if (menuToggle) {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const ariaKey = isOpen ? 'nav.menuClose' : 'nav.menu';
    if (dict[ariaKey]) {
      menuToggle.setAttribute('aria-label', dict[ariaKey]);
    }
  }
}
