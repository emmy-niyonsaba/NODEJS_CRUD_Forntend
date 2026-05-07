import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center px-5">
      <div className="text-center bg-white px-10 py-16 rounded-lg shadow-lg max-w-md w-full">
        {/* Logo Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-blue-500 m-0 mb-2">
            Manage Items
          </h1>
          <p className="text-lg font-medium text-blue-500 m-0 tracking-wide">
            Emmyson LTD Product
          </p>
        </div>
        {/* Description Section */}
        <div className="mb-10">
          <p className="text-base text-gray-700 leading-relaxed">
            Simplify your inventory management with our intuitive platform.
            Create, update, and organize your items effortlessly. Keep your
            product information organized and accessible anytime, anywhere.
          </p>
        </div>

        {/* CTA Section */}
        <div>
          <Link
            to="/login"
            className="inline-block bg-blue-500 text-white px-10 py-3 rounded-md text-lg font-semibold border-2 border-blue-500 transition-all hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
