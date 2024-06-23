//src/Services/apiService.jsx
import axios from 'axios';

//const API_BASE_URL = 'http://localhost:4039/domestic_abuse_api';
 const API_BASE_URL = 'http://hybrid.srishticampus.in/domestic_abuse_api/';
// Api for Viewing all Supporters Request for admin to approve, reject or view
export const viewSupporterReqsForAdmin = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSupporterReqsForAdmin`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Supporter Requests for Admin', error);
    throw error;
  }
};

// Api for Registering Supporters
export const registerSupporters = async (supporterData) => {
  try {
    const formData = new FormData();
    Object.keys(supporterData).forEach(key => {
      formData.append(key, supporterData[key]);
    });

    const response = await axios.post(`${API_BASE_URL}/registerSupporters`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Registering Supporter', error);
    throw error; 
  }
};

// Api for Supporter Login
export const loginSupporter = async (supporter, setTokenCallback) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/loginSupporter`, supporter);

    if (response.data.status === 200) {
      const { token, data } = response.data;
      setTokenCallback(token, data._id); 
      return { success: true, user: data };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Login failed'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};


// Api for Accepting Supporter Request by Id
export const approveSupportersById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/approveSupportersById/${id}`);
    if (response.data.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Approval failed'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

// Api for Rejecting Supporter Request by Id
export const rejectSupportersById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rejectSupportersById/${id}`);
    if (response.data.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Rejection failed'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

//Api for View all supporters
export const viewSupporters = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSupporters`);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

//Api for Removing Supporters by Id
export const removeSupportersById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/removeSupportersById/${id}`);
    if (response.data.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Removal failed'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

//Api for  Forgot Password
export const forgotPassword = async (emails,passwords) => {
  try {
    const forgotPasswordData={email:emails,password:passwords}
    const response = await axios.post(`${API_BASE_URL}/forgotPasswordSupporter`, forgotPasswordData);
    if (response.data.status === 200) {
      return { success: true, data: response.data.msg };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Password reset failed'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};
//Api for Supporter Edit Profile
export const editSupportersById = async (id, supporterData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/editSupportersById/${id}`, supporterData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Update failed'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};
//View  Supporters by id
export const getSupporterById = async (supporterId) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/viewSupportersById/${supporterId}`);
      return response.data;
  } catch (error) {
      console.error(`Error fetching supporter with ID ${supporterId}:`, error);
      throw error; 
  }
};