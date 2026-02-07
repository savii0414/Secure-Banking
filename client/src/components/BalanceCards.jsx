const BalanceCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">Current Balance</p>
        <p className="text-gray-500 text-sm">0144 5254 6536 5542</p>
        <h2 className="text-3xl font-semibold mt-2">LKR 125,450.00</h2>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">Savings</p>
        <p className="text-gray-500 text-sm">9144 5254 6536 5542</p>
        <h2 className="text-3xl font-semibold mt-2">LKR 560,000.00</h2>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">Credit Used</p>
        <h2 className="text-3xl font-semibold mt-2">LKR 25,300.00</h2>
      </div>
    </div>
  );
};

export default BalanceCards;
