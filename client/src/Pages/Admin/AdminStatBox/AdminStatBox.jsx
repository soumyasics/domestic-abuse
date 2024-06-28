import React from 'react';
import { Card } from 'react-bootstrap';
import './AdminStatBox.css';

function AdminStatBox({ icon, color, title, count }) {
  return (
    <Card className=" m-3 stat-box rounded-4" >
      <div className='position-relative row card-body'>
        <div className='position-absolute stat-box-icon-position d-flex  align-items-center col border rounded-4' style={{ backgroundColor: color ,color:'white'}}>
          <div className='text-center align-self-center position-absolute top-50 start-50 translate-middle '>
            {icon}
          </div>

        </div>

        <div className='row '>
          <div className='col-9 card-title position-absolute top-50 mb-3 mt-1 theme-purple fw-bold fs-6'>
            {title}
          </div>
          <div className='col-3 card-text position-absolute top-50 start-50 mx-5 fs-5' style={{ color: color }}>
            {count}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AdminStatBox;
