import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileUp, Download, Mail, MapPin, Settings2, X } from "lucide-react";
import { assemble } from "./assembler/assembler.js";
import { BasicComputer } from "./cpu/basicComputer.js";
import { AssemblerSummary } from "./components/AssemblerSummary.jsx";
import { CodeEditor } from "./components/CodeEditor.jsx";
import { DocumentationPanel } from "./components/DocumentationPanel.jsx";
import { ExecutionPanel } from "./components/ExecutionPanel.jsx";
import { FileSidebar } from "./components/FileSidebar.jsx";
import { MemoryViewer } from "./components/MemoryViewer.jsx";
import { RegisterPanel } from "./components/RegisterPanel.jsx";
import { SettingsPanel } from "./components/SettingsPanel.jsx";
import { SAMPLE_PROGRAMS } from "./samplePrograms.js";
import "./index.css";

const DEFAULT_SOURCE = SAMPLE_PROGRAMS.addWithHexData.code;
const STORAGE_KEY = "mano-workspace-files-v1";
const ACTIVE_FILE_KEY = "mano-workspace-active-file-v1";
const OPEN_TABS_KEY = "mano-workspace-open-tabs-v1";
const APPEARANCE_KEY = "mano-workspace-appearance-v1";

function WelcomeScreen({ onEnter }) {
  const floatingItems = [
    { label: "LDA", kind: "opcode" },
    { label: "ADD", kind: "opcode" },
    { label: "BUN", kind: "opcode" },
    { label: "HEX", kind: "directive" },
    { label: "ORG", kind: "directive" },
    { label: "INP", kind: "io" },
    { label: "OUT", kind: "io" },
    { label: "0010 1101", kind: "binary" },
    { label: "AR -> AC", kind: "rtl" },
    { label: "</>", kind: "symbol" },
    { label: "{ }", kind: "symbol" },
    { label: "[]", kind: "symbol" },
  ];

  return (
    <main className="intro-screen">
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-glow intro-glow-a" aria-hidden="true" />
      <div className="intro-glow intro-glow-b" aria-hidden="true" />
      <div className="intro-noise" aria-hidden="true" />
      <div className="intro-floating-layer" aria-hidden="true">
        {floatingItems.map((item, index) => (
          <span key={`${item.label}-${index}`} className={`intro-float intro-float-${(index % 6) + 1} intro-float-${item.kind}`}>
            {item.label}
          </span>
        ))}
      </div>

      <section className="intro-card">
        <span className="intro-kicker">Basic Computer Assembly Language</span>
        <h1>Codembly</h1>
        <p>
          A modern workspace for writing, assembling, and stepping through Morris Mano Basic Computer programs with live runtime inspection.
        </p>
        <div className="intro-actions">
          <button type="button" className="intro-cta" onClick={onEnter}>
            Get Started
          </button>
        </div>
        <div className="intro-feature-row">
          <span>Assembler</span>
          <span>Registers</span>
          <span>Memory</span>
          <span>Execution</span>
        </div>
      </section>
    </main>
  );
}

function saveTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function createFileRecord(name, content = "") {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    content,
    updatedAt: Date.now(),
  };
}

function getDefaultWorkspace() {
  const starter = createFileRecord("MAIN", DEFAULT_SOURCE);
  return {
    files: [starter],
    activeFileId: starter.id,
    openFileIds: [starter.id],
  };
}

function loadWorkspace() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const activeFileId = window.localStorage.getItem(ACTIVE_FILE_KEY);
    const rawOpenTabs = window.localStorage.getItem(OPEN_TABS_KEY);
    if (!raw) {
      return getDefaultWorkspace();
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return getDefaultWorkspace();
    }
    const files = parsed
      .filter((file) => file && typeof file.name === "string" && typeof file.content === "string")
      .map((file) => ({
        id: file.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        name: file.name.replace(/\.ASH$/i, "") || "UNTITLED",
        content: file.content,
        updatedAt: file.updatedAt ?? Date.now(),
      }));

    if (files.length === 0) {
      return getDefaultWorkspace();
    }

    const selectedId = files.some((file) => file.id === activeFileId) ? activeFileId : files[0].id;
    const parsedOpenTabs = (() => {
      try {
        const list = JSON.parse(rawOpenTabs ?? "[]");
        return Array.isArray(list) ? list.filter((id) => files.some((file) => file.id === id)) : [];
      } catch {
        return [];
      }
    })();

    return {
      files,
      activeFileId: selectedId,
      openFileIds: parsedOpenTabs.length ? parsedOpenTabs : [selectedId],
    };
  } catch {
    return getDefaultWorkspace();
  }
}

function loadAppearanceSettings() {
  try {
    const raw = window.localStorage.getItem(APPEARANCE_KEY);
    if (!raw) {
      return {
        theme: "light",
        stylePreset: "studio",
        fontPreset: "modern",
        density: "comfortable",
      };
    }

    const parsed = JSON.parse(raw);

    return {
      theme: parsed.theme === "dark" ? "dark" : "light",
      stylePreset: ["basic", "studio", "vscode", "mano"].includes(parsed.stylePreset) ? parsed.stylePreset : "studio",
      fontPreset: ["modern", "editor", "classic"].includes(parsed.fontPreset) ? parsed.fontPreset : "modern",
      density: parsed.density === "compact" ? "compact" : "comfortable",
    };
  } catch {
    return {
      theme: "light",
      stylePreset: "studio",
      fontPreset: "modern",
      density: "comfortable",
    };
  }
}

function sanitizeFileName(value) {
  return value.toUpperCase().replace(/\.ASH$/i, "").replace(/[^A-Z0-9_-]/g, "_").trim();
}

function buildAddressToLineMap(listing) {
  const map = new Map();
  listing.forEach((line) => {
    if (line.address !== null && line.address !== undefined) {
      map.set(line.address, line.lineNumber);
    }
  });
  return map;
}

function buildErrorLineSet(errors) {
  return new Set(errors.map((error) => error.lineNumber));
}

function createComputer() {
  return new BasicComputer();
}

function createEmptyAssembly() {
  return {
    lines: [],
    listing: [],
    image: [],
    symbolTable: new Map(),
    errors: [],
    startAddress: 0,
  };
}

function createAssemblyForSource(text) {
  return text.trim() ? assemble(text) : createEmptyAssembly();
}

export default function App() {
  const initialWorkspace = useMemo(() => loadWorkspace(), []);
  const initialAppearance = useMemo(() => loadAppearanceSettings(), []);
  const computerRef = useRef(createComputer());
  const frameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const stepAccumulatorRef = useRef(0);
  const importInputRef = useRef(null);
  const [files, setFiles] = useState(initialWorkspace.files);
  const [activeFileId, setActiveFileId] = useState(initialWorkspace.activeFileId);
  const [openFileIds, setOpenFileIds] = useState(initialWorkspace.openFileIds ?? [initialWorkspace.activeFileId]);
  const [dirtyFileIds, setDirtyFileIds] = useState([]);
  const [source, setSource] = useState(() => initialWorkspace.files.find((file) => file.id === initialWorkspace.activeFileId)?.content ?? "");
  const [assembly, setAssembly] = useState(() => createAssemblyForSource(initialWorkspace.files.find((file) => file.id === initialWorkspace.activeFileId)?.content ?? ""));
  const [computerState, setComputerState] = useState(() => computerRef.current.getState());
  const [changedRegisters, setChangedRegisters] = useState([]);
  const [changedFlags, setChangedFlags] = useState([]);
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [runSpeed, setRunSpeed] = useState(4);
  const [bottomTab, setBottomTab] = useState("listing");
  const [inspectorView, setInspectorView] = useState("machine");
  const [machineView, setMachineView] = useState("memory");
  const [analysisView, setAnalysisView] = useState("execution");
  const [memoryDisplayMode, setMemoryDisplayMode] = useState("hex");
  const [appearance, setAppearance] = useState(initialAppearance);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isWelcomeClosing, setIsWelcomeClosing] = useState(false);
  const [isAppEntering, setIsAppEntering] = useState(false);
  const [toast, setToast] = useState(null);
  const activeFile = useMemo(
    () => (activeFileId ? files.find((file) => file.id === activeFileId) ?? null : null),
    [files, activeFileId],
  );

  const addressToLine = useMemo(() => buildAddressToLineMap(assembly.listing), [assembly]);
  const errorLines = useMemo(() => buildErrorLineSet(assembly.errors), [assembly]);

  const syncCpuState = useCallback((result) => {
    setComputerState(result.state);
    setChangedRegisters(result.changedRegisters ?? []);
    setChangedFlags(result.changedFlags ?? []);
    if (result.rtl) {
      const line = addressToLine.get(result.state.registers.PC) ?? addressToLine.get(result.state.registers.AR) ?? null;
      setHistory((prev) =>
        [{ id: `${Date.now()}-${prev.length}`, timing: result.state.meta.timing, phase: result.state.meta.phase, rtl: result.rtl, line }].concat(prev).slice(0, 20),
      );
    }
  }, [addressToLine]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    if (activeFileId) {
      window.localStorage.setItem(ACTIVE_FILE_KEY, activeFileId);
    } else {
      window.localStorage.removeItem(ACTIVE_FILE_KEY);
    }
  }, [activeFileId]);

  useEffect(() => {
    window.localStorage.setItem(OPEN_TABS_KEY, JSON.stringify(openFileIds));
  }, [openFileIds]);

  useEffect(() => {
    if (activeFile) {
      setSource(activeFile.content);
    } else {
      setSource("");
    }
  }, [activeFile]);

  const handleAssemble = () => {
    const nextAssembly = createAssemblyForSource(source);
    setAssembly(nextAssembly);
    setHistory([]);
    setChangedRegisters([]);
    setChangedFlags([]);
    setIsRunning(false);

    const computer = computerRef.current;
    computer.reset();
    if (nextAssembly.errors.length === 0) {
      computer.loadProgram(nextAssembly.image, nextAssembly.startAddress);
      if (activeFileId) {
        setDirtyFileIds((prev) => prev.filter((id) => id !== activeFileId));
      }
      setToast({ kind: "success", text: "Assemble successful. Program loaded into memory." });
    } else {
      setToast({ kind: "error", text: `Assembly failed with ${nextAssembly.errors.length} issue${nextAssembly.errors.length > 1 ? "s" : ""}.` });
    }
    setComputerState(computer.getState());
  };

  const stepOne = () => {
    const result = computerRef.current.stepMicroOperation(true);
    syncCpuState(result);
    if (result.state.meta.halted) {
      setIsRunning(false);
    }
    return result;
  };

  const handleStep = () => {
    if (assembly.errors.length > 0) {
      return;
    }
    stepOne();
  };

  const handleRun = () => {
    if (assembly.errors.length > 0) {
      setToast({ kind: "error", text: "Fix assembly errors before running the program." });
      return;
    }
    setIsRunning((prev) => !prev);
    if (!isRunning) {
      computerRef.current.start();
    } else {
      computerRef.current.stop();
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setHistory([]);
    setChangedRegisters([]);
    setChangedFlags([]);
    const computer = computerRef.current;
    computer.reset();
    if (assembly.errors.length === 0) {
      computer.loadProgram(assembly.image, assembly.startAddress);
    }
    setComputerState(computer.getState());
  };

  const handleAppearanceChange = (key, value) => {
    setAppearance((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearSource = () => {
    const confirmed = window.confirm("Are you sure you want to clear the editor?");
    if (!confirmed) {
      return;
    }

    setSource("");
    if (activeFileId) {
      setDirtyFileIds((prev) => (prev.includes(activeFileId) ? prev : [...prev, activeFileId]));
      setFiles((prev) =>
        prev.map((file) => (file.id === activeFileId ? { ...file, content: "", updatedAt: Date.now() } : file)),
      );
    }
    setAssembly({
      ...createEmptyAssembly(),
    });
    setHistory([]);
    setChangedRegisters([]);
    setChangedFlags([]);
    setIsRunning(false);
    computerRef.current.reset();
    setComputerState(computerRef.current.getState());
  };

  const handleLoadSample = (key) => {
    if (!key || !SAMPLE_PROGRAMS[key]) {
      return;
    }
    setSource(SAMPLE_PROGRAMS[key].code);
    if (activeFileId) {
      setDirtyFileIds((prev) => (prev.includes(activeFileId) ? prev : [...prev, activeFileId]));
      setFiles((prev) =>
        prev.map((file) =>
          file.id === activeFileId
            ? { ...file, content: SAMPLE_PROGRAMS[key].code, updatedAt: Date.now() }
            : file,
        ),
      );
    }
    setTimeout(() => {
      const nextAssembly = createAssemblyForSource(SAMPLE_PROGRAMS[key].code);
      setAssembly(nextAssembly);
      const computer = computerRef.current;
      computer.reset();
      if (nextAssembly.errors.length === 0) {
        computer.loadProgram(nextAssembly.image, nextAssembly.startAddress);
        setToast({ kind: "success", text: `Loaded sample: ${SAMPLE_PROGRAMS[key].name}.` });
      } else {
        setToast({ kind: "error", text: `Sample loaded, but assembly found ${nextAssembly.errors.length} issue${nextAssembly.errors.length > 1 ? "s" : ""}.` });
      }
      setComputerState(computer.getState());
      setHistory([]);
      setChangedRegisters([]);
      setChangedFlags([]);
      setBottomTab("listing");
      setIsRunning(false);
    }, 0);
  };

  const handleLoadInput = () => {
    if (!inputBuffer) {
      return;
    }
    computerRef.current.queueInput(inputBuffer);
    setComputerState(computerRef.current.getState());
    setInputBuffer("");
  };

  const handleSourceChange = (nextSource) => {
    setSource(nextSource);
    if (!activeFileId) {
      return;
    }
    setDirtyFileIds((prev) => (prev.includes(activeFileId) ? prev : [...prev, activeFileId]));
    setFiles((prev) =>
      prev.map((file) =>
        file.id === activeFileId ? { ...file, content: nextSource, updatedAt: Date.now() } : file,
      ),
    );
  };

  const handleOpenFile = (fileId) => {
    setOpenFileIds((prev) => (prev.includes(fileId) ? prev : [...prev, fileId]));
    setActiveFileId(fileId);
    const file = files.find((entry) => entry.id === fileId);
    if (file) {
      setSource(file.content);
      setAssembly(createAssemblyForSource(file.content));
      setToast({ kind: "success", text: `Opened ${file.name}.ash` });
    }
  };

  const handleCloseFileTab = (fileId) => {
    setOpenFileIds((prev) => {
      const nextOpenIds = prev.filter((id) => id !== fileId);

      if (activeFileId === fileId) {
        const fallbackId = nextOpenIds[nextOpenIds.length - 1] ?? null;
        setActiveFileId(fallbackId);
        if (fallbackId) {
          const fallbackFile = files.find((file) => file.id === fallbackId);
          if (fallbackFile) {
            setSource(fallbackFile.content);
            setAssembly(createAssemblyForSource(fallbackFile.content));
          }
        } else {
          setSource("");
          setAssembly(createEmptyAssembly());
        }
      }

      return nextOpenIds;
    });
  };

  const handleCreateFile = () => {
    const input = window.prompt("Enter a file name for the new assembly file:");
    if (!input) {
      return;
    }
    const name = sanitizeFileName(input);
    if (!name) {
      setToast({ kind: "error", text: "File name cannot be empty." });
      return;
    }
    if (files.some((file) => file.name === name)) {
      setToast({ kind: "error", text: `File ${name}.ash already exists.` });
      return;
    }
    const newFile = createFileRecord(name, "");
    setFiles((prev) => [...prev, newFile]);
    setOpenFileIds((prev) => [...prev, newFile.id]);
    setActiveFileId(newFile.id);
    setSource("");
    setAssembly(createEmptyAssembly());
    computerRef.current.reset();
    setComputerState(computerRef.current.getState());
    setDirtyFileIds((prev) => prev.filter((id) => id !== newFile.id));
    setToast({ kind: "success", text: `Created ${name}.ash` });
  };

  const handleRenameFile = (fileId) => {
    const target = files.find((file) => file.id === fileId);
    if (!target) {
      return;
    }
    const input = window.prompt("Rename assembly file:", target.name);
    if (!input) {
      return;
    }
    const nextName = sanitizeFileName(input);
    if (!nextName) {
      setToast({ kind: "error", text: "File name cannot be empty." });
      return;
    }
    if (files.some((file) => file.id !== fileId && file.name === nextName)) {
      setToast({ kind: "error", text: `File ${nextName}.ash already exists.` });
      return;
    }
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, name: nextName } : file)));
    setToast({ kind: "success", text: `Renamed file to ${nextName}.ash` });
  };

  const handleDeleteFile = (fileId) => {
    const target = files.find((file) => file.id === fileId);
    if (!target) {
      return;
    }
    if (files.length === 1) {
      setToast({ kind: "error", text: "At least one .ash file must remain in the workspace." });
      return;
    }
    const confirmed = window.confirm(`Delete ${target.name}.ash?`);
    if (!confirmed) {
      return;
    }
    const nextFiles = files.filter((file) => file.id !== fileId);
    setFiles(nextFiles);
    setOpenFileIds((prev) => prev.filter((id) => id !== fileId));
    setDirtyFileIds((prev) => prev.filter((id) => id !== fileId));
    if (activeFileId === fileId) {
      const nextActive = nextFiles[0] ?? null;
      setActiveFileId(nextActive?.id ?? null);
      setSource(nextActive?.content ?? "");
      setAssembly(createAssemblyForSource(nextActive?.content ?? ""));
    }
    setToast({ kind: "success", text: `Deleted ${target.name}.ash` });
  };

  const handleExportFile = useCallback(() => {
    if (!activeFile) {
      return;
    }
    saveTextFile(`${activeFile.name}.ash`, activeFile.content);
    setDirtyFileIds((prev) => prev.filter((id) => id !== activeFile.id));
    setToast({ kind: "success", text: `Exported ${activeFile.name}.ash` });
  }, [activeFile]);

  const handleOpenImportPicker = useCallback(() => {
    importInputRef.current?.click();
  }, []);

  const handleImportFile = async (event) => {
    const fileObject = event.target.files?.[0];
    if (!fileObject) {
      return;
    }

    try {
      const importedContent = await fileObject.text();
      const rawName = fileObject.name.replace(/\.[^.]+$/, "");
      const baseName = sanitizeFileName(rawName || "IMPORTED");
      let nextName = baseName || "IMPORTED";
      let suffix = 1;

      while (files.some((file) => file.name === nextName)) {
        nextName = `${baseName}_${suffix}`;
        suffix += 1;
      }

      const newFile = createFileRecord(nextName, importedContent.toUpperCase());
      setFiles((prev) => [...prev, newFile]);
      setOpenFileIds((prev) => [...prev, newFile.id]);
      setActiveFileId(newFile.id);
      setSource(newFile.content);
      setAssembly(createAssemblyForSource(newFile.content));
      setDirtyFileIds((prev) => prev.filter((id) => id !== newFile.id));
      setBottomTab("listing");
      setToast({ kind: "success", text: `Imported ${newFile.name}.ash` });
    } catch {
      setToast({ kind: "error", text: "Could not import that file." });
    } finally {
      event.target.value = "";
    }
  };

  useEffect(() => {
    handleAssemble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = appearance.theme;
    document.documentElement.dataset.stylePreset = appearance.stylePreset;
    document.documentElement.dataset.fontPreset = appearance.fontPreset;
    document.documentElement.dataset.density = appearance.density;
    window.localStorage.setItem(APPEARANCE_KEY, JSON.stringify(appearance));
  }, [appearance]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!isSettingsOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSettingsOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isModifier = event.ctrlKey || event.metaKey;
      const target = event.target;
      const isTypingTarget =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (isModifier && event.shiftKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        handleExportFile();
        return;
      }

      if (isModifier && event.key.toLowerCase() === "s") {
        event.preventDefault();
        handleAssemble();
        return;
      }

      if (isModifier && event.key.toLowerCase() === "o") {
        event.preventDefault();
        handleOpenImportPicker();
        return;
      }

      if (isModifier && event.key.toLowerCase() === "n") {
        event.preventDefault();
        handleCreateFile();
        return;
      }

      if (event.key === "F5") {
        event.preventDefault();
        handleRun();
        return;
      }

      if (event.key === "F10" && !isTypingTarget) {
        event.preventDefault();
        handleStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleExportFile, handleOpenImportPicker, activeFileId, source, isRunning, assembly.errors.length, files]);

  useEffect(() => {
    if (!isRunning) {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      lastFrameTimeRef.current = 0;
      stepAccumulatorRef.current = 0;
      return undefined;
    }

    const baseMicroStepsPerSecond = 24;
    const targetMicroStepsPerSecond = baseMicroStepsPerSecond * runSpeed;
    const maxStepsPerFrame = 320;

    const tick = (timestamp) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }

      const elapsedMs = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;
      stepAccumulatorRef.current += (elapsedMs * targetMicroStepsPerSecond) / 1000;

      const stepsToRun = Math.min(maxStepsPerFrame, Math.floor(stepAccumulatorRef.current));
      if (stepsToRun > 0) {
        stepAccumulatorRef.current -= stepsToRun;
        let latestResult = null;

        for (let index = 0; index < stepsToRun; index += 1) {
          latestResult = computerRef.current.stepMicroOperation();
          if (latestResult.done || latestResult.state.meta.halted) {
            syncCpuState(latestResult);
            setIsRunning(false);
            frameRef.current = null;
            return;
          }
        }

        if (latestResult) {
          syncCpuState(latestResult);
        }
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      lastFrameTimeRef.current = 0;
      stepAccumulatorRef.current = 0;
    };
  }, [isRunning, runSpeed, syncCpuState]);

  const currentEditorLine = addressToLine.get(computerState.registers.PC) ?? null;

  const handleEnterApp = () => {
    setIsWelcomeClosing(true);
    window.setTimeout(() => {
      setShowWelcome(false);
      setIsWelcomeClosing(false);
      setIsAppEntering(true);
      window.setTimeout(() => {
        setIsAppEntering(false);
      }, 700);
    }, 900);
  };

  if (showWelcome) {
    return (
      <div className={isWelcomeClosing ? "intro-screen-shell is-leaving" : "intro-screen-shell"}>
        <WelcomeScreen onEnter={handleEnterApp} />
      </div>
    );
  }

  return (
    <main className={`app-shell ${isRunning ? "app-running" : ""} ${isAppEntering ? "app-entering" : ""}`}>
      {toast ? (
        <div className={`toast-notice ${toast.kind}`}>
          {toast.text}
        </div>
      ) : null}
      <header className="hero compact-hero">
        <div className="brand-block">
          <h1>Codembly</h1>
          <p className="hero-copy">Basic Computer Assembly Language</p>
        </div>
        <div className="status-stack">
          <span className={`status-pill ${computerState.meta.halted ? "danger" : isRunning ? "active" : ""}`}>
            {computerState.meta.halted ? "HALTED" : isRunning ? "RUNNING" : "READY"}
          </span>
          <span className="status-pill subtle">PC {computerState.registers.PC.toString(16).toUpperCase().padStart(3, "0")}</span>
          <span className="status-pill subtle">{assembly.errors.length ? "ASSEMBLY BLOCKED" : "ASSEMBLED"}</span>
        </div>
        <div className="header-tools">
          <input ref={importInputRef} type="file" accept=".ash,.txt,text/plain" className="hidden-file-input" onChange={handleImportFile} />
          <select defaultValue="" onChange={(event) => handleLoadSample(event.target.value)}>
            <option value="" disabled>
              Load sample program
            </option>
            {Object.entries(SAMPLE_PROGRAMS).map(([key, sample]) => (
              <option key={key} value={key}>
                {sample.name}
              </option>
            ))}
          </select>
          <button type="button" className="menu-icon-button" onClick={handleOpenImportPicker} aria-label="Import file" title="Import file">
            <FileUp />
          </button>
          <button type="button" className="menu-icon-button" onClick={handleExportFile} disabled={!activeFile} aria-label="Export file" title="Export file">
            <Download />
          </button>
          <button type="button" className="menu-icon-button settings-trigger" onClick={() => setIsSettingsOpen(true)} aria-label="Open settings" title="Settings">
            <Settings2 />
          </button>
        </div>
      </header>

      <SettingsPanel
        isOpen={isSettingsOpen}
        settings={appearance}
        onChange={handleAppearanceChange}
        onClose={() => setIsSettingsOpen(false)}
      />

      <section className="workspace-shell">
        <FileSidebar
          files={files}
          activeFileId={activeFileId}
          onOpenFile={handleOpenFile}
          onCreateFile={handleCreateFile}
          onRenameFile={handleRenameFile}
          onDeleteFile={handleDeleteFile}
        />
        <div className="workspace-main">
      <div className="editor-tab-strip panel">
        <div className="editor-tab-strip-list">
          {openFileIds.map((fileId) => {
            const file = files.find((entry) => entry.id === fileId);
            if (!file) {
              return null;
            }

            return (
            <button
              key={file.id}
              type="button"
              className={`editor-tab-chip ${file.id === activeFileId ? "is-active" : ""}`}
              onClick={() => handleOpenFile(file.id)}
              aria-current={file.id === activeFileId ? "page" : undefined}
            >
              <span className="editor-tab-chip-icon" aria-hidden="true">
                {`</>`}
              </span>
              <span className="editor-tab-chip-label">
                {file.name}.ash
                {dirtyFileIds.includes(file.id) ? <span className="editor-tab-dirty-dot" aria-label="Unsaved changes" title="Unsaved changes" /> : null}
              </span>
              <span
                className="editor-tab-close"
                role="button"
                tabIndex={0}
                aria-label={`Close ${file.name}.ash`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleCloseFileTab(file.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    handleCloseFileTab(file.id);
                  }
                }}
              >
                <X />
              </span>
            </button>
          );
          })}
        </div>
      </div>
      <section className="workspace-grid">
        <div className="left-column">
          <section className="panel tall-panel">
            <div className="section-title-row">
              <div className="section-heading">
                <h2>Assembly Editor</h2>
                <p>{activeFile ? "Uppercase source, line-aware focus, and syntax color for Mano instructions." : "Open a file or start a new one to begin writing Basic Computer assembly."}</p>
              </div>
              <span className="chip">{activeFile ? `${activeFile.name}.ASH` : "NO OPEN TAB"}</span>
            </div>
            {activeFile ? (
              <>
                <div className="editor-toolbar">
                  <div className="editor-toolbar-row editor-toolbar-row-secondary">
                    <div className="editor-actionbar">
                      <div className="editor-actionbar-main">
                        <button type="button" className="action-button action-button-primary" onClick={handleAssemble}>
                          Assemble
                        </button>
                        <button type="button" className="action-button action-button-secondary" onClick={handleStep} disabled={assembly.errors.length > 0 || isRunning}>
                          Step
                        </button>
                        <button type="button" className={`action-button ${isRunning ? "action-button-warning" : "action-button-success"}`} onClick={handleRun} disabled={assembly.errors.length > 0}>
                          {isRunning ? "Pause" : "Run"}
                        </button>
                        <button type="button" className="action-button action-button-secondary" onClick={handleReset}>
                          Reset
                        </button>
                        <button type="button" className="action-button action-button-danger-soft" onClick={handleClearSource}>
                          Clear
                        </button>
                        <div className="editor-input-inline">
                          <input type="text" value={inputBuffer} onChange={(event) => setInputBuffer(event.target.value.toUpperCase())} placeholder="ASCII INPUT" />
                          <button type="button" className="action-button action-button-secondary" onClick={handleLoadInput}>
                            Load
                          </button>
                        </div>
                      </div>

                      <div className="editor-toolbar-meta">
                        <div className="speed-control">
                          <label htmlFor="speed-bar">Speed</label>
                          <input
                            id="speed-bar"
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            value={runSpeed}
                            onChange={(event) => setRunSpeed(Number(event.target.value))}
                          />
                          <span>{runSpeed}x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CodeEditor value={source} onChange={handleSourceChange} activeLine={currentEditorLine} errorLines={errorLines} isDark={appearance.theme === "dark"} />
              </>
            ) : (
              <div className="editor-empty-state">
                <div className="editor-empty-copy">
                  <span className="eyebrow">Start Here</span>
                  <h3>No file is open</h3>
                  <p>Create a new assembly file, import an existing `.ash` file, or load a simple sample program to start exploring Codembly.</p>
                </div>
                <div className="editor-empty-actions">
                  <button type="button" className="action-button action-button-primary" onClick={handleCreateFile}>
                    New File
                  </button>
                  <button type="button" className="action-button action-button-secondary" onClick={handleOpenImportPicker}>
                    Import File
                  </button>
                </div>
                <div className="editor-empty-samples">
                  <span className="editor-empty-samples-label">Quick samples</span>
                  <div className="editor-empty-sample-list">
                    {Object.entries(SAMPLE_PROGRAMS).slice(0, 4).map(([key, sample]) => (
                      <button key={key} type="button" className="editor-empty-sample" onClick={() => handleLoadSample(key)}>
                        {sample.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="editor-empty-shortcuts">
                  <span>`Ctrl+N` new file</span>
                  <span>`Ctrl+O` import file</span>
                  <span>Select a file from the explorer to reopen it</span>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="right-column">
          <section className="panel inspector-shell">
            <div className="inspector-tab-strip">
              <button type="button" className={`inspector-tab ${inspectorView === "machine" ? "is-active" : ""}`} onClick={() => setInspectorView("machine")}>
                Machine View
              </button>
              <button type="button" className={`inspector-tab ${inspectorView === "runtime" ? "is-active" : ""}`} onClick={() => setInspectorView("runtime")}>
                Runtime View
              </button>
            </div>
            {inspectorView === "machine" ? (
              <section className="inspector-pane">
                <div className="inspector-pane-header">
                  <div className="inspector-pane-title-wrap">
                    <span className="inspector-pane-kicker">Inspector</span>
                    <h2 className="inspector-pane-title">Machine View</h2>
                  </div>
                  <div className="inspector-subtab-strip">
                    <button type="button" className={`inspector-subtab ${machineView === "memory" ? "is-active" : ""}`} onClick={() => setMachineView("memory")}>
                      Memory
                    </button>
                    <button type="button" className={`inspector-subtab ${machineView === "registers" ? "is-active" : ""}`} onClick={() => setMachineView("registers")}>
                      Registers & Flags
                    </button>
                  </div>
                </div>
                <div className="machine-switcher-body">
                  {machineView === "registers" ? (
                    <RegisterPanel
                      registers={computerState.registers}
                      changedRegisters={changedRegisters}
                      flags={computerState.flags}
                      changedFlags={changedFlags}
                      embedded
                    />
                  ) : (
                    <MemoryViewer
                      memory={computerState.memory}
                      pc={computerState.registers.PC}
                      lastAccessedAddress={computerState.meta.lastAccessedAddress}
                      compact
                      embedded
                      symbols={assembly.symbolTable}
                      listing={assembly.listing}
                      displayMode={memoryDisplayMode}
                      onDisplayModeChange={setMemoryDisplayMode}
                    />
                  )}
                </div>
              </section>
            ) : (
              <section className="inspector-pane">
                <div className="inspector-pane-header">
                  <div className="inspector-pane-title-wrap">
                    <span className="inspector-pane-kicker">Inspector</span>
                    <h2 className="inspector-pane-title">Runtime View</h2>
                  </div>
                  <div className="inspector-subtab-strip">
                    <button type="button" className={`inspector-subtab ${analysisView === "execution" ? "is-active" : ""}`} onClick={() => setAnalysisView("execution")}>
                      Step Execution
                    </button>
                    <button type="button" className={`inspector-subtab ${analysisView === "io" ? "is-active" : ""}`} onClick={() => setAnalysisView("io")}>
                      Output & Errors
                    </button>
                  </div>
                </div>
                <div className="machine-switcher-body">
                  {analysisView === "execution" ? (
                    <ExecutionPanel meta={computerState.meta} history={history} currentLine={currentEditorLine} isRunning={isRunning} embedded />
                  ) : (
                    <section className="panel embedded-panel runtime-combo-panel">
                      <div className="runtime-output-box runtime-output-box-fill">
                        <div className="runtime-output-head">
                          <span className="eyebrow">Output</span>
                          <strong>ASCII from OUTR</strong>
                        </div>
                        <pre className="terminal-output embedded-terminal-output runtime-terminal-fill">
                          {computerState.meta.outputBuffer || "No output yet."}
                        </pre>
                      </div>
                      <div className="runtime-error-block">
                        <div className="runtime-error-head">
                          <span className="eyebrow">Assembler</span>
                          <strong>Error Log</strong>
                          <span className={`chip ${assembly.errors.length ? "chip-danger" : "chip-ok"}`}>
                            {assembly.errors.length ? `${assembly.errors.length} issues` : "Assembler happy"}
                          </span>
                        </div>
                        <div className="error-list runtime-error-list">
                          {assembly.errors.length === 0 ? <p className="muted">No errors. The assembler is calm, fed, and cooperative.</p> : null}
                          {assembly.errors.map((error, index) => (
                            <article key={`${error.lineNumber}-${index}`} className="error-item">
                              <strong>Line {error.lineNumber}</strong>
                              <p>{error.message}</p>
                              {error.suggestion ? <span>{error.suggestion}</span> : null}
                            </article>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </section>
            )}
          </section>
        </div>
      </section>

      <section className="tabs">
        <button type="button" className={bottomTab === "listing" ? "active" : ""} onClick={() => setBottomTab("listing")}>
          Listing
        </button>
        <button type="button" className={bottomTab === "docs" ? "active" : ""} onClick={() => setBottomTab("docs")}>
          How To Use
        </button>
      </section>

      <section className="bottom-grid">
        {bottomTab === "listing" ? <AssemblerSummary listing={assembly.listing} symbols={assembly.symbolTable} /> : null}
        {bottomTab === "docs" ? <DocumentationPanel /> : null}
      </section>
      </div>
      </section>
      <footer className="footer-note-panel">
        <div className="footer-note">
          <div className="footer-brand">
            <div className="footer-note-copy">
              <strong>Codembly</strong>
              <p>A browser-based workspace for writing, assembling, and exploring Basic Computer assembly language with live memory and execution views.</p>
            </div>
            <div className="footer-note-meta">
              <span>Made with AI</span>
              <span>Created by Vivek Khasiya</span>
            </div>
          </div>
          <div className="footer-connect">
            <span className="footer-section-label">Connect</span>
            <div className="footer-contact-links">
              <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:vivek@example.com" aria-label="Email">
                <Mail />
                <span>vivek@example.com</span>
              </a>
              <div className="footer-contact-item" aria-label="Location">
                <MapPin />
                <span>Ahmedabad, India</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-4.3 1.4-4.3-2.4-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8A5.3 5.3 0 0 0 19 4.8 4.9 4.9 0 0 0 18.9 1S17.7.7 15 2.5a13.4 13.4 0 0 0-6 0C6.3.7 5.1 1 5.1 1A4.9 4.9 0 0 0 5 4.8a5.3 5.3 0 0 0-1.3 3.9c0 5.2 3.2 6.4 6.2 6.8a3.4 3.4 0 0 0-.9 2.6V22" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
