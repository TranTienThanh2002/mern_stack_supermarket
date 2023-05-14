import Comment from "../models/Comment.js";
import Products from "../models/Products.js";
import Reply from "../models/Reply.js";

export const createComment = async (req, res, next) => {
  const { productId, ...other } = req.body;
  try {
    const newComment = await Comment(other);
    const savedComment = await newComment.save();
    try {
      await Products.findByIdAndUpdate(
        productId,
        {
          $push: { comments: savedComment._id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      console.log("push id comment to product: " + error);
      next(error);
    }
    res.status(200).json(savedComment);
  } catch (error) {
    console.log("create comment error: " + error);
    next(error);
  }
};
export const deleteCommentInProduct = async (req, res, next) => {
  const commentId = req.params.id;
  const productId = req.body.productId;
  try {
    await Products.findByIdAndUpdate(
      productId,
      {
        $pull: { comments: commentId },
      },
      { new: true }
    );
    res.status(200).json("Delete successful");
  } catch (error) {
    next("delete Comment" + error);
  }
};
export const deleteReplyInComment = async (req, res, next) => {
  const replyId = req.params.id;
  const commentId = req.body.commentId;
  try {
    const saveReply = await Reply.findById(replyId);
    const replyNew = {
      id: saveReply._id,
      comment: saveReply.comment,
      user: saveReply.user,
    };
    await Comment.findByIdAndUpdate(
      commentId,
      {
        $pull: { reply: JSON.stringify(replyNew) },
      },
      { new: true }
    );
    res.status(200).json("Delete successful");
  } catch (error) {
    next("delete reply: " + error);
  }
};
export const deleteComment = async (req, res, next) => {
  const commentId = req.params.id;
  try {
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json("Delete successful");
  } catch (error) {
    next("delete Comment" + error);
  }
};
export const deleteReply = async (req, res, next) => {
  const commentId = req.params.id;
  try {
    await Reply.findByIdAndDelete(commentId);

    res.status(200).json("Delete successful");
  } catch (error) {
    next("delete Reply" + error);
  }
};

export const updateComment = async (req, res, next) => {
  const { commentId, ...other } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: other,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    console.log("update comment ", error);
    next(error);
  }
};
export const updateReply = async (req, res, next) => {
  const { commentId, ...other } = req.body;
  try {
    const updatedComment = await Reply.findByIdAndUpdate(
      commentId,
      {
        $set: other,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    console.log("update comment ", error);
    next(error);
  }
};
export const replyComment = async (req, res, next) => {
  const { commentId, ...other } = req.body;

  try {
    const newReply = await Reply(other);
    const saveReply = await newReply.save();
    const replyNew = {
      id: saveReply._id,
      comment: saveReply.comment,
      user: saveReply.user,
    };
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: { reply: JSON.stringify(replyNew) },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    console.log("update comment ", error);
    next(error);
  }
};

export const getAllCommentOfProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Products.findById(productId);
    const listComment = await Comment.find({ _id: { $in: product.comments } });
    res.status(200).json(listComment);
  } catch (error) {
    console.log("get all comment of product", error);
    next(error);
  }
};
export const getPageCommentOfProduct = async (req, res, next) => {
  const productId = req.params.productId;
  let { page, limit } = req.body;
  try {
    const product = await Products.findById(productId);
    const listComment = await Comment.find({ _id: { $in: product.comments } })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(listComment);
  } catch (error) {
    console.log("get page comment of product", error);
    next(error);
  }
};

export const getRatingProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const rating = req.params.rating;
  try {
    const product = await Products.findById(productId);
    const listComment = await Comment.find({
      _id: { $in: product.comments },
      rating: rating,
    });
    res.status(200).json(listComment);
  } catch (error) {
    console.log("get all comment of product", error);
    next(error);
  }
};
