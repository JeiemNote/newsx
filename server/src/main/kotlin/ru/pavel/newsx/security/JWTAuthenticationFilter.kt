package ru.pavel.newsx.security

import com.fasterxml.jackson.databind.ObjectMapper
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.boot.configurationprocessor.json.JSONObject
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import ru.pavel.newsx.models.user.UserCredentials
import ru.pavel.newsx.security.SecurityConstants.Companion.TOKEN_PREFIX
import java.time.ZonedDateTime
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthenticationFilter(private val authManager: AuthenticationManager):
        UsernamePasswordAuthenticationFilter()  {
    override fun attemptAuthentication(request: HttpServletRequest?, response: HttpServletResponse?): Authentication {
        try {
            val user: UserCredentials = ObjectMapper().readValue(request?.inputStream, UserCredentials::class.java)
            return authManager.authenticate(UsernamePasswordAuthenticationToken(user.username, user.password))
        }catch (e: Exception){
            throw AuthenticationCredentialsNotFoundException(e.message)
        }
    }

    override fun successfulAuthentication(request: HttpServletRequest?, response: HttpServletResponse?, chain: FilterChain?, authResult: Authentication?) {
        val token = TOKEN_PREFIX + Jwts.builder()
                .setSubject((authResult?.principal as User).username)
                .setIssuedAt(Date(System.currentTimeMillis()))
                .setExpiration(Date.from(ZonedDateTime.now().plusDays(SecurityConstants.TOKEN_DURATION).toInstant()))
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET_KEY)
                .compact()
        val json = JSONObject()
        json.put("accessToken", token)
        response?.contentType = "application/json"
        response?.characterEncoding = "UTF-8"
        response?.writer?.write(json.toString())
        response?.writer?.flush()
    }
}