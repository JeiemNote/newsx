package ru.pavel.newsx.services

import org.springframework.stereotype.Service
import ru.pavel.newsx.models.post.PostModel
import ru.pavel.newsx.models.post.PostRegistration
import ru.pavel.newsx.models.post.PostResponse
import ru.pavel.newsx.models.post.toPostResponse
import ru.pavel.newsx.repositories.PostModelRepository
import ru.pavel.newsx.repositories.UserModelRepository
import java.time.LocalDateTime


@Service

class PostModelService(
        private val postModelRepository: PostModelRepository,
        private val userModelRepository: UserModelRepository
) {
    fun addPost(postRegistration: PostRegistration) {
        val post = PostModel(
                username = postRegistration.username,
                postTittle = postRegistration.postTittle,
                postBody = postRegistration.postBody)
        val date = LocalDateTime.now()
        post.postDate = date
        val user = userModelRepository.getIdByUsername(postRegistration.username)
        post.author = user

        postModelRepository.save(post)
    }
    fun getAllPosts(): List<PostResponse> {
        return postModelRepository.findAll().map { it.toPostResponse() }
    }

    fun editPost(id: Long, postRegistration: PostRegistration){
        val test = postModelRepository.getOne(id)
        test.postTittle = postRegistration.postTittle
        test.postBody = postRegistration.postBody
        postModelRepository.save(test)


    }

    fun DelPostById(id:Long) = postModelRepository.deleteById(id)


}