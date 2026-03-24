import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Command,
  FileCode2,
  FileJson2,
  Folder,
  FolderOpen,
  GitBranch,
  Search,
  TerminalSquare,
  X,
} from "lucide-react";

const projects = [
  {
    id: "currently-building.json",
    name: "Currently Building",
    role: "Full-Stack Developer in Progress",
    stack: ["React", "Tailwind CSS", "AI Tools"],
    summary:
      "A live placeholder for the first public case study while I turn practice into real shipped work.",
    highlights: [
      "Focused on creative interfaces that still feel fast and clean.",
      "Using AI tools to speed up ideation, prototyping, and implementation.",
    ],
    status: "in-progress",
    repo: "github.com/ngassanov07",
  },
  {
    id: "skill-growth.json",
    name: "Skill Growth",
    role: "Learning in Public",
    stack: ["JavaScript", "Node.js", "React"],
    summary:
      "This tab tracks the direction of my growth as I move from frontend comfort into stronger full-stack execution.",
    highlights: [
      "Sharpening backend thinking while keeping UI quality high.",
      "Building small tools that are creative, efficient, and practical.",
    ],
    status: "leveling-up",
    repo: "github.com/ngassanov07",
  },
  {
    id: "open-for-work.json",
    name: "Open for Work",
    role: "Available for Collaborations",
    stack: ["Landing Pages", "Web Apps", "Automation"],
    summary:
      "Ready to take on real projects and turn ideas into creative, fast, and efficient web experiences.",
    highlights: [
      "Open to freelance work, collaborations, and early-stage builds.",
      "Based in Turkey and comfortable working remotely.",
    ],
    status: "available",
    repo: "github.com/ngassanov07",
  },
];

const baseFiles = [
  {
    id: "index.js",
    name: "index.js",
    label: "Home",
    path: "/src/index.js",
    type: "page",
  },
  {
    id: "about.js",
    name: "about.js",
    label: "About",
    path: "/src/about.js",
    type: "page",
  },
  {
    id: "contact.sh",
    name: "contact.sh",
    label: "Contact",
    path: "/src/contact.sh",
    type: "page",
  },
];

const fileTree = [
  {
    id: "workspace",
    name: "portfolio",
    type: "folder",
    children: [
      ...baseFiles.map((file) => ({ ...file, type: "file" })),
      {
        id: "projects",
        name: "projects",
        type: "folder",
        children: projects.map((project) => ({
          id: project.id,
          name: project.id,
          label: project.name,
          path: `/src/projects/${project.id}`,
          type: "file",
          projectId: project.id,
        })),
      },
    ],
  },
];

const filesById = [...baseFiles, ...projects.map((project) => ({
  id: project.id,
  name: project.id,
  label: project.name,
  path: `/src/projects/${project.id}`,
  type: "project",
  projectId: project.id,
}))].reduce((accumulator, file) => {
  accumulator[file.id] = file;
  return accumulator;
}, {});

const initialLogs = [
  {
    id: 1,
    stamp: "boot",
    message: "Boot sequence complete. Portfolio shell mounted.",
  },
  {
    id: 2,
    stamp: "hint",
    message: "Press Cmd/Ctrl + K to open the command palette.",
  },
];

const introLine =
  "I build creative, fast and efficient web solutions with AI tools.";

function createLog(message) {
  return {
    id: Date.now() + Math.random(),
    stamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    message,
  };
}

function fileIcon(name) {
  if (name.endsWith(".json")) {
    return FileJson2;
  }

  if (name.endsWith(".sh")) {
    return TerminalSquare;
  }

  return FileCode2;
}

function CodeLine({ number, children }) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-4 text-sm leading-7 md:text-[15px]">
      <span className="select-none text-right text-slate-500">{number}</span>
      <div className="min-w-0 overflow-x-auto scrollbar-thin">{children}</div>
    </div>
  );
}

function FileTree({
  nodes,
  activeTab,
  expandedFolders,
  onOpenFile,
  onToggleFolder,
  depth = 0,
}) {
  return (
    <div className="space-y-1">
      {nodes.map((node) => {
        const padding = { paddingLeft: `${depth * 0.85 + 0.75}rem` };

        if (node.type === "folder") {
          const expanded = expandedFolders[node.id] ?? true;

          return (
            <div key={node.id}>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg py-2 pr-3 text-sm text-slate-300 transition hover:bg-slate-900/70"
                onClick={() => onToggleFolder(node.id)}
                style={padding}
              >
                {expanded ? (
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                )}
                {expanded ? (
                  <FolderOpen className="h-4 w-4 text-sky-400" />
                ) : (
                  <Folder className="h-4 w-4 text-sky-400" />
                )}
                <span>{node.name}</span>
              </button>
              {expanded ? (
                <FileTree
                  nodes={node.children}
                  activeTab={activeTab}
                  expandedFolders={expandedFolders}
                  onOpenFile={onOpenFile}
                  onToggleFolder={onToggleFolder}
                  depth={depth + 1}
                />
              ) : null}
            </div>
          );
        }

        const Icon = fileIcon(node.name);

        return (
          <button
            key={node.id}
            type="button"
            className={`flex w-full items-center gap-2 rounded-lg py-2 pr-3 text-left text-sm transition ${
              activeTab === node.id
                ? "bg-slate-900 text-white"
                : "text-slate-400 hover:bg-slate-900/70 hover:text-slate-100"
            }`}
            onClick={() => onOpenFile(node.id, "explorer")}
            style={padding}
          >
            <span className="w-4" />
            <Icon className="h-4 w-4 text-emerald-400" />
            <span className="truncate">{node.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function TerminalWindow({ logs }) {
  return (
    <div className="fixed inset-x-0 bottom-9 z-30 h-44 border-t border-slate-800/80 bg-[#09111f]/95 backdrop-blur">
      <div className="flex h-10 items-center justify-between border-b border-slate-800/80 px-4 text-xs uppercase tracking-[0.28em] text-slate-400">
        <span>Terminal</span>
        <span>{logs.length} entries</span>
      </div>
      <div className="h-[calc(100%-2.5rem)] overflow-y-auto px-4 py-3 scrollbar-thin">
        {logs.map((log) => (
          <div
            key={log.id}
            className="grid grid-cols-[4rem_1fr] gap-3 text-sm leading-6 text-slate-300"
          >
            <span className="text-slate-500">{log.stamp}</span>
            <span className="break-words">
              <span className="mr-2 text-emerald-400">$</span>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandPalette({ isOpen, files, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filteredFiles = files.filter((file) => {
    if (!normalizedQuery) {
      return true;
    }

    return [file.name, file.label, file.path]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedQuery));
  });

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-slate-950/70 px-4 pt-24 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-panel shadow-editor animate-float-in">
        <div className="flex items-center gap-3 border-b border-slate-800/80 px-4 py-3">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search files, routes, or commands..."
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-900 hover:text-slate-100"
            aria-label="Close command palette"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto py-2 scrollbar-thin">
          {filteredFiles.length ? (
            filteredFiles.map((file) => (
              <button
                key={file.id}
                type="button"
                onClick={() => onSelect(file.id)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-900/70"
              >
                <div>
                  <p className="text-sm text-slate-100">{file.label}</p>
                  <p className="text-xs text-slate-500">{file.path}</p>
                </div>
                <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  {file.name}
                </span>
              </button>
            ))
          ) : (
            <p className="px-4 py-6 text-sm text-slate-500">
              No matches for that command.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="border-b border-slate-800/80 px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-400">
        {project.id}
      </div>
      <div className="space-y-1 px-4 py-4">
        <CodeLine number={1}>
          <span className="text-slate-200">{"{"}</span>
        </CodeLine>
        <CodeLine number={2}>
          <span className="text-syntax-property">"name"</span>
          <span className="text-slate-300">: </span>
          <span className="text-syntax-string">"{project.name}"</span>
          <span className="text-slate-300">,</span>
        </CodeLine>
        <CodeLine number={3}>
          <span className="text-syntax-property">"role"</span>
          <span className="text-slate-300">: </span>
          <span className="text-syntax-string">"{project.role}"</span>
          <span className="text-slate-300">,</span>
        </CodeLine>
        <CodeLine number={4}>
          <span className="text-syntax-property">"summary"</span>
          <span className="text-slate-300">: </span>
          <span className="text-syntax-string">"{project.summary}"</span>
          <span className="text-slate-300">,</span>
        </CodeLine>
        <CodeLine number={5}>
          <span className="text-syntax-property">"stack"</span>
          <span className="text-slate-300">: [</span>
          {project.stack.map((item, index) => (
            <span key={item}>
              <span className="text-syntax-string">"{item}"</span>
              {index < project.stack.length - 1 ? (
                <span className="text-slate-300">, </span>
              ) : null}
            </span>
          ))}
          <span className="text-slate-300">],</span>
        </CodeLine>
        <CodeLine number={6}>
          <span className="text-syntax-property">"status"</span>
          <span className="text-slate-300">: </span>
          <span className="text-syntax-string">"{project.status}"</span>
          <span className="text-slate-300">,</span>
        </CodeLine>
        <CodeLine number={7}>
          <span className="text-syntax-property">"repo"</span>
          <span className="text-slate-300">: </span>
          <span className="text-syntax-string">"{project.repo}"</span>
          <span className="text-slate-300">,</span>
        </CodeLine>
        <CodeLine number={8}>
          <span className="text-syntax-property">"highlights"</span>
          <span className="text-slate-300">: [</span>
        </CodeLine>
        {project.highlights.map((highlight, index) => (
          <CodeLine key={highlight} number={9 + index}>
            <span className="pl-4 text-syntax-string">"{highlight}"</span>
            {index < project.highlights.length - 1 ? (
              <span className="text-slate-300">,</span>
            ) : null}
          </CodeLine>
        ))}
        <CodeLine number={9 + project.highlights.length}>
          <span className="text-slate-300">]</span>
        </CodeLine>
        <CodeLine number={10 + project.highlights.length}>
          <span className="text-slate-200">{"}"}</span>
        </CodeLine>
      </div>
    </div>
  );
}

function HomeFile({ typedText }) {
  return (
    <div className="space-y-1">
      <CodeLine number={1}>
        <span className="text-syntax-keyword">import</span>{" "}
        <span className="text-slate-200">{"{"}</span>
        <span className="text-syntax-function"> build</span>
        <span className="text-slate-200">, </span>
        <span className="text-syntax-function">ship</span>
        <span className="text-slate-200"> {"}"} </span>
        <span className="text-syntax-keyword">from</span>{" "}
        <span className="text-syntax-string">"./craft"</span>
        <span className="text-slate-200">;</span>
      </CodeLine>
      <CodeLine number={2}>
        <span className="text-slate-600">// </span>
      </CodeLine>
      <CodeLine number={3}>
        <span className="text-syntax-keyword">const</span>{" "}
        <span className="text-syntax-function">developer</span>{" "}
        <span className="text-slate-200">= {"{"}</span>
      </CodeLine>
      <CodeLine number={4}>
        <span className="pl-4 text-syntax-property">name</span>
        <span className="text-slate-300">: </span>
        <span className="text-syntax-string">"Nabil Gassanov"</span>
        <span className="text-slate-300">,</span>
      </CodeLine>
      <CodeLine number={5}>
        <span className="pl-4 text-syntax-property">role</span>
        <span className="text-slate-300">: </span>
        <span className="text-syntax-string">"Full-Stack Developer"</span>
        <span className="text-slate-300">,</span>
      </CodeLine>
      <CodeLine number={6}>
        <span className="pl-4 text-syntax-property">intro</span>
        <span className="text-slate-300">: </span>
        <span className="text-syntax-string">"{typedText}"</span>
        <span className="inline-block h-5 w-2 translate-y-1 bg-emerald-400 align-middle animate-caret" />
        <span className="text-slate-300">,</span>
      </CodeLine>
      <CodeLine number={7}>
        <span className="pl-4 text-syntax-property">stack</span>
        <span className="text-slate-300">: [</span>
        <span className="text-syntax-string">"React"</span>
        <span className="text-slate-300">, </span>
        <span className="text-syntax-string">"Tailwind CSS"</span>
        <span className="text-slate-300">, </span>
        <span className="text-syntax-string">"AI Tools"</span>
        <span className="text-slate-300">],</span>
      </CodeLine>
      <CodeLine number={8}>
        <span className="pl-4 text-syntax-property">focus</span>
        <span className="text-slate-300">: [</span>
        <span className="text-syntax-string">"creative web experiences"</span>
        <span className="text-slate-300">, </span>
        <span className="text-syntax-string">"efficient full-stack builds"</span>
        <span className="text-slate-300">, </span>
        <span className="text-syntax-string">"AI-assisted workflows"</span>
        <span className="text-slate-300">],</span>
      </CodeLine>
      <CodeLine number={9}>
        <span className="text-slate-200">{"};"}</span>
      </CodeLine>
      <CodeLine number={10}>
        <span className="text-syntax-keyword">export default</span>{" "}
        <span className="text-syntax-function">developer</span>
        <span className="text-slate-200">;</span>
      </CodeLine>
    </div>
  );
}

function AboutFile() {
  return (
    <div className="space-y-1">
      <CodeLine number={1}>
        <span className="text-slate-600">// about.js</span>
      </CodeLine>
      <CodeLine number={2}>
        <span className="text-syntax-keyword">export const</span>{" "}
        <span className="text-syntax-function">profile</span>{" "}
        <span className="text-slate-200">= {"{"}</span>
      </CodeLine>
      <CodeLine number={3}>
        <span className="pl-4 text-syntax-property">summary</span>
        <span className="text-slate-300">: </span>
        <span className="text-syntax-string">
          "I build creative, fast, and efficient web experiences that feel intentional from the first screen."
        </span>
        <span className="text-slate-300">,</span>
      </CodeLine>
      <CodeLine number={4}>
        <span className="pl-4 text-syntax-property">strengths</span>
        <span className="text-slate-300">: [</span>
        <span className="text-syntax-string">"frontend execution"</span>
        <span className="text-slate-300">, </span>
        <span className="text-syntax-string">"fast iteration"</span>
        <span className="text-slate-300">, </span>
        <span className="text-syntax-string">"AI-powered workflows"</span>
        <span className="text-slate-300">],</span>
      </CodeLine>
      <CodeLine number={5}>
        <span className="pl-4 text-syntax-property">currently</span>
        <span className="text-slate-300">: </span>
        <span className="text-syntax-string">
          "Growing into stronger full-stack work with each build while keeping the frontend sharp."
        </span>
        <span className="text-slate-300">,</span>
      </CodeLine>
      <CodeLine number={6}>
        <span className="pl-4 text-syntax-property">location</span>
        <span className="text-slate-300">: </span>
        <span className="text-syntax-string">"Turkey"</span>
      </CodeLine>
      <CodeLine number={7}>
        <span className="text-slate-200">{"};"}</span>
      </CodeLine>
    </div>
  );
}

function ContactFile() {
  return (
    <div className="space-y-1">
      <CodeLine number={1}>
        <span className="text-syntax-function">$</span>{" "}
        <span className="text-slate-200">whoami</span>
      </CodeLine>
      <CodeLine number={2}>
        <span className="text-emerald-400">ngassanov07</span>
      </CodeLine>
      <CodeLine number={3}>
        <span className="text-syntax-function">$</span>{" "}
        <span className="text-slate-200">print_contact --format=json</span>
      </CodeLine>
      <CodeLine number={4}>
        <span className="text-slate-200">{"{"}</span>
      </CodeLine>
      <CodeLine number={5}>
        <span className="pl-4 text-syntax-property">"email"</span>
        <span className="text-slate-300">: </span>
        <span className="text-syntax-string">"gasanov.nabil@inbox.ru"</span>
        <span className="text-slate-300">,</span>
      </CodeLine>
      <CodeLine number={6}>
        <span className="pl-4 text-syntax-property">"github"</span>
        <span className="text-slate-300">: </span>
        <span className="text-syntax-string">"github.com/ngassanov07"</span>
        <span className="text-slate-300">,</span>
      </CodeLine>
      <CodeLine number={7}>
        <span className="pl-4 text-syntax-property">"location"</span>
        <span className="text-slate-300">: </span>
        <span className="text-syntax-string">"Turkey"</span>
      </CodeLine>
      <CodeLine number={8}>
        <span className="text-slate-200">{"}"}</span>
      </CodeLine>
    </div>
  );
}

function App() {
  const [openFiles, setOpenFiles] = useState(["index.js"]);
  const [activeTab, setActiveTab] = useState("index.js");
  const [expandedFolders, setExpandedFolders] = useState({
    workspace: true,
    projects: true,
  });
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [logs, setLogs] = useState(initialLogs);
  const [clock, setClock] = useState(new Date());
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typedText.length >= introLine.length) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setTypedText(introLine.slice(0, typedText.length + 1));
    }, 28);

    return () => window.clearTimeout(timer);
  }, [typedText]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsCommandOpen((current) => !current);
        setLogs((current) => [...current.slice(-9), createLog("Toggled command palette.")]);
      }

      if (event.key === "Escape") {
        setIsCommandOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const appendLog = (message) => {
    setLogs((current) => [...current.slice(-9), createLog(message)]);
  };

  const openFile = (fileId, source = "explorer") => {
    const file = filesById[fileId];

    if (!file) {
      return;
    }

    setOpenFiles((current) => (
      current.includes(fileId) ? current : [...current, fileId]
    ));
    setActiveTab(fileId);
    setIsCommandOpen(false);
    appendLog(`Navigating to ${file.path} from ${source}.`);

    if (file.type === "project") {
      setExpandedFolders((current) => ({ ...current, projects: true }));
    }
  };

  const closeFile = (fileId) => {
    if (openFiles.length === 1) {
      return;
    }

    const remainingFiles = openFiles.filter((item) => item !== fileId);
    setOpenFiles(remainingFiles);

    if (activeTab === fileId) {
      setActiveTab(remainingFiles[remainingFiles.length - 1]);
    }

    appendLog(`Closed tab ${fileId}.`);
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((current) => ({
      ...current,
      [folderId]: !(current[folderId] ?? true),
    }));
  };

  const activeFile = filesById[activeTab];
  const allFiles = Object.values(filesById);
  const project = projects.find((item) => item.id === activeTab);

  return (
    <div className="min-h-screen bg-surface text-slate-100">
      <div className="relative flex min-h-screen flex-col pb-56">
        <div className="flex flex-1 flex-col lg:flex-row">
          <aside className="border-b border-slate-800/80 bg-panel/90 lg:w-80 lg:border-b-0 lg:border-r">
            <div className="border-b border-slate-800/80 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.32em] text-emerald-400">
                The Developer Console
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-white">
                Portfolio IDE
              </h1>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                Browse sections like source files, open multiple tabs, and jump
                anywhere with the command palette.
              </p>
            </div>

            <div className="space-y-4 px-4 py-4">
              <button
                type="button"
                onClick={() => setIsCommandOpen(true)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-400 transition hover:border-sky-400/40 hover:text-slate-100"
              >
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Quick Open
                </span>
                <span className="flex items-center gap-1 rounded-lg border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.24em]">
                  <Command className="h-3 w-3" />
                  K
                </span>
              </button>

              <div className="glass-panel px-3 py-4">
                <div className="mb-3 flex items-center justify-between px-2 text-xs uppercase tracking-[0.28em] text-slate-500">
                  <span>Explorer</span>
                  <span>src</span>
                </div>
                <FileTree
                  nodes={fileTree}
                  activeTab={activeTab}
                  expandedFolders={expandedFolders}
                  onOpenFile={openFile}
                  onToggleFolder={toggleFolder}
                />
              </div>
            </div>
          </aside>

          <main className="flex flex-1 flex-col">
            <div className="flex overflow-x-auto border-b border-slate-800/80 bg-panel/70 scrollbar-thin">
              {openFiles.map((fileId) => {
                const file = filesById[fileId];
                const Icon = fileIcon(file.name);

                return (
                  <button
                    key={fileId}
                    type="button"
                    onClick={() => setActiveTab(fileId)}
                    className={`editor-tab ${activeTab === fileId ? "editor-tab-active" : ""}`}
                  >
                    <Icon className="h-4 w-4 text-sky-400" />
                    <span>{file.name}</span>
                    {openFiles.length > 1 ? (
                      <span
                        className="rounded p-0.5 text-slate-500 transition hover:bg-slate-800 hover:text-slate-100"
                        onClick={(event) => {
                          event.stopPropagation();
                          closeFile(fileId);
                        }}
                        aria-hidden="true"
                      >
                        <X className="h-3.5 w-3.5" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="flex-1 p-4 md:p-6">
              <section className="editor-shell h-full min-h-[420px]">
                <div className="flex flex-col gap-3 border-b border-slate-800/80 px-5 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                      Active file
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-white">
                      {activeFile.label}
                    </h2>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-400">
                    <span className="text-slate-500">Path:</span>{" "}
                    <span className="text-sky-400">{activeFile.path}</span>
                  </div>
                </div>

                <div className="h-full px-4 py-5 md:px-6">
                  {activeTab === "index.js" ? <HomeFile typedText={typedText} /> : null}
                  {activeTab === "about.js" ? <AboutFile /> : null}
                  {activeTab === "contact.sh" ? <ContactFile /> : null}
                  {project ? (
                    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
                      <ProjectCard project={project} />
                      <div className="glass-panel px-5 py-4">
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                          Project Notes
                        </p>
                        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                          <p>
                            <span className="text-syntax-keyword">function</span>{" "}
                            <span className="text-syntax-function">outcome</span>
                            <span className="text-slate-200">()</span>{" "}
                            <span className="text-slate-200">{"{"}</span>
                          </p>
                          <p className="pl-4">
                            Each project is rendered like an editor artifact, so
                            the portfolio feels consistent with the console theme.
                          </p>
                          <p>
                            <span className="text-slate-200">{"}"}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            </div>
          </main>
        </div>

        <TerminalWindow logs={logs} />

        <footer className="fixed inset-x-0 bottom-0 z-40 flex h-9 items-center justify-between border-t border-slate-800/80 bg-slate-950 px-4 text-xs text-slate-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sky-400">
              <GitBranch className="h-3.5 w-3.5" />
              main
            </span>
            <span>UTF-8</span>
            <span>React + Tailwind</span>
          </div>
          <span>{clock.toLocaleTimeString([], { hour12: false })}</span>
        </footer>

        <CommandPalette
          isOpen={isCommandOpen}
          files={allFiles}
          onClose={() => setIsCommandOpen(false)}
          onSelect={(fileId) => openFile(fileId, "palette")}
        />
      </div>
    </div>
  );
}

export default App;
