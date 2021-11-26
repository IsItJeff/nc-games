import {Grid, Typography } from "@mui/material";
import { useState , useEffect} from "react";
import { getComments } from "../utils/Api";

import AddComment from"./AddComment.component.jsx"
import CommentButtons from "./CommentButtons.component.jsx"

const CommentContent = ({ reviewId }) => {
    
    const [usersComments, setUsersComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true)

        getComments(reviewId)
            .then((res) => {
                setIsLoading(false)
                return setUsersComments(res)
            }).catch((err) => {
                console.log(err)
        })
    }, [reviewId])


    if(isLoading)return(<div>Loading Comments ...</div>)
    return (
        <Grid container justifyContent="center" rowSpacing={1} >
            { usersComments.map((comment) => {
                    return (
                        <Grid item className="comment-item" key={comment.comment_id} xs={8}>
                            <CommentButtons
                                setUsersComments={setUsersComments}
                                commentId={comment.comment_id}
                                reviewId={reviewId}
                                author={comment.author}
                                votes={comment.votes} />
                            <Typography pb={2}>
                                Author : {comment.author}
                            </Typography>
                            <Typography >
                                Comment :
                                <Typography className="comment-body">
                                    {comment.body}
                                </Typography>
                            </Typography>
                        </Grid>
                    )
                })
            }
            <Grid item  xs={8}>
                <AddComment reviewId={reviewId} setUsersComments={setUsersComments} />
            </Grid>
        </Grid>
    )
}

export default CommentContent;