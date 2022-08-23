import'./closeFriend.css';

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_URL
  return (
    <div> 
        <li className="sidbarFriend">
            <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    </div>
  )
}
