import axios from "axios";

const apiReq = axios.create({
    baseURL: "https://be-nc-games-example.herokuapp.com/api"
})

export const getUsers = (user) => {
    return apiReq.get(`/users/${user}`)
        .then((res) => {
            return res.data 
        }).catch((err) => {
            return err
    })
}