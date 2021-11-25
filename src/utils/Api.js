import axios from "axios";

const apiReq = axios.create({
    baseURL: "https://be-nc-games-example.herokuapp.com/api"
})

export const getUsers = (user) => {
    return apiReq.get(`/users/${user}`)
        .then((res) => {
            return res.data 
        }).catch((err) => {
            console.dir(err)
    })
}

export const getReviews = () => {
    return apiReq.get(`/reviews`)
        .then((res) => {
            return res.data.reviews;
        }).catch((err) => {
            console.dir(err)
        })
}

export const getReviewById = (reviewId) => {
    return apiReq.get(`/reviews/${reviewId}`)
        .then((res) => {
            return res.data
        }).catch((err) => {
            console.dir(err)
    })
}

export const getComments = (reviewId) => {
    return apiReq.get(`/reviews/${reviewId}/comments`)
        .then((res) => {
            return res.data.comments;
        }).catch((err) => {
            console.dir(err);
        })
}

export const postComment = (reviewId, reviewBody) => {
    return apiReq.post(`/reviews/${reviewId}/comments`, reviewBody)
        .then((res) => {
            return res;
        }).catch((err) => {
        console.dir(err)
    })
}