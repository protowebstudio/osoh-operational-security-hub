export default function HomePage() {
  return (
    <div className='min-h-screen bg-slate-900 flex items-center justify-center'>
      <div className='text-center space-y-6 max-w-xl'>
        <h1 className='text-4xl font-bold text-white'>
          Operational Security & Observability Hub
        </h1>

        <p className='text-slate-400'>
          Deterministic risk monitoring platform for external site telemetry ingestion.
          Secure. Reproducible. Production-ready.
        </p>

        <div className='flex justify-center gap-4'>
          <a
            href='/login'
            className='px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition'
          >
            Login
          </a>

          <a
            href='/register'
            className='px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition'
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
