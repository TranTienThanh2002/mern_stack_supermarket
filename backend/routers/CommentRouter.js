import express from 'express';
import { createComment, deleteComment, deleteCommentInProduct, deleteReply, deleteReplyInComment, getAllCommentOfProduct, getPageCommentOfProduct, getRatingProduct, replyComment, updateComment, updateReply } from '../controllers/CommentController.js';
const CommentRouter = express.Router();
//create
CommentRouter.post('/', createComment);
//update
CommentRouter.put('/updateComment', updateComment);
//update reply
CommentRouter.put('/updateReply', updateReply);
//reply comment
CommentRouter.put('/replyComment', replyComment);
//delete comment
CommentRouter.delete('/deleteComment/:id', deleteComment);
//delete comment in product
CommentRouter.post('/deleteCommentInProduct/:id', deleteCommentInProduct);
//delete reply
CommentRouter.delete('/deleteReply/:id', deleteReply);
//delete reply in comment
CommentRouter.post('/deleteReplyInComment/:id', deleteReplyInComment);
//get all comment of product
CommentRouter.get('/getAllComment/:productId', getAllCommentOfProduct)
//get page comment of product
CommentRouter.post('/getPageComment/:productId', getPageCommentOfProduct)
// //get all reply comment of product
// CommentRouter.get('/getAllReplyComment/:productId', getAllCommentOfProduct)
//get rating all comment of product
CommentRouter.get('/getRatingComment/:productId/:rating', getRatingProduct)
export default CommentRouter;