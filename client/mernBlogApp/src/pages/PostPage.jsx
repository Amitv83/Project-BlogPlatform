import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

function PostPage() {
  const [postInfo, setPostInfo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`, {
      method: "GET",
    }).then((response) => {
      response.json().then((post) => {
        setPostInfo(post);
      });
    });
  }, []);
  if (!postInfo) return "No post found";
  console.log(postInfo);

  return (
    <div className="post-page">
      <div>
        <img src={postInfo.cover} alt="" />
        <h1>{postInfo.title}</h1>
        <time>
          {postInfo?.createdAt
            ? formatISO9075(new Date(postInfo.createdAt))
            : "Loading..."}
        </time>
        <p>By Amit Kumar Vishwakarma</p>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
}

export default PostPage;
