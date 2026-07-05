package com.smarterp.category.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.smarterp.category.dto.request.CreateCategoryRequest;
import com.smarterp.category.dto.request.UpdateCategoryRequest;
import com.smarterp.category.dto.response.CategoryResponse;
import com.smarterp.category.entity.Category;
import com.smarterp.category.repository.CategoryRepository;
import com.smarterp.common.exception.BadRequestException;
import com.smarterp.common.exception.ResourceNotFoundException;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryResponse createCategory(CreateCategoryRequest request) {

        if (categoryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new BadRequestException("Category already exists.");
        }

        Category category = new Category();

        category.setCategoryCode(generateCategoryCode());
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setActive(true);

        Category savedCategory = categoryRepository.save(category);

        return mapToResponse(savedCategory);
    }

    public Page<CategoryResponse> getAllCategories(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return categoryRepository.findByActiveTrue(pageable)
                .map(this::mapToResponse);
    }

    public Page<CategoryResponse> searchCategories(
            String keyword,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        return categoryRepository
                .findByActiveTrueAndNameContainingIgnoreCase(keyword, pageable)
                .map(this::mapToResponse);
    }

    public CategoryResponse getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        return mapToResponse(category);
    }

    public CategoryResponse updateCategory(
            Long id,
            UpdateCategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        Category updatedCategory = categoryRepository.save(category);

        return mapToResponse(updatedCategory);
    }

    public void deactivateCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        category.setActive(false);

        categoryRepository.save(category);
    }

    private CategoryResponse mapToResponse(Category category) {

        return new CategoryResponse(
                category.getId(),
                category.getCategoryCode(),
                category.getName(),
                category.getDescription(),
                category.getActive(),
                category.getCreatedAt()
        );
    }

    private String generateCategoryCode() {

        Optional<Category> lastCategory =
                categoryRepository.findTopByOrderByIdDesc();

        if (lastCategory.isEmpty()) {
            return "CAT-00001";
        }

        long nextId = lastCategory.get().getId() + 1;

        return String.format("CAT-%05d", nextId);
    }

    public List<CategoryResponse> getCategoryDropdown() {

    return categoryRepository.findByActiveTrue(
            org.springframework.data.domain.Sort.by("name")
    ).stream()
            .map(this::mapToResponse)
            .toList();

}

}