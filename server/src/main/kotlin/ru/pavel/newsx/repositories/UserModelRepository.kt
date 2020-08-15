package ru.pavel.newsx.repositories

import org.springframework.data.jpa.repository.JpaRepository
import ru.pavel.newsx.models.user.UserModel
import java.util.*

interface UserModelRepository:JpaRepository<UserModel, Long> {
    fun findByEmail(email: String): Optional<UserModel>
    fun findByUsername(username: String): Optional<UserModel>
    fun getIdByUsername(username: String): UserModel
}