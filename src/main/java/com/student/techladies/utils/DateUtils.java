package com.student.techladies.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * @ClassName DateUtils
 * @Description TODO
 * @Author sandy.sun
 * @Date 2024/4/22 14:11
 * @Version 1.0
 */
public class DateUtils {

//    public static Date getUSDate()  {
//        try{
//            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            Date date = new Date();
//            simpleDateFormat.setTimeZone(TimeZone.getTimeZone("America/New_York"));
//            return simpleDateFormat.parse(simpleDateFormat.format(date));
//        }catch(Exception e){
//          e.printStackTrace();
//        }
//        return new Date() ;
//    }

    public static Date getUSDate()  {
        try{
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            dateFormat.setTimeZone(TimeZone.getTimeZone("America/Denver"));
            String GMT_Time = dateFormat.format(new Date());
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(GMT_Time) ;
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

}
