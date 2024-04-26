package com.student.techladies.confog;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.ContentCachingRequestWrapper;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class TokenInterceptor implements HandlerInterceptor {
 
    private static final ThreadLocal<String> tokenThreadLocal = new ThreadLocal<>();

    private static final List<String> ps =
            new ArrayList<>(Arrays.asList(new String[]{"/user/login","/user/getCode","/user/register","/post/search"}));
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String token = request.getHeader("token");
        String url = request.getRequestURI().toString();
        if(false){
            if (token == null) {
                // 设置内容类型
                response.setContentType("application/json");
                // 设置字符编码
                response.setCharacterEncoding("UTF-8");
                String result = "{\"code\":\"405\",\"message\":\"no login please login web\",\"data\":\"\"}";

                response.getWriter().write(result); // 返回错误信息
                return false; // 返回false阻止请求处理
            }
        }
        if (token != null) {
            tokenThreadLocal.set(token);
        }
        return true;
    }
 
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        tokenThreadLocal.remove();
    }
 
    public static String getToken() {
        return tokenThreadLocal.get();
    }
}