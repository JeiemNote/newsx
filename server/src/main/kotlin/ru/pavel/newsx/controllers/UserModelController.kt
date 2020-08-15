package ru.pavel.newsx.controllers


import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.pavel.newsx.models.post.PostRegistration
import ru.pavel.newsx.models.post.PostResponse
import ru.pavel.newsx.models.user.UserModel
import ru.pavel.newsx.models.user.UserRegistration
import ru.pavel.newsx.services.UserModelService
import ru.pavel.newsx.services.PostModelService
import javax.ws.rs.BadRequestException


@RestController
@RequestMapping("/api")

class UserModelController(
        private val userModelService: UserModelService,
        private val postModelService: PostModelService
) {
    @GetMapping("/all")
    fun listUsers(): ResponseEntity<MutableList<UserModel>> {
        return ResponseEntity(userModelService.getAllUsers(), HttpStatus.OK)
    }

    @PostMapping("/reg")
    fun reg(@RequestBody userRegistration: UserRegistration): ResponseEntity<String> {
        return try {
            userModelService.registr(userRegistration)
            ResponseEntity("good", HttpStatus.OK)
        } catch (e: BadRequestException) {
            ResponseEntity("error", HttpStatus.BAD_REQUEST)
        }

    }

    @PostMapping("/home/add")
    fun addPost(@RequestBody postRegistration: PostRegistration): ResponseEntity<*> {
        println("${postRegistration}")
        postModelService.addPost(postRegistration)
        return ResponseEntity("GOOD", HttpStatus.OK)
    }
    @PutMapping("/home/edit/{id}")
    fun editPost(@PathVariable id: Long, @RequestBody postRegistration: PostRegistration): ResponseEntity<String> {
        postModelService.editPost(id, postRegistration)
        return ResponseEntity("good", HttpStatus.OK)
    }

    @GetMapping("/home/get")
    fun listPostsByUser(): ResponseEntity<List<PostResponse>> {
        return ResponseEntity(postModelService.getAllPosts(), HttpStatus.OK)
    }

    @DeleteMapping("/home/del/{id}")
    fun DelPostById(@PathVariable id:Long): ResponseEntity<Unit> {
        println(id)
        return ResponseEntity(postModelService.DelPostById(id), HttpStatus.OK)
    }
}
