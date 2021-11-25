import { Switch } from "@mui/material";
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/User.context";
import { useContext } from "react";

const MainNav = () => {
    const user = useContext(UserContext);

    return (
        <nav className="nav-container">
            <Link className="nav-link" to={`/${user.username}/news`}>News</Link>
            <Link className="nav-link" to={`/${user.username}/games`}>Games</Link>
            <Link className="nav-link" to={`/${user.username}/profile`}>Profile</Link>
            <Switch />
        </nav>
    )
}

export default MainNav;