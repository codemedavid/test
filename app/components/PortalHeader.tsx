export default function PortalHeader() {
  return (
    <header className="doj-header">
      <div className="doj-brand">
        <div className="doj-seal" aria-hidden="true">
          DEMO
          <br />
          SEAL
        </div>
        <div className="doj-title-group">
          <div className="official-tag">DEMO — Not a real agency</div>
          <h1>U.S. Department of Justice</h1>
          <div className="subhead">Sample registration flow (educational replica)</div>
        </div>
      </div>
      <div className="doj-header-bottom">
        <div className="official-notice">🔹 SAMPLE NOTICE</div>
        <div className="notice-info">
          <span className="notice-date">Version 1.2 · 2026</span>
          <span className="doj-gov-badge">DEMO</span>
        </div>
      </div>
    </header>
  );
}
