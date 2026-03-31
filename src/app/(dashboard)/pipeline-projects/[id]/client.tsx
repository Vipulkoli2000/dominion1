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
      {
        id: "t1", title: "Kickoff Meeting", status: "completed", assignedTo: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" }, dueDate: "2026-03-10",
        subtasks: [
          { id: "st1_1", title: "Prepare presentation", status: "completed", assignedTo: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" } },
          { id: "st1_2", title: "Invite stakeholders", status: "completed", assignedTo: null }
        ]
      },
      {
        id: "t2", title: "Define Scope", status: "completed", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" }, dueDate: "2026-03-15",
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
      {
        id: "t3", title: "Stakeholder Interviews", status: "completed", assignedTo: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" }, dueDate: "2026-03-25",
        subtasks: [
          { id: "st3_1", title: "Conduct interview 1", status: "completed", assignedTo: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" } },
          { id: "st3_2", title: "Conduct interview 2", status: "completed", assignedTo: null }
        ]
      },
      {
        id: "t4", title: "Requirements Doc Approval", status: "completed", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" }, dueDate: "2026-04-10",
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
      {
        id: "t5", title: "UI Design System", status: "completed", assignedTo: { name: "Amit Kumar", avatar: "AK", color: "#f59e0b" }, dueDate: "2026-04-30",
        subtasks: [
          { id: "st1", title: "Create color palette", status: "completed", assignedTo: { name: "Amit Kumar", avatar: "AK", color: "#f59e0b" } },
          { id: "st2", title: "Typography guidelines", status: "completed", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" } }
        ]
      },
      {
        id: "t6", title: "Mobile Prototypes", status: "pending", assignedTo: { name: "Priya Patel", avatar: "PP", color: "#ec4899" }, dueDate: "2026-05-15",
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
      {
        id: "t7", title: "Initialize Repository", status: "pending", assignedTo: null, dueDate: "2026-06-05",
        subtasks: [
          { id: "st7_1", title: "Setup Next.js", status: "pending", assignedTo: null },
          { id: "st7_2", title: "Configure Tailwind", status: "pending", assignedTo: null }
        ]
      },
      {
        id: "t8", title: "Component Structure Design", status: "pending", assignedTo: null, dueDate: "2026-06-15",
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
      {
        id: "t9", title: "Database Schema Setup", status: "pending", assignedTo: null, dueDate: "2026-07-01",
        subtasks: [
          { id: "st9_1", title: "Write migrations", status: "pending", assignedTo: null },
          { id: "st9_2", title: "Seed dummy data", status: "pending", assignedTo: null }
        ]
      },
      {
        id: "t10", title: "RESTful API Endpoints", status: "pending", assignedTo: null, dueDate: "2026-07-20",
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
      {
        id: "t11", title: "Unit Testing Automation", status: "pending", assignedTo: null, dueDate: "2026-08-15",
        subtasks: [
          { id: "st11_1", title: "Setup Jest", status: "pending", assignedTo: null }
        ]
      },
      {
        id: "t12", title: "Regression Testing", status: "pending", assignedTo: null, dueDate: "2026-08-30",
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
      {
        id: "t13", title: "Prepare UAT Environment", status: "pending", assignedTo: null, dueDate: "2026-09-05",
        subtasks: [
          { id: "st13_1", title: "Deploy staging", status: "pending", assignedTo: null }
        ]
      },
      {
        id: "t14", title: "Client Feedback Evaluation", status: "pending", assignedTo: null, dueDate: "2026-09-15",
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
      {
        id: "t15", title: "Production Server Setup", status: "pending", assignedTo: null, dueDate: "2026-09-25",
        subtasks: [
          { id: "st15_1", title: "Provision resources", status: "pending", assignedTo: null }
        ]
      },
      {
        id: "t16", title: "Go-Live execution", status: "pending", assignedTo: null, dueDate: "2026-10-01",
        subtasks: [
          { id: "st16_1", title: "Push code to master", status: "pending", assignedTo: null },
          { id: "st16_2", title: "Monitor logs", status: "pending", assignedTo: null }
        ]
      }
    ]
  }
];

const MILESTONE_COLORS = ["#3b82f6", "#0ea5e9", "#7dd3fc"];

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
  completed: { label: "Completed", bg: "#eff6ff", text: "#1e40af", dot: "#3b82f6", ring: "#93c5fd" },
  "in-progress": { label: "In Progress", bg: "#f0f9ff", text: "#075985", dot: "#0ea5e9", ring: "#7dd3fc" },
  pending: { label: "Pending", bg: "#f8fafc", text: "#475569", dot: "#94a3b8", ring: "#cbd5e1" },
};

function StatusBadge({ status, small = false }: { status: string; small?: boolean }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap",
        small ? "text-[10px] px-2 py-0.5" : "text-[11px] px-3 py-1",
        status === 'completed' ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' :
          status === 'in-progress' ? 'bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300' :
            'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full",
        status === 'completed' ? 'bg-blue-500' :
          status === 'in-progress' ? 'bg-sky-500' : 'bg-slate-400'
      )} />
      {s.label}
    </span>
  );
}

function Avatar({ person, size = 28 }: { person: { name: string; avatar: string; color: string } | null; size?: number }) {
  if (!person) return null;
  return (
    <div
      title={person.name}
      className="flex items-center justify-center shrink-0 font-black rounded-xl ring-2 ring-white dark:ring-slate-900 shadow-sm transition-transform hover:scale-110"
      style={{
        width: size,
        height: size,
        background: `rgba(59, 130, 246, 0.1)`,
        color: `#3b82f6`,
        fontSize: size * 0.35,
      }}
    >
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
  const c = color || (value === 100 ? "#2563eb" : value >= 60 ? "#3b82f6" : value >= 30 ? "#0ea5e9" : "#64748b");
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden w-full shadow-inner" style={{ height }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="h-full rounded-full relative bg-gradient-to-r from-blue-400 to-blue-600"
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
      </motion.div>
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
      <DialogContent className="sm:max-w-[720px] rounded-[32px] p-0 border-none shadow-2xl overflow-hidden bg-white dark:bg-slate-950 max-h-[90vh] flex flex-col transition-all">
        <div className="p-8 pb-4 flex items-start justify-between border-b border-slate-50 dark:border-slate-900 shrink-0">
          <div>
            <DialogTitle className="text-2xl font-black text-slate-950 dark:text-slate-50 tracking-tight leading-tight">
              {title}
            </DialogTitle>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mt-1">
              {mode === 'edit' ? 'Editing Note & Rich Formatting' : 'Viewing Task Observations'}
            </p>
          </div>
        </div>

        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar bg-slate-50/20 dark:bg-slate-900/20">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
          >
            {mode === 'read' ? (
              <div className="bg-white dark:bg-slate-900/60 rounded-[28px] p-8 border border-slate-200/60 dark:border-white/10 min-h-[400px] relative group overflow-hidden shadow-sm">
                {/* Decorative background element */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.05] transition-opacity">
                  <ListTodo className="w-56 h-56 rotate-12 text-blue-500" />
                </div>

                {noteText ? (
                  <div
                    className="text-[17px] text-slate-800 dark:text-slate-200 leading-relaxed relative z-10 prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-strong:text-blue-600 dark:prose-strong:text-blue-400 prose-a:text-blue-600 prose-ul:list-disc"
                    dangerouslySetInnerHTML={{ __html: noteText }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                    <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-700 shadow-inner">
                      <ListTodo className="w-10 h-10 opacity-30 text-blue-500" />
                    </div>
                    <p className="text-[16px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Empty Workspace</p>
                    <p className="text-[13px] text-slate-400 dark:text-slate-500 mt-2 mb-8 font-medium">Start capturing your project details here.</p>
                    <button
                      onClick={() => setMode('edit')}
                      className="px-8 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all border border-blue-100 dark:border-blue-900/50 shadow-sm"
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

        <div className="p-8 pt-0 border-t border-slate-50 dark:border-slate-900 bg-white dark:bg-slate-950 shrink-0">
          <div className="flex items-center gap-3">
            {mode === 'read' ? (
              <>
                <button
                  onClick={() => setMode('edit')}
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98]"
                >
                  {noteText ? 'Edit Note' : 'Add First Note'}
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
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
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98]"
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
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
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
function AssignDialog({
  open,
  onClose,
  onAssign
}: {
  open: boolean;
  onClose: () => void;
  onAssign: (emp: typeof EMPLOYEES[0]) => void
}) {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[400px] rounded-[32px] p-0 border-none shadow-2xl overflow-hidden bg-white dark:bg-slate-950 transition-all">
        <div className="p-8 pb-4 flex flex-col gap-1 border-b border-slate-50 dark:border-slate-900 shrink-0">
          <DialogTitle className="text-xl font-black text-slate-950 dark:text-slate-50 tracking-tight leading-tight">
            Assign Strategic Asset
          </DialogTitle>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-[0.2em]">
            Select Team Contributor
          </p>
        </div>

        <div className="p-6 flex flex-col gap-2.5 bg-slate-50/20 dark:bg-slate-900/20">
          {EMPLOYEES.map(emp => (
            <motion.button
              key={emp.id}
              onClick={() => onAssign(emp)}
              whileHover={{ x: 4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-4 p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[22px] text-left transition-all hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="relative">
                <Avatar person={emp} size={42} />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                </div>
              </div>
              <div className="flex-1">
                <div className="font-black text-[14px] text-slate-950 dark:text-slate-50 leading-tight group-hover:text-blue-600 transition-colors">{emp.name}</div>
                <div className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{emp.role}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors" />
            </motion.button>
          ))}
        </div>

        <div className="p-6 pt-0 flex justify-end bg-white dark:bg-slate-950">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
          >
            Cancel Selection
          </button>
        </div>
      </DialogContent>
    </Dialog>
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
    <div className="flex flex-col bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 group">
      <div className="flex items-center justify-between py-3 px-4 pl-[52px]">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors",
            isCompleted ? "bg-blue-600 text-white" : "border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
          )}>
            {isCompleted && (
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <span className={cn(
            "text-[14px] font-bold transition-colors",
            isCompleted ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-700 dark:text-slate-200"
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
              subtask.note ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" : "text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
            title={subtask.note ? "View Note" : "Add Note"}
          >
            <ListTodo className="w-4 h-4" />
          </button>

          {subtask.assignedTo ? (
            <div className="flex items-center gap-2">
              <Avatar person={subtask.assignedTo} size={24} />
              <span className="text-[12px] font-black text-slate-700 dark:text-slate-300">{subtask.assignedTo.name}</span>
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onAssign(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-[10px] font-black uppercase tracking-widest"
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
      "bg-white dark:bg-slate-900 rounded-2xl transition-all overflow-hidden flex flex-col",
      open
        ? "border border-blue-500 shadow-lg shadow-blue-500/5"
        : "border border-slate-200 dark:border-slate-800 hover:border-blue-500/50"
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
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700"
            )}>
              {isCompleted && (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className={cn(
              "text-[15px]",
              isCompleted ? "text-slate-800 dark:text-slate-100 font-extrabold" : "text-slate-600 dark:text-slate-300 font-bold"
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
                task.note ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" : "text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-[10px] font-black uppercase tracking-widest"
              >
                <UserPlus className="w-3.5 h-3.5" strokeWidth={2.5} />
                Assign
              </button>
            )}

            <ChevronDown className={cn("w-5 h-5 text-slate-300 dark:text-slate-700 transition-transform", open && "rotate-180")} />
          </div>
        </div>
      </div>

      {/* Subtasks */}
      {open && (
        <div className="flex flex-col bg-slate-50/30 dark:bg-slate-900/60">
          {task.subtasks?.map((st: any) => (
            <SubtaskRow
              key={st.id}
              subtask={st}
              onAssign={() => onAssign(milestoneId, task.id, st.id)}
              onOpenNote={() => onOpenNote(st.id)}
            />
          ))}
          <div className="py-3 px-4 pl-[52px] border-t border-slate-100 dark:border-slate-800">
            {isAdding ? (
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  autoFocus
                  placeholder="Subtask name..."
                  className="flex-1 px-3 py-1.5 text-[14px] text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSubtask();
                    if (e.key === 'Escape') { setIsAdding(false); setNewSubtaskTitle(""); }
                  }}
                />
                <button onClick={handleAddSubtask} className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md">Add</button>
                <button onClick={() => { setIsAdding(false); setNewSubtaskTitle(""); }} className="px-4 py-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-black transition-all">Cancel</button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1.5 px-4 py-2 border border-dashed border-blue-500 dark:border-blue-500 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all text-[11px] font-black uppercase tracking-widest"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={3} />
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
    activity: "Task Completed",
    user: { name: "Darpan Powale", avatar: "DP", color: "#3b82f6" },
    action: "Kickoff Meeting",
    details: "Successfully completed the project kickoff and finalized the roadmap.",
    timestamp: "2024-05-15T10:30:45Z"
  },
  {
    id: 2,
    milestone: "Project Initiation",
    activity: "Employee Replaced",
    user: { name: "Rahul Sharma", avatar: "RS", color: "#8b5cf6" },
    action: "Define Scope",
    details: "Assigned Rahul Sharma to replace Darpan Powale for this task due to scheduling.",
    timestamp: "2024-05-15T11:45:22Z"
  },
  {
    id: 3,
    milestone: "Requirements Gathering",
    activity: "Note Added",
    user: { name: "Priya Patel", avatar: "PP", color: "#ec4899" },
    action: "Stakeholder Interviews",
    details: "Added a detailing note to 'Document requirements' subtask explaining client preferences.",
    timestamp: "2024-05-16T14:15:10Z"
  },
  {
    id: 4,
    milestone: "Design Phase",
    activity: "In Progress",
    user: { name: "Amit Kumar", avatar: "AK", color: "#f59e0b" },
    action: "UI/UX Mockups",
    details: "Initial drafting of the homepage design and component library.",
    timestamp: "2024-05-18T09:00:33Z"
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
      className="flex flex-col gap-8 p-6 max-w-7xl mx-auto min-h-screen transition-all duration-500"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          <Link href="/pipeline-projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
            <FolderKanban className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Pipeline Projects
          </Link>
          <ChevronRight className="h-3 w-3 opacity-50" />
          <span className="text-slate-600 dark:text-slate-300 font-black">Project {projectId}</span>
        </nav>

        {/* Title & Actions Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tight leading-tight"
            >
              OMTECH SPECIALITY POLYMER CHEMICALS
            </motion.h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap text-slate-500 dark:text-slate-400">
              <Badge variant="secondary" className="font-black text-[10px] uppercase tracking-widest bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800">Q2025-26/00328</Badge>
              <span className="opacity-30">•</span>
              <span className="text-[13px] font-medium flex items-center gap-1.5 italic">
                <MapPin className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                Plot No. C 8/9, Ambernath Industrial Area
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all border border-slate-200 dark:border-slate-800"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AppButton size="sm" iconName="Plus" type="button" className="bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 font-black uppercase tracking-widest px-6 rounded-xl shadow-lg shadow-blue-500/20">
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
          className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
        >
          <div className="flex flex-col gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shadow-inner">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Primary Client</p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-50 mt-1 truncate tracking-tight">OMTECH SPECIALITY</p>
            </div>
          </div>
        </motion.div>

        {/* Contract Amount */}
        <motion.div
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
          className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
        >
          <div className="flex flex-col gap-4">
            <div className="h-12 w-12 rounded-2xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center shadow-inner">
              <IndianRupee className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Contract Amount</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-950 dark:text-slate-50 tracking-tighter">8,43,700</span>
                <span className="text-xs font-black text-slate-400 dark:text-slate-500">INR</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Progress */}
        <motion.div
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
          className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
        >
          <div className="flex items-start justify-between h-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shadow-inner">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Progress</p>
                  <span className="text-blue-600 dark:text-blue-400 font-black text-sm">60%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Time Remaining */}
        <motion.div
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
          className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
        >
          <div className="flex flex-col gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shadow-inner">
              <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Time Remaining</p>
              <p className="text-2xl font-black text-slate-950 dark:text-slate-50 mt-1 tracking-tighter">108 <span className="text-[10px] font-black uppercase text-slate-400">Days</span></p>
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 mt-2 uppercase tracking-tightest">DEADLINE: JUN 30, 2026</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Milestone Workflow & Details ─────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="w-full mt-4"
      >
        <div className="flex max-h-[850px] gap-12 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl p-8 shadow-xl shadow-blue-500/5">
          {/* Left: Milestone Workflow Timeline - Scrollable */}
          <div className="w-[360px] flex flex-col pt-2 border-r border-slate-100 dark:border-slate-800 pr-10">
            <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-10 shrink-0">Milestone Workflow</h3>

            <div className="relative flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-100 dark:bg-slate-800 rounded-full" />

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
                        "relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all shadow-md",
                        isCompleted && "bg-blue-600 text-white shadow-blue-500/20",
                        isInProgress && "bg-white dark:bg-slate-950 border-2 border-blue-500 text-blue-500 shadow-blue-500/10 scale-110",
                        isPending && "bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600"
                      )}>
                        {getMilestoneIcon()}
                      </div>

                      {/* Milestone Card */}
                      <div className={cn(
                        "flex-1 py-4 px-5 rounded-[22px] transition-all duration-300",
                        isActive
                          ? "bg-blue-50/50 dark:bg-blue-900/30 border border-blue-500/50 dark:border-blue-700/50 shadow-blue-500/5"
                          : "bg-transparent border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      )}>
                        <div className="flex items-start justify-between gap-3">
                          <span className={cn(
                            "font-black text-[14px] leading-tight flex-1",
                            isActive ? "text-slate-900 dark:text-white" : isPending ? "text-slate-400 dark:text-slate-600" : "text-slate-700 dark:text-slate-300"
                          )}>
                            {m.title}
                          </span>
                          <span className={cn(
                            "text-[8px] px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter shrink-0",
                            isCompleted && "bg-blue-600 text-white",
                            isInProgress && "bg-sky-500 text-white",
                            isPending && "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                          )}>
                            {isCompleted ? "DONE" : isInProgress ? "WORK" : "WAIT"}
                          </span>
                        </div>
                        {isCompleted && (
                          <div className="flex items-center gap-1.5 mt-2 opacity-60">
                            <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold tracking-widest uppercase">Validated</p>
                          </div>
                        )}
                        {isActive && (
                          <div className="mt-2 text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1.5 font-bold uppercase tracking-tight">
                            <Calendar className="w-3 h-3 text-blue-500" />
                            May 15, 2024
                          </div>
                        )}
                        {isActive && (
                          <div className="mt-3">
                            <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${m.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"
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
          <div className="flex-1 overflow-y-auto pt-2 custom-scrollbar pr-4">
            {/* Panel Header */}
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{currentView === 'tasks' ? 'Milestone Blueprint' : 'Audit History'}</h3>
              <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-900/40 p-1.5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                <button
                  onClick={() => setCurrentView('tasks')}
                  className={cn(
                    "flex items-center gap-2.5 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl",
                    currentView === 'tasks'
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                      : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  )}
                >
                  <ListTodo className="w-3.5 h-3.5" />
                  Execution
                </button>
                <button
                  onClick={() => setCurrentView('history')}
                  className={cn(
                    "flex items-center gap-2.5 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl",
                    currentView === 'history'
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                      : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  )}
                >
                  <History className="w-3.5 h-3.5" />
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
                  <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-white/50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-100 dark:border-white/5 flex flex-col justify-start shadow-sm">
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Activities</span>
                      <span className="text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tighter">42</span>
                      <div className="mt-3 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-tight flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +8 This Week
                      </div>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-100 dark:border-white/5 flex flex-col justify-start shadow-sm">
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Efficiency</span>
                      <span className="text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tighter">84%</span>
                      <div className="mt-3 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-tight">Optimal Phase</div>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-100 dark:border-white/5 flex flex-col justify-start shadow-sm">
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Last Sync</span>
                      <span className="text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tighter">2m</span>
                      <div className="mt-3 text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-tight">System Global</div>
                    </div>
                  </div>

                  {/* History Table */}
                  <div className="bg-white/40 dark:bg-slate-900/40 rounded-[28px] border border-slate-100 dark:border-white/5 shadow-xl shadow-blue-500/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-blue-50/30 dark:bg-blue-900/20 border-b border-slate-100 dark:border-slate-800">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Context</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Activity</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Contributor</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Timeline</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
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
                              <div className="flex flex-col gap-1 max-w-[320px]">
                                <span className="text-[14px] font-bold text-slate-700">{log.action}</span>
                                <span className="text-[12px] text-slate-400 font-medium leading-relaxed">{log.details}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-[14px] font-semibold text-slate-600">
                              <div className="flex items-center gap-2">
                                <Avatar person={log.user} size={28} />
                                <span>{log.user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5 text-[14px] font-bold text-slate-700">
                                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                  {new Date(log.timestamp).toLocaleDateString('en-GB')}
                                </div>
                                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
                                  <Clock className="w-3.5 h-3.5" />
                                  {new Date(log.timestamp).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: true
                                  })}
                                </div>
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
                  <div className="bg-white/60 dark:bg-slate-900/60 rounded-[28px] border border-slate-100 dark:border-white/5 p-10 shadow-xl shadow-blue-500/5 mb-8">
                    {/* Title & Description */}
                    <div className="mb-10">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tighter leading-tight">{activeMilestone.title}</h2>
                        <div className="flex items-center">
                          <div className="flex -space-x-3">
                            <AvatarGroup
                              people={activeMilestone.tasks
                                .map(t => t.assignedTo)
                                .filter(Boolean) as Array<{ name: string; avatar: string; color: string }>}
                              size={40}
                            />
                          </div>
                          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-black text-blue-600 dark:text-blue-400 -ml-3 z-10 shadow-sm">+2</div>
                        </div>
                      </div>
                      <p className="text-[16px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-[90%] italic">{activeMilestone.description}</p>
                    </div>

                    {/* Completion Status */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Milestone Health</span>
                        <span className="text-[14px] font-black text-blue-600 dark:text-blue-400 tracking-tighter">{activeMilestone.progress}% REACHED</span>
                      </div>
                      <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${activeMilestone.progress}%` }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-sky-400 rounded-full relative shadow-lg shadow-blue-500/20"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
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

                    {/* Add Task Button - Simplified */}
                    {isAddingTask ? (
                      <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                            <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          
                          <input
                            type="text"
                            autoFocus
                            placeholder="Add task title..."
                            className="flex-1 bg-transparent text-lg font-semibold text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
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

                          <div className="flex items-center gap-2 ml-auto">
                            <button
                              onClick={() => {
                                if (newTaskTitle.trim()) handleAddTask(activeMilestone.id, newTaskTitle.trim());
                                setIsAddingTask(false);
                                setNewTaskTitle("");
                              }}
                              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-[0.98]"
                            >
                              Add Task
                            </button>
                            <button
                              onClick={() => { setIsAddingTask(false); setNewTaskTitle(""); }}
                              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setIsAddingTask(true)}
                        className="mt-8 flex items-center justify-center gap-2 py-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-600 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all cursor-pointer group"
                      >
                        <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" strokeWidth={2} />
                        <span className="text-sm font-semibold">Add Task</span>
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
          stroke: #2563eb !important;
        }
        .custom-editor-container .ql-snow.ql-toolbar button:hover .ql-stroke,
        .custom-editor-container .ql-snow.ql-toolbar button:hover .ql-fill {
          stroke: #2563eb !important;
          fill: #2563eb !important;
        }
        
        /* Dark mode editor tweaks */
        .dark .custom-editor-container .p-editor-container {
          background: #020617 !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        .dark .custom-editor-container .p-editor-toolbar {
          background: #0f172a !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        .dark .custom-editor-container .ql-editor {
          color: #f8fafc !important;
        }
        .dark .custom-editor-container .ql-snow .ql-stroke {
          stroke: #94a3b8 !important;
        }
        .dark .custom-editor-container .ql-snow .ql-fill {
          fill: #94a3b8 !important;
        }
        .dark .custom-editor-container .ql-snow .ql-picker {
          color: #94a3b8 !important;
        }
      `}</style>
    </motion.div>
  );
}
