package com.inkubiks.eventservice.viewmodel

import androidx.lifecycle.ViewModel
import com.inkubiks.eventservice.R
import com.inkubiks.eventservice.models.profile.Profile
import com.inkubiks.eventservice.models.profile.Status


private val userProfile = Profile(
    id = "1",
    name = "Зарипов Тимур",
    avatar = R.drawable.man1,
    status = Status.ONLINE.value,
    city = "Томск",
    points = 400,
    isTeamLead = false,
    department = "Отдел разработки",
    position = "Android Developer",
    experience = "1 год 9 месяцев",
    team = listOf(
        Profile(
            id = "2",
            name = "Скирневский Игнат",
            avatar = R.drawable.man5,
            status = Status.ONLINE.value,
            city = "Москва",
            points = 400,
            isTeamLead = true,
            department = "Отдел разработки",
            position = "Android Developer",
            experience = "1 год",
            team = listOf(),
            friends = listOf(),
            isGuest = true,
            interests = listOf()
        ),
        Profile(
            id = "7",
            name = "Кривченко Олег",
            avatar = R.drawable.man2,
            status = Status.ONLINE.value,
            city = "Омск",
            points = 400,
            isTeamLead = false,
            department = "Отдел разработки",
            position = "Android Developer",
            experience = "3 года 2 месяца",
            team = listOf(),
            friends = listOf(),
            isGuest = true,
            interests = listOf()
        ),
        Profile(
            id = "15",
            name = "Степанова Мария",
            avatar = R.drawable.woman2,
            status = Status.ON_HOLIDAY.value,
            city = "Москва",
            points = 400,
            isTeamLead = false,
            department = "Отдел разработки",
            position = "Android developer",
            experience = "3 года",
            team = listOf(
                Profile(
                    id = "2",
                    name = "Скирневский Игнат",
                    avatar = R.drawable.man5,
                    status = Status.ONLINE.value,
                    city = "Москва",
                    points = 400,
                    isTeamLead = true,
                    department = "Отдел разработки",
                    position = "Android Developer",
                    experience = "1 год",
                    team = listOf(),
                    friends = listOf(),
                    isGuest = true,
                    interests = listOf()
                ),
                Profile(
                    id = "7",
                    name = "Кривченко Олег",
                    avatar = R.drawable.man2,
                    status = Status.ONLINE.value,
                    city = "Омск",
                    points = 400,
                    isTeamLead = false,
                    department = "Отдел разработки",
                    position = "Android Developer",
                    experience = "3 года 2 месяца",
                    team = listOf(),
                    friends = listOf(),
                    isGuest = true,
                    interests = listOf()
                ),
            ),
            friends = listOf(),
            isGuest = true,
            interests = listOf()
        )
    ),
    friends = listOf(
        Profile(
            id = "9",
            name = "Засланский Узумаки",
            avatar = R.drawable.man3,
            status = Status.ONLINE.value,
            city = "Чебоксары",
            points = 400,
            isTeamLead = false,
            department = "Отдел разработки",
            position = "Backend developer",
            experience = "2 года 5 месяцев",
            team = listOf(),
            friends = listOf(
                Profile(
                    id = "7",
                    name = "Кривченко Олег",
                    avatar = R.drawable.man2,
                    status = Status.ONLINE.value,
                    city = "Омск",
                    points = 400,
                    isTeamLead = false,
                    department = "Отдел разработки",
                    position = "Android Developer",
                    experience = "3 года 2 месяца",
                    team = listOf(),
                    friends = listOf(),
                    isGuest = true,
                    interests = listOf()
                )
            ),
            isGuest = true,
            interests = listOf()
        ),
        Profile(
            id = "9",
            name = "Баркута Казбек",
            avatar = R.drawable.man4,
            status = Status.OFFLINE.value,
            city = "Санкт-Петербург",
            points = 400,
            isTeamLead = true,
            department = "Отдел разработки",
            position = "Backend developer",
            experience = "1 год 1 месяц",
            team = listOf(),
            friends = listOf(),
            isGuest = false,
            interests = listOf()
        ),
        Profile(
            id = "10",
            name = "Кружко Сюзанна",
            avatar = R.drawable.woman1,
            status = Status.ONLINE.value,
            city = "Сочи",
            points = 400,
            isTeamLead = false,
            department = "Отдел маркетинга",
            position = "Маркетолог",
            experience = "6 месяцев",
            team = listOf(),
            friends = listOf(),
            isGuest = true,
            interests = listOf()
        )
    ),
    isGuest = false,
    interests = listOf()
)


class ProfileViewModel: ViewModel() {

    val value = userProfile

}