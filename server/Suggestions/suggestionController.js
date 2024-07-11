const IssuesSchema = require('../UserIssues/IssuesSchema');
const Suggestion = require('./suggestionSchema');

// Register a new suggestion
const registerSuggestion = async (req, res) => {
    try {
        const { issueId, supporterId, sug1, sug2, sug3, action } = req.body;
        const userid = await IssuesSchema.findById(issueId)
        const newSuggestion = new Suggestion({
            userId: userid.userId,
            supporterId,
            issueId,
            sug1,
            sug2,
            sug3,
            action
        });

        await newSuggestion.save()
            .then(data => {
                console.log("Suggestion added", data);
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                console.log("Suggestion not added", err);
                return res.json({
                    status: 500,
                    msg: "Data not inserted",
                    data: err
                });
            });

        const upd = await IssuesSchema.findByIdAndUpdate({ _id: req.body.issueId }, { suppStatus: true })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View all suggestions
const viewSuggestions = (req, res) => {
    Suggestion.find({})
        .populate('userId')
        .populate('supporterId')
        .populate('issueId')
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No data obtained"
                });
            }
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// Update suggestion by ID
const editSuggestionById = async (req, res) => {
    const { sug1, sug2, sug3, action } = req.body;

    await Suggestion.findByIdAndUpdate(req.params.id, {
        sug1,
        sug2,
        sug3,
        action
    })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Updated successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not updated",
                Error: err
            });
        });
};

// View suggestion by ID
const viewSuggestionById = (req, res) => {
    Suggestion.findById(req.params.id)
        .populate('userId')
        .populate('supporterId')
        .populate('issueId')

        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No data obtained",
                Error: err
            });
        });
};


// View suggestion by ID
const viewSuggestionBySuppId = (req, res) => {
    Suggestion.find({ supporterId: req.params.id })
        .populate('userId')
        .populate('supporterId')
        .populate('issueId')

        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No data obtained",
                Error: err
            });
        });
};


// Delete suggestion by ID
const deleteSuggestionById = (req, res) => {
    Suggestion.findByIdAndDelete(req.params.id)
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Removed successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No data obtained",
                Error: err
            });
        });
};

module.exports = {
    registerSuggestion,
    viewSuggestions,
    editSuggestionById,
    viewSuggestionById,
    deleteSuggestionById,
    viewSuggestionBySuppId
};
