function Hero() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 font-voyage">Welcome to Our SaaS</h1>
        <p className="text-xl mb-8 font-kobe view">
          We provide the best solutions to help you grow your business.
        </p>
      </div>
      <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
        Get Started
      </button>
    </div>
  );
}

export default Hero;
