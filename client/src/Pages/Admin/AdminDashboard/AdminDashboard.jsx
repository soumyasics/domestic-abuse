import React from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import './AdminDashboard.css';
import AdminStatBox from '../AdminStatBox/AdminStatBox';
import SupportersRequestTable from '../../Supporter/Request/SupportersRequestTable';
import { Container, Row, Col } from 'react-bootstrap';
import { PiWindowsLogoThin } from "react-icons/pi";
import { People, House } from 'react-bootstrap-icons';
import { FaHandshake,FaPeopleGroup } from "react-icons/fa6";
import { GoLaw } from "react-icons/go";

function AdminDashboard() {
  return (
    <div className='container-fluid bg-creamy'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminSidebar />
        </div>
        <div className='col '>
          <div className='row mt-3'>
            <div className='col m-5 d-flex'>
              <PiWindowsLogoThin size={50}/> <span className='align-self-center'><h2 className='theme-purple d-inline '>Dashboard</h2></span>
            </div>
          </div>
          <Container>
            <Row>
              <AdminStatBox icon={<FaHandshake size={40} />} color="#E8BD25" title="Supporters" count="30" />
              <AdminStatBox icon={<People size={40} />} color="#A5668B" title="Users" count="20" />
              <AdminStatBox icon={<House size={40} />} color="#67A244" title="Safe Space" count="20" />
              <AdminStatBox icon={<GoLaw size={40} />} color="#D3D3D3" title="Legal Professionals" count="15" />
              <AdminStatBox icon={<FaPeopleGroup size={40} />} color="#FF6347" title="Counsellors" count="18" />
            </Row>
            <Row className='mt-4'>
              <h3>New Supporters Request</h3>
              <SupportersRequestTable />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
