import { AccordionSummary, Grid ,Typography } from "@mui/material";

const ReviewSummary = ({commentCount, category, title, img , votes}) => {
    return (
             <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
        >
                <img className="review-img" src={img} alt="" />
                <Typography variant="h5">
                    Title : {title}
                </Typography>
        
                <Grid container justifyContent="space-between">
                    <Grid item>
                        Category : {category}
                    </Grid>
                    <Grid item>
                        Votes : {votes}
                    </Grid>
                    <Grid item>
                        Comments : {commentCount}
                    </Grid>
                </Grid>
            </AccordionSummary>
    )
}

export default ReviewSummary;