package com.student.techladies.common;

import lombok.Data;

/**
 * @ClassName UserRequest
 * @Description TODO
 * @Author dunmin
 * @Date 2024/4/12 12:05
 * @Version 1.0
 */
@Data
public class UserRequest {

    private String email ;

    private String password ;

    private String name ;

    private String code ;
}
