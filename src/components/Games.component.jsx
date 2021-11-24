import { Grid ,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getReviews } from "../utils/Api";

const Games = () => {
    
    const [usersReviews, setUsersReviews] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        setErr(null)
        getReviews()
            .then((res) => {
                setIsLoading(false)
                setUsersReviews(res)
            }).catch((err) => {
            setIsLoading(false)
            setErr("Error")
        })      
    }, [])
    
    if (isLoading) return (<div>Loading . . .</div>)
    if(err) return (<div> Error 404 Page not Found</div>)
    
    return (
        <div>
                <Typography variant="h2">Games</Typography>
            <Grid container spacing={2}>
                {usersReviews.map((review) => {
                    return (
                        <Grid item key={review.review_id}>
                            {review.title}
                            {review.category}
                            {review.designer}
                            {review.comment_count}
                            {review.votes}
                            {review.review_img_url}
                        </Grid>

                    )
                })}
            </Grid>
        </div>
    )
}

export default Games;