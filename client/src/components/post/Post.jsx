import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext,useState,useEffect} from "react";
import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


export default function Post({ post }) {
    const [like,setLike] = useState(post.likes.length)   
    const [isLiked,setIsLiked] = useState(false)
    const [user,setUser] = useState({})  
    const PF = process.env.REACT_APP_PUBLIC_URL
    const { user:currentUser } = useContext(AuthContext)

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes]);

    useEffect(()=>{
        const fetchUser = async()=>{
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data)
        };
        fetchUser();
      },[post.userId])
        const likeHandler =()=>{
        try {
         axios.put("/posts/"+post._id+"/like",{userId:currentUser._id});

        } catch (error) {}
        setLike(isLiked ? like-1 : like+1 )
        setIsLiked(!isLiked)
    }

   

  return (
    <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/${user.username}`}> <img className="postProfileImg" srcSet={user.profilePicture ? PF+user.profilePicture : PF+"person/avatar.png" } alt=""/></Link>
                       
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>

                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.desc}
                    </span>
                    <img srcSet={PF+post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" srcSet={`${PF}like.png`} onClick={likeHandler} alt="" />
                        <img className="likeIcon" srcSet={`${PF}heart.png`}onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} personnes ont aimé</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Commentaires</span>
                    </div>
                </div>
            </div>
    </div>
  )
}
