package com.student.techladies.service.impl;

import com.student.techladies.common.*;
import com.student.techladies.confog.TokenInterceptor;
import com.student.techladies.mapper.*;
import com.student.techladies.model.*;
import com.student.techladies.model.Collection;
import com.student.techladies.service.PostService;
import com.student.techladies.utils.DateUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.*;

/**
 * @ClassName PostServiceImpl
 * @Description TODO
 * @Author sandy.sun
 * @Date 2024/4/12 22:32
 * @Version 1.0
 */
@Service
public class PostServiceImpl implements PostService {

    @Resource
    PostMapper postMapper ;

    @Resource
    UserMapper userMapper ;

    @Resource
    FoucusMapper foucusMapper ;

    @Resource
    CommentMapper commentMapper ;

    @Resource
    NoticeMapper noticeMapper ;

    @Resource
    MessageMapper messageMapper ;

    @Resource
    CollectionMapper collectionMapper ;

    @Resource
    LikeMapper likeMapper ;

    @Override
    public List<PostResponse> serachPost(PostRequest request) {
        List<PostResponse> responses = new ArrayList<>();
        List<Post> list = postMapper.selectBycondition(request.getContent(),request.getType(),null);
        list.stream().forEach(c->{
            User u = userMapper.selectByPrimaryKey(c.getUserId());
            PostResponse  p = new PostResponse();
            BeanUtils.copyProperties(c,p);
            p.setImgUrl(u.getImgUrl());
            if(u.getImgUrl()==null || "".equals(u.getImgUrl())){
                p.setImages(new ArrayList<>());
            } else {
                p.setImages(Arrays.asList(c.getImgUrl().split(",")));

            }
            p.setName(u.getName());
            p.setPostId(c.getId());
            p.setUserId(c.getUserId());
            p.setCreateTime(c.getCreateTime());
            p.setCollections(c.getFocus());
            if(TokenInterceptor.getToken()==null || "".equals(TokenInterceptor.getToken())){
                p.setCollectionFlag("0");
                p.setLikeFlag("0");
            } else {
                int collectionFlag = collectionMapper.selectNum(Integer.parseInt(TokenInterceptor.getToken()),p.getPostId() );
                int likesFlag = likeMapper.selectNum(Integer.parseInt(TokenInterceptor.getToken()),p.getPostId());
                p.setCollectionFlag(collectionFlag+"");
                p.setLikeFlag(likesFlag+"");
            }
            responses.add(p);
        });
        return responses;
    }

    @Override
    public Post add(PostRequest request) {
        Post post = new Post() ;
        post.setUserId(Integer.parseInt(TokenInterceptor.getToken()));
        post.setContent(request.getContent());
        post.setType(request.getType());
        post.setTag("");
        post.setCreateTime(DateUtils.getUSDate());
        post.setFocus(0);
        post.setLikes(0);
        post.setForwards(0);
        post.setComments(0);
        post.setImgUrl(request.getImgUrl());
        int id = postMapper.insert(post);
        post.setId(id);
        return post ;
    }

    @Override
    public PostResponse getPost(int id) {

        PostResponse response = new PostResponse() ;
        Post post = postMapper.selectByPrimaryKey(id) ;
        BeanUtils.copyProperties(post,response);
        if(post.getImgUrl()==null || "".equals(post.getImgUrl())){
            response.setImages(new ArrayList<>());
        } else {
            response.setImages(Arrays.asList(post.getImgUrl().split(",")));
        }
        List<CommentResult> commentList = commentMapper.selectInfoByPostId(id) ;
        if(commentList==null){
            commentList = new ArrayList<>() ;
        }else{
            commentList.stream().forEach(c->{
                User u = userMapper.selectByPrimaryKey(c.getUserId());
                c.setImgUrl(u.getImgUrl());
                c.setName(u.getName());
                List<CommentResult> child = commentMapper.selectChildInfoByPostId(id,c.getId()) ;
                child.stream().forEach(f->{
                    User d = userMapper.selectByPrimaryKey(f.getUserId());
                    f.setImgUrl(d.getImgUrl());
                    f.setName(d.getName());
                    f.setParentId(c.getId());
                    User df = userMapper.selectByPrimaryKey(f.getToUserId());
                    f.setToUserImage(df.getImgUrl());
                    f.setToUserName(df.getName());
                });
                c.setChild(child);
            });
        }
        response.setCommentList(commentList);
        response.setCollections(post.getFocus());
        int likeNUM = likeMapper.selectNum(Integer.parseInt(TokenInterceptor.getToken()),post.getId());
        int colNUM = collectionMapper.selectNum(Integer.parseInt(TokenInterceptor.getToken()),post.getId());
        response.setLikeFlag(likeNUM+"");
        response.setCollectionFlag(colNUM+"");
        response.setPostId(post.getId());
        User u = userMapper.selectByPrimaryKey(post.getUserId());
        response.setImgUrl(u.getImgUrl());
        response.setName(u.getName());
        return response;
    }




    @Override
    public void likeAndFocus(LikeRequest request) {
        String userId = TokenInterceptor.getToken() ;
        if(Objects.equals(request.getType(),"like")){
            int num = likeMapper.selectCount(Integer.parseInt(userId),request.getId());
            if(num==0){
                Like like = new Like();
                like.setLikeId(request.getId());
                like.setUserId(Integer.parseInt(userId));
                like.setCreateTime(DateUtils.getUSDate());

                likeMapper.insertSelective(like);
                postMapper.updateLikeNum(request.getId(),"add") ;

                Notice notice = new Notice() ;
                notice.setContent(""+request.getId());
                notice.setType("like");
                notice.setUserId(Integer.parseInt(userId));
                notice.setCreateTime(DateUtils.getUSDate());
                notice.setStatus("0");
                noticeMapper.insert(notice);

            }else{
                likeMapper.deleteByPId(Integer.parseInt(userId),request.getId()) ;
                postMapper.updateLikeNum(request.getId(),"jian") ;
                noticeMapper.delete("like",""+request.getId(),Integer.parseInt(userId));

            }
        }else if (Objects.equals(request.getType(),"collection")){
            int co = collectionMapper.selectCountByUserIdAndId(Integer.parseInt(userId),request.getId());
            if(co==0){
                Collection c = new Collection() ;
                c.setCreateTime(DateUtils.getUSDate());
                c.setUserId(Integer.parseInt(TokenInterceptor.getToken()));
                c.setPostId(request.getId());
                collectionMapper.insert(c) ;
                postMapper.updateCollectionNum(request.getId(),"add") ;

                Notice notice = new Notice() ;
                notice.setContent(""+request.getId());
                notice.setType("collection");
                notice.setStatus("0");
                notice.setUserId(Integer.parseInt(userId));
                notice.setCreateTime(DateUtils.getUSDate());
                noticeMapper.insert(notice);
            }else{
                collectionMapper.deleteByPId(Integer.parseInt(userId),request.getId()) ;
                postMapper.updateCollectionNum(request.getId(),"jian") ;
                noticeMapper.delete("collection",""+request.getId(),Integer.parseInt(userId));
            }
        }
    }



    /**
     * private int likes ;
     *
     *     private int collections ;
     *
     *     private int fans ;
     *
     *     private int comments ;
     *
     *     private List<NoticeResponse> likeList ;
     *
     *     private List<NoticeResponse> collectionList ;
     *
     *     private List<NoticeResponse> fanList ;
     *
     *     private List<NoticeResponse> commentList ;
     *
     * @param request
     * @return
     */
    @Override
    public NoticeResult notice(PostRequest request) {
        NoticeResult result = new NoticeResult() ;
        String userId = TokenInterceptor.getToken() ;

        int likeNum = noticeMapper.selectCountByUserId(Integer.parseInt(userId),"like");
        result.setLikes(likeNum);

        int focusNum = noticeMapper.selectCount(Integer.parseInt(userId),"focus");
        result.setFans(focusNum);
        int comments = noticeMapper.selectCountByUserId(Integer.parseInt(userId),"comment");
        result.setComments(comments);
        int collections = noticeMapper.selectCountByUserId(Integer.parseInt(userId),"collection") ;
        result.setCollections(collections);

        List<NoticeResponse> like = noticeMapper.selectlikeInfoByUserId(Integer.parseInt(userId),"like");
        like.stream().forEach(l->{
            User u = userMapper.selectByPrimaryKey(l.getUserId());
            Post p = postMapper.selectByPrimaryKey(l.getPostId());
            l.setName(u.getName());
            l.setImgUrl(u.getImgUrl());
            l.setContent(u.getName()+"  sent a like to your post:"+p.getContent());
        });
        result.setLikeList(like);
        List<NoticeResponse> foucus = noticeMapper.selectfoucusInfoByUserId(Integer.parseInt(userId),"focus");
        foucus.stream().forEach(l->{
            User u = userMapper.selectByPrimaryKey(l.getUserId());
            Post p = postMapper.selectByPrimaryKey(l.getPostId());
            l.setName(u.getName());
            l.setImgUrl(u.getImgUrl());
            l.setContent(u.getName()+" followed you.");
        });
        result.setFanList(foucus);
        List<NoticeResponse> comment = noticeMapper.selectcommentInfoByUserId(Integer.parseInt(userId),"comment");
        comment.stream().forEach(l->{
            User u = userMapper.selectByPrimaryKey(l.getUserId());
            Post p = postMapper.selectByPrimaryKey(l.getPostId());
            l.setName(u.getName());
            l.setImgUrl(u.getImgUrl());
            l.setContent(u.getName()+" commented on your："+p.getContent());
        });
        result.setCommentList(comment);
        List<NoticeResponse> collection = noticeMapper.selectcollectionInfoByUserId(Integer.parseInt(userId),"collection");
        collection.stream().forEach(l->{
            User u = userMapper.selectByPrimaryKey(l.getUserId());
            Post p = postMapper.selectByPrimaryKey(l.getPostId());
            l.setName(u.getName());
            l.setImgUrl(u.getImgUrl());
            l.setContent(u.getName()+" bookmarks your post："+p.getContent());
        });
        result.setCollectionList(collection);

        return result;
    }

    @Override
    public void sendMessage(Message request) {
        request.setCreateTime(DateUtils.getUSDate());
        messageMapper.insert(request);
    }

    @Override
    public List<MessageDto> getMessage(Integer fromId) {
        List<MessageDto> fd = messageMapper.selectInfoById(Integer.parseInt(TokenInterceptor.getToken()),fromId) ;
        return fd;
    }

    @Override
    public List<MessageDto> getMessageList() {
        List<MessageDto> result = new ArrayList<>() ;
        Map<String,String> map = new HashMap<>() ;
        List<Message> message = messageMapper.selectOwnerMessageListByUserId(Integer.parseInt(TokenInterceptor.getToken()));
        if(!CollectionUtils.isEmpty(message)){
            message.stream().forEach(m->{
                if(StringUtils.isEmpty(map.get(m.getFromId()+"-"+m.getToId()))){
                    MessageDto mm = new MessageDto() ;
                    BeanUtils.copyProperties(m,mm);
                    User u = userMapper.selectByPrimaryKey(m.getFromId());
                    mm.setImgUrl(u.getImgUrl());
                    mm.setName(u.getName());
                    mm.setUserId(m.getFromId());
                    result.add(mm);
                    map.put(m.getFromId()+"-"+m.getToId(),m.getFromId()+"-"+m.getToId());
                }
            });
        }
        return result;
    }



    @Override
    public void focus(LikeRequest request) {
        int userId = Integer.parseInt(TokenInterceptor.getToken());
        int num = foucusMapper.selectCountByIdd(userId,request.getId());

        if( num == 0 ){
            Foucus foucus = new Foucus() ;
            foucus.setFocusId(Integer.parseInt(TokenInterceptor.getToken()));
            foucus.setUserId(request.getId()) ;
            foucus.setCreateTime(DateUtils.getUSDate());
            foucusMapper.insert(foucus) ;


            Notice notice = new Notice() ;
            notice.setContent(""+userId);
            notice.setType("focus");
            notice.setUserId(request.getId());
            notice.setCreateTime(DateUtils.getUSDate());
            notice.setStatus("0");
            noticeMapper.insert(notice);

        } else {
            foucusMapper.deleteByd(userId,request.getId()) ;
            noticeMapper.delete("focus",""+userId,request.getId());
        }
    }

    @Override
    public List<PostResponse> postAndCollection(PostAndCollectionRequest request) {
        List<PostResponse> responses = new ArrayList<>();
        List<Post> list = postMapper.postAndCollection(request.getType(),Integer.parseInt(TokenInterceptor.getToken()));
        list.stream().forEach(c->{
            User u = userMapper.selectByPrimaryKey(c.getUserId());
            PostResponse p = new PostResponse();
            BeanUtils.copyProperties(c,p);
            p.setImgUrl(u.getImgUrl());
            p.setImages(Arrays.asList(c.getImgUrl().split(",")));
            p.setName(u.getName());
            responses.add(p);
        });
        return responses;
    }






    /**
     * Add a new comment
     * @param request
     */
    @Override
    public void comment(Comment request) {
        String userId = TokenInterceptor.getToken() ;
        request.setCreateTime(DateUtils.getUSDate());
        request.setUserId(Integer.parseInt(userId));
        request.setLikes(0);
        commentMapper.insert(request);
    }

    /**
     * Get the comments list
     * @param request
     * @return
     */
    @Override
    public List<CommentResult> getComment(Comment request) {
        List<CommentResult> results = new ArrayList<>() ;
        results = commentMapper.selectInfoByPostId(request.getPostId()) ;
        return results;
    }


    /**
     * Save the comment info into notification
     * @param request
     */
    @Override
    public void saveComment(Comment request) {
        request.setCreateTime(DateUtils.getUSDate());
        request.setUserId(Integer.parseInt(TokenInterceptor.getToken()));
        if(request.getParentId()==null){
            request.setParentId(0);
        }
        commentMapper.insert(request);
        postMapper.addCommentNum(request.getPostId());
        Notice notice = new Notice() ;
        notice.setType("comment");
        notice.setCreateTime(DateUtils.getUSDate());
        notice.setUserId(Integer.parseInt(TokenInterceptor.getToken()));
        notice.setContent(request.getPostId()+"");
        notice.setStatus("0");
        noticeMapper.insert(notice);
    }

    @Override
    public void seeNotice(Notice request) {
        if(request.getType().equals("focus")){
            noticeMapper.deleteby(Integer.parseInt(TokenInterceptor.getToken()),request.getType());
        } else {
            noticeMapper.deleteByPostId(Integer.parseInt(TokenInterceptor.getToken()),request.getType());
        }
    }
}
