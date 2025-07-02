import React from 'react';

const Banner: React.FC = () => {
  const handleOrderNow = () => {
    console.log('Order Now clicked');
  };

  const handleDownloadApp = () => {
    console.log('Download App clicked');
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] bg-white overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='food-pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'><circle cx='10' cy='10' r='1' fill='rgba(0,0,0,0.05)'/></pattern></defs><rect width='100' height='100' fill='url(%23food-pattern)'/></svg>")`
        }}
      />

      {/* Floating Emojis */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-[20%] left-[-5%] text-2xl opacity-10 animate-floatAround">
          🚚
        </div>
        <div className="absolute top-[60%] right-[-5%] text-xl opacity-10 animate-floatAround delay-[7.5s]">
          🏍️
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="text-gray-800 text-center lg:text-left animate-slideInLeft">
          <div className="inline-block bg-gray-100 border border-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeInUp delay-[0.2s] text-gray-700">
            ⚡ Fast Delivery in 30 Minutes
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900 animate-fadeInUp delay-[0.4s]">
            Delicious Food<br />
            Delivered <em className="not-italic text-orange-500">Fast</em>
          </h1>

          <p className="text-lg lg:text-xl mb-8 text-gray-700 leading-relaxed animate-fadeInUp delay-[0.6s]">
            Satisfy your cravings with our extensive menu of restaurant favorites.
            Fresh ingredients, hot meals, and lightning-fast delivery right to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeInUp delay-[0.8s]">
            <button
              onClick={handleOrderNow}
              className="flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              🍽️ Order Now
            </button>
            <button
              onClick={handleDownloadApp}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border border-gray-300 hover:bg-gray-200 transition-all duration-300"
            >
              📱 Download App
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative animate-slideInRight">
          <div className="relative h-96 flex items-center justify-center">
            {[
              { emoji: "🍕", className: "top-0 left-1/2 -translate-x-1/2" },
              { emoji: "🍔", className: "top-[30%] right-0 delay-[0.5s]" },
              { emoji: "🍜", className: "bottom-[30%] right-[10%] delay-[1s]" },
              { emoji: "🌮", className: "bottom-0 left-1/2 -translate-x-1/2 delay-[1.5s]" },
              { emoji: "🍣", className: "top-[30%] left-0 delay-[2s]" },
              { emoji: "🥗", className: "bottom-[30%] left-[10%] delay-[2.5s]" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`absolute ${item.className} w-24 h-24 lg:w-30 lg:h-30 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-3xl lg:text-4xl animate-float`}
              >
                {item.emoji}
              </div>
            ))}
            <div className="w-40 h-40 lg:w-50 lg:h-50 bg-orange-100 border border-orange-200 rounded-full flex items-center justify-center text-5xl lg:text-6xl z-10 animate-pulse">
              🍽️
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col lg:flex-row gap-6 lg:gap-12 bg-gray-100 border border-gray-200 rounded-2xl p-6 lg:p-8 animate-fadeInUp delay-[1s]">
        {[
          { value: '50K+', label: 'Happy Customers' },
          { value: '1000+', label: 'Restaurant Partners' },
          { value: '30min', label: 'Average Delivery' },
        ].map((stat, index) => (
          <div key={index} className="text-center text-gray-800">
            <span className="block text-2xl lg:text-3xl font-extrabold">{stat.value}</span>
            <span className="text-sm opacity-80">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
