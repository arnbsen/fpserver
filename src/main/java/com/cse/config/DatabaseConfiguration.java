package com.cse.config;

import io.github.jhipster.config.JHipsterConstants;

import com.github.cloudyrock.mongock.Mongock;
import com.github.cloudyrock.mongock.SpringBootMongock;
import com.github.cloudyrock.mongock.SpringBootMongockBuilder;
import com.mongodb.MongoClient;
// import io.github.jhipster.domain.util.JSR310DateConverters.DateToZonedDateTimeConverter;
// import io.github.jhipster.domain.util.JSR310DateConverters.ZonedDateTimeToDateConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.event.ValidatingMongoEventListener;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Configuration
@EnableMongoRepositories("com.cse.repository")
@Profile("!" + JHipsterConstants.SPRING_PROFILE_CLOUD)
@Import(value = MongoAutoConfiguration.class)
@EnableMongoAuditing(auditorAwareRef = "springSecurityAuditorAware")
public class DatabaseConfiguration {

    private final Logger log = LoggerFactory.getLogger(DatabaseConfiguration.class);

    @Bean
    public ValidatingMongoEventListener validatingMongoEventListener() {
        return new ValidatingMongoEventListener(validator());
    }

    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }

    @Bean
    public MongoCustomConversions customConversions() {
        List<Converter<?, ?>> converters = new ArrayList<>();
        converters.add(DateToZonedDateTimeConverter.INSTANCE);
        converters.add(ZonedDateTimeToDateConverter.INSTANCE);
        return new MongoCustomConversions(converters);
    }

    @Bean
    public Mongock mongobee(ApplicationContext springContext, MongoClient mongoClient, MongoTemplate mongoTemplate,
            MongoProperties mongoProperties) {
        log.debug("Configuring Mongobee");
        // Mongobee mongobee = new Mongobee(mongoClient);
        // mongobee.setDbName(mongoProperties.getMongoClientDatabase());
        // mongobee.setMongoTemplate(mongoTemplate);
        // // package to scan for migrations
        // mongobee.setChangeLogsScanPackage("com.cse.config.dbmigrations");
        // mongobee.setEnabled(true);
        // return mongobee;
        return new SpringBootMongockBuilder(mongoClient, mongoProperties.getMongoClientDatabase(), "com.cse.config.dbmigrations")
                .setApplicationContext(springContext).setLockQuickConfig().build();
    }

    @ReadingConverter
    enum DateToZonedDateTimeConverter implements Converter<Instant, ZonedDateTime> {

        INSTANCE;

        @Override
        public ZonedDateTime convert(Instant source) {
            return source == null ? null : ZonedDateTime.ofInstant(source, ZoneId.systemDefault());
        }

    }

    @WritingConverter
    enum ZonedDateTimeToDateConverter implements Converter<ZonedDateTime, Instant> {

        INSTANCE;

        @Override
        public Instant convert(ZonedDateTime source) {
            return source == null ? null : source.toInstant();
        }
    }
}
