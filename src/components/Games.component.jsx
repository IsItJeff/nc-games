import {Accordion, AccordionDetails ,AccordionSummary,Button, Box, Grid ,Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getReviews, getComments } from "../utils/Api";

const Games = () => {
    
    const [usersReviews, setUsersReviews] = useState([]);
    const [isReviewsLoaded, setIsReviewsLoaded] = useState(false)
    const [usersComments, setUsersComments] = useState([]);
    const [isCommentLoading, setIsCommentsLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        setIsLoading(true)
        setErr(null)

        getReviews()
            .then((res) => {
                setIsLoading(false)
                setIsReviewsLoaded(true)
                setUsersReviews(res)
            }).catch((err) => {
                setIsLoading(false)
                setErr("Error")
            })
    }, [isReviewsLoaded])

    const loadComments = (reviewId) => {
        getComments(reviewId)
            .then((res) => {
                setUsersComments(res)
            }).catch((err) => {
                console.log(err)
            })
    }
    
    if (isLoading) return (<div>Loading . . .</div>)
    if(err) return (<div> Error 404 Page not Found</div>)
    
    return (
        <Box className="review-container " justifyContent="center">
            <Typography variant="h2" className="header">Games</Typography>
            <Grid container spacing={2}>
                {usersReviews.map((review, index) => {
                    return (
                        <Grid item key={index} className="review-item" onClick={()=>{loadComments(review.review_id)}}>
                            <Accordion expanded={expanded === review.review_id} onChange={handleChange(review.review_id)}>
                                <AccordionSummary
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography>
                                        {review.title}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails >
                                {usersComments.map((comment) => {
                                    return (
                                            <Grid item key={comment.comment_id}>
                                            <Typography>
                                                {comment.body}
                                            </Typography>
                                            <Typography>
                                                
                                            </Typography>
                                        </Grid>
                                    )
                                })}
                                <div>
                                    <TextField label="Outlined secondary" color="secondary" multiline rows={4} focused />
                                    <Button variant="outlined">Submit</Button>
                                </div>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default Games;