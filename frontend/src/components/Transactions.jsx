import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8081/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const groupTransactionsByMonthAndYear = () => {
    const groupedTransactions = {};
    transactions.forEach((transaction) => {
      const date = new Date(transaction.transactionDate);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      if (!groupedTransactions[monthYear]) {
        groupedTransactions[monthYear] = [];
      }
      groupedTransactions[monthYear].push(transaction);
    });
    return groupedTransactions;
  };

  const renderGroupedTransactions = () => {
    const groupedTransactions = groupTransactionsByMonthAndYear();
    return Object.entries(groupedTransactions).map(([monthYear, transactions]) => (
      <React.Fragment key={monthYear}>
        <tr>
          <th colSpan="10" className="py-2 px-4 border-b">
            {monthYear} Transactions
          </th>
        </tr>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="py-2 px-4 border-b text-center">{transaction.id}</td>
            <td className="py-2 px-4 border-b text-center">{transaction.productID}</td>
            <td className="py-2 px-4 border-b text-center">{transaction.productName}</td>
            <td className="py-2 px-4 border-b text-center">{transaction.amount}</td>
            <td className="py-2 px-4 border-b text-center">{transaction.customerName}</td>
            <td className="py-2 px-4 border-b text-center">{transaction.status}</td>
            <td className="py-2 px-4 border-b text-center">{transaction.transactionDate}</td>
            <td className="py-2 px-4 border-b text-center">{transaction.createBy}</td>
            <td className="py-2 px-4 border-b text-center">{transaction.createOn}</td>
            <td className="py-2 px-4 border-b text-center">
              <Link to={`/edit/${transaction.id}`}>
                <button className='bg-blue-500 text-white p-2 rounded-lg'>Update</button>
              </Link>
            </td>
          </tr>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex justify-center text-2xl font-[800] text-[#FB9F4F] font-">PT INOVASI DAYA SOLUSI</h1>
      <h1 className="text-2xl font-bold">Transaction List</h1>
      <Link to="/create">
        <button className="bg-amber-300 p-2 rounded-lg my-4">Create Transaction</button>
      </Link>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Product ID</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Transaction Date</th>
            <th className="py-2 px-4 border-b">Created By</th>
            <th className="py-2 px-4 border-b">Created On</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderGroupedTransactions()}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;