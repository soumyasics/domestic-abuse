const router=require('express').Router()
const supporter=require('./Supporter/supporterController')

//citizen routes
router.post('/registerSupporters',supporter.upload, supporter.registerSupporters);
router.post('/viewSupportersById/:id', supporter.viewSupportersById);
router.post('/editSupportersById/:id', supporter.editSupportersById);
router.post('/forgotPasswordSupporter', supporter.forgotPassword);
router.post('/viewSupporters', supporter.viewSupporters); 
router.post('/deleteSupportersById/:id', supporter.deleteSupportersById);
router.post('/resetPassword/:id', supporter.resetPassword);
router.post('/login', supporter.login);
router.post('/requireAuthSupporter', supporter.requireAuth);


module.exports=router