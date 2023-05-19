package com.inkubiks.eventservice.shared_preferences

import android.app.Application
import android.content.Context

class SharedPreferencesImpl(
    private val application: Application
) : SharedPreferences {

    private val prefs: android.content.SharedPreferences by lazy {
        application.applicationContext.getSharedPreferences(
            PREFS_EVENT_SERVICE,
            Context.MODE_PRIVATE
        )
    }

    override var scheduledEvents: HashSet<String>?
        get() = prefs.getStringSet(SCHEDULED_EVENTS, setOf())?.toHashSet()
        set(value) = prefs.edit()
            .putStringSet(SCHEDULED_EVENTS, value)
            .apply()

    override var recommendedFeed: HashSet<String>?
        get() = prefs.getStringSet(RECOMMENDED_FEED, setOf())?.toHashSet()
        set(value) = prefs.edit()
            .putStringSet(RECOMMENDED_FEED, value)
            .apply()

    override var homeProfile: String
        get() = prefs.getString(HOME_PROFILE, "").orEmpty()
        set(value) = prefs.edit()
            .putString(HOME_PROFILE, value)
            .apply()


    private companion object {
        const val PREFS_EVENT_SERVICE = "prefs_event_service"
        const val SCHEDULED_EVENTS = "scheduled_events"
        const val RECOMMENDED_FEED = "recommended_feed"
        const val HOME_PROFILE = "home_profile"
    }
}
