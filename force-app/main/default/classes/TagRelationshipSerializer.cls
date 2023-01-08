public with sharing class TagRelationshipSerializer {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getTagRelationships(Id recordId) {
        List<Map<String, String>> tagRelationships = new List<Map<String, String>>();
        for (Tag_Relationship__c tr : [SELECT Id, Category__c, Tag_Name__c, Color__c, Tag__c FROM Tag_Relationship__c WHERE Record__c = :recordId LIMIT 6]) {
            Map<String, String> trMap = new Map<String, String>();
            trMap.put('Category', tr.Category__c);
            trMap.put('Tag', tr.Tag_Name__c);
            trMap.put('Color', tr.Color__c);
            trMap.put('Id', tr.Tag__c);
            tagRelationships.add(trMap);
        }
        return tagRelationships;
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getAllTagRelationships(Id recordId) {
        List<Map<String, String>> tagRelationships = new List<Map<String, String>>();
        for (Tag_Relationship__c tr : [SELECT Id, Category__c, Tag_Name__c, Color__c, Tag__c FROM Tag_Relationship__c WHERE Record__c = :recordId LIMIT 6]) {
            Map<String, String> trMap = new Map<String, String>();
            trMap.put('Category', tr.Category__c);
            trMap.put('Tag', tr.Tag_Name__c);
            trMap.put('Color', tr.Color__c);
            trMap.put('Id', tr.Tag__c);
            tagRelationships.add(trMap);
        }
        return tagRelationships;
    }
}
