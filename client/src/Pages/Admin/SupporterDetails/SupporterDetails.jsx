import React from 'react';
import './SupporterDetails.css';
import demo from '../../../Assets/demo-supp.png';
import { IMG_BASE_URL } from '../../../Services/apiService';

const SupporterDetails = ({ supporter }) => {
  return (
    <div className='modal-body bg-creamy'>
      <div className='container-fluid theme-purple'>
        <div className='row'>
          <div className='col text-center'>
            <div className="rounded-circle overflow-hidden" style={{ width: '150px', height: '150px', margin: '0 auto' }}>
              <img
                src={supporter.image && supporter.image.filename ? `${IMG_BASE_URL}/${supporter.image.filename}` : demo}
                alt='Supporter'
                className='img-fluid'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = demo; 
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        <div className='row border-bottom-5'>
          <div className='col-4'>
            Name:
          </div>
          <div className='col-8'>
            {supporter.name}
          </div>
        </div>
        <div className='row border-bottom-5'>
          <div className='col-4'>
            Contact No:
          </div>
          <div className='col-8'>
            {supporter.contact}
          </div>
        </div>
        <div className='row border-bottom-5'>
          <div className='col-4'>
            Mail Id:
          </div>
          <div className='col-8'>
            {supporter.email}
          </div>
        </div>
        <div className='row border-bottom-5'>
          <div className='col'>
            Organisation Name:
          </div>
          <div className='col'>
            {supporter.organization}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupporterDetails;
