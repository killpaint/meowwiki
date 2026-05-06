import React, { useState } from 'react';
import { Search, Code, Moon, Sun, Info, Copy, Rocket, History, Layout, Settings, Cpu, ChevronRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Sub-components ---

const Navbar = ({ toggleDarkMode, isDarkMode }: { toggleDarkMode: () => void, isDarkMode: boolean }) => (
  <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white dark:bg-[#0d1117] border-b border-outline-variant dark:border-slate-800 transition-all">
    <div className="flex items-center gap-8">
      <a className="text-xl font-bold text-primary dark:text-blue-400" href="#">TechnicalDocs</a>
      <nav className="hidden lg:flex items-center gap-6">
        <a className="text-primary dark:text-blue-400 font-bold border-b-2 border-primary dark:border-blue-400 h-16 flex items-center px-1" href="#">Docs</a>
        <a className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors h-16 flex items-center" href="#">API</a>
        <a className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors h-16 flex items-center" href="#">Showcase</a>
        <a className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors h-16 flex items-center" href="#">Resources</a>
      </nav>
    </div>

    <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
      <div className="hidden lg:flex items-center bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-1.5 text-on-surface-variant dark:text-slate-400 cursor-pointer hover:bg-surface-container-high transition-colors">
        <Search size={18} className="mr-2" />
        <span className="text-sm opacity-70">Search docs... (Ctrl+K)</span>
      </div>
      <button className="lg:hidden p-2 text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors">
        <Search size={20} />
      </button>
      <button className="p-2 text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors">
        <Code size={20} />
      </button>
      <button 
        onClick={toggleDarkMode}
        className="p-2 text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <button className="lg:hidden p-2 text-on-surface-variant dark:text-slate-400">
        <Menu size={20} />
      </button>
    </div>
  </header>
);

const Sidebar = () => {
  const navItems = [
    { name: 'Introduction', icon: Info, active: false },
    { name: 'Getting Started', icon: Rocket, active: true },
    { name: 'Core Concepts', icon: Layout, active: false },
    { name: 'Advanced Guides', icon: Cpu, active: false },
    { name: 'Deployment', icon: Settings, active: false },
  ];

  return (
    <aside className="hidden lg:block fixed left-0 top-16 w-[280px] h-[calc(100vh-64px)] overflow-y-auto py-4 bg-surface-container-low dark:bg-[#0d1117] border-r border-outline-variant dark:border-slate-800 z-40 pb-24">
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-primary dark:text-blue-400 mb-1">Documentation</h3>
        <p className="text-xs text-on-surface-variant dark:text-slate-400">v2.4.0</p>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              item.active
                ? 'bg-primary-container/20 dark:bg-blue-400/10 text-primary dark:text-blue-400 border-l-4 border-primary font-bold'
                : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800'
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </a>
        ))}
      </nav>
      <div className="mt-8 px-6">
        <button className="w-full py-2 px-4 bg-surface-container-highest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-surface-variant transition-colors">
          View Changelog
        </button>
      </div>
    </aside>
  );
};

const CodeBlock = ({ title, code }: { title: string, code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-surface-container-low dark:bg-[#0d1117] rounded-lg mb-8 overflow-hidden border border-outline-variant dark:border-slate-800 group">
      <div className="flex justify-between items-center px-4 py-2 bg-surface-container-high dark:bg-[#161b22] border-b border-outline-variant dark:border-slate-800">
        <span className="font-mono text-xs text-on-surface-variant dark:text-[#a1a7b3] uppercase tracking-wider">Terminal</span>
        <button 
          onClick={copyToClipboard}
          className="text-on-surface-variant dark:text-[#a1a7b3] hover:text-primary dark:hover:text-white transition-colors p-1 rounded hover:bg-surface-container-highest dark:hover:bg-slate-700"
          title="Copy code"
        >
          {copied ? <span className="text-[10px] uppercase font-bold text-green-500">Copied!</span> : <Copy size={14} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="font-mono text-sm leading-relaxed text-on-surface dark:text-[#e0e3e6]">
          {code}
        </code>
      </pre>
    </div>
  );
};

const Admonition = ({ children, title, type = 'info' }: { children: React.ReactNode, title: string, type?: 'info' | 'warning' | 'success' }) => {
  return (
    <div className="bg-primary-container/10 dark:bg-blue-400/10 rounded-lg border-l-4 border-primary dark:border-blue-400 p-4 mb-8 flex gap-3">
      <Info size={20} className="text-primary dark:text-blue-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-bold text-primary dark:text-blue-400 mb-1">{title}</p>
        <div className="text-sm text-on-surface-variant dark:text-slate-300 opacity-90">
          {children}
        </div>
      </div>
    </div>
  );
};

const TOC = () => (
  <aside className="hidden lg:block w-[200px] shrink-0 ml-8">
    <div className="sticky top-24 pl-4 border-l border-outline-variant dark:border-slate-800">
      <h4 className="text-[11px] font-bold text-on-surface dark:text-slate-200 mb-3 uppercase tracking-widest opacity-70">On this page</h4>
      <ul className="flex flex-col gap-2">
        {['Prerequisites', 'Installation', 'Hello World Example'].map((item) => (
          <li key={item}>
            <a 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors block"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

// --- Main App ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Sidebar />

      <div className="pt-16 lg:pl-[280px] min-h-screen flex flex-col">
        <div className="flex-1 w-full max-w-[1240px] mx-auto px-8 py-10 flex relative pb-28">
          
          <main className="flex-1 w-full lg:max-w-[calc(100%-240px)] pb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-on-surface dark:text-white mb-4">Getting Started</h1>
              <p className="text-lg text-on-surface-variant dark:text-slate-300 mb-8 leading-relaxed">
                Welcome to the Vben Admin documentation. This guide will walk you through the prerequisites, installation process, and help you get your first admin dashboard up and running quickly.
              </p>

              <div className="mb-10 rounded-xl overflow-hidden border border-outline-variant dark:border-slate-700 shadow-sm">
                <img 
                  alt="Architecture Diagram" 
                  className="w-full h-auto object-cover" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uj473ucbarEd5-cOxDoOC3VMKqQX95yIfu2Uu2S-AuRNPN9iWmaORfcrcdaesHrxlEjhFFqsfowi-Ng_O1YxJanjqDENiDXn359Oc8EAZp7JYIVLt1NSH9PJPpzzUFn-81eBQ9IVUika-2cQnGnKqVjynFsqTFoxE02dSbUmOv7QCKSsw3Vu25V4WYIUTf0s_44neprlZNLB8P5hz2w3CONx3ZnPlRoLwLFllS4WiFmG4LguFSJCrCToS8Ndu9rWJRStk_UY8rynw"
                  referrerPolicy="no-referrer"
                />
              </div>

              <section id="prerequisites">
                <h2 className="text-2xl font-bold text-on-surface dark:text-white mb-6 border-b border-surface-container-highest dark:border-slate-800 pb-2">Prerequisites</h2>
                <Admonition title="Environment Requirements">
                  Ensure you have Node.js version 18.0.0 or higher installed. We strongly recommend using pnpm for the best development experience, though npm and yarn are fully supported.
                </Admonition>
              </section>

              <section id="installation" className="mt-12">
                <h2 className="text-2xl font-bold text-on-surface dark:text-white mb-6 border-b border-surface-container-highest dark:border-slate-800 pb-2">Installation</h2>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 mb-6 font-normal leading-relaxed">
                  Begin by scaffolding your project using our dedicated CLI tool. This will set up the foundational directory structure and base configurations.
                </p>
                <CodeBlock 
                  title="Terminal" 
                  code={`# Using npm\nnpm create vben-admin@latest my-project\n\n# Using yarn\nyarn create vben-admin@latest my-project\n\n# Using pnpm (Recommended)\npnpm create vben-admin@latest my-project`} 
                />
                
                <p className="text-lg text-on-surface-variant dark:text-slate-300 mb-6 leading-relaxed">
                  Once the scaffolding is complete, navigate into your new project directory and install the required dependencies.
                </p>
                <CodeBlock 
                  title="Terminal" 
                  code={`cd my-project\npnpm install`} 
                />
              </section>

              <section id="hello-world" className="mt-12">
                <h2 className="text-2xl font-bold text-on-surface dark:text-white mb-6 border-b border-surface-container-highest dark:border-slate-800 pb-2">Hello World Example</h2>
                <p className="text-lg text-on-surface-variant dark:text-slate-300 mb-6 leading-relaxed">
                  To verify your installation, start the local development server. This will compile the assets and open the default dashboard in your primary browser.
                </p>
                <CodeBlock 
                  title="Terminal" 
                  code={`# Start development server\npnpm dev\n\n# Open your browser at http://localhost:3000`} 
                />

                <div className="mb-10 rounded-xl overflow-hidden border border-outline-variant dark:border-slate-700 shadow-xl dark:shadow-none bg-surface-container-lowest dark:bg-slate-900">
                  <div className="bg-surface-container-low dark:bg-[#161b22] px-4 py-2 border-b border-outline-variant dark:border-slate-800 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    <span className="ml-4 font-mono text-[11px] text-on-surface-variant dark:text-slate-400">localhost:3000</span>
                  </div>
                  <img 
                    alt="Dashboard Preview" 
                    className="w-full h-auto object-cover opacity-95 dark:opacity-80 transition-opacity" 
                    src="https://lh3.googleusercontent.com/aida/ADBb0ugmwYobiP37DqPJI-kRRNWYt_VSf9QEFNtx6s7FI4Nw8NHDKS0PN7Drm3vKgHNaTSPomVDt7pQMqD203H8PJE5NT7mWIUT18kbKsdpURADdT1V4VeN35sI_RFEI3PQRGETmaU2OMmJ84KC7aTB9SiV5Ws_19TJ3LiwkqYk2EB4EKzr9c4tXo7gZlrhkaW6KLPRtgX7inwn3sRN5mc9Z90se-pG-mWKw2fXT57R4I_Z92o3VRc7zV97GUUmlYqC24W05dO5muipV7w"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </section>
            </motion.div>
          </main>

          <TOC />
        </div>

        <footer className="fixed bottom-0 left-0 lg:left-[280px] w-full lg:w-[calc(100%-280px)] bg-white dark:bg-[#0d1117] border-t border-outline-variant dark:border-slate-800 py-4 z-40 transition-all">
          <div className="max-w-[1240px] mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="text-sm text-on-surface-variant dark:text-slate-400 text-center sm:text-left">
              © 2024 TechnicalDocs. Built with precision and passion.
            </div>
            <div className="flex gap-6 mt-2 sm:mt-0">
              <a className="text-xs text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-xs text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
              <a className="text-xs text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors" href="#">Security</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
