import {Accordion, AccordionDetails , Box, Grid ,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getReviews } from "../utils/Api";

import CommentContent from "./CommentContent.component";
import ReviewSummary from "./ReviewSummary.component";
import ReviewBody from "./ReviewBody.component";

const Games = () => {

    const [usersReviews, setUsersReviews] = useState([]);
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
                setUsersReviews(res)
            }).catch((err) => {
                setIsLoading(false)
                setErr("Error")
            })
    }, [])

    
    if (isLoading) return (<div>Loading . . .</div>)
    if(err) return (<div> Error 404 Page not Found</div>)
    
    return (
        <Box className="review-container " justifyContent="center">
            <Typography variant="h2" className="header">Games</Typography>
            <Grid container spacing={2}>
                {usersReviews.map((review, index) => {
                    return (
                        <Grid item key={index} className="review-item">
                            <Accordion className="test-border" expanded={expanded === review.review_id} onChange={handleChange(review.review_id)}>
                                <ReviewSummary title={review.title} votes={review.votes} img={review.review_img_url}/>
                                <AccordionDetails >
                                    <ReviewBody reviewId={review.review_id} body={review.review_body} img={review.review_img_url} owner={review.owner}/>
                                    <CommentContent reviewId={review.review_id} />
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