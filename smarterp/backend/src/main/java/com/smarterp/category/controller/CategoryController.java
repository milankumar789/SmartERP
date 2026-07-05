package com.smarterp.category.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smarterp.category.dto.request.CreateCategoryRequest;
import com.smarterp.category.dto.request.UpdateCategoryRequest;
import com.smarterp.category.dto.response.CategoryResponse;
import com.smarterp.category.service.CategoryService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;

@Tag(
        name = "Categories",
        description = "Category Management APIs"
)

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public CategoryResponse createCategory(
            @Valid @RequestBody CreateCategoryRequest request) {

        return categoryService.createCategory(request);
    }

    @GetMapping
    public Page<CategoryResponse> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return categoryService.getAllCategories(page, size);
    }

    @GetMapping("/search")
    public Page<CategoryResponse> searchCategories(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return categoryService.searchCategories(keyword, page, size);
    }

    @GetMapping("/{id}")
    public CategoryResponse getCategoryById(
            @PathVariable Long id) {

        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public CategoryResponse updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCategoryRequest request) {

        return categoryService.updateCategory(id, request);
    }

    @PatchMapping("/{id}/deactivate")
    public String deactivateCategory(
            @PathVariable Long id) {

        categoryService.deactivateCategory(id);

        return "Category deactivated successfully.";
    }

    @GetMapping("/dropdown")
public List<CategoryResponse> getCategoryDropdown() {

    return categoryService.getCategoryDropdown();

}

}