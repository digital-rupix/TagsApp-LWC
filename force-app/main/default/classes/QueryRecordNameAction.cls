public class QueryRecordNameAction {
    @InvocableMethod(label='Query Record' description='Executes a SOQL query to retrieve a record field value')
    public static String queryRecord(String objectName, Id recordId, String nameField) {
        String query = 'SELECT Id, ' + nameField + ' FROM ' + objectName + ' WHERE Id = :recordId';
        SObject record = Database.query(query);
        return (String)record.get(nameField);
    }
}
