import fetch from "cross-fetch";

class BaseApiClass {
    backendUrl;

    constructor(backendUrl) {
        // if (!backendUrl) {
        //     throw new Error("no backend url")
        // }
        this.backendUrl = backendUrl;
    }

    async checkErrorAndReturnJson(r) {
        const json = await r.json()
        if (r.status > 205) {
            throw new Error(`status code is: ${r.status} error: ${json.error}`)
        }
        return json
    }
}


export class AuthApi extends BaseApiClass {
    async login(email, password) {
        const r = await fetch(`${this.backendUrl}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: email, password: password})
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async register(email, username, password) {
        const r = await fetch(`${this.backendUrl}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "username": username
            })
        })
        return await this.checkErrorAndReturnJson(r)

    }

    async remindPassword(email) {
        const r = await fetch(`${this.backendUrl}/auth/remind`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: email})
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async refreshToken(refreshToken) {
        const r = await fetch(`${this.backendUrl}/auth/refresh`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({refreshToken: refreshToken})
        })
        return await this.checkErrorAndReturnJson(r)

    }

    async recoveryPassword(token, password) {
        const r = await fetch(`${this.backendUrl}/auth/reset`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: token, password: password})
        })
        return await this.checkErrorAndReturnJson(r)
    }
}

export class TrackingApi extends BaseApiClass {
    async trackContainer(number, scac) {
        const r = await fetch(`${this.backendUrl}/tracking/container?number=${number}&scac=${scac}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        const json = await r.json()
        if (r.status >= 205) {
            throw new Error(`status code is: ${r.status} error: ${json.error}`)
        } else if (r.status === 204) {
            throw new Error(`number not found`)
        }
        return json
        // return {
        //     number: "MRKU6788432",
        //     containerSize: "20HQ",
        //     infoAboutMoving: [{
        //         "time": "2022-20-20",
        //         "operationName": "test opeartion",
        //         "location": "nakhodka",
        //         "vessel": ""
        //     },
        //         {
        //             "time": "2022-20-20",
        //             "operationName": "test opeartion",
        //             "location": "nakhodka",
        //             "vessel": ""
        //         },
        //         {
        //             "time": "2022-20-20",
        //             "operationName": "test opeartion",
        //             "location": "nakhodka",
        //             "vessel": ""
        //         },
        //         {
        //             "time": "2022-20-20",
        //             "operationName": "test opeartion",
        //             "location": "nakhodka",
        //             "vessel": ""
        //         }, {
        //             "time": "2022-20-20",
        //             "operationName": "test opeartion",
        //             "location": "nakhodka",
        //             "vessel": ""
        //         }, {
        //             "time": "2022-20-20",
        //             "operationName": "test opeartion",
        //             "location": "nakhodka",
        //             "vessel": ""
        //         }, {
        //             "time": "2022-20-20",
        //             "operationName": "test opeartion",
        //             "location": "nakhodka",
        //             "vessel": ""
        //         }
        //     ]
        // }
    }

    async trackByBillNumber(number, scac) {
        //TODO create track bill number method
        const r = await fetch(`${this.backendUrl}/tracking/bill?number=${number}&scac=${scac}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            })
        const json = await r.json()
        if (r.status >= 205) {
            throw new Error(`status code is: ${r.status} error: ${json.error}`)
        } else if (r.status === 204) {
            throw new Error(`number not found`)
        }
        return json
        // console.log(number, scac)
        // return {
        //     number: "MRKU6788432",
        //     containerSize: "20HQ",
        //
        //     infoAboutMoving: [{
        //         "time": "2022-20-20",
        //         "operationName": "test opeartion",
        //         "location": "nakhodka",
        //         "vessel": ""
        //     },
        //         {
        //             "time": "2022-20-20",
        //             "operationName": "test opeartion",
        //             "location": "nakhodka",
        //             "vessel": ""
        //         },
        //         {
        //             "time": "2022-20-20",
        //             "operationName": "test opeartion",
        //             "location": "nakhodka",
        //             "vessel": ""
        //         }]
        // }

    }

    async getContainerLines() {
        const r = await fetch(`${this.backendUrl}/scac/containers`, {
            method: "GET",
            headers: {
                'content-type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
        })
        return await r.json()
    }

    async getBillLines() {
        const r = await fetch(`${this.backendUrl}/scac/bills`, {
            method: "GET",
            headers: {
                'content-type': 'application/json;charset=utf-8',
            },
        })
        return await r.json()
    }
}


export class ScheduleTrackingApi extends BaseApiClass {
    async deleteBillNosFromTracking(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/billNumbers`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(numbers)
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async deleteContainerFromTracking(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/containers`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(numbers)
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async addContainersOnTracking(req, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/containers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(req)
        })
        return await this.checkErrorAndReturnJson(r)

    }

    async addBillsOnTrack(req, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/bills`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(req)
        })
        return await this.checkErrorAndReturnJson(r)
    }

    //TODO create update task func

    async getInfoAboutTracking(number, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/info?number=${number}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async getTimeZone() {
        const r = await fetch(`${this.backendUrl}/schedule/timezone`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async updateContainers(req, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/containers`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(req)
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async updateBills(req, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/bills`, {
            // url: `${this.backendUrl}/schedule/bills`,
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(req)
        })
        return await this.checkErrorAndReturnJson(r)
    }
}


export class UserApi extends BaseApiClass {
    async feedback(email, message) {
        const r = await fetch(`${this.backendUrl}/user/feedback`, {
            // url: `${this.backendUrl}/user/feedback`,
            method: "POST",
            headers: {
                'Accept': 'encoding/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: email, message: message})
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async get(accessToken) {
        const r = await fetch(`${this.backendUrl}/user/all`, {
            // url: `${this.backendUrl}/user/all`,
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
        })
        return await this.checkErrorAndReturnJson(r)
        // return {
        //     containers: [{
        //         number: "MRKU6782312",
        //         isOnTrack: true,
        //         isContainer: true,
        //         scheduleTrackingInfo: {
        //             time: "4:20",
        //             emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //             subject: "example subject"
        //         }
        //     },
        //         {
        //             number: "CMDU1239876",
        //             isOnTrack: true,
        //             isContainer: true,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         },
        //         {
        //             number: "MAEU5672343",
        //             isOnTrack: true,
        //             isContainer: true,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         },
        //         {
        //             number: "MSKU7658790",
        //             isOnTrack: true,
        //             isContainer: true,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         },
        //         {
        //             number: "FESO2219273",
        //             isOnTrack: true,
        //             isContainer: true,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         },
        //         {
        //             number: "FESO2219271",
        //             isOnTrack: true,
        //             isContainer: true,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         },
        //         {
        //             number: "FESO2219270",
        //             isOnTrack: true,
        //             isContainer: true,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         },
        //         {
        //             number: "FESO2219272",
        //             isOnTrack: true,
        //             isContainer: true,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         }],
        //     billNumbers: [
        //         {
        //             number: "ZHGO22222222",
        //             isOnTrack: true,
        //             isContainer: false,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         },
        //         {
        //             number: "MKRU1231231231",
        //             isOnTrack: false,
        //             isContainer: false,
        //             scheduleTrackingInfo: {}
        //         },
        //         {
        //             number: "FESO23123123",
        //             isOnTrack: true,
        //             isContainer: false,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         },
        //         {
        //             number: "CMDU23123123",
        //             isOnTrack: true,
        //             isContainer: false,
        //             scheduleTrackingInfo: {
        //                 time: "4:20",
        //                 emails: ["i20072004@gmail.com", "y20072004@gmail.com", "d20072004@gmail.com"],
        //                 subject: "example subject"
        //             }
        //         }
        //     ]
        // }

    }

    async addBills(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/user/bills`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(numbers)
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async addContainers(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/user/containers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(numbers)
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async deleteContainers(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/user/containers`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(numbers)
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async deleteBills(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/user/bills`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(numbers)
        })
        return await this.checkErrorAndReturnJson(r)
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