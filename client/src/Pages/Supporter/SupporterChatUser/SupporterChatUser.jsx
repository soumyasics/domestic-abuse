import React, { useState } from 'react';
import './SupporterChatUser.css';
import dpSupporter from '../../../Assets/chat-legal.png'; 
import { IMG_BASE_URL } from '../../../Services/apiService';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IoMdSend } from "react-icons/io";

function SupporterChatUser() {
  const [supporter, setSupporter] = useState({});
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'Hi, I need some support regarding my current situation. I am staying in a safe house and need guidance.',
      timestamp: '8:00 AM'
    },
    {
      sender: 'supporter',
      text: 'Hello, I can help with that. Could you provide some more details about your situation?',
      timestamp: '8:02 AM'
    },
    {
      sender: 'user',
      text: 'I am here because of domestic violence. I\'m worried about what happens next.',
      timestamp: '8:03 AM'
    },
    {
      sender: 'supporter',
      text: 'I\'m sorry to hear that. It\'s important to know that there are several protections and resources available to you.',
      timestamp: '8:04 AM'
    },
    {
      sender: 'user',
      text: 'Thank you for the advice. I feel a bit more prepared now.',
      timestamp: '8:10 AM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([
        ...messages,
        {
          sender: 'user',
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <Container fluid className="chat-container p-5">
      <Row className="chat-header">
        <Col xs="auto">
          <img
            src={supporter.photo && supporter.photo.filename ? `${IMG_BASE_URL}/${supporter.photo.filename}` : dpSupporter}
            alt="Supporter"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = dpSupporter;
            }}
          />
        </Col>
        <Col>
          <p className="mb-0">{supporter?.name || 'Supporter Name'}</p>
        </Col>
      </Row>

      <Row className="chat-content flex-grow-1">
        {messages.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.sender} w-50 m-4`}>
            {message.text}
            <div className="chat-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </Row>

      <Row className="chat-footer">
        <Col>
          <Form className="d-flex w-100">
            <Form.Control
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="me-2"
            />
            <span className='d-flex align-items-center cursor-pointer' onClick={handleSendMessage}>
              <IoMdSend size={30} />
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SupporterChatUser;
