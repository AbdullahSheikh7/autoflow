import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      {/* Page Title */}
      <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>

      <p className="mb-8 text-sm text-gray-500">Last updated: January 2026</p>

      {/* Section */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">1. Introduction</h2>

        <p className="mb-4">
          Welcome to <strong>Autoflow</strong>. This Privacy Policy explains how
          we collect, use, and protect your information when you use our
          web-based automation platform.
        </p>
      </section>

      {/* Section */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">
          2. Information We Collect
        </h2>

        <h3 className="mb-2 text-xl font-semibold">Required Information</h3>

        <ul className="mb-4 list-disc pl-6">
          <li>Name</li>
          <li>Email address (via OAuth)</li>
          <li>Google Drive access</li>
        </ul>

        <h3 className="mb-2 text-xl font-semibold">Optional Information</h3>

        <ul className="list-disc pl-6">
          <li>Discord</li>
          <li>Slack</li>
          <li>Notion</li>
          <li>Profile image</li>
        </ul>
      </section>

      {/* Section */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">3. Third-Party Services</h2>

        <p>
          Autoflow integrates with third-party services such as authentication
          providers and automation platforms. Each service operates under its
          own privacy policy.
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="mb-3 text-2xl font-semibold">Contact Us</h2>

        <p>
          If you have any questions, contact us at{" "}
          <a
            href="mailto:contactabdullah7@gmail.com"
            className="font-medium text-blue-600 underline"
          >
            contactabdullah7@gmail.com
          </a>
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Back to{" "}
          <Link href="/" className="underline">
            Autoflow
          </Link>
        </p>
      </section>
    </main>
  );
}
