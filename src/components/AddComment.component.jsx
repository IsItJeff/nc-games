import {Button,TextField } from "@mui/material"
import { getComments, postComment} from "../utils/Api"
import { useState, useContext } from "react"
import { UserContext } from "../contexts/User.context"

const AddComment = ({ reviewId , setUsersComments}) => {
    
    const user = useContext(UserContext);

    const [eventComment, setEventComment] = useState("");
    const sendComment = (reviewId, commentBody) => {
        const commentObj = {
            username: user.username,
            body: commentBody
        }

        postComment(reviewId, commentObj)
            .then((res) => {
                return  getComments(reviewId)
            }).then((res) => {
                setUsersComments(res)
            }).catch((err) => {
                console.log(err)
        })
    }

    return (
        <div>
            <TextField onChange={(event)=>{setEventComment(event.target.value)}} label="Comment" color="secondary" multiline rows={4}  focused />
            <Button variant="outlined" onClick={()=>{sendComment(reviewId, eventComment)}}>Submit</Button>
        </div>
    )
}

export default AddComment;