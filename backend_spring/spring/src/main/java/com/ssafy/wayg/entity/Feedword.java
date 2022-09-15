package com.ssafy.wayg.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "feedword")
public class Feedword {
    @Id
    @Column(name = "feedword_no", nullable = false)
    private Integer feedwordNo;

    @Column(name = "feedword_word", nullable = false, length = 45)
    private String feedwordWord;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "feed_no", nullable = false)
    private Feed feedNo;

}