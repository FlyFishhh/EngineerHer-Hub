package com.student.techladies.controller;

import com.student.techladies.common.BaseResponse;
import com.student.techladies.common.UserRequest;
import com.student.techladies.common.UserType;
import com.student.techladies.email.EmailUtil;
import com.student.techladies.model.User;
import com.student.techladies.model.UserDto;
import com.student.techladies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * @ClassName UserController
 * @Description TODO
 * @Author sandy.sun
 * @Date 2024/4/12 12:04
 * @Version 1.0
 */
@RestController
@RequestMapping("/user")
public class UserController {


    /**
     * 注入发送邮件的接口
     */
    @Autowired
    private EmailUtil mailService;


    @Autowired
    UserService userService ;
    public static Map<String,String> codeMap = new HashMap<>() ;

    @PostMapping("/login")
    @ResponseBody
    public BaseResponse login(@RequestBody UserRequest user){
        BaseResponse result = userService.findUserByEmailAndPwd(user);
        return result ;
    }

    @PostMapping("/register")
    @ResponseBody
    public BaseResponse register(@RequestBody UserRequest user){
        BaseResponse result = new BaseResponse() ;
        result.setCode(200);
        if(StringUtils.isEmpty(codeMap.get(user.getEmail()))){
            result.setCode(406);
            result.setMessage("code is not exist");
        } else {
            if(user.getCode().equals(codeMap.get(user.getEmail()))){
                User u = userService.save(user);
                result.setCode(200);
                result.setData(u);
            } else {
                result.setCode(406);
                result.setMessage("code is wrong");
            }
        }
        return result ;
    }

    @PostMapping("/getCode")
    @ResponseBody
    public BaseResponse sendEmail(@RequestBody UserRequest user){
        BaseResponse result = new BaseResponse() ;
        int code = 1000 + new Random().nextInt(9000);
        int count = userService.findUserByEmail(user.getEmail());
        if(count>0){
            result.setCode(406);
            result.setMessage("This email address has been registerd!");
            return result ;
        }
        codeMap.put(user.getEmail(),String.valueOf(code));
        result.setCode(200);
        result.setData(code);
        mailService.sendSimpleMail(user.getEmail(),"Your receive code：","code："+code);
        return result ;
    }


    @GetMapping("/findUserById/{id}")
    @ResponseBody
    public BaseResponse findUserById(@PathVariable("id") int id){
        BaseResponse result = new BaseResponse() ;
        UserDto u = userService.findUserById(id);
        result.setCode(200);
        result.setData(u);
        return result ;
    }

    @PostMapping("/getFansOrfocus")
    @ResponseBody
    public BaseResponse getFansOrfocus(@RequestBody UserType user){
        BaseResponse result = new BaseResponse() ;
        List<User> u = userService.getFansOrfocus(user);
        result.setCode(200);
        result.setData(u);
        return result ;
    }

    @PostMapping("/updateUserById")
    @ResponseBody
    public BaseResponse updateUserById(@RequestBody User user){
        BaseResponse result = new BaseResponse() ;
        User u = userService.updateUserById(user);
        result.setCode(200);
        result.setData(u);
        return result ;
    }


    @PostMapping("/upload")
    @ResponseBody
    public BaseResponse upload(@RequestParam("file")MultipartFile file) throws IOException {
        BaseResponse result = new BaseResponse() ;
        if(file.isEmpty()){
            result.setCode(400);
            result.setMessage("file is not null");
            return result ;
        }
        String origin = file.getOriginalFilename();
        System.out.println(origin.split("\\.")[1]);
        String d = System.getProperty("user.dir")+"/src/main/resources/static";
        System.out.println(d);
        String fileName = new Date().getTime()+"."+origin.split("\\.")[1];
        //The images are stored in D:\\IMAGES
        file.transferTo(new File("d:\\IMAGES"+File.separator+fileName));
        result.setCode(200);
        result.setData("http://localhost:8789/"+fileName);
        return result ;
    }

    @PostMapping("/uploadBatch")
    @ResponseBody
    public BaseResponse uploads(@RequestParam("files")MultipartFile[] file) throws IOException {
        BaseResponse result = new BaseResponse() ;
        if(file.length==0){
            result.setCode(400);
            result.setMessage("file is not null");
            return result ;
        }
        List<String> pathd = new ArrayList<>() ;
        for(int i=0;i<file.length;i++){
            MultipartFile f = file[i] ;
            String origin = f.getOriginalFilename();
            System.out.println(origin.split("\\.")[1]);
            String fileName = new Date().getTime()+"."+origin.split("\\.")[1];
            f.transferTo(new File(""+File.separator+fileName));
            pathd.add("/file/"+fileName);
        }
        result.setCode(200);
        result.setData(pathd);
        return result ;
    }
}
