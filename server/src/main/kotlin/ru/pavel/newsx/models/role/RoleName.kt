package ru.pavel.newsx.models.role

import org.springframework.security.core.GrantedAuthority

enum class RoleName : GrantedAuthority {
    ROLE_USER, ROLE_ADMIN;

    override fun getAuthority(): String {
        return name
    }
}
