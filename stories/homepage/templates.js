const navLinks = [
  { text: 'Projects', href: '#projects', className: 'nav-link' },
  { text: 'About', href: '#about', className: 'nav-link' },
  { text: 'Skills', href: '#skills', className: 'nav-link' },
  { text: 'Contact', href: '#contact', className: 'nav-link' },
  { text: 'Blog', href: './blog/index.html' },
  { text: 'Web Tools', href: './web-tools/index.html' },
];

const projects = [
  {
    title: 'Copy Selected Tabs URLs',
    description:
      'A Chrome extension that copies URLs from selected tabs in one click, streamlining tab management and sharing.',
    tags: ['Chrome Extension', 'JavaScript', 'Browser APIs'],
    links: [
      {
        label: 'Chrome Web Store →',
        href: 'https://chromewebstore.google.com/detail/copy-selected-tabs-urls/eoibojgifhgghnidcpapddnfbpgbdnkd',
      },
    ],
  },
  {
    title: 'Business Readout Assistant',
    description:
      'A Single Page Application built at eBay to automate internal reporting workflows, saving agents 10-15 minutes per report through intelligent automation.',
    tags: ['React.js', 'ES6', 'Axios', 'XLSX', 'Bootstrap', 'PHP'],
    links: [
      { label: 'View Live →', href: 'https://izzlenizzle.github.io/ReadoutAssistant/' },
      { label: 'Source Code →', href: 'https://github.com/IzzleNizzle/ReadoutAssistant' },
    ],
  },
  {
    title: 'Bazaar',
    description:
      'A collaborative trading platform that enables bartering and goods exchange without cash, bringing communities together through peer-to-peer commerce.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Mongoose'],
    links: [
      { label: 'View Live →', href: 'https://stark-tundra-37570.herokuapp.com/' },
      { label: 'Source Code →', href: 'https://github.com/IzzleNizzle/bazaar' },
    ],
  },
  {
    title: 'Sk8',
    description:
      'A mobile-first social platform for skaters to discover and share tricks with their local community, featuring geolocation-based content and interactive mapping.',
    tags: ['MySQL', 'Node.js', 'Express', 'Google Maps API', 'Geolocation'],
    links: [
      { label: 'View Live →', href: 'https://stark-savannah-69359.herokuapp.com/' },
      { label: 'Source Code →', href: 'https://github.com/IzzleNizzle/SK8' },
    ],
  },
];

const skills = [
  {
    title: 'Frontend',
    items: [
      'React.js & Modern JavaScript (ES6+)',
      'HTML5 & CSS3',
      'Responsive Design & Mobile-First',
      'UI/UX Best Practices',
      'Bootstrap & Modern CSS Frameworks',
    ],
  },
  {
    title: 'Backend',
    items: [
      'Node.js & Express',
      'RESTful API Design',
      'MongoDB & Mongoose',
      'MySQL & SQL Databases',
      'PHP & Server-Side Logic',
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      'Git & GitHub Workflows',
      'Heroku Deployment',
      'CI/CD Pipelines',
      'Cloud Infrastructure',
      'System Architecture',
    ],
  },
  {
    title: 'Tooling',
    items: [
      'VS Code & Development Tools',
      'npm & Package Management',
      'Webpack & Build Tools',
      'API Testing & Debugging',
      'Version Control & Collaboration',
    ],
  },
];

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/IzzleNizzle', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/isaac-p/', external: true },
  { label: 'Blog', href: './blog/index.html', external: false },
];

const footerLinks = [
  { label: 'Support', href: 'support.html' },
  { label: 'Privacy Policy', href: 'privacy.html' },
  { label: 'Web Tools', href: './web-tools/index.html' },
];

const renderNavLinks = () =>
  navLinks
    .map((link) => {
      const classAttr = link.className ? ` class="${link.className}"` : '';
      return `<li><a href="${link.href}"${classAttr}>${link.text}</a></li>`;
    })
    .join('');

export const renderHeaderNav = ({ menuOpen = false } = {}) => `
  <header>
    <div class="container">
      <nav>
        <a href="#" aria-label="IsaacPCodes Home" class="logo-link">
          <img src="assets/isaacpcodes-wordmark.svg" alt="IsaacPCodes" class="logo">
        </a>

        <input
          type="checkbox"
          id="menu-toggle"
          class="menu-toggle"
          aria-label="Toggle navigation menu"
          ${menuOpen ? 'checked' : ''}
        >
        <label for="menu-toggle" class="menu-icon" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <ul class="nav-menu">
          ${renderNavLinks()}
        </ul>
      </nav>
    </div>
  </header>
`;

export const renderHero = () => `
  <section class="hero">
    <div class="container">
      <img src="assets/isaacpcodes-wordmark-framed.svg" alt="IsaacPCodes" class="hero-wordmark">
      <p class="hero-subtitle">
        Building clean, scalable software systems with a focus on thoughtful design and reliable architecture.
      </p>
      <div class="cta-buttons">
        <a href="#projects" class="btn btn-primary">View Projects</a>
        <a href="#contact" class="btn btn-secondary">Get In Touch</a>
      </div>
    </div>
  </section>
`;

export const renderAbout = () => `
  <section id="about" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">About</h2>
      </div>
      <div class="about-content">
        <p>
          I'm Isaac Pehrson, a software developer passionate about building systems that work well and make sense.
          I believe in clean code, thoughtful architecture, and technology that serves real human needs.
        </p>
        <p>
          My work spans the full stack—from crafting intuitive frontend experiences to designing robust backend systems and cloud infrastructure.
          I approach each project with a systems-thinking mindset, always considering how pieces fit together and how to build for scale and maintainability.
        </p>
        <p>
          When I'm not coding, you'll find me tinkering with new technologies, exploring the outdoors, or diving deep into how things work.
          I'm constantly learning and always excited to tackle new challenges.
        </p>
      </div>
    </div>
  </section>
`;

export const renderProjects = () => `
  <section id="projects" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Projects</h2>
      </div>
      <div class="projects-grid">
        ${projects
          .map(
            (project) => `
          <article class="project-card">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
              ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
              ${project.links
                .map(
                  (link) =>
                    `<a href="${link.href}" target="_blank" rel="noopener">${link.label}</a>`
                )
                .join('')}
            </div>
          </article>
        `
          )
          .join('')}
      </div>
    </div>
  </section>
`;

export const renderSkills = () => `
  <section id="skills" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Skills & Tooling</h2>
      </div>
      <div class="skills-grid">
        ${skills
          .map(
            (category) => `
          <div class="skill-category">
            <h3>${category.title}</h3>
            <ul class="skill-list">
              ${category.items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>
`;

export const renderContact = () => `
  <section id="contact" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Get In Touch</h2>
      </div>
      <div class="contact-content">
        <p class="text-muted">
          I'm always interested in hearing about new projects and opportunities.
          Whether you have a question or just want to say hello, feel free to reach out.
        </p>
        <a href="mailto:isaacpcodes@gmail.com" class="contact-email">isaacpcodes@gmail.com</a>
        <div class="contact-links">
          ${contactLinks
            .map((link) => {
              const externalAttrs = link.external ? ' target="_blank" rel="noopener"' : '';
              return `<a href="${link.href}"${externalAttrs}>${link.label}</a>`;
            })
            .join('')}
        </div>
      </div>
    </div>
  </section>
`;

export const renderFooter = () => `
  <footer>
    <div class="container">
      <div class="footer-content">
        <p>&copy; 2025 IsaacPCodes. Built with care.</p>
        <div class="footer-links">
          ${footerLinks.map((link) => `<a href="${link.href}">${link.label}</a>`).join('')}
        </div>
        <div class="footer-badge">
          <a href="https://wakatime.com/@32870911-52df-4de0-abe7-3ed3cf8fb97d">
            <img
              src="https://wakatime.com/badge/user/32870911-52df-4de0-abe7-3ed3cf8fb97d.svg"
              alt="Total time coded since Feb 28 2019"
            />
          </a>
          <a
            class="footer-badge-link"
            href="https://wakatime.com/a-look-back-at-2025/32870911-52df-4de0-abe7-3ed3cf8fb97d/tvylwxgfsz"
            target="_blank"
            rel="noopener"
          >
            WakaTime 2025 recap
          </a>
        </div>
      </div>
    </div>
  </footer>
`;

export const renderFullPage = ({ menuOpen = false } = {}) => `
  ${renderHeaderNav({ menuOpen })}
  <main>
    ${renderHero()}
    ${renderAbout()}
    ${renderProjects()}
    ${renderSkills()}
    ${renderContact()}
  </main>
  ${renderFooter()}
`;
