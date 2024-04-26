package com.student.techladies;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan("com.student.techladies.mapper")
public class TechLadiesApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechLadiesApplication.class, args);
    }

}
