package com.ssafy.wayg.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.Like} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "", description = "")
public class LikeDto implements Serializable {
    private Integer likeNo;
    private UserDto userNo;
    private FeedDto feedNo;
}