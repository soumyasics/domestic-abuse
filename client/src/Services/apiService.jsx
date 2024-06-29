//src/Services/apiService.jsx
import axios from 'axios';

// export const API_BASE_URL = 'http://localhost:4039/domestic_abuse_api';
// export const IMG_BASE_URL = 'http://localhost:4039/';
export const IMG_BASE_URL = 'http://hybrid.srishticampus.in:4039/';
export const API_BASE_URL = 'http://hybrid.srishticampus.in/domestic_abuse_api/';
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

    // Handling responses based on status code
    switch (response.data.status) {
      case 200:
        console.log(response.data.msg); // "Inserted successfully"
        return { success: true, message: response.data.msg, data: response.data.data };
      case 409:
        console.log(response.data.msg); // Either "contact Number Already Registered With Us !!" or "Email already in use"
        return { success: false, message: response.data.msg };
      case 500:
        console.log(response.data.msg); // "Data not Inserted"
        return { success: false, message: response.data.msg };
      default:
        console.log('Unexpected response status:', response.data.status);
        return { success: false, message: 'Unexpected error occurred' };
    }
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
        localStorage.setItem("supporterId",response.data._id)
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
              message: error.response.data.msg || 'Login failed',
          };
      }
      return {
          success: false,
          message: 'An unexpected error occurred',
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

// API for Registering Safe House
export const registerSafeHouse = async (safehouseData) => {
  try {
    const formData = new FormData();
    Object.keys(safehouseData).forEach(key => {
      if (key === 'image') {
        formData.append('image', safehouseData[key], safehouseData[key].name);
      } else {
        formData.append(key, safehouseData[key]);
      }
    });

    const response = await axios.post(`${API_BASE_URL}/registerSafehouse`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.status === 200) {
      return { success: true, message: response.data.msg };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Failed to register safe house',
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
};

//Api for Updating Safehouse by ID
export const editSafehouseById = async (id, safehouseData) => {
  try {
    const formData = new FormData();
    Object.keys(safehouseData).forEach(key => {
      if (key === 'image') {
        formData.append('image', safehouseData[key], safehouseData[key].name);
      } else {
        formData.append(key, safehouseData[key]);
      }
    });

    const response = await axios.post(`${API_BASE_URL}/editSafehouseById/${id}`, formData, {
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

// Function to view safehouse by ID
export const viewSafehouseById = async (id) => {
  try {
    console.log(id);
    const response = await axios.post(`${API_BASE_URL}/viewSafehouseById/${id}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching safe house with ID ${id}:`, error);
    throw error;
  }
};
// Function to view all safehouses
export const viewSafehouses = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSafehouseBySupporterId/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching safehouses:', error);
    throw error;
  }
};

//Api for Counsellor Login
export const loginCounsellor = async (counsellor, setTokenCallback) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/loginCounsellor`, counsellor);

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
              message: error.response.data.msg || 'Login failed',
          };
      }
      return {
          success: false,
          message: 'An unexpected error occurred',
      };
  }
};
