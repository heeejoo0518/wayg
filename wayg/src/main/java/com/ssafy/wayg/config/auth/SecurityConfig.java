package com.ssafy.wayg.config.auth;

import com.ssafy.wayg.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .authorizeRequests()
                .antMatchers("/", "/css/**", "/images/**", "/js/**", "/h2-console/**", "/profile").permitAll()
                .antMatchers("/api/v1/**").hasRole(Role.USER.name()) //USER 권한 가진 사람만 가능 -> 로그인 후 기능 url 넣어야함
                .anyRequest().authenticated() //설정값 이외의 url은 인증 완료한 사용자만이 사용가능함
                .and()
                .logout()
                .logoutSuccessUrl("/") // 로그아웃 성공시 /로 이동
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService); //로그인 성공 시 후속 조치 진행 구현체
    }
}