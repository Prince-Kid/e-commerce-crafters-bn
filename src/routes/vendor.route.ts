import express from "express"
const route = express.Router()
import { allRequests, allStores, deletingVendor, editVendor, registerVendor } from "../controllers/vendor.controller"
import { viewProducts } from "../controllers/product.controller"
import { VerifyAccessToken } from "../middleware/verfiyToken"
import { selectFeedback, selectReview } from "../controllers/review.controller"

route.get('/allstores', allStores)
route.get('/allrequests', allRequests)
route.post('/requestVendor', registerVendor)
route.delete('/deleteVendor/:id',VerifyAccessToken,deletingVendor)
route.get('/vendorProduct/:id', viewProducts)
route.patch('/updateVendor/:id', editVendor)
route.get('/select-review/:id', selectReview)
route.get('/select-feedback/:id', selectFeedback)

export default route
