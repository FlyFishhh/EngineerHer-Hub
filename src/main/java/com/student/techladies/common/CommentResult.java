package com.student.techladies.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

/**
 * @ClassName CommentResult
 * @Description TODO
 * @Author dunmin
 * @Date 2024/4/14 21:38
 * @Version 1.0
 */
@Data
public class CommentResult {

    private String name ;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime ;

    private String imgUrl ;

    private int id ;

    private String content ;

    private int postId ;

    private int userId ;

    private Integer toUserId ;
    private String toUserName ;
    private String toUserImage;
    private List<CommentResult> child ;
    private int parentId ;


}
