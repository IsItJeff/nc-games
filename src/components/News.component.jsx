import { Box, Grid ,Typography } from "@mui/material";
import {  getReviews } from "../utils/Api";
import { useEffect, useState } from "react";

const News = () => {
    const [usersReviews, setUsersReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setErr(null)

        getReviews()
            .then((reviews) => {
                setIsLoading(false)
                setUsersReviews(reviews)
            }).catch(() => {
                setIsLoading(false)
                setErr("Err 404 ")
        })
    }, [])

    if(isLoading) return (<div> Loading . . .</div>)
    if(err) return (<div>Err 404 Page Not Found</div>)
    return (
        <Box justifyContent="center">
            <Typography variant="h2" className="header">News</Typography>
            <Grid container spacing={3}>
                {usersReviews.map((review) => {
                    return (
                        <Grid key={review.review_id} item >
                            <div>{review.title}</div>
                            <div>{review.owner}</div>
                            {review.created_at}
                            {review.votes}
                            {review.review_body}
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default News;