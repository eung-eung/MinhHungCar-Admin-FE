import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { axiosAuth } from "../axios"

export const useAxiosAuth = () => {
    const { data: session } = useSession()
    useEffect(() => {
        const request = axiosAuth.interceptors.request.use(config => {
            config.headers["Authorization"] = `Bearer ${session?.user.accessToken}`
            return config
        })
        return axiosAuth.interceptors.request.eject(request)
    }, [session])
}