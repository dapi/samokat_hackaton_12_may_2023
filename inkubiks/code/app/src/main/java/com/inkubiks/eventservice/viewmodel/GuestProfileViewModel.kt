package com.inkubiks.eventservice.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.inkubiks.eventservice.models.profile.Profile

class GuestProfileViewModel : ViewModel() {

    private var _guestProfile = MutableLiveData<Profile>()
    val questProfile: LiveData<Profile> = _guestProfile

    fun setData(profile: Profile) {
        _guestProfile.postValue(profile)
    }

}
