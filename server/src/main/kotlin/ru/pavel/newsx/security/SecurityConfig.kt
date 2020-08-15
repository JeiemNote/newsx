package ru.pavel.newsx.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import ru.pavel.newsx.security.SecurityConstants.Companion.SIGN_UP_URL
import ru.pavel.newsx.services.UserDetailServiceImplement

@Configuration
@EnableWebSecurity
class SecurityConfig(
        private val bCryptPasswordEncoder: BCryptPasswordEncoder,
        private val userDetailServiceImplement: UserDetailServiceImplement
) : WebSecurityConfigurerAdapter() {

    @Bean
    fun jwtAuthorizationFilter(): JWTAuthorizationFilter {
        return JWTAuthorizationFilter(authenticationManager())
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth?.userDetailsService(userDetailServiceImplement)?.passwordEncoder(bCryptPasswordEncoder)
    }

    override fun configure(http: HttpSecurity?) {
        val authFilter = JWTAuthenticationFilter(authenticationManager())
        authFilter.setFilterProcessesUrl("/api/login")
        http?.cors()?.and()?.csrf()?.disable()?.authorizeRequests()
                ?.antMatchers(SIGN_UP_URL)?.permitAll()
                ?.anyRequest()?.authenticated()
                ?.and()
                ?.addFilter(authFilter)
                ?.addFilter(jwtAuthorizationFilter())
                ?.sessionManagement()?.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    }
}
