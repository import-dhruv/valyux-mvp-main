export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 px-4" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white">
              "Smarter shopping<br />starts here!"
            </h1>
            <p className="text-xl sm:text-2xl text-gray-900 mb-8 font-medium">
              Value + trust = premium and trusted
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-white hover:bg-gray-100 text-orange-600 font-bold rounded-lg shadow-lg transition transform hover:scale-105">
                Start Comparing Now
              </button>
              <button className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-lg border-2 border-white transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right side - Shopping cart icon illustration */}
          <div className="flex-1 flex justify-center lg:justify-end z-10">
            <div className="relative">
              <div className="bg-white rounded-2xl p-12 shadow-2xl">
                <img
                  src="/valyux-logo.png"
                  alt="Valyux Logo"
                  className="w-64 h-64 object-contain mx-auto"
                />
                <div className="text-center mt-6">
                  <p className="text-3xl font-bold text-orange-600">VALYUX</p>
                  <p className="text-sm text-gray-700 italic mt-2">"smarter shopping starts here!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
    </section>
  )
}
