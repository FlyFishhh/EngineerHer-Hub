package com.student.techladies.model;

import com.student.techladies.common.PostResponse;
import lombok.Data;

import java.util.List;

/**
 * @ClassName UserDto
 * @Description TODO
 * @Author sandy.sun
 * @Date 2024/4/13 23:31
 * @Version 1.0
 */
@Data
public class UserDto extends User{

    private int focusNum ;

    private List<User> focusList ;

    private List<User> fansList ;

    private List<PostResponse> postList;

    private List<PostResponse> collectionList ;

    private int focusFlag ;

}
