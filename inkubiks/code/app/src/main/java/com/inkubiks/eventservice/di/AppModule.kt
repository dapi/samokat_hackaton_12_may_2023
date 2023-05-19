package com.inkubiks.eventservice.di

import com.inkubiks.eventservice.MainViewModel
import com.inkubiks.eventservice.shared_preferences.SharedPreferences
import com.inkubiks.eventservice.shared_preferences.SharedPreferencesImpl
import com.inkubiks.eventservice.viewmodel.GuestProfileViewModel
import com.inkubiks.eventservice.viewmodel.HomeViewModel
import com.inkubiks.eventservice.viewmodel.ProfileViewModel
import org.koin.android.ext.koin.androidApplication
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.dsl.module


val appModule = module {

    factory<SharedPreferences> { SharedPreferencesImpl(androidApplication()) }
    viewModel { MainViewModel() }
    viewModel { HomeViewModel() }
    viewModel { ProfileViewModel() }
    viewModel { GuestProfileViewModel() }
}
