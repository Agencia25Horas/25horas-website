/**
 * i18n PT/EN — dicionário flat por chave + helpers para conteúdo
 * específico de nicho (label, tagline) e items de serviço.
 */

export type Lang = "pt" | "en";

export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  pt: {
    // Header
    "header.sobre": "Sobre",
    "header.portfolio": "Portefolio",
    "header.contactos": "Contactos",
    "header.orcamento": "Pedir orçamento",

    // Cookie banner
    "cookie.text":
      "Usamos armazenamento essencial para o site funcionar e, com a tua autorização, estatísticas anónimas de visitas. Não vendemos dados.",
    "cookie.close": "Fechar",
    "cookie.aceitar": "Aceitar",
    "cookie.rejeitar": "Rejeitar não-essenciais",
    "cookie.saberMais": "Saber mais",

    // Chrome
    "chrome.som": "SOM",

    // Footer
    "footer.copyright": "Copyright © 2026 • 25 Horas Agency • NIF 517 769 034",
    "footer.privacidade": "Política de Privacidade",
    "footer.cookies": "Cookies",
    "footer.livro": "Livro de Reclamações",

    // Common
    "common.verMais": "Ver mais →",
    "common.verTudo": "Ver tudo →",
    "common.verPortfolio": "Ver portfolio →",
    "common.pedirOrcamento": "Pedir orçamento →",
    "common.emBreve": "Em breve",
    "common.proximoPasso": "Próximo passo",
    "common.anterior": "← Anterior",
    "common.seguinte": "Seguinte →",
    "common.todosNichos": "← Todos os nichos",
    "common.verPortfolioCompleto": "Ver portfolio completo de",
    "common.voltar": "← Voltar",
    "common.continuar": "Continuar →",
    "common.enviarPedido": "Enviar pedido →",

    // Categories
    "cat.video": "Vídeo",
    "cat.fotografia": "Fotografia",
    "cat.design": "Design",
    "cat.gestao": "Gestão de Redes Sociais",

    // Home — hero
    "home.hero.title.l1": "AS HISTÓRIAS",
    "home.hero.title.l2": "SÃO DAS MARCAS.",
    "home.hero.title.l3": "AS IMAGENS SÃO NOSSAS.",

    // /servicos (índice)
    "servicos.eyebrow": "08 Nichos",
    "servicos.title": "Onde fazemos magia.",
    "servicos.subtitle":
      "Oito sectores, um vocabulário cinematográfico. Carrega num para ver o que fazemos em cada.",

    // /servicos/[nicho] (deep)
    "nichoPage.oQueFazemos": "O que fazemos",
    "nichoPage.para": "Para",
    "nichoPage.alinharCalendario": "Vamos alinhar calendário e orçamento.",

    // /sobre
    "sobre.eyebrow": "25 Horas Agency",
    "sobre.title": "Cinema para marcas.",
    "sobre.subtitle":
      "Não fazemos vídeos. Fazemos filmes para marcas. 25 frames por segundo, 25 horas por dia.",
    "sobre.quemSomos": "Quem somos",
    "sobre.quemSomosTitle": "Equipa pequena.\nAutoria clara.",
    "sobre.quemSomosBody":
      "Trabalhamos do briefing ao corte final. Vídeo, fotografia, design e gestão de redes — em registo cinematográfico. Lisboa, para marcas portuguesas que precisam de ser vistas em qualquer canal, em qualquer escala.",
    "sobre.comoTrabalhamos": "Como trabalhamos",
    "sobre.comoTrabalhamosTitle": "Do briefing\nao corte final.",
    "sobre.comoTrabalhamosBody":
      "Conhecemos o cliente, o produto, a equipa e o sítio antes de pegar na câmara. Cada projecto tem um realizador responsável. Direcção de fotografia, som, edição e colorização pensados em conjunto e sempre afinados.",
    "sobre.sectoresEyebrow": "Os 8 sectores em que trabalhamos",
    "sobre.sectoresTitle": "As nossas sub-marcas.",

    // /contactos
    "contactos.eyebrow": "Contactos",
    "contactos.title": "Vamos\nfalar.",
    "contactos.subtitle":
      "Diz olá. Para pedidos de orçamento, usa o formulário — respondemos em 24h em PT ou EN.",
    "contactos.emailLabel": "Email",
    "contactos.telefoneLabel": "Telefone",
    "contactos.telefoneNota": "Chamada para a rede móvel nacional.",
    "contactos.localizacaoLabel": "Localização",
    "contactos.localizacaoValue": "Lisboa,\nPortugal",
    "contactos.redesLabel": "Redes sociais",
    "contactos.projectoEmMente": "Projecto em mente?",
    "contactos.faz": "Faz o pedido de orçamento.",
    "contactos.quatroPerguntas": "Quatro perguntas, resposta em 24h.",

    // /orcamento
    "orcamento.eyebrow": "Pedir orçamento",
    "orcamento.title": "Quatro perguntas.\nResposta em 24h.",
    "orcamento.subtitle":
      "Diz-nos o nicho, o entregável e o prazo. Respondemos em PT ou EN no prazo de um dia útil.",
    "orcamento.form.title": "Pedir orçamento",
    "orcamento.form.passo": "Passo",
    "orcamento.form.de": "de",
    "orcamento.form.q1": "Qual o nicho do teu projecto?",
    "orcamento.form.q2": "Que tipo de entregável?",
    "orcamento.form.q3": "Em que prazo?",
    "orcamento.form.q4": "Como vos contactamos?",
    "orcamento.form.nome": "Nome",
    "orcamento.form.email": "Email",
    "orcamento.form.telefone": "Telefone",
    "orcamento.form.empresa": "Empresa",
    "orcamento.form.opcional": "opcional",
    "orcamento.confirm.eyebrow": "Pedido enviado",
    "orcamento.confirm.title": "Obrigado.",
    "orcamento.confirm.body":
      "Vamos rever o pedido e responder em 24h, em português ou inglês.",
    "orcamento.confirm.urgente": "Para algo urgente:",
    "orcamento.form.deliverable.video": "VÍDEO INSTITUCIONAL",
    "orcamento.form.deliverable.reels": "REELS / TIKTOK",
    "orcamento.form.deliverable.foto": "FOTOGRAFIA",
    "orcamento.form.deliverable.design": "DESIGN GRÁFICO",
    "orcamento.form.deliverable.redes": "GESTÃO DE REDES",
    "orcamento.form.deliverable.outro": "OUTRO",
    "orcamento.form.timeline.short": "< 1 mês",
    "orcamento.form.timeline.mid": "1 — 3 meses",
    "orcamento.form.timeline.long": "> 3 meses",

    // /portfolio (índice)
    "portfolio.eyebrow": "Portefolio",
    "portfolio.title": "Trabalhos por nicho.",
    "portfolio.subtitle":
      "Selecção de filmes, campanhas e fotografia. Cada nicho tem a sua secção — para ver tudo de um, abre a página dedicada.",
    "portfolio.emConstrucao": "Em construção",
    "portfolio.brevemente": "Brevemente, os trabalhos de",
    "portfolio.preparar":
      "Estamos a preparar a galeria. Volta em breve ou contacta-nos para ver casos relevantes para o teu projecto.",
  },

  en: {
    // Header
    "header.sobre": "About",
    "header.portfolio": "Portfolio",
    "header.contactos": "Contact",
    "header.orcamento": "Get a quote",

    "cookie.text":
      "We use essential storage to run the site and, with your consent, anonymous visit analytics. We don't sell data.",
    "cookie.close": "Close",
    "cookie.aceitar": "Accept",
    "cookie.rejeitar": "Reject non-essential",
    "cookie.saberMais": "Learn more",

    "chrome.som": "SOUND",

    "footer.copyright": "Copyright © 2026 • 25 Horas Agency • NIF 517 769 034",
    "footer.privacidade": "Privacy Policy",
    "footer.cookies": "Cookies",
    "footer.livro": "Complaints Book",

    "common.verMais": "See more →",
    "common.verTudo": "See all →",
    "common.verPortfolio": "See portfolio →",
    "common.pedirOrcamento": "Get a quote →",
    "common.emBreve": "Coming soon",
    "common.proximoPasso": "Next step",
    "common.anterior": "← Previous",
    "common.seguinte": "Next →",
    "common.todosNichos": "← All sectors",
    "common.verPortfolioCompleto": "View full portfolio of",
    "common.voltar": "← Back",
    "common.continuar": "Continue →",
    "common.enviarPedido": "Send request →",

    "cat.video": "Video",
    "cat.fotografia": "Photography",
    "cat.design": "Design",
    "cat.gestao": "Social Media Management",

    "home.hero.title.l1": "THE STORIES",
    "home.hero.title.l2": "BELONG TO THE BRANDS.",
    "home.hero.title.l3": "THE IMAGES ARE OURS.",

    "servicos.eyebrow": "08 Sectors",
    "servicos.title": "Where we make magic.",
    "servicos.subtitle":
      "Eight sectors, one cinematic vocabulary. Click one to see what we do for each.",

    "nichoPage.oQueFazemos": "What we do",
    "nichoPage.para": "For",
    "nichoPage.alinharCalendario": "Let's align timeline and budget.",

    "sobre.eyebrow": "25 Horas Agency",
    "sobre.title": "Cinema for brands.",
    "sobre.subtitle":
      "We don't make videos. We make films for brands. 25 frames per second, 25 hours a day.",
    "sobre.quemSomos": "Who we are",
    "sobre.quemSomosTitle": "Small team.\nClear authorship.",
    "sobre.quemSomosBody":
      "We work from briefing to final cut. Video, photography, design and social media — in cinematic register. Lisbon, for Portuguese brands that need to be seen on any channel, at any scale.",
    "sobre.comoTrabalhamos": "How we work",
    "sobre.comoTrabalhamosTitle": "From briefing\nto final cut.",
    "sobre.comoTrabalhamosBody":
      "We get to know the client, product, team and location before we pick up the camera. Each project has a dedicated director. Cinematography, sound, edit and colour grading are all thought through together and always tuned in.",
    "sobre.sectoresEyebrow": "The 8 sectors we work in",
    "sobre.sectoresTitle": "Our sub-brands.",

    "contactos.eyebrow": "Contact",
    "contactos.title": "Let's\ntalk.",
    "contactos.subtitle":
      "Say hello. For quotes, use the form — we reply within 24h in PT or EN.",
    "contactos.emailLabel": "Email",
    "contactos.telefoneLabel": "Phone",
    "contactos.telefoneNota": "Call to the national mobile network.",
    "contactos.localizacaoLabel": "Location",
    "contactos.localizacaoValue": "Lisbon,\nPortugal",
    "contactos.redesLabel": "Social",
    "contactos.projectoEmMente": "Got a project in mind?",
    "contactos.faz": "Get a quote.",
    "contactos.quatroPerguntas": "Four questions, reply in 24h.",

    "orcamento.eyebrow": "Get a quote",
    "orcamento.title": "Four questions.\nReply within 24h.",
    "orcamento.subtitle":
      "Tell us the sector, the deliverable and the timeline. We respond in PT or EN within one business day.",
    "orcamento.form.title": "Get a quote",
    "orcamento.form.passo": "Step",
    "orcamento.form.de": "of",
    "orcamento.form.q1": "What sector is your project in?",
    "orcamento.form.q2": "What type of deliverable?",
    "orcamento.form.q3": "What's the timeline?",
    "orcamento.form.q4": "How do we reach you?",
    "orcamento.form.nome": "Name",
    "orcamento.form.email": "Email",
    "orcamento.form.telefone": "Phone",
    "orcamento.form.empresa": "Company",
    "orcamento.form.opcional": "optional",
    "orcamento.confirm.eyebrow": "Request sent",
    "orcamento.confirm.title": "Thank you.",
    "orcamento.confirm.body":
      "We'll review your request and reply within 24h, in Portuguese or English.",
    "orcamento.confirm.urgente": "If urgent:",
    "orcamento.form.deliverable.video": "INSTITUTIONAL VIDEO",
    "orcamento.form.deliverable.reels": "REELS / TIKTOK",
    "orcamento.form.deliverable.foto": "PHOTOGRAPHY",
    "orcamento.form.deliverable.design": "GRAPHIC DESIGN",
    "orcamento.form.deliverable.redes": "SOCIAL MEDIA",
    "orcamento.form.deliverable.outro": "OTHER",
    "orcamento.form.timeline.short": "< 1 month",
    "orcamento.form.timeline.mid": "1 — 3 months",
    "orcamento.form.timeline.long": "> 3 months",

    "portfolio.eyebrow": "Portfolio",
    "portfolio.title": "Work by sector.",
    "portfolio.subtitle":
      "A selection of films, campaigns and photography. Each sector has its section — to see everything from one, open the dedicated page.",
    "portfolio.emConstrucao": "Under construction",
    "portfolio.brevemente": "Coming soon, work for",
    "portfolio.preparar":
      "We're putting the gallery together. Come back soon or contact us to see relevant cases for your project.",
  },
};

/** Labels + taglines de cada nicho (chave = slug em PT). */
export const NICHE_CONTENT: Record<
  Lang,
  Record<string, { label: string; tagline: string }>
> = {
  pt: {
    restaurantes: {
      label: "RESTAURANTES",
      tagline: "Pratos, ambiente e equipa — em forma de cinema.",
    },
    desporto: {
      label: "DESPORTO",
      tagline: "Highlights, hype videos e fotografia de jogo.",
    },
    "real-estate": {
      label: "REAL ESTATE",
      tagline: "Tours imobiliários, drone cinematic, walkthroughs.",
    },
    travel: {
      label: "TRAVEL",
      tagline: "Hotéis, destinos e lifestyle em loop cinematográfico.",
    },
    corporate: {
      label: "CORPORATE",
      tagline: "Institucional, podcast, eventos e recrutamento.",
    },
    saude: {
      label: "FAMÍLIA",
      tagline: "Pais, filhos e momentos — em forma de cinema.",
    },
    "saude-bem-estar": {
      label: "SAÚDE",
      tagline: "Clínicas, profissionais e procedimentos — em registo de confiança.",
    },
    educacao: {
      label: "EDUCAÇÃO",
      tagline: "Escolas, formadores e conhecimento — em forma de cinema.",
    },
  },
  en: {
    restaurantes: {
      label: "RESTAURANTS",
      tagline: "Dishes, atmosphere and team — in cinema form.",
    },
    desporto: {
      label: "SPORTS",
      tagline: "Highlights, hype videos and game photography.",
    },
    "real-estate": {
      label: "REAL ESTATE",
      tagline: "Property tours, cinematic drone, walkthroughs.",
    },
    travel: {
      label: "TRAVEL",
      tagline: "Hotels, destinations and lifestyle in cinematic loop.",
    },
    corporate: {
      label: "CORPORATE",
      tagline: "Institutional, podcast, events and recruitment.",
    },
    saude: {
      label: "FAMILY",
      tagline: "Parents, children and moments — in cinema form.",
    },
    "saude-bem-estar": {
      label: "HEALTH",
      tagline: "Clinics, professionals and procedures — in tone of trust.",
    },
    educacao: {
      label: "EDUCATION",
      tagline: "Schools, educators and knowledge — in cinema form.",
    },
  },
};

/** Service items translation map — PT key → EN value. */
export const SERVICE_ITEMS_EN: Record<string, string> = {
  // Restaurantes
  "Reels gastronómicos": "Gastronomic reels",
  "Highlights restaurante": "Restaurant highlights",
  "Vídeos pratos premium": "Premium dish videos",
  "Behind the scenes": "Behind the scenes",
  "Chef videos": "Chef videos",
  "Eventos": "Events",
  "TikTok vertical": "TikTok vertical",
  "Drone cinematic": "Cinematic drone",
  "UGC style content": "UGC-style content",
  "Gastronómica": "Gastronomic",
  "Cocktails": "Cocktails",
  "Ambiente": "Atmosphere",
  "Staff": "Staff",
  "Branding": "Branding",
  "Menu": "Menu",
  "Lifestyle": "Lifestyle",
  "Menus": "Menus",
  "Stories": "Stories",
  "Campanhas": "Campaigns",
  "Promoções": "Promotions",
  "Visual": "Visual identity",
  // Desporto
  "Jogos completos": "Full matches",
  "Entrevistas": "Interviews",
  "Hype videos": "Hype videos",
  "Bastidores": "Behind the scenes",
  "Drone": "Drone",
  "Atletas": "Athletes",
  "Equipa": "Team",
  "Treino": "Training",
  "Media day": "Media day",
  "Matchday": "Matchday",
  "Resultados": "Results",
  "Escalações": "Lineups",
  // Real Estate
  "Tours imobiliários": "Property tours",
  "Walkthrough": "Walkthrough",
  "Reels": "Reels",
  "Showcase": "Showcase",
  "Interior": "Interior",
  "Exterior": "Exterior",
  "Arquitetura": "Architecture",
  "Flyers": "Flyers",
  "Cards": "Cards",
  // Travel
  "Cinematic": "Cinematic",
  "Hotel reels": "Hotel reels",
  "Destination": "Destination",
  "Hotel": "Hotel",
  "Paisagem": "Landscape",
  "Experiência": "Experience",
  // Corporate
  "Institucional": "Institutional",
  "Podcast": "Podcast",
  "Recrutamento": "Recruitment",
  "Portraits": "Portraits",
  "Office": "Office",
  // Família
  "Família": "Family",
  "Reels familiares": "Family reels",
  "Eventos familiares": "Family events",
  "Memórias": "Memories",
  "Crianças": "Children",
  "Casais": "Couples",
  "Retratos": "Portraits",
  // Saúde e Bem Estar
  "Procedimentos": "Procedures",
  "Reels informativos": "Informational reels",
  "Branding clínico": "Clinical branding",
  "Testemunhos": "Testimonials",
  "Equipa clínica": "Clinical team",
  "Espaço": "Space",
  "Retratos profissionais": "Professional portraits",
  // Gestão de Redes
  "Planeamento mensal": "Monthly planning",
  "Copywriting": "Copywriting",
  "Agendamento": "Scheduling",
  "Instagram": "Instagram",
  "Facebook": "Facebook",
  "TikTok": "TikTok",
  "15 posts": "15 posts",
  "60 stories": "60 stories",
  // Auditoria — items que estavam a faltar no mapping EN
  "Atleta": "Athlete",
  "Branding clinic": "Clinic branding",
  "Branding visual": "Visual branding",
  "Campanhas jogadores": "Player campaigns",
  "Cinematic travel": "Cinematic travel",
  "Corporate portraits": "Corporate portraits",
  "Destination promo": "Destination promo",
  "Drone estádio": "Stadium drone",
  "Fotografia gastronómica": "Gastronomic photography",
  "Highlights": "Highlights",
  "Jogo": "Match",
  "Lifestyle clínico": "Clinic lifestyle",
  "Lifestyle travel": "Travel lifestyle",
  "Luxury walkthrough": "Luxury walkthrough",
  "Motion graphics": "Motion graphics",
  "Office lifestyle": "Office lifestyle",
  "Posts": "Posts",
  "Property cards": "Property cards",
  "Property showcase": "Property showcase",
  "Retratos de família": "Family portraits",
  "Social campaigns": "Social campaigns",
  "TikTok sports": "TikTok sports",
  "Vertical reels": "Vertical reels",
};
