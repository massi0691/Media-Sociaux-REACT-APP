import './online.css';
const PF = process.env.REACT_APP_PUBLIC_URL

export default function Online({user}) {
  return (
    <div>
         <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img src={PF+user.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">{user.username}</span>           
             </li>
    </div>
  )
}
