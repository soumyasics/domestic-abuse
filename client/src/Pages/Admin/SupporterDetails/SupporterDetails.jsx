import React from 'react';
import './SupporterDetails.css';
import demo from '../../../Assets/demo-supp.png';
import { IMG_BASE_URL } from '../../../Services/apiService';

const SupporterDetails = ({ supporter }) => {
  return (
    <div className='modal-body bg-creamy'>
       <div className='row theme-purple m-5'>
          <div className='col'>
            <div className='row'>
              <div className='col text-center mb-5'>
                <div className="rounded-circle overflow-hidden" style={{ width: '140px', height: '140px', margin: '0 auto' }}>
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
          </div>
          <div className='col border rounded bg-creamy'>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Name:
              </div>
              <div className='col-6 text-secondary '>
                {supporter.name}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Contact No:
              </div>
              <div className='col-6 text-secondary'>
                {supporter.contact}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Mail Id:
              </div>
              <div className='col-6 text-secondary'>
                {supporter.email}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Organisation Name:
              </div>
              <div className='col-6 text-secondary'>
                {supporter.organization}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SupporterDetails;
