import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            <span className="block">Find your perfect</span>
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              tech partner
            </span>
          </h1>

          <p className="mt-6 text-xl text-gray-400 max-w-3xl">
            DevFusion connects developers based on technical skills, project
            interests, and collaboration styles. Build better software together.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 cursor-pointer border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 cursor-pointer border border-gray-700 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
            >
              Existing User
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {["React", "Python", "Node.js", "Rust", "AI/ML", "+32 more"].map(
              (tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="relative rounded-2xl bg-gray-800 border border-gray-700 overflow-hidden shadow-2xl">
              <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm text-gray-400">match.js</div>
              </div>

              <div className="p-6 font-mono text-sm">
                <div className="text-purple-400">const</div>{" "}
                <div className="text-blue-400">matches</div> ={" "}
                <div className="text-yellow-400">await</div>{" "}
                <div className="text-gray-400">findMatches</div>(
                <div className="text-green-400">user</div>);
                <br />
                <div className="text-gray-500">
                  // Found {Math.floor(Math.random() * 20) + 5} potential
                  matches
                </div>
                <br />
                <div className="text-purple-400">if</div> (
                <div className="text-blue-400">matches</div>.
                <div className="text-gray-400">length</div>) {"{"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
