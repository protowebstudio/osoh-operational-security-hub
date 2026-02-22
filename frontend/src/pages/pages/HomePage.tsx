export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Operational Security & Observability Hub
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Deterministic risk monitoring platform for external site telemetry ingestion.
          Secure. Reproducible. Production-ready.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </a>

          <a
            href="/register"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}