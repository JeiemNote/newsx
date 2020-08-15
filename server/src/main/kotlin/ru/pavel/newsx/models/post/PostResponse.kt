package ru.pavel.newsx.models.post

import java.time.LocalDateTime

class PostResponse(
        val id: Long,
        val postTitle: String,
        val postBody: String,
        val date: LocalDateTime,
        val author: String
)