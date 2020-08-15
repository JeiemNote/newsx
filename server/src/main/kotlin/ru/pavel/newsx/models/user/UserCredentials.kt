package ru.pavel.newsx.models.user

import com.fasterxml.jackson.annotation.JsonProperty

class UserCredentials(
        @JsonProperty("username")
        val username: String,
        @JsonProperty("password")
        val password: String
)
