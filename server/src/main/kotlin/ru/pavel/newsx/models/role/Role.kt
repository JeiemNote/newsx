package ru.pavel.newsx.models.role

import javax.persistence.*

@Entity
@Table(name = "roles")
class Role(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

        @Enumerated(EnumType.STRING)
        @Column(name = "role_name")
        val roleName: RoleName
)
