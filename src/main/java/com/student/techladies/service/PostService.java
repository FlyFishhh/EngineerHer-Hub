package com.student.techladies.service;

import com.student.techladies.common.*;
import com.student.techladies.model.Comment;
import com.student.techladies.model.Message;
import com.student.techladies.model.Notice;
import com.student.techladies.model.Post;

import java.text.ParseException;
import java.util.List;

/**
 * @ClassName PostService
 * @Description TODO
 * @Author sandy.sun
 * @Date 2024/4/12 22:31
 * @Version 1.0
 */
public interface PostService {
    List<PostResponse> serachPost(PostRequest request);

    Post add(PostRequest request) ;

    void likeAndFocus(LikeRequest request);

    void comment(Comment request);

    List<CommentResult> getComment(Comment request);

    NoticeResult notice(PostRequest request);

    void sendMessage(Message request);

    List<MessageDto> getMessage(Integer fromId);

    void focus(LikeRequest request);

    List<PostResponse> postAndCollection(PostAndCollectionRequest request);

    PostResponse getPost(int id);

    List<MessageDto> getMessageList();

    void saveComment(Comment request);

    void seeNotice(Notice request);
}
