const { useState, useEffect } = React;

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const Typewriter = ({ words }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typeSpeed = isDeleting ? 50 : 100;
        const currentWord = words[currentWordIndex];

        const timer = setTimeout(() => {
            if (!isDeleting && currentText === currentWord) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            } else {
                setCurrentText(currentWord.substring(0, currentText.length + (isDeleting ? -1 : 1)));
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words]);

    return (
        <span className="inline-flex items-center min-h-[1em]">
            <span className="text-white">{currentText}</span>
            <span className="animate-pulse w-[3px] h-[1em] bg-primary ml-1 block"></span>
        </span>
    );
};

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer' || target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button');
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

    return (
        <div 
            className={`fixed pointer-events-none z-[100] w-8 h-8 rounded-full border border-primary transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${isPointer ? 'scale-150 bg-primary/20 border-transparent' : 'scale-100'}`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isPointer ? 'bg-secondary' : 'bg-primary'}`}></div>
        </div>
    );
};

const ScrollReveal = ({ children, animation = 'fade-up', delay = 0, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = React.useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        if (domRef.current) observer.observe(domRef.current);
        return () => {
            if (domRef.current) observer.unobserve(domRef.current);
        };
    }, []);

    let animationClass = '';
    switch (animation) {
        case 'fade-up':
            animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
            break;
        case 'fade-in':
            animationClass = isVisible ? 'opacity-100' : 'opacity-0';
            break;
        case 'slide-left':
            animationClass = isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10';
            break;
        case 'slide-right':
            animationClass = isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10';
            break;
        case 'scale-up':
            animationClass = isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90';
            break;
        default:
            animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
    }

    return (
        <div 
            ref={domRef} 
            className={`transition-all duration-1000 ease-out ${animationClass} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const ParticlesBackground = () => {
    const [stars, setStars] = useState([]);
    useEffect(() => {
        setStars(Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
        })));
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map(star => (
                <div 
                    key={star.id} 
                    className="star" 
                    style={{ 
                        left: star.left, 
                        top: star.top, 
                        width: star.width, 
                        height: star.height, 
                        animationDelay: star.animationDelay 
                    }} 
                />
            ))}
        </div>
    );
};

const TechMarquee = () => {
    const techs = ['REACT', 'PYTHON', 'CYBERSECURITY', 'BUG BOUNTY', 'JAVASCRIPT', 'NODE.JS', 'TAILWIND CSS', 'VULNERABILITY HUNTING', 'API SECURITY'];
    return (
        <div className="w-full bg-slate-900/50 border-y border-slate-800 py-4 overflow-hidden relative flex items-center z-10 backdrop-blur-sm">
            <div className="animate-marquee flex items-center space-x-12 px-6">
                {techs.concat(techs).map((tech, i) => (
                    <span key={i} className="text-xl font-black tracking-widest text-slate-500 uppercase flex-shrink-0">
                        {tech} <span className="mx-6 text-slate-700 inline-block">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const portfolioProjects = [
        {
            title: 'OPEN-PENETRATION',
            description: 'Philippine National Cybersecurity Assessment Framework - Sovereign, authorized, non-destructive cybersecurity assessment platform.',
            url: `${CONFIG.GITHUB_URL}/OPEN-PENETRATION`,
            tags: ['Python', 'Cybersecurity', 'Framework']
        },
        {
            title: 'IDOR',
            description: 'A professional-grade research and automation workspace for Insecure Direct Object Reference (IDOR) vulnerability hunting.',
            url: `${CONFIG.GITHUB_URL}/IDOR`,
            tags: ['Python', 'Bug Bounty', 'Automation']
        },
        {
            title: 'Web App',
            description: 'A polished restaurant front-end web app inspired by modern food ordering and reservation experiences.',
            url: `${CONFIG.GITHUB_URL}/webapp`,
            tags: ['JavaScript', 'HTML', 'CSS']
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden cursor-default md:cursor-none">
            <CustomCursor />
            <ParticlesBackground />
            {/* Background animated blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob z-0 pointer-events-none"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 z-0 pointer-events-none"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 z-0 pointer-events-none"></div>

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glassmorphism py-4 shadow-lg' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <a href="#home" className="text-2xl font-bold gradient-text tracking-tighter">WG</a>
                    
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors hover:animate-pulse-scale inline-block">
                                {link.name}
                            </a>
                        ))}
                        <div className="flex items-center space-x-4">
                            <a 
                                href={CONFIG.FACEBOOK_URL} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-slate-400 hover:text-[#1877F2] transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <FacebookIcon />
                            </a>
                            <a 
                                href={CONFIG.GITHUB_URL} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-700 hover:border-primary hover:text-primary transition-all duration-300"
                            >
                                <GithubIcon />
                                <span className="text-sm font-medium">GitHub</span>
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-300 hover:text-white" onClick={toggleMenu}>
                        {isMenuOpen ? <XIcon /> : <MenuIcon />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full glassmorphism border-t border-slate-800 shadow-2xl animate-fade-in">
                        <div className="flex flex-col px-6 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    className="text-lg font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex flex-col space-y-4 pt-4 border-t border-slate-800">
                                <a 
                                    href={CONFIG.FACEBOOK_URL} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-lg font-medium text-slate-300 hover:text-[#1877F2] transition-colors"
                                >
                                    <FacebookIcon />
                                    <span>Facebook Profile</span>
                                </a>
                                <a 
                                    href={CONFIG.GITHUB_URL} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-lg font-medium text-slate-300 hover:text-primary transition-colors"
                                >
                                    <GithubIcon />
                                    <span>GitHub Profile</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 z-10">
                <ScrollReveal animation="fade-up" delay={200} className="text-center max-w-3xl mx-auto">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 text-sm font-medium text-slate-300 mb-6">
                        👋 Welcome to my portfolio
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Hi, I'm <span className="gradient-text">Willy Gailo</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed h-16 flex flex-col justify-center">
                        <span className="mb-2">A passionate developer crafting beautiful web experiences.</span>
                        <span className="font-semibold flex justify-center items-center gap-2">
                            I specialize in <Typewriter words={['Cybersecurity & Pentesting', 'Python & Automation', 'Modern Web Development', 'Finding IDOR Vulnerabilities']} />
                        </span>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#projects" className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary hover:bg-blue-600 text-white font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 animate-pulse-glow">
                            View My Work
                        </a>
                        <a href="#contact" className="w-full sm:w-auto px-8 py-3 rounded-full border border-slate-600 hover:border-slate-400 text-slate-300 font-medium transition-all">
                            Contact Me
                        </a>
                    </div>
                </ScrollReveal>
            </section>

            {/* Tech Marquee */}
            <TechMarquee />

            {/* About Section */}
            <section id="about" className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 animate-pulse-glow">Discover</span>
                        <h2 className="text-3xl md:text-5xl font-bold flex items-center justify-center animate-shimmer">
                            About Me
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mt-6 rounded-full"></div>
                    </div>
                    
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <ScrollReveal animation="slide-right" className="lg:col-span-7 space-y-6 text-slate-400 text-lg leading-relaxed relative">
                            <div className="absolute -left-8 -top-8 text-9xl text-slate-800/30 font-serif leading-none hidden md:block">"</div>
                            <p className="relative z-10 animate-shimmer" style={{animationDuration: '6s'}}>
                                I am a passionate developer and cybersecurity enthusiast specializing in building secure, high-performance web applications and automated penetration testing frameworks.
                            </p>
                            <p className="relative z-10 animate-shimmer" style={{animationDuration: '8s', animationDelay: '1s'}}>
                                With a strong focus on ethical hacking, bug bounty research, and vulnerability hunting (like IDOR), I bridge the gap between creative frontend design and robust backend security. I love turning complex logic into seamless, secure user experiences.
                            </p>
                            
                            <div className="pt-8 mt-8 border-t border-slate-800/80">
                                <h3 className="text-white font-bold text-xl mb-6">Core Competencies</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {[
                                        { skill: 'Cybersecurity & Pentesting', percent: '90%' },
                                        { skill: 'Python & Automation', percent: '95%' },
                                        { skill: 'Frontend (React/Tailwind)', percent: '85%' },
                                        { skill: 'Backend & APIs', percent: '80%' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex justify-between text-sm font-medium">
                                                <span className="text-slate-300">{item.skill}</span>
                                                <span className="text-primary">{item.percent}</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-primary via-[#8b5cf6] to-secondary bg-[length:200%_200%] rounded-full transform origin-left transition-transform duration-1000"
                                                    style={{ width: item.percent, animation: 'gradientShift 3s ease infinite' }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-left" delay={200} className="lg:col-span-5 relative group perspective mt-10 lg:mt-0">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-purple-500 to-secondary rounded-3xl transform rotate-3 scale-105 opacity-40 group-hover:rotate-6 group-hover:scale-110 transition-all duration-700 blur-xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl transform -rotate-3 scale-100 opacity-60 group-hover:-rotate-2 transition-all duration-500"></div>
                            
                            <div className="relative glassmorphism rounded-3xl p-8 h-full flex flex-col justify-center items-center text-center space-y-6 border border-slate-700/50 backdrop-blur-xl bg-slate-900/80 hover:bg-slate-900/60 transition-colors duration-500">
                                <div className="relative w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-700 shadow-2xl group-hover:border-primary transition-colors duration-500">
                                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" style={{ animationDuration: '3s' }}></div>
                                    <span className="text-5xl animate-float inline-block">🛡️</span>
                                </div>
                                
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Secure & Scalable</h3>
                                    <p className="text-slate-400">Building the future of secure digital experiences.</p>
                                </div>

                                <div className="flex flex-wrap justify-center gap-2 pt-4">
                                    {['Python', 'React', 'Security', 'OSINT'].map((tech) => (
                                        <span key={tech} className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-600 text-xs font-medium text-slate-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <a 
                                    href={CONFIG.GITHUB_URL} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-blue-400 font-medium inline-flex items-center space-x-1 mt-4"
                                >
                                    <span>Check my GitHub</span>
                                    <ExternalLinkIcon />
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* GitHub Graph Section */}
            <section className="py-12 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal animation="fade-up" className="glassmorphism rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center justify-center space-x-3">
                            <GithubIcon />
                            <span>GitHub Contributions</span>
                        </h3>
                        <div className="w-full overflow-x-auto pb-4 flex justify-center custom-scrollbar">
                            <img 
                                src={`https://ghchart.rshah.org/3b82f6/${CONFIG.GITHUB_USERNAME}`} 
                                alt="Willy Gailo's Github Chart" 
                                className="min-w-[700px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 px-6 bg-slate-900/50 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center">
                        <span className="w-8 h-1 bg-secondary mr-4 rounded-full"></span>
                        <span className="animate-shimmer">Featured Projects</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioProjects.map((project, index) => (
                            <ScrollReveal key={index} animation="scale-up" delay={index * 150} className="h-full">
                                <div className="group glassmorphism rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 border border-slate-800 hover:border-primary/50 flex flex-col h-full animate-float">
                                    <div className="h-48 bg-slate-800 relative overflow-hidden flex-shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 opacity-80 group-hover:scale-110 transition-transform duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                                            <span className="text-5xl animate-float-delayed inline-block">{index === 0 ? '🛡️' : index === 1 ? '🔍' : '🍔'}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-2">
                                                <GithubIcon />
                                            </a>
                                        </div>
                                        <p className="text-slate-400 mb-6 text-sm flex-grow">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <a 
                            href={CONFIG.GITHUB_URL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-slate-300 hover:text-white font-medium border-b border-slate-600 hover:border-white transition-all pb-1 animate-pulse-scale"
                        >
                            <span>View all projects on GitHub</span>
                            <ExternalLinkIcon />
                        </a>
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section id="contact" className="py-24 px-6 relative z-10">
                <ScrollReveal animation="scale-up" className="max-w-3xl mx-auto text-center glassmorphism p-12 rounded-3xl border border-slate-700 relative overflow-hidden animate-float">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-shimmer">Let's Work Together</h2>
                    <p className="text-slate-400 text-lg mb-10">
                        I'm currently available for freelance work and open to new opportunities.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="mailto:hello@example.com" className="px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors animate-pulse-scale inline-block">
                            Say Hello
                        </a>
                        <a 
                            href={CONFIG.FACEBOOK_URL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-8 py-3 rounded-full border border-slate-600 hover:border-[#1877F2] hover:text-[#1877F2] text-white font-bold transition-colors flex items-center justify-center space-x-2 group animate-pulse-scale animation-delay-2000"
                        >
                            <FacebookIcon />
                            <span>Facebook</span>
                        </a>
                        <a 
                            href={CONFIG.GITHUB_URL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-8 py-3 rounded-full border border-slate-600 hover:border-white text-white font-bold transition-colors flex items-center justify-center space-x-2 group animate-pulse-scale animation-delay-4000"
                        >
                            <GithubIcon />
                            <span>GitHub</span>
                        </a>
                    </div>
                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-slate-800 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm animate-pulse-glow">
                        © {new Date().getFullYear()} Willy Gailo. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href={CONFIG.FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#1877F2] transition-colors animate-float">
                            <span className="sr-only">Facebook</span>
                            <FacebookIcon />
                        </a>
                        <a href={CONFIG.GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors animate-float-delayed">
                            <span className="sr-only">GitHub</span>
                            <GithubIcon />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
