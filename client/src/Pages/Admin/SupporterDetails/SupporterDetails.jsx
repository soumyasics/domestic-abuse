import React from 'react';
import './SupporterDetails.css';
import demo from '../../../Assets/demo-supp.png';

const SupporterDetails = ({ supporter }) => {
  return (
    <div className='modal-body'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col rounded-5'>
            <img
              src={supporter.image || demo}
              alt='Supporter'
              className='img-fluid'
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = demo;
              }}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            Name:
          </div>
          <div className='col'>
            {supporter.name}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            Contact No:
          </div>
          <div className='col'>
            {supporter.contact}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            Mail Id:
          </div>
          <div className='col'>
            {supporter.email}
          </div>
        </div>
        <div className='row'>
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
