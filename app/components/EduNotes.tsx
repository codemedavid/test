export default function EduNotes() {
  return (
    <section className="edu-notes">
      <h2>🔍 Why this page is a scam (red flags to teach)</h2>
      <ul>
        <li>
          <strong>Impersonated authority.</strong> The real page copies a government
          agency&apos;s look — seal, official wording, a fake <code>.gov</code> badge and
          a &quot;case number&quot; — to build false trust. No agency collects restitution
          claims through a random web link.
        </li>
        <li>
          <strong>Over-collection of identity data.</strong> It asks for a Social
          Security Number and a photo of a government ID in the very first form. Real
          programs never request an SSN + ID photo up front through an unverified page.
        </li>
        <li>
          <strong>A &quot;processing fee&quot; paid in crypto.</strong> A genuine
          restitution program never asks a victim to pay a fee — least of all in
          cryptocurrency — to receive money back.
        </li>
        <li>
          <strong>Wallet connection &quot;approvals&quot;.</strong> The original kit hid
          wallet logic that requested an <em>unlimited</em> token allowance. Approving it
          lets the attacker drain the wallet. This demo contains none of that logic.
        </li>
        <li>
          <strong>Pressure and time limits.</strong> Fake &quot;quota&quot; / &quot;expires
          soon&quot; language pushes people to act before they think.
        </li>
      </ul>
      <p style={{ marginTop: 14 }}>
        This replica is intentionally inert: the fields stay in your browser only, files
        are previewed locally and never uploaded, and there is no backend, payment, or
        wallet code. If you ever see the real version of this page, report it and do not
        enter any information.
      </p>
    </section>
  );
}
