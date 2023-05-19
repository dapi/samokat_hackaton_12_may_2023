package com.inkubiks.eventservice.models.profile

enum class Status(val value: String) {
    ONLINE("Онлайн"),
    ON_HOLIDAY("В отпуске"),
    ON_CALL("На созвоне"),
    OFFLINE("Не в сети")
}
