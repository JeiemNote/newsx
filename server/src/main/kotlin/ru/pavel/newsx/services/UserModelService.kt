package ru.pavel.newsx.services

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import ru.pavel.newsx.models.role.Role
import ru.pavel.newsx.models.role.RoleName
import ru.pavel.newsx.models.user.UserModel
import ru.pavel.newsx.models.user.UserRegistration
import ru.pavel.newsx.repositories.RoleModelRepository
import ru.pavel.newsx.repositories.UserModelRepository
import javax.ws.rs.BadRequestException

@Service

class UserModelService(
        private val userModelRepository: UserModelRepository,
        private val roleModelRepository: RoleModelRepository,
        private val bCryptPasswordEncoder: BCryptPasswordEncoder
){
    fun getAllUsers(): MutableList<UserModel> {
        return userModelRepository.findAll()
    }
    fun registr(userRegistration: UserRegistration) {
        val user = UserModel(username = userRegistration.username, email = userRegistration.email,
                password = bCryptPasswordEncoder.encode(userRegistration.password))
        val roles: MutableList<Role> = ArrayList()
        roles.add(roleModelRepository.findByRoleName(RoleName.ROLE_USER)
                .orElseThrow { BadRequestException("Ошибка установления прав") })
        user.roles = roles
        userModelRepository.save(user)
    }

}