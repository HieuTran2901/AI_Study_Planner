package com.example.AI_Study_Planer.service.AIRecommendationService.Provider;


import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.enums.ResourceType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProviderManager {

    private final List<ResourceProvider> providers;

//    public List<Resource> searchAll(String query) {
//
//        List<Resource> results = new ArrayList<>();
//
//        for (ResourceProvider provider : providers) {
//
//            try {
//                results.addAll(provider.search(query));
//
//            } catch (Exception e) {
//
//                System.out.println(
//                        "Provider failed: "
//                                + provider.getProviderName()
//                );
//            }
//        }
//
//        return results;
//    }

    public List<Resource> searchByType(
            String query,
            String type
    ) {
        try {
            ResourceType resourceType =
                    ResourceType.valueOf(type);

            return providers.stream()
                    .filter(provider ->
                            provider.supports(resourceType))
                    .findFirst()
                    .map(provider -> {
                        System.out.println(
                                "\n USING PROVIDER: "
                                + provider.getProviderName()
                        );
                        return provider.search(query);
                    })
                    .orElse(List.of());
        } catch (Exception e) {

            System.out.println(
                    "\nSEARCH FAILED FOR TYPE: "
                            + type
            );

            e.printStackTrace();

            return List.of();
        }
    }
}