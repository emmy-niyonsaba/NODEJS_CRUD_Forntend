import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="grid md:grid-cols-2">
          <div className="hidden md:flex flex-col justify-between bg-blue-500 p-10 text-white">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
                Emmyson LTD
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight">
                Manage Items with confidence
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-blue-50">
                Keep your products organized, update records quickly, and manage
                your inventory from one simple place.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm font-medium text-blue-50">Fast access</p>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Sign in to continue to your workspace and review your items,
                orders, and product details.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
                Welcome back
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Log in to continue
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Enter your email address or username together with your password
                to access the system.
              </p>

              <form className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="identifier"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email or Username
                  </label>
                  <input
                    id="identifier"
                    type="text"
                    placeholder="Enter your email or username"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                    />
                    Remember me
                  </label>
                </div>

                <Link
                  to="/home"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  Log In
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
