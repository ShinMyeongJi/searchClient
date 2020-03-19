package com.pcn.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.solr.SolrAutoConfiguration;

@SpringBootApplication(exclude = SolrAutoConfiguration.class)
public class IldongDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(IldongDemoApplication.class, args);
    }
}
