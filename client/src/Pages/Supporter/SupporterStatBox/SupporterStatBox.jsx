import React from 'react';
import './SupporterStatBox.css';

function SupporterStatBox({ icon, color, title, count , textColor}) {
    return (
        <div className='card stat-box-supp text-center m-3' style={{backgroundColor:color, color:textColor}}>
            <div className='card-body fs-3 p-1'> 
                <div className='row'>
                    <div className='col text-white'>
                    {icon}
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-white'>
                    {count}
                    </div>
                </div>
                <div className='row'>
                    <div className='col card-title'>
                    {title}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupporterStatBox