package com.student.techladies.common;

import lombok.Data;

import java.util.List;

/**
 * @ClassName NoticeResult
 * @Description TODO
 * @Author dunmin
 * @Date 2024/4/14 21:40
 * @Version 1.0
 */
@Data
public class NoticeResult {

    private int likes ;

    private int collections ;

    private int fans ;

    private int comments ;

    private List<NoticeResponse> likeList ;

    private List<NoticeResponse> collectionList ;

    private List<NoticeResponse> fanList ;

    private List<NoticeResponse> commentList ;
}
