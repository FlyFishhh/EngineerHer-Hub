package com.student.techladies.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

/**
 * @ClassName PostResponse
 * @Description TODO
 * @Author dunmin
 * @Date 2024/4/13 00:42
 * @Version 1.0
 */
@Data
public class PostResponse {

    private int postId;
    private int userId ;
    private String imgUrl ;

    private String name ;

    private String content ;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime ;

    private List<String> images ;

    private int likes;

    private int comments ;

    private int collections;

    private String type ;


    private String likeFlag ;

    private String collectionFlag ;


    private List<CommentResult> commentList ;
}
