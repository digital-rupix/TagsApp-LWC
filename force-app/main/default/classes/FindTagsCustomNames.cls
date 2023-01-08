/*public class FindTagsCustomNames {
    @InvocableMethod(label='Find Tags Custom Names' description='Executes a SOQL query to retrieve the custom field names for tags on a given object')
    public static List<TagsCustomNames> findTagsCustomNames(List<FindTagsCustomNamesRequest> requests) {
        List<TagsCustomNames> customNames = new List<TagsCustomNames>();
        for (FindTagsCustomNamesRequest request : requests) {
            String objectName = String.escapeSingleQuotes(request.objectName);
            String query = 'SELECT Id, Field_API_Name__c FROM Tags_Custom_Names__mdt WHERE Object_API_Name__c = \'' + objectName + '\' LIMIT 1';
            List<SObject> records = Database.query(query);
            if (!records.isEmpty()) {
                SObject record = records[0];
                TagsCustomNames customName = new TagsCustomNames();
                customName.fieldName = (String)record.get('Field_API_Name__c');
                customNames.add(customName);
            }
        }
        return customNames;
    }

    public class FindTagsCustomNamesRequest {
        @InvocableVariable(required=true)
        public String objectName;
    }

    public class TagsCustomNames {
        @InvocableVariable
        public String fieldName;
    }
}*/
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