export const metadata = {
  title: 'Privacy Policy - Threads App',
  description: 'Privacy Policy for the Threads API integration.',
};

export default function ThreadsPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: March 2026</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
            <p>
              This Privacy Policy explains how this Threads API application (&quot;the App&quot;) collects,
              uses, and protects your information. This is a personal tool used solely for reading
              and searching public Threads content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-2 text-cyan-300">2.1 Threads OAuth Token</h3>
            <p>When you authorize this app via Threads OAuth, we receive an access token. This token is:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Stored locally on the server running this application</li>
              <li>Used only to perform keyword searches on Threads on your behalf</li>
              <li>Never shared with third parties</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4 text-cyan-300">2.2 Search Queries</h3>
            <p>Search queries submitted through this app are sent to the Threads API. We do not log or store search queries beyond what is necessary for operation.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. How We Use Your Information</h2>
            <p>Your information is used solely to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Authenticate with the Threads API on your behalf</li>
              <li>Search and retrieve public Threads posts using keywords</li>
            </ul>
            <p className="mt-2 text-green-400">
              We do NOT sell, share, or use your data for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Data Retention</h2>
            <p>
              The access token is retained until it expires (60 days) or is manually revoked.
              You can revoke access at any time through your Threads account settings under
              &quot;Website Permissions&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Third-Party Services</h2>
            <p>
              This app uses the Meta Threads API. Your use of Threads is subject to
              Meta&apos;s Privacy Policy and Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Contact</h2>
            <p>
              For questions about this privacy policy, contact:{' '}
              <a href="mailto:coolthor@gmail.com" className="text-cyan-400 hover:underline">
                coolthor@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
