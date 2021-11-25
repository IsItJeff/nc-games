import { Avatar,Box ,Grid, Typography } from "@mui/material";
import { UserContext } from "../contexts/User.context"
import { useContext } from "react";

const Header = () => {
    const user = useContext(UserContext)

    return (
        <Box sx= {{flexGrow:1}}>
            <Grid className="header-container" container direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Grid item className="header-title">
                    <Typography   variant="h1" component="div">
                        NC Gamers Review
                        </Typography>
                </Grid>
                <Grid item className="header-avatar">
                    <Avatar  alt={user.username || ""} src={user.avatar_url || ""} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Header;