class Utils {
    findInUserAccountBySearchQuery(arr, searchQuery) {
        try {
            return arr.filter(item => `${item.number.toLowerCase()} ${item.isOnTrack && item.scheduleTrackingInfo ? item.scheduleTrackingInfo.subject.toLowerCase() : ``} ${item.isOnTrack && item.scheduleTrackingInfo ? item.scheduleTrackingInfo.emails.join(` `).toLowerCase() : ``} ${item.isOnTrack  && item.scheduleTrackingInfo ? item.scheduleTrackingInfo.time.toLowerCase() : ``}`.includes(searchQuery.toLowerCase()))
        } catch (e) {
            return arr
        }
    }
}

export const utils = new Utils();
