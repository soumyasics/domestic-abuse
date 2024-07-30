//src/Services/apiService.jsx
import axios from 'axios';

export const API_BASE_URL = 'http://localhost:4039/domestic_abuse_api';
export const IMG_BASE_URL = 'http://localhost:4039/';
// export const IMG_BASE_URL = 'http://hybrid.srishticampus.in:4039/';
// export const API_BASE_URL = 'http://hybrid.srishticampus.in/domestic_abuse_api/';
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
    console.log("in ",response);
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
      console.log(response);
      if (response.data.status === 200) {
        return { success: true, message: response.data.msg };
      } else {
        return { success: false, message: response.data.msg || 'Rejection failed' };
      }  } catch (error) {
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
console.log(response);
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


//View  User by id
export const getUserById = async (supporterId) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/viewUserById/${supporterId}`);
      if (response.data.status === 200) {
          const { data } = response.data;
          return { success: true, user: data };
      } else {
          return { success: false, message: response.data.msg };
      }
  } catch (error) {
      console.error(`Error fetching supporter with ID ${supporterId}:`, error);
      throw error; 
  }
};

export const updateUser = async (id, data) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/editUserById/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      if (response.data.status === 200) {
        return { success: true, message: response.data.msg };
      } else {
        return { success: false, message: response.data.msg || 'Rejection failed' };
      }  } catch (error) {
      console.error('Error editing user data:', error);
      throw error;
  }
};
//Api for Legal Professional Forgot Password
export const resetPasswordUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgotPasswordUser`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const viewAllSafehouses=async()=>{
  try {
    console.log("in fun");
    const response = await axios.post(`${API_BASE_URL}/viewSafehouses`);
    console.log("in fun",response);

    return response;
  } catch (error) {
    console.error('Error fetching legal professional by ID:', error);
    throw error;
  }
}
export const viewAllSafehousesBySuppId=async(id)=>{
  try {
    console.log("in fun");
    const response = await axios.post(`${API_BASE_URL}/viewSafehouseBySupporterId/${id}`);
    console.log("in fun",response);

    return response;
  } catch (error) {
    console.error('Error fetching legal professional by ID:', error);
    throw error;
  }
}
export const searchhouseByName=async(id)=>{
  try {
    console.log("in fun");
    const response = await axios.post(`${API_BASE_URL}/searchhouseByName/${id}`);
    console.log("in fun",response);

    return response;
  } catch (error) {
    console.error('Error fetching legal professional by ID:', error);
    throw error;
  }
}

export const addHouseReqsWithIssue=async(reqs,id)=>{
  try {
    console.log("in fun req",reqs);
    
    const response = await axios.post(`${API_BASE_URL}/addhouseReqwithIssue/${id}`,reqs);
    console.log("in fun",response);

    return response;
  } catch (error) {
    console.error('Error fetching legal professional by ID:', error);
    throw error;
  }
}
export const addHouseReqs=async(reqs)=>{
  try {
    console.log("in fun req",reqs);
    
    const response = await axios.post(`${API_BASE_URL}/addhouseReq`,reqs);
    console.log("in fun",response);

    return response;
  } catch (error) {
    console.error('Error fetching legal professional by ID:', error);
    throw error;
  }
}

// Api for Registering User
export const registerIssue = async (issues) => {
  try {
    const formData = new FormData();
    Object.keys(issues).forEach(key => {
      formData.append(key, issues[key]);
    });

    const response = await axios.post(`${API_BASE_URL}/registerIssue/${issues.userId}`, formData, {
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

//view User Issues pending
export const viewPendingIssues = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewPendingIssues`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

export const getSuggestionById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewIssueById/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

// Api for Registering User
export const addSuggestions = async (suggestions) => {
  try {
  

    const response = await axios.post(`${API_BASE_URL}/registerSuggestion`, suggestions);
console.log(response);
    // Handling responses based on status code
    switch (response.data.status) {
      case 200:
        console.log(response.data.msg); // "Inserted successfully"
        return { success: true, message: response.data.msg, data: response.data.data };
      
      case 500:
        console.log(response.data.msg); // "Data not Inserted"
        return { success: false, message: response.data.msg };
      default:
        console.log('Unexpected response status:', response.data.status);
        return { success: false, message: 'Unexpected error occurred' };
    }
  } catch (error) {
    console.error('Error Registering suggestions', error);
    throw error;
  }
};

export const viewUsersForAdmin = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewUsers`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};



// Api for Approving Counsellor Request by ID
export const activateUserById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/activateUserById/${id}`);
    if (response.data.status === 200) {
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

export const deactivateUserById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/deActivateUserById/${id}`);
    if (response.data.status === 200) {
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



// Api for Registering addBlog
export const addBlog = async (suggestions) => {
  try {
  console.log("in trt");

    const response = await axios.post(`${API_BASE_URL}/addBlog`, suggestions ,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
console.log(response);
    // Handling responses based on status code
    switch (response.data.status) {
      case 200:
        console.log(response.data.msg); // "Inserted successfully"
        return { success: true, message: response.data.msg, data: response.data.data };
      
      case 500:
        console.log(response.data.msg); // "Data not Inserted"
        return { success: false, message: response.data.msg };
      default:
        console.log('Unexpected response status:', response.data.status);
        return { success: false, message: 'Unexpected error occurred' };
    }
  } catch (error) {
    console.error('Error Registering suggestions', error);
    throw error;
  }
};


//Api for View all suggestion by supp id
export const viewMySuggestions = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSuggestionBySuppId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

//Api for View all suggestion by supp id
export const viewMySuggestionById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSuggestionById/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
//Api for View all suggestion by supp id
export const getBlogsBySuppId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewMyBlogsBysupporterId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

export const editBlogsById = async (id,dtats) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/editBlogsById/${id}`,dtats,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("in ",response.data.status);
  return response.data
} catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const viewBlogsById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewBlogsById/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const deleteBlogsById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/deleteBlogsById/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error deleting Blogs List ', error);
    throw error;
  }
};


//Api for View all suggestion by supp id
export const getBlogsByCounsellorId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewMyBlogsByCounsellorId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const getBlogsByLPId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewMyBlogsByLPId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

//Api for View all suggestion by supp id
export const getBlogs= async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewAllBlogs`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};


// Api for Registering addBlog
export const addCase = async (cases,id) => {
  try {
  console.log("in trt",id);

    const response = await axios.post(`${API_BASE_URL}/registerCase/${id}`, cases )
console.log(response);
    // Handling responses based on status code
    switch (response.data.status) {
      case 200:
        console.log(response.data.msg); // "Inserted successfully"
        return { success: true, message: response.data.msg, data: response.data.data };
      
      case 500:
        console.log(response.data.msg); // "Data not Inserted"
        return { success: false, message: response.data.msg };
      default:
        console.log('Unexpected response status:', response.data.status);
        return { success: false, message: 'Unexpected error occurred' };
    }
  } catch (error) {
    console.error('Error Registering Cases', error);
    throw error;
  }
};

export const viewUserIssuesBYUserId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewPendingIssuesByUserId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

export const viewSafehousesReqsBySupporterId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewpendingReqsBySuppId/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching safehouses:', error);
    throw error;
  }
};


// Api for Accepting Supporter Request by Id
export const rejectHouseReqsById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rejectHouseByUserId/${id}`);
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

// Api for Accepting Supporter Request by Id
export const approveHouseReqsById = async (id) => {
  try {
    console.log("in api");
    const response = await axios.post(`${API_BASE_URL}/approveReqByUserId/${id}`);
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


// Api for Accepting Supporter Request by Id
export const deleteIssueById = async (id) => {
  try {
    console.log("in serv",id);
    const response = await axios.post(`${API_BASE_URL}/deleteIssueById/${id}`);
    console.log(response);
    if (response.data.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.msg || 'Deletion failed'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

export const getIssueById = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewIssueById/${id}`);
    console.log("in ",response);
    if (response.data.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const updateIssue = async (id,data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/editIssueById/${id}`,data);
    console.log("in ",response);
    if (response.data.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.msg };
    }
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

export const viewSupportedUserIssuesBYUserId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSupportedIssues/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};


//Api for View all suggestion by supp id
export const viewMySuggestionByIssueId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSuggestionByIssueId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
//Api for send req to LP
export const sendRequesttoLP = async (issueId,advId,userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addReq/${userId}`,{
      issueId:issueId,lpId:advId});
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
//Api for send req to LP
export const fetchLegalReqss = async (issueId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/getLpReqStatusForSugge/${issueId}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
//Api for send req to LP
export const fetchHouseReqss = async (issueId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/getHouseReqStatusForSugge/${issueId}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
//Api for send req to LP
export const fetchCouncReqss = async (issueId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/getCouncellrReqStatusForSugge/${issueId}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
//Api for send req to LP
export const fetchLegalStatusByIssueId = async (issueId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewCaseReqsByIssueId/${issueId}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

//Api for send req to LP
export const sendReqCounc = async (issueId,cid,userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addReqCounc/${userId}`,{
      issueId:issueId,cId:cid});
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const viewCounsellorAppointments = async (id) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/viewCasePendingReqsByCouncId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const viewLPAppointments = async (id) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/viewCasePendingReqsByLpId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

export const acceptLPAppointmentById = async (id) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/approveCaseByUserId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const rejectLPAppointmentById = async (id) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/rejectCaseByUserId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const viewLPAprvdAppointments = async (id) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/viewCaseApprovedReqsByLpId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const viewLPAppointmentById = async (id) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/viewCaseReqById/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const acceptCouncAppointmentById = async (id) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/approveCouncCaseByUserId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const rejectCouncAppointmentById = async (id) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/rejectCouncCaseByUserId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const viewCounsellorAprvdAppointments = async (id) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/viewCaseApprovedReqsByCouncId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

//Api for View all suggestion by supp id
export const viewMySuggestionByIssueIdforCounc = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewSuggestionByIssueId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

export const viewhouseReqsByIssueId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewhouseReqsByIssueId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

export const viewCouncCaseReqsByIssueId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewCouncCaseReqsByIssueId/${id}`);
    console.log("in ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

export const viewLegalReqsByIssueId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewCaseReqsByIssueId/${id}`);
    console.log("in legal ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};
export const viewCaseByissueId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/viewCaseByissueId/${id}`);
    console.log("in legal ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};



// Api for Registering addBlog
export const addPayment = async (suggestions) => {
  try {
  console.log("in trt");

    const response = await axios.post(`${API_BASE_URL}/registerPayment`, suggestions)
console.log(response);
    // Handling responses based on status code
    switch (response.data.status) {
      case 200:
        console.log(response.data.msg); // "Inserted successfully"
        return { success: true, message: response.data.msg, data: response.data.data };
      
      case 500:
        console.log(response.data.msg); // "Data not Inserted"
        return { success: false, message: response.data.msg };
      default:
        console.log('Unexpected response status:', response.data.status);
        return { success: false, message: 'Unexpected error occurred' };
    }
  } catch (error) {
    console.error('Error Registering payment', error);
    throw error;
  }
};

export const viewPaymentsByappId = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewPaymentsByAppId/${id}`);
    console.log("in legal ",response);
    return response.data;
  } catch (error) {
    console.error(' Error fetching Supporter List ', error);
    throw error;
  }
};

export const viewPaymentsForUser = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/viewPaymentsByUserId/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Counsellor Requests for Admin', error);
    throw error;
  }
};

export const addPaymentByUser = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addPaymentsId/${id}`);
    console.log("Payment response:", response);
    return response;
  } catch (error) {
    // Log detailed error information
    console.error('Error adding payment:', error.response || error.message || error);
    throw error;
  }
};

