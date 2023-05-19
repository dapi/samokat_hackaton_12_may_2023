package com.inkubiks.eventservice.models.profile

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Interest(
    val id: String,
    val name: String,
    val selected: Boolean = false,
) : Parcelable
