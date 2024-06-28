import React from 'react';
import './AdminDashboardOverview.css';
import { People, House } from 'react-bootstrap-icons';
import { FaHandshake, FaPeopleGroup } from "react-icons/fa6";
import { GoLaw } from "react-icons/go";
import { Container, Row, Col } from 'react-bootstrap';
import SupportersRequestTable from '../Request/SupportersRequestTable';
import AdminStatBox from '../AdminStatBox/AdminStatBox';

function AdminDasboardOverview() {

    return (
        <Container>
            <Row>
                <div className='col-md-2'>
                    <AdminStatBox icon={<FaHandshake size={40} />} color="#E8BD25" title="Supporters" count="30" />

                </div>
                <div className='col-md-2'>
                    <AdminStatBox icon={<People size={40} />} color="#A5668B" title="Users" count="20" />

                </div>
                <div className='col-md-2'>
                    <AdminStatBox icon={<House size={40} />} color="#67A244" title="Safe Space" count="20" />

                </div>
                <div className='col-md-2'>
                    <AdminStatBox icon={<GoLaw size={40} />} color="#D3D3D3" title="Legal Professionals" count="15" />

                </div>
                <div className='col-md-2'>
                    <AdminStatBox icon={<FaPeopleGroup size={40} />} color="#FF6347" title="Counsellors" count="18" />

                </div>
            </Row>
            <Row className='mt-4'>
                <div className='col'>
                    <h3>New Supporters Request</h3>
                    <SupportersRequestTable activePage={'new-request'} />
                </div>

            </Row>
        </Container>
    )
}

export default AdminDasboardOverview