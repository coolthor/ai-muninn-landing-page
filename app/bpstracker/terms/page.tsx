import Link from 'next/link';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">Terms of Use</h1>
        <p className="text-gray-400 mb-8">Last updated: January 2026</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using BPS Tracker (&quot;the App&quot;), you agree to be bound by these
              Terms of Use. If you do not agree to these terms, do not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Description of Service</h2>
            <p>
              BPS Tracker is a portfolio tracking application designed to help users monitor Bull Put Spread
              options positions. The App provides:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Real-time market data via Alpaca Markets API</li>
              <li>Options Greeks analysis and calculations</li>
              <li>Position tracking and P&L monitoring</li>
              <li>Trade history and performance statistics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Not Financial Advice</h2>
            <p className="font-semibold text-yellow-400">
              THE APP IS FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY AND DOES NOT CONSTITUTE
              FINANCIAL, INVESTMENT, OR TRADING ADVICE.
            </p>
            <p className="mt-2">
              You should consult with a qualified financial advisor before making any investment decisions.
              We are not responsible for any financial losses resulting from your use of the App or any
              trading decisions you make.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Alpaca Integration</h2>
            <p>
              The App integrates with Alpaca Markets for market data. By using this integration, you also
              agree to Alpaca&apos;s Terms of Service. We are not affiliated with Alpaca Markets and are not
              responsible for their service availability or data accuracy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Provide accurate information when using the App</li>
              <li>Keep your Alpaca credentials secure</li>
              <li>Use the App only for lawful purposes</li>
              <li>Not attempt to reverse engineer or modify the App</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Data Accuracy</h2>
            <p>
              While we strive to provide accurate information, market data and calculations may contain
              errors or delays. We do not guarantee the accuracy, completeness, or timeliness of any
              information displayed in the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS,
              DATA, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the App after
              changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Contact</h2>
            <p>
              For questions about these Terms, please contact us at:{" "}
              <a href="mailto:support@ai-muninn.com" className="text-cyan-400 hover:underline">
                support@ai-muninn.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link href="/" className="text-cyan-400 hover:underline">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
