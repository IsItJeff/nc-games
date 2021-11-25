import {Accordion, AccordionDetails ,AccordionSummary,Button, Box, Grid ,Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getReviews, getComments, postComment, deleteComment } from "../utils/Api";

import { UserContext } from "../contexts/User.context";
import { useContext } from "react";
import CommentVoter from "./CommentVoter.component";

const Games = () => {
    
    const user = useContext(UserContext);

    const [usersReviews, setUsersReviews] = useState([]);
    const [usersComments, setUsersComments] = useState([]);
    const [eventComment, setEventComment] = useState("");
    const [incComment, setIncComment] = useState("");
    const [incReview, setIncReview] = useState("")
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

    const loadComments = (reviewId) => {
        getComments(reviewId)
            .then((res) => {
                setUsersComments(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    const sendComment = (reviewId,commentBody) => {
        const commentObj = {
            username: user.username,
            body: commentBody
        }

        postComment(reviewId, commentObj)
            .then((res) => {
                return  getComments(reviewId)
            }).then((res) => {
                setUsersComments(res)
            }).catch(() => {
            console.log(err)
        })
    }

    const removeComment = (commentId,reviewId) => {
        deleteComment(commentId)
            .then((res) => {
                return  getComments(reviewId)
            }).then((res) => {
                setUsersComments(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    const voteReview = (reviewVotes) => {
        setIncReview(reviewVotes)
        console.log(incReview)
    }

    const voteComment = (commentVotes) => {
        setIncComment(commentVotes)
        console.log(incComment)
    }
    
    if (isLoading) return (<div>Loading . . .</div>)
    if(err) return (<div> Error 404 Page not Found</div>)
    
    return (
        <Box className="review-container " justifyContent="center">
            <Typography variant="h2" className="header">Games</Typography>
            <Grid container spacing={2}>
                {usersReviews.map((review, index) => {
                    return (
                        <Grid item key={index} className="review-item">
                            <Accordion className="test-border" expanded={expanded === review.review_id} onChange={handleChange(review.review_id)} onClick={()=>{loadComments(review.review_id)}}>
                                <AccordionSummary
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <img className="review-img" src={review.review_img_url} alt="" />
                                    <Typography>
                                        Title : {review.title}
                                    </Typography>
                                    <Typography>
                                        Votes : {review.votes}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails >
                                    <img className="review-img-big" src={review.review_img_url} alt="" />
                                    <Typography>
                                        {review.review_body}
                                    </Typography>
                                    {review.owner === user.username? "" : <Button onClick={() => { voteReview(review.votes) }}>Vote Review++</Button>}
                                    { usersComments.map((comment) => {
                                        return (
                                            <Grid item className="test-border" key={comment.comment_id}>
                                                <Typography>
                                                    Author : {comment.author}
                                                </Typography>
                                                <Typography>
                                                    Comment : {comment.body}
                                                </Typography>
                                                <CommentVoter id={comment.comment_id} author={comment.author} votes={ comment.votes}/>
                                                {comment.author === user.username ?  <Button onClick={()=>{removeComment(comment.comment_id, comment.review_id)}}>Remove</Button> : ""}
                                            </Grid>
                                        )
                                    })
                                    }
                                <div>
                                    <TextField onChange={(event)=>{setEventComment(event.target.value)}} label="Comment" color="secondary" multiline rows={4}  focused />
                                    <Button variant="outlined" onClick={()=>{sendComment(review.review_id, eventComment)}}>Submit</Button>
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