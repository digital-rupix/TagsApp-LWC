@isTest
private class TagRelationshipSerializerTest {
    @isTest
    static void testGetTagRelationships() {
        // Create test data
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;
        Tag__c testTag = new Tag__c(Name = 'Test Tag', Category__c = 'Category 1', Color__c = 'Red');
        insert testTag;
        Tag_Relationship__c testTagRelationship1 = new Tag_Relationship__c(Record__c = testAccount.Id, Tag__c = testTag.Id);
        Tag__c testTag2 = new Tag__c(Name = 'Test Tag 2', Category__c = 'Category 2', Color__c = 'Blue');
        insert testTag2;
        Tag_Relationship__c testTagRelationship2 = new Tag_Relationship__c(Record__c = testAccount.Id, Tag__c = testTag2.Id);
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
}