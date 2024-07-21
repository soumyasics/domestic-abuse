import React, { useCallback } from 'react';
import './AdminDashboardOverview.css';
import { People, House } from 'react-bootstrap-icons';
import { FaHandshake, FaPeopleGroup } from "react-icons/fa6";
import { GoLaw } from "react-icons/go";
import { Container, Row, Col } from 'react-bootstrap';
import SupportersRequestTable from '../SupportersRequest/SupportersRequestTable';
import AdminStatBox from '../AdminStatBox/AdminStatBox';
import { useState, Fragment, useEffect } from 'react';
import axiosInstance from '../../../Constant/BaseURL';
import { useNavigate } from 'react-router-dom';
import { viewAllApprovedLegalProfessionals, viewCounsellorForAdmin, viewSafehouses, viewSupporters, viewUsersForAdmin } from '../../../Services/apiService';

function AdminDasboardOverview() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [userCount, setuserCount] = useState();
    const [advCount, setadvCount] = useState();
    const [counCount, setcounCount] = useState();
    const [suppCount, setsuppCount] = useState();
    const [safeHouseCount, setsafeHouseCount] = useState();

    useEffect(() => {
      axiosInstance
        .post(`viewSupporters`)
        .then((res) => {
          console.log(res);
          setUserData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
useEffect(()=>{
    fetchLegalProfessionals()
    fetchCouncellors()
    fetchSupporters()
    fetchUsers()
    fetchSafehouses()
},[])

    const fetchLegalProfessionals = async () => {
        try {
          const response = await viewAllApprovedLegalProfessionals();
         if (response) {
           console.log('Fetched legal professionals:', response);  // Debugging log
           setadvCount(response.length)         } else {
setadvCount(0)         }
        
        } catch (error) {
         }
      };
      const fetchCouncellors = async () => {
        try {
          const response = await viewCounsellorForAdmin();
         if (response) {
           console.log('Fetched legal professionals:', response);  // Debugging log
           setcounCount(response.length)         } else {
setcounCount(0)         }
        
        } catch (error) {
         }
      };
      const fetchUsers = async () => {
        try {
          const response = await viewUsersForAdmin();
         if (response) {
           console.log('Fetched user professionals:', response);  // Debugging log
           setuserCount(response.data.length)         } else {
setuserCount(0)         }
        
        } catch (error) {
         }
      };
      const fetchSupporters = async () => {
        try {
          const response = await viewSupporters();
         if (response) {
           console.log('Fetched supp professionals:', response);  // Debugging log
           setsuppCount(response.data.length)         } else {
setsuppCount(0)         }
        
        } catch (error) {
         }
      };
      const fetchSafehouses= async () => {
        try {
          const response = await viewSafehouses();
         if (response) {
           console.log('Fetched safe :', response);  // Debugging log
           setsafeHouseCount(response.data.length)         } else {
setsafeHouseCount(0)         }
        
        } catch (error) {
         }
      };
    return (
        <Container>
            <Row>
                <div className='col-md-2'>
                    <AdminStatBox icon={<FaHandshake size={40} />} color="#E8BD25" title="Supporters" count={suppCount} />

                </div>
                <div className='col-md-2'>
                    <AdminStatBox icon={<People size={40} />} color="#A5668B" title="Users" count={userCount} />

                </div>
                <div className='col-md-2'>
                    <AdminStatBox icon={<House size={40} />} color="#67A244" title="Safe Space" count={safeHouseCount} />

                </div>
                <div className='col-md-2'>
                    <AdminStatBox icon={<GoLaw size={40} />} color="#D3D3D3" title="Legal Professionals" count={advCount} />

                </div>
                <div className='col-md-2'>
                    <AdminStatBox icon={<FaPeopleGroup size={40} />} color="#FF6347" title="Counsellors" count={counCount} />

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