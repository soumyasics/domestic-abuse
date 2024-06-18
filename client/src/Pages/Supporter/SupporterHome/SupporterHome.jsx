import React from 'react';
import './SupporterHome.css';
import meeting from '../../../Assets/SUPPORTWR HOME PAGE.png';
import SupporterStatBox from '../SupporterStatBox/SupporterStatBox';
import { People, House } from 'react-bootstrap-icons';
import { GoLaw } from "react-icons/go";
import { FaPeopleGroup } from "react-icons/fa6";
import guy from '../../../Assets/supporter_guy.png';

function SupporterHome() {
    return (
        <div className='container-fluid'>
            <div className='row d-flex m-5'>
                <div className='col align-self-center text-center m-auto'>
                    <div className='row m-auto '>
                        <div className='col-auto '>
                            <SupporterStatBox icon={<People size={40} />} color="#DF9E5B" title="Users" count="20" textColor="#734669" />
                        </div>
                        <div className='col-auto'>
                            <SupporterStatBox icon={<House size={40} />} color="#734669" title="Safe House" count="20" textColor="#DF9E5B" />

                        </div>
                    </div>
                    <div className='row m-auto'>
                        <div className='col-auto'>
                            <SupporterStatBox icon={<GoLaw size={40} />} color="#734669" title="Legal Professionals" count="15" textColor="#DF9E5B" />

                        </div>
                        <div className='col-auto'>
                            <SupporterStatBox icon={<FaPeopleGroup size={40} />} color="#DF9E5B" title="Counsellors" count="18" textColor="#734669" />

                        </div>
                    </div>

                </div>
                <div className='col text-center'>
                    <img src={meeting} className='img-fluid' alt='supporter meeting' />
                </div>
            </div>
            <div className='card m-5' style={{backgroundColor:'#F2D7EE'}}>
                <div className='row m-5'>
                    <div className='col-8 card-body my-5'>
                        <h3 className='card-title fw-bold'>About <span className='theme-purple'>Safe</span> <span className='theme-green'>Space</span></h3>
                        <p className='card-text fw-medium my-5 fs-4'>
                            Helping people find safety and support. Safe Space makes it simple tofind the services and resources that victims and survivors of domestic violence need. We provide the largest searchable database of programs and shelters in the U.S. and Canada and an extensive libraryof resources. Safe space strives to be the catalyst that those experiencing abuse need to for positive change.Domestic Abuse is a serious issue that affects millions of people worldwide each year. Survivors of domestic violence often experience feelings of isolation and shame, making it difficult for them to speak up and seek help. It is crucial that these individuals are provided with a safe space to share their experiences without fear of judgement or criticism
                        </p>
                    </div>
                    <div className='col-4 my-5'>
                        <img src={guy} className='img-fluid' alt='supporter guy' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupporterHome