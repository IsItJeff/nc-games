import {Grid, Typography } from "@mui/material";
import { useState , useEffect} from "react";
import { getComments } from "../utils/Api";

import AddComment from"./AddComment.component.jsx"
import CommentButtons from "./CommentButtons.component.jsx"

const CommentContent = ({ reviewId }) => {
    
    const [usersComments, setUsersComments] = useState([]);
    const [reloadComments, setReloadComments] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true)
        setReloadComments(false)

        getComments(reviewId)
            .then((res) => {
                setIsLoading(false)
                setUsersComments(res)
            }).catch((err) => {
                console.log(err)
        })
    }, [reviewId, reloadComments])
    
    if(isLoading)return(<div>Loading Comments ...</div>)
    return (
        <div>
            { usersComments.map((comment) => {
                    return (
                        <Grid item className="test-border" key={comment.comment_id}>
                            <Typography>
                                Author : {comment.author}
                            </Typography>
                            <Typography>
                                Comment : {comment.body}
                            </Typography>
                            <CommentButtons
                                setReloadComments={setReloadComments}
                                commentId={comment.comment_id}
                                reviewId={reviewId}
                                author={comment.author}
                                votes={comment.votes} />
                        </Grid>
                    )
                })
            }
            <AddComment reviewId={reviewId} setUsersComments={setUsersComments}/>
        </div>
    )
}

export default CommentContent;