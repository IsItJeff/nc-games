import { Card , CardActionArea , CardContent , CardMedia  , Grid, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "../utils/Api.js"

const UserLogin = () => {

    const [currentUser, setCurrentUser] = useState({})
    
    const [usersData, setUsersData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [userLogin,setUserLogin] = useState()
    
    useContext(currentUser)
    
    useEffect(() => {

        const usersTestArr = [
            "tickle122",
            "grumpy19",
            "happyamy2016",
            "cooljmessy",
            "weegembump",
            "jessjelly"
        ]

        const usersObj = []
        
        setIsLoading(true)

        usersTestArr.forEach((user) => {
            getUsers(user)
                .then((res) => {
                    usersObj.push(res);
                    return usersObj
                }).then((res) => {
                    if (usersObj.length === usersTestArr.length) {
                        setUsersData(res)
                        console.log(res)
                        setIsLoading(false)
                    };
                }).catch((err) => {
                    return err
                })
        })
    }, [])
    
    const userSelection = (user) => {
        setCurrentUser(user)
        console.log(user,"Click")
    }

    if (isLoading) return (<div>Loading ... </div>)
    
    return (
        <Grid container spacing={3} sx={{ bgcolor: "lightGrey" }}>
            {usersData.map((user) => {
                return (
                    <Grid key={user.user.username} item xs={4} onClick={()=>{userSelection(user.user)}}>
                    <Card sx={{maxWidth:345}}>
                        <CardActionArea sx={{bgcolor:"text.disabled"}}>
                            <CardMedia
                                    component="img"
                                    width="140"
                                    height="140"
                                    sx={{maxWidth:140, maxHeight:140, mx:"auto", border:2, borderColor:"primary.main",borderRadius: 16, padding: 1, bgcolor:"white"}}
                                image={user.user.avatar_url}
                                alt={user.user.username} />
                            <CardContent sx={{bgcolor:"white", borderTop:2, }}>
                                <Typography>
                                    Name: {user.user.name}
                                </Typography>
                                <Typography>
                                    Username:  {user.user.username}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </Grid>
                )
            }
            )}
        </Grid>
    )
}

export default UserLogin;