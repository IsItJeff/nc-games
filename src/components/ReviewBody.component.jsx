import { Button ,Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../contexts/User.context";


const ReviewBody = ({ voteReview, reviewId,body, img , owner, votes}) => {
    const user = useContext(UserContext);

    return (
        <div>
            <img className="review-img-big" src={img} alt="" />
            <Typography variant="body1" gutterBottom>
                {body}
                {votes}
            </Typography>
                {owner === user.username? "" : <Button onClick={() => {voteReview(reviewId) }}>Vote Review++</Button>}
        </div>
    )
}

export default ReviewBody;