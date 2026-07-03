const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600 mb-2">Step 1: List Food</h3>
            <p className="text-gray-600">
              Restaurant managers list their surplus food items on our platform quickly and easily.
            </p>
          </div>
          {/* Step 2 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600 mb-2">Step 2: NGOs Claim</h3>
            <p className="text-gray-600">
              Verified NGOs in the area get notified and can claim the available food with a single click.
            </p>
          </div>
          {/* Step 3 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600 mb-2">Step 3: Distribute</h3>
            <p className="text-gray-600">
              The NGO picks up the food and distributes it to the needy, ensuring nothing goes to waste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;