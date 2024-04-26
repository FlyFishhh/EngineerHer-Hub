package com.student.techladies.common;

import com.student.techladies.model.Post;
import lombok.Data;

import java.util.List;

/**
 * @ClassName PostRequest
 * @Description TODO
 * @Author sandy.sun
 * @Date 2024/4/13 00:40
 * @Version 1.0
 */
@Data
public class PostRequest extends Post {

    List<String> images ;

}
