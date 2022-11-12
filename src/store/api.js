import Api, {AuthApi, ScheduleTrackingApi, TrackingApi, UserApi} from "@/api";

export default {
    state: {
        authApi: new AuthApi(process.env.backendUrl),
        trackingApi: new TrackingApi(process.env.backendUrl),
        scheduleTrackingApi: new ScheduleTrackingApi(process.env.backendUrl),
        userApi: new UserApi(process.env.backendUrl),
        api: new Api(new AuthApi(process.env.backendUrl), new TrackingApi(process.env.backendUrl), new ScheduleTrackingApi(process.env.backendUrl), new UserApi(process.env.backendUrl))
    },

}