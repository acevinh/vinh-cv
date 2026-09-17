import Aurora from './components/Aurora';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import WorkingWithAI from './components/WorkingWithAI';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { UI } from './content';
import { t, useLang } from './hooks/useLang';
import { useTheme } from './hooks/useTheme';
import { useReveal } from './hooks/useReveal';
import { useSpecular } from './hooks/useSpecular';

export default function App() {
  const { lang, setLang } = useLang();
  const { theme, toggle } = useTheme();

  useReveal();
  useSpecular();

  return (
    <>
      <a className="skip-link" href="#main">
        {t(UI.skipToContent, lang)}
      </a>

      <Aurora />
      <div className="grain" aria-hidden="true" />

      <div className="shell">
        <Nav lang={lang} setLang={setLang} theme={theme} toggleTheme={toggle} />

        {/* `tabIndex={-1}` is what makes the skip link work: without it the
            fragment navigation moves the URL but not `document.activeElement`,
            so the next Tab restarts at the top of the document. The landmark is
            not an interactive control, so it never paints a ring. */}
        <main id="main" tabIndex={-1}>
          <Hero lang={lang} />
          <About lang={lang} />
          <Experience lang={lang} />
          <Skills lang={lang} />
          <Projects lang={lang} />
          <WorkingWithAI lang={lang} />
          <Certifications lang={lang} />
          <Contact lang={lang} />
        </main>

        <Footer lang={lang} />
      </div>
    </>
  );
}
