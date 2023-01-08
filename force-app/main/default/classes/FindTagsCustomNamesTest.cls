@isTest
private class FindTagsCustomNamesTest {
    @isTest
    static void testFindTagsCustomNames() {
        // Create test data
        String objectName = 'Case';
        FindTagsCustomNames.FindTagsCustomNamesRequest request = new FindTagsCustomNames.FindTagsCustomNamesRequest();
        request.objectName = objectName;
        List<FindTagsCustomNames.FindTagsCustomNamesRequest> requests = new List<FindTagsCustomNames.FindTagsCustomNamesRequest>();
        requests.add(request);

        // Test the method
        List<String> fieldNames = FindTagsCustomNames.findTagsCustomNames(requests);
        System.assertEquals(1, fieldNames.size());
        System.assertEquals('Subject', fieldNames[0]);
    }
}
