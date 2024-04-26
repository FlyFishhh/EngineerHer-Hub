package com.student.techladies.controller;

import com.student.techladies.common.*;
import com.student.techladies.model.Comment;
import com.student.techladies.model.Message;
import com.student.techladies.model.Notice;
import com.student.techladies.model.Post;
import com.student.techladies.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @ClassName PostController
 * @Description TODO
 * @Author dunmin
 * @Date 2024/4/12 22:34
 * @Version 1.0
 */
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService postService ;

    @PostMapping("search")
    public BaseResponse serachPost(@RequestBody PostRequest request){
        BaseResponse result = new BaseResponse();
        List<PostResponse> list = postService.serachPost(request);
        result.setCode(200);
        result.setData(list);
        return result ;
    }

    @PostMapping("postAndCollection")
    public BaseResponse postAndCollection(@RequestBody PostAndCollectionRequest request){
        BaseResponse result = new BaseResponse();
        List<PostResponse> list = postService.postAndCollection(request);
        result.setCode(200);
        result.setData(list);
        return result ;
    }

    @PostMapping("add")
    public BaseResponse add(@RequestBody PostRequest request){
        BaseResponse result = new BaseResponse();
        Post p =postService.add(request);
        result.setCode(200);
        result.setData(p);
        return result ;
    }
    @GetMapping("getPost/{id}")
    public BaseResponse getPost(@PathVariable("id") int id){
        BaseResponse result = new BaseResponse();
        PostResponse response = postService.getPost(id);
        result.setCode(200);
        result.setData(response);
        return result ;
    }


    @PostMapping("collectionAndlike")
    public BaseResponse likeAndFocus(@RequestBody LikeRequest request){
        BaseResponse result = new BaseResponse();
        postService.likeAndFocus(request);
        result.setCode(200);
        return result ;
    }

    @PostMapping("focus")
    public BaseResponse focus(@RequestBody LikeRequest request){
        BaseResponse result = new BaseResponse();
        postService.focus(request);
        result.setCode(200);
        return result ;
    }


    @PostMapping("comment")
    public BaseResponse getComment(@RequestBody Comment request){
        BaseResponse result = new BaseResponse();
        postService.saveComment(request);
        result.setCode(200);
        return result ;
    }
    @PostMapping("notice")
    public BaseResponse notice(@RequestBody PostRequest request){
        BaseResponse result = new BaseResponse();
        NoticeResult list = postService.notice(request);
        result.setCode(200);
        result.setData(list);
        return result ;
    }

    @PostMapping("sendMessage")
    public BaseResponse sendMessage(@RequestBody Message request){
        BaseResponse result = new BaseResponse();
        postService.sendMessage(request);
        result.setCode(200);
        return result ;
    }
    @PostMapping("seeNotice")
    public BaseResponse seeNotice(@RequestBody Notice request){
        BaseResponse result = new BaseResponse();
        postService.seeNotice(request);
        result.setCode(200);
        return result ;
    }
    /***
     *  list message
     *
     *  xiangqingliebiao
     *
     * @param
     * @return
     */
    @GetMapping ("getMessage/{fromId}")
    public BaseResponse getMessage(@PathVariable("fromId")int fromId){
        BaseResponse result = new BaseResponse();
        List<MessageDto> list = postService.getMessage(fromId);
        result.setCode(200);
        result.setData(list);
        return result ;
    }

    @PostMapping("getMessageList")
    public BaseResponse getMessageList(){
        BaseResponse result = new BaseResponse();
        List<MessageDto> list = postService.getMessageList();
        result.setCode(200);
        result.setData(list);
        return result ;
    }
    @PostMapping("noticeInfo")
    public BaseResponse noticeInfo(@RequestBody PostRequest request){
        BaseResponse result = new BaseResponse();
        List<PostResponse> list = postService.serachPost(request);
        result.setCode(200);
        result.setData(list);
        return result ;
    }

}
