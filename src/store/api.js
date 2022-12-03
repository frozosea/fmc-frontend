import Api, {AuthApi, ScheduleTrackingApi, TrackingApi, UserApi} from "@/api";

const BACKEND_URL = process.env.VUE_APP_BACKEND_URL
const authApi = new AuthApi(BACKEND_URL)
const trackingApi = new TrackingApi(BACKEND_URL)
const scheduleTrackingApi = new ScheduleTrackingApi(BACKEND_URL)
const userApi = new UserApi(BACKEND_URL)

export default {
    state: {
        authApi: authApi,
        trackingApi: trackingApi,
        scheduleTrackingApi: scheduleTrackingApi,
        userApi: userApi,
        api: new Api(authApi, trackingApi, scheduleTrackingApi, userApi)
    },

}