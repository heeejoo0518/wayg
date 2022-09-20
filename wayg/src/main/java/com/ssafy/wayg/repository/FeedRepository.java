package com.ssafy.wayg.repository;

import com.ssafy.wayg.dto.FeedDto;
import com.ssafy.wayg.dto.FeedlikeDto;
import com.ssafy.wayg.entity.Feed;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer> {

	Page<Feed> findAllByOrderByFeedLike(Pageable pageable);
	Page<Feed> findByUserNoUserNo(int userNo, Pageable pageable);
	
	@Query("Select f FROM Feed f WHERE f.id IN (?1)")
	Page<Feed> findByFeedNo(List<Integer> feedNoList, Pageable pageable);

}