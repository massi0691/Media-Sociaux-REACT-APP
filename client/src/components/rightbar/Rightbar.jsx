import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [friends, setFriends] = useState([]);
  const {user:currentUser, dispatch}  = useContext(AuthContext);
  const [followed, setFollowed] = useState( currentUser.followings.includes(user?.id) );



  useEffect(()=>{
    const getFriends = async () =>{
      try {
        const friendList = await axios.get("/users/friends/"+user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  },[user])

  const handleClick = async ()=>{
    try {
      if(followed){
        await axios.put("/users/"+user._id+"/unfollow", {userId:currentUser._id});
        dispatch({type:"UNFOLLOW", payload:user._id})
      }else{
        await axios.put("/users/"+user._id+"/follow", {userId:currentUser._id})
        dispatch({type:"FOLLOW", payload:user._id})

      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  }


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
            <img src={PF+"gift.png"} alt="" className="birthdayImg"/>
            <span className="birthdayText">
                 <b>Sofiane Ait salah</b> et 3 <b>autres amis</b> ont l'anniversaire aujourd'hui
            </span>
          </div>
          <img className="rightBarAd" src={PF+"ad.png"}alt=""/>
          <h4 className="rightbarTitle">Amis onligne</h4>
          <ul className="rightbarFriendList">
           {Users.map(u=>(
            <Online key={u.id} user={u}/>
           ))}
          </ul>
      
      
      </>
    )
  }

  const ProfileRightbar=()=> {
    return(
      <>
      {user.username !==currentUser.username &&(
       <button className="rightFollowButton" onClick={ handleClick }> 
       {followed ? "Ne pas suivre": "suivre"}
       {followed ? <Remove/>: <Add/> }
       </button>
      )}
      <h4 className="rightbarTitle">Vos informations</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Ville:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">De:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
          <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relations:</span>
          <span className="rightbarInfoValue">{user.relation ===1 ? "célibataire": user.relation ===2 ? "Marié" : ""}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">Amis</h4>
      <div className="rightbarFollowings">
          {friends.map(friend=>(
            <Link to={"/"+friend.username}
            style={{textDecoration:"none"}}
            >  
              <div className="rightbarFollowing">
                <img src= {friend.profilePicture ? PF+friend.profilePicture : PF+"person/avatar.png" }  alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
         
          ))}
      </div>

      
      </>
    )
  }


  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
        { user ? <ProfileRightbar/> :  <HomeRightbar/>}
        </div>

    </div>
  )
}
