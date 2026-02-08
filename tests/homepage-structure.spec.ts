import { test, expect } from '@playwright/test';

test.describe('Homepage Structure & Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ── Page Metadata ──

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('IsaacPCodes - Software Developer & Systems Builder');
  });

  test('has meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      'Isaac Pehrson - Building clean, scalable software systems. Full-stack development, cloud architecture, and system design.'
    );
  });

  test('has favicon linked', async ({ page }) => {
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', 'favicon.svg');
  });

  test('html element has lang attribute', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  // ── Header & Navigation ──

  test('header contains logo with alt text', async ({ page }) => {
    const logo = page.locator('header .logo');
    await expect(logo).toBeAttached();
    await expect(logo).toHaveAttribute('alt', 'IsaacPCodes');
  });

  test('navigation has 6 links with correct text', async ({ page }) => {
    const navLinks = page.locator('.nav-menu li');
    await expect(navLinks).toHaveCount(6);

    const expectedLinks = ['Projects', 'About', 'Skills', 'Contact', 'Blog', 'Web Tools'];
    for (let i = 0; i < expectedLinks.length; i++) {
      await expect(navLinks.nth(i)).toContainText(expectedLinks[i]);
    }
  });

  test('navigation links have correct hrefs', async ({ page }) => {
    const expectedHrefs: Record<string, string> = {
      Projects: '#projects',
      About: '#about',
      Skills: '#skills',
      Contact: '#contact',
      Blog: './blog/index.html',
      'Web Tools': './web-tools/index.html',
    };

    for (const [text, href] of Object.entries(expectedHrefs)) {
      const link = page.locator(`.nav-menu a:has-text("${text}")`).first();
      await expect(link).toHaveAttribute('href', href);
    }
  });

  test('menu toggle has aria-label', async ({ page }) => {
    const menuToggle = page.locator('#menu-toggle');
    await expect(menuToggle).toHaveAttribute('aria-label', 'Toggle navigation menu');
  });

  // ── Hero Section ──

  test('hero section contains wordmark image', async ({ page }) => {
    const wordmark = page.locator('.hero-wordmark');
    await expect(wordmark).toBeAttached();
    await expect(wordmark).toHaveAttribute('alt', 'IsaacPCodes');
  });

  test('hero section contains subtitle text', async ({ page }) => {
    const subtitle = page.locator('.hero-subtitle');
    await expect(subtitle).toContainText(
      'Building clean, scalable software systems with a focus on thoughtful design and reliable architecture.'
    );
  });

  test('hero has two CTA buttons with correct hrefs', async ({ page }) => {
    const viewProjects = page.locator('.cta-buttons a:has-text("View Projects")');
    await expect(viewProjects).toHaveAttribute('href', '#projects');

    const getInTouch = page.locator('.cta-buttons a:has-text("Get In Touch")');
    await expect(getInTouch).toHaveAttribute('href', '#contact');
  });

  // ── About Section ──

  test('about section exists with correct heading', async ({ page }) => {
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeAttached();

    const heading = aboutSection.locator('.section-title');
    await expect(heading).toHaveText('About');
  });

  test('about section has 3 paragraphs', async ({ page }) => {
    const paragraphs = page.locator('.about-content p');
    await expect(paragraphs).toHaveCount(3);
  });

  test('about section contains key content', async ({ page }) => {
    const aboutContent = page.locator('.about-content');
    await expect(aboutContent).toContainText('Isaac Pehrson');
    await expect(aboutContent).toContainText('software developer');
  });

  // ── Projects Section ──

  test('projects section exists with correct heading', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeAttached();

    const heading = projectsSection.locator('.section-title');
    await expect(heading).toHaveText('Projects');
  });

  test('projects section has exactly 4 project cards', async ({ page }) => {
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(4);
  });

  test('project cards have correct titles', async ({ page }) => {
    const expectedTitles = [
      'Copy Selected Tabs URLs',
      'Business Readout Assistant',
      'Bazaar',
      'Sk8',
    ];

    const titles = page.locator('.project-title');
    await expect(titles).toHaveCount(4);

    for (let i = 0; i < expectedTitles.length; i++) {
      await expect(titles.nth(i)).toHaveText(expectedTitles[i]);
    }
  });

  test('each project card has a description', async ({ page }) => {
    const descriptions = page.locator('.project-description');
    await expect(descriptions).toHaveCount(4);

    for (let i = 0; i < 4; i++) {
      const text = await descriptions.nth(i).textContent();
      expect(text!.trim().length).toBeGreaterThan(0);
    }
  });

  test('each project card has tags', async ({ page }) => {
    const cards = page.locator('.project-card');
    for (let i = 0; i < 4; i++) {
      const tags = cards.nth(i).locator('.tag');
      const count = await tags.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('each project card has at least one link', async ({ page }) => {
    const cards = page.locator('.project-card');
    for (let i = 0; i < 4; i++) {
      const links = cards.nth(i).locator('.project-links a');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  // ── Skills Section ──

  test('skills section exists with correct heading', async ({ page }) => {
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeAttached();

    const heading = skillsSection.locator('.section-title');
    await expect(heading).toHaveText('Skills & Tooling');
  });

  test('skills section has 4 categories', async ({ page }) => {
    const categories = page.locator('.skill-category');
    await expect(categories).toHaveCount(4);
  });

  test('skill categories have correct headings', async ({ page }) => {
    const expectedHeadings = ['Frontend', 'Backend', 'Cloud & DevOps', 'Tooling'];
    const headings = page.locator('.skill-category h3');
    await expect(headings).toHaveCount(4);

    for (let i = 0; i < expectedHeadings.length; i++) {
      await expect(headings.nth(i)).toHaveText(expectedHeadings[i]);
    }
  });

  test('each skill category has 5 items', async ({ page }) => {
    const categories = page.locator('.skill-category');
    for (let i = 0; i < 4; i++) {
      const items = categories.nth(i).locator('.skill-list li');
      await expect(items).toHaveCount(5);
    }
  });

  // ── Contact Section ──

  test('contact section exists with correct heading', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeAttached();

    const heading = contactSection.locator('.section-title');
    await expect(heading).toHaveText('Get In Touch');
  });

  test('contact section has email link', async ({ page }) => {
    const emailLink = page.locator('.contact-email');
    await expect(emailLink).toHaveText('isaacpcodes@gmail.com');
    await expect(emailLink).toHaveAttribute('href', 'mailto:isaacpcodes@gmail.com');
  });

  test('contact section has 3 social links', async ({ page }) => {
    const links = page.locator('.contact-links a');
    await expect(links).toHaveCount(3);

    const expectedTexts = ['GitHub', 'LinkedIn', 'Blog'];
    for (let i = 0; i < expectedTexts.length; i++) {
      await expect(links.nth(i)).toHaveText(expectedTexts[i]);
    }
  });

  // ── Footer ──

  test('footer contains copyright text', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toContainText('© 2025 IsaacPCodes. Built with care.');
  });

  test('footer has 3 links', async ({ page }) => {
    const footerLinks = page.locator('.footer-links a');
    await expect(footerLinks).toHaveCount(3);

    await expect(footerLinks.nth(0)).toHaveText('Support');
    await expect(footerLinks.nth(1)).toHaveText('Privacy Policy');
    await expect(footerLinks.nth(2)).toHaveText('Web Tools');
  });

  test('footer has WakaTime badge', async ({ page }) => {
    const badge = page.locator('.footer-badge img');
    await expect(badge).toBeAttached();
    await expect(badge).toHaveAttribute('alt', 'Total time coded since Feb 28 2019');
  });

  // ── Accessibility Basics ──

  test('all external links have rel="noopener"', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(externalLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });

  test('logo link has aria-label', async ({ page }) => {
    const logoLink = page.locator('.logo-link');
    await expect(logoLink).toHaveAttribute('aria-label', 'IsaacPCodes Home');
  });
});
