import Api, {AuthApi, ScheduleTrackingApi, TrackingApi, UserApi} from "@/api";

export default {
    namespaced: true,
    state: {
        authApi: new AuthApi(),
        trackingApi: new TrackingApi(),
        scheduleTrackingApi: new ScheduleTrackingApi(),
        userApi: new UserApi(),
        api: new Api(new AuthApi(), new TrackingApi(), new ScheduleTrackingApi(), new UserApi())
    }
}