import React, { useState } from 'react';
import './UserChatSupporter.css';
import dpSupporter from '../../../Assets/chat-legal.png';
import { IMG_BASE_URL } from '../../../Services/apiService';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IoMdSend } from "react-icons/io";

function UserChatSupporter() {
  const [supporter, setSupporter] = useState({});
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'Hi, I need some support regarding my current situation. I am staying in a safe house and need to understand my options and support available to me.',
      timestamp: '8:00 AM'
    },
    {
      sender: 'supporter',
      text: 'Hello, I can help with that. Could you provide some more details about your situation? Are you in the safe house due to domestic violence, stalking, or another reason?',
      timestamp: '8:02 AM'
    },
    {
      sender: 'user',
      text: 'I am here because of domestic violence. My partner has been abusive, and I had to leave for my safety. I\'m worried about what happens next, especially regarding my mental health and any support I might need.',
      timestamp: '8:03 AM'
    },
    {
      sender: 'supporter',
      text: 'I\'m sorry to hear that you\'re going through this. It\'s important to know that there are several support systems available to you. First, have you spoken to a counsellor or therapist about your situation?',
      timestamp: '8:04 AM'
    },
    {
      sender: 'user',
      text: 'Yes, I have been in touch with a therapist.',
      timestamp: '8:05 AM'
    },
    {
      sender: 'supporter',
      text: 'That\'s a good step. Therapy can help you process your experiences and develop coping strategies. Additionally, there are support groups for individuals who have gone through similar situations. Would you be interested in joining one?',
      timestamp: '8:06 AM'
    },
    {
      sender: 'user',
      text: 'Not yet. I\'m not sure how to start that process.',
      timestamp: '8:07 AM'
    },
    {
      sender: 'supporter',
      text: 'We can definitely work on that. I can help you find a support group and connect you with other resources that can assist you. It\'s important to take things one step at a time and know that you\'re not alone in this.',
      timestamp: '8:09 AM'
    },
    {
      sender: 'user',
      text: 'Thank you for the support. I feel a bit more hopeful now.',
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

export default UserChatSupporter;
