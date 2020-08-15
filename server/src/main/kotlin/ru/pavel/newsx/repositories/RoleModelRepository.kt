package ru.pavel.newsx.repositories

import org.springframework.data.jpa.repository.JpaRepository
import ru.pavel.newsx.models.role.Role
import ru.pavel.newsx.models.role.RoleName
import java.util.*

interface RoleModelRepository : JpaRepository<Role, Long> {
    fun findByRoleName(roleName: RoleName): Optional<Role>
}