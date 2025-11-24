//Use for functional approach to auth API calls

import api from "./api"

type RegisterDataType = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
}

//http://localhost:3000/api/v1/auth/register
export const register = async (data: RegisterDataType) => {
    const response = await api.post('/auth/register', data)
    return response.data
}

//http://localhost:3000/api/v1/auth/login
export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
}

//http://localhost:3000/api/v1/auth/me
export const getMyDetails = async () => {
    const response = await api.get('/auth/me')
    return response.data
}

//http://localhost:3000/api/v1/auth/admin/register
export const adminRegister = async (data: RegisterDataType) => {
    const response = await api.post('/auth/admin/register', data)
    return response.data
}

//http://localhost:3000/api/v1/auth/refresh
export const refreshTokens = async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', { token: refreshToken })
    return response.data
}