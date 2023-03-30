import fetch from "cross-fetch";

class BaseApiClass {
    backendUrl;

    constructor(backendUrl) {
        this.backendUrl = backendUrl;
    }

    async refreshToken() {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken !== null) {
            const response = await fetch(`${this.backendUrl}/auth/refresh`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({refreshToken: refreshToken})
            })
            const obj = await response.json()
            console.log(obj)
            localStorage.setItem("refreshToken", obj.refreshToken)
            localStorage.setItem("authToken", obj.token)
        }

    }

    async checkErrorAndReturnJson(r) {
        const json = await r.json()
        if (r.status > 205) {
            throw new Error(json.error)
        }
        return json
    }

    async getUserId(accessToken) {
        const r = await fetch(`${this.backendUrl}/auth/user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
            },
        })
        const j = await r.json()
        console.log(j)
        return j.userId
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


    async recoveryPassword(token, password) {
        const r = await fetch(`${this.backendUrl}/auth/recovery`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: token, password: password})
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async refresh(refreshToken) {
        if (refreshToken !== null) {
            const response = await fetch(`${this.backendUrl}/auth/refresh`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({refreshToken: refreshToken})
            })
            return await response.json()
        }
    }
}

export class TrackingApi extends BaseApiClass {
    async trackContainer(number, scac) {
        const r = await fetch(`${this.backendUrl}/tracking/container`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "number": number,
                "scac": scac
            })
        })
        const json = await r.json()
        if (r.status >= 205) {
            throw new Error(`status code is: ${r.status} error: ${json.error}`)
        } else if (r.status === 204) {
            throw new Error(`number not found`)
        }
        return json
    }

    async trackByBillNumber(number, scac) {
        const r = await fetch(`${this.backendUrl}/tracking/bill`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    "number": number,
                    "scac": scac
                })
            }
        )
        const json = await r.json()
        if (r.status >= 205) {
            throw new Error(`status code is: ${r.status} error: ${json.error}`)
        } else if (r.status === 204) {
            throw new Error(`number not found`)
        }
        return json

    }

    async getContainerLines() {
        const r = await fetch(`${this.backendUrl}/scac/container`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=utf-8',
            },
        })
        const j = await r.json()
        return j.data
    }

    async getBillLines() {
        const r = await fetch(`${this.backendUrl}/scac/bills`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=utf-8',
            },
        })
        const j = await r.json()
        return j.data
    }
}


export class ScheduleTrackingApi extends BaseApiClass {
    async deleteBillNosFromTracking(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/billNumbers`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({numbers: numbers})
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async deleteContainerFromTracking(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/containers`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({numbers: numbers})
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async addContainersOnTracking(req, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/containers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
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
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(req)
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async getInfoAboutTracking(number, accessToken) {
        const userId = await this.getUserId(accessToken)
        console.log(userId)
        const r = await fetch(`${this.backendUrl}/schedule/info?number=${number}&userId=${userId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
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
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(req)
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async updateBills(req, accessToken) {
        const r = await fetch(`${this.backendUrl}/schedule/bills`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
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
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
            },
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async addBills(numbers, accessToken) {
        let numbersInBody = []
        for (const number of numbers) {
            numbersInBody.push({"number": number})
        }
        const r = await fetch(`${this.backendUrl}/user/bills`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "container": numbersInBody
            })
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async addContainers(numbers, accessToken) {
        let numbersInBody = []
        for (const number of numbers) {
            numbersInBody.push({"number": number})
        }
        const r = await fetch(`${this.backendUrl}/user/containers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "container": numbersInBody
            })
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async deleteContainers(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/user/containers`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({numbers: numbers})
        })
        return await this.checkErrorAndReturnJson(r)
    }

    async deleteBills(numbers, accessToken) {
        const r = await fetch(`${this.backendUrl}/user/bills`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({numbers: numbers})
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

