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
// Function to view all safehouses by a particular supporter
export const viewSafehousesBySupporterId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSafehouseBySupporterId/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching safehouses:', error);
    throw error;
  }
};
// Function to view safehouse requests for admin
export const viewSafehouseReqsForAdmin = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSafehouseReqsForAdmin`);
    return {
      success: true,
      data: response.data.data,
      message: response.data.msg,
    };
  } catch (error) {
    console.error('Error fetching safehouse requests for admin:', error);
    return {
      success: false,
      message: 'Failed to fetch safehouse requests for admin',
    };
  }
};
// Function to approve a safehouse by ID
export const approveSafehouseById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/approveSafehouseById/${id}`);
    return {
      success: true,
      data: response.data.data,
      message: response.data.msg,
    };
  } catch (error) {
    console.error('Error approving safehouse by ID:', error);
    return {
      success: false,
      message: 'Failed to approve safehouse by ID',
    };
  }
};
// Api for Rejecting Safehouse by ID
export const rejectSafehouseById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rejectSafehouseById/${id}`);
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
//Api for viewing all safehouses that are adminApproved
export const viewSafehouses = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSafehouses`);
    if (response.data.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Failed to fetch safehouses'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};
// Api for Counsellor Register
export const registerCounsellors = async (counsellorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/registerCounsellors`, counsellorData);
    // Handling responses based on status code
    switch (response.data.status) {
      case 200:
        console.log(response.data.msg); // "Inserted successfully"
        return { success: true, message: response.data.msg, data: response.data.data };
      case 409:
        console.log(response.data.msg); // Either "Contact Number Already Registered With Us !!" or "Email already in use"
        return { success: false, message: response.data.msg };
      case 500:
        console.log(response.data.msg); // "Data not Inserted"
        return { success: false, message: response.data.msg };
      default:
        console.log('Unexpected response status:', response.data.status);
        return { success: false, message: 'Unexpected error occurred' };
    }
  } catch (error) {
    console.error('Error Registering Counsellor', error);
    throw error;
  }
};

// Api for Counsellor Login
export const loginCounsellor = async (counsellor, setTokenCallback) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/loginCounsellor`, counsellor);

    if (response.data.status === 200) {
      const { token, data } = response.data;
      setTokenCallback(token, data._id);
      return { success: true, user: data };
    } else if (response.data.status === 405) {
      return { success: false, message: 'User not found ' };
    }else if (response.data.status === 407) {
        return { success: false, message: 'Password Mismatch ' };
      } 
    else if (response.data.status === 409) {
      if (response.data.msg.includes('Admin Approval')) {
        return { success: false, message: 'Please wait for Admin Approval' };
      } else if (response.data.msg.includes('De-Activated')) {
        return { success: false, message: 'Your Account is Currently De-Activated By Admin' };
      } else {
        return { success: false, message: 'Password Mismatch' };
      }
    } else {
      return { success: false, message: 'Unknown error occurred' };
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

// Add forgotPasswordCounsellor function
export const forgotPasswordCounsellor = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgotPasswordCounsellor`, { email, password });
    if (response.data.status === 200) {
      return { success: true, message: response.data.msg };
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

// Api for Registering Legal Professionals
export const registerLegalProfessional = async (legalProfessionalData) => {
  try {
    const formData = new FormData();
    Object.keys(legalProfessionalData).forEach(key => {
      const value = legalProfessionalData[key];
      if (key === 'photo' || key === 'proof') {
        if (value && typeof value === 'object' && value.name) {
          formData.append(key, value, value.name);
        }
      } else {
        formData.append(key, value);
      }
    });

    const response = await axios.post(`${API_BASE_URL}/registerLegalProfessional`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    switch (response.data.status) {
      case 200:
        console.log(response.data.msg); // "Inserted successfully"
        return { success: true, message: response.data.msg, data: response.data.data };
      case 409:
        console.log(response.data.msg); // "Contact Number Already Registered With Us !!" or "Email already in use"
        return { success: false, message: response.data.msg };
      case 500:
        console.log(response.data.msg); // "Data not Inserted"
        return { success: false, message: response.data.msg };
      default:
        console.log('Unexpected response status:', response.data.status);
        return { success: false, message: 'Unexpected error occurred' };
    }
  } catch (error) {
    console.error('Error Registering Legal Professional', error);
    throw error;
  }
};
//Api for legal professional login
export const loginLegalProfessional = async (legalProfessional) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/loginLegalProfessional`, legalProfessional);

    if (response.data.status === 200) {
      const { token, data } = response.data;
      return { success: true, token, userId: data._id };
    } else if (response.data.status === 405) {
      return { success: false, message: 'User not found' };
    } else if (response.data.status === 407) {
      return { success: false, message: 'Password Mismatch' };
    } else if (response.data.status === 409) {
      if (response.data.msg.includes('Admin Approval')) {
        return { success: false, message: 'Please wait for Admin Approval' };
      } else if (response.data.msg.includes('De-Activated')) {
        return { success: false, message: 'Your Account is Currently De-Activated By Admin' };
      } else {
        return { success: false, message: 'Password Mismatch' };
      }
    } else {
      return { success: false, message: 'Unknown error occurred' };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Login failed',
        debugInfo: error.response.data 
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred',
      debugInfo: error 
    };
  }
};


//Api for Legal Professional Forgot Password
export const resetPasswordLegalProfessional = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgotPasswordLegalProfessional`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Api for Viewing all Counsellor Requests for Admin
export const viewCounsellorReqsForAdmin = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewCounsellorReqsForAdmin`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Counsellor Requests for Admin', error);
    throw error;
  }
};
// Api for Viewing all Counsellor  for Admin
export const viewCounsellorForAdmin = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewCounsellors`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Counsellor Requests for Admin', error);
    throw error;
  }
};

// Api for Approving Counsellor Request by ID
export const approveCounsellorsById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/approveCounsellorsById/${id}`);
    if (response.status === 200) {
      return { success: true, data: response.data.data, message: response.data.msg };
    } else {
      return { success: false, message: response.data.msg || 'Approval failed' };
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

// Api for Rejecting Counsellor Request by ID
export const rejectCounsellorsById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rejectCounsellorsById/${id}`);
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.msg || 'Rejection failed'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

// API for Viewing all Legal Professional Requests for Admin
export const viewLegalProfessionalReqsForAdmin = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewLegalProfessionalReqsForAdmin`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching Legal Professional Requests for Admin', error);
    return { success: false, message: 'Error fetching legal professional requests.' };
  }
};

// API for Approving Legal Professionals by ID
export const approveLegalProfessionalsById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/approveLegalProfessionalById/${id}`);
    if (response.status === 200) {
      return { success: true, message: response.data.msg, data: response.data.data };
    } else {
      return { success: false, message: response.data.msg || 'Approval failed' };
    }
  } catch (error) {
    console.error('Error approving Legal Professional', error);
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

// API for Rejecting Legal Professionals by ID
export const rejectLegalProfessionalsById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/deleteLegalProfessionalById/${id}`);
    if (response.status === 200) {
      return { success: true, message: response.data.msg };
    } else {
      return { success: false, message: response.data.msg || 'Rejection failed' };
    }
  } catch (error) {
    console.error('Error rejecting Legal Professional', error);
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

// Function to get counsellor by ID
export const getCounsellorById = async (id) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/viewCounsellorsById/${id}`);
      console.log(response);
      return response.data.data;
  } catch (error) {
      console.error('Error fetching counsellor data:', error);
      throw error;
  }
};

// Function to get counsellor by ID
export const getCounsellorByIdProfile = async (id) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/viewCounsellorsById/${id}`);
      console.log(response);
      return response.data;
  } catch (error) {
      console.error('Error fetching counsellor data:', error);
      throw error;
  }
};
// Function to edit counsellor by ID
export const editCounsellorById = async (id, data) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/editCounsellorsById/${id}`, data);
      return response.data;
  } catch (error) {
      console.error('Error editing counsellor data:', error);
      throw error;
  }
};
// Function to fetch legal professional by ID
export const getLegalProfessionalById = async (id) => {
  try {
    console.log("id",id);
    const response = await axios.post(`${API_BASE_URL}/viewLegalProfessionalById/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching legal professional by ID:', error);
    throw error;
  }
};
// Function to fetch legal professional by ID
export const viewAllApprovedLegalProfessionals = async () => {
  try {
    console.log("in fun");
    const response = await axios.post(`${API_BASE_URL}/viewLegalProfessionals`);
    console.log("in fun",response.data.data);

    return response.data.data;
  } catch (error) {
    console.error('Error fetching legal professional by ID:', error);
    throw error;
  }
};
// Function to edit legal professional by ID
export const editLegalProfessionalById = async (id, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/editLegalProfessionalById/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error editing legal professional by ID:', error);
    throw error;
  }
};



// Api for Registering User
export const registerUsers = async (supporterData) => {
  try {
    const formData = new FormData();
    Object.keys(supporterData).forEach(key => {
      formData.append(key, supporterData[key]);
    });

    const response = await axios.post(`${API_BASE_URL}/registerUser`, formData, {
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
export const loginUser = async (supporter, setTokenCallback) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/loginUser`, supporter);

      if (response.data.status === 200) {
        localStorage.setItem("userId",response.data._id)
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