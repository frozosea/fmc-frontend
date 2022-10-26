export class AuthApi {
    login(email, password) {
        //TODO create login method
        console.log(email, password)
        throw new Error("example error if username or password is wrong")
    }

    register(email, username, password) {
        //TODO create register method
        console.log(email, username, password)
        throw new Error("example error if username or password is wrong")
    }

    recovery(email) {
        console.log(email)
        //TODO create recovery user method
    }

    refreshToken() {
        //TODO refresh token method
    }
}

export class TrackingApi {
    trackContainer(number, scac) {
        console.log(number, scac)
        return {
            number: "MRKU6788432",
            containerSize: "20HQ",
            infoAboutMoving: [{
                "time": "2022-20-20",
                "operationName": "test opeartion",
                "location": "nakhodka",
                "vessel": ""
            },
                {
                    "time": "2022-20-20",
                    "operationName": "test opeartion",
                    "location": "nakhodka",
                    "vessel": ""
                },
                {
                    "time": "2022-20-20",
                    "operationName": "test opeartion",
                    "location": "nakhodka",
                    "vessel": ""
                }]
        }
        //TODO create track container method
    }

    trackByBillNumber(number, scac) {
        //TODO create track bill number method

        console.log(number, scac)
        return {
            number: "MRKU6788432",
            containerSize: "20HQ",
            infoAboutMoving: [{
                "time": "2022-20-20",
                "operationName": "test opeartion",
                "location": "nakhodka",
                "vessel": ""
            },
                {
                    "time": "2022-20-20",
                    "operationName": "test opeartion",
                    "location": "nakhodka",
                    "vessel": ""
                },
                {
                    "time": "2022-20-20",
                    "operationName": "test opeartion",
                    "location": "nakhodka",
                    "vessel": ""
                }]
        }

    }
}


export class ScheduleTrackingApi {
    addEmailOnTracking(number, emails) {
        console.log(number, emails)
        //TODO create add email on tracking method
    }

    deleteBillNosFromTracking(numbers) {
        console.log(numbers)
        //TODO delete bill numbers from tracking method
    }

    addContainersOnTracking(numbers) {
        console.log(numbers)
        //TODO add containers on tracking method
    }

    deleteContainerFromTracking(numbers) {
        console.log(numbers)
        //TODO deleteContainerFromTracking
    }

    deleteEmailsFromTrackingByNumber(number) {
        console.log(number)
        //TODO deleteEmailsFromTrackingByNumber
    }

    changeEmailSubject(number) {
        //TODO changeEmailSubject
        console.log(number)
    }

    getInfoAboutTracking(number) {
        //TODO getInfoAboutTracking
        console.log(number)
    }

    changeTimeOfTracking(numbers, newTime) {
        console.log(numbers, newTime)
        //TODO changeTimeOfTracking
    }

    getTimeZone() {
        //TODO getTimeZone
    }
}


export class UserApi {
    get() {
        //TODO get bill and containers from user account
    }
    getArchive(){
        //TODO get archive of tracking from user account
    }
}


export default class Api {

    constructor(authApi, trackingApi, scheduleTrackingApi, userApi) {
        this.authApi = authApi;
        this.trackingApi = trackingApi
        this.scheduleTrackingApi = scheduleTrackingApi
        this.userApi = userApi
    }
}