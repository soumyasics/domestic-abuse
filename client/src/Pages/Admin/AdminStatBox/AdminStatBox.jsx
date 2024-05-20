import React from 'react';
import { Card } from 'react-bootstrap';

function AdminStatBox({ icon, color, title, count }) {
  return (
    <Card className="text-center m-2 " style={{ backgroundColor: color, width: '150px',opacity:0.8 }}>
      <Card.Body>
        {icon}
        <Card.Title>{title}</Card.Title>
        <Card.Text>{count}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AdminStatBox;
