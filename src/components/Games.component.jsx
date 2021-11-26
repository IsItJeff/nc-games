import {Accordion, AccordionDetails , Box, Grid ,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getReviews, addVoteToReview } from "../utils/Api";
import CommentContent from "./CommentContent.component";
import ReviewSummary from "./ReviewSummary.component";
import ReviewBody from "./ReviewBody.component";

const Games = () => {

    const [usersReviews, setUsersReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [voteInc, setVoteInc] = useState(0);
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
    
    const voteReview = (reviewId) => {
        setVoteInc(voteInc => voteInc + 1)
        const voteObj = {
            inc_votes : 1
        }
        addVoteToReview(reviewId, voteObj)
            .then((res) => {
                return res
            }).catch((err) => {
                console.log(err)
            })
    }
    
    if (isLoading) return (<div>Loading . . .</div>)
    if(err) return (<div> Error 404 Page not Found</div>)
    
    return (
        <Box className="review-container" >
            <Typography variant="h2" className="header">Games</Typography>
            <Grid container spacing={2} justifyContent="center">
                {usersReviews.map((review, index) => {
                    return (
                        <Grid item key={index} className="review-item">
                            <Accordion className="test-border" expanded={expanded === review.review_id} onChange={handleChange(review.review_id)}>
                                <ReviewSummary 
                                        category={review.category}
                                        commentCount={review.comment_count}
                                        title={review.title}
                                        votes={review.votes + voteInc}
                                        img={review.review_img_url} />
                                <AccordionDetails >
                                    <ReviewBody
                                        reviewId={review.review_id}
                                        body={review.review_body}
                                        img={review.review_img_url}
                                        owner={review.owner}
                                        votes={review.votes + voteInc}
                                        voteReview={voteReview} />
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