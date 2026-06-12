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
    'nav.cta': 'Book a revenue review',

    'hero.line1': 'Some agencies build websites.',
    'hero.line2': 'We build presence.',
    'hero.sub':
      'We build digital presence that converts attention into revenue — for B2B firms where every lost lead costs real money.',
    'hero.cta': 'Book a free revenue review',
    'hero.scroll': 'Scroll',

    'philosophy.eyebrow': 'Philosophy',
    'philosophy.l1': 'We work with a handful of companies per year.',
    'philosophy.l2': 'Not because we can\u2019t handle more \u2014 because we won\u2019t.',
    'philosophy.l3':
      'Every client gets our full attention. Every project gets our full craft. We don\u2019t hand you off to a junior and disappear. We stay until it\u2019s right. Better presence isn\u2019t vanity \u2014 in professional services, it\u2019s what separates \u201cwe\u2019ll think about it\u201d from \u201clet\u2019s schedule a call.\u201d',

    'services.eyebrow': 'Services',
    'services.heading': 'What we do',
    'services.s1.desc':
      'Websites that make you look like the obvious choice \u2014 before a prospect ever picks up the phone. Faster trust, more inquiries, fewer dead-end conversations.',
    'services.s2.desc':
      'Capture leads outside office hours and qualify them before your team gets involved. Fewer dead-end calls, more conversations worth having.',
    'services.s3.desc':
      'Remove the admin work that eats billable hours \u2014 follow-ups, CRM updates, onboarding, reporting \u2014 so your team spends time on work clients actually pay for.',
    'services.s4.desc':
      'More revenue from the traffic you already pay for. We find where qualified prospects drop off \u2014 and fix the leaks in your funnel.',

    'clients.eyebrow': 'Clients',
    'clients.heading': 'Who we work with',
    'clients.body':
      'We work with B2B companies where one new client pays for the entire project \u2014 law firms, private clinics, consultancies, premium service providers. You\u2019ve built a serious business. Your website should bring in the clients you deserve, not undersell what you\u2019ve built.',
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
    'packages.cta': 'Discuss this package',
    'packages.p1.desc':
      'Turn your website into a credible sales asset. For firms whose current site is costing them inquiries they never even know about. Clean, fast, built to convert visitors into conversations.',
    'packages.p1.i1': 'Discovery & conversion strategy session',
    'packages.p1.i2': 'Custom design \u2014 up to 8 pages',
    'packages.p1.i3': 'Fast, mobile-first development',
    'packages.p1.i4': 'Contact forms & inquiry tracking setup',
    'packages.p1.i5': 'SEO foundations & analytics',
    'packages.p1.i6': '30 days post-launch support',
    'packages.p1.timeline': 'Typical timeline: 6\u20138 weeks',
    'packages.p1.price': 'From 12\u00a0000 PLN',
    'packages.p2.desc':
      'Website plus the systems that compound revenue over time. AI lead capture, automation, and ongoing optimisation \u2014 so performance improves after launch, not just on launch day.',
    'packages.p2.i1': 'Everything in Foundation',
    'packages.p2.i2': 'AI assistant for lead capture & qualification',
    'packages.p2.i3': 'Core automation (CRM sync, follow-ups, notifications)',
    'packages.p2.i4': 'Conversion audit & initial optimisations',
    'packages.p2.i5': 'Monthly CRO & site improvements',
    'packages.p2.i6': 'Monthly reporting on inquiries & conversion',
    'packages.p2.timeline': 'Typical timeline: 10\u201312 weeks + ongoing retainer',
    'packages.p2.price': 'From 25\u00a0000 PLN + 2\u00a0500 PLN/mo',
    'packages.p3.desc':
      'Your external digital team focused on revenue, not deliverables. Full system, full automation, strategic input \u2014 for companies that want digital as a competitive advantage, not a checkbox.',
    'packages.p3.i1': 'Everything in Growth',
    'packages.p3.i2': 'Full automation suite across your stack',
    'packages.p3.i3': 'Custom integrations & advanced AI workflows',
    'packages.p3.i4': 'Strategic roadmap with quarterly reviews',
    'packages.p3.i5': 'Priority support & dedicated channel',
    'packages.p3.i6': 'Landing pages & campaign support on retainer',
    'packages.p3.timeline': 'Typical timeline: 12\u201316 weeks + ongoing retainer',
    'packages.p3.price': 'From 40\u00a0000 PLN + 5\u00a0000 PLN/mo',

    'packages.select.foundation': 'Foundation',
    'packages.select.growth': 'Growth',
    'packages.select.partner': 'Partner',
    'packages.select.unsure': 'Not sure yet',

    'process.eyebrow': 'Process',
    'process.heading': 'How a project looks',
    'process.st1.desc':
      'We map where leads and revenue are leaking today \u2014 before we touch a single pixel. Goals, audience, competition, current gaps.',
    'process.st2.desc':
      'We design for your sales cycle \u2014 not a template that looks good but doesn\u2019t convert. A considered visual and structural proposal built for your specific goals.',
    'process.st3.desc':
      'Fast, clean, documented. You start earning from the investment sooner \u2014 and you\u2019re never left wondering what\u2019s happening.',
    'process.st4.desc':
      'We don\u2019t disappear after launch. Retainer clients get ongoing development, monthly reporting on inquiries and conversion \u2014 and a team that knows their business.',

    'faq.eyebrow': 'FAQ',
    'faq.heading': 'Common questions',
    'faq.q1': 'How long does a project take?',
    'faq.a1':
      'Foundation projects typically run 6\u20138 weeks. Growth and Partner take 10\u201316 weeks for the initial build, then shift to an ongoing retainer. We\u2019ll give you a specific timeline on the consultation call.',
    'faq.q2': 'What happens on the free consultation?',
    'faq.a2':
      '30 minutes, no pitch. We review your current site and funnel, identify where leads or revenue are leaking, and outline what fixing it would involve \u2014 with honest scope and ballpark numbers.',
    'faq.q3': 'Who is not a good fit?',
    'faq.a3':
      'Companies optimising purely for the lowest price, or those needing a template site in under two weeks. We work best with B2B firms who care about quality inquiries and long-term digital performance.',
    'faq.q4': 'Do you work outside Poland?',
    'faq.a4':
      'Yes. Most of our clients are Polish B2B firms, but we work remotely with premium service businesses across the EU. Discovery and delivery are fully online.',

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
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company',
    'contact.form.package': 'Package interest',
    'contact.form.message': 'What\u2019s the biggest challenge with your digital presence?',
    'contact.form.submit': 'Send request',
    'contact.form.note':
      'Submitting opens your email client with a pre-filled message. Prefer to write directly? hello@subsecond.app',
    'contact.form.subject': 'Revenue review request — subsecond.app',
    'contact.cta': 'Book a free revenue review',
    'contact.calendly': 'Prefer to pick a time directly?',

    'footer.tagline': 'We build presence.',
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
    'nav.cta': 'Um\u00f3w analiz\u0119 przychod\u00f3w',

    'hero.line1': 'Niekt\u00f3re agencje buduj\u0105 strony.',
    'hero.line2': 'My budujemy obecno\u015b\u0107.',
    'hero.sub':
      'Budujemy obecno\u015b\u0107 cyfrow\u0105, kt\u00f3ra zamienia uwag\u0119 w przych\u00f3d \u2014 dla firm B2B, gdzie ka\u017cdy utracony lead kosztuje realne pieni\u0105dze.',
    'hero.cta': 'Um\u00f3w bezp\u0142atn\u0105 analiz\u0119 przychod\u00f3w',
    'hero.scroll': 'Przewi\u0144',

    'philosophy.eyebrow': 'Filozofia',
    'philosophy.l1': 'Pracujemy z garstk\u0105 firm rocznie.',
    'philosophy.l2': 'Nie dlatego, \u017ce nie mo\u017cemy \u2014 dlatego, \u017ce nie chcemy.',
    'philosophy.l3':
      'Ka\u017cdy klient dostaje nasz\u0105 pe\u0142n\u0105 uwag\u0119. Ka\u017cdy projekt \u2014 nasze pe\u0142ne zaanga\u017cowanie. Nie oddajemy Ci\u0119 juniorowi i nie znikamy. Zostajemy, dop\u00f3ki nie b\u0119dzie idealnie. Lepsza obecno\u015b\u0107 to nie fanaberia \u2014 w us\u0142ugach profesjonalnych decyduje o tym, czy us\u0142yszysz \u201cpomy\u015blimy\u201d, czy \u201cum\u00f3wmy rozmow\u0119\u201d.',

    'services.eyebrow': 'Us\u0142ugi',
    'services.heading': 'Co robimy',
    'services.s1.desc':
      'Strony, kt\u00f3re sprawiaj\u0105, \u017ce wygl\u0105dasz jak oczywisty wyb\u00f3r \u2014 zanim klient w og\u00f3le zadzwoni. Szybsze zaufanie, wi\u0119cej zapyta\u0144, mniej ja\u0142owych rozm\u00f3w.',
    'services.s2.desc':
      'Przechwytuj leady po godzinach pracy i kwalifikuj je, zanim zaanga\u017cuje si\u0119 Tw\u00f3j zesp\u00f3\u0142. Mniej ja\u0142owych telefon\u00f3w, wi\u0119cej rozm\u00f3w, kt\u00f3re maj\u0105 sens.',
    'services.s3.desc':
      'Usu\u0144 administracj\u0119, kt\u00f3ra zjada godziny rozliczalne \u2014 follow-upy, aktualizacje CRM, onboarding, raporty \u2014 \u017ceby zesp\u00f3\u0142 robi\u0142 to, za co klienci realnie p\u0142ac\u0105.',
    'services.s4.desc':
      'Wi\u0119cej przychodu z ruchu, za kt\u00f3ry ju\u017c p\u0142acisz. Znajdujemy, gdzie kwalifikowani prospekci rezygnuj\u0105 \u2014 i uszczelniamy lejki sprzeda\u017cowe.',

    'clients.eyebrow': 'Klienci',
    'clients.heading': 'Z kim pracujemy',
    'clients.body':
      'Pracujemy z firmami B2B, gdzie jeden nowy klient sp\u0142aca ca\u0142y projekt \u2014 kancelariami prawnymi, prywatnymi klinikami, firmami doradczymi, dostawcami us\u0142ug premium. Zbudowa\u0142e\u015b powa\u017cny biznes. Twoja strona powinna przyci\u0105ga\u0107 klient\u00f3w, na kt\u00f3rych zas\u0142ugujesz \u2014 a nie obni\u017ca\u0107 warto\u015bci tego, co zbudowa\u0142e\u015b.',
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
    'packages.cta': 'Om\u00f3w ten pakiet',
    'packages.p1.desc':
      'Zamie\u0144 stron\u0119 w wiarygodne narz\u0119dzie sprzeda\u017cowe. Dla firm, kt\u00f3rych obecna witryna kosztuje ich zapytania, o kt\u00f3rych nawet nie wiedz\u0105. Czysta, szybka, zaprojektowana \u017ceby zamienia\u0107 odwiedzaj\u0105cych w rozmowy.',
    'packages.p1.i1': 'Discovery i sesja strategii konwersji',
    'packages.p1.i2': 'Projekt na miar\u0119 \u2014 do 8 podstron',
    'packages.p1.i3': 'Szybki development mobile-first',
    'packages.p1.i4': 'Formularze kontaktowe i \u015bledzenie zapyta\u0144',
    'packages.p1.i5': 'Fundamenty SEO i analityka',
    'packages.p1.i6': '30 dni wsparcia po wdro\u017ceniu',
    'packages.p1.timeline': 'Typowy czas: 6\u20138 tygodni',
    'packages.p1.price': 'Od 12\u00a0000 PLN',
    'packages.p2.desc':
      'Strona plus systemy, kt\u00f3re mno\u017c\u0105 przych\u00f3d w czasie. Przechwytywanie lead\u00f3w AI, automatyzacja i ci\u0105g\u0142a optymalizacja \u2014 \u017ceby wyniki ros\u0142y po wdro\u017ceniu, nie tylko w dniu launchu.',
    'packages.p2.i1': 'Wszystko z pakietu Foundation',
    'packages.p2.i2': 'Asystent AI do przechwytywania i kwalifikacji lead\u00f3w',
    'packages.p2.i3': 'Automatyzacja core (CRM, follow-upy, powiadomienia)',
    'packages.p2.i4': 'Audyt konwersji i pierwsze optymalizacje',
    'packages.p2.i5': 'Miesi\u0119czne CRO i ulepszenia strony',
    'packages.p2.i6': 'Miesi\u0119czne raporty z zapyta\u0144 i konwersji',
    'packages.p2.timeline': 'Typowy czas: 10\u201312 tygodni + retainer',
    'packages.p2.price': 'Od 25\u00a0000 PLN + 2\u00a0500 PLN/msc',
    'packages.p3.desc':
      'Tw\u00f3j zewn\u0119trzny zesp\u00f3\u0142 digital nastawiony na przych\u00f3d, nie na deliverables. Pe\u0142ny system, pe\u0142na automatyzacja, wsparcie strategiczne \u2014 dla firm, kt\u00f3re traktuj\u0105 digital jako przewag\u0119 konkurencyjn\u0105, nie obowi\u0105zek.',
    'packages.p3.i1': 'Wszystko z pakietu Growth',
    'packages.p3.i2': 'Pe\u0142na automatyzacja w ca\u0142ym stacku',
    'packages.p3.i3': 'Integracje na miar\u0119 i zaawansowane workflow AI',
    'packages.p3.i4': 'Roadmapa strategiczna z kwartalnymi review',
    'packages.p3.i5': 'Priorytetowe wsparcie i dedykowany kana\u0142',
    'packages.p3.i6': 'Landing page\u2019e i wsparcie kampanii w retainerze',
    'packages.p3.timeline': 'Typowy czas: 12\u201316 tygodni + retainer',
    'packages.p3.price': 'Od 40\u00a0000 PLN + 5\u00a0000 PLN/msc',

    'packages.select.foundation': 'Foundation',
    'packages.select.growth': 'Growth',
    'packages.select.partner': 'Partner',
    'packages.select.unsure': 'Jeszcze nie wiem',

    'process.eyebrow': 'Proces',
    'process.heading': 'Jak wygl\u0105da projekt',
    'process.st1.desc':
      'Mapujemy, gdzie dzi\u015b uciekaj\u0105 leady i przych\u00f3d \u2014 zanim dotkniemy cho\u0107by jednego piksela. Cele, odbiorcy, konkurencja, obecne luki.',
    'process.st2.desc':
      'Projektujemy pod Tw\u00f3j cykl sprzeda\u017cy \u2014 nie szablon, kt\u00f3ry \u0142adnie wygl\u0105da, ale nie konwertuje. Przemy\u015blana propozycja wizualna i strukturalna, zbudowana dla Twoich cel\u00f3w.',
    'process.st3.desc':
      'Szybko, czysto, z dokumentacj\u0105. Szybciej zaczynasz zarabia\u0107 na inwestycji \u2014 i nigdy nie zastanawiasz si\u0119, co si\u0119 dzieje.',
    'process.st4.desc':
      'Nie znikamy po wdro\u017ceniu. Klienci na retainerze otrzymuj\u0105 ci\u0105g\u0142y rozw\u00f3j, miesi\u0119czne raporty z zapyta\u0144 i konwersji \u2014 oraz zesp\u00f3\u0142, kt\u00f3ry zna ich biznes.',

    'faq.eyebrow': 'FAQ',
    'faq.heading': 'Najcz\u0119stsze pytania',
    'faq.q1': 'Ile trwa projekt?',
    'faq.a1':
      'Foundation to zwykle 6\u20138 tygodni. Growth i Partner wymagaj\u0105 10\u201316 tygodni na start, potem retainer. Konkretny harmonogram dostaniesz na konsultacji.',
    'faq.q2': 'Co obejmuje bezp\u0142atna konsultacja?',
    'faq.a2':
      '30 minut, bez pitchu. Przegl\u0105damy Twoj\u0105 stron\u0119 i lejek, pokazujemy gdzie uciekaj\u0105 leady i przych\u00f3d oraz co trzeba zrobi\u0107 \u2014 z uczciwym zakresem i wide\u0142kami cenowymi.',
    'faq.q3': 'Dla kogo to nie jest?',
    'faq.a3':
      'Dla firm szukaj\u0105cych wy\u0142\u0105cznie najni\u017cszej ceny lub template\u2019u w dwa tygodnie. Najlepiej wsp\u00f3\u0142pracujemy z B2B, kt\u00f3rym zale\u017cy na jako\u015bci zapyta\u0144 i d\u0142ugoterminowych wynikach.',
    'faq.q4': 'Pracujecie poza Polsk\u0105?',
    'faq.a4':
      'Tak. Wi\u0119kszo\u015b\u0107 klient\u00f3w to polskie B2B, ale pracujemy zdalnie z firmami premium w ca\u0142ej UE. Discovery i delivery w pe\u0142ni online.',

    'contact.eyebrow': 'Kontakt',
    'contact.heading': 'Gotowy przesta\u0107 zostawia\u0107 pieni\u0105dze na stole?',
    'contact.body':
      'Um\u00f3w bezp\u0142atn\u0105 30-minutow\u0105 analiz\u0119 przychod\u00f3w. Poka\u017cemy, gdzie rezygnuj\u0105 prospekci, co ogranicza liczb\u0119 zapyta\u0144 i co trzeba zrobi\u0107, \u017ceby to zmieni\u0107 \u2014 z uczciwymi liczbami, nie pitch\u0027em sprzeda\u017cowym.',
    'contact.steps.heading': 'Jak wygl\u0105da rozmowa',
    'contact.steps.s1.title': 'S\u0142uchamy',
    'contact.steps.s1.desc':
      'Tw\u00f3j biznes, cele i jak klienci trafiaj\u0105 do Ciebie dzi\u015b \u2014 rozmowa, nie ankieta.',
    'contact.steps.s2.title': 'Diagnozujemy',
    'contact.steps.s2.desc':
      'Gdzie przecieka lejek, co kosztuje Ci\u0119 zapytania i jakie quick winy s\u0105 mo\u017cliwe przed jakimkolwiek buildem.',
    'contact.steps.s3.title': 'Masz jasno\u015b\u0107',
    'contact.steps.s3.desc':
      'Uczciwy zakres, wide\u0142ki inwestycji i rekomendowany kierunek \u2014 nawet je\u015bli to nie b\u0119dzie z nami.',
    'contact.form.name': 'Imi\u0119 i nazwisko',
    'contact.form.email': 'E-mail',
    'contact.form.company': 'Firma',
    'contact.form.package': 'Interesuj\u0105cy pakiet',
    'contact.form.message': 'Co najbardziej hamuje Twoj\u0105 obecno\u015b\u0107 online?',
    'contact.form.submit': 'Wy\u015blij zapytanie',
    'contact.form.note':
      'Wys\u0142anie otworzy klienta poczty z gotow\u0105 wiadomo\u015bci\u0105. Wolisz napisa\u0107 sam? hello@subsecond.app',
    'contact.form.subject': 'Zapytanie o analiz\u0119 przychod\u00f3w — subsecond.app',
    'contact.cta': 'Um\u00f3w bezp\u0142atn\u0105 analiz\u0119 przychod\u00f3w',
    'contact.calendly': 'Wolisz od razu wybra\u0107 termin?',

    'footer.tagline': 'My budujemy obecno\u015b\u0107.',
  },
};

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'pl';
}

export function getStoredLang(storage: Pick<Storage, 'getItem'> = localStorage): Lang {
  const stored = storage.getItem(STORAGE_KEY);
  return isLang(stored) ? stored : 'en';
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
