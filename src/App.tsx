/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Mail, Instagram, Github, Linkedin, Twitter, Monitor, Folder, Globe, Star, ChevronRight, AlertCircle } from 'lucide-react';

// ─── tiny Win2000 helpers ──────────────────────────────────────────────────

function TitleBar({ title, icon, onClose, onMin, onMax }: { title: string; icon?: React.ReactNode; onClose?: () => void; onMin?: () => void; onMax?: () => void; }) {
  return (
    <div className="win-titlebar select-none">
      <div className="flex items-center gap-1 flex-1 min-w-0">
        {icon && <span className="text-[12px] flex-shrink-0">{icon}</span>}
        <span className="truncate font-bold text-[11px]">{title}</span>
      </div>
      <div className="flex gap-[2px] flex-shrink-0">
        <button className="win-titlebar-btn" title="Minimize" onClick={onMin}>_</button>
        <button className="win-titlebar-btn" title="Maximize" onClick={onMax}>□</button>
        <button className="win-titlebar-btn" title="Close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

function WinWindow({ title, icon, children, className = '', style = {} }: { title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string; style?: React.CSSProperties; }) {
  const [minimized, setMinimized] = useState(false);
  return (
    <div className={`win-window flex flex-col ${className}`} style={style}>
      <TitleBar title={title} icon={icon} onMin={() => setMinimized(m => !m)} onMax={() => {}} onClose={() => {}} />
      {!minimized && <div className="flex-1 flex flex-col">{children}</div>}
    </div>
  );
}

function MenuBar({ items }: { items: { label: string; active?: boolean }[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="win-menubar">
      {items.map(item => (
        <button
          key={item.label}
          className={`win-menu-item${active === item.label || item.active ? ' active' : ''}`}
          onMouseDown={() => setActive(item.label)}
          onMouseLeave={() => setActive(null)}
          onMouseUp={() => setActive(null)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function ToolBar() {
  return (
    <div className="win-toolbar text-[10px]">
      <button className="win-toolbar-btn">
        <span>◀</span><span className="hidden sm:inline">Back</span>
      </button>
      <button className="win-toolbar-btn">
        <span>▶</span><span className="hidden sm:inline">Forward</span>
      </button>
      <button className="win-toolbar-btn">
        <span>🔄</span><span className="hidden sm:inline">Refresh</span>
      </button>
      <button className="win-toolbar-btn">
        <span>🏠</span><span className="hidden sm:inline">Home</span>
      </button>
      <div className="win-toolbar-separator" />
      <button className="win-toolbar-btn">
        <span>⭐</span><span className="hidden sm:inline">Favorites</span>
      </button>
      <button className="win-toolbar-btn">
        <span>📜</span><span className="hidden sm:inline">History</span>
      </button>
      <div className="win-toolbar-separator" />
      <span className="text-[10px] mr-1">Address:</span>
      <div className="win-inset flex-1 flex items-center px-1 min-w-0">
        <span className="text-[10px] text-blue-800 truncate">http://mennmaestro.com/</span>
      </div>
      <button className="win-btn ml-1 min-w-0 px-2">Go</button>
    </div>
  );
}

// ─── sections ──────────────────────────────────────────────────────────────

function HeroSection({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section id="hero" className="p-4 flex flex-col gap-4">
      {/* Welcome dialog */}
      <WinWindow title="Welcome to MENN Maestro — Digital Product Creator" icon={<Monitor size={12} />}>
        <MenuBar items={[
          { label: 'File' }, { label: 'Edit' }, { label: 'View' },
          { label: 'Favorites' }, { label: 'Tools' }, { label: 'Help' },
        ]} />
        <div className="p-4 flex flex-col md:flex-row gap-4 items-start">
          {/* Icon + tagline */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-16 h-16 win-inset flex items-center justify-center">
              <Monitor size={40} className="text-blue-900" />
            </div>
            <span className="text-[10px] text-center w-20">MENN Maestro</span>
          </div>
          {/* Main copy */}
          <div className="flex-1 win-inset p-3 min-h-[120px]">
            <p className="text-[11px] mb-2 font-bold">MENN Maestro — Digital Product Designer</p>
            <p className="text-[11px] leading-relaxed mb-2">
              Creating digital products that turn ideas into results.<br />
              Simple, functional, <em>meaningful.</em>
            </p>
            <div className="win-progress-track mt-3 w-48">
              <div className="win-progress-fill w-3/4" />
            </div>
            <p className="text-[10px] mt-1 text-gray-600">Loading portfolio... 75%</p>
          </div>
        </div>
        <div className="p-3 border-t border-gray-400 flex flex-wrap gap-2 justify-end">
          <button className="win-btn-default win-btn" onClick={() => onNav('work')}>View Work</button>
          <button className="win-btn" onClick={() => onNav('about')}>The Vision</button>
          <button className="win-btn" onClick={() => onNav('contact')}>Contact</button>
        </div>
      </WinWindow>

      {/* Desktop icons row */}
      <div className="flex flex-wrap gap-6 px-2 py-2">
        {[
          { label: 'My Work', icon: <Folder size={32} className="text-yellow-600" />, section: 'work' },
          { label: 'About Me', icon: <Globe size={32} className="text-blue-700" />, section: 'about' },
          { label: 'Contact', icon: <Mail size={32} className="text-blue-900" />, section: 'contact' },
          { label: 'Favorites', icon: <Star size={32} className="text-yellow-500" />, section: 'work' },
        ].map(item => (
          <button
            key={item.label}
            className="flex flex-col items-center gap-1 group cursor-default"
            onDoubleClick={() => onNav(item.section)}
          >
            <div className="group-hover:[filter:invert(30%)_sepia(1)_saturate(5)_hue-rotate(195deg)] group-focus:[filter:invert(30%)_sepia(1)_saturate(5)_hue-rotate(195deg)]">
              {item.icon}
            </div>
            <span className="text-[10px] px-0.5 group-hover:bg-blue-900 group-hover:text-white group-focus:bg-blue-900 group-focus:text-white text-center leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* IE-style marquee news ticker */}
      <div className="win-inset px-2 py-1 flex items-center gap-2">
        <span className="text-[10px] font-bold text-blue-900 flex-shrink-0">📰 NEWS:</span>
        <div className="win-marquee flex-1 text-[10px]">
          <span className="win-marquee-inner">
            MENN Maestro aged 13 launches new digital product suite &nbsp;•&nbsp;
            Portfolio updated with latest projects &nbsp;•&nbsp;
            Available for new collaborations &nbsp;•&nbsp;
            Dream car target: BMW M5 F90 &nbsp;•&nbsp;
            Built with passion, purpose and precision &nbsp;•&nbsp;
          </span>
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  const pillars = [
    {
      title: "Digital Product Creator",
      desc: "At just 13, MENN Maestro is already building and selling digital products that provide real value. From idea to execution, each product is practical, functional, and designed to make a tangible impact.",
      img: "/Digital Product Creator.png",
      tag: "Creation",
      bytes: "348 KB",
    },
    {
      title: "Vision & Ambition",
      desc: "Driven by curiosity and big goals, MENN approaches every project with focus and purpose. Aspirations like the precision of a BMW M5 F90 serve as inspiration for everything he creates.",
      img: "/Vision & Ambition.png",
      tag: "Mindset",
      bytes: "512 KB",
    },
    {
      title: "Authentic Early Experience",
      desc: "Starting young gives MENN a rare advantage: hands-on experience in digital creation, problem-solving, and entrepreneurship. This early exposure is building a foundation for long-term success.",
      img: "/Authentic Early Experience .png",
      tag: "Advantage",
      bytes: "290 KB",
    },
  ];

  return (
    <section id="work" className="p-4 flex flex-col gap-4">
      <WinWindow title="My Work — File Explorer" icon={<Folder size={12} />}>
        <MenuBar items={[
          { label: 'File' }, { label: 'Edit' }, { label: 'View' }, { label: 'Favorites' }, { label: 'Help' },
        ]} />
        {/* Explorer toolbar */}
        <div className="win-toolbar text-[10px] gap-1">
          <span className="text-[10px] px-1">Views:</span>
          <button className="win-toolbar-btn text-[10px]">🏛 Large Icons</button>
          <button className="win-toolbar-btn text-[10px]">📋 Details</button>
          <div className="win-toolbar-separator" />
          <span className="text-[10px] text-blue-800 font-bold">My Work (3 items)</span>
        </div>
        <div className="flex flex-col md:flex-row gap-0">
          {/* Left panel */}
          <div className="win-inset w-full md:w-40 p-2 text-[10px] flex-shrink-0">
            <p className="font-bold mb-2 text-[10px]">File and Folder Tasks</p>
            <div className="flex flex-col gap-1">
              <button className="win-link text-left flex items-center gap-1"><ChevronRight size={10} />Make a new folder</button>
              <button className="win-link text-left flex items-center gap-1"><ChevronRight size={10} />Share this folder</button>
            </div>
            <hr className="border-gray-400 my-2" />
            <p className="font-bold mb-1 text-[10px]">Other Places</p>
            <div className="flex flex-col gap-1">
              <button className="win-link text-left flex items-center gap-1"><ChevronRight size={10} />My Documents</button>
              <button className="win-link text-left flex items-center gap-1"><ChevronRight size={10} />My Computer</button>
            </div>
            <hr className="border-gray-400 my-2" />
            <p className="font-bold mb-1 text-[10px]">Details</p>
            <p className="text-[9px] text-gray-600">My Work<br />3 items</p>
          </div>
          {/* File list */}
          <div className="flex-1 p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pillars.map((pillar, i) => (
                <div key={i} className="win-window flex flex-col">
                  <div className="win-inset overflow-hidden" style={{ height: 140 }}>
                    <img
                      src={pillar.img}
                      alt={pillar.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold leading-tight">{pillar.title}</span>
                      <span className="text-[9px] text-gray-500">{pillar.bytes}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wide text-blue-800 font-bold">[{pillar.tag}]</span>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="p-2 border-t border-gray-400 flex gap-1 justify-end">
                    <button className="win-btn text-[10px] min-w-0 px-2">Open</button>
                    <button className="win-btn text-[10px] min-w-0 px-2">Properties</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="win-statusbar text-[10px]">
          <div className="win-status-panel">3 objects</div>
          <div className="win-status-panel flex-1">1.15 MB total</div>
          <div className="win-status-panel">🌐 Internet</div>
        </div>
      </WinWindow>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="p-4 flex flex-col gap-4">
      <WinWindow title="About MENN Maestro — Properties" icon={<AlertCircle size={12} />}>
        <div className="p-4 flex flex-col md:flex-row gap-4">
          {/* Left: image */}
          <div className="flex flex-col gap-2 items-center flex-shrink-0">
            <div className="win-inset overflow-hidden" style={{ width: 180, height: 180 }}>
              <img src="/Vision & Ambition.png" alt="Vision" className="w-full h-full object-cover" />
            </div>
            <div className="win-group w-full" style={{ width: 180 }}>
              <div
                className="text-[9px] font-bold bg-win-bg absolute -top-2 px-1 leading-none"
                style={{ top: -6, left: 8, position: 'absolute', background: '#d4d0c8', fontSize: 9 }}
              >
                System Info
              </div>
              <div className="flex flex-col gap-0.5 text-[10px]">
                <div className="flex justify-between"><span className="text-gray-600">Name:</span><span className="font-bold">MENN Maestro</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Age:</span><span>13</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Type:</span><span>Designer</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Status:</span><span className="text-green-700 font-bold">Active</span></div>
              </div>
            </div>
          </div>
          {/* Right: tabs */}
          <div className="flex-1 flex flex-col">
            <div className="flex gap-0 border-b border-gray-400">
              {['General', 'Details', 'Security'].map((tab, i) => (
                <div
                  key={tab}
                  className={`px-4 py-1 text-[11px] cursor-default border border-b-0 ${i === 0 ? 'bg-[#d4d0c8] border-gray-400 -mb-px z-10' : 'bg-[#bdb9b0] border-gray-400 ml-[-1px]'}`}
                  style={i === 0 ? { boxShadow: 'inset 1px 1px 0 #fff' } : {}}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="win-inset flex-1 p-3 text-[11px] leading-relaxed flex flex-col gap-3">
              <p>
                <strong>MENN Maestro</strong> started at 13 with a vision: to design digital products that are practical, impactful, and easy to use.
              </p>
              <p>
                Every product is built with focus, clarity, and purpose, ensuring real value for users. Beyond work, MENN is driven by ambition and passion.
              </p>
              <p>
                Some goals lie a little further ahead—like the precision and performance of a BMW M5 F90—serving as daily inspiration.
              </p>
              <div className="win-inset p-2 mt-1 bg-white">
                <p className="text-[10px] italic text-gray-600">
                  &ldquo;Great products are simple, functional, and meaningful. Each creation is crafted with care, attention to detail, and a commitment to quality that stands the test of time.&rdquo;
                </p>
              </div>
              <div className="flex gap-1 mt-1">
                <span className="text-[9px] text-gray-500">Memory Usage:</span>
                <div className="win-progress-track flex-1">
                  <div className="win-progress-fill" style={{ width: '80%', animation: 'none', background: '#000080' }} />
                </div>
                <span className="text-[9px]">80%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-gray-400 flex justify-end gap-2">
          <button className="win-btn-default win-btn">OK</button>
          <button className="win-btn">Cancel</button>
          <button className="win-btn">Apply</button>
        </div>
      </WinWindow>
    </section>
  );
}

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (email && message) setSent(true);
  };

  return (
    <section id="contact" className="p-4 flex flex-col gap-4">
      {sent && (
        <WinWindow title="Information" icon={<AlertCircle size={12} />}>
          <div className="p-4 flex items-start gap-3">
            <span className="text-3xl">ℹ️</span>
            <div>
              <p className="text-[11px] mb-3">Your message has been sent successfully!</p>
              <button className="win-btn-default win-btn" onClick={() => setSent(false)}>OK</button>
            </div>
          </div>
        </WinWindow>
      )}

      <WinWindow title="New Message — Outlook Express" icon={<Mail size={12} />}>
        <MenuBar items={[
          { label: 'File' }, { label: 'Edit' }, { label: 'View' },
          { label: 'Insert' }, { label: 'Format' }, { label: 'Tools' },
          { label: 'Message' }, { label: 'Help' },
        ]} />
        <div className="win-toolbar text-[10px] gap-1">
          <button className="win-btn text-[10px] px-2 min-w-0" onClick={handleSend}>📨 Send</button>
          <div className="win-toolbar-separator" />
          <button className="win-toolbar-btn text-[10px]">✂️ Cut</button>
          <button className="win-toolbar-btn text-[10px]">📋 Copy</button>
          <button className="win-toolbar-btn text-[10px]">📌 Paste</button>
          <div className="win-toolbar-separator" />
          <button className="win-toolbar-btn text-[10px]">😊 Emoticons</button>
        </div>
        <div className="p-2 flex flex-col gap-1">
          <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
            <span className="text-[11px] w-14 text-right text-gray-600">To:</span>
            <div className="win-inset flex-1 px-1 py-0.5">
              <span className="text-[11px]">MennHq@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
            <span className="text-[11px] w-14 text-right text-gray-600">From:</span>
            <input
              className="win-input flex-1"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
            <span className="text-[11px] w-14 text-right text-gray-600">Subject:</span>
            <input
              className="win-input flex-1"
              type="text"
              placeholder="Let's collaborate"
              defaultValue="Collaboration Inquiry"
            />
          </div>
        </div>
        <div className="p-2 flex-1">
          <textarea
            className="win-input w-full resize-none"
            rows={6}
            placeholder="Write your message here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <div className="win-statusbar text-[10px]">
          <div className="win-status-panel">Ready</div>
          <div className="win-status-panel flex-1">New Message</div>
          <div className="win-status-panel">🔒 Secure</div>
        </div>
      </WinWindow>

      {/* Social links as shortcuts */}
      <WinWindow title="Social Links — Favorites" icon={<Star size={12} />}>
        <div className="p-3 flex flex-wrap gap-4">
          {[
            { icon: <Instagram size={24} />, label: '@menn_maestro', url: 'https://instagram.com/menn_maestro' },
            { icon: <Twitter size={24} />, label: 'Twitter / X', url: '#' },
            { icon: <Linkedin size={24} />, label: 'LinkedIn', url: '#' },
            { icon: <Github size={24} />, label: 'GitHub', url: '#' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 group cursor-default no-underline text-inherit">
              <div className="win-inset w-12 h-12 flex items-center justify-center text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                {link.icon}
              </div>
              <span className="text-[10px] win-link">{link.label}</span>
            </a>
          ))}
        </div>
      </WinWindow>
    </section>
  );
}

// ─── taskbar ───────────────────────────────────────────────────────────────

function Taskbar({ active, onNav }: { active: string; onNav: (s: string) => void }) {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const tasks = [
    { id: 'hero', label: 'MENN Maestro', icon: '🖥️' },
    { id: 'work',  label: 'My Work',     icon: '📁' },
    { id: 'about', label: 'About',       icon: '🔍' },
    { id: 'contact', label: 'Contact',   icon: '📨' },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch gap-1 px-1"
      style={{
        background: '#d4d0c8',
        borderTop: '1px solid #ffffff',
        boxShadow: '0 -1px 0 #808080',
        height: 30,
      }}
    >
      {/* Start button */}
      <button
        className="win-btn px-2 flex items-center gap-1 font-bold min-w-0"
        style={{ height: 22, alignSelf: 'center' }}
        onClick={() => onNav('hero')}
      >
        <span className="text-sm">🪟</span>
        <span className="hidden sm:inline font-bold">Start</span>
      </button>

      <div className="win-toolbar-separator self-stretch my-1" />

      {/* Task buttons */}
      <div className="flex-1 flex items-center gap-1 overflow-hidden">
        {tasks.map(t => (
          <button
            key={t.id}
            onClick={() => onNav(t.id)}
            className="flex items-center gap-1 px-2 text-[11px] min-w-0 overflow-hidden"
            style={{
              height: 22,
              alignSelf: 'center',
              maxWidth: 150,
              background: active === t.id ? '#bdb9b0' : '#d4d0c8',
              boxShadow: active === t.id
                ? 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff'
                : 'inset 1px 1px 0 #fff, inset -1px -1px 0 #808080, 1px 1px 0 #404040',
            }}
          >
            <span>{t.icon}</span>
            <span className="truncate hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* System tray */}
      <div
        className="flex items-center gap-2 px-2 text-[11px]"
        style={{
          boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff',
          background: '#d4d0c8',
          minWidth: 60,
        }}
      >
        <span>🔊</span>
        <span>🌐</span>
        <span className="font-bold">{time}</span>
      </div>
    </div>
  );
}

// ─── main App ───────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleNav = (section: string) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-8 font-sans" style={{ background: '#008080', minHeight: '100vh' }}>
      {/* Desktop wallpaper with teal XP-era gradient */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #1e6ba8 0%, #3a8ec7 30%, #56a0d3 60%, #3aa067 100%)',
        }}
        aria-hidden="true"
      />

      {/* Browser chrome wrapper */}
      <div
        className="relative z-10 mx-auto mt-4 mb-8"
        style={{ maxWidth: 960, minHeight: 'calc(100vh - 70px)' }}
      >
        <WinWindow title="MENN Maestro — Microsoft Internet Explorer" icon={<Globe size={12} />}>
          <MenuBar items={[
            { label: 'File' }, { label: 'Edit' }, { label: 'View' },
            { label: 'Favorites' }, { label: 'Tools' }, { label: 'Help' },
          ]} />
          <ToolBar />

          {/* IE content area */}
          <div className="flex" style={{ background: '#d4d0c8' }}>
            {/* Left sidebar like Windows Explorer panel */}
            <div
              className="hidden md:flex flex-col gap-1 p-2 border-r"
              style={{
                width: 160,
                flexShrink: 0,
                background: '#d4d0c8',
                borderColor: '#808080',
                boxShadow: '1px 0 0 #fff',
              }}
            >
              <p className="text-[10px] font-bold text-blue-900 mb-1 border-b border-gray-400 pb-1">Navigation</p>
              {[
                { id: 'hero',    label: 'Home', icon: '🏠' },
                { id: 'work',    label: 'My Work', icon: '📁' },
                { id: 'about',   label: 'About Me', icon: '👤' },
                { id: 'contact', label: 'Contact', icon: '📨' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="text-left flex items-center gap-1 text-[11px] px-1 py-0.5 w-full"
                  style={{
                    background: activeSection === item.id ? '#000080' : 'transparent',
                    color: activeSection === item.id ? '#fff' : '#000080',
                    textDecoration: activeSection === item.id ? 'none' : 'underline',
                  }}
                >
                  <span>{item.icon}</span> {item.label}
                </button>
              ))}

              <hr className="border-gray-400 mt-2 mb-1" />
              <p className="text-[10px] font-bold text-blue-900 mb-1">Favorites</p>
              <button className="win-link text-[10px] text-left px-1">📌 Add to Favorites</button>
              <button className="win-link text-[10px] text-left px-1">📂 Organize...</button>

              <hr className="border-gray-400 mt-2 mb-1" />
              <p className="text-[9px] text-gray-600 leading-tight">
                MENN Maestro<br />
                Digital Products<br />
                © 2024
              </p>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto" style={{ background: '#d4d0c8', minHeight: 500 }}>
              {activeSection === 'hero'    && <HeroSection    onNav={handleNav} />}
              {activeSection === 'work'    && <WorkSection    />}
              {activeSection === 'about'   && <AboutSection   />}
              {activeSection === 'contact' && <ContactSection />}
            </div>
          </div>

          {/* Status bar */}
          <div className="win-statusbar">
            <div className="win-status-panel">Done</div>
            <div className="win-status-panel flex-1 text-blue-900">
              http://mennmaestro.com/{activeSection === 'hero' ? '' : activeSection}
            </div>
            <div className="win-status-panel">🌐 Internet</div>
            <div className="win-status-panel">🔒</div>
          </div>
        </WinWindow>
      </div>

      {/* Taskbar */}
      <Taskbar active={activeSection} onNav={handleNav} />
    </div>
  );
}
