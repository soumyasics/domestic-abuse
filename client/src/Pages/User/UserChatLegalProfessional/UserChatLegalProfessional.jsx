import './UserChatLegalProfessional.css';
import dpLegal from '../../../Assets/chat-legal.png';
import { IoMdSend } from "react-icons/io";
import React, { useEffect, useRef, useState } from 'react';
import { chatting, IMG_BASE_URL, viewChatBetweenUserAndAdv, viewOneCaseByIssueId } from '../../../Services/apiService';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import demo from '../../../Assets/supp-edit-profile.png';
import { useParams } from 'react-router-dom';

function UserChatLegalProfessional() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [lp, setLp] = useState({
    _id: '',
    name: '',
    photo: { filename: '' }
  });
  const [data, setData] = useState([]);
  const chatBodyRef = useRef(null);
  const [mesg, setMesg] = useState({
    msg: "",
    from: "user",
    lpId: '',
    userId: userId,
    to: 'lp',
    timestamp: ''
  });

  // Fetch legal professional data
  useEffect(() => {
    const fetchLpData = async () => {
      try {
        const response = await viewOneCaseByIssueId(id);
        if (response.status === 200) {
          setLp(response.data);
          setMesg(prevMesg => ({ ...prevMesg, lpId: response.data._id }));
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching legal professional data', error);
        toast.error('Error fetching legal professional data. Please try again.');
      }
    };

    fetchLpData();
  }, [id]);

  // Fetch chat data when lp._id is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (lp._id) {
        try {
          const response = await viewChatBetweenUserAndAdv({
            lpId: lp._id,
            userId: userId
          });
          if (response.data.status === 200) {
            setData(response.data.data);
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          console.error('Error fetching chat data', error);
          toast.error('Error fetching chat data. Please try again.');
        }
      }
    };

    fetchUserData();
  }, [lp._id, userId]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [data]);

  // Handle message input change
  const handleChange = (e) => {
    setMesg({
      ...mesg,
      [e.target.name]: e.target.value,
    });
  };

  // Handle sending message
  const handleSendMessage = async () => {
    try {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage = {
        ...mesg,
        timestamp: timestamp
      };
      await chatting(newMessage);
      setData((prevData) => [...prevData, newMessage]);
      setMesg({
        ...mesg,
        msg: "",
        timestamp: ''
      });
    } catch (error) {
      console.error("Error sending message", error);
      toast.error('Error sending message. Please try again.');
    }
  };

  return (
    <Container fluid className="chat-container p-5">
      <Row className="chat-header">
        <Col xs="auto">
          <img
            src={lp.photo && lp.photo.filename ? `${IMG_BASE_URL}/${lp.photo.filename}` : dpLegal}
            alt="Legal Professional"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = demo;
            }}
          />
        </Col>
        <Col>
          <p className="mb-0">{lp?.name || 'Legal Professional Name'}</p>
        </Col>
      </Row>

      {/* <Row className="chat-content flex-grow-1" ref={chatBodyRef}>
        {data.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.from}`}>
            {message.msg}
            <div className="chat-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </Row> */}

<div className='row'>
  <div className="chat-content flex-grow-1" ref={chatBodyRef}>
        {console.log(data)}
        {data.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.to} w-50 m-4`} >
            {message.msg}
            <div className="chat-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
</div>

      <Row className="chat-footer">
        <Col>
          <Form className="d-flex w-100">
            <Form.Control
              type="text"
              name='msg'
              onChange={handleChange}
              value={mesg.msg}
              placeholder="Type a message"
              className="me-2"
            />
            <span className='d-flex align-items-center cursor-pointer'  onClick={handleSendMessage}>
              <IoMdSend size={30} />
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserChatLegalProfessional;
