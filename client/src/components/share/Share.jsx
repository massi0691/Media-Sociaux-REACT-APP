import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import { PermMedia, Label,Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useRef } from "react";
import axios from "axios";
export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_URL
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

   const submitHandler = async (e)=>{
    e.preventDefault();
    const newPost = {
        userId:user._id,
        desc:desc.current.value,    
    }
    if(file){
        const data = new FormData();
        const fileName = "post/"+ Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newPost.img = fileName;
        try{
            await axios.post("/upload", data);
            window.location.reload();
        }catch(error)
        {

        }

    }

    try {
    await axios.post("/posts",newPost)
    } catch (error) {}
   }


  return (
    <div className="share">
          <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/avatar.png"  } className="shareProfileImg" alt=""/>
                <input placeholder={`À quoi penses-tu ${user.username} ?`} className="shareInput" ref={desc} />
            </div>
            <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={()=>setFile()}/>
                    </div>
                )}

            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file"  className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo ou Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,jpeg,jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>  <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Map</span>
                    </div>  <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenRod" className="shareIcon"/>
                        <span className="shareOptionText">Sentiments</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Partager</button>
            </form>

          </div>

    </div>
  )
}
