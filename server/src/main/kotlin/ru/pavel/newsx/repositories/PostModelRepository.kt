package ru.pavel.newsx.repositories

import org.springframework.data.jpa.repository.JpaRepository
import ru.pavel.newsx.models.post.PostModel
import ru.pavel.newsx.models.user.UserModel
import java.util.*


interface PostModelRepository : JpaRepository<PostModel, Long> {
    fun findByUsername(username: String): PostModel
    fun findPostModelsByAuthor(author: UserModel): Optional<PostModel>

}