import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

const EditTransactions = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({
    productID: '',
    productName: '',
    amount: '',
    customerName: '',
    status: '',
    createBy: '',
    transactionDate: '',
    createOn: '',  
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/gettransaction/${id}`);
        const { productID, productName, amount, customerName, status, createBy } = response.data;
        setTransaction({
          productID,
          productName,
          amount,
          customerName,
          status,
          createBy,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8081/updatetransaction/${id}`, {
        productID: transaction.productID,
        productName: transaction.productName,
        amount: transaction.amount,
        customerName: transaction.customerName,
        status: transaction.status,
        createBy: transaction.createBy,
      });

      alert('Successfully edited');
    } catch (error) {
      console.error(error);
      alert('Error editing transaction');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
      <form onSubmit={handleSubmit}>
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
            Edit Transaction
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

export default EditTransactions;