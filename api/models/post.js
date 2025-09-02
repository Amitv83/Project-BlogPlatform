import mongoose from "mongoose";

const {Schema,model}= mongoose;
const PostSchema = new Schema({
title:String,
summary:String,
content:String,
cover:String,

},{
    timestamps:true,
});

const Post= model('Post',PostSchema);

export default Post;