import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const CreateTransactions = () => {
  const [transaction, setTransaction] = useState({
    id: '',
    productID: '',
    productName: '',
    amount: '',
    customerName: '',
    status: '',
    createBy: '',
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/createtransactions', transaction);
      alert('Successfully added');
    } catch (error) {
      console.error(error);
      alert('Error adding transaction');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Transaction</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-600">
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={transaction.id}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productID" className="block text-sm font-medium text-gray-600">
            Product ID
          </label>
          <input
            type="text"
            id="productID"
            name="productID"
            value={transaction.productID}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={transaction.productName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-600">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={transaction.customerName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={transaction.status}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="createBy" className="block text-sm font-medium text-gray-600">
            Created By
          </label>
          <input
            type="text"
            id="createBy"
            name="createBy"
            value={transaction.createBy}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Transaction
          </button>
        </div>
      </form>
      <div className="mt-4">
        <Link to='/'>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Go back
          </button>
        </Link>
        </div>
    </div>
  );
};

export default CreateTransactions;