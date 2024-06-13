import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './SupportersRequestTable.css';
import { viewSupporterReqsForAdmin } from '../../../Services/apiService';

const SupportersRequestTable = () => {
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupporters();
  }, []);

  const fetchSupporters = async () => {
    try {
      const supporterData = await viewSupporterReqsForAdmin();
      setSupporters(supporterData.data);
      console.log(supporterData)
    } catch (error) {
      console.error('Error fetching Supporters:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-responsive">
      {loading ? (
        <p className='theme-purple fs-1'>Loading...</p>
      ) : supporters.length === 0 ? (
        <p className='m-5 text-center fs-1'>No new entries</p>
      ) : (
        <Table striped bordered hover className="supporters-table">
          <thead className=''>
            <tr className='text-center'>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Email Id</th>
              <th>Organisation Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {supporters.map((supporter) => (
              <tr key={supporter.id}>
                <td>{supporter._id}</td>
                <td>
                  <img src={supporter.image} alt={`${supporter.name}'s avatar`} />
                </td>
                <td>{supporter.name}</td>
                <td>{supporter.contact}</td>
                <td>{supporter.email}</td>
                <td>{supporter.organization}</td>
                <td>
                  <i className="bi bi-eye m-3"></i>
                  <i class="bi bi-x m-3"></i>
                  <i class="bi bi-check2 m-3"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default SupportersRequestTable;
