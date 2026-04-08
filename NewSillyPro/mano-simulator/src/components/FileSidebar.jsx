import { FileCode2, FolderOpen, PencilLine, Plus, Trash2 } from "lucide-react";

function formatUpdatedAt(value) {
  const date = new Date(value);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();

  if (sameDay) {
    return `Today ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }

  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function FileSidebar({
  files,
  activeFileId,
  onOpenFile,
  onCreateFile,
  onRenameFile,
  onDeleteFile,
}) {
  const activeFile = files.find((file) => file.id === activeFileId) ?? files[0] ?? null;

  return (
    <aside className="panel file-sidebar">
      <div className="file-sidebar-head">
        <span className="eyebrow">Explorer</span>
        <div className="file-sidebar-topbar">
          <div className="section-heading">
            <h2>Files</h2>
            <p>Local workspace</p>
          </div>
          <button type="button" className="icon-button" onClick={onCreateFile} aria-label="Create new file" title="New file">
            <Plus />
          </button>
        </div>
      </div>

      <div className="workspace-badge">
        <div className="workspace-badge-row">
          <span className="workspace-badge-icon">
            <FolderOpen />
          </span>
          <div>
            <strong>MANO-SIMULATOR</strong>
            <span>{files.length} file{files.length === 1 ? "" : "s"}</span>
          </div>
        </div>
        {activeFile ? <small>Active: {activeFile.name}.ash</small> : null}
      </div>

      <div className="explorer-section">
        <div className="explorer-section-head">
          <span>OPEN EDITORS</span>
          <strong>{files.length}</strong>
        </div>
        <div className="explorer-file-list">
          {files.map((file) => {
            const isActive = file.id === activeFileId;

            return (
              <div key={file.id} className={`explorer-file-row ${isActive ? "is-active" : ""}`}>
                <button
                  type="button"
                  className="explorer-file-main"
                  onClick={() => onOpenFile(file.id)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="explorer-file-icon">
                    <FileCode2 />
                  </span>
                  <span className="explorer-file-copy">
                    <span className="explorer-file-title">{file.name}.ash</span>
                    <span className="explorer-file-meta">{formatUpdatedAt(file.updatedAt)}</span>
                  </span>
                </button>
                <div className="explorer-file-actions">
                  <button type="button" className="icon-button" onClick={() => onRenameFile(file.id)} aria-label={`Rename ${file.name}.ash`} title="Rename">
                    <PencilLine />
                  </button>
                  <button type="button" className="icon-button danger-button" onClick={() => onDeleteFile(file.id)} aria-label={`Delete ${file.name}.ash`} title="Delete">
                    <Trash2 />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="explorer-footer-note">
        <span>Tip</span>
        <p>Use the + button to add files, then switch between them here like a compact editor explorer.</p>
      </div>
    </aside>
  );
}
