import React, { useState, useEffect } from 'react';
import axios from 'axios';
//onst BASE_URL = process.env.BASE_URL

function UpdateCount() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [totalCount, setTotalCount] = useState('');

  useEffect(() => {
    fetchData(); //git
    fetchTotalCount();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://crossorigin.me/https://node-js-app-liard.vercel.app/api/data`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddData = async () => {
    try {
      await axios.post(`https://node-js-app-liard.vercel.app/api/data`, { name, phone });
      fetchData();
      fetchTotalCount();
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleUpdateData = async () => {
    try {
      await axios.put(`https://node-js-app-liard.vercel.app/api/data/${id}`, { name, phone });
      fetchData();
      setName('');
      setPhone('');
      setId('');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const fetchTotalCount = async () => {
    try {
      const response = await axios.get(`https://node-js-app-liard.vercel.app/api/data/count`);
      setTotalCount(response.data.count);
    } catch (error) {
      console.error('Error fetching total count:', error);
    }
  };

  const deleteDataById = async (id) => {
    try {
      await axios.delete(`https://node-js-app-liard.vercel.app/api/data/${id}`);
      fetchData();
      fetchTotalCount();
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };

  const deleteAllData = async () => {
    try {
      await axios.delete(`https://node-js-app-liard.vercel.app/api/data`);
      fetchData();
      fetchTotalCount();
    } catch (error) {
      console.error('Error deleting all data:', error.message);
    }
  };

  return (
    <div className="flex items-center keybovirtualvirtula  h-screen mx-auto">
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Users Data</h1>
    <div className="mb-4">
      <input className="border border-gray-400 rounded mr-2 px-2 py-1" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      <input className="border border-gray-400 rounded mr-2 px-2 py-1" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone" />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded" onClick={handleAddData}>Add Data</button>
    </div>
    <div className="mb-4">
      <input className="border border-gray-400 rounded mr-2 px-2 py-1" type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID to update" />
      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded" onClick={handleUpdateData}>Update Data</button>
    </div>
    <div className="mb-4">
      <p className="text-lg font-bold">Total Count: {totalCount}</p>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-2">Data</h2>
      <table className="border border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Action</th> {/* Column for delete button */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border">
              <td className="border px-4 py-2">{item._id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.phone}</td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteDataById(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deleteAllData}>Delete All Data</button>
      </div>
    </div>
  </div>
</div>
  )

}

export default UpdateCount;
