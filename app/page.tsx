"use client";

import { useMemo, useState } from "react";
import PortalHeader from "./components/PortalHeader";
import StepIndicator from "./components/StepIndicator";

type Form = {
  fullName: string;
  ssn: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  amount: string;
  description: string;
  wallet: string;
};

const EMPTY: Form = {
  fullName: "",
  ssn: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  amount: "",
  description: "",
  wallet: "",
};

function formatSsn(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 9);
  if (d.length <= 3) return d;
  if (d.length <= 5) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
}

function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.charAt(0) === "1") d = d.slice(1);
  d = d.slice(0, 10);
  if (!d.length) return "";
  if (d.length <= 3) return `+1 (${d}`;
  if (d.length <= 6) return `+1 (${d.slice(0, 3)}) ${d.slice(3)}`;
  return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function formatAmount(raw: string) {
  const s = raw.replace(/,/g, "").replace(/[^\d.]/g, "");
  if (!s) return "";
  const parts = s.split(".");
  let intPart = parts[0] || "0";
  intPart = intPart.replace(/^0+(?=\d)/, "");
  if (!intPart) intPart = "0";
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (parts.length > 1) {
    const dec = parts.slice(1).join("").replace(/\D/g, "").slice(0, 2);
    return `${intPart}.${dec}`;
  }
  if (/\.$/.test(raw.replace(/,/g, ""))) return `${intPart}.`;
  return intPart;
}

function FakeQr() {
  const cells = useMemo(() => {
    const grid: boolean[] = [];
    let seed = 42;
    for (let i = 0; i < 21 * 21; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      grid.push((seed >> 8) % 2 === 0);
    }
    return grid;
  }, []);
  return (
    <div className="qr-placeholder" aria-label="Decorative placeholder QR (not scannable)">
      <svg width="160" height="160" viewBox="0 0 21 21" role="img">
        <rect width="21" height="21" fill="#fff" />
        {cells.map((on, i) =>
          on ? (
            <rect
              key={i}
              x={i % 21}
              y={Math.floor(i / 21)}
              width="1"
              height="1"
              fill="#0f172a"
            />
          ) : null,
        )}
      </svg>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [frontName, setFrontName] = useState("");
  const [evidenceName, setEvidenceName] = useState("");
  const [frontUrl, setFrontUrl] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");

  const set = (key: keyof Form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onFile = (
    file: File | undefined,
    setName: (s: string) => void,
    setUrl: (s: string) => void,
  ) => {
    if (!file) {
      setName("");
      setUrl("");
      return;
    }
    setName(file.name);
    setUrl(file.type.startsWith("image/") ? URL.createObjectURL(file) : "");
  };

  return (
    <>
      <div className="page-container">
        {/* Step 1 — Introduction */}
        <div className={`step-panel${step === 1 ? " active" : ""}`}>
          <PortalHeader />
          <div className="page-content">
            <div className="doj-body">
              <p>
                <strong>U.S. Department of Justice</strong>
              </p>
              <p>
                This portal reviews online fraud cases. Please provide your identity
                information for verification and to determine eligibility for
                restitution.
              </p>
              <div className="highlight-box">
                <p>
                  This procedure handles identity registration, eligibility review, and
                  slot confirmation. This is an <strong>educational replica</strong> —
                  no data is transmitted anywhere.
                </p>
              </div>
              <p>
                Follow the on-screen steps to see how the original scam page walks a
                victim through filing and verification.
              </p>
              <button className="btn-next" type="button" onClick={() => setStep(2)}>
                Next
              </button>
              <div className="doj-footer">
                <div style={{ fontStyle: "italic", marginBottom: 8 }}>
                  Demo only — not an official notice of any kind.
                </div>
                <span className="version">Sample Case No. DEMO-2026-0000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 — Personal Information */}
        <div className={`step-panel${step === 2 ? " active" : ""}`}>
          <PortalHeader />
          <div className="page-content">
            <StepIndicator active={1} />
            <h2 className="hero-title">Personal Information Form</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="fullName">
                  Full Legal Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full legal name"
                  value={form.fullName}
                  onChange={(e) => set("fullName")(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ssn">
                  Social Security Number (SSN) <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="ssn"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="123-45-6789"
                  maxLength={11}
                  value={form.ssn}
                  onChange={(e) => set("ssn")(formatSsn(e.target.value))}
                />

              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <label
                    htmlFor="idFront"
                    style={{
                      display: "block",
                      fontWeight: 600,
                      color: "#212121",
                      marginBottom: 6,
                      fontSize: 15,
                    }}
                  >
                    Government-Issued ID - Front Side{" "}
                    <span className="required">*</span>
                  </label>
                  <input
                    type="file"
                    id="idFront"
                    accept="image/*,.pdf"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      border: "1px solid #aeb0b5",
                      borderRadius: 4,
                      fontSize: 15,
                      fontFamily: "inherit",
                    }}
                    onChange={(e) =>
                      onFile(e.target.files?.[0], setFrontName, setFrontUrl)
                    }
                  />
                  <div className={`file-preview${frontName ? " show" : ""}`}>
                    <div className="file-name">{frontName}</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {frontUrl ? <img src={frontUrl} alt="Local preview" /> : null}
                  </div>
                  <small style={{ display: "block", marginTop: 6, color: "#666", fontSize: 13 }}>
                    Previewed locally only — never uploaded. Demo only — do not use a
                    real ID.
                  </small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  Contact Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+1 (234) 456-7891"
                  maxLength={18}
                  value={form.phone}
                  onChange={(e) => set("phone")(formatPhone(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">
                  Street Address <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="street"
                  placeholder="Enter your street address"
                  value={form.street}
                  onChange={(e) => set("street")(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">
                  City <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  value={form.city}
                  onChange={(e) => set("city")(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">
                  State <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="Enter state (e.g., CA, NY)"
                  value={form.state}
                  onChange={(e) => set("state")(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">
                  ZIP Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="zipcode"
                  placeholder="Enter ZIP code (e.g., 10001)"
                  value={form.zipcode}
                  onChange={(e) => set("zipcode")(e.target.value)}
                />
              </div>
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" className="btn-primary" onClick={() => setStep(3)}>
                Continue
              </button>
            </form>
            <div className="footer-note">
              🔒 Demo replica. Data stays in your browser only — nothing is sent or
              stored.
            </div>
          </div>
        </div>

        {/* Step 3 — Case Information */}
        <div className={`step-panel${step === 3 ? " active" : ""}`}>
          <PortalHeader />
          <div className="page-content">
            <StepIndicator active={2} />
            <h2 className="hero-title">Case Information Form</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="amount">
                  Amount Lost to Fraud (USD) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="amount"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="e.g. 1,000"
                  value={form.amount}
                  onChange={(e) => set("amount")(formatAmount(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Incident Description</label>
                <textarea
                  id="description"
                  placeholder="Briefly describe how the fraud occurred"
                  value={form.description}
                  onChange={(e) => set("description")(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="evidence">Supporting Documents Upload</label>
                <input
                  type="file"
                  id="evidence"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) =>
                    onFile(e.target.files?.[0], setEvidenceName, setEvidenceUrl)
                  }
                />
                <div className={`file-preview${evidenceName ? " show" : ""}`}>
                  <div className="file-name">{evidenceName}</div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {evidenceUrl ? <img src={evidenceUrl} alt="Local preview" /> : null}
                </div>
                <small>
                  Previewed locally only — never uploaded. Optional.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="wallet">
                  Wallet Address for Restitution <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="wallet"
                  placeholder="Enter your wallet address for receiving funds"
                  value={form.wallet}
                  onChange={(e) => set("wallet")(e.target.value)}
                />
                <small>
                  Red flag: real restitution is paid by bank transfer, not to a crypto
                  wallet. This field is inert.
                </small>
              </div>
              <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                Back
              </button>
              <button type="button" className="btn-primary" onClick={() => setStep(4)}>
                Continue
              </button>
            </form>
            <div className="footer-note">
              🔒 Demo replica. No payment or wallet connection exists on this page.
            </div>
          </div>
        </div>

        {/* Step 4 — Final Confirmation */}
        <div className={`step-panel${step === 4 ? " active" : ""}`}>
          <PortalHeader />
          <div className="page-content">
            <StepIndicator active={3} />
            <h2 className="hero-title">📋 Final Confirmation</h2>
            <div className="info-summary">
              <p>
                <strong>Name:</strong> <span>{form.fullName || "-"}</span>
              </p>
              <p>
                <strong>Wallet Address (Restitution):</strong>{" "}
                <span style={{ color: "#1a5276", fontFamily: "monospace" }}>
                  {form.wallet || "-"}
                </span>
              </p>
              <p>
                <strong>Phone:</strong> <span>{form.phone || "-"}</span>
              </p>
              <p>
                <strong>Case Number:</strong> DEMO-2026-0000
              </p>
            </div>
      
            <div className="notice-box">
              <strong>💳 Processing Fee Notice (replica)</strong>
              <br />
              The original page claims a network processing fee of ~$1 USD must be paid
              by connecting a crypto wallet. A real program never charges a fee to pay
              you restitution.
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="confirmCheck"
                checked={confirmCheck}
                onChange={(e) => setConfirmCheck(e.target.checked)}
              />
              <label htmlFor="confirmCheck">
                I understand this is an educational demo and nothing will be submitted.
              </label>
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <p style={{ margin: "0 0 8px", fontWeight: 600 }}>
                The original shows a QR code here to pay the fake fee.
              </p>
              <p style={{ margin: "0 0 12px", color: "#475569", fontSize: 14 }}>
                This placeholder is decorative and not scannable.
              </p>
              <FakeQr />
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep(3)}
              >
                Back
              </button>
              <button
                type="button"
                className="btn-primary"
                disabled={!confirmCheck}
                onClick={() => setStep(5)}
              >
                Finish Demo
              </button>
            </div>
            <div className="footer-note">
              🔒 Demo replica. No transaction, signature, or wallet approval is possible
              here.
            </div>
          </div>
        </div>

        {/* Step 5 — Success (inert) */}
        <div className={`step-panel${step === 5 ? " active" : ""}`}>
          <PortalHeader />
          <div className="page-content">
            <div className="success-message">
              <h3>✓ Demo Complete</h3>
              <p>
                That&apos;s the entire flow the scam uses. In the real version, this
                screen would claim your registration was &quot;submitted&quot; — but the
                wallet approval you signed earlier is what actually drains your funds.
              </p>
              <p>
                <strong>Nothing was submitted.</strong> No data left your browser.
              </p>
            </div>
            <button
              type="button"
              className="btn-primary"
              style={{ marginTop: 20 }}
              onClick={() => {
                setStep(1);
                setForm(EMPTY);
                setConfirmCheck(false);
                setFrontName("");
                setFrontUrl("");
                setEvidenceName("");
                setEvidenceUrl("");
              }}
            >
              Restart demo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
