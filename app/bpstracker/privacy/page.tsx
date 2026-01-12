export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: January 2026</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
            <p>
              This Privacy Policy explains how BPS Tracker (&quot;we&quot;, &quot;our&quot;, or &quot;the App&quot;) collects,
              uses, and protects your information when you use our iOS application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Information We Collect</h2>

            <h3 className="text-xl font-medium mb-2 text-cyan-300">2.1 Data Stored Locally</h3>
            <p>The following data is stored locally on your device only:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Position data (stock symbols, strike prices, dates, premiums)</li>
              <li>Trade history and performance metrics</li>
              <li>User preferences (language settings)</li>
            </ul>
            <p className="mt-2 text-green-400">
              This data is NOT transmitted to our servers.
            </p>

            <h3 className="text-xl font-medium mb-2 mt-4 text-cyan-300">2.2 OAuth Authentication</h3>
            <p>When you sign in with Alpaca OAuth:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>We receive an OAuth access token from Alpaca</li>
              <li>The token is stored securely in iOS Keychain</li>
              <li>We do NOT store your Alpaca username or password</li>
              <li>We do NOT have access to your Alpaca trading account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. How We Use Your Information</h2>
            <p>Your information is used solely to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Display your options positions and calculations</li>
              <li>Fetch real-time market data from Alpaca</li>
              <li>Calculate options Greeks and P&L metrics</li>
              <li>Remember your app preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Third-Party Services</h2>
            <p>
              BPS Tracker integrates with <strong>Alpaca Markets</strong> for real-time market data.
              When you authenticate with Alpaca:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Market data requests are sent directly to Alpaca&apos;s servers</li>
              <li>Your usage is subject to Alpaca&apos;s Privacy Policy</li>
            </ul>
            <p className="mt-2">
              Please review Alpaca&apos;s privacy policy at:{" "}
              <a
                href="https://alpaca.markets/disclosures"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                https://alpaca.markets/disclosures
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Data Security</h2>
            <p>We implement the following security measures:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>OAuth tokens are stored in iOS Keychain (encrypted)</li>
              <li>All API communications use HTTPS encryption</li>
              <li>No sensitive data is transmitted to our servers</li>
              <li>Position data remains on your device only</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Data Retention</h2>
            <p>
              All data is stored locally on your device. When you delete the app, all local data
              is removed. You can also revoke Alpaca OAuth access at any time from your Alpaca
              account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Delete all your data by uninstalling the app</li>
              <li>Revoke Alpaca OAuth access at any time</li>
              <li>Export your position data from within the app</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Children&apos;s Privacy</h2>
            <p>
              BPS Tracker is not intended for users under 18 years of age. We do not knowingly
              collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the
              &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:support@ai-muninn.com" className="text-cyan-400 hover:underline">
                support@ai-muninn.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <a href="/" className="text-cyan-400 hover:underline">&larr; Back to Home</a>
        </div>
      </div>
    </div>
  );
}
