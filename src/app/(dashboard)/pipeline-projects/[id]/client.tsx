'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AppCard } from '@/components/common/app-card';
import { AppButton } from '@/components/common/app-button';
import { 
  ChevronLeft, Plus, MoreVertical, Calendar, 
  CheckCircle2, Circle, Clock, ChevronDown, ChevronRight,
  Edit2, Trash2, UserPlus, Building2, MapPin, IndianRupee,
  TrendingUp, FolderKanban, Target, Users, ArrowUpRight,
  ListTodo, Layers, History
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// PrimeReact Styles
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import 'quill/dist/quill.snow.css'; // Add Quill's base CSS for proper toolbar rendering

// Dynamic import for Rich Text Editor (Client-side only)
const Editor = dynamic(() => import('primereact/editor').then(mod => mod.Editor), { ssr: false });

// ── Data ──────────────────────────────────────────────────────────────────────
const EMPLOYEES = [
  { id: 1, name: "Darpan Powale", avatar: "DP", role: "Lead Engineer", color: "#3b82f6" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", role: "Backend Dev", color: "#8b5cf6" },
  { id: 3, name: "Priya Patel", avatar: "PP", role: "Project Manager", color: "#ec4899" },
  { id: 4, name: "Amit Kumar", avatar: "AK", role: "Architect", color: "#f59e0b" },
];

const MILESTONES_DATA = [
  {
    id: "m1", title: "Project Initiation", description: "Initial project setup and scope definition",
    status: "completed", dueDate: "2026-03-15", progress: 100,
    tasks: [
      { id: "t1", title: "Kickoff Meeting", status: "completed", assignedTo: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" }, dueDate: "2026-03-10",
        subtasks: [
          { id: "st1_1", title: "Prepare presentation", status: "completed", assignedTo: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" } },
          { id: "st1_2", title: "Invite stakeholders", status: "completed", assignedTo: null }
        ]
      },
      { id: "t2", title: "Define Scope", status: "completed", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" }, dueDate: "2026-03-15",
        subtasks: [
          { id: "st2_1", title: "Draft scope document", status: "completed", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" } }
        ]
      }
    ]
  },
  {
    id: "m2", title: "Requirements Gathering", description: "Collect client needs and specifications",
    status: "completed", dueDate: "2026-04-10", progress: 100,
    tasks: [
      { id: "t3", title: "Stakeholder Interviews", status: "completed", assignedTo: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" }, dueDate: "2026-03-25",
        subtasks: [
          { id: "st3_1", title: "Conduct interview 1", status: "completed", assignedTo: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" } },
          { id: "st3_2", title: "Conduct interview 2", status: "completed", assignedTo: null }
        ]
      },
      { id: "t4", title: "Requirements Doc Approval", status: "completed", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" }, dueDate: "2026-04-10",
        subtasks: [
          { id: "st4_1", title: "Review with client", status: "completed", assignedTo: null },
          { id: "st4_2", title: "Get sign-off", status: "completed", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" } }
        ]
      }
    ]
  },
  {
    id: "m3", title: "Design Phase", description: "Translating requirements into visual prototypes and technical design documents. Finalizing UI/UX patterns and component library.",
    status: "in-progress", dueDate: "2026-05-15", progress: 60,
    tasks: [
      { id: "t5", title: "UI Design System", status: "completed", assignedTo: { name: "Amit Kumar", avatar: "AK", color: "#f59e0b" }, dueDate: "2026-04-30",
        subtasks: [
          { id: "st1", title: "Create color palette", status: "completed", assignedTo: { name: "Amit Kumar", avatar: "AK", color: "#f59e0b" } },
          { id: "st2", title: "Typography guidelines", status: "completed", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" } }
        ]
      },
      { id: "t6", title: "Mobile Prototypes", status: "pending", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" }, dueDate: "2026-05-15",
        subtasks: [
          { id: "st3", title: "Navigation flow", status: "pending", assignedTo: null },
          { id: "st4", title: "Dashboard screens", status: "pending", assignedTo: null }
        ]
      }
    ]
  },
  {
    id: "m4", title: "Frontend Architecture", description: "Setup client-side framework and define application architecture",
    status: "pending", dueDate: "2026-06-15", progress: 0,
    tasks: [
      { id: "t7", title: "Initialize Repository", status: "pending", assignedTo: null, dueDate: "2026-06-05",
        subtasks: [
          { id: "st7_1", title: "Setup Next.js", status: "pending", assignedTo: null },
          { id: "st7_2", title: "Configure Tailwind", status: "pending", assignedTo: null }
        ]
      },
      { id: "t8", title: "Component Structure Design", status: "pending", assignedTo: null, dueDate: "2026-06-15",
        subtasks: [
          { id: "st8_1", title: "Define standard folders", status: "pending", assignedTo: null }
        ]
      }
    ]
  },
  {
    id: "m5", title: "Backend Integration", description: "API development and database integration",
    status: "pending", dueDate: "2026-07-20", progress: 0,
    tasks: [
      { id: "t9", title: "Database Schema Setup", status: "pending", assignedTo: null, dueDate: "2026-07-01",
        subtasks: [
          { id: "st9_1", title: "Write migrations", status: "pending", assignedTo: null },
          { id: "st9_2", title: "Seed dummy data", status: "pending", assignedTo: null }
        ]
      },
      { id: "t10", title: "RESTful API Endpoints", status: "pending", assignedTo: null, dueDate: "2026-07-20",
        subtasks: [
          { id: "st10_1", title: "Auth endpoints", status: "pending", assignedTo: null },
          { id: "st10_2", title: "User endpoints", status: "pending", assignedTo: null }
        ]
      }
    ]
  },
  {
    id: "m6", title: "Quality Assurance", description: "End-to-end testing and bug fixing",
    status: "pending", dueDate: "2026-08-30", progress: 0,
    tasks: [
      { id: "t11", title: "Unit Testing Automation", status: "pending", assignedTo: null, dueDate: "2026-08-15",
        subtasks: [
          { id: "st11_1", title: "Setup Jest", status: "pending", assignedTo: null }
        ]
      },
      { id: "t12", title: "Regression Testing", status: "pending", assignedTo: null, dueDate: "2026-08-30",
        subtasks: [
          { id: "st12_1", title: "Run test suites", status: "pending", assignedTo: null }
        ]
      }
    ]
  },
  {
    id: "m7", title: "User Acceptance Testing", description: "Client review and UAT sign-off",
    status: "pending", dueDate: "2026-09-15", progress: 0,
    tasks: [
      { id: "t13", title: "Prepare UAT Environment", status: "pending", assignedTo: null, dueDate: "2026-09-05",
        subtasks: [
          { id: "st13_1", title: "Deploy staging", status: "pending", assignedTo: null }
        ]
      },
      { id: "t14", title: "Client Feedback Evaluation", status: "pending", assignedTo: null, dueDate: "2026-09-15",
        subtasks: [
          { id: "st14_1", title: "Compile issues list", status: "pending", assignedTo: null }
        ]
      }
    ]
  },
  {
    id: "m8", title: "Final Deployment", description: "Production release and project handover",
    status: "pending", dueDate: "2026-10-01", progress: 0,
    tasks: [
      { id: "t15", title: "Production Server Setup", status: "pending", assignedTo: null, dueDate: "2026-09-25",
        subtasks: [
          { id: "st15_1", title: "Provision resources", status: "pending", assignedTo: null }
        ]
      },
      { id: "t16", title: "Go-Live execution", status: "pending", assignedTo: null, dueDate: "2026-10-01",
        subtasks: [
          { id: "st16_1", title: "Push code to master", status: "pending", assignedTo: null },
          { id: "st16_2", title: "Monitor logs", status: "pending", assignedTo: null }
        ]
      }
    ]
  }
];

const MILESTONE_COLORS = ["#10b981", "#f59e0b", "#3b82f6"];

// ── Animation Variants ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { label: string; bg: string; text: string; dot: string; ring: string }> = {
  completed:   { label: "Completed",   bg: "#d1fae5", text: "#065f46", dot: "#10b981", ring: "#6ee7b7" },
  "in-progress": { label: "In Progress", bg: "#fef3c7", text: "#92400e", dot: "#f59e0b", ring: "#fcd34d" },
  pending:     { label: "Pending",     bg: "#f1f5f9", text: "#475569", dot: "#94a3b8", ring: "#cbd5e1" },
};

function StatusBadge({ status, small = false }: { status: string; small?: boolean }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: s.bg, color: s.text,
      borderRadius: 20, padding: small ? "2px 8px" : "3px 10px",
      fontSize: small ? 11 : 12, fontWeight: 600, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {s.label}
    </span>
  );
}

function Avatar({ person, size = 28 }: { person: { name: string; avatar: string; color: string } | null; size?: number }) {
  if (!person) return null;
  return (
    <div title={person.name} style={{
      width: size, height: size, borderRadius: "50%",
      background: person.color + "22", color: person.color,
      border: `2px solid ${person.color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, flexShrink: 0,
    }}>
      {person.avatar}
    </div>
  );
}

function AvatarGroup({ people, size = 26 }: { people: Array<{ name: string; avatar: string; color: string } | null>; size?: number }) {
  const filtered = people.filter(Boolean) as Array<{ name: string; avatar: string; color: string }>;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {filtered.map((p, i) => (
        <div key={i} style={{ marginLeft: i ? -8 : 0, zIndex: filtered.length - i }}>
          <Avatar person={p} size={size} />
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ value, color, height = 6, animate = false }: { value: number; color?: string; height?: number; animate?: boolean }) {
  const [width, setWidth] = useState(animate ? 0 : value);
  useState(() => {
    if (animate) setTimeout(() => setWidth(value), 100);
  });
  const c = color || (value === 100 ? "#10b981" : value >= 60 ? "#3b82f6" : value >= 30 ? "#f59e0b" : "#94a3b8");
  return (
    <div style={{ background: "#f1f5f9", borderRadius: 99, height, overflow: "hidden", width: "100%" }}>
      <div style={{
        height: "100%", borderRadius: 99,
        background: `linear-gradient(90deg, ${c}cc, ${c})`,
        width: `${width}%`, transition: "width 1s cubic-bezier(.4,0,.2,1)",
        boxShadow: `0 0 8px ${c}66`,
      }} />
    </div>
  );
}

// ── Note Dialog ─────────────────────────────────────────────────────────────
function NoteDialog({ 
  open, 
  onClose, 
  initialNote, 
  onSave,
  title
}: { 
  open: boolean; 
  onClose: () => void; 
  initialNote: string;
  onSave: (note: string) => void;
  title: string;
}) {
  const [mode, setMode] = useState<'read' | 'edit'>('read');
  const [noteText, setNoteText] = useState(initialNote);

  // Sync internal state when dialog opens
  useEffect(() => {
    if (open) {
      setNoteText(initialNote);
      setMode(initialNote ? 'read' : 'edit');
    }
  }, [open, initialNote]);

  const editorHeader = mode === 'edit' ? (
    <span className="ql-formats">
      <select className="ql-header" defaultValue="0">
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="0">Normal</option>
      </select>
      <select className="ql-font">
        <option value="sans-serif">Sans Serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
      </select>
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
      <button className="ql-strike" aria-label="Strike"></button>
      <select className="ql-color"></select>
      <select className="ql-background"></select>
      <select className="ql-align"></select>
      <button className="ql-list" value="ordered" aria-label="Ordered List"></button>
      <button className="ql-list" value="bullet" aria-label="Bullet List"></button>
      <button className="ql-link" aria-label="Insert Link"></button>
      <button className="ql-image" aria-label="Insert Image"></button>
      <button className="ql-code-block" aria-label="Insert Code Block"></button>
      <button className="ql-clean" aria-label="Remove Formatting"></button>
    </span>
  ) : null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[720px] rounded-[32px] p-0 border-none shadow-2xl overflow-hidden bg-white max-h-[90vh] flex flex-col">
        <div className="p-8 pb-4 flex items-start justify-between border-b border-slate-50 shrink-0">
          <div>
            <DialogTitle className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">
              {title}
            </DialogTitle>
            <p className="text-[13px] text-slate-500 font-medium uppercase tracking-wider mt-1 opacity-70">
              {mode === 'edit' ? 'Editing Note & Rich Formatting' : 'Viewing Task Observations'}
            </p>
          </div>
        </div>

        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar bg-slate-50/20">
          <motion.div 
            key={mode}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
          >
            {mode === 'read' ? (
              <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 min-h-[400px] relative group overflow-hidden shadow-sm">
                {/* Decorative background element */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <ListTodo className="w-56 h-56 rotate-12" />
                </div>
                
                {noteText ? (
                  <div 
                    className="text-[17px] text-slate-700 leading-relaxed relative z-10 prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-strong:text-teal-600 prose-strong:font-bold prose-a:text-teal-600 prose-ul:list-disc prose-ol:list-decimal"
                    dangerouslySetInnerHTML={{ __html: noteText }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                    <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
                      <ListTodo className="w-10 h-10 opacity-30" />
                    </div>
                    <p className="text-[16px] font-semibold text-slate-500">Empty Workspace</p>
                    <p className="text-[14px] text-slate-400 mt-1 mb-6">Start capturing your project details here.</p>
                    <button 
                      onClick={() => setMode('edit')}
                      className="px-6 py-2.5 bg-teal-50 text-teal-600 font-bold text-sm rounded-xl hover:bg-teal-100 transition-colors border border-teal-100/50"
                    >
                      Initialize Note
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="custom-editor-container h-full bg-white rounded-[24px] shadow-sm border border-slate-200/60 overflow-hidden">
                <Editor 
                  value={noteText}
                  onTextChange={(e) => setNoteText(e.htmlValue || "")}
                  style={{ height: '400px' }}
                  headerTemplate={editorHeader}
                  placeholder="Draft your detailed task notes..."
                />
              </div>
            )}
          </motion.div>
        </div>

        <div className="p-8 pt-0 border-t border-slate-50 bg-white shrink-0">
          <div className="flex items-center gap-3">
            {mode === 'read' ? (
              <>
                <button 
                  onClick={() => setMode('edit')}
                  className="flex-1 py-4 bg-teal-500 text-white rounded-2xl text-[15px] font-bold hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/25 active:scale-[0.98]"
                >
                  {noteText ? 'Edit Note' : 'Add First Note'}
                </button>
                <button 
                  onClick={onClose}
                  className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[15px] font-bold hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    onSave(noteText);
                    setMode('read');
                  }}
                  className="flex-1 py-4 bg-teal-500 text-white rounded-2xl text-[15px] font-bold hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/25 active:scale-[0.98]"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => {
                    if (initialNote) {
                      setNoteText(initialNote);
                      setMode('read');
                    } else {
                      onClose();
                    }
                  }}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[15px] font-bold hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Assign Dialog ─────────────────────────────────────────────────────────────
function AssignDialog({ open, onClose, onAssign }: { open: boolean; onClose: () => void; onAssign: (emp: typeof EMPLOYEES[0]) => void }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "relative", background: "#fff", borderRadius: 16,
        padding: "28px 24px", width: 360, boxShadow: "0 24px 48px rgba(15,23,42,0.18)",
        border: "1px solid #e2e8f0",
      }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: "#0f172a" }}>Assign Employee</h3>
        <p style={{ margin: "0 0 20px", fontSize: 13, color: "#64748b" }}>Choose a team member to assign this task</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {EMPLOYEES.map(emp => (
            <button key={emp.id} onClick={() => onAssign(emp)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
              border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff",
              cursor: "pointer", textAlign: "left", transition: "all .15s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#f8fafc"; (e.currentTarget as HTMLButtonElement).style.borderColor = emp.color; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0"; }}
            >
              <Avatar person={emp} size={36} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{emp.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{emp.role}</div>
              </div>
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, width: 28, height: 28,
          background: "#f1f5f9", border: "none", borderRadius: 8,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, color: "#64748b",
        }}>×</button>
      </div>
    </div>
  );
}

// ── Sub-task Row ──────────────────────────────────────────────────────────────
function SubtaskRow({ subtask, onAssign, onOpenNote }: { 
  subtask: any; 
  onAssign: () => void;
  onOpenNote: () => void;
}) {
  const isCompleted = subtask.status === "completed";
  
  return (
    <div className="flex flex-col bg-slate-50/50 border-t border-slate-100 group">
      <div className="flex items-center justify-between py-3 px-4 pl-[52px]">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
            isCompleted ? "bg-teal-500 text-white" : "border-2 border-slate-300 bg-white"
          )}>
            {isCompleted && (
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <span className={cn(
            "text-[14px] font-medium transition-colors",
            isCompleted ? "text-slate-400 line-through" : "text-slate-600"
          )}>
            {subtask.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Note Icon */}
          <button 
            onClick={onOpenNote}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              subtask.note ? "text-teal-600 bg-teal-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            )}
            title={subtask.note ? "View Note" : "Add Note"}
          >
            <ListTodo className="w-4 h-4" />
          </button>

          {subtask.assignedTo ? (
            <div className="flex items-center gap-2">
              <Avatar person={subtask.assignedTo} size={24} />
              <span className="text-[12px] font-semibold text-slate-600">{subtask.assignedTo.name}</span>
            </div>
          ) : (
            <button 
              onClick={(e) => { e.stopPropagation(); onAssign(); }} 
              className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-slate-300 rounded-lg text-slate-400 hover:text-teal-600 hover:border-teal-500 hover:bg-teal-50/50 transition-all text-xs font-semibold uppercase tracking-wider"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Assign
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Task Card ─────────────────────────────────────────────────────────────────
function TaskCard({ task, milestoneId, onAssign, onAddSubtask, onOpenNote }: { 
  task: any; 
  milestoneId: string; 
  onAssign: any;
  onAddSubtask: (title: string) => void;
  onOpenNote: (subtaskId?: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const isCompleted = task.status === "completed";
  
  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) {
      setIsAdding(false);
      return;
    }
    onAddSubtask(newSubtaskTitle.trim());
    setNewSubtaskTitle("");
    setIsAdding(false);
  };
  
  return (
    <div className={cn(
      "bg-white rounded-2xl transition-all overflow-hidden flex flex-col",
      open 
        ? "border border-teal-500 shadow-sm" // Exact image style when active
        : "border border-slate-200 hover:border-teal-500"
    )}>
      {/* Task header */}
      <div className="flex flex-col">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between p-4 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
              isCompleted 
                ? "bg-teal-500 text-white" 
                : "bg-white border-2 border-slate-200"
            )}>
              {isCompleted && (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className={cn(
              "text-[15px]",
              isCompleted ? "text-slate-700 font-bold" : "text-slate-600 font-semibold"
            )}>
              {task.title}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Note Icon */}
            <button 
              onClick={(e) => { e.stopPropagation(); onOpenNote(); }}
              className={cn(
                "p-1.5 rounded-lg transition-all",
                task.note ? "text-teal-600 bg-teal-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              )}
              title={task.note ? "View Note" : "Add Note"}
            >
              <ListTodo className="w-5 h-5" />
            </button>

            {/* Assignment button or avatars */}
            {task.assignedTo ? (
              <div className="flex items-center gap-2">
                <Avatar person={task.assignedTo} size={28} />
              </div>
            ) : (
              <button 
                onClick={(e) => { e.stopPropagation(); onAssign(milestoneId, task.id); }} 
                className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-slate-300 rounded-[0.5rem] text-slate-400 hover:text-teal-600 hover:border-teal-500 hover:bg-teal-50/50 transition-all text-xs font-semibold uppercase tracking-wider"
              >
                <UserPlus className="w-3.5 h-3.5" strokeWidth={2.5} />
                Assign
              </button>
            )}

            <ChevronDown className={cn("w-5 h-5 text-slate-300 transition-transform", open && "rotate-180")} />
          </div>
        </div>
      </div>
      
      {/* Subtasks */}
      {open && (
        <div className="flex flex-col bg-slate-50/30">
          {task.subtasks?.map((st: any) => (
            <SubtaskRow 
              key={st.id} 
              subtask={st} 
              onAssign={() => onAssign(milestoneId, task.id, st.id)} 
              onOpenNote={() => onOpenNote(st.id)}
            />
          ))}
          <div className="py-3 px-4 pl-[52px] border-t border-slate-100">
            {isAdding ? (
              <div className="flex items-center gap-2 max-w-sm">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Subtask name..."
                  className="flex-1 px-3 py-1.5 text-[14px] text-slate-700 border border-slate-200 rounded-lg outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50"
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSubtask();
                    if (e.key === 'Escape') { setIsAdding(false); setNewSubtaskTitle(""); }
                  }}
                />
                <button onClick={handleAddSubtask} className="px-3 py-1.5 bg-teal-500 text-white rounded-lg text-xs font-bold hover:bg-teal-600 transition-colors">Add</button>
                <button onClick={() => { setIsAdding(false); setNewSubtaskTitle(""); }} className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors">Cancel</button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-teal-500 rounded-lg text-teal-600 hover:bg-teal-50 transition-all text-[13px] font-semibold tracking-wide"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                New Subtask
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



// ── History Data ─────────────────────────────────────────────────────────────
const HISTORY_DATA = [
  {
    id: 1,
    milestone: "Project Initiation",
    task: "Kickoff Meeting",
    subtask: "Prepare presentation",
    activity: "Task Completed",
    user: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" },
    timestamp: "2024-05-15 10:30 AM"
  },
  {
    id: 2,
    milestone: "Project Initiation",
    task: "Kickoff Meeting",
    subtask: "Invite stakeholders",
    activity: "Task Assigned",
    user: { name: "Rahul Sharma", avatar: "RS", color: "#8b5cf6" },
    timestamp: "2024-05-15 11:45 AM"
  },
  {
    id: 3,
    milestone: "Requirements Gathering",
    task: "Stakeholder Interviews",
    subtask: "Document requirements",
    activity: "Task Completed",
    user: { name: "Priya Patel", avatar: "PP", color: "#ec4899" },
    timestamp: "2024-05-16 02:15 PM"
  },
  {
    id: 4,
    milestone: "Design Phase",
    task: "UI/UX Mockups",
    subtask: "Homepage design",
    activity: "In Progress",
    user: { name: "Amit Kumar", avatar: "AK", color: "#f59e0b" },
    timestamp: "2024-05-18 09:00 AM"
  },
  {
    id: 5,
    milestone: "System Integration",
    task: "API Development",
    subtask: "Auth module",
    activity: "Milestone Added",
    user: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" },
    timestamp: "2024-05-20 04:30 PM"
  }
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProjectDetailClient({ projectId = "1" }: { projectId?: string }) {
  const router = useRouter();
  const [milestones, setMilestones] = useState<any[]>(MILESTONES_DATA);
  const [activeTab, setActiveTab] = useState("m1");
  const [assignDialog, setAssignDialog] = useState<{ milestoneId: string; taskId: string; subtaskId?: string } | null>(null);
  const [noteDialog, setNoteDialog] = useState<{ 
    milestoneId: string; 
    taskId: string; 
    subtaskId?: string; 
    title: string;
    note: string;
  } | null>(null);

  const handleAssign = (milestoneId: string, taskId: string, subtaskId?: string) => {
    setAssignDialog({ milestoneId, taskId, subtaskId });
  };

  const handleAssignEmployee = (emp: typeof EMPLOYEES[0]) => {
    if (!assignDialog) return;
    const { milestoneId, taskId, subtaskId } = assignDialog;
    setMilestones(prev => prev.map(m => {
      if (m.id !== milestoneId) return m;
      return {
        ...m, tasks: m.tasks.map(t => {
          if (t.id !== taskId) return t;
          if (subtaskId) return { ...t, subtasks: t.subtasks.map(st => st.id === subtaskId ? { ...st, assignedTo: { name: emp.name, avatar: emp.avatar, color: emp.color } } : st) };
          return { ...t, assignedTo: { name: emp.name, avatar: emp.avatar, color: emp.color } };
        })
      };
    }));
    setAssignDialog(null);
  };

  const handleAddSubtask = (milestoneId: string, taskId: string, title: string) => {
    setMilestones(prev => prev.map(m => {
      if (m.id !== milestoneId) return m;
      return {
        ...m, tasks: m.tasks.map(t => {
          if (t.id !== taskId) return t;
          const newSt = {
            id: `st_new_${Date.now()}`,
            title,
            status: "pending",
            assignedTo: null
          };
          return { ...t, subtasks: [...t.subtasks, newSt] };
        })
      };
    }));
  };

  const handleAddTask = (milestoneId: string, title: string) => {
    setMilestones(prev => prev.map(m => {
      if (m.id !== milestoneId) return m;
      return {
        ...m,
        tasks: [
          ...m.tasks,
          {
            id: `t_new_${Date.now()}`,
            title,
            status: "pending",
            assignedTo: null,
            dueDate: new Date().toISOString().split('T')[0],
            subtasks: []
          }
        ]
      };
    }));
  };

  const handleUpdateNote = (milestoneId: string, taskId: string, subtaskId: string | undefined, note: string) => {
    setMilestones(prev => prev.map(m => {
      if (m.id !== milestoneId) return m;
      return {
        ...m, tasks: m.tasks.map(t => {
          if (t.id !== taskId) return t;
          if (subtaskId) return { ...t, subtasks: t.subtasks.map(st => st.id === subtaskId ? { ...st, note } : st) };
          return { ...t, note };
        })
      };
    }));
  };

  const handleOpenNote = (milestoneId: string, taskId: string, subtaskId?: string) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    const task = milestone?.tasks.find(t => t.id === taskId);
    const subtask = subtaskId ? task?.subtasks.find(st => st.id === subtaskId) : null;
    
    setNoteDialog({
      milestoneId,
      taskId,
      subtaskId,
      title: subtask ? subtask.title : task?.title || "Note",
      note: subtask ? (subtask as any).note || "" : (task as any).note || ""
    });
  };

  const [currentView, setCurrentView] = useState<'tasks' | 'history'>('tasks');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const activeMilestone = milestones.find(m => m.id === activeTab);
  const activeColor = MILESTONE_COLORS[milestones.findIndex(m => m.id === activeTab)] || "#3b82f6";

  const totalTasks = milestones.reduce((a, m) => a + m.tasks.length, 0);
  const doneTasks = milestones.reduce((a, m) => a + m.tasks.filter(t => t.status === "completed").length, 0);
  const totalSubtasks = milestones.reduce((a, m) => a + m.tasks.reduce((b, t) => b + t.subtasks.length, 0), 0);

  return (
    <motion.div 
      className="flex flex-col gap-8 p-6 max-w-7xl mx-auto bg-background min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/pipeline-projects" className="hover:text-foreground transition-colors flex items-center gap-1">
            <FolderKanban className="h-4 w-4" />
            Pipeline Projects
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Project {projectId}</span>
        </nav>

        {/* Title & Actions Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl font-bold text-foreground tracking-tight"
            >
              OMTECH SPECIALITY POLYMER CHEMICALS
            </motion.h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <Badge variant="secondary" className="font-mono text-xs">Q2025-26/00328</Badge>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                Plot No. C 8/9, Ambernath Industrial Area
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors border border-border/50"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </motion.button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <AppButton size="sm" iconName="Plus" type="button">
                New Milestone
              </AppButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {/* Primary Client */}
        <motion.div 
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
          className="bg-card rounded-xl border border-border/60 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Primary Client</p>
              <p className="text-base font-bold text-foreground mt-1 truncate">OMTECH SPECIALITY</p>
            </div>
          </div>
        </motion.div>

        {/* Contract Amount */}
        <motion.div 
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
          className="bg-card rounded-xl border border-border/60 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <IndianRupee className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Contract Amount</p>
              <p className="text-lg font-bold text-foreground mt-1">₹8,43,700</p>
            </div>
          </div>
        </motion.div>

        {/* Project Progress */}
        <motion.div 
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
          className="bg-card rounded-xl border border-border/60 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Project Progress</p>
                <div className="mt-2">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-amber-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <span className="text-amber-600 font-bold text-sm">60%</span>
          </div>
        </motion.div>

        {/* Time Remaining */}
        <motion.div 
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
          className="bg-card rounded-xl border border-border/60 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Time Remaining</p>
              <p className="text-lg font-bold text-foreground mt-1">108 Days</p>
              <p className="text-[10px] font-medium text-red-500 mt-0.5">DEADLINE: JUN 30</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Milestone Workflow & Details ─────────────────────────────── */}
      <motion.div 
        variants={itemVariants}
        className="w-full mt-4"
      >
        <div className="flex max-h-[700px] gap-[60px] bg-white px-2">
          {/* Left: Milestone Workflow Timeline - Scrollable */}
          <div className="w-[380px] bg-white flex flex-col pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-8 shrink-0">Milestone Workflow</h3>
            
            <div className="relative flex-1 overflow-y-auto pr-1 custom-scrollbar">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200" />
              
              <div className="space-y-2">
                {milestones.map((m, i) => {
                  const isActive = m.id === activeTab;
                  const isCompleted = m.status === "completed";
                  const isInProgress = m.status === "in-progress";
                  const isPending = m.status === "pending";
                  
                  // Icons based on milestone position/type
                  const getMilestoneIcon = () => {
                    if (isCompleted) return (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    );
                    if (isInProgress) return (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    );
                    // Pending icons based on index
                    if (i === 2) return ( // Development
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    );
                    if (i === 3) return ( // Frontend
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    );
                    if (i === 4) return ( // Backend
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      </svg>
                    );
                    if (i === 5) return ( // QA
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    );
                    if (i === 6) return ( // UAT
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    );
                    return ( // Default - Deployment
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l9 4.9V17L12 22l-9-4.9V7z" />
                        <path d="M12 12l9-4.9" />
                        <path d="M12 12v10" />
                        <path d="M12 12L3 7.1" />
                      </svg>
                    );
                  };
                  
                  return (
                    <div 
                      key={m.id}
                      onClick={() => setActiveTab(m.id)}
                      className={cn(
                        "relative flex items-start gap-3 cursor-pointer group",
                        isActive && "z-10"
                      )}
                    >
                      {/* Status Icon */}
                      <div className={cn(
                        "relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all",
                        isCompleted && "bg-teal-500 text-white",
                        isInProgress && "bg-white border-2 border-teal-500 text-teal-500",
                        isPending && "bg-white border-2 border-slate-200 text-slate-300"
                      )}>
                        {getMilestoneIcon()}
                      </div>
                      
                      {/* Milestone Card */}
                      <div className={cn(
                        "flex-1 py-3 px-4 rounded-2xl transition-all",
                        isActive 
                          ? "bg-white border-2 border-teal-500 shadow-sm" 
                          : "bg-transparent border-2 border-transparent hover:bg-slate-50"
                      )}>
                        <div className="flex items-start justify-between gap-2">
                          <span className={cn(
                            "font-bold text-[15px] leading-tight",
                            isActive ? "text-slate-800" : isPending ? "text-slate-400" : "text-slate-700"
                          )}>
                            {m.title}
                          </span>
                          <span className={cn(
                            "text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider",
                            isCompleted && "bg-teal-50 text-teal-600",
                            isInProgress && "bg-teal-50 text-teal-600",
                            isPending && "bg-slate-100 text-slate-400"
                          )}>
                            {isCompleted ? "COMPLETED" : isInProgress ? "ACTIVE" : "PENDING"}
                          </span>
                        </div>
                        {isCompleted && (
                          <p className="text-[11px] text-slate-400 mt-1 font-medium">100% Verified</p>
                        )}
                        {isActive && (
                          <div className="mt-2 text-slate-500 text-[13px] flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            May 15, 2024
                          </div>
                        )}
                        {isActive && (
                          <div className="mt-3">
                            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-teal-500 rounded-full"
                                style={{ width: `${m.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Milestone Details Panel - Scrollable */}
          <div className="flex-1 bg-white overflow-y-auto pt-2 custom-scrollbar">
            {/* Panel Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">{currentView === 'tasks' ? 'Milestone Details' : 'Activity History'}</h3>
              <div className="flex items-center gap-1 bg-slate-50/50 p-1.5 rounded-[1.5rem] border border-slate-100 shadow-sm">
                <button 
                  onClick={() => setCurrentView('tasks')}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 text-xs font-bold transition-all rounded-[1rem]",
                    currentView === 'tasks' 
                      ? "bg-white text-teal-600 shadow-md shadow-teal-500/5 ring-1 ring-slate-100" 
                      : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  Manage Tasks
                </button>
                <button 
                  onClick={() => setCurrentView('history')}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 text-xs font-bold transition-all rounded-[1rem]",
                    currentView === 'history' 
                      ? "bg-white text-teal-600 shadow-md shadow-teal-500/5 ring-1 ring-slate-100" 
                      : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <History className="w-4 h-4" />
                  History
                </button>
              </div>
            </div>
            
            <div className="pb-10 pr-2">
              {currentView === 'history' ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* History Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 flex flex-col justify-start">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Activities</span>
                      <span className="text-2xl font-bold text-slate-800">42</span>
                      <div className="mt-2 text-emerald-600 text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +8 this week
                      </div>
                    </div>
                    <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 flex flex-col justify-start">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Completion Rate</span>
                      <span className="text-2xl font-bold text-slate-800">84%</span>
                      <div className="mt-2 text-teal-600 text-xs font-bold">Stable performance</div>
                    </div>
                    <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 flex flex-col justify-start">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Last Sync</span>
                      <span className="text-2xl font-bold text-slate-800">2m ago</span>
                      <div className="mt-2 text-slate-400 text-xs font-bold">Automatic</div>
                    </div>
                  </div>

                  {/* History Table */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Activity & Context</th>
                          <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Resource</th>
                          <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Responsible</th>
                          <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {HISTORY_DATA.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/30 transition-colors group">
                            <td className="px-6 py-5">
                              <div className="flex flex-col gap-1">
                                <span className={cn(
                                  "text-[14px] font-bold",
                                  log.activity.includes("Completed") ? "text-emerald-600" : "text-slate-800"
                                )}>
                                  {log.activity}
                                </span>
                                <span className="text-[12px] text-slate-400 font-medium">
                                  {log.milestone}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex flex-col gap-1">
                                <span className="text-[14px] font-bold text-slate-700">{log.task}</span>
                                <span className="text-[12px] text-slate-400 font-medium italic">{log.subtask}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-[14px] font-semibold text-slate-600">
                              <div className="flex items-center gap-2">
                                <Avatar person={log.user} size={28} />
                                <span>{log.user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-[13px] font-bold text-slate-500 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 opacity-80">
                                <Clock className="w-3.5 h-3.5" />
                                {log.timestamp}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ) : activeMilestone && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm mb-6">
                    {/* Title & Description */}
                    <div className="mb-8">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-[26px] font-bold text-slate-800">{activeMilestone.title}</h2>
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            <AvatarGroup 
                              people={activeMilestone.tasks
                                .map(t => t.assignedTo)
                                .filter(Boolean) as Array<{name: string; avatar: string; color: string}>} 
                              size={32} 
                            />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-xs font-semibold text-slate-600 -ml-2 z-10">+2</div>
                        </div>
                      </div>
                      <p className="text-[15px] text-slate-500 leading-relaxed max-w-[85%]">{activeMilestone.description}</p>
                    </div>

                    {/* Completion Status */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Completion Status</span>
                        <span className="text-[12px] font-bold text-teal-600 uppercase tracking-widest">{activeMilestone.progress}% Complete</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-500 rounded-full transition-all duration-500"
                          style={{ width: `${activeMilestone.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-3">
                    {activeMilestone.tasks.map((task) => (
                      <TaskCard 
                        key={task.id}
                        task={task}
                        milestoneId={activeMilestone.id}
                        onAssign={handleAssign}
                        onAddSubtask={(title) => handleAddSubtask(activeMilestone.id, task.id, title)}
                        onOpenNote={(stId) => handleOpenNote(activeMilestone.id, task.id, stId)}
                      />
                    ))}
                    
                    {/* Add Task Button */}
                    {isAddingTask ? (
                      <div className="mt-4 p-4 bg-slate-50 border border-teal-500 rounded-2xl animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white shrink-0" />
                          <input 
                            type="text" 
                            autoFocus
                            placeholder="Task name..."
                            className="flex-1 bg-transparent text-[15px] font-semibold text-slate-700 outline-none placeholder:text-slate-400 placeholder:font-normal"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (newTaskTitle.trim()) handleAddTask(activeMilestone.id, newTaskTitle.trim());
                                setIsAddingTask(false);
                                setNewTaskTitle("");
                              }
                              if (e.key === 'Escape') {
                                setIsAddingTask(false);
                                setNewTaskTitle("");
                              }
                            }}
                          />
                          <div className="flex items-center gap-1.5 ml-auto">
                            <button 
                              onClick={() => {
                                if (newTaskTitle.trim()) handleAddTask(activeMilestone.id, newTaskTitle.trim());
                                setIsAddingTask(false);
                                setNewTaskTitle("");
                              }}
                              className="px-4 py-1.5 bg-teal-500 text-white rounded-xl text-[13px] font-bold hover:bg-teal-600 transition-all shadow-sm shadow-teal-500/20"
                            >
                              Add Task
                            </button>
                            <button 
                              onClick={() => { setIsAddingTask(false); setNewTaskTitle(""); }}
                              className="px-3 py-1.5 text-slate-400 hover:text-slate-600 rounded-lg text-xs font-bold transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => setIsAddingTask(true)}
                        className="mt-4 flex items-center justify-center gap-2 p-4 border border-dashed border-slate-300 rounded-2xl text-slate-500 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/20 transition-all cursor-pointer group"
                      >
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        <span className="text-[14px] font-bold tracking-wide">New Task for {activeMilestone.title}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AssignDialog
        open={!!assignDialog}
        onClose={() => setAssignDialog(null)}
        onAssign={handleAssignEmployee}
      />

      <NoteDialog
        open={!!noteDialog}
        onClose={() => setNoteDialog(null)}
        title={noteDialog?.title || ""}
        initialNote={noteDialog?.note || ""}
        onSave={(newNote) => {
          if (noteDialog) {
            handleUpdateNote(noteDialog.milestoneId, noteDialog.taskId, noteDialog.subtaskId, newNote);
            setNoteDialog(null);
          }
        }}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.2);
          border-radius: 20px;
          transition: background-color 0.2s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(148, 163, 184, 0.4);
        }

        /* PrimeReact Editor Customization */
        .custom-editor-container .p-editor-container {
          border: none !important;
          background: #fff;
        }
        .custom-editor-container .p-editor-toolbar {
          background: #fdfdfd;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 14px 20px !important;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .custom-editor-container .p-editor-content {
          border: none !important;
        }
        .custom-editor-container .ql-editor {
          min-height: 250px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 16px;
          color: #334155;
          padding: 32px !important;
          line-height: 1.6;
        }
        .custom-editor-container .ql-toolbar.ql-snow {
          border: none !important;
        }
        .custom-editor-container .ql-container.ql-snow {
          border: none !important;
        }
        .custom-editor-container .ql-formats {
          margin-right: 15px !important;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .custom-editor-container .ql-snow .ql-picker.ql-header {
          width: 110px !important;
        }
        .custom-editor-container .ql-snow .ql-picker.ql-font {
          width: 120px !important;
        }
        .custom-editor-container .ql-snow .ql-stroke {
          stroke: #64748b !important;
        }
        .custom-editor-container .ql-snow .ql-fill {
          fill: #64748b !important;
        }
        .custom-editor-container .ql-snow .ql-picker {
          color: #64748b !important;
          font-weight: 600;
        }
        .custom-editor-container .ql-snow .ql-picker-label:hover .ql-stroke {
          stroke: #14b8a6 !important;
        }
        .custom-editor-container .ql-snow.ql-toolbar button:hover .ql-stroke,
        .custom-editor-container .ql-snow.ql-toolbar button:hover .ql-fill {
          stroke: #14b8a6 !important;
          fill: #14b8a6 !important;
        }
      `}</style>
    </motion.div>
  );
}
