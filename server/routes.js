const router = require('express').Router()
const supporter = require('./Supporter/supporterController')
const safehouse = require('./SafeHouse/houseController')
const Counsellor = require('./Counsellor/counsellorController')
const LegalProfessional = require('./LegalProfessional/legalProfessionalController')
const userController = require('./Users/userController')
const issue=require('./UserIssues/IssueController')
const suggestionController=require('./Suggestions/suggestionController')
const blog=require('./Blogs/blogController')

//suppoerter routes
router.post('/registerSupporters', supporter.upload, supporter.registerSupporters);
router.post('/viewSupportersById/:id', supporter.viewSupportersById);
router.post('/editSupportersById/:id', supporter.upload, supporter.editSupportersById);
router.post('/forgotPasswordSupporter', supporter.forgotPassword);
router.post('/viewSupporters', supporter.viewSupporters);
router.post('/resetPasswordloginSupporter/:id', supporter.resetPassword);
router.post('/loginSupporter', supporter.login);
router.post('/requireAuthSupporter', supporter.requireAuth);
router.post('/viewSupporterReqsForAdmin', supporter.viewSupporterReqsForAdmin);
router.post('/approveSupportersById/:id', supporter.approveSupportersById);
router.post('/rejectSupportersById/:id', supporter.rejectSupportersById);
router.post('/removeSupportersById/:id', supporter.removeSupportersById);
router.post('/activateSupportersById/:id', supporter.activateSupportersById);

//safehouse routes
router.post('/registerSafehouse', safehouse.upload, safehouse.registerSafehouse);
router.post('/viewSafehouseById/:id', safehouse.viewSafehouseById);
router.post('/editSafehouseById/:id', safehouse.upload, safehouse.editSafehouseById);
router.post('/viewSafehouses', safehouse.viewSafehouses);
router.post('/activateSafehouseById/:id', safehouse.activateSafehouseById);
router.post('/approveSafehouseById/:id', safehouse.approveSafehouseById);
router.post('/deActivateSafehouseById/:id', safehouse.deActivateSafehouseById);
router.post('/rejectSafehouseById/:id', safehouse.rejectSafehouseById);
router.post('/viewSafehouseBySupporterId/:id', safehouse.viewSafehouseBySupporterId);
router.post('/viewSafehouseReqsForAdmin', safehouse.viewSafehouseReqsForAdmin);


//Counsellor routes
router.post('/registerCounsellors', Counsellor.registerCounsellors);
router.post('/viewCounsellorsById/:id', Counsellor.viewCounsellorsById);
router.post('/editCounsellorsById/:id', Counsellor.editCounsellorsById);
router.post('/forgotPasswordCounsellor', Counsellor.forgotPassword);
router.post('/viewCounsellors', Counsellor.viewCounsellors);
router.post('/resetPasswordloginCounsellor/:id', Counsellor.resetPassword);
router.post('/loginCounsellor', Counsellor.login);
router.post('/viewCounsellorReqsForAdmin', Counsellor.viewCounsellorReqsForAdmin);
router.post('/approveCounsellorsById/:id', Counsellor.approveCounsellorsById);
router.post('/rejectCounsellorsById/:id', Counsellor.rejectCounsellorsById);
router.post('/removeCounsellorsById/:id', Counsellor.removeCounsellorsById);
router.post('/activateCounsellorsById/:id', Counsellor.activateCounsellorsById);



//Legal Professional routes
router.post('/registerLegalProfessional', LegalProfessional.upload, LegalProfessional.registerLegalProfessional);
router.post('/viewLegalProfessionalById/:id', LegalProfessional.viewLegalProfessionalById);
router.post('/editLegalProfessionalById/:id', LegalProfessional.uploadSingle, LegalProfessional.editLegalProfessionalById);
router.post('/forgotPasswordLegalProfessional', LegalProfessional.forgotPassword);
router.post('/viewLegalProfessionals', LegalProfessional.viewLegalProfessionals);
router.post('/resetPasswordloginLegalProfessional/:id', LegalProfessional.resetPassword);
router.post('/loginLegalProfessional', LegalProfessional.login);
router.post('/viewLegalProfessionalReqsForAdmin', LegalProfessional.viewLegalProfessionalReqsForAdmin);
router.post('/approveLegalProfessionalById/:id', LegalProfessional.approveLegalProfessionalById);
router.post('/deleteLegalProfessionalById/:id', LegalProfessional.deleteLegalProfessionalById);
router.post('/deActivateLegalProfessionalById/:id', LegalProfessional.deActivateLegalProfessionalById);
router.post('/activateLegalProfessionalById/:id', LegalProfessional.activateLegalProfessionalById);




//User
// User routes
router.post('/registerUser', userController.upload, userController.registerUser);
router.post('/viewUserById/:id', userController.viewUserById);
router.post('/editUserById/:id', userController.upload, userController.editUserById);
router.post('/forgotPasswordUser', userController.forgotPassword);
router.post('/viewUsers', userController.viewUsers);
router.post('/resetPasswordLoginUser/:id', userController.resetPassword);
router.post('/loginUser', userController.login);
router.post('/requireAuthUser', userController.requireAuth);
router.post('/deActivateUserById/:id', userController.deActivateUserById);
router.post('/activateUserById/:id', userController.activateUserById);



//Issues
router.post('/registerIssue/:id', issue.upload, issue.registerIssue);
router.post('/viewIssueById/:id', issue.viewIssueById);
router.post('/editIssueById/:id', issue.upload, issue.editIssueById);
router.post('/deleteIssueById/:id', issue.deleteIssueById);
router.get('/viewIssues', issue.viewIssues);
router.post('/viewPendingIssues', issue.viewPendingIssues);


//suggestions


router.post('/registerSuggestion', suggestionController.registerSuggestion);
router.get('/viewSuggestions', suggestionController.viewSuggestions);
router.put('/editSuggestionById/:id', suggestionController.editSuggestionById);
router.get('/viewSuggestionById/:id', suggestionController.viewSuggestionById);
router.delete('/deleteSuggestionById/:id', suggestionController.deleteSuggestionById);
router.delete('/viewSuggestionBySuppId/:id', suggestionController.viewSuggestionBySuppId);




//blogs
//blogs
router.post('/addBlog/:id',blog.upload,blog.addBlog)
router.post('/viewBlogsById/:id',blog.viewBlogsById)
router.post('/editBlogsById/:id',blog.upload,blog.editBlogsById)
router.post('/deleteBlogsById/:id',blog.deleteBlogsById)
router.post('/viewAllBlogs',blog.viewAllBlogs)
router.post('/viewMyBlogsBysupporterId/:id',blog.viewMyBlogsBysupporterId)

module.exports = router