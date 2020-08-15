package ru.pavel.newsx.security

class SecurityConstants {
    companion object {
        const val ADMIN_USERNAME = "jeiemnote"
        const val ADMIN_PASSWORD = "test123"
        const val ADMIN_EMAIL = "test@yandex.ru"
        const val SIGN_UP_URL = "/api/reg"
        const val TOKEN_PREFIX = "JWT"
        const val SECRET_KEY = "SECRET"
        const val TOKEN_DURATION:Long = 10 //days
        const val TOKEN_HEADER = "Authorization"
    }
}