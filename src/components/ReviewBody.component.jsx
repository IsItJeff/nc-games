import { Button ,Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../contexts/User.context";

const ReviewBody = ({ body, img , owner}) => {
    const user = useContext(UserContext);

    return (
        <div>
            <img className="review-img-big" src={img} alt="" />
            <Typography>
                {body}
            </Typography>
                {owner === user.username? "" : <Button onClick={() => { }}>Vote Review++</Button>}
        </div>
    )
}

export default ReviewBody;