(function() {
    var dataviz = kendo.dataviz,
        QRCode = dataviz.ui.QRCode,
        qrcode,
        background,
        matrix,
        size = 240,
        value = "mailto:clientservice@kendoui.com";

    function createQRCode(options) {
        kendo.destroy(QUnit.fixture);

        QUnit.fixture.html("<div id='container'></div>");
        $("#container").kendoQRCode(kendo.deepExtend({
            value: value,
            size: 240
        }, options));

        qrcode = $("#container").data("kendoQRCode");

        background = qrcode.visual.children[0];
        matrix = qrcode.visual.children[1];
    }

    function setup() {
        createQRCode();
    }

    function teardown() {
        kendo.destroy(QUnit.fixture);
    }

    // ------------------------------------------------------------

    module("QR Code / Options", {
        setup: setup,
        teardown: teardown
    });

    test("creates QR code without value", 0, function() {
        createQRCode({
            value: null
        });
    });

    test("the background rectangle is rendered with the QRCode size", function() {
        var bbox = background.bbox();
        deepEqual(bbox.topLeft().toArray(), [0, 0]);
        deepEqual(bbox.bottomRight().toArray(), [240, 240]);
    });

    test("the background box fill color is set from the background option", function() {
        createQRCode({
            background: "red"
        });

        equal(background.options.fill.color, "red");
    });

    test("the background rectangle is shifted if a border is set", function() {
        createQRCode({
            border: {
                width: 4,
                color: "black"
            }
        });

        var bbox = background.bbox();
        deepEqual(bbox.topLeft().toArray(), [0, 0]);
        deepEqual(bbox.bottomRight().toArray(), [240, 240]);
    });

    test("the border options are used for the background rectangle stroke options", function() {
        var borderColor = "aqua",
            borderWidth = 4;

        createQRCode({
            border: {
                width: borderWidth,
                color: borderColor
            }
        });

        equal(background.options.stroke.color, borderColor);
        equal(background.options.stroke.width, borderWidth);
    });

    test("the padding is taken into account when placing the QRCode modules", function() {
        createQRCode({
            border: {
                width: 4,
                color: "black"
            },
            padding: 5
        });

        var anchor = matrix.paths[0].segments[0].anchor();
        deepEqual(anchor.toArray(), [19, 19]);
    });

    module("QRCode / Rendering", {
        setup: setup,
        teardown: teardown
    });

    test("bit matrix rendering", function() {
        createQRCode({
            border: {
                width: 4,
                color: "black"
            },
            padding: 5
        });

        var expectedPoints = [
            [19, 19],   [19, 26],   [68, 26],   [68, 19],
            [75, 19],   [75, 26],   [82, 26],   [82, 19],
            [96, 19],   [96, 26],   [110, 26],  [110, 19],
            [124, 19],  [124, 26],  [152, 26],  [152, 19],
            [173, 19],  [173, 26],  [222, 26],  [222, 19],
            [19, 26],   [19, 33],   [26, 33],   [26, 26],
            [61, 26],   [61, 33],   [68, 33],   [68, 26],
            [82, 26],   [82, 33],   [96, 33],   [96, 26],
            [131, 26],  [131, 33],  [138, 33],  [138, 26],
            [152, 26],  [152, 33],  [159, 33],  [159, 26],
            [173, 26],  [173, 33],  [180, 33],  [180, 26],
            [215, 26],  [215, 33],  [222, 33],  [222, 26],
            [19, 33],   [19, 40],   [26, 40],   [26, 33],
            [33, 33],   [33, 40],   [54, 40],   [54, 33],
            [61, 33],   [61, 40],   [68, 40],   [68, 33],
            [89, 33],   [89, 40],   [96, 40],   [96, 33],
            [103, 33],  [103, 40],  [110, 40],  [110, 33],
            [124, 33],  [124, 40],  [138, 40],  [138, 33],
            [173, 33],  [173, 40],  [180, 40],  [180, 33],
            [187, 33],  [187, 40],  [208, 40],  [208, 33],
            [215, 33],  [215, 40],  [222, 40],  [222, 33],
            [19, 40],   [19, 47],   [26, 47],   [26, 40],
            [33, 40],   [33, 47],   [54, 47],   [54, 40],
            [61, 40],   [61, 47],   [68, 47],   [68, 40],
            [103, 40],  [103, 47],  [110, 47],  [110, 40],
            [131, 40],  [131, 47],  [145, 47],  [145, 40],
            [152, 40],  [152, 47],  [166, 47],  [166, 40],
            [173, 40],  [173, 47],  [180, 47],  [180, 40],
            [187, 40],  [187, 47],  [208, 47],  [208, 40],
            [215, 40],  [215, 47],  [222, 47],  [222, 40],
            [19, 47],   [19, 54],   [26, 54],   [26, 47],
            [33, 47],   [33, 54],   [54, 54],   [54, 47],
            [61, 47],   [61, 54],   [68, 54],   [68, 47],
            [82, 47],   [82, 54],   [89, 54],   [89, 47],
            [96, 47],   [96, 54],   [103, 54],  [103, 47],
            [117, 47],  [117, 54],  [138, 54],  [138, 47],
            [145, 47],  [145, 54],  [159, 54],  [159, 47],
            [173, 47],  [173, 54],  [180, 54],  [180, 47],
            [187, 47],  [187, 54],  [208, 54],  [208, 47],
            [215, 47],  [215, 54],  [222, 54],  [222, 47],
            [19, 54],   [19, 61],   [26, 61],   [26, 54],
            [61, 54],   [61, 61],   [68, 61],   [68, 54],
            [89, 54],   [89, 61],   [96, 61],   [96, 54],
            [103, 54],  [103, 61],  [110, 61],  [110, 54],
            [124, 54],  [124, 61],  [138, 61],  [138, 54],
            [173, 54],  [173, 61],  [180, 61],  [180, 54],
            [215, 54],  [215, 61],  [222, 61],  [222, 54],
            [19, 61],   [19, 68],   [68, 68],   [68, 61],
            [75, 61],   [75, 68],   [82, 68],   [82, 61],
            [89, 61],   [89, 68],   [96, 68],   [96, 61],
            [103, 61],  [103, 68],  [110, 68],  [110, 61],
            [117, 61],  [117, 68],  [124, 68],  [124, 61],
            [131, 61],  [131, 68],  [138, 68],  [138, 61],
            [145, 61],  [145, 68],  [152, 68],  [152, 61],
            [159, 61],  [159, 68],  [166, 68],  [166, 61],
            [173, 61],  [173, 68],  [222, 68],  [222, 61],
            [75, 68],   [75, 75],   [82, 75],   [82, 68],
            [89, 68],   [89, 75],   [103, 75],  [103, 68],
            [110, 68],  [110, 75],  [117, 75],  [117, 68],
            [124, 68],  [124, 75],  [138, 75],  [138, 68],
            [145, 68],  [145, 75],  [166, 75],  [166, 68],
            [19, 75],   [19, 82],   [33, 82],   [33, 75],
            [40, 75],   [40, 82],   [54, 82],   [54, 75],
            [61, 75],   [61, 82],   [68, 82],   [68, 75],
            [82, 75],   [82, 82],   [103, 82],  [103, 75],
            [110, 75],  [110, 82],  [117, 82],  [117, 75],
            [138, 75],  [138, 82],  [145, 82],  [145, 75],
            [152, 75],  [152, 82],  [159, 82],  [159, 75],
            [173, 75],  [173, 82],  [180, 82],  [180, 75],
            [215, 75],  [215, 82],  [222, 82],  [222, 75],
            [19, 82],   [19, 89],   [26, 89],   [26, 82],
            [40, 82],   [40, 89],   [47, 89],   [47, 82],
            [54, 82],   [54, 89],   [61, 89],   [61, 82],
            [68, 82],   [68, 89],   [75, 89],   [75, 82],
            [82, 82],   [82, 89],   [89, 89],   [89, 82],
            [103, 82],  [103, 89],  [117, 89],  [117, 82],
            [131, 82],  [131, 89],  [138, 89],  [138, 82],
            [145, 82],  [145, 89],  [152, 89],  [152, 82],
            [166, 82],  [166, 89],  [173, 89],  [173, 82],
            [180, 82],  [180, 89],  [201, 89],  [201, 82],
            [19, 89],   [19, 96],   [26, 96],   [26, 89],
            [40, 89],   [40, 96],   [47, 96],   [47, 89],
            [61, 89],   [61, 96],   [68, 96],   [68, 89],
            [89, 89],   [89, 96],   [103, 96],  [103, 89],
            [110, 89],  [110, 96],  [117, 96],  [117, 89],
            [124, 89],  [124, 96],  [145, 96],  [145, 89],
            [180, 89],  [180, 96],  [187, 96],  [187, 89],
            [201, 89],  [201, 96],  [208, 96],  [208, 89],
            [26, 96],   [26, 103],  [40, 103],  [40, 96],
            [75, 96],   [75, 103],  [117, 103], [117, 96],
            [131, 96],  [131, 103], [152, 103], [152, 96],
            [159, 96],  [159, 103], [166, 103], [166, 96],
            [173, 96],  [173, 103], [180, 103], [180, 96],
            [194, 96],  [194, 103], [201, 103], [201, 96],
            [208, 96],  [208, 103], [222, 103], [222, 96],
            [40, 103],  [40, 110],  [54, 110],  [54, 103],
            [61, 103],  [61, 110],  [68, 110],  [68, 103],
            [75, 103],  [75, 110],  [89, 110],  [89, 103],
            [96, 103],  [96, 110],  [117, 110], [117, 103],
            [124, 103], [124, 110], [138, 110], [138, 103],
            [152, 103], [152, 110], [166, 110], [166, 103],
            [173, 103], [173, 110], [187, 110], [187, 103],
            [208, 103], [208, 110], [215, 110], [215, 103],
            [19, 110],  [19, 117],  [26, 117],  [26, 110],
            [47, 110],  [47, 117],  [61, 117],  [61, 110],
            [75, 110],  [75, 117],  [89, 117],  [89, 110],
            [110, 110], [110, 117], [124, 117], [124, 110],
            [131, 110], [131, 117], [152, 117], [152, 110],
            [166, 110], [166, 117], [194, 117], [194, 110],
            [201, 110], [201, 117], [208, 117], [208, 110],
            [215, 110], [215, 117], [222, 117], [222, 110],
            [54, 117],  [54, 124],  [68, 124],  [68, 117],
            [75, 117],  [75, 124],  [82, 124],  [82, 117],
            [89, 117],  [89, 124],  [117, 124], [117, 117],
            [131, 117], [131, 124], [145, 124], [145, 117],
            [152, 117], [152, 124], [201, 124], [201, 117],
            [215, 117], [215, 124], [222, 124], [222, 117],
            [26, 124],  [26, 131],  [33, 131],  [33, 124],
            [40, 124],  [40, 131],  [61, 131],  [61, 124],
            [96, 124],  [96, 131],  [103, 131], [103, 124],
            [124, 124], [124, 131], [131, 131], [131, 124],
            [152, 124], [152, 131], [173, 131], [173, 124],
            [180, 124], [180, 131], [222, 131], [222, 124],
            [19, 131],  [19, 138],  [33, 138],  [33, 131],
            [40, 131],  [40, 138],  [47, 138],  [47, 131],
            [61, 131],  [61, 138],  [82, 138],  [82, 131],
            [117, 131], [117, 138], [124, 138], [124, 131],
            [159, 131], [159, 138], [166, 138], [166, 131],
            [180, 131], [180, 138], [187, 138], [187, 131],
            [208, 131], [208, 138], [215, 138], [215, 131],
            [19, 138],  [19, 145],  [33, 145],  [33, 138],
            [40, 138],  [40, 145],  [47, 145],  [47, 138],
            [54, 138],  [54, 145],  [61, 145],  [61, 138],
            [75, 138],  [75, 145],  [124, 145], [124, 138],
            [131, 138], [131, 145], [145, 145], [145, 138],
            [152, 138], [152, 145], [166, 145], [166, 138],
            [187, 138], [187, 145], [208, 145], [208, 138],
            [19, 145],  [19, 152],  [54, 152],  [54, 145],
            [61, 145],  [61, 152],  [68, 152],  [68, 145],
            [96, 145],  [96, 152],  [103, 152], [103, 145],
            [124, 145], [124, 152], [131, 152], [131, 145],
            [138, 145], [138, 152], [145, 152], [145, 145],
            [152, 145], [152, 152], [159, 152], [159, 145],
            [173, 145], [173, 152], [180, 152], [180, 145],
            [187, 145], [187, 152], [194, 152], [194, 145],
            [215, 145], [215, 152], [222, 152], [222, 145],
            [19, 152],  [19, 159],  [40, 159],  [40, 152],
            [68, 152],  [68, 159],  [82, 159],  [82, 152],
            [103, 152], [103, 159], [110, 159], [110, 152],
            [117, 152], [117, 159], [124, 159], [124, 152],
            [131, 152], [131, 159], [138, 159], [138, 152],
            [152, 152], [152, 159], [173, 159], [173, 152],
            [194, 152], [194, 159], [215, 159], [215, 152],
            [19, 159],  [19, 166],  [47, 166],  [47, 159],
            [61, 159],  [61, 166],  [82, 166],  [82, 159],
            [89, 159],  [89, 166],  [96, 166],  [96, 159],
            [103, 159], [103, 166], [124, 166], [124, 159],
            [131, 159], [131, 166], [145, 166], [145, 159],
            [159, 159], [159, 166], [194, 166], [194, 159],
            [201, 159], [201, 166], [208, 166], [208, 159],
            [75, 166],  [75, 173],  [82, 173],  [82, 166],
            [89, 166],  [89, 173],  [96, 173],  [96, 166],
            [117, 166], [117, 173], [131, 173], [131, 166],
            [138, 166], [138, 173], [152, 173], [152, 166],
            [159, 166], [159, 173], [166, 173], [166, 166],
            [187, 166], [187, 173], [194, 173], [194, 166],
            [19, 173],  [19, 180],  [68, 180],  [68, 173],
            [103, 173], [103, 180], [110, 180], [110, 173],
            [117, 173], [117, 180], [166, 180], [166, 173],
            [173, 173], [173, 180], [180, 180], [180, 173],
            [187, 173], [187, 180], [194, 180], [194, 173],
            [19, 180],  [19, 187],  [26, 187],  [26, 180],
            [61, 180],  [61, 187],  [68, 187],  [68, 180],
            [117, 180], [117, 187], [131, 187], [131, 180],
            [138, 180], [138, 187], [145, 187], [145, 180],
            [152, 180], [152, 187], [166, 187], [166, 180],
            [187, 180], [187, 187], [201, 187], [201, 180],
            [215, 180], [215, 187], [222, 187], [222, 180],
            [19, 187],  [19, 194],  [26, 194],  [26, 187],
            [33, 187],  [33, 194],  [54, 194],  [54, 187],
            [61, 187],  [61, 194],  [68, 194],  [68, 187],
            [75, 187],  [75, 194],  [82, 194],  [82, 187],
            [89, 187],  [89, 194],  [96, 194],  [96, 187],
            [110, 187], [110, 194], [124, 194], [124, 187],
            [131, 187], [131, 194], [138, 194], [138, 187],
            [145, 187], [145, 194], [201, 194], [201, 187],
            [208, 187], [208, 194], [222, 194], [222, 187],
            [19, 194],  [19, 201],  [26, 201],  [26, 194],
            [33, 194],  [33, 201],  [54, 201],  [54, 194],
            [61, 194],  [61, 201],  [68, 201],  [68, 194],
            [75, 194],  [75, 201],  [89, 201],  [89, 194],
            [103, 194], [103, 201], [110, 201], [110, 194],
            [124, 194], [124, 201], [159, 201], [159, 194],
            [166, 194], [166, 201], [173, 201], [173, 194],
            [194, 194], [194, 201], [208, 201], [208, 194],
            [215, 194], [215, 201], [222, 201], [222, 194],
            [19, 201],  [19, 208],  [26, 208],  [26, 201],
            [33, 201],  [33, 208],  [54, 208],  [54, 201],
            [61, 201],  [61, 208],  [68, 208],  [68, 201],
            [82, 201],  [82, 208],  [89, 208],  [89, 201],
            [117, 201], [117, 208], [131, 208], [131, 201],
            [138, 201], [138, 208], [145, 208], [145, 201],
            [180, 201], [180, 208], [194, 208], [194, 201],
            [201, 201], [201, 208], [222, 208], [222, 201],
            [19, 208],  [19, 215],  [26, 215],  [26, 208],
            [61, 208],  [61, 215],  [68, 215],  [68, 208],
            [75, 208],  [75, 215],  [96, 215],  [96, 208],
            [103, 208], [103, 215], [138, 215], [138, 208],
            [145, 208], [145, 215], [159, 215], [159, 208],
            [173, 208], [173, 215], [180, 215], [180, 208],
            [187, 208], [187, 215], [208, 215], [208, 208],
            [215, 208], [215, 215], [222, 215], [222, 208],
            [19, 215],  [19, 222],  [68, 222],  [68, 215],
            [75, 215],  [75, 222],  [82, 222],  [82, 215],
            [89, 215],  [89, 222],  [110, 222], [110, 215],
            [124, 215], [124, 222], [131, 222], [131, 215],
            [152, 215], [152, 222], [180, 222], [180, 215]
        ];

        var anchors = $.map(matrix.paths, function(p) {
            return $.map(p.segments, function(s) {
                return [ s.anchor().toArray() ];
            });
        });

        deepEqual(expectedPoints, anchors);
    });

})();