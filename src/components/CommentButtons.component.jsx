import { Grid,Typography, Button } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User.context";
import { deleteComment, getComments, addVoteToComment } from "../utils/Api";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CommentButtons = ({ votes, author, commentId, reviewId, setUsersComments }) => {
    
    const user = useContext(UserContext)
    
    const [voteInc, setVoteInc] = useState(0);

    const removeComment = (commentId,reviewId) => {
        deleteComment(commentId)
            .then((res) => {
                return  getComments(reviewId)
            }).then((res) => {
                return setUsersComments(res)
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
                return getComments(reviewId)
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <Grid container justifyContent="space-between">
            <Typography>
                Votes : {votes + voteInc}
            </Typography>
            <Grid item>
            {author === user.username ?
            <Button onClick={() => {
                removeComment(commentId, reviewId)
            }}><HighlightOffIcon/></Button> :
            <Button onClick={() => {
            voteComment()
        }}>Vote Comment++</Button>}
        </Grid>
    </Grid>)
}
export default CommentButtons;