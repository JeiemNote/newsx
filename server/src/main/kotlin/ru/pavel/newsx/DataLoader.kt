package ru.pavel.newsx

import org.springframework.context.ApplicationListener
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import ru.pavel.newsx.security.SecurityConstants.Companion.ADMIN_EMAIL
import ru.pavel.newsx.security.SecurityConstants.Companion.ADMIN_PASSWORD
import ru.pavel.newsx.security.SecurityConstants.Companion.ADMIN_USERNAME
import ru.pavel.newsx.models.role.Role
import ru.pavel.newsx.models.role.RoleName
import ru.pavel.newsx.models.user.UserModel
import ru.pavel.newsx.repositories.RoleModelRepository
import ru.pavel.newsx.repositories.UserModelRepository


@Component
class DataLoader(
        private val bCryptPasswordEncoder: BCryptPasswordEncoder,
        private val roleModelRepository: RoleModelRepository,
        private val userModelRepository: UserModelRepository
) : ApplicationListener<ContextRefreshedEvent> {

    private var alreadyLoad: Boolean = false

    @Transactional
    override fun onApplicationEvent(event: ContextRefreshedEvent) {
        if (alreadyLoad) return
        if (userModelRepository.findByUsername(ADMIN_USERNAME).isPresent) {
            alreadyLoad = true; return
        }
        val adminUser = UserModel(username = ADMIN_USERNAME, password = bCryptPasswordEncoder.encode(ADMIN_PASSWORD), email = ADMIN_EMAIL)
        adminUser.roles = createRolesIfNotFound()
        userModelRepository.save(adminUser)
        alreadyLoad = true
        return
    }

    @Transactional
    fun createRolesIfNotFound(): MutableList<Role> {
        val adminRole = roleModelRepository.findByRoleName(RoleName.ROLE_ADMIN)
                .orElse(roleModelRepository.save(Role(roleName = RoleName.ROLE_ADMIN)))
        val userRole = roleModelRepository.findByRoleName(RoleName.ROLE_USER)
                .orElse(roleModelRepository.save(Role(roleName = RoleName.ROLE_USER)))
        val roles: MutableList<Role> = ArrayList()
        roles.add(adminRole)
        roles.add(userRole)
        return roles
    }
}
