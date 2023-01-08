@isTest
public class QueryRecordNameActionTest {
    @isTest
    static void testQueryRecord() {
        // Create test records
        Account testAccount = new Account(Name='Test Account');
        insert testAccount;

        Contact testContact = new Contact(FirstName='Test', LastName='Contact', AccountId=testAccount.Id);
        insert testContact;

        // Create test request
        QueryRecordNameAction.QueryRecordNameActionRequest request = new QueryRecordNameAction.QueryRecordNameActionRequest();
        request.objectName = 'Contact';
        request.recordId = testContact.Id;
        request.nameField = 'FirstName';

        // Execute action and verify result
        List<String> fieldValues = QueryRecordNameAction.queryRecord(new List<QueryRecordNameAction.QueryRecordNameActionRequest>{request});
        System.assertEquals(1, fieldValues.size());
        System.assertEquals('Test', fieldValues[0]);
    }
}