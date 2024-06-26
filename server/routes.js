const router = require('express').Router()
const supporter = require('./Supporter/supporterController')
const safehouse=require('./SafeHouse/houseController')

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

router.post('/viewSafehouseReqsForAdmin/:id', safehouse.viewSafehouseReqsForAdmin);

module.exports = router