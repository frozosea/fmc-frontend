class Utils {
    findInUserAccountBySearchQuery(arr, searchQuery) {
        return arr.filter(item => `${item.number.toLowerCase()} ${item.isOnTrack ? item.scheduleTrackingInfo.subject.toLowerCase() : ``} ${item.isOnTrack ? item.scheduleTrackingInfo.emails.join(` `).toLowerCase() : ``} ${item.isOnTrack ? item.scheduleTrackingInfo.time.toLowerCase() : ``}`.includes(searchQuery.toLowerCase()))
    }
}

export const utils = new Utils();
