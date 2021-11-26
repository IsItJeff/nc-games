import { AccordionSummary, Typography } from "@mui/material";

const ReviewSummary = ({title, img , votes}) => {
    return (
             <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <img className="review-img" src={img} alt="" />
                <Typography>
                    Title : {title}
                </Typography>
                <Typography>
                    Votes : {votes}
                </Typography>
            </AccordionSummary>
    )
}

export default ReviewSummary;