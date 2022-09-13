export const LoginStart = (userCredentials)=>({
    type:"loginstart"

})

export const LoginSuccess = (user)=>({
    type:"loginsuccess",
    payload: user
})
export const LoginFailure = ()=>({
    type:"loginfailure",

})
export const Logout = ()=>({
    type:"logout",

})
export const updateStart = (userCredentials)=>({
    type:"updateStart"

})

export const updateSuccess = (user)=>({
    type:"updateSuccess",
    payload: user
})
export const updateFailure = ()=>({
    type:"updateFailure"

})