package bookstore.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

import static org.springframework.security.config.Customizer.withDefaults;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter tokenAuthenticationFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests
        		.requestMatchers(HttpMethod.POST, "/api/books").hasAnyAuthority(ADMIN)
        		.requestMatchers(HttpMethod.PUT, "/api/books/**").hasAnyAuthority(ADMIN)
        		.requestMatchers(HttpMethod.DELETE, "/api/books/**").hasAnyAuthority(USER, ADMIN)
                .requestMatchers(HttpMethod.GET, "/api/books").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/comments").hasAnyAuthority(USER)
                .requestMatchers(HttpMethod.GET, "/api/comments/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/comments/**").hasAnyAuthority(USER, ADMIN)
                .requestMatchers(HttpMethod.GET, "/api/books/**").hasAnyAuthority(ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/orders/checkout").hasAnyAuthority(USER, ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/orders/checkout/**").hasAnyAuthority(USER, ADMIN)
                .requestMatchers("/book/**").hasAuthority(ADMIN)
                .requestMatchers("/api/orders", "/book/**").hasAuthority(ADMIN)
                .requestMatchers("/api/users", "/api/users/**").hasAuthority(ADMIN)
                .requestMatchers("/public/**", "/auth/**").permitAll()
                .requestMatchers("/", "/error", "/csrf").permitAll()
                .anyRequest().authenticated()
            );
        http.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
        http.sessionManagement((session) -> session
        		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    		);
        http.cors(withDefaults()).csrf(csrf -> csrf.disable());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";
}
