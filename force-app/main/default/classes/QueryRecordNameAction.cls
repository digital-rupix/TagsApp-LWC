public class QueryRecordNameAction {
    @InvocableMethod(label='Query Record' description='Executes a SOQL query to retrieve a record field value')
    public static List<String> queryRecord(List<QueryRecordNameActionRequest> requests) {
        List<String> fieldValues = new List<String>();
        for (QueryRecordNameActionRequest request : requests) {
            String recordId = String.escapeSingleQuotes(request.recordId);
            String query = 'SELECT Id, ' + request.nameField + ' FROM ' + request.objectName + ' WHERE Id = \'' + request.recordId + '\'';
            SObject record = Database.query(query);
            fieldValues.add((String)record.get(request.nameField));
        }
        return fieldValues;
    }

    public class QueryRecordNameActionRequest {
        @InvocableVariable(required=true)
        public String objectName;

        @InvocableVariable(required=true)
        public Id recordId;

        @InvocableVariable(required=true)
        public String nameField;
    }
}