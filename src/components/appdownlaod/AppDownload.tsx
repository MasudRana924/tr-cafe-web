import React from 'react';

const AppDownload: React.FC = () => {
  return (
    <div>
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
            <p className="text-xl mb-6">Get exclusive offers and faster ordering with our app</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center">
                <span className="mr-2">Download on the</span>
                <span className="font-bold">App Store</span>
              </button>
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center">
                <span className="mr-2">Get it on</span>
                <span className="font-bold">Google Play</span>
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Mobile app"
              className="rounded-lg shadow-xl w-full max-w-xs"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppDownload;