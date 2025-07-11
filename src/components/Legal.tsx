export const TermsAndConditions = () => (
  <div className="p-4 text-sm text-gray-700 space-y-4">
    <h2 className="text-xl font-bold">Terms and Conditions</h2>
    <p>By enrolling in any course offered by FxStreamPro, you agree to the following terms:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>You enroll voluntarily and at your own risk.</li>
      <li>Fees are strictly non-refundable once paid.</li>
      <li>No complaints or legal claims will be accepted.</li>
      <li>We are not liable for financial losses from applying course material.</li>
    </ul>
  </div>
);

export const PrivacyPolicy = () => (
  <div className="p-4 text-sm text-gray-700 space-y-4">
    <h2 className="text-xl font-bold">Privacy Policy</h2>
    <p>Your data is secure with us. We only collect what’s necessary to run our courses:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Basic info (name, email, phone)</li>
      <li>Payment info (via secure third-party gateways)</li>
      <li>Trading experience (optional)</li>
    </ul>
    <p>You can opt out or delete your data anytime.</p>
  </div>
);
