package com.student.techladies.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @ClassName MessageDto
 * @Description TODO
 * @Author dunmin
 * @Date 2024/4/14 23:37
 * @Version 1.0
 */
@Data
public class MessageDto {

    private int id;
    private String name ;
    private int userId ;
    private String message ;
    private String imgUrl ;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime ;

}
