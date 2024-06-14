import axios from 'axios';

 const API_BASE_URL = 'http://localhost:4039/domestic_abuse_api';
// const API_BASE_URL = 'http://hybrid.srishticampus.in/domestic_abuse_api/';
export const viewSupporterReqsForAdmin = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSupporterReqsForAdmin`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Supporter Requests for Admin', error);
    throw error;
  }
};
