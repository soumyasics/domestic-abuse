import React, { useEffect, useRef, useState } from 'react';
import './UserChatSupporter.css';
import dpSupporter from '../../../Assets/chat-legal.png';
import { chatting, getSupporterById, IMG_BASE_URL, viewChatBetweenUserAndSupp, viewChats } from '../../../Services/apiService';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IoMdSend } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import demo from '../../../Assets/supp-edit-profile.png';
function UserChatSupporter() {
  const [supporter, setSupporter] = useState({});

  const { id, suppId } = useParams();
  const userId = localStorage.getItem("userId");
  const [patient, setPatient] = useState({});
  const [imagePreview, setImagePreview] = useState(demo);

 

  const [mesg, setMesg] = useState({
    msg: "",
    from: "user",
    suppId: suppId,
    userId: userId,
    to: 'supporter'

  });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setMesg({
      ...mesg,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await viewChatBetweenUserAndSupp({
          suppId: suppId,
          userId: userId
        });
        console.log(response);
        if (response.data.status == 200) {
          setData(response.data.data);
          // setImagePreview(response.data.image.filename ? `${IMG_BASE_URL}/${response.data.image.filename}` : demo);

        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
        toast.error('Error fetching user data. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  //Chat viewing API
  // const [chat, setChat] = useState({
  //   patientId: id,
  //   councellorId: Counsellorid,
  // });

  // useEffect(() => {

  // }, [chat]);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [data]);

  useEffect(() => {
    const fetchSupporterData = async () => {
      if (suppId) {
        try {
          const response = await getSupporterById(suppId);
          console.log('Fetch supporter response:', response);
          if (response.status === 200) {
            setSupporter(response.data);
            setImagePreview(response.data.image ? `${IMG_BASE_URL}/${response.data.image.filename}` : demo);
          } else {
            toast.error('Supporter not found');
          }
        } catch (error) {
          console.error('Error fetching supporter data:', error);
          toast.error('An error occurred while fetching the supporter data');
        }
      }
    };

    fetchSupporterData();
  }, []);


  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      const formatDate = (dateString) => {

        const date = new Date(dateString);
        
      
        const options = { month: 'short', day: 'numeric' };
    
        return date.toLocaleDateString('en-US', options);
      };
      const datestamp = formatDate(new Date());
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage = {
        ...mesg,
        timestamp: timestamp,
        datestamp:datestamp
      };

      if(!mesg.msg.trim()){
        toast.error('You Cannot Send a Blank Message', {
          autoClose: 900, 
        });
      }else{
      await chatting(newMessage);
      setData((prevData) => [...prevData, newMessage]);
      setMesg({
        ...mesg,
        msg: "",
        timestamp: '',
        datestamp:'',
      });
    } 
  }catch (error) {
      console.error("Error sending message", error);
      toast.error('Error sending message. Please try again.');
    }
  };

  return (
    <Container fluid className="chat-container p-5">
      <Row className="chat-header">
        <Col xs="auto">
          <img
            src={supporter.image && supporter.image.filename ? `${IMG_BASE_URL}/${supporter.image.filename}` : dpSupporter}
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

      {/* <Row className="chat-content flex-grow-1">
        {console.log(data)}
        {data.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.to} w-50 m-4`}>
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
