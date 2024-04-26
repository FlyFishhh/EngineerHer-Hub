package com.student.techladies.service.impl;

import com.student.techladies.common.BaseResponse;
import com.student.techladies.common.PostResponse;
import com.student.techladies.common.UserRequest;
import com.student.techladies.common.UserType;
import com.student.techladies.confog.TokenInterceptor;
import com.student.techladies.mapper.*;
import com.student.techladies.model.Post;
import com.student.techladies.model.User;
import com.student.techladies.model.UserDto;
import com.student.techladies.service.UserService;
import com.student.techladies.utils.DateUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.swing.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * @ClassName UserserviceImpl
 * @Description TODO
 * @Author dunmin
 * @Date 2024/4/12 22:31
 * @Version 1.0
 */
@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserMapper userMapper ;

    @Resource
    FansMapper fansMapper ;

    @Resource
    FoucusMapper foucusMapper ;

    @Resource
    PostMapper postMapper ;

    @Resource
    CollectionMapper collectionMapper ;

    @Resource
    LikeMapper likeMapper ;

    @Override
    public User save(UserRequest userRequest) {
        User user = new User();
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setCreateTime(DateUtils.getUSDate());
        user.setFansNum(0);
        user.setFlowerNum(0);
        user.setPostNum(0);
        user.setStatus("0");
        user.setName(userRequest.getName());
        userMapper.insert(user);
        return user ;
    }

    @Override
    public UserDto findUserById(int id) {
        User us = userMapper.selectByPrimaryKey(id);
        UserDto dto = new UserDto() ;
        BeanUtils.copyProperties(us,dto);
        int focusNum = foucusMapper.selectfocusCount(id) ;
        int fansNum = foucusMapper.selectfansCount(id) ;

        dto.setFansNum(fansNum);
        dto.setFocusNum(focusNum);

        if(id == Integer.parseInt(TokenInterceptor.getToken())){
            dto.setFocusFlag(0);
        }else{
            int num = foucusMapper.selectCountByIdd(Integer.parseInt(TokenInterceptor.getToken()),id);
            dto.setFocusFlag(num>0?1:0);
        }

        List<User> focusList = userMapper.selectFocusListBy(id);
        if(focusList==null){
            focusList = new ArrayList<>();
        }
        List<User> fansList = userMapper.selectFansListBy(id);
        if(fansList==null){
            fansList = new ArrayList<>();
        }
        List<PostResponse> postList = new ArrayList<>() ;
        List<Post> t  =  postMapper.selectPostListBy(id);
        if(t==null){
            t = new ArrayList<>();
        }
        t.stream().forEach(c->{
            User u = userMapper.selectByPrimaryKey(c.getUserId());
            PostResponse  p = new PostResponse();
            BeanUtils.copyProperties(c,p);
            p.setImgUrl(u.getImgUrl());
            p.setImages(Arrays.asList(c.getImgUrl().split(",")));
            p.setName(u.getName());
            p.setPostId(c.getId());
            p.setUserId(c.getUserId());
            p.setCreateTime(c.getCreateTime());
            p.setCollections(c.getFocus());
            int collectionFlag = collectionMapper.selectNum(Integer.parseInt(TokenInterceptor.getToken()),p.getPostId() );
            int likesFlag = likeMapper.selectNum(Integer.parseInt(TokenInterceptor.getToken()),p.getPostId());
            p.setCollectionFlag(collectionFlag+"");
            p.setLikeFlag(likesFlag+"");
            postList.add(p);
        });
        List<PostResponse> collectionList = new ArrayList<>() ;
        List<Post> ct = postMapper.selectCollectionListBy(id);
        if(ct==null){
            ct = new ArrayList<>();
        }
        ct.stream().forEach(c->{
            User u = userMapper.selectByPrimaryKey(c.getUserId());
            PostResponse  p = new PostResponse();
            BeanUtils.copyProperties(c,p);
            p.setImgUrl(u.getImgUrl());
            p.setImages(Arrays.asList(c.getImgUrl().split(",")));
            p.setName(u.getName());
            p.setPostId(c.getId());
            p.setUserId(c.getUserId());
            p.setCreateTime(c.getCreateTime());
            p.setCollections(c.getFocus());
            int collectionFlag = collectionMapper.selectNum(Integer.parseInt(TokenInterceptor.getToken()),p.getPostId() );
            int likesFlag = likeMapper.selectNum(Integer.parseInt(TokenInterceptor.getToken()),p.getPostId());
            p.setCollectionFlag(collectionFlag+"");
            p.setLikeFlag(likesFlag+"");
            collectionList.add(p);
        });
        dto.setFansList(fansList);
        dto.setFocusList(focusList);
        dto.setPostList(postList);
        dto.setCollectionList(collectionList);
        return dto;
    }

    @Override
    public User updateUserById(User user) {
        userMapper.updateByPrimaryKeySelective(user);
        return user;
    }

    @Override
    public BaseResponse findUserByEmailAndPwd(UserRequest user) {

        BaseResponse base = new BaseResponse() ;
        User u = userMapper.selectByInfoByep(user.getEmail(),user.getPassword());
        if(u==null){
            base.setCode(406);
            base.setMessage("Your password is wrong!");
        } else {
            base.setCode(200);
            base.setData(u);
        }

        return base;
    }

    @Override
    public List<User> getFansOrfocus(UserType user) {


        return userMapper.getFansOrfocus(user.getType(), Integer.parseInt(TokenInterceptor.getToken()));
    }

    @Override
    public int findUserByEmail(String email) {
        return userMapper.findUserByEmail(email);
    }
}
