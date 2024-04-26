package com.student.techladies.service;

import com.student.techladies.common.BaseResponse;
import com.student.techladies.common.UserRequest;
import com.student.techladies.common.UserType;
import com.student.techladies.model.User;
import com.student.techladies.model.UserDto;

import java.util.List;

/**
 * @ClassName UserService
 * @Description TODO
 * @Author sandy.sun
 * @Date 2024/4/12 22:31
 * @Version 1.0
 */
public interface UserService {
    User save(UserRequest user);

    UserDto findUserById(int id);

    User updateUserById(User user);

    BaseResponse findUserByEmailAndPwd(UserRequest user);

    List<User> getFansOrfocus(UserType user);

    int findUserByEmail(String email);
}
