const router=require('express').Router()
const supporter=require('./Supporter/supporterController')

//citizen routes
router.post('/registerSupporters',supporter.upload, supporter.registerSupporters);
router.post('/viewSupportersById/:id', supporter.viewSupportersById);
router.post('/editSupportersById/:id',supporter.upload, supporter.editSupportersById);
router.post('/forgotPasswordSupporter', supporter.forgotPassword);
router.post('/viewSupporters', supporter.viewSupporters); 
router.post('/resetPasswordloginSupporter/:id', supporter.resetPassword);
router.post('/loginSupporter', supporter.login);
router.post('/requireAuthSupporter', supporter.requireAuth);
router.post('/viewSupporterReqsForAdmin', supporter.viewSupporterReqsForAdmin);
router.post('/approveSupportersById/:id', supporter.approveSupportersById);
router.post('/rejectSupportersById/:id', supporter.rejectSupportersById);
router.post('/removeSupportersById/:id', supporter.removeSupportersById);


module.exports=router