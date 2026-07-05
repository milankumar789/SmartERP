package com.smarterp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI smartErpOpenAPI() {

        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()

                .info(new Info()

                        .title("SmartERP REST API")

                        .description("""
                                SmartERP is a complete Enterprise Resource Planning backend
                                developed using Spring Boot.

                                Modules Included:

                                • Authentication
                                • Customers
                                • Suppliers
                                • Categories
                                • Products
                                • Purchases
                                • Sales
                                • Dashboard

                                Authentication:
                                Login first using /api/v1/auth/login.
                                Copy the JWT token and click the Authorize button.
                                Paste ONLY the token (without Bearer).
                                """)

                        .version("1.0.0")

                        .contact(new Contact()

                                .name("Happy Singh")

                                .email("happy@example.com"))

                        .license(new License()

                                .name("MIT License")))

                .externalDocs(

                        new ExternalDocumentation()

                                .description("SmartERP Documentation")

                                .url("https://github.com/")

                )

                .addSecurityItem(

                        new SecurityRequirement()

                                .addList(securitySchemeName)

                )

                .components(

                        new Components()

                                .addSecuritySchemes(

                                        securitySchemeName,

                                        new SecurityScheme()

                                                .name(securitySchemeName)

                                                .type(SecurityScheme.Type.HTTP)

                                                .scheme("bearer")

                                                .bearerFormat("JWT")

                                )

                );

    }

}