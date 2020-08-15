package ru.pavel.newsx.models.post

import org.springframework.data.annotation.CreatedDate
import ru.pavel.newsx.models.user.UserModel
import java.time.LocalDateTime
import javax.persistence.*


@Entity
@Table(name = "posts")
class PostModel(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        @Column(name = "username")
        val username: String,

        @Column(name = "postTittle")
        var postTittle: String,

        @Column(name = "postBody", length = 2044)
        var postBody: String
) {

    @CreatedDate
    @Column(name = "date")
    lateinit var postDate: LocalDateTime

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    lateinit var author: UserModel
}

fun PostModel.toPostResponse() = PostResponse(id, postTittle, postBody, postDate, author.username)