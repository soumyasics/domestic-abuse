const Issue = require('./IssuesSchema');
const jwt = require('jsonwebtoken');
const multer = require('multer');
// const tf = require('@tensorflow/tfjs-node');
// const toxicity = require('@tensorflow-models/toxicity');


// const model = await toxicity.load(threshold);
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    const uniquePrefix = 'issue-';
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single('file');

// Register a new issue
const registerIssue = async (req, res) => {
  try {
    const { type, description, severity, location, contact } = req.body;

    const newIssue = new Issue({
      type,
      description,
      severity,
      location,
      file: req.file,
      contact,
      userId:req.params.id
    });

    await newIssue.save()
      .then(data => {
        return res.json({
          status: 200,
          msg: 'Inserted successfully',
          data: data,
        });
      })
      .catch(err => {
        return res.json({
          status: 500,
          msg: 'Data not inserted',
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all issues
const viewIssues = (req, res) => {
  Issue.find()
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Data obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No data obtained',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    });
};

// View all issues

const viewPendingIssues = (req, res) => {
  Issue.find({suppStatus:false}).populate('userId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Data obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No data obtained',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    });
};

const viewSupportedIssues = (req, res) => {
  Issue.find({suppStatus:true,userId:req.params.id}).sort({createdAt:-1})
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Data obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No data obtained',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    });
};

const viewPendingIssuesByUserId = (req, res) => {
  Issue.find({userId:req.params.id,suppStatus:false}).sort({createdAt:-1})
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Data obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No data obtained',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    });
};
// Update issue by ID
const editIssueById = async (req, res) => {
  const { type, description, severity, location, dateTime, contact } = req.body;

  await Issue.findByIdAndUpdate(
    { _id: req.params.id },
    {
      type,
      description,
      severity,
      location,
      file: req.file,
      dateTime,
      contact,
    }
  )
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Updated successfully',
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not updated',
        Error: err,
      });
    });
};

// View issue by ID
const viewIssueById = (req, res) => {
  Issue.findById({ _id: req.params.id }).populate('userId')
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};

// Delete issue by ID
const deleteIssueById = (req, res) => {
  Issue.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Deleted successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not deleted',
        Error: err,
      });
    });
};

// JWT authentication middleware
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.json({ status: 401, msg: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.json({ status: 401, msg: 'Unauthorized', err: err });
    }

    req.user = decodedToken.userId;
    next();
  });
};

const fs = require('fs');
const path = require('path');

// Load and parse the JSON data
const getAbuseTypesFromJson = () => {
  const filePath = path.join(__dirname, 'issuesDataset.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Function to retrieve the type from the description
const getTypeFromDescription = (req,res) => {
  console.log("req",req.body.description);
  const issuesData = getAbuseTypesFromJson();
  const matchedTypes = [];

  for (const [type, descriptions] of Object.entries(issuesData)) {
    if (descriptions.some(desc => req.body.description.includes(desc))) {
      matchedTypes.push(type);
    }
  }

  console.log(matchedTypes);
};

const diseasesData = require('./issuesDataset.json'); 

// const getDiseaseBySymptoms = (req, res) => {
//     try {
// console.log(req.body.description);
//        const  symptoms  = req.body.description;

//         if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
//             return res.status(400).json({ message: 'Please provide an array of symptoms.' });
//         }

// //         // Initialize a set to avoid duplicate disease names
//         const diseaseSet = new Set();

// //         // Iterate over each symptom
//         symptoms.forEach(symptom => {
// //             // Iterate over each disease in the diseasesData
//             for (const [disease, diseaseSymptoms] of Object.entries(diseasesData)) {
//                 if ((diseaseSymptoms).includes(symptom)) {
//                     diseaseSet.add(disease);
//                 }
//             }
//         });

// //         // Convert the set to an array
//         const diseases = Array.from(diseaseSet);
// console.log(diseases);
//         res.status(200).json({
//             status: 200,
//             message: 'Diseases retrieved successfully',
//             data: diseases,
//         });
//     } catch (error) {
//         console.error('Error processing symptoms:', error);
//         res.status(500).json({
//             message: 'Error processing symptoms',
//             error: error.message,
//         });
//     }
// };

const getDiseaseBySymptoms = (req, res) => {
  try {
      console.log(req.body.description);
      const symptoms = req.body.description;

      if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
          return res.status(400).json({ message: 'Please provide an array of symptoms.' });
      }

      // Initialize a set to avoid duplicate disease names
      const diseaseSet = new Set();

      // Normalize symptoms
      const normalizedSymptoms = symptoms.map(symptom => symptom.toLowerCase().trim());

      // Function to check if a symptom exactly matches any disease symptom
      const isExactMatch = (symptom, diseaseSymptoms) => {
          const normalizedSymptom = symptom.toLowerCase().trim();
          // Check if the entire normalized symptom is found as a complete match
          return diseaseSymptoms.some(diseaseSymptom => {
              const normalizedDiseaseSymptom = diseaseSymptom.toLowerCase().trim();
              return normalizedDiseaseSymptom === normalizedSymptom;
          });
      };

      // Flag to check if any match is found
      let matchFound = false;

      // Iterate over each symptom
      normalizedSymptoms.forEach(symptom => {
          // Iterate over each disease in the diseasesData
          for (const [disease, diseaseSymptoms] of Object.entries(diseasesData)) {
              // Normalize disease symptoms
              const normalizedDiseaseSymptoms = diseaseSymptoms.map(s => s.toLowerCase().trim());

              // Check if the symptom exactly matches any of the disease symptoms
              if (isExactMatch(symptom, normalizedDiseaseSymptoms)) {
                  diseaseSet.add(disease);
                  matchFound = true;
              }
          }
      });

      // Convert the set to an array
      const diseases = Array.from(diseaseSet);

      if (!matchFound) {
          // Return a message if no matching symptoms are found
          return res.status(200).json({
              status: 200,
              message: 'No diseases found matching the provided symptoms.',
              data: [],
          });
      }

      console.log(diseases);
      res.status(200).json({
          status: 200,
          message: 'Diseases retrieved successfully',
          data: diseases,
      });
  } catch (error) {
      console.error('Error processing symptoms:', error);
      res.status(500).json({
          message: 'Error processing symptoms',
          error: error.message,
      });
  }
};


// // Initialize model and handle its loading state
// let modelPromise;
// const threshold = 0.9;


// function loadModel() {
//   if (!modelPromise) {
//     modelPromise = toxicity.load(threshold);
//   }
//   return modelPromise;
// }

// // Function to classify text
// async function classifyText(text) {
//   const model = await loadModel(); // Ensure the model is loaded
//   const predictions = await model.classify(text);
//   console.log(predictions);

//   const abuseTypes = predictions.map(prediction => ({
//     label: prediction.label,
//     match: prediction.results.some(result => result.match)
//   }));

//   return abuseTypes;
// }

// // Express route handler
// const getML = async (req, res) => {
//   try {
//     const description = "I was physically assaulted yesterday.";
//     const abuseTypes = await classifyText(description);
//     console.log('Detected abuse types:', abuseTypes);
//     res.json({ detectedAbuseTypes: abuseTypes });
//   } catch (err) {
//     console.error("Error classifying text:", err);
//     res.status(500).send("Internal Server Error");
//   }
// };


module.exports = {
  registerIssue,
  viewIssues,
  editIssueById,
  viewIssueById,
  deleteIssueById,
  upload,
  requireAuth,
  viewPendingIssues,
  viewPendingIssuesByUserId,
  viewSupportedIssues,
  getTypeFromDescription,
  getDiseaseBySymptoms,
  // getML
};
