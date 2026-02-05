const Transactions = () => {
  const transactions = [
    { id: 1, title: "Grocery Store", amount: "-2,500", date: "Today" },
    { id: 2, title: "Salary", amount: "+150,000", date: "Yesterday" },
    { id: 3, title: "Electricity Bill", amount: "-8,200", date: "Jan 29" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

      <ul className="space-y-4">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between border-b pb-3 last:border-none"
          >
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-sm text-gray-500">{t.date}</p>
            </div>
            <p
              className={`font-semibold ${
                t.amount.startsWith("+")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {t.amount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
