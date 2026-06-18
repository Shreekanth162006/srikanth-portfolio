import { createContext, useContext, useState, useEffect } from 'react';

const defaultData = {
  profile: {
    name: 'Srikanth N',
    firstName: 'SRIKANTH',
    lastName: 'N',
    photo: '/secure_docs/Srikanth N croped.jpg',
    email: 'Shreekanth162006@gmail.com',
    contactEmail: 'Shreekanth162006@gmail.com',
    github: 'https://github.com/srikanthn16',
    githubUsername: 'srikanthn16',
    linkedin: 'https://linkedin.com/in/srikanthn16',
    linkedinUsername: 'srikanthn16',
    location: 'Chennai, India',
    bio: 'Pre-Final Year B.E. Computer Science & Engineering (Cyber Security) Honours student with a passion for VAPT, digital forensics, and ethical hacking.',
    aboutBio: 'Pre-Final Year B.E. Computer Science & Engineering (Cyber Security) student pursuing an (Honours degree), with a strong foundation in network security, digital forensics, ethical hacking, and security operations. Experienced in forensic investigations, fund trail analysis, and secure app development.',
    resumeUrl: '/secure_docs/Srikanth N_Resume.pdf',
    resumeFormat: 'PDF',
    resumeStatus: 'Latest Version',
    resumeUpdated: '2026',
    focus: 'VAPT & Ethical Hacking',
    status: '● Active',
    timezone: 'IST (UTC+5:30)',
    interests: [
      'Penetration Testing & Red Teaming',
      'Web Application Security',
      'Network Security & Forensics',
      'Linux Administration & Hardening',
      'Secure Software Development'
    ],
  },
  education: {
    degree: 'B.E Computer Science & Engineering (Cyber Security) - Honours',
    college: 'Dhanalakshmi Srinivasan College of Engineering and Technology',
    university: 'Anna University',
    cgpa: '7.71',
  },
  roles: [
    'Cybersecurity Engineer',
    'Ethical Hacker',
    'SOC Analyst (Learning)',
    'Digital Forensics Intern',
  ],
  skills: [
    {
      id: 's1',
      title: 'SOC Concepts (Learning)',
      color: '#00ff41',
      skills: [
        { name: 'SIEM', level: 80 },
        { name: 'Log Analysis', level: 85 },
        { name: 'Threat Monitoring', level: 80 },
        { name: 'Alert Triage', level: 78 },
        { name: 'Incident Response', level: 75 },
        { name: 'IOC Analysis', level: 80 },
      ],
    },
    {
      id: 's2',
      title: 'Digital Forensics',
      color: '#ff073a',
      skills: [
        { name: 'Autopsy', level: 80 },
        { name: 'Kali Linux', level: 85 },
        { name: 'Disk Imaging', level: 78 },
        { name: 'Evidence Collection', level: 82 },
        { name: 'Chain of Custody', level: 85 },
      ],
    },
    {
      id: 's3',
      title: 'OS & Networking',
      color: '#8b5cf6',
      skills: [
        { name: 'TCP/IP', level: 85 },
        { name: 'Wireshark', level: 88 },
        { name: 'IDS/IPS', level: 80 },
        { name: 'Firewall Rules', level: 82 },
        { name: 'Cisco Packet Tracer', level: 85 },
        { name: 'Vulnerability Assessment', level: 80 },
      ],
    },
    {
      id: 's4',
      title: 'Programming',
      color: '#00e5ff',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'Java', level: 75 },
        { name: 'JavaScript (Node/React)', level: 80 },
        { name: 'SQL', level: 82 },
        { name: 'REST APIs', level: 78 },
      ],
    },
    {
      id: 's5',
      title: 'Tools & VAPT',
      color: '#f59e0b',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'MySQL', level: 80 },
        { name: 'Linux (Kali/Ubuntu)', level: 88 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'VAPT Workflows', level: 82 },
        { name: 'OWASP Top 10', level: 85 },
      ],
    },
  ],
  projects: [
    {
      id: 'p1',
      title: 'Helpdesk Ticketing System',
      description: 'Enterprise helpdesk with SLA tracking, automated escalation rules, role-based analytics, and performance dashboards. Capstone project featuring full authorization controls and audit logging.',
      github: 'https://github.com/srikanthn16',
      tags: ['React', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS', 'Auth'],
      highlights: ['SLA & Escalation tracking', 'Role-based analytics', 'Audit Logging'],
      color: '#00ff41',
    },
    {
      id: 'p2',
      title: 'Fund Trail Analysis Tool',
      description: 'Co-developed for Cyber Crime Wing Headquarters. Converts bulk Excel transaction data into an interactive fraud-detection visualization tree, integrating ATM/Cheque/Hold indicators and state-wise summaries.',
      github: 'https://github.com/srikanthn16',
      tags: ['Python', 'Django', 'JavaScript', 'Data Visualization', 'Security'],
      highlights: ['Transaction Flow Tracking', 'Fraud Detection', 'Used in Investigations'],
      color: '#00e5ff',
    },
    {
      id: 'p3',
      title: 'Smart Home Security System',
      description: 'Simulated full smart-home network with mobile access management and real-time alert monitoring, mimicking IoT device controls and intrusion detection scenarios.',
      github: 'https://github.com/srikanthn16',
      tags: ['Cisco Packet Tracer', 'IoT', 'Mobile Interface', 'Network Security'],
      highlights: ['Network Simulation', 'Access Management', 'Intrusion Detection'],
      color: '#8b5cf6',
    },
    {
      id: 'p4',
      title: 'Soil Nutrient Monitoring System',
      description: 'Implemented IoT-based data collection and visualization pipelines for smart agriculture decision support.',
      github: 'https://github.com/srikanthn16',
      tags: ['Python', 'IoT', 'Data Acquisition', 'Sensors'],
      highlights: ['Data Collection', 'Real-time pipeline', 'Decision Support'],
      color: '#ff073a',
    },
  ],
  certifications: [
    { id: 'c1', title: 'Cryptography and Network Security', issuer: 'NPTEL — IIT', icon: '/secure_docs/icons/nptel.jpg', color: '#00ff41', file: '/secure_docs/cryptography nptel.pdf' },
    { id: 'c2', title: 'Foundation of Cloud IoT Edge ML', issuer: 'NPTEL — IIT', icon: '/secure_docs/icons/nptel.jpg', color: '#00e5ff', file: '/secure_docs/Foundation of Cloud IoT Edge ML.pdf' },
    { id: 'c3', title: 'Cyber Security and Privacy', issuer: 'NPTEL — IIT', icon: '/secure_docs/icons/nptel.jpg', color: '#8b5cf6', file: '/secure_docs/NPTEL_CyberPrivacy.pdf' },
  ],
  achievements: [
    { id: 'a1', number: 4, suffix: '', label: 'Completed Internships', color: '#00ff41' },
    { id: 'a2', number: 4, suffix: '', label: 'Security Projects', color: '#00e5ff' },
    { id: 'a3', number: 3, suffix: '', label: 'IIT NPTEL Certificates', color: '#8b5cf6' },
    { id: 'a4', number: 2, suffix: 'nd', label: 'Place - Anna Univ Exams', color: '#f59e0b', isText: true },
  ],
  experiences: [
    {
      id: 'e1',
      year: 'Jan 2026 - Feb 2026',
      title: 'Full-Stack Security Developer',
      company: 'AdroIT Technologies',
      details: 'IBM Naan Mudhalvan (Remote)',
      desc: 'Developed breach detection alert backends, performance analytics dashboards, and built a custom SLA escalation module with React for tracking ticket urgency status.',
      icon: '/secure_docs/icons/adroit_technologies_innovative_solutions_pvt_ltd_logo.jpg',
      color: 'var(--cyber-primary)',
      certUrl: '/secure_docs/AdroIT Technologies internship.pdf'
    },
    {
      id: 'e2',
      year: 'Sep 2025 - Nov 2025',
      title: 'Cybersecurity Intern',
      company: 'Cyber Crime Wing Headquarters',
      details: '(Chennai)',
      desc: 'Co-developed a Fund Trail Analysis Tool to automate financial transaction flow tracking and fraud detection, integrating KYC mapping, duplicate checks, and state summaries.',
      icon: '/secure_docs/icons/cyber crime wing.jpg',
      color: '#00e5ff',
      certUrl: '/secure_docs/srikanth cyber crime wing certificate.jpg'
    },
    {
      id: 'e3',
      year: 'Jul 2025 - Aug 2025',
      title: 'Cybersecurity Intern',
      company: 'VDT Edu Tantr Ventures Pvt. Ltd.',
      details: '(Bangalore)',
      desc: 'Trained in enterprise network security protocols, ethical hacking workflows, threat modeling, and vulnerability assessment (VAPT) methodologies.',
      icon: '/secure_docs/icons/Edu tantr.jpg',
      color: '#8b5cf6',
      certUrl: '/secure_docs/edu tantar intern.jpg'
    },
    {
      id: 'e4',
      year: 'Feb 2025',
      title: 'Cybersecurity Intern',
      company: 'Cyber Crime Police Station',
      details: '(Pondicherry)',
      desc: 'Investigated digital crime incidents, analyzed forensic evidence, monitored network threats, and documented formal technical findings in case reports.',
      icon: '/secure_docs/icons/cyber crime pondy.png',
      color: '#ff073a',
      certUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 9.5555.jpeg'
    }
  ],
  educationList: [
    {
      id: 'ed1',
      year: '2023 - Present',
      title: 'B.E. Computer Science (Cyber Security) - Honours',
      school: 'Dhanalakshmi Srinivasan College of Engineering & Technology',
      desc: 'Pursuing Honours degree specializing in networks, OS hardening, cryptography, digital forensics, and secure coding. Maintaining a CGPA of 7.71 / 10.',
      icon: '/secure_docs/icons/dhanalakshmi srinivasan.png',
      color: 'var(--cyber-primary)'
    },
    {
      id: 'ed2',
      year: '2021 - 2023',
      title: 'Higher Secondary Education (Science)',
      school: 'Sri Ayyan Vidyashram Higher Secondary School',
      desc: 'Completed secondary education with focused coursework in Mathematics, Physics, Chemistry, and Computer Science.',
      icon: '/secure_docs/icons/sri ayyan.jpg',
      color: '#00e5ff'
    }
  ],
  admin: {
    username: 'srikanth',
    password: 'srikanth@2026',
  },
  hackathons: [
    { id: 'h1', title: 'IBM Naan Mudhalvan EBPL Hackathon', role: 'Team Lead / Security Dev', year: '2026', desc: 'Designed and built the SLA Ticketing system with end-to-end audit logs. Bypassed custom WAF rule configurations in mock security drills.', color: '#00ff41', icon: '/secure_docs/icons/naan mudhalan11.png' },
    { id: 'h2', title: 'State Level Cyber Hackathon', role: 'Security Analyst', year: '2025', desc: 'Participated in a 24-hour hackathon focused on forensic analysis and transaction flow mapping.', color: '#00e5ff', icon: '/secure_docs/icons/cognizant.avif' }
  ],
  leadership: [
    { id: 'l1', title: 'Secretary — Department Club', organization: 'DSCET', year: '2024 – 2025', desc: 'Organizing technical symposiums, hands-on VAPT workshops, and coordinating student cyber defense labs.', color: '#8b5cf6', icon: '/secure_docs/icons/cyber security department.png' },
    { id: 'l2', title: 'Joint Secretary — Department Club', organization: 'DSCET', year: '2023 – 2024', desc: 'Assisted in hosting ethical hacking seminars and managing system security protocols for department computers.', color: '#f59e0b', icon: '/secure_docs/icons/cyber security department.png' },
    { id: 'l3', title: 'Student Council — Member', organization: 'DSCET', year: '2023 – 2024', desc: 'Represented student interest in academic boards and organized institutional tech events.', color: '#ff073a', icon: '/secure_docs/icons/student council.png' }
  ],
  achievementsText: [
    { id: 'at1', title: 'Secured 2nd Place in Anna University Examinations', organization: 'Cybersecurity Department', year: '2023 – 2024', desc: 'Academic excellence award for securing top ranks across the university curriculum.', color: '#00ff41', icon: '/secure_docs/icons/anna-university3770.jpg' },
    { id: 'at2', title: '3+ NPTEL Certifications', organization: 'NPTEL — IIT', year: '2024 – 2025', desc: 'Completed courses in Advanced Cryptography, Cloud IoT Edge, and Privacy & Security with honors.', color: '#00e5ff', icon: '/secure_docs/icons/nptel.jpg' }
  ],
  blogs: [
    {
      id: 'b1',
      title: 'SQL Injection Bypass Technique via Filter Evasion',
      excerpt: 'Detailing how web application filters can be bypassed using hex encoding and character set manipulation in database payloads.',
      content: '### SQL Injection Filter Evasion\n\nDuring a recent VAPT exercise, I encountered an input filter that stripped standard SQL keywords like `SELECT`, `UNION`, and `WHERE` case-insensitively.\n\n#### The Filter Bypass\nBy using SQL comment inline injection and alternative encodings, we can construct payloads that the regex filter misses but the SQL parser reconstructs:\n\n```sql\n-- Standard payload (Blocked)\nUNION SELECT username, password FROM users;\n\n-- Evaded payload (Bypassed)\nUNI/**/ON SEL/**/ECT username, password FR/**/OM users;\n```\n\nAdditionally, utilizing hex-encoding for strings allowed bypass of single-quote filters:\n`0x61646d696e` instead of `\'admin\'`.\n\n#### Prevention\nUse parameterized queries (Prepared Statements) rather than trying to sanitize strings via regular expression filters.',
      date: '2026-05-10',
      tags: ['SQLi', 'VAPT', 'Web Security'],
      category: 'CTF Write-up',
      color: '#00ff41'
    },
    {
      id: 'b2',
      title: 'Privilege Escalation on Linux: SUID Binary Abuse',
      excerpt: 'A walk-through of abusing misconfigured SUID permissions on standard utilities to obtain root privileges on target Linux machines.',
      content: '### Linux SUID Privilege Escalation\n\nSUID (Set owner User ID on execution) is a special file permission in Linux that allows users to run a binary with the permissions of the file owner (often root).\n\nIf administrators grant SUID privileges to commands that can read files or run system binaries, attackers can exploit them.\n\n#### The Discovery\nFirst, we scan for SUID files:\n```bash\nfind / -perm -4000 -type f 2>/dev/null\n```\n\nSuppose `/usr/bin/find` has the SUID bit set. According to [GTFOBins](https://gtfobins.github.io), we can execute commands through it:\n\n```bash\nfind . -exec /bin/sh -p \\; -quit\n```\n\nThis executes `/bin/sh` with inherited root privileges, giving us a root shell!\n\n#### Mitigation\nReview SUID bits and restrict them strictly to binary files that require them. Never set SUID on scripting interpreters or editors.',
      date: '2026-06-01',
      tags: ['Linux', 'PrivEsc', 'SUID'],
      category: 'Guides',
      color: '#00e5ff'
    }
  ],
  bootcamps: [
    { id: 'bc1', title: 'Cybersecurity Bootcamp', organizer: 'Google / Coursera', year: '2025', desc: 'Intensive hands-on training covering network security, threat detection, and incident response operations.', color: '#00ff41', icon: '💻', certUrl: '' },
    { id: 'bc2', title: 'Ethical Hacking Workshop', organizer: 'DSCET Cyber Club', year: '2024', desc: 'Participated in a practical seminar on vulnerability scanning, threat modeling, and OWASP top 10 exploitation techniques.', color: '#00e5ff', icon: '🛡️', certUrl: '' }
  ],
  gallery: [
    {
      id: 'g6',
      title: 'Symposium Certificate of Merit',
      description: 'Awarded for active presentation and technical showcase during the campus cybersecurity symposium.',
      imageUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 8.59.19 PM.jpeg',
      category: 'Events',
      date: '2026'
    },
    {
      id: 'g7',
      title: 'Technical Hands-On Workshop Certificate',
      description: 'Completed VAPT training and simulated defensive cybersecurity laboratory drills.',
      imageUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 9.00.08 PM.jpeg',
      category: 'Certificates',
      date: '2026'
    },
    {
      id: 'g8',
      title: 'Anna University Examination Achievement',
      description: 'Outstanding performance recognition in the Anna University semester examinations.',
      imageUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 9.04.21 PM.jpeg',
      category: 'Academic',
      date: '2026'
    },
    {
      id: 'g9',
      title: 'AdroIT Technologies Full Stack Certificate',
      description: 'Internship certification for breach detection alert backend projects and SLA analytics dashboard.',
      imageUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 9.04.22 PM.jpeg',
      category: 'Internships',
      date: '2026'
    },
    {
      id: 'g10',
      title: 'IIT NPTEL Cryptography Honors',
      description: 'Scored high honors in Advanced Cryptography and Network Security course from IIT.',
      imageUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 9.07.23 PM.jpeg',
      category: 'Certificates',
      date: '2026'
    },
    {
      id: 'g11',
      title: 'Google Coursera Bootcamp Completion',
      description: 'Successfully finished intensive learning bootcamp on security operations VAPT workflows.',
      imageUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 9.20.42 PM.jpeg',
      category: 'Certificates',
      date: '2026'
    },
    {
      id: 'g12',
      title: 'State Cybersecurity Hackathon Lead Award',
      description: 'Recognized as team lead for securing systems and building robust authentication shields in mock drills.',
      imageUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 9.22.22 PM.jpeg',
      category: 'Leadership',
      date: '2026'
    },
    {
      id: 'g13',
      title: 'Department Club Leadership Certificate',
      description: 'Secretaryship certification of Dhanalakshmi Srinivasan department club activities.',
      imageUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 9.34.42 PM.jpeg',
      category: 'Leadership',
      date: '2026'
    },
    {
      id: 'g14',
      title: 'Cyber Crime Police Pondicherry Internship',
      description: 'Completed internship on digital forensics investigation and chain of custody documentation.',
      imageUrl: '/secure_docs/Gallery/WhatsApp Image 2026-06-17 at 9.5555.jpeg',
      category: 'Internships',
      date: '2026'
    }
  ]
};

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_full_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultData,
          ...parsed,
          profile: {
            ...defaultData.profile,
            ...(parsed.profile || {}),
            resumeUrl: (parsed.profile && parsed.profile.resumeUrl) ? parsed.profile.resumeUrl : defaultData.profile.resumeUrl
          },
          education: {
            ...defaultData.education,
            ...(parsed.education || {}),
          },
          experiences: (parsed.experiences || []).map(e => {
            if (e.icon === '🛡️') return { ...e, icon: '/secure_docs/icons/adroit_technologies_innovative_solutions_pvt_ltd_logo.jpg' };
            if (e.icon === '🔐') return { ...e, icon: '/secure_docs/icons/cyber crime wing.jpg' };
            if (e.icon === '💻') return { ...e, icon: '/secure_docs/icons/Edu tantr.jpg' };
            if (e.icon === '🚓') return { ...e, icon: '/secure_docs/icons/cyber crime pondy.png' };
            return e;
          }),
          educationList: (parsed.educationList || []).map(ed => {
            if (ed.icon === '🎓') return { ...ed, icon: '/secure_docs/icons/dhanalakshmi srinivasan.png' };
            if (ed.icon === '🏫') return { ...ed, icon: '/secure_docs/icons/sri ayyan.jpg' };
            return ed;
          }),
          certifications: (parsed.certifications || []).map(c => {
            if (c.icon === '🔐' || c.icon === '☁️' || c.icon === '🛡️') {
              return { ...c, icon: '/secure_docs/icons/nptel.jpg' };
            }
            return c;
          }),
          hackathons: (parsed.hackathons || []).map(h => {
            if (h.icon === '🏆') return { ...h, icon: '/secure_docs/icons/naan mudhalan11.png' };
            if (h.icon === '💻') return { ...h, icon: '/secure_docs/icons/cognizant.avif' };
            return h;
          }),
          leadership: (parsed.leadership || []).map(l => {
            if (l.icon === '👥' || l.icon === '👑') return { ...l, icon: '/secure_docs/icons/cyber security department.png' };
            if (l.icon === '📢') return { ...l, icon: '/secure_docs/icons/student council.png' };
            return l;
          }),
          achievementsText: (parsed.achievementsText || []).map(at => {
            if (at.icon === '🥇') return { ...at, icon: '/secure_docs/icons/anna-university3770.jpg' };
            if (at.icon === '📜') return { ...at, icon: '/secure_docs/icons/nptel.jpg' };
            return at;
          }),
          gallery: (() => {
            const savedGallery = parsed.gallery || [];
            // Keep only items that belong to the new Gallery folder or user custom entries, filtering out old root certificate paths
            const filtered = savedGallery.filter(item => 
              !item.imageUrl || 
              item.imageUrl.includes('/secure_docs/Gallery/') || 
              item.imageUrl.startsWith('data:') || 
              item.imageUrl.startsWith('http')
            );
            const merged = [...filtered];
            defaultData.gallery.forEach(defItem => {
              if (!merged.some(item => item.imageUrl === defItem.imageUrl)) {
                merged.push(defItem);
              }
            });
            return merged;
          })()
        };
      }
    } catch (e) {}
    return defaultData;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [adminPanelTab, setAdminPanelTab] = useState('Profile');

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_full_data', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      alert('Warning: Browser Local Storage limit exceeded!\n\nThis can happen if you upload too many files or very large PDFs (each base64 file is ~33% larger than raw size). The current change is active in your browser but will NOT persist on reload.\n\nRecommendation:\n1. Use [Clear] to remove large uploaded files.\n2. Upload smaller files (compressed PDFs under 300KB).\n3. Or paste an external hosted URL link (Google Drive, Dropbox, etc.) directly in the text field.');
    }
  }, [data]);

  const updateProfile = (updates) => {
    setData(prev => ({ ...prev, profile: { ...prev.profile, ...updates } }));
  };

  const updateEducation = (updates) => {
    setData(prev => ({ ...prev, education: { ...prev.education, ...updates } }));
  };

  const updateRoles = (roles) => {
    setData(prev => ({ ...prev, roles }));
  };

  const updateSkillCategory = (catId, updates) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === catId ? { ...s, ...updates } : s),
    }));
  };

  const addSkillCategory = (category) => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...category, id: 's' + Date.now() }],
    }));
  };

  const removeSkillCategory = (catId) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== catId),
    }));
  };

  const addProject = (project) => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: 'p' + Date.now() }],
    }));
  };

  const updateProject = (projectId, updates) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projectId ? { ...p, ...updates } : p),
    }));
  };

  const removeProject = (projectId) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId),
    }));
  };

  const addCertification = (cert) => {
    setData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { ...cert, id: 'c' + Date.now() }],
    }));
  };

  const updateCertification = (certId, updates) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === certId ? { ...c, ...updates } : c),
    }));
  };

  const removeCertification = (certId) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== certId),
    }));
  };

  const updateAchievements = (achievements) => {
    setData(prev => ({ ...prev, achievements }));
  };

  const updateAdmin = (updates) => {
    setData(prev => ({ ...prev, admin: { ...prev.admin, ...updates } }));
  };

  const addBlog = (blog) => {
    setData(prev => ({
      ...prev,
      blogs: [...(prev.blogs || []), { ...blog, id: 'b' + Date.now() }],
    }));
  };

  const updateBlog = (blogId, updates) => {
    setData(prev => ({
      ...prev,
      blogs: (prev.blogs || []).map(b => b.id === blogId ? { ...b, ...updates } : b),
    }));
  };

  const removeBlog = (blogId) => {
    setData(prev => ({
      ...prev,
      blogs: (prev.blogs || []).filter(b => b.id !== blogId),
    }));
  };

  const addHackathon = (hackathon) => {
    setData(prev => ({
      ...prev,
      hackathons: [...(prev.hackathons || []), { ...hackathon, id: 'h' + Date.now() }],
    }));
  };

  const updateHackathon = (hackId, updates) => {
    setData(prev => ({
      ...prev,
      hackathons: (prev.hackathons || []).map(h => h.id === hackId ? { ...h, ...updates } : h),
    }));
  };

  const removeHackathon = (hackId) => {
    setData(prev => ({
      ...prev,
      hackathons: (prev.hackathons || []).filter(h => h.id !== hackId),
    }));
  };

  const addLeadership = (lead) => {
    setData(prev => ({
      ...prev,
      leadership: [...(prev.leadership || []), { ...lead, id: 'l' + Date.now() }],
    }));
  };

  const updateLeadership = (leadId, updates) => {
    setData(prev => ({
      ...prev,
      leadership: (prev.leadership || []).map(l => l.id === leadId ? { ...l, ...updates } : l),
    }));
  };

  const removeLeadership = (leadId) => {
    setData(prev => ({
      ...prev,
      leadership: (prev.leadership || []).filter(l => l.id !== leadId),
    }));
  };

  const addAchievementText = (ach) => {
    setData(prev => ({
      ...prev,
      achievementsText: [...(prev.achievementsText || []), { ...ach, id: 'at' + Date.now() }],
    }));
  };

  const updateAchievementText = (achId, updates) => {
    setData(prev => ({
      ...prev,
      achievementsText: (prev.achievementsText || []).map(a => a.id === achId ? { ...a, ...updates } : a),
    }));
  };

  const removeAchievementText = (achId) => {
    setData(prev => ({
      ...prev,
      achievementsText: (prev.achievementsText || []).filter(a => a.id !== achId),
    }));
  };

  const addExperience = (exp) => {
    setData(prev => ({
      ...prev,
      experiences: [...(prev.experiences || []), { ...exp, id: 'e' + Date.now() }],
    }));
  };

  const updateExperience = (expId, updates) => {
    setData(prev => ({
      ...prev,
      experiences: (prev.experiences || []).map(e => e.id === expId ? { ...e, ...updates } : e),
    }));
  };

  const removeExperience = (expId) => {
    setData(prev => ({
      ...prev,
      experiences: (prev.experiences || []).filter(e => e.id !== expId),
    }));
  };

  const addEducationItem = (edu) => {
    setData(prev => ({
      ...prev,
      educationList: [...(prev.educationList || []), { ...edu, id: 'ed' + Date.now() }],
    }));
  };

  const updateEducationItem = (eduId, updates) => {
    setData(prev => ({
      ...prev,
      educationList: (prev.educationList || []).map(ed => ed.id === eduId ? { ...ed, ...updates } : ed),
    }));
  };

  const removeEducationItem = (eduId) => {
    setData(prev => ({
      ...prev,
      educationList: (prev.educationList || []).filter(ed => ed.id !== eduId),
    }));
  };

  const addBootcamp = (bootcamp) => {
    setData(prev => ({
      ...prev,
      bootcamps: [...(prev.bootcamps || []), { ...bootcamp, id: 'bc' + Date.now() }],
    }));
  };

  const updateBootcamp = (bootId, updates) => {
    setData(prev => ({
      ...prev,
      bootcamps: (prev.bootcamps || []).map(b => b.id === bootId ? { ...b, ...updates } : b),
    }));
  };

  const removeBootcamp = (bootId) => {
    setData(prev => ({
      ...prev,
      bootcamps: (prev.bootcamps || []).filter(b => b.id !== bootId),
    }));
  };

  const addGalleryItem = (item) => {
    setData(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), { ...item, id: 'g' + Date.now() }],
    }));
  };

  const updateGalleryItem = (itemId, updates) => {
    setData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).map(g => g.id === itemId ? { ...g, ...updates } : g),
    }));
  };

  const removeGalleryItem = (itemId) => {
    setData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter(g => g.id !== itemId),
    }));
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'green';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const resetToDefault = () => {
    setData(defaultData);
    localStorage.removeItem('portfolio_full_data');
  };

  const login = (username, password) => {
    if (username === data.admin.username && password === data.admin.password) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <PortfolioContext.Provider value={{
      data, isAdmin, login, logout, resetToDefault,
      adminPanelOpen, setAdminPanelOpen, adminPanelTab, setAdminPanelTab,
      updateProfile, updateEducation, updateRoles,
      updateSkillCategory, addSkillCategory, removeSkillCategory,
      addProject, updateProject, removeProject,
      addCertification, updateCertification, removeCertification,
      updateAchievements, updateAdmin,
      theme, setTheme, addBlog, updateBlog, removeBlog,
      addHackathon, updateHackathon, removeHackathon,
      addLeadership, updateLeadership, removeLeadership,
      addAchievementText, updateAchievementText, removeAchievementText,
      addExperience, updateExperience, removeExperience,
      addEducationItem, updateEducationItem, removeEducationItem,
      addBootcamp, updateBootcamp, removeBootcamp,
      addGalleryItem, updateGalleryItem, removeGalleryItem,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);
