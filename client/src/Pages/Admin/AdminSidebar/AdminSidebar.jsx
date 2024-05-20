import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

function AdminSidebar() {
  return (
    <div className="d-flex flex-column   vh-100 bg-theme">
      <ListGroup variant="flush" className="flex-grow-1 bg-theme">
        <h1 className='p-4'>Admin Dashboard</h1>
        <ListGroup.Item action as={Link} to="/admin-dashboard" className="d-flex align-items-center bg-theme px-5 border-0 my-3">
          <i className="fas fa-tachometer-alt me-2"></i> Dashboard
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/admin-supporters" className="d-flex align-items-center bg-theme px-5 border-0 my-3">
          <i className="fas fa-users me-2"></i> Supporters
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/admin-activities" className="d-flex align-items-center bg-theme px-5 border-0 my-3">
          <i className="fas fa-tasks me-2"></i> Activities
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/admin-reports" className="d-flex align-items-center bg-theme px-5 border-0 my-3">
          <i className="fas fa-chart-bar me-2"></i> Reports
        </ListGroup.Item>
      </ListGroup>
      <div className='bg-theme'>
        <ListGroup variant="flush" className='bg-theme'>
          <ListGroup.Item action as={Link} to="/admin-settings" className="d-flex align-items-center bg-theme px-5 border-0 my-3">
            <i className="fas fa-cog me-2"></i> Settings
          </ListGroup.Item>
          <ListGroup.Item action as={Link} to="/admin-login" onClick={() => localStorage.removeItem('isAdminLoggedIn')} className="d-flex align-items-center bg-theme px-5 border-0 my-3">
            <i className="fas fa-sign-out-alt me-2"></i> Logout
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default AdminSidebar;
