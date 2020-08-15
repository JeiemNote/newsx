package ru.pavel.newsx.models.user

import com.fasterxml.jackson.annotation.JsonProperty
import ru.pavel.newsx.models.role.Role
import ru.pavel.newsx.models.post.PostModel
import javax.persistence.*

@Entity
@Table(name="users")

class UserModel (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        @Column(name="username")
        val username: String,
        @Column(name="email")
        val email:String,
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        @Column(name="password")
        val password:String
){
        @ManyToMany(fetch = FetchType.EAGER)
        @JoinTable(name = "user_roles", joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
                inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")])
        lateinit var roles: List<Role>

        @OneToMany(mappedBy = "author", cascade = [CascadeType.ALL], orphanRemoval = true)
        lateinit var posts: List<PostModel>
}