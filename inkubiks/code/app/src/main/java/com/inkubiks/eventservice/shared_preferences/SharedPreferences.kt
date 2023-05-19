package com.inkubiks.eventservice.shared_preferences

interface SharedPreferences {

    var scheduledEvents: HashSet<String>?
    var recommendedFeed: HashSet<String>?
    var homeProfile: String

}