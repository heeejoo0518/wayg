package com.ssafy.wayg.config.auth;

import com.ssafy.wayg.entity.User;
import lombok.Getter;
import org.hibernate.Session;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String name;
    private String email;
    private Integer gender;
    private Integer age;

    public SessionUser(){}
    public SessionUser(User user){
        this.name = user.getUserName();
        this.email = user.getUserEmail();
        this.gender = user.getUserGender();
        this.age = user.getUserAge();
    }
}