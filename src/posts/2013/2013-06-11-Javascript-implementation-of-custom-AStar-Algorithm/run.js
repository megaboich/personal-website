function genField() {
    AStarFieldDesigner.generate($("#field-container"), $("#field-width").val() | 0, $("#field-height").val() | 0);
}
$("#gen-field-btn").click(genField);
$("#set-start-btn").click(AStarFieldDesigner.setStart);
$("#set-finish-btn").click(AStarFieldDesigner.setFinish);
$("#go-btn").click(function () {
    var fieldData = AStarFieldDesigner.getFieldData();
    var result = AStarAlgorithm.run(fieldData);
    console.log("result", result);
    AStarFieldDesigner.showResult(result.cells);
});
$(genField);