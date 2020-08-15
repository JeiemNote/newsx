package ru.pavel.newsx.security

import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import ru.pavel.newsx.security.SecurityConstants.Companion.TOKEN_HEADER
import ru.pavel.newsx.security.SecurityConstants.Companion.TOKEN_PREFIX
import ru.pavel.newsx.services.UserDetailServiceImplement
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthorizationFilter (authenticationManager: AuthenticationManager)
    : BasicAuthenticationFilter(authenticationManager) {

    @Autowired
    private lateinit var userDetailsServiceImpl: UserDetailServiceImplement

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val header: String? = request.getHeader(TOKEN_HEADER)
        if (header.isNullOrBlank() || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response)
            return
        }
        val authentication: UsernamePasswordAuthenticationToken? = getAuthentication(header)
        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(request, response)
    }

    private fun getAuthentication(header: String): UsernamePasswordAuthenticationToken? {
        val claims = Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET_KEY)
                .parseClaimsJws(header.replace(TOKEN_PREFIX,"")).body
        return try {
            val user = userDetailsServiceImpl.loadUserByUsername(username=claims.subject)
            UsernamePasswordAuthenticationToken(user, null, user.authorities)
        }catch (e: Exception) {
            null
        }
    }
}