import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-green-50 py-20">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Reduce Food Waste, Feed the Needy
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Our platform connects restaurants with surplus food to NGOs who can distribute it to those in need.
        </p>
        <Link href="/listings" className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition duration-300">
          See Available Food
        </Link>
      </div>
    </div>
  );
};

export default Hero;