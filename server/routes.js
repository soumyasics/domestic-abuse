const router = require('express').Router()
const supporter = require('./Supporter/supporterController')
const safehouse = require('./SafeHouse/houseController')
const Counsellor = require('./Counsellor/counsellorController')
const LegalProfessional = require('./LegalProfessional/legalProfessionalController')
const userController = require('./Users/userController')
const issue=require('./UserIssues/IssueController')
const suggestionController=require('./Suggestions/suggestionController')
const blog=require('./Blogs/blogController')
const cases=require('./Cases/caseController')
const casReqs=require('./LP-UserRequests/reqController')
const houseReqs=require('./SafeHouse/HouseReqs/houseReqController')
const councReqs=require('./Councellor-UserRequests/reqController')
const payments = require('./Payments/paymentController')
const chat = require('./Chat/chatController')

//supporter routes
router.post('/registerSupporters', supporter.upload, supporter.registerSupporters);
router.post('/viewSupportersById/:id', supporter.viewSupportersById);
router.post('/editSupportersById/:id', supporter.upload, supporter.editSupportersById);
router.post('/forgotPasswordSupporter', supporter.forgotPassword);
router.post('/viewSupporters', supporter.viewSupporters);
router.post('/resetPasswordSupporter/:id', supporter.resetPassword);
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
router.post('/searchhouseByName/:landmark', safehouse.searchhouseByName);
router.post('/getHouseReqStatusForSugge/:id', safehouse.getHouseReqStatusForSugge);


//Counsellor routes
router.post('/registerCounsellors', Counsellor.registerCounsellors);
router.post('/viewCounsellorsById/:id', Counsellor.viewCounsellorsById);
router.post('/editCounsellorsById/:id', Counsellor.editCounsellorsById);
router.post('/forgotPasswordCounsellor', Counsellor.forgotPassword);
router.post('/viewCounsellors', Counsellor.viewCounsellors);
router.post('/resetPasswordCounsellor/:id', Counsellor.resetPassword);
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
router.post('/resetPassword/:id', LegalProfessional.resetPassword);




//User
// User routes
router.post('/registerUser', userController.upload, userController.registerUser);
router.post('/viewUserById/:id', userController.viewUserById);
router.post('/editUserById/:id', userController.upload, userController.editUserById);
router.post('/forgotPasswordUser', userController.forgotPassword);
router.post('/viewUsers', userController.viewUsers);
router.post('/resetPasswordUser/:id', userController.resetPassword);
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
router.post('/viewPendingIssuesByUserId/:id', issue.viewPendingIssuesByUserId);
router.post('/viewSupportedIssues/:id', issue.viewSupportedIssues);
router.post('/getTypeFromDescription', issue.getDiseaseBySymptoms);
// router.get('/getML', issue.getML);


//suggestions


router.post('/registerSuggestion', suggestionController.registerSuggestion);
router.post('/viewSuggestions', suggestionController.viewSuggestions);
router.post('/editSuggestionById/:id', suggestionController.editSuggestionById);
router.post('/viewSuggestionById/:id', suggestionController.viewSuggestionById);
router.post('/deleteSuggestionById/:id', suggestionController.deleteSuggestionById);
router.post('/viewSuggestionBySuppId/:id', suggestionController.viewSuggestionBySuppId);
router.post('/viewSuggestionByIssueId/:id', suggestionController.viewSuggestionByIssueId);




//blogs
router.post('/addBlog',blog.upload,blog.addBlog)
router.post('/viewBlogsById/:id',blog.viewBlogsById)
router.post('/editBlogsById/:id',blog.upload,blog.editBlogsById)
router.post('/deleteBlogsById/:id',blog.deleteBlogsById)
router.post('/viewAllBlogs',blog.viewAllBlogs)
router.post('/viewMyBlogsBysupporterId/:id',blog.viewMyBlogsBysupporterId)
router.post('/viewMyBlogsByCounsellorId/:id',blog.viewMyBlogsByCounsellorId)
router.post('/viewMyBlogsByLPId/:id',blog.viewMyBlogsByLPId)


//cases
router.post('/registerCase/:id',  cases.registerCase);
router.post('/viewCaseById/:id', cases.viewCaseById);
router.post('/editCaseById/:id', cases.editCaseById);
router.post('/deleteCaseById/:id', cases.deleteCaseById);
router.get('/viewCaseByUserId/:id', cases.viewCaseByUserId);
router.post('/viewPendingCases', cases.viewPendingCases);
router.get('/viewCaseByLPId/:id', cases.viewCaseByLPId);
router.get('/viewCases', cases.viewCases);
router.get('/viewCaseByissueId/:id', cases.viewCaseByissueId);
router.get('/viewUniqueIssuesByUserId/:id', cases.viewUniqueIssuesByUserId);
router.get('/viewCaseByissueIdNew/:id', cases.viewCaseByissueIdNew);
router.get('/viewOneCaseByissueId/:id', cases.viewOneCaseByissueId);


router.post('/addReq/:id',casReqs.addReq);
router.post('/viewCaseApprovedReqsByLpId/:id',casReqs.viewCaseApprovedReqsByLpId);
router.post('/viewCaseReqById/:id',casReqs.viewCaseReqById);
router.post('/viewCasePendingReqsByLpId/:id',casReqs.viewCasePendingReqsByLpId);
router.post('/approveCaseByUserId/:id',casReqs.approveCaseByUserId);
router.post('/rejectCaseByUserId/:id',casReqs.rejectCaseByUserId);
router.post('/getLpReqStatusForSugge/:id',casReqs.getLpReqStatusForSugge);

router.post('/viewCaseReqsByUserId/:id',casReqs.viewCaseReqsByUserId);
router.post('/viewCaseReqsByIssueId/:id',casReqs.viewCaseReqsByIssueId);

//House Requests
router.post('/addhouseReq',houseReqs.addReq);
router.post('/addhouseReqwithIssue/:id',houseReqs.addHouseReqsWithIssue);
router.post('/viewHouseReqById/:id',houseReqs.viewHouseReqById);
router.post('/viewpendingReqsBySuppId/:id',houseReqs.viewpendingReqsBySuppId);
router.post('/approveReqByUserId/:id',houseReqs.approveReqByUserId);
router.post('/rejectHouseByUserId/:id',houseReqs.rejectHouseByUserId);
router.post('/viewHouseReqsByUserId/:id',houseReqs.viewhouseReqsByUserId);
router.post('/viewhouseReqsByIssueId/:id',houseReqs.viewhouseReqsByIssueId);
router.post('/viewapproveReqBySuppId/:id',houseReqs.viewapproveReqBySuppId);


//councellor req
router.post('/addReqCounc/:id',councReqs.addReq);
router.post('/viewCaseApprovedReqsByCouncId/:id',councReqs.viewCaseApprovedReqsByLpId);
router.post('/viewCouncCaseReqById/:id',councReqs.viewCaseReqById);
router.post('/viewCasePendingReqsByCouncId/:id',councReqs.viewCasePendingReqsByLpId);
router.post('/approveCouncCaseByUserId/:id',councReqs.approveCaseByUserId);
router.post('/rejectCouncCaseByUserId/:id',councReqs.rejectCaseByUserId);
router.post('/getCouncReqStatusForSugge/:id',councReqs.getCouncellrReqStatusForSugge);

router.post('/viewCouncCaseReqsByUserId/:id',councReqs.viewCaseReqsByUserId);
router.post('/viewCouncCaseReqsByIssueId/:id',councReqs.viewCaseReqsByIssueId);
router.post('/viewCouncCaseReqsByIssueId1/:id',councReqs.viewCaseReqsByIssueId1);



router.post('/registerPayment',payments.registerPayment);
router.post('/viewPayments',payments.viewPayments);
router.post('/viewPaymentsByUserId/:id',payments.viewPaymentsByUserId);
router.post('/viewPaymentsByLPId/:id',payments.viewPaymentsByLPId);
router.post('/viewPaymentsByAppId/:id',payments.viewPaymentsByAppId);
router.post('/addPaymentsId/:id',payments.addPaymentsId);
router.post('/viewPaymentsById/:id',payments.viewPaymentsById);

//chat
router.post('/chatting',chat.chatting);
router.post('/viewChatBetweenUserAndAdv',chat.viewChatBetweenUserAndAdv);
router.post('/viewChatWithIssueId/:id',chat.viewChatWithIssueId);
router.post('/viewChatBetweenUserAndSupp',chat.viewChatBetweenUserAndSupp);

module.exports = router