import React from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import './AdminDashboard.css';
import AdminSearchbar from '../AdminSearchbar/AdminSearchbar';
import AdminStatBox from '../AdminStatBox/AdminStatBox';
import { FaUsers, FaHouseUser, FaUserShield, FaGavel } from 'react-icons/fa';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function AdminDashboard() {
  return (
    <div className="admin-sidebar-container bg-theme">
      <AdminSidebar />
      <div className="admin-main-content bg-white">
        {/* Search bar on top */}
        <AdminSearchbar />
        
        {/* Statistic boxes */}
        <Container className="my-4">
          <div className="d-flex justify-content-center flex-wrap">
            <AdminStatBox 
              icon={<FaUsers size={40} />} 
              color="#6285FE" 
              title="Supporters" 
              count="100,000K" 
            />
            <AdminStatBox 
              icon={<FaUsers size={40} />} 
              color="#FD4930" 
              title="Users" 
              count="100,000K" 
            />
            <AdminStatBox 
              icon={<FaHouseUser size={40} />} 
              color="#28C60E" 
              title="Safe House" 
              count="100,000K" 
            />
            <AdminStatBox 
              icon={<FaUserShield size={40} />} 
              color="#BA76FF" 
              title="Counselors" 
              count="100,000K" 
            />
            <AdminStatBox 
              icon={<FaGavel size={40} />} 
              color="#FF5D29" 
              title="Legal Professionals" 
              count="100,000K" 
            />
          </div>
        </Container>
        
        {/* Supporter request section */}
        <h4 className='m-3'>View new supporters request</h4>
        <Container>
          <Row>
            <Col md={6} className="mb-4 d-flex">
              <Card className="flex-grow-1">
                <Card.Body>
                  <Card.Text className='m-2'>
                    <strong>Login</strong> - Ben4 <br />
                    <strong>Display name</strong> - ben4 <br />
                    <strong>Email</strong> - Bensamson4@gmail.com <br />
                    <strong>Registration date</strong> - 09/03/1997 07:30 A.M
                  </Card.Text>
                  <Button variant="success" className="me-2 bg-theme border-0 text-dark px-4 py-2 fw-bolder m-2">Approve</Button>
                  <Button variant="danger" className='border-0 text-dark admin-reject-btn text-white px-4 py-2 fw-bolder m-2'>Reject</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4 d-flex">
              <Card className="flex-grow-1">
                <Card.Body>
                  <Card.Text className='m-2'>
                    <strong>Login</strong> - Ben4 <br />
                    <strong>Display name</strong> - ben4 <br />
                    <strong>Email</strong> - Bensamson4@gmail.com <br />
                    <strong>Registration date</strong> - 09/03/1997 07:30 A.M
                  </Card.Text>
                  <Button variant="success" className="me-2 bg-theme border-0 text-dark px-4 py-2 fw-bolder m-2">Approve</Button>
                  <Button variant="danger" className='border-0 text-dark admin-reject-btn text-white px-4 py-2 fw-bolder m-2'>Reject</Button>
                </Card.Body>
              </Card>
            </Col>
            {/* Add more supporter request cards as needed */}
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="primary" className="mt-4 bg-theme text-dark border-0 fw-bolder px-5 py-2">View All</Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AdminDashboard;
