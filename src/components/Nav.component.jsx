import { Link } from "react-router-dom"
import { UserContext } from "../contexts/User.context";
import { useContext } from "react";

const MainNav = () => {
    const user = useContext(UserContext);

    return (
        <nav>
            <Link to={`/${user.username}/news`}>News</Link>
            <Link to={`/${user.username}/games`}>Games</Link>
            <Link to={`/${user.username}/profile`}>Profile</Link>
        </nav>
    )
}

export default MainNav;