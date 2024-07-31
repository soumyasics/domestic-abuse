import React, { useEffect, useState, useRef } from 'react';
import './LegalProfessionalChatUser.css';
import dpLegal from '../../../Assets/chat-legal.png';
import { IMG_BASE_URL, viewChatBetweenUserAndAdv, viewUserById, chatting, getUserById } from '../../../Services/apiService';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { IoMdSend } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function LegalProfessionalChatUser() {
  const { userId } = useParams();
  const lpId = localStorage.getItem("lpId"); // Assuming `lpId` is stored in local storage
  const [user, setUser] = useState({name:'',image:{filename:''}});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatBodyRef = useRef(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserById(userId);
        if (response.success) {
          setUser(response.user);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
        toast.error('Error fetching user data. Please try again.');
      }
    };

    fetchUserData();
  }, [userId]);

  // Fetch chat data
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await viewChatBetweenUserAndAdv({
          lpId: lpId,
          userId: userId
        });
        if (response.data.status === 200) {
          setMessages(response.data.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching chat data', error);
        toast.error('Error fetching chat data. Please try again.');
      }
    };

    fetchChatData();
  }, [userId, lpId]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMsg = {
          msg: newMessage,
          from: 'lp',
          lpId: lpId,
          userId: userId,
          to: 'user',
          timestamp: timestamp
        };

        await chatting(newMsg);
        setMessages(prevMessages => [...prevMessages, newMsg]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message', error);
        toast.error('Error sending message. Please try again.');
      }
    }
  };

  return (
    <Container fluid className="chat-container p-5">
      <Row className="chat-header">
        <Col xs="auto">
          <img
            src={user.image && user.image.filename ? `${IMG_BASE_URL}/${user.image.filename}` : dpLegal}
            alt="User"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = dpLegal;
            }}
          />
        </Col>
        <Col>
          <p className="mb-0">{user?.name || 'User Name'}</p>
        </Col>
      </Row>

      <Row className="chat-content flex-grow-1" ref={chatBodyRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.from} w-50 m-4`}>
            {message.msg}
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

export default LegalProfessionalChatUser;
