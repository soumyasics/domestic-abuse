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
    )
}

export default AdminDasboardOverview