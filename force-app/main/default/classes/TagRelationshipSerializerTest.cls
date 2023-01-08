@isTest
private class TagRelationshipSerializerTest {
    @isTest
    static void testGetTagRelationships() {
        // Create test data
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;
        Tag__c testTag = new Tag__c(Name = 'Test Tag', Category__c = 'Category 1', Color__c = 'Red');
        insert testTag;
        Tag_Relationship__c testTagRelationship1 = new Tag_Relationship__c(Record__c = testAccount.Id, Object_Name__c = 'Account', Tag__c = testTag.Id);
        Tag__c testTag2 = new Tag__c(Name = 'Test Tag 2', Category__c = 'Category 2', Color__c = 'Blue');
        insert testTag2;
        Tag_Relationship__c testTagRelationship2 = new Tag_Relationship__c(Record__c = testAccount.Id, Object_Name__c = 'Account', Tag__c = testTag2.Id);
        insert testTagRelationship1;
        insert testTagRelationship2;
        
        // Call the method and verify the result
        List<Map<String, String>> result = TagRelationshipSerializer.getTagRelationships(testAccount.Id);
        System.assertEquals(2, result.size(), 'Wrong number of tag relationships returned');
        System.assertEquals('Category 1', result[0].get('Category'));
        System.assertEquals('red', result[0].get('Color'));
        System.assertEquals('Category 2', result[1].get('Category'));
        System.assertEquals('blue', result[1].get('Color'));
        
    }
    
    @isTest
    static void testFindMatchingRelationships() {
        // Create test data
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;
        Tag__c testTag = new Tag__c(Name = 'Test Tag', Category__c = 'Category 1', Color__c = 'Red');
        insert testTag;
        Tag_Relationship__c testTagRelationship1 = new Tag_Relationship__c(Record__c = testAccount.Id, Object_Name__c = 'Account', Tag__c = testTag.Id);
        Tag__c testTag2 = new Tag__c(Name = 'Test Tag 2', Category__c = 'Category 2', Color__c = 'Blue');
        insert testTag2;
        Tag_Relationship__c testTagRelationship2 = new Tag_Relationship__c(Record__c = testAccount.Id, Object_Name__c = 'Account', Tag__c = testTag2.Id);
        insert testTagRelationship1;
        insert testTagRelationship2;

        // Test method
        List<Map<String, String>> records = FindMatchingTagRelationships.findMatchingRelationships(testTag.Id);

        // Verify results
        System.assertEquals(1, records.size(), 'Unexpected number of records returned');
        System.assertEquals(testTagRelationship1.Id, records[0].get('id'), 'Unexpected record returned');
        System.assertEquals('Account', records[0].get('objectName'), 'Unexpected record returned');
    }
    
    
}