import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiX, FiSettings, FiSave, FiLogOut, FiPlus, FiTrash2, FiUser, FiCode, FiFolder, FiAward, FiRefreshCw, FiDownload, FiCopy } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const TABS = ['Profile', 'Timeline', 'Skills', 'Projects', 'Certs', 'Achievements', 'Gallery', 'Blogs', 'Activities', 'Bootcamps', 'Settings'];
const COLORS = ['#00ff41','#00e5ff','#8b5cf6','#f59e0b','#ff073a','#ec4899','#06b6d4'];
const ICONS = ['🛡️','🔐','☁️','🧠','🏭','📜','🎓','💻','🔒','⚡'];

function Field({ label, value, onChange, textarea, type = 'text' }) {
  const cls = "w-full px-3 py-2 bg-cyber-darker border border-cyber-green/20 rounded-lg text-gray-200 font-mono text-xs outline-none focus:border-cyber-green transition-all placeholder:text-gray-700";
  return (
    <div className="mb-3">
      <label className="text-cyber-green/60 text-[10px] font-mono mb-1 block uppercase">{label}</label>
      {textarea ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={cls + ' resize-none'} /> :
        <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} />}
    </div>
  );
}

function IconEditor({ icon, onChange, color, onColorChange, label = "Icon & Color" }) {
  const isImage = icon && (icon.startsWith('data:') || icon.startsWith('http') || icon.includes('/') || icon.includes('.'));
  
  return (
    <div className="mb-3">
      <label className="text-cyber-green/60 text-[10px] font-mono mb-1 block uppercase">{label}</label>
      <div className="p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <label className="text-cyber-green/60 text-[10px] font-mono whitespace-nowrap">ICON:</label>
            {isImage ? (
              <div className="flex items-center gap-2">
                <img src={icon} alt="" className="w-7 h-7 object-cover rounded border border-cyber-green/30" />
                <button
                  type="button"
                  onClick={() => onChange('🛡️')}
                  className="text-[9px] font-mono text-cyber-red/80 hover:text-cyber-red border border-cyber-red/20 px-1.5 py-0.5 rounded bg-cyber-darker"
                >
                  Clear Image
                </button>
              </div>
            ) : (
              <>
                <input
                  value={icon || ''}
                  onChange={e => onChange(e.target.value)}
                  className="w-10 px-2 py-1 bg-cyber-darker border border-cyber-green/20 rounded text-center text-sm outline-none font-mono text-white"
                  placeholder="🛡️"
                  maxLength={3}
                />
                <select
                  value={ICONS.includes(icon) ? icon : ''}
                  onChange={e => { if (e.target.value) onChange(e.target.value); }}
                  className="bg-cyber-darker border border-cyber-green/20 rounded text-xs text-gray-300 px-1 py-1 outline-none flex-1"
                >
                  <option value="">-- Preset --</option>
                  {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-cyber-green/60 text-[10px] font-mono">COLOR:</label>
            <select value={color} onChange={e => onColorChange(e.target.value)}
              className="bg-cyber-darker border border-cyber-green/20 rounded text-xs text-gray-300 px-2 py-1 outline-none w-full">
              {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Upload Custom Icon Image */}
        <div className="mt-3 pt-2.5 border-t border-cyber-green/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-cyber-green/50 text-[9px] font-mono uppercase whitespace-nowrap">Or Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (file.size > 500 * 1024) return alert("File too large! Must be under 500KB.");
                const reader = new FileReader();
                reader.onload = (ev) => onChange(ev.target.result);
                reader.readAsDataURL(file);
              }
            }}
            className="text-[9px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-cyber-green/20 file:text-[9px] file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer w-full max-w-[240px]"
          />
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const ctx = usePortfolio();
  const { data, isAdmin, login, logout, resetToDefault, adminPanelOpen: open, setAdminPanelOpen: setOpen, adminPanelTab: tab, setAdminPanelTab: setTab, updateProfile, updateEducation, updateRoles, updateSkillCategory, addSkillCategory, removeSkillCategory, addProject, updateProject, removeProject, addCertification, updateCertification, removeCertification, updateAchievements, updateAdmin, theme, setTheme, addBlog, updateBlog, removeBlog, addHackathon, updateHackathon, removeHackathon, addLeadership, updateLeadership, removeLeadership, addAchievementText, updateAchievementText, removeAchievementText, addExperience, updateExperience, removeExperience, addEducationItem, updateEducationItem, removeEducationItem, addBootcamp, updateBootcamp, removeBootcamp, addGalleryItem, updateGalleryItem, removeGalleryItem, importData } = ctx;
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [saved, setSaved] = useState('');

  // Profile picture cropping state
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [cropImageDim, setCropImageDim] = useState({ w: 0, h: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleImageLoad = (e) => {
    const img = e.currentTarget;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const ratio = w / h;
    let initW, initH;
    if (ratio > 1) {
      initH = 300;
      initW = 300 * ratio;
    } else {
      initW = 300;
      initH = 300 / ratio;
    }
    setCropImageDim({ w: initW, h: initH });
    setCropOffset({ x: 0, y: 0 });
    setCropZoom(1);
  };

  const handleZoomChange = (newZoom) => {
    setCropZoom(newZoom);
    const maxOffsetX = Math.max(0, (cropImageDim.w * newZoom - 300) / 2);
    const maxOffsetY = Math.max(0, (cropImageDim.h * newZoom - 300) / 2);
    setCropOffset(prev => ({
      x: Math.min(Math.max(prev.x, -maxOffsetX), maxOffsetX),
      y: Math.min(Math.max(prev.y, -maxOffsetY), maxOffsetY)
    }));
  };

  const handleWheel = (e) => {
    const zoomStep = 0.05;
    let newZoom = cropZoom + (e.deltaY < 0 ? zoomStep : -zoomStep);
    newZoom = Math.min(Math.max(newZoom, 1), 3);
    handleZoomChange(newZoom);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropOffset.x, y: e.clientY - cropOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    const maxOffsetX = Math.max(0, (cropImageDim.w * cropZoom - 300) / 2);
    const maxOffsetY = Math.max(0, (cropImageDim.h * cropZoom - 300) / 2);
    setCropOffset({
      x: Math.min(Math.max(newX, -maxOffsetX), maxOffsetX),
      y: Math.min(Math.max(newY, -maxOffsetY), maxOffsetY)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX - cropOffset.x, y: e.touches[0].clientY - cropOffset.y });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const newX = e.touches[0].clientX - dragStart.x;
    const newY = e.touches[0].clientY - dragStart.y;
    const maxOffsetX = Math.max(0, (cropImageDim.w * cropZoom - 300) / 2);
    const maxOffsetY = Math.max(0, (cropImageDim.h * cropZoom - 300) / 2);
    setCropOffset({
      x: Math.min(Math.max(newX, -maxOffsetX), maxOffsetX),
      y: Math.min(Math.max(newY, -maxOffsetY), maxOffsetY)
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCropSave = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 400, 400);

    const img = new Image();
    img.src = cropImageSrc;
    img.onload = () => {
      const viewToCanvas = 400 / 300;
      ctx.save();
      ctx.translate(200 + cropOffset.x * viewToCanvas, 200 + cropOffset.y * viewToCanvas);
      ctx.scale(cropZoom, cropZoom);
      const drawW = cropImageDim.w * viewToCanvas;
      const drawH = cropImageDim.h * viewToCanvas;
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.95);
      updateProfile({ photo: croppedDataUrl });
      setCropImageSrc(null);
      flash('Profile photo updated & cropped!');
    };
  };

  const flash = (msg) => { setSaved(msg); setTimeout(() => setSaved(''), 2000); };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(user, pass)) { setErr(''); } else { setErr('Access Denied'); }
  };

  const renderProfile = () => (
    <div>
      <Field label="Full Name" value={data.profile.name} onChange={v => updateProfile({ name: v })} />
      <Field label="First Name (Display)" value={data.profile.firstName} onChange={v => updateProfile({ firstName: v })} />
      <Field label="Last Name (Display)" value={data.profile.lastName} onChange={v => updateProfile({ lastName: v })} />
      <Field label="Email" value={data.profile.email} onChange={v => updateProfile({ email: v })} />
      <Field label="Contact Form Delivery Email" value={data.profile.contactEmail || ''} onChange={v => updateProfile({ contactEmail: v })} />
      <Field label="Short Profile Bio (Hero / Teaser)" value={data.profile.bio} onChange={v => updateProfile({ bio: v })} textarea />
      <Field label="Detailed About Me Bio" value={data.profile.aboutBio || ''} onChange={v => updateProfile({ aboutBio: v })} textarea />
      <Field label="Location" value={data.profile.location} onChange={v => updateProfile({ location: v })} />
      <Field label="GitHub URL" value={data.profile.github} onChange={v => updateProfile({ github: v })} />
      <Field label="GitHub Username" value={data.profile.githubUsername} onChange={v => updateProfile({ githubUsername: v })} />
      <Field label="LinkedIn URL" value={data.profile.linkedin} onChange={v => updateProfile({ linkedin: v })} />
      <Field label="LinkedIn Username" value={data.profile.linkedinUsername} onChange={v => updateProfile({ linkedinUsername: v })} />
      <Field label="Photo URL (path)" value={data.profile.photo} onChange={v => updateProfile({ photo: v })} />
      <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
        <label className="text-cyber-green/60 text-[10px] font-mono mb-2 block uppercase">Or Upload New Photo directly</label>
        <input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            if (file.size > 2 * 1024 * 1024) return alert("File too large! Must be under 2MB.");
            const reader = new FileReader();
            reader.onload = (ev) => {
              setCropImageSrc(ev.target.result);
              e.target.value = '';
            };
            reader.readAsDataURL(file);
          }
        }} className="text-xs text-gray-400 w-full file:mr-4 file:py-1.5 file:px-3 file:rounded file:border file:border-cyber-green/20 file:text-xs file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer" />
      </div>
      <Field label="Resume URL (path)" value={data.profile.resumeUrl} onChange={v => updateProfile({ resumeUrl: v })} />
      <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
        <div className="flex justify-between items-center mb-2">
          <label className="text-cyber-green/60 text-[10px] font-mono uppercase">Or Upload Resume PDF directly</label>
          {data.profile.resumeUrl && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to clear the current resume?')) {
                  updateProfile({ resumeUrl: '' });
                  flash('Resume cleared!');
                }
              }}
              className="text-[9px] font-mono text-cyber-red/80 hover:text-cyber-red"
            >
              [Clear Resume]
            </button>
          )}
        </div>
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              if (file.size > 3 * 1024 * 1024) return alert("File too large! Must be under 3MB.");
              const reader = new FileReader();
              reader.onload = (ev) => {
                updateProfile({ resumeUrl: ev.target.result });
                flash('Resume uploaded!');
              };
              reader.readAsDataURL(file);
            }
          }}
          className="text-xs text-gray-400 w-full file:mr-4 file:py-1.5 file:px-3 file:rounded file:border file:border-cyber-green/20 file:text-xs file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer"
        />
        {data.profile.resumeUrl && (
          <p className="text-[10px] font-mono text-cyber-green/60 mt-2 truncate">
            Current: {data.profile.resumeUrl.startsWith('data:') ? 'Uploaded PDF Document (Base64)' : data.profile.resumeUrl}
          </p>
        )}
      </div>
      <p className="text-gray-600 text-[10px] font-mono mt-2">Tip: To use external files, paste a URL (like Google Drive or Imgur link).</p>
      
      <h4 className="text-cyber-green text-xs font-mono mt-4 mb-2">RESUME CONFIGURATION OPTIONS:</h4>
      <Field label="Resume Format (e.g. PDF)" value={data.profile.resumeFormat || ''} onChange={v => updateProfile({ resumeFormat: v })} />
      <Field label="Resume Status (e.g. Latest Version)" value={data.profile.resumeStatus || ''} onChange={v => updateProfile({ resumeStatus: v })} />
      <Field label="Resume Updated Year (e.g. 2026)" value={data.profile.resumeUpdated || ''} onChange={v => updateProfile({ resumeUpdated: v })} />

      <h4 className="text-cyber-green text-xs font-mono mt-4 mb-2">QUICK INFO FOCUS:</h4>
      <Field label="About Me Focus" value={data.profile.focus || ''} onChange={v => updateProfile({ focus: v })} />
      <Field label="About Me Status" value={data.profile.status || ''} onChange={v => updateProfile({ status: v })} />
      <Field label="Timezone" value={data.profile.timezone || ''} onChange={v => updateProfile({ timezone: v })} />

      <h4 className="text-cyber-green text-xs font-mono mt-4 mb-2">ABOUT ME INTERESTS / FOCUS AREAS:</h4>
      {(data.profile.interests || []).map((interest, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input value={interest} onChange={e => { 
            const newInterests = [...(data.profile.interests || [])]; 
            newInterests[i] = e.target.value; 
            updateProfile({ interests: newInterests }); 
          }}
            className="flex-1 px-3 py-1.5 bg-cyber-darker border border-cyber-green/20 rounded text-gray-200 font-mono text-xs outline-none focus:border-cyber-green" />
          <button type="button" onClick={() => {
            const newInterests = data.profile.interests.filter((_, j) => j !== i);
            updateProfile({ interests: newInterests });
          }} className="text-cyber-red/60 hover:text-cyber-red text-xs px-2"><FiTrash2 /></button>
        </div>
      ))}
      <button type="button" onClick={() => {
        const newInterests = [...(data.profile.interests || []), 'New Interest'];
        updateProfile({ interests: newInterests });
      }} className="text-cyber-green/60 hover:text-cyber-green text-xs font-mono flex items-center gap-1 mt-1 mb-4"><FiPlus /> Add Interest</button>

      <h4 className="text-cyber-green text-xs font-mono mt-4 mb-2">TYPING ROLES:</h4>
      {data.roles.map((r, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input value={r} onChange={e => { const nr = [...data.roles]; nr[i] = e.target.value; updateRoles(nr); }}
            className="flex-1 px-3 py-1.5 bg-cyber-darker border border-cyber-green/20 rounded text-gray-200 font-mono text-xs outline-none focus:border-cyber-green" />
          <button onClick={() => updateRoles(data.roles.filter((_, j) => j !== i))} className="text-cyber-red/60 hover:text-cyber-red text-xs px-2"><FiTrash2 /></button>
        </div>
      ))}
      <button onClick={() => updateRoles([...data.roles, 'New Role'])} className="text-cyber-green/60 hover:text-cyber-green text-xs font-mono flex items-center gap-1 mt-1"><FiPlus /> Add Role</button>
      <button onClick={() => flash('Profile saved!')} className="cyber-btn cyber-btn-primary w-full mt-4 flex items-center justify-center gap-2 text-xs"><FiSave /> {saved === 'Profile saved!' ? '✓ Saved!' : 'Save Profile'}</button>
    </div>
  );

  const renderTimelineTab = () => (
    <div className="space-y-6">
      {/* 1. Core Profile Education */}
      <div className="p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
        <h4 className="text-cyber-green text-xs font-mono mb-3 uppercase tracking-wider">🎓 Core Profile Education</h4>
        <Field label="Degree" value={data.education.degree} onChange={v => updateEducation({ degree: v })} />
        <Field label="College" value={data.education.college} onChange={v => updateEducation({ college: v })} />
        <Field label="University" value={data.education.university} onChange={v => updateEducation({ university: v })} />
        <Field label="CGPA" value={data.education.cgpa} onChange={v => updateEducation({ cgpa: v })} />
        <button onClick={() => flash('Core Education saved!')} className="cyber-btn cyber-btn-primary w-full mt-2 flex items-center justify-center gap-2 text-xs"><FiSave /> {saved === 'Core Education saved!' ? '✓ Saved!' : 'Save Core Education'}</button>
      </div>

      {/* 2. Internship Experience List */}
      <div className="pt-6 border-t border-cyber-green/10">
        <h4 className="text-cyber-green text-xs font-mono mb-3 uppercase tracking-wider">💼 Internship Experiences</h4>
        {(data.experiences || []).map((exp) => (
          <div key={exp.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
            <div className="flex justify-between items-start mb-2">
              <span className="text-white text-xs font-bold truncate flex-1">{exp.title} at {exp.company}</span>
              <button onClick={() => removeExperience(exp.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
            </div>
            <Field label="Job/Internship Title" value={exp.title} onChange={v => updateExperience(exp.id, { title: v })} />
            <Field label="Company Name" value={exp.company} onChange={v => updateExperience(exp.id, { company: v })} />
            <Field label="Details / Location" value={exp.details} onChange={v => updateExperience(exp.id, { details: v })} />
            <Field label="Year / Date Range" value={exp.year} onChange={v => updateExperience(exp.id, { year: v })} />
            <Field label="Description" value={exp.desc} onChange={v => updateExperience(exp.id, { desc: v })} textarea />
            <Field label="Certificate PDF URL" value={exp.certUrl || ''} onChange={v => updateExperience(exp.id, { certUrl: v })} />
            <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
              <div className="flex justify-between items-center mb-2">
                <label className="text-cyber-green/60 text-[10px] font-mono uppercase">Or Upload Certificate PDF</label>
                {exp.certUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Clear this certificate?')) {
                        updateExperience(exp.id, { certUrl: '' });
                        flash('Certificate cleared!');
                      }
                    }}
                    className="text-[9px] font-mono text-cyber-red/80 hover:text-cyber-red"
                  >
                    [Clear]
                  </button>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (file.size > 1.5 * 1024 * 1024) return alert("File too large! Must be under 1.5MB.");
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      updateExperience(exp.id, { certUrl: ev.target.result });
                      flash('Certificate uploaded!');
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-[9px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-cyber-green/20 file:text-[9px] file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer w-full"
              />
              {exp.certUrl && (
                <p className="text-[9px] font-mono text-cyber-green/60 mt-1.5 truncate">
                  Current: {exp.certUrl.startsWith('data:') ? 'Uploaded PDF (Base64)' : exp.certUrl}
                </p>
              )}
            </div>
            <IconEditor
              icon={exp.icon}
              onChange={v => updateExperience(exp.id, { icon: v })}
              color={exp.color}
              onColorChange={v => updateExperience(exp.id, { color: v })}
            />
          </div>
        ))}
        <button onClick={() => addExperience({ title: 'New Internship', company: 'Company Name', details: '(Location)', year: 'Month Year - Month Year', desc: 'Describe responsibilities', icon: '🛡️', color: '#00ff41', certUrl: '' })}
          className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Internship Experience</button>
      </div>

      {/* 3. Education Milestones List */}
      <div className="pt-6 border-t border-cyber-green/10">
        <h4 className="text-cyber-green text-xs font-mono mb-3 uppercase tracking-wider">🏫 Education Timeline Milestones</h4>
        {(data.educationList || []).map((edu) => (
          <div key={edu.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
            <div className="flex justify-between items-start mb-2">
              <span className="text-white text-xs font-bold truncate flex-1">{edu.title}</span>
              <button onClick={() => removeEducationItem(edu.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
            </div>
            <Field label="Degree / Standard" value={edu.title} onChange={v => updateEducationItem(edu.id, { title: v })} />
            <Field label="School / College Name" value={edu.school} onChange={v => updateEducationItem(edu.id, { school: v })} />
            <Field label="Year Range" value={edu.year} onChange={v => updateEducationItem(edu.id, { year: v })} />
            <Field label="Description" value={edu.desc} onChange={v => updateEducationItem(edu.id, { desc: v })} textarea />
            
            <IconEditor
              icon={edu.icon}
              onChange={v => updateEducationItem(edu.id, { icon: v })}
              color={edu.color}
              onColorChange={v => updateEducationItem(edu.id, { color: v })}
            />
          </div>
        ))}
        <button onClick={() => addEducationItem({ title: 'New School/Degree', school: 'School Name', year: '2023 - Present', desc: 'Coursework details', icon: '🎓', color: '#00e5ff' })}
          className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Education Milestone</button>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div>
      {data.skills.map((cat) => (
        <div key={cat.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
          <div className="flex items-center justify-between mb-2">
            <input value={cat.title} onChange={e => updateSkillCategory(cat.id, { title: e.target.value })}
              className="bg-transparent border-b border-cyber-green/20 text-white text-sm font-bold outline-none focus:border-cyber-green w-48" />
            <div className="flex items-center gap-2">
              <select value={cat.color} onChange={e => updateSkillCategory(cat.id, { color: e.target.value })}
                className="bg-cyber-darker border border-cyber-green/20 rounded text-xs text-gray-300 px-1 py-0.5 outline-none">
                {COLORS.map(c => <option key={c} value={c} style={{ color: c }}>{c}</option>)}
              </select>
              <button onClick={() => removeSkillCategory(cat.id)} className="text-cyber-red/60 hover:text-cyber-red"><FiTrash2 size={12} /></button>
            </div>
          </div>
          {cat.skills.map((sk, si) => (
            <div key={si} className="flex gap-2 mb-1.5">
              <input value={sk.name} onChange={e => { const ns = [...cat.skills]; ns[si] = { ...ns[si], name: e.target.value }; updateSkillCategory(cat.id, { skills: ns }); }}
                className="flex-1 px-2 py-1 bg-cyber-darker border border-cyber-green/15 rounded text-gray-300 font-mono text-xs outline-none focus:border-cyber-green" placeholder="Skill name" />
              <input type="number" min="0" max="100" value={sk.level} onChange={e => { const ns = [...cat.skills]; ns[si] = { ...ns[si], level: parseInt(e.target.value) || 0 }; updateSkillCategory(cat.id, { skills: ns }); }}
                className="w-14 px-2 py-1 bg-cyber-darker border border-cyber-green/15 rounded text-gray-300 font-mono text-xs outline-none focus:border-cyber-green text-center" />
              <button onClick={() => { const ns = cat.skills.filter((_, j) => j !== si); updateSkillCategory(cat.id, { skills: ns }); }}
                className="text-cyber-red/40 hover:text-cyber-red"><FiTrash2 size={10} /></button>
            </div>
          ))}
          <button onClick={() => updateSkillCategory(cat.id, { skills: [...cat.skills, { name: 'New Skill', level: 70 }] })}
            className="text-cyber-green/50 hover:text-cyber-green text-[10px] font-mono flex items-center gap-1 mt-1"><FiPlus /> Add Skill</button>
        </div>
      ))}
      <button onClick={() => addSkillCategory({ title: 'New Category', color: '#00ff41', skills: [{ name: 'Skill 1', level: 70 }] })}
        className="cyber-btn w-full mt-2 flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Category</button>
    </div>
  );

  const renderProjects = () => (
    <div>
      {data.projects.map((p) => (
        <div key={p.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
          <div className="flex justify-between items-start mb-2">
            <span className="text-white text-xs font-bold truncate flex-1">{p.title}</span>
            <button onClick={() => removeProject(p.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
          </div>
          <Field label="Title" value={p.title} onChange={v => updateProject(p.id, { title: v })} />
          <Field label="Project Subtitle (e.g. Security Project)" value={p.subtitle || ''} onChange={v => updateProject(p.id, { subtitle: v })} />
          <Field label="Description" value={p.description} onChange={v => updateProject(p.id, { description: v })} textarea />
          <Field label="GitHub URL" value={p.github} onChange={v => updateProject(p.id, { github: v })} />
          <Field label="Tags (comma separated)" value={p.tags.join(', ')} onChange={v => updateProject(p.id, { tags: v.split(',').map(t => t.trim()).filter(Boolean) })} />
          <Field label="Highlights (comma separated)" value={p.highlights.join(', ')} onChange={v => updateProject(p.id, { highlights: v.split(',').map(t => t.trim()).filter(Boolean) })} />
          <div className="flex items-center gap-2">
            <label className="text-cyber-green/60 text-[10px] font-mono">COLOR:</label>
            <select value={p.color} onChange={e => updateProject(p.id, { color: e.target.value })}
              className="bg-cyber-darker border border-cyber-green/20 rounded text-xs text-gray-300 px-2 py-1 outline-none">
              {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      ))}
      <button onClick={() => addProject({ title: 'New Project', subtitle: 'Security Project', description: 'Project description here', github: 'https://github.com/', tags: ['Tag1'], highlights: ['Highlight 1'], color: '#00ff41' })}
        className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add New Project</button>
    </div>
  );

  const renderCerts = () => (
    <div>
      {data.certifications.map((c) => (
        <div key={c.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
          <div className="flex justify-between items-start mb-2">
            <span className="text-white text-xs font-bold truncate flex-1">{c.title}</span>
            <button onClick={() => removeCertification(c.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
          </div>
          <Field label="Title" value={c.title} onChange={v => updateCertification(c.id, { title: v })} />
          <Field label="Issuer" value={c.issuer} onChange={v => updateCertification(c.id, { issuer: v })} />
          <Field label="File URL (path)" value={c.file || ''} onChange={v => updateCertification(c.id, { file: v })} />
          <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
            <div className="flex justify-between items-center mb-2">
              <label className="text-cyber-green/60 text-[10px] font-mono uppercase">Or Upload Certificate PDF</label>
              {c.file && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Clear this certificate?')) {
                      updateCertification(c.id, { file: '' });
                      flash('Certificate cleared!');
                    }
                  }}
                  className="text-[9px] font-mono text-cyber-red/80 hover:text-cyber-red"
                >
                  [Clear]
                </button>
              )}
            </div>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 1.5 * 1024 * 1024) return alert("File too large! Must be under 1.5MB.");
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    updateCertification(c.id, { file: ev.target.result });
                    flash('Certificate uploaded!');
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="text-[9px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-cyber-green/20 file:text-[9px] file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer w-full"
            />
            {c.file && (
              <p className="text-[9px] font-mono text-cyber-green/60 mt-1.5 truncate">
                Current: {c.file.startsWith('data:') ? 'Uploaded PDF (Base64)' : c.file}
              </p>
            )}
          </div>
          <IconEditor
            icon={c.icon}
            onChange={v => updateCertification(c.id, { icon: v })}
            color={c.color}
            onColorChange={v => updateCertification(c.id, { color: v })}
          />
        </div>
      ))}
      <button onClick={() => addCertification({ title: 'New Certificate', issuer: 'Issuer', icon: '📜', color: '#00ff41', file: '' })}
        className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Certificate</button>
      <p className="text-gray-600 text-[10px] font-mono mt-2">Tip: Put PDF files in public/assets/ and use /assets/filename.pdf</p>
    </div>
  );

  const renderAchievements = () => (
    <div>
      {data.achievements.map((a, i) => (
        <div key={a.id} className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50 flex gap-3 items-end">
          <div className="flex-1">
            <Field label="Label" value={a.label} onChange={v => { const na = [...data.achievements]; na[i] = { ...na[i], label: v }; updateAchievements(na); }} />
          </div>
          <div className="w-16">
            <Field label="Number" value={String(a.number)} onChange={v => { const na = [...data.achievements]; na[i] = { ...na[i], number: parseInt(v) || 0 }; updateAchievements(na); }} />
          </div>
          <div className="w-12">
            <Field label="Suffix" value={a.suffix} onChange={v => { const na = [...data.achievements]; na[i] = { ...na[i], suffix: v }; updateAchievements(na); }} />
          </div>
          <label className="flex items-center gap-1 text-[10px] text-gray-400 font-mono mb-3">
            <input type="checkbox" checked={!!a.isText} onChange={e => { const na = [...data.achievements]; na[i] = { ...na[i], isText: e.target.checked }; updateAchievements(na); }} className="accent-cyber-green" />
            Text
          </label>
        </div>
      ))}
    </div>
  );

  const renderBlogs = () => (
    <div>
      {(data.blogs || []).map((b) => (
        <div key={b.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
          <div className="flex justify-between items-start mb-2">
            <span className="text-white text-xs font-bold truncate flex-1">{b.title}</span>
            <button onClick={() => removeBlog(b.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
          </div>
          <Field label="Title" value={b.title} onChange={v => updateBlog(b.id, { title: v })} />
          <Field label="Excerpt" value={b.excerpt} onChange={v => updateBlog(b.id, { excerpt: v })} textarea />
          <Field label="Category" value={b.category} onChange={v => updateBlog(b.id, { category: v })} />
          <Field label="Date (YYYY-MM-DD)" value={b.date} onChange={v => updateBlog(b.id, { date: v })} />
          <Field label="Tags (comma separated)" value={b.tags.join(', ')} onChange={v => updateBlog(b.id, { tags: v.split(',').map(t => t.trim()).filter(Boolean) })} />
          <Field label="Markdown Content" value={b.content} onChange={v => updateBlog(b.id, { content: v })} textarea />
        </div>
      ))}
      <button onClick={() => addBlog({ title: 'New Blog Post', excerpt: 'Brief description here', category: 'CTF Write-up', date: new Date().toISOString().split('T')[0], tags: ['Security'], content: '### Write-up Title\n\nContent details here.' })}
        className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add New Blog</button>
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-cyber-green text-xs font-mono mb-3 uppercase tracking-wider">🛠 HACKATHONS</h4>
        {(data.hackathons || []).map((h) => (
          <div key={h.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
            <div className="flex justify-between items-start mb-2">
              <span className="text-white text-xs font-bold truncate flex-1">{h.title}</span>
              <button onClick={() => removeHackathon(h.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
            </div>
            <Field label="Title" value={h.title} onChange={v => updateHackathon(h.id, { title: v })} />
            <Field label="Role" value={h.role} onChange={v => updateHackathon(h.id, { role: v })} />
            <Field label="Year" value={h.year} onChange={v => updateHackathon(h.id, { year: v })} />
            <Field label="Description" value={h.desc} onChange={v => updateHackathon(h.id, { desc: v })} textarea />
            <Field label="Certificate PDF URL" value={h.certUrl || ''} onChange={v => updateHackathon(h.id, { certUrl: v })} />
            <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
              <div className="flex justify-between items-center mb-2">
                <label className="text-cyber-green/60 text-[10px] font-mono uppercase">Or Upload Certificate PDF</label>
                {h.certUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Clear this certificate?')) {
                        updateHackathon(h.id, { certUrl: '' });
                        flash('Certificate cleared!');
                      }
                    }}
                    className="text-[9px] font-mono text-cyber-red/80 hover:text-cyber-red"
                  >
                    [Clear]
                  </button>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (file.size > 1.5 * 1024 * 1024) return alert("File too large! Must be under 1.5MB.");
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      updateHackathon(h.id, { certUrl: ev.target.result });
                      flash('Certificate uploaded!');
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-[9px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-cyber-green/20 file:text-[9px] file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer w-full"
              />
              {h.certUrl && (
                <p className="text-[9px] font-mono text-cyber-green/60 mt-1.5 truncate">
                  Current: {h.certUrl.startsWith('data:') ? 'Uploaded PDF (Base64)' : h.certUrl}
                </p>
              )}
            </div>
            <IconEditor
              icon={h.icon}
              onChange={v => updateHackathon(h.id, { icon: v })}
              color={h.color}
              onColorChange={v => updateHackathon(h.id, { color: v })}
            />
          </div>
        ))}
        <button onClick={() => addHackathon({ title: 'New Hackathon', role: 'Role', year: new Date().getFullYear().toString(), desc: 'Brief description here', color: '#00ff41', icon: '🏆', certUrl: '' })}
          className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Hackathon</button>
      </div>

      <div className="pt-6 border-t border-cyber-green/10">
        <h4 className="text-cyber-green text-xs font-mono mb-3 uppercase tracking-wider">👥 LEADERSHIP & VOLUNTEERING</h4>
        {(data.leadership || []).map((l) => (
          <div key={l.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
            <div className="flex justify-between items-start mb-2">
              <span className="text-white text-xs font-bold truncate flex-1">{l.title}</span>
              <button onClick={() => removeLeadership(l.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
            </div>
            <Field label="Title" value={l.title} onChange={v => updateLeadership(l.id, { title: v })} />
            <Field label="Organization" value={l.organization} onChange={v => updateLeadership(l.id, { organization: v })} />
            <Field label="Year" value={l.year} onChange={v => updateLeadership(l.id, { year: v })} />
            <Field label="Description" value={l.desc} onChange={v => updateLeadership(l.id, { desc: v })} textarea />
            
            <IconEditor
              icon={l.icon}
              onChange={v => updateLeadership(l.id, { icon: v })}
              color={l.color}
              onColorChange={v => updateLeadership(l.id, { color: v })}
            />
          </div>
        ))}
        <button onClick={() => addLeadership({ title: 'New Volunteer Work', organization: 'Organization', year: new Date().getFullYear().toString(), desc: 'Brief description here', color: '#8b5cf6', icon: '👥' })}
          className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Volunteer</button>
      </div>

      <div className="pt-6 border-t border-cyber-green/10">
        <h4 className="text-cyber-green text-xs font-mono mb-3 uppercase tracking-wider">🏆 ACADEMIC HONORS & AWARDS</h4>
        {(data.achievementsText || []).map((at) => (
          <div key={at.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
            <div className="flex justify-between items-start mb-2">
              <span className="text-white text-xs font-bold truncate flex-1">{at.title}</span>
              <button onClick={() => removeAchievementText(at.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
            </div>
            <Field label="Title" value={at.title} onChange={v => updateAchievementText(at.id, { title: v })} />
            <Field label="Organization" value={at.organization} onChange={v => updateAchievementText(at.id, { organization: v })} />
            <Field label="Year" value={at.year} onChange={v => updateAchievementText(at.id, { year: v })} />
            <Field label="Description" value={at.desc} onChange={v => updateAchievementText(at.id, { desc: v })} textarea />
            <Field label="Certificate PDF URL" value={at.certUrl || ''} onChange={v => updateAchievementText(at.id, { certUrl: v })} />
            <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
              <div className="flex justify-between items-center mb-2">
                <label className="text-cyber-green/60 text-[10px] font-mono uppercase">Or Upload Certificate PDF</label>
                {at.certUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Clear this certificate?')) {
                        updateAchievementText(at.id, { certUrl: '' });
                        flash('Certificate cleared!');
                      }
                    }}
                    className="text-[9px] font-mono text-cyber-red/80 hover:text-cyber-red"
                  >
                    [Clear]
                  </button>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (file.size > 1.5 * 1024 * 1024) return alert("File too large! Must be under 1.5MB.");
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      updateAchievementText(at.id, { certUrl: ev.target.result });
                      flash('Certificate uploaded!');
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-[9px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-cyber-green/20 file:text-[9px] file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer w-full"
              />
              {at.certUrl && (
                <p className="text-[9px] font-mono text-cyber-green/60 mt-1.5 truncate">
                  Current: {at.certUrl.startsWith('data:') ? 'Uploaded PDF (Base64)' : at.certUrl}
                </p>
              )}
            </div>
            <IconEditor
              icon={at.icon}
              onChange={v => updateAchievementText(at.id, { icon: v })}
              color={at.color}
              onColorChange={v => updateAchievementText(at.id, { color: v })}
            />
          </div>
        ))}
        <button onClick={() => addAchievementText({ title: 'New Award', organization: 'Institution', year: new Date().getFullYear().toString(), desc: 'Brief description here', color: '#f59e0b', icon: '🥇', certUrl: '' })}
          className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Academic Honor</button>
      </div>
    </div>
  );

  const renderBootcamps = () => (
    <div>
      {(data.bootcamps || []).map((bc) => (
        <div key={bc.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
          <div className="flex justify-between items-start mb-2">
            <span className="text-white text-xs font-bold truncate flex-1">{bc.title}</span>
            <button onClick={() => removeBootcamp(bc.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
          </div>
          <Field label="Title" value={bc.title} onChange={v => updateBootcamp(bc.id, { title: v })} />
          <Field label="Organizer / Platform" value={bc.organizer} onChange={v => updateBootcamp(bc.id, { organizer: v })} />
          <Field label="Year" value={bc.year} onChange={v => updateBootcamp(bc.id, { year: v })} />
          <Field label="Description" value={bc.desc} onChange={v => updateBootcamp(bc.id, { desc: v })} textarea />
          <Field label="Certificate PDF URL" value={bc.certUrl || ''} onChange={v => updateBootcamp(bc.id, { certUrl: v })} />
          
          <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
            <div className="flex justify-between items-center mb-2">
              <label className="text-cyber-green/60 text-[10px] font-mono uppercase">Or Upload Certificate PDF</label>
              {bc.certUrl && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Clear this certificate?')) {
                      updateBootcamp(bc.id, { certUrl: '' });
                      flash('Certificate cleared!');
                    }
                  }}
                  className="text-[9px] font-mono text-cyber-red/80 hover:text-cyber-red"
                >
                  [Clear]
                </button>
              )}
            </div>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 1.5 * 1024 * 1024) return alert("File too large! Must be under 1.5MB.");
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    updateBootcamp(bc.id, { certUrl: ev.target.result });
                    flash('Certificate uploaded!');
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="text-[9px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-cyber-green/20 file:text-[9px] file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer w-full"
            />
            {bc.certUrl && (
              <p className="text-[9px] font-mono text-cyber-green/60 mt-1.5 truncate">
                Current: {bc.certUrl.startsWith('data:') ? 'Uploaded PDF (Base64)' : bc.certUrl}
              </p>
            )}
          </div>

          <IconEditor
            icon={bc.icon}
            onChange={v => updateBootcamp(bc.id, { icon: v })}
            color={bc.color}
            onColorChange={v => updateBootcamp(bc.id, { color: v })}
          />
        </div>
      ))}
      <button onClick={() => addBootcamp({ title: 'New Bootcamp/Workshop', organizer: 'Organizer', year: new Date().getFullYear().toString(), desc: 'Describe learnings and highlights', icon: '💻', color: '#00ff41', certUrl: '' })}
        className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Bootcamp / Workshop</button>
    </div>
  );

  const renderGallery = () => (
    <div>
      <h4 className="text-cyber-green text-xs font-mono mb-3 uppercase tracking-wider">🖼️ Achievements & Events Gallery</h4>
      {(data.gallery || []).map((g) => (
        <div key={g.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
          <div className="flex justify-between items-start mb-2">
            <span className="text-white text-xs font-bold truncate flex-1">{g.title || 'Untitled Image'}</span>
            <button onClick={() => removeGalleryItem(g.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
          </div>
          <Field label="Title" value={g.title} onChange={v => updateGalleryItem(g.id, { title: v })} />
          <Field label="Description" value={g.description} onChange={v => updateGalleryItem(g.id, { description: v })} textarea />
          <Field label="Category" value={g.category} onChange={v => updateGalleryItem(g.id, { category: v })} />
          <Field label="Date" value={g.date} onChange={v => updateGalleryItem(g.id, { date: v })} />
          <Field label="Image URL (path)" value={g.imageUrl} onChange={v => updateGalleryItem(g.id, { imageUrl: v })} />
          
          <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
            <div className="flex justify-between items-center mb-2">
              <label className="text-cyber-green/60 text-[10px] font-mono uppercase">Or Upload Image</label>
              {g.imageUrl && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Clear this image?')) {
                      updateGalleryItem(g.id, { imageUrl: '' });
                      flash('Image cleared!');
                    }
                  }}
                  className="text-[9px] font-mono text-cyber-red/80 hover:text-cyber-red"
                >
                  [Clear]
                </button>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 1024 * 1024) return alert("File too large! Must be under 1MB.");
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    updateGalleryItem(g.id, { imageUrl: ev.target.result });
                    flash('Image uploaded!');
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="text-[9px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-cyber-green/20 file:text-[9px] file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer w-full"
            />
            {g.imageUrl && (
              <div className="mt-2 flex items-center gap-2">
                <img src={g.imageUrl} alt="" className="w-12 h-12 object-cover rounded border border-cyber-green/30" />
                <p className="text-[9px] font-mono text-cyber-green/60 truncate flex-1">
                  {g.imageUrl.startsWith('data:') ? 'Uploaded Image (Base64)' : g.imageUrl}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      <button onClick={() => addGalleryItem({ title: 'New Photo', description: 'Describe this achievement or event photo', category: 'Achievements', date: new Date().getFullYear().toString(), imageUrl: '' })}
        className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Photo to Gallery</button>
    </div>
  );

  const renderSettings = () => (
    <div>
      <h4 className="text-cyber-green text-xs font-mono mb-3">CHANGE ADMIN CREDENTIALS</h4>
      <Field label="Username" value={data.admin.username} onChange={v => updateAdmin({ username: v })} />
      <Field label="Password" value={data.admin.password} onChange={v => updateAdmin({ password: v })} type="text" />
      <button onClick={() => flash('Credentials updated!')} className="cyber-btn cyber-btn-primary w-full mt-2 flex items-center justify-center gap-2 text-xs"><FiSave /> {saved === 'Credentials updated!' ? '✓ Updated!' : 'Update Credentials'}</button>
      
      <h4 className="text-cyber-green text-xs font-mono mb-3 mt-6">VISUAL INTERFACE THEME</h4>
      <div className="flex gap-2 mb-4">
        {['green', 'purple', 'blue', 'red'].map((t) => (
          <button
            key={t}
            onClick={() => { setTheme(t); flash(`Theme switched to ${t}`); }}
            className={`px-3 py-1.5 text-[10px] font-mono rounded border capitalize transition-all ${
              theme === t
                ? 'bg-cyber-green/15 border-cyber-green text-cyber-green'
                : 'bg-cyber-darker border-cyber-green/10 text-gray-500 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <h4 className="text-cyber-green text-xs font-mono mb-3 mt-6">PORTFOLIO DATA ACTIONS</h4>
      <p className="text-[10px] text-gray-400 font-mono mb-3 leading-relaxed">
        Export your changes as a configuration file to save or copy them to your clipboard. You can restore your data by uploading a saved file.
      </p>
      <div className="space-y-2 mb-6">
        <button 
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "portfolio_data.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            flash('Downloaded portfolio_data.json!');
          }} 
          className="cyber-btn w-full flex items-center justify-center gap-2 text-xs border-cyber-green/40 text-cyber-green hover:bg-cyber-green/10"
        >
          <FiDownload /> Download Data Config (JSON)
        </button>

        <button 
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(data, null, 2))
              .then(() => {
                flash('Copied configuration to clipboard!');
              })
              .catch(err => {
                alert('Could not copy configuration: ' + err);
              });
          }} 
          className="cyber-btn w-full flex items-center justify-center gap-2 text-xs border-cyber-green/40 text-cyber-green hover:bg-cyber-green/10"
        >
          <FiCopy /> Copy Config JSON to Clipboard
        </button>

        <div className="p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
          <label className="text-cyber-green/60 text-[10px] font-mono mb-1 block uppercase">Import Data Config</label>
          <input
            type="file"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  try {
                    const parsed = JSON.parse(ev.target.result);
                    if (parsed && parsed.profile && parsed.education && parsed.skills) {
                      importData(parsed);
                      flash('Data config imported!');
                    } else {
                      alert('Invalid backup file! Missing required profile, education or skills fields.');
                    }
                  } catch (err) {
                    alert('Error parsing JSON backup file: ' + err.message);
                  }
                };
                reader.readAsText(file);
              }
            }}
            className="text-[9px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-cyber-green/20 file:text-[9px] file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer w-full"
          />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-cyber-red/20">
        <h4 className="text-cyber-red text-xs font-mono mb-3">DANGER ZONE</h4>
        <div className="space-y-2">
          <button 
            onClick={() => {
              if (confirm('Clear local cache? This will restore data to the server configuration file.')) {
                localStorage.removeItem('portfolio_full_data');
                window.location.reload();
              }
            }}
            className="cyber-btn w-full flex items-center justify-center gap-2 text-xs border-cyber-red/40 text-cyber-red hover:bg-cyber-red/10"
          >
            Clear Local Cache (Reload)
          </button>
          <button onClick={() => { if (confirm('Reset all data to defaults? This cannot be undone.')) { resetToDefault(); flash('Reset done!'); } }}
            className="cyber-btn w-full flex items-center justify-center gap-2 text-xs border-cyber-red/40 text-cyber-red hover:bg-cyber-red/10"><FiRefreshCw /> Reset to Default Data</button>
        </div>
      </div>
    </div>
  );

  const tabContent = { Profile: renderProfile, Timeline: renderTimelineTab, Skills: renderSkills, Projects: renderProjects, Certs: renderCerts, Achievements: renderAchievements, Gallery: renderGallery, Blogs: renderBlogs, Activities: renderActivities, Bootcamps: renderBootcamps, Settings: renderSettings };

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-[2000] w-10 h-10 flex items-center justify-center bg-cyber-darker border border-cyber-green/20 rounded-full text-cyber-green/40 hover:text-cyber-green hover:border-cyber-green/40 transition-all text-sm" id="admin-login-btn" title="Admin Panel">
        {isAdmin ? <FiSettings className="animate-spin-slow" /> : <FiLock />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/85 backdrop-blur-xl z-[50000] flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setOpen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/60 backdrop-blur-[25px] border border-cyber-green/30 rounded-xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-cyber-green/10 flex-shrink-0">
                <h3 className="font-display text-cyber-green text-sm tracking-wider">{isAdmin ? '⚙ ADMIN CONTROL PANEL' : '🔒 ADMIN LOGIN'}</h3>
                <div className="flex items-center gap-2">
                  {isAdmin && <button onClick={() => { logout(); }} className="text-xs text-gray-500 hover:text-cyber-red font-mono flex items-center gap-1"><FiLogOut /> Logout</button>}
                  <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white"><FiX /></button>
                </div>
              </div>

              {!isAdmin ? (
                /* Login Form */
                <form onSubmit={handleLogin} className="p-6 space-y-4">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-cyber-green/10 rounded-full border border-cyber-green/20"><FiLock className="text-cyber-green text-2xl" /></div>
                    <p className="text-gray-400 text-xs font-mono">Enter admin credentials to access controls</p>
                  </div>
                  <Field label="Username" value={user} onChange={setUser} />
                  <Field label="Password" value={pass} onChange={setPass} type="password" />
                  {err && <p className="text-cyber-red text-xs font-mono">{err}</p>}
                  <button type="submit" className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiLock /> Authenticate</button>
                </form>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex gap-1 px-3 pt-3 overflow-x-auto flex-shrink-0">
                    {TABS.map(t => (
                      <button key={t} onClick={() => setTab(t)}
                        className={`px-3 py-1.5 text-[10px] font-mono rounded-t-lg whitespace-nowrap transition-all ${tab === t ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/20 border-b-0' : 'text-gray-500 hover:text-gray-300'}`}>{t}</button>
                    ))}
                  </div>
                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-4 border-t border-cyber-green/10">
                    {saved && <div className="mb-3 px-3 py-2 bg-cyber-green/10 border border-cyber-green/20 rounded-lg text-cyber-green text-xs font-mono text-center">✓ {saved}</div>}
                    <p className="text-cyber-green/40 text-[10px] font-mono mb-3">{'>'} All changes update the site in real-time</p>
                    {tabContent[tab]?.()}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crop Modal */}
      <AnimatePresence>
        {cropImageSrc && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60000] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/60 backdrop-blur-[25px] border border-cyber-green/40 rounded-xl w-full max-w-sm flex flex-col overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5),0_0_50px_rgba(0,255,65,0.15)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-cyber-green/10">
                <h3 className="font-display text-cyber-green text-xs tracking-wider uppercase">⚔️ Crop Profile Picture</h3>
                <button 
                  onClick={() => setCropImageSrc(null)} 
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <FiX />
                </button>
              </div>

              {/* Viewport Area */}
              <div className="p-6 flex flex-col items-center justify-center bg-cyber-darker/50">
                <div 
                  className="w-[300px] h-[300px] relative overflow-hidden bg-black border border-cyber-green/20 rounded-lg cursor-move select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onWheel={handleWheel}
                >
                  {/* The actual image being dragged */}
                  <img
                    src={cropImageSrc}
                    alt="To Crop"
                    onLoad={handleImageLoad}
                    draggable={false}
                    className="absolute pointer-events-none origin-center max-w-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${cropOffset.x}px), calc(-50% + ${cropOffset.y}px)) scale(${cropZoom})`,
                      width: cropImageDim.w || 'auto',
                      height: cropImageDim.h || 'auto',
                    }}
                  />
                  {/* Viewport Cutout Overlay */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {/* Shadow masking out everything outside the circle */}
                    <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.6)]" />
                    {/* The circle highlight */}
                    <div className="w-[260px] h-[260px] rounded-full border-2 border-cyber-green shadow-[0_0_15px_rgba(0,255,65,0.4)] absolute" />
                  </div>
                </div>

                {/* Status / Instructions */}
                <span className="text-[10px] font-mono text-cyber-green/60 mt-3 uppercase tracking-wider">
                  Drag to Reposition • Scroll / Slide to Zoom
                </span>
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-cyber-green/10 space-y-4">
                {/* Zoom Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase text-gray-400">
                    <span>Zoom Level</span>
                    <span className="text-cyber-green">{cropZoom.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.01"
                    value={cropZoom}
                    onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                    className="w-full h-1 bg-cyber-darker rounded-lg appearance-none cursor-pointer accent-cyber-green border border-cyber-green/20"
                  />
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setCropImageSrc(null)}
                    className="px-4 py-2 border border-cyber-red/30 hover:border-cyber-red hover:bg-cyber-red/10 text-cyber-red font-mono text-xs rounded transition-all uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCropSave}
                    className="cyber-btn cyber-btn-primary flex items-center justify-center gap-2 text-xs py-2 uppercase"
                  >
                    Crop & Save
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
