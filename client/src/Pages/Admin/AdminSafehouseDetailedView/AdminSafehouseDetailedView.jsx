import React from 'react';
import './AdminSafehouseDetailedView.css';
import demoSafehouse from '../../../Assets/newhouse.jpeg';
import { IMG_BASE_URL } from '../../../Services/apiService';
import demo from '../../../Assets/demo-supp.png';
function AdminSafehouseDetailedView(props, supporter) {
  return (
    <>
      <div className='container'>
        <div className='row m-5'>
          <div className='col'>
            <h3 className='text-center theme-purple fw-bold'>{props.name ? props.name : 'Aishwaryas Home'}</h3>
          </div>
        </div>
        <div className='row m-5'>
          <div className='col m-3'>
            <img
              src={props.image && props.image.filename ? `${IMG_BASE_URL}/${props.image.filename}` : demoSafehouse}
              alt='Safehouse'
              className='img-fluid rounded'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = demoSafehouse;
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className='col m-3 bg-creamy theme-purple text-center fs-6 border rounded'>
            <div className='row border-bottom m-5 '>
              <div className='col-6'>
                House Name:
              </div>
              <div className='col-6 text-secondary'>
                {props.name ? props.name : 'Aishwaryas Home'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Address:
              </div>
              <div className='col-6 text-secondary'>
                {props.landmark ? props.landmark : 'Akkulam Rd, Trivandrum'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Contact Number:
              </div>
              <div className='col-6 text-secondary'>
                {props.contact ? props.contact : '9495211400'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Accommodation Capacity:
              </div>
              <div className='col-6 text-secondary'>
                {props.capacity ? props.capacity : '6'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Monthly Rent:
              </div>
              <div className='col-6 text-secondary'>
                {props.rent ? props.rent : '5000'}
              </div>
            </div>
            <div className='row border-bottom m-5'>
              <div className='col-6'>
                Description:
              </div>
              <div className='col-6 text-secondary'>
                {props.description ? props.description : 'It is a place where someone can stay and be protected'}
              </div>
            </div>
          </div>
        </div>
        <div className='row m-5'>
          <div className='col'>
            <h3 className='text-center  theme-purple fw-bold'>Supporter Details</h3>
          </div>
        </div>
        <div className='row theme-purple m-5'>
          <div className='col'>
            <div className='row'>
              <div className='col text-center'>
                <div className="rounded-circle overflow-hidden" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
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
          <div className='col fs-6 border rounded bg-creamy'>
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
    </>
  );
}

export default AdminSafehouseDetailedView;
