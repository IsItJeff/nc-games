import { Typography, Button } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User.context";
import { addVoteToComment } from "../utils/Api";

const CommentVoter = ({votes, author, id}) => {
    const user = useContext(UserContext)
    
    const [voteInc, setVoteInc] = useState(0);
    
    const voteComment = () => {

        setVoteInc(voteInc => voteInc + 1)
        const voteObj = {
            inc_votes : 1
        }
        
        addVoteToComment(id,voteObj)
            .then((res) => {
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
            {author === user.username ? "" : <Button onClick={() => {
                voteComment()
            }}>Vote Comment++</Button>}
    </div>)
}
export default CommentVoter;