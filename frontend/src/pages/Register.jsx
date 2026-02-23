export default function Register() {
  return (
    <div className="min-h-screen bg-red-600 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border-4 border-green-500">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Register
        </h2>

        <form className="space-y-4 border-4 border-green-400 p-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}