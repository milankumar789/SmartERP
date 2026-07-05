package com.smarterp.category.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryResponse {

    private Long id;

    private String categoryCode;

    private String name;

    private String description;

    private Boolean active;

    private LocalDateTime createdAt;

    public CategoryResponse(
            Long id,
            String categoryCode,
            String name,
            String description,
            Boolean active,
            LocalDateTime createdAt) {

        this.id = id;
        this.categoryCode = categoryCode;
        this.name = name;
        this.description = description;
        this.active = active;
        this.createdAt = createdAt;
    }

}