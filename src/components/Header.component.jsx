import { Avatar, Stack } from "@mui/material";
import { UserContext } from "../contexts/User.context"
import { useContext } from "react";

const Header = () => {
    const user = useContext(UserContext)

    return (
        <Stack direction="row" justifyContent="center">
            <h1>
                NC Gamers Review
            </h1>
            <Stack direction="column" justifyContent="center">
                <div>
                    <Avatar alt={user.username || ""} src={user.avatar_url || ""} />
                </div>
            </Stack>
        </Stack>
    )
}

export default Header;