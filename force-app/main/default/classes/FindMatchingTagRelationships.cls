public with sharing class FindMatchingTagRelationships {
    @AuraEnabled
    public static List<Map<String, String>> findMatchingRelationships(String tagId) {
        system.Debug(tagId);
        List<Tag_Relationship__c> matchingRelationships = [SELECT Id, URL__c, Record_Name__c, Record_Link__c, Object_Name__c FROM Tag_Relationship__c WHERE Tag__c = :tagId];
        List<Map<String, String>> records = new List<Map<String, String>>();
        for(Tag_Relationship__c relationship : matchingRelationships) {
            Map<String, String> data = new Map<String, String>();
            data.put('id', relationship.Id);
            data.put('recordLink', relationship.URL__c);
            data.put('objectName', relationship.Object_Name__c);
            data.put('urlLabel', relationship.Record_Name__c);
            records.add(data);
            system.Debug(json.serialize(records));
        }
        return records;
    }
}