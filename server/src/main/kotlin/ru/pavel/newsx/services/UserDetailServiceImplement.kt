package ru.pavel.newsx.services

import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import ru.pavel.newsx.repositories.UserModelRepository
import javax.ws.rs.BadRequestException

@Service
//Реализация Службы Подробных Сведений О Пользователе
class UserDetailServiceImplement (private val userModelRepository: UserModelRepository): UserDetailsService{
    override fun loadUserByUsername(username: String?): UserDetails {
        val user = username?.let { userModelRepository.findByUsername(it) }
                ?.orElseThrow { BadRequestException("Пользователя с таким ${username} не существует") }
        return User(user?.username, user?.password, user?.roles?.map { SimpleGrantedAuthority(it.roleName.name) })
    }
}