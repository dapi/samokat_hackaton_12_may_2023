package com.inkubiks.eventservice.models.profile

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Profile(
    val id: String,
    val name: String,
    val avatar: Int? = null,
    val status: String = Status.OFFLINE.value,
    val city: String,
    val points: Int,
    val isTeamLead: Boolean = false,
    val department: String,
    val position: String,
    val experience: String,
    val team: List<Profile>,
    val friends: List<Profile>,
    val isGuest: Boolean = false,
    val interests: List<Interest>
) : Parcelable
