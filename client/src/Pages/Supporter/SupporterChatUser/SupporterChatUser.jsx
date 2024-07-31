import './SupporterChatUser.css';
import dpSupporter from '../../../Assets/chat-legal.png'; 
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IoMdSend } from "react-icons/io";
import React, { useEffect, useRef, useState } from 'react';
import { chatting, getSupporterById, getUserById, IMG_BASE_URL, viewChatBetweenUserAndSupp, viewChats } from '../../../Services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import demo from '../../../Assets/supp-edit-profile.png';
import { useParams } from 'react-router-dom';
function SupporterChatUser() {
  const [user, setUser] = useState({
    name:'',
    image:{filename:''}
  });

  const { issueId,userId } = useParams();
  const suppId = localStorage.getItem("supporterId");
    const [patient, setPatient] = useState({});
    const [imagePreview, setImagePreview] = useState(demo);

    const [mesg, setMesg] = useState({
      msg: "",
      from: "supporter",
      suppId: suppId,
      userId: userId,
      to:'user',
      timestamp:''
     
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
          suppId:suppId,
          userId:userId
        }); 
        console.log(response);
        if (response.data.status==200) {
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
                const response = await getUserById(userId);
                console.log('Fetch supporter response:', response);
                if (response.success) {
                    setUser(response.user);
                    setImagePreview(response.user.image ? `${IMG_BASE_URL}/${response.user.image.filename}` : demo);
                } else {
                    toast.error('user not found');
                }
            } catch (error) {
                console.error('Error fetching supporter data:', error);
            }
        }
    };

    fetchSupporterData();
}, []);

//   const handleSendMessage = () => {
//    const datas= chatting(mesg)
// console.log(datas);
// setData((prevData) => [...prevData]);
// setMesg({
//   ...mesg,
//   msg: "",
//   timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  
// });
    

//     console.log("mesg",mesg);
//   };


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
            src={user.image && user.image.filename ? `${IMG_BASE_URL}/${user.image.filename}` : dpSupporter}
            alt="Supporter"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = dpSupporter;
            }}
          />
        </Col>
        <Col>
          <p className="mb-0">{user?.name || 'Supporter Name'}</p>
        </Col>
      </Row>
      <Row className="chat-content flex-grow-1">
  <div className="message-container">
    {data.map((message, index) => (
      <div
        key={index}
        className={`chat-bubble ${message.from}`}
      >
        {message.msg}
        <div className="chat-timestamp">{message.timestamp}</div>
      </div>
    ))}
  </div>
</Row>

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

export default SupporterChatUser;
