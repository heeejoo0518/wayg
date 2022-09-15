package com.ssafy.wayg.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.Place} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "", description = "")
public class PlaceDto implements Serializable {
    private Integer id;
    private String placeName;
    private String placeAddress;
    private String placeInfo;
    private String placePhone;
    private String placeHoliday;
    private String placeExperience;
    private String placeTime;
    private String placePark;
    private String placeAnimal;
    private String placeMore;
    private Integer placeScrap;
}