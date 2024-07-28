import React, { useState } from 'react';
import './UserChatLegalProfessional.css';
import dpLegal from '../../../Assets/chat-legal.png';
import { IMG_BASE_URL } from '../../../Services/apiService';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IoMdSend } from "react-icons/io";

function UserChatLegalProfessional() {
  const [legalProfessional, setLegalProfessional] = useState({});
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'Hi, I need some legal advice regarding my current situation. I am staying in a safe house and need to understand my rights and the legal protections available to me.',
      timestamp: '8:00 AM'
    },
    {
      sender: 'legal-professional',
      text: 'Hello, I can help with that. Could you provide some more details about your situation? Are you in the safe house due to domestic violence, stalking, or another reason?',
      timestamp: '8:02 AM'
    },
    {
      sender: 'user',
      text: 'I am here because of domestic violence. My partner has been abusive, and I had to leave for my safety. I\'m worried about what happens next, especially regarding custody of my children and any legal action I might need to take.',
      timestamp: '8:03 AM'
    },
    {
      sender: 'legal-professional',
      text: 'I\'m sorry to hear that you\'re going through this. It\'s important to know that there are several protections and resources available to you. First, have you obtained a restraining order or protective order against your partner?',
      timestamp: '8:04 AM'
    },
    {
      sender: 'user',
      text: 'Yes, I have a restraining order in place.',
      timestamp: '8:05 AM'
    },
    {
      sender: 'legal-professional',
      text: 'That\'s a good first step. This order will help protect you and your children by legally preventing your partner from coming near you. Next, regarding custody, the court typically prioritizes the safety and well-being of the children. Have you filed for temporary custody or made any formal custody arrangements?',
      timestamp: '8:06 AM'
    },
    {
      sender: 'user',
      text: 'Not yet. I\'m not sure how to start that process.',
      timestamp: '8:07 AM'
    },
    {
      sender: 'legal-professional',
      text: 'We can definitely work on that. You should file a petition for temporary custody as soon as possible, citing the abuse and the need to protect your children. The court will consider the restraining order and your safety when making decisions. Additionally, you may want to work with a family law attorney who can represent you in court and ensure that your rights and the best interests of your children are upheld.',
      timestamp: '8:09 AM'
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
            src={legalProfessional.photo && legalProfessional.photo.filename ? `${IMG_BASE_URL}/${legalProfessional.photo.filename}` : dpLegal}
            alt="Legal Professional"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = dpLegal;
            }}
          />
        </Col>
        <Col>
          <p className="mb-0">{legalProfessional?.name || 'Jithin Jose'}</p>
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

export default UserChatLegalProfessional;
