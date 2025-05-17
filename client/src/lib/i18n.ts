import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const en = {
  meta: {
    title: "L-VS | Portfolio",
    description: "L-VS's portfolio showcasing creative web and mobile development projects."
  },
  navigation: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    admin: "Admin"
  },
  hero: {
    title: "Creative Developer<br>Building Modern Experiences",
    subtitle: "Crafting innovative digital solutions with clean design and powerful functionality.",
    cta: "View my work",
    secondary_cta: "Get in touch"
  },
  projects: {
    title: "Projects",
    subtitle: "A selection of my recent work across various domains and technologies.",
    view_details: "View Details",
    view_all: "View all projects",
    filters: {
      all: "All",
      web: "Web",
      mobile: "Mobile",
      design: "Design"
    },
    overview: "Overview",
    challenges: "Challenges",
    solutions: "Solutions",
    visit_site: "Visit Website",
    empty: "No projects found. Check back soon!"
  },
  about: {
    title: "About Me",
    paragraph1: "I'm a developer and designer focused on creating elegant, functional, and user-centered digital experiences. With expertise in both front-end and back-end technologies, I bring a holistic approach to every project.",
    paragraph2: "My passion lies in the intersection of design and technology — creating solutions that are not only visually appealing but also technically robust and accessible to all users.",
    paragraph3: "When I'm not coding or designing, you might find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through articles and community events.",
    skills_title: "Skills & Expertise",
    skills: {
      frontend: "Frontend Development",
      backend: "Backend Development",
      mobile: "Mobile Development",
      design: "UI/UX Design",
      database: "Database Architecture",
      cloud: "Cloud Services"
    },
    download_cv: "Download CV"
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Have a project in mind or want to collaborate? I'd love to hear from you.",
    info_title: "Contact Information",
    email: "Email",
    location: "Location",
    availability: "Availability",
    availability_status: "Available for freelance projects",
    follow: "Follow Me",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      submit: "Send Message",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again."
    }
  },
  footer: {
    tagline: "Crafting digital experiences with precision and creativity.",
    navigation: "Navigation",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy",
    connect: "Connect",
    copyright: "© 2023 L-VS. All rights reserved.",
    made_with: "Made with"
  },
  admin: {
    dashboard: "Dashboard",
    projects_link: "Manage Projects",
    messages_link: "Messages",
    settings: "Settings",
    logout: "Logout",
    welcome: "Welcome to the Admin Dashboard",
    stats: {
      title: "Stats Overview",
      projects_count: "Total Projects",
      messages_count: "Unread Messages"
    },
    project_management: {
      title: "Projects",
      add: "Add Project",
      edit: "Edit Project",
      delete: "Delete Project",
      confirm_delete: "Are you sure you want to delete this project?",
      form: {
        title: "Title",
        description: "Description",
        category: "Category",
        image_url: "Image URL",
        technologies: "Technologies (comma-separated)",
        challenges: "Challenges (comma-separated)",
        solutions: "Solutions (comma-separated)",
        project_url: "Project URL",
        featured: "Featured",
        submit: "Save Project",
        cancel: "Cancel"
      }
    },
    message_management: {
      title: "Contact Messages",
      mark_read: "Mark as Read",
      delete: "Delete",
      no_messages: "No messages yet",
      confirm_delete: "Are you sure you want to delete this message?",
      sent_by: "Sent by",
      on_date: "on"
    }
  },
  loader: {
    loading: "Loading..."
  },
  error: {
    title: "Error",
    back_home: "Back to Home"
  },
  accessibility: {
    toggle_menu: "Toggle accessibility options",
    colorblind_mode: "Colorblind Mode",
    high_contrast: "High Contrast",
    dyslexic_font: "Dyslexic-friendly Font",
    normal_mode: "Normal Mode"
  }
};

// French translations
const fr = {
  meta: {
    title: "L-VS | Portfolio",
    description: "Portfolio de L-VS présentant des projets de développement web et mobile créatifs."
  },
  navigation: {
    home: "Accueil",
    projects: "Projets",
    about: "À propos",
    contact: "Contact",
    admin: "Admin"
  },
  hero: {
    title: "Développeur Créatif<br>Construisant des Expériences Modernes",
    subtitle: "Création de solutions numériques innovantes avec un design épuré et des fonctionnalités puissantes.",
    cta: "Voir mes travaux",
    secondary_cta: "Me contacter"
  },
  projects: {
    title: "Projets",
    subtitle: "Une sélection de mes travaux récents dans divers domaines et technologies.",
    view_details: "Voir les détails",
    view_all: "Voir tous les projets",
    filters: {
      all: "Tous",
      web: "Web",
      mobile: "Mobile",
      design: "Design"
    },
    overview: "Aperçu",
    challenges: "Défis",
    solutions: "Solutions",
    visit_site: "Visiter le site",
    empty: "Aucun projet trouvé. Revenez bientôt!"
  },
  about: {
    title: "À Propos de Moi",
    paragraph1: "Je suis un développeur et designer qui se concentre sur la création d'expériences numériques élégantes, fonctionnelles et centrées sur l'utilisateur. Avec une expertise dans les technologies front-end et back-end, j'apporte une approche holistique à chaque projet.",
    paragraph2: "Ma passion se situe à l'intersection du design et de la technologie — créant des solutions qui sont non seulement visuellement attrayantes mais aussi techniquement robustes et accessibles à tous les utilisateurs.",
    paragraph3: "Quand je ne code pas ou ne conçois pas, vous pourriez me trouver en train d'explorer de nouvelles technologies, de contribuer à des projets open-source, ou de partager mes connaissances à travers des articles et des événements communautaires.",
    skills_title: "Compétences & Expertise",
    skills: {
      frontend: "Développement Frontend",
      backend: "Développement Backend",
      mobile: "Développement Mobile",
      design: "Design UI/UX",
      database: "Architecture de Base de Données",
      cloud: "Services Cloud"
    },
    download_cv: "Télécharger CV"
  },
  contact: {
    title: "Prendre Contact",
    subtitle: "Vous avez un projet en tête ou vous souhaitez collaborer ? J'aimerais vous entendre.",
    info_title: "Informations de Contact",
    email: "Email",
    location: "Emplacement",
    availability: "Disponibilité",
    availability_status: "Disponible pour des projets freelance",
    follow: "Me Suivre",
    form: {
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      submit: "Envoyer le Message",
      success: "Message envoyé avec succès!",
      error: "Échec de l'envoi du message. Veuillez réessayer."
    }
  },
  footer: {
    tagline: "Création d'expériences numériques avec précision et créativité.",
    navigation: "Navigation",
    legal: "Légal",
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation",
    cookies: "Politique de Cookies",
    connect: "Connexion",
    copyright: "© 2023 L-VS. Tous droits réservés.",
    made_with: "Fait avec"
  },
  admin: {
    dashboard: "Tableau de Bord",
    projects_link: "Gérer les Projets",
    messages_link: "Messages",
    settings: "Paramètres",
    logout: "Déconnexion",
    welcome: "Bienvenue sur le Tableau de Bord",
    stats: {
      title: "Aperçu des Statistiques",
      projects_count: "Total des Projets",
      messages_count: "Messages Non Lus"
    },
    project_management: {
      title: "Projets",
      add: "Ajouter un Projet",
      edit: "Modifier le Projet",
      delete: "Supprimer le Projet",
      confirm_delete: "Êtes-vous sûr de vouloir supprimer ce projet?",
      form: {
        title: "Titre",
        description: "Description",
        category: "Catégorie",
        image_url: "URL de l'Image",
        technologies: "Technologies (séparées par des virgules)",
        challenges: "Défis (séparés par des virgules)",
        solutions: "Solutions (séparées par des virgules)",
        project_url: "URL du Projet",
        featured: "En Vedette",
        submit: "Sauvegarder le Projet",
        cancel: "Annuler"
      }
    },
    message_management: {
      title: "Messages de Contact",
      mark_read: "Marquer comme Lu",
      delete: "Supprimer",
      no_messages: "Pas encore de messages",
      confirm_delete: "Êtes-vous sûr de vouloir supprimer ce message?",
      sent_by: "Envoyé par",
      on_date: "le"
    }
  },
  loader: {
    loading: "Chargement..."
  },
  error: {
    title: "Erreur",
    back_home: "Retour à l'Accueil"
  },
  accessibility: {
    toggle_menu: "Options d'accessibilité",
    colorblind_mode: "Mode Daltonien",
    high_contrast: "Contraste Élevé",
    dyslexic_font: "Police pour Dyslexiques",
    normal_mode: "Mode Normal"
  }
};

// Spanish translations
const es = {
  meta: {
    title: "L-VS | Portfolio",
    description: "Portfolio de L-VS mostrando proyectos creativos de desarrollo web y móvil."
  },
  navigation: {
    home: "Inicio",
    projects: "Proyectos",
    about: "Sobre Mí",
    contact: "Contacto",
    admin: "Admin"
  },
  hero: {
    title: "Desarrollador Creativo<br>Construyendo Experiencias Modernas",
    subtitle: "Creación de soluciones digitales innovadoras con diseño limpio y funcionalidad potente.",
    cta: "Ver mi trabajo",
    secondary_cta: "Contáctame"
  },
  projects: {
    title: "Proyectos",
    subtitle: "Una selección de mis trabajos recientes en diversos dominios y tecnologías.",
    view_details: "Ver detalles",
    view_all: "Ver todos los proyectos",
    filters: {
      all: "Todos",
      web: "Web",
      mobile: "Móvil",
      design: "Diseño"
    },
    overview: "Resumen",
    challenges: "Desafíos",
    solutions: "Soluciones",
    visit_site: "Visitar sitio web",
    empty: "No se encontraron proyectos. ¡Vuelve pronto!"
  },
  about: {
    title: "Sobre Mí",
    paragraph1: "Soy un desarrollador y diseñador enfocado en crear experiencias digitales elegantes, funcionales y centradas en el usuario. Con experiencia en tecnologías front-end y back-end, aporto un enfoque holístico a cada proyecto.",
    paragraph2: "Mi pasión radica en la intersección del diseño y la tecnología: crear soluciones que no solo sean visualmente atractivas sino también técnicamente robustas y accesibles para todos los usuarios.",
    paragraph3: "Cuando no estoy programando o diseñando, puedes encontrarme explorando nuevas tecnologías, contribuyendo a proyectos de código abierto o compartiendo mis conocimientos a través de artículos y eventos comunitarios.",
    skills_title: "Habilidades y Experiencia",
    skills: {
      frontend: "Desarrollo Frontend",
      backend: "Desarrollo Backend",
      mobile: "Desarrollo Móvil",
      design: "Diseño UI/UX",
      database: "Arquitectura de Bases de Datos",
      cloud: "Servicios en la Nube"
    },
    download_cv: "Descargar CV"
  },
  contact: {
    title: "Ponte en Contacto",
    subtitle: "¿Tienes un proyecto en mente o quieres colaborar? Me encantaría saber de ti.",
    info_title: "Información de Contacto",
    email: "Email",
    location: "Ubicación",
    availability: "Disponibilidad",
    availability_status: "Disponible para proyectos freelance",
    follow: "Sígueme",
    form: {
      name: "Nombre",
      email: "Email",
      subject: "Asunto",
      message: "Mensaje",
      submit: "Enviar Mensaje",
      success: "¡Mensaje enviado con éxito!",
      error: "Error al enviar el mensaje. Por favor, inténtalo de nuevo."
    }
  },
  footer: {
    tagline: "Creando experiencias digitales con precisión y creatividad.",
    navigation: "Navegación",
    legal: "Legal",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    cookies: "Política de Cookies",
    connect: "Conectar",
    copyright: "© 2023 L-VS. Todos los derechos reservados.",
    made_with: "Hecho con"
  },
  admin: {
    dashboard: "Panel de Control",
    projects_link: "Gestionar Proyectos",
    messages_link: "Mensajes",
    settings: "Configuración",
    logout: "Cerrar Sesión",
    welcome: "Bienvenido al Panel de Administración",
    stats: {
      title: "Resumen de Estadísticas",
      projects_count: "Total de Proyectos",
      messages_count: "Mensajes no Leídos"
    },
    project_management: {
      title: "Proyectos",
      add: "Añadir Proyecto",
      edit: "Editar Proyecto",
      delete: "Eliminar Proyecto",
      confirm_delete: "¿Estás seguro de que deseas eliminar este proyecto?",
      form: {
        title: "Título",
        description: "Descripción",
        category: "Categoría",
        image_url: "URL de la Imagen",
        technologies: "Tecnologías (separadas por comas)",
        challenges: "Desafíos (separados por comas)",
        solutions: "Soluciones (separadas por comas)",
        project_url: "URL del Proyecto",
        featured: "Destacado",
        submit: "Guardar Proyecto",
        cancel: "Cancelar"
      }
    },
    message_management: {
      title: "Mensajes de Contacto",
      mark_read: "Marcar como Leído",
      delete: "Eliminar",
      no_messages: "Aún no hay mensajes",
      confirm_delete: "¿Estás seguro de que deseas eliminar este mensaje?",
      sent_by: "Enviado por",
      on_date: "el"
    }
  },
  loader: {
    loading: "Cargando..."
  },
  error: {
    title: "Error",
    back_home: "Volver al Inicio"
  },
  accessibility: {
    toggle_menu: "Opciones de accesibilidad",
    colorblind_mode: "Modo para Daltónicos",
    high_contrast: "Alto Contraste",
    dyslexic_font: "Fuente para Disléxicos",
    normal_mode: "Modo Normal"
  }
};

// German translations
const de = {
  meta: {
    title: "L-VS | Portfolio",
    description: "L-VS Portfolio mit kreativen Web- und Mobile-Entwicklungsprojekten."
  },
  navigation: {
    home: "Startseite",
    projects: "Projekte",
    about: "Über Mich",
    contact: "Kontakt",
    admin: "Admin"
  },
  hero: {
    title: "Kreativer Entwickler<br>Der moderne Erlebnisse schafft",
    subtitle: "Entwicklung innovativer digitaler Lösungen mit klarem Design und leistungsstarker Funktionalität.",
    cta: "Meine Arbeit ansehen",
    secondary_cta: "Kontakt aufnehmen"
  },
  projects: {
    title: "Projekte",
    subtitle: "Eine Auswahl meiner jüngsten Arbeiten in verschiedenen Bereichen und Technologien.",
    view_details: "Details anzeigen",
    view_all: "Alle Projekte anzeigen",
    filters: {
      all: "Alle",
      web: "Web",
      mobile: "Mobile",
      design: "Design"
    },
    overview: "Überblick",
    challenges: "Herausforderungen",
    solutions: "Lösungen",
    visit_site: "Website besuchen",
    empty: "Keine Projekte gefunden. Schauen Sie bald wieder vorbei!"
  },
  about: {
    title: "Über Mich",
    paragraph1: "Ich bin ein Entwickler und Designer, der sich auf die Erstellung eleganter, funktionaler und benutzerzentrierter digitaler Erlebnisse konzentriert. Mit Expertise in Front-End- und Back-End-Technologien bringe ich einen ganzheitlichen Ansatz in jedes Projekt ein.",
    paragraph2: "Meine Leidenschaft liegt an der Schnittstelle von Design und Technologie - ich schaffe Lösungen, die nicht nur visuell ansprechend, sondern auch technisch robust und für alle Benutzer zugänglich sind.",
    paragraph3: "Wenn ich nicht programmiere oder designe, findet man mich vielleicht beim Erkunden neuer Technologien, beim Beitragen zu Open-Source-Projekten oder beim Teilen meines Wissens durch Artikel und Community-Events.",
    skills_title: "Fähigkeiten & Expertise",
    skills: {
      frontend: "Frontend-Entwicklung",
      backend: "Backend-Entwicklung",
      mobile: "Mobile-Entwicklung",
      design: "UI/UX-Design",
      database: "Datenbankarchitektur",
      cloud: "Cloud-Dienste"
    },
    download_cv: "Lebenslauf herunterladen"
  },
  contact: {
    title: "Kontakt aufnehmen",
    subtitle: "Haben Sie ein Projekt im Sinn oder möchten Sie zusammenarbeiten? Ich würde gerne von Ihnen hören.",
    info_title: "Kontaktinformationen",
    email: "E-Mail",
    location: "Standort",
    availability: "Verfügbarkeit",
    availability_status: "Verfügbar für Freelance-Projekte",
    follow: "Folgen Sie mir",
    form: {
      name: "Name",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      submit: "Nachricht senden",
      success: "Nachricht erfolgreich gesendet!",
      error: "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut."
    }
  },
  footer: {
    tagline: "Digitale Erlebnisse mit Präzision und Kreativität gestalten.",
    navigation: "Navigation",
    legal: "Rechtliches",
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
    cookies: "Cookie-Richtlinie",
    connect: "Verbinden",
    copyright: "© 2023 L-VS. Alle Rechte vorbehalten.",
    made_with: "Erstellt mit"
  },
  admin: {
    dashboard: "Dashboard",
    projects_link: "Projekte verwalten",
    messages_link: "Nachrichten",
    settings: "Einstellungen",
    logout: "Abmelden",
    welcome: "Willkommen im Admin-Dashboard",
    stats: {
      title: "Statistik-Übersicht",
      projects_count: "Projekte insgesamt",
      messages_count: "Ungelesene Nachrichten"
    },
    project_management: {
      title: "Projekte",
      add: "Projekt hinzufügen",
      edit: "Projekt bearbeiten",
      delete: "Projekt löschen",
      confirm_delete: "Sind Sie sicher, dass Sie dieses Projekt löschen möchten?",
      form: {
        title: "Titel",
        description: "Beschreibung",
        category: "Kategorie",
        image_url: "Bild-URL",
        technologies: "Technologien (durch Kommas getrennt)",
        challenges: "Herausforderungen (durch Kommas getrennt)",
        solutions: "Lösungen (durch Kommas getrennt)",
        project_url: "Projekt-URL",
        featured: "Hervorgehoben",
        submit: "Projekt speichern",
        cancel: "Abbrechen"
      }
    },
    message_management: {
      title: "Kontaktnachrichten",
      mark_read: "Als gelesen markieren",
      delete: "Löschen",
      no_messages: "Noch keine Nachrichten",
      confirm_delete: "Sind Sie sicher, dass Sie diese Nachricht löschen möchten?",
      sent_by: "Gesendet von",
      on_date: "am"
    }
  },
  loader: {
    loading: "Wird geladen..."
  },
  error: {
    title: "Fehler",
    back_home: "Zurück zur Startseite"
  },
  accessibility: {
    toggle_menu: "Barrierefreiheit-Optionen",
    colorblind_mode: "Farbenblind-Modus",
    high_contrast: "Hoher Kontrast",
    dyslexic_font: "Dyslexie-freundliche Schrift",
    normal_mode: "Normaler Modus"
  }
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
      es: {
        translation: es,
      },
      de: {
        translation: de,
      },
    },
  });

export default i18next;