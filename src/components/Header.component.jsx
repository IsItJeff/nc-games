import { Avatar, Stack } from "@mui/material";

const Header = () => {
    return (
        <Stack direction="row" justifyContent="center">
            <h1>
                NC Gamers Review
            </h1>
            <Stack direction="column" >
                <div>
                    <Avatar alt="" src="" />
                    <p>Username</p>
                </div>
            </Stack>
        </Stack>
    )
}

export default Header;