const STYLE_OPTIONS = [
  {
    value: "basic",
    label: "Basic",
    description: "Flat, restrained, dark surfaces with minimal rounding and cleaner contrast.",
  },
  {
    value: "studio",
    label: "Studio",
    description: "The current polished simulator look with warm glass panels.",
  },
  {
    value: "vscode",
    label: "VS Code",
    description: "A denser editor-style layout with muted surfaces and IDE-like contrast.",
  },
  {
    value: "mano",
    label: "Simple Mano",
    description: "A flatter classroom-style simulator skin focused on clarity and simplicity.",
  },
];

const THEME_OPTIONS = [
  {
    value: "light",
    label: "Light",
    description: "Bright panels with softer contrast for daytime use.",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Low-glare surfaces for long coding sessions.",
  },
];

const FONT_OPTIONS = [
  {
    value: "modern",
    label: "Modern",
    description: "Space Grotesk with IBM Plex Mono.",
  },
  {
    value: "editor",
    label: "Editor",
    description: "Segoe UI with Cascadia Mono for an IDE feel.",
  },
  {
    value: "classic",
    label: "Classic",
    description: "Trebuchet with Courier New for a simpler lab vibe.",
  },
];

const DENSITY_OPTIONS = [
  {
    value: "comfortable",
    label: "Comfortable",
    description: "More spacing across panels and controls.",
  },
  {
    value: "compact",
    label: "Compact",
    description: "Tighter spacing to fit more simulator content.",
  },
];

function OptionGroup({ title, description, options, value, onChange }) {
  return (
    <section className="settings-group">
      <div className="settings-group-copy">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <div className="settings-option-grid">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`settings-option-card ${value === option.value ? "is-active" : ""}`}
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
          >
            <span>{option.label}</span>
            <small>{option.description}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

export function SettingsPanel({ isOpen, settings, onChange, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="settings-overlay" role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={onClose}>
      <div className="panel settings-panel" onClick={(event) => event.stopPropagation()}>
        <div className="settings-panel-head">
          <div className="section-heading">
            <span className="eyebrow">Customize</span>
            <h2 id="settings-title">Workspace Settings</h2>
            <p>Change the overall look, theme, and typography of the simulator.</p>
          </div>
          <button type="button" className="settings-close-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="settings-panel-body">
          <OptionGroup
            title="Style Preset"
            description="Switch the whole project between different visual systems."
            options={STYLE_OPTIONS}
            value={settings.stylePreset}
            onChange={(nextValue) => onChange("stylePreset", nextValue)}
          />
          <OptionGroup
            title="Theme Mode"
            description="Apply the selected preset in light or dark mode."
            options={THEME_OPTIONS}
            value={settings.theme}
            onChange={(nextValue) => onChange("theme", nextValue)}
          />
          <OptionGroup
            title="Fonts"
            description="Choose the app and code-editor typography pair."
            options={FONT_OPTIONS}
            value={settings.fontPreset}
            onChange={(nextValue) => onChange("fontPreset", nextValue)}
          />
          <OptionGroup
            title="Density"
            description="Control spacing across the workspace."
            options={DENSITY_OPTIONS}
            value={settings.density}
            onChange={(nextValue) => onChange("density", nextValue)}
          />
        </div>
      </div>
    </div>
  );
}
