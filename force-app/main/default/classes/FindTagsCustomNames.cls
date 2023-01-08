public class FindTagsCustomNames {
    @InvocableMethod(label='Find Tags Custom Names' description='Executes a SOQL query to retrieve the custom field names for tags on a given object')
    public static List<String> findTagsCustomNames(List<FindTagsCustomNamesRequest> requests) {
        List<String> fieldNames = new List<String>();
        for (FindTagsCustomNamesRequest request : requests) {
            String objectName = String.escapeSingleQuotes(request.objectName);
            String query = 'SELECT Id, Field_API_Name__c FROM Tags_Custom_Names__mdt WHERE Object_API_Name__c = \'' + objectName + '\' LIMIT 1';
            List<SObject> records = Database.query(query);
            if (!records.isEmpty()) {
                SObject record = records[0];
                fieldNames.add((String)record.get('Field_API_Name__c'));
            }
        }
        return fieldNames;
    }

    public class FindTagsCustomNamesRequest {
        @InvocableVariable(required=true)
        public String objectName;
    }
}