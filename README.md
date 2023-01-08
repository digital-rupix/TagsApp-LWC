# TagBadges

This is a Lightning Web Component that displays a list of tags for a given record. It also allows users to add more tags and view related records for a specific tag.
Properties

    - `recordId` (api): ID of the record to display tags for
    - `tags` (track): Array of objects representing the tags for the record, with each object having the following properties:
    -     `name`: Name of the tag
    -     `id`: ID of the tag
    -     `url`: URL of the tag's badge image
    - `tagRelationships`: Array of tag relationship objects
    - `tagsAll` (track): Array of objects representing all tags, with each object having the following properties:
    -     `name`: Name of the tag
    -     `id`: ID of the tag
    -     `url`: URL of the tag's badge image
    - `tagAllRelationships`: Array of all tag relationship objects
    - `object`: Object representing the record
    - `objectApiName` (api): API name of the object
    - `tagId` (api): ID of the selected tag
    - `records`: Array of related record objects
    - `datatableView` (track): Boolean indicating whether the related records should be displayed in a data table
    - `viewAll` (track): Boolean indicating whether all tags should be displayed

# Methods

    - `generateUrl`: Generates the URL for a tag's badge image based on its category, name, and color
    - `openModal`: Opens the modal to add more tags
    - `closeModal`: Closes the modal to add more tags
    - `handleStatusChange`: Handles the change in status of the flow to add more tags. If the flow finishes, it closes the modal and reloads the page.
    - `openDialog`: Opens the dialog to view related records for a specific tag
    - `closeDialog`: Closes the dialog to view related records for a specific tag

# Data Retrieval

The `tags` and `tagRelationships` properties are populated using a wire method that calls the `getTagRelationships` Apex method, passing in the `recordId` as a parameter.

The `records` property is populated using the `findMatchingRelationships` Apex method, which is called in the `openDialog` method and passed the `tagId` as a parameter.

# Other Information

The component includes a flow named `Add_Tags` and has input variables `recordId` and `objectName`.

A modal and a dialog are used to allow users to add more tags and view related records, respectively. The `isModalOpen` tracked property is used to determine whether the modal is open or not, while the `datatableView` tracked property is used to determine whether the related records should be displayed in a data table or not.

# Requirements

This component package requires the Avonni-Components package to be installed. The package can be found here: `https://github.com/avonni/base-components-sfdx`

Finally, the Unofficial SF `BasePacks` need to be installed from here: `https://unofficialsf.com/flow-action-and-screen-component-basepacks/`

# Thanks and Credit

@mitchspano
@jamessimone
@jkranz-rk