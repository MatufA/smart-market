function checkFile() {
    var fileElement = document.getElementById("myFiles");
    var fileExtension = "";
    if (fileElement.value.lastIndexOf(".") > 0) {
        fileExtension = fileElement.value.substring(fileElement.value.lastIndexOf(".") + 1, fileElement.value.length);
    }
    if (fileExtension.toLowerCase() == "json" || fileExtension.toLowerCase() == "csv" || fileExtension.toLowerCase() == "xml" ) {
        alert(fileElement.files.length  + " File(s) have been uploaded")
        return true;
    }
    else {
        alert("You must select a JSON, CSV or XML file for upload");
        return false;
    }
}