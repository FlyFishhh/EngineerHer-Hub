package com.student.techladies.common;

import lombok.Data;

/**
 * @ClassName BaseResponse
 * @Description TODO
 * @Author sandy.sun
 * @Date 2024/4/12 12:06
 * @Version 1.0
 */
@Data
public class BaseResponse {

    private String message ;

    private int code ;

    private Object data ;
}
