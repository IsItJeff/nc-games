import { Typography, Button } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User.context";
import { deleteComment,getComments ,addVoteToComment } from "../utils/Api";

const CommentButtons = ({ votes, author, commentId, reviewId, setReloadComments }) => {
    
    const user = useContext(UserContext)
    
    const [voteInc, setVoteInc] = useState(0);

    const removeComment = (commentId,reviewId) => {
        deleteComment(commentId)
            .then((res) => {
                setReloadComments(true)
                return  getComments(reviewId)
            }).catch((err) => {
                console.log(err)
            })
    }

    const voteComment = () => {

        setVoteInc(voteInc => voteInc + 1)
        const voteObj = {
            inc_votes : 1
        }
        
        addVoteToComment(commentId, voteObj)
            .then((res) => {
                setVoteInc(0)
                return getComments(reviewId)
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
    <div>
        <Typography>
            Votes : {votes + voteInc}
        </Typography>
            {author === user.username ?
                <Button onClick={() => {
                    removeComment(commentId, reviewId)
                }}>Remove</Button> :
                <Button onClick={() => {
                voteComment()
            }}>Vote Comment++</Button>}
    </div>)
}
export default CommentButtons;