const STEPS = ["Introduction", "Personal Information", "Case Information", "Final Confirmation"];

export default function StepIndicator({ active }: { active: number }) {
  return (
    <div className="step-indicator">
      {STEPS.map((label, i) => (
        <div key={label} className={`step${i === active ? " active" : ""}`}>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
