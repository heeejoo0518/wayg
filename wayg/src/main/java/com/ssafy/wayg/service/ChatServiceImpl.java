package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.dto.PlacewordDto;
import com.ssafy.wayg.entity.Place;
import com.ssafy.wayg.entity.Placeword;
import com.ssafy.wayg.repository.PlaceRepository;
import com.ssafy.wayg.repository.PlacewordRepository;
import com.ssafy.wayg.util.DEConverter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    private PlacewordRepository placewordRepository;
    private PlaceRepository placeRepository;
    private DEConverter converter;

    public ChatServiceImpl(PlacewordRepository placewordRepository, PlaceRepository placeRepository, DEConverter deConverter){
        this.placewordRepository = placewordRepository;
        this.placeRepository = placeRepository;
        this.converter = deConverter;
    }

    @Override
    public double placeword(String word, long total) {
        Long size = placewordRepository.countByplacewordWord(word);
        List<String> words = new ArrayList<>();
        double idf = Math.log(((double)total / (double) size));
        //int idf = log ( total / size )

        return idf;
    }

    @Override
    public long totalSize(List<String> str){
        long total = 0;
        for(int i=0;i<str.size();i++){
            total += placewordRepository.countByplacewordWord(str.get(i));
        }

        return total;
    }

//    @Override
//    public PlacewordDto oneSize(String str){
//        List<Placeword> placewordDto = placewordRepository.findByplacewordWord(str);
//
//        //int size = place.getPlaceScrap();
//        return size;
//    }
}
