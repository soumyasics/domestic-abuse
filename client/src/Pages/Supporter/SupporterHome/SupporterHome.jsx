import React, { useEffect, useState } from 'react';
import './SupporterHome.css';
import meeting from '../../../Assets/SUPPORTWR HOME PAGE.png';
import SupporterStatBox from '../SupporterStatBox/SupporterStatBox';
import { People, House } from 'react-bootstrap-icons';
import { GoLaw } from "react-icons/go";
import { FaPeopleGroup } from "react-icons/fa6";
import guy from '../../../Assets/supporter_guy.png';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { viewAllApprovedLegalProfessionals, viewCounsellorForAdmin, viewSafehouses, viewSupporters, viewUsersForAdmin } from '../../../Services/apiService';

function SupporterHome() {

    const [userCount, setuserCount] = useState();
    const [advCount, setadvCount] = useState();
    const [counCount, setcounCount] = useState();
    const [suppCount, setsuppCount] = useState();
    const [safeHouseCount, setsafeHouseCount] = useState();

   
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
        <div className='container-fluid'>
            <ToastContainer />
            <div className='row d-flex m-5'>
                <div className='col align-self-center text-center m-auto'>
                    <div className='row m-auto '>
                        <div className='col-lg-6 '>
                            <SupporterStatBox icon={<People size={40} />} color="#DF9E5B" title="Users" count={userCount} textColor="#734669" />
                        </div>
                        <div className='col-lg-6'>
                            <SupporterStatBox icon={<House size={40} />} color="#734669" title="Safe House" count={safeHouseCount} textColor="#DF9E5B" />

                        </div>
                    </div>
                    <div className='row m-auto'>
                        <div className='col-lg-6'>
                            <SupporterStatBox icon={<GoLaw size={40} />} color="#734669" title="Legal Professionals" count={advCount} textColor="#DF9E5B" />

                        </div>
                        <div className='col-lg-6'>
                            <SupporterStatBox icon={<FaPeopleGroup size={40} />} color="#DF9E5B" title="Counsellors" count={counCount} textColor="#734669" />

                        </div>
                    </div>

                </div>
                <div className='col text-center'>
                    <img src={meeting} className='img-fluid' alt='supporter meeting' />
                </div>
            </div>
            <div className='card m-5' style={{backgroundColor:'#F2D7EE'}}>
                <div className='row m-5'>
                    <div className='col-md-6 card-body my-5 mt-0'>
                        <h3 className='card-title fw-bold'>About <span className='theme-purple'>Safe</span> <span className='theme-green'>Space</span></h3>
                        <p className='card-text fw-medium my-5 mt-3 fs-4 me-5' style={{textAlign:'justify'}}>
                            Helping people find safety and support. Safe Space makes it simple tofind the services and resources that victims and survivors of domestic violence need. We provide the largest searchable database of programs and shelters in the U.S. and Canada and an extensive libraryof resources. Safe space strives to be the catalyst that those experiencing abuse need to for positive change.Domestic Abuse is a serious issue that affects millions of people worldwide each year. Survivors of domestic violence often experience feelings of isolation and shame, making it difficult for them to speak up and seek help. It is crucial that these individuals are provided with a safe space to share their experiences without fear of judgement or criticism
                        </p>
                    </div>
                    <div className='col-md-6  align-self-center text-center '>
                        <img src={guy} className='img-fluid object-fit-cover scale-img' alt='supporter guy' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupporterHome