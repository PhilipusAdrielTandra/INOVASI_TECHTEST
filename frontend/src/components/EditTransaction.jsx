import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

function EditTransactions() {
    const {id} = useParams()
    const [refreshData, setRefreshData] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        productID: '',
        productName: '',
        amount: '',
        customerName: '',
        status: '',
        transactionDate: '',
        createBy: ''
        });
       
        useEffect(() => {
            const fetchTransactions = async () => {
              try {
                const response = await axios.get('http://localhost:8081/transactions');
              } catch (error) {
                console.error('Error creating transactions:', error);
              }
            };
        
            fetchTransactions();
          }, [refreshData]);
          
          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };
        
          const handleSubmit = (e) => {
            e.preventDefault();
        
            axios.put('http://localhost:8081/updatetransactions' + id, formData)
              .then(response => {
                console.log('Transaction added', response.data);
                setRefreshData(!refreshData);
                setFormData({
                    id: 0,
                    productID: '',
                    productName: '',
                    amount: 0,
                    customerName: '',
                    status: 0,
                    createBy: ''
                  });
              })
              .catch(error => {
                console.error('Error adding transaction:', error);
              });
          };
  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='w-1/2 bg-white rounded p-8'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold mb-6 text-center'>Edit Transaction</h2>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>Product ID</label>
            <input
              type="text"
              value={formData.productID}
              onChange={handleChange}
              name='productID'
              placeholder='Enter Product ID'
              className='w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>Product Name</label>
            <input
              type="text"
              value={formData.productName}
              onChange={handleChange}
              name='productName'
              placeholder='Enter Product Name'
              className='w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>Amount</label>
            <input
              type="text"
              value={formData.amount}
              onChange={handleChange}
              name='amount'
              placeholder='Enter Amount'
              className='w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>Customer Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={handleChange}
              name='customerName'
              placeholder='Enter Customer Name'
              className='w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>Status</label>
            <input
              type="text"
              value={formData.status}
              onChange={handleChange}
              name='status'
              placeholder='Enter Status (use 0 or 1)'
              className='w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>Create By</label>
            <input
              type="text"
              value={formData.createBy}
              onChange={handleChange}
              name='createBy'
              placeholder='Create by'
              className='w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <Link to='/'>
          <button className='bg-orange-500 p-2 rounded-lg'>Submit</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditTransactions;
