import Api, {AuthApi, ScheduleTrackingApi, TrackingApi, UserApi} from "@/api";
import * as config from "@/config.json";
export default {
    state: {
        authApi: new AuthApi(config.backendUrl),
        trackingApi: new TrackingApi(config.backendUrl),
        scheduleTrackingApi: new ScheduleTrackingApi(config.backendUrl),
        userApi: new UserApi(config.backendUrl),
        api: new Api(new AuthApi(config.backendUrl), new TrackingApi(config.backendUrl), new ScheduleTrackingApi(config.backendUrl), new UserApi(config.backendUrl))
    },

}