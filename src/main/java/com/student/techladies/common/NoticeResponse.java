package com.student.techladies.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @ClassName NoticeResponse
 * @Description TODO
 * @Author sandy.sun
 * @Date 2024/4/16 00:22
 * @Version 1.0
 */
@Data
public class NoticeResponse {

    private int postId ;

    private int userId;

    private String name ;

    private String imgUrl;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime ;

    private String content ;

}
