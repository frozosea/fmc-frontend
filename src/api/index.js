export class AuthApi {
    login(email, password) {
        //TODO create login method
        console.log(email, password)
        return {
            "refreshToken": "string",
            "refreshTokenExpires": 0,
            "token": "string",
            "tokenExpires": 0,
            "token_type": "string"
        }
    }

    register(email, username, password) {
        //TODO create register method
        console.log(email, username, password)
        // throw new Error("example error if username or password is wrong")
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

    getAllLines() {
        return [{scac: "FESO", fullName: "Fesco shipping line company"}, {
            scac: "MAEU",
            fullName: "Maersk co."
        }]
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
        return {
            time: "15:00",
            emails: [`3dteapot@gmail.com`, `subvenire@mail.com`, `logistic@ya.ru`],
            subject: "боксы вмтп"
        }
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
    feedback(email, message) {
        console.log(email, message)
        //TODO implement feedback method in api
    }

    get() {
        //TODO get bill and containers from user account

        return {
            containers: [{
                number: "MRKU6782312",
                isOnTrack: true,
                isContainer: true,
                scheduleTrackingInfo: {
                    time: "4:20",
                    emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                    subject: "example subject"
                }
            },
                {
                    number: "CMDU1239876",
                    isOnTrack: true,
                    isContainer: true,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                },
                {
                    number: "MAEU5672343",
                    isOnTrack: true,
                    isContainer: true,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                },
                {
                    number: "MSKU7658790",
                    isOnTrack: true,
                    isContainer: true,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                },
                {
                    number: "FESO2219273",
                    isOnTrack: true,
                    isContainer: true,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                },
                {
                    number: "FESO2219271",
                    isOnTrack: true,
                    isContainer: true,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                },
                {
                    number: "FESO2219270",
                    isOnTrack: true,
                    isContainer: true,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                },
                {
                    number: "FESO2219272",
                    isOnTrack: true,
                    isContainer: true,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                }],
            billNumbers: [
                {
                    number: "ZHGO22222222",
                    isOnTrack: true,
                    isContainer: false,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                },
                {
                    number: "MKRU1231231231",
                    isOnTrack: false,
                    isContainer: false,
                    scheduleTrackingInfo: {}
                },
                {
                    number: "FESO23123123",
                    isOnTrack: true,
                    isContainer: false,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                },
                {
                    number: "CMDU23123123",
                    isOnTrack: true,
                    isContainer: false,
                    scheduleTrackingInfo: {
                        time: "4:20",
                        emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                        subject: "example subject"
                    }
                }
            ]
        }

    }

    getArchive() {
        //TODO get archive of tracking from user account

        return {
            containers: [{
                number: "FESO2213945",
                scheduleTrackingInfo: {
                    time: "4:20",
                    emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                    subject: "example subject"
                }
            }],
            billNumbers: [{
                number: "MSCU2312312321321",
                scheduleTrackingInfo: {
                    time: "4:20",
                    emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
                    subject: "example subject"
                }
            }]
        }
    }
}


export default class Api {
    get authApi() {
        return this._authApi;
    }

    get trackingApi() {
        return this._trackingApi;
    }

    get scheduleTrackingApi() {
        return this._scheduleTrackingApi;
    }

    get userApi() {
        return this._userApi;
    }

    constructor(authApi, trackingApi, scheduleTrackingApi, userApi) {
        this._authApi = authApi;
        this._trackingApi = trackingApi;
        this._scheduleTrackingApi = scheduleTrackingApi;
        this._userApi = userApi;
    }
}