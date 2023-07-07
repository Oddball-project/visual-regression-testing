report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Homepage_0_document_0_desktop.png",
        "test": "../bitmaps_test/20230707-120500/backstop_default_Homepage_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Homepage_0_document_0_desktop.png",
        "label": "Homepage",
        "misMatchThreshold": 0.1,
        "url": "https://dev-greyscalegorilla.pantheonsite.io",
        "referenceUrl": "https://greyscalegorilla.com",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": 349
          },
          "rawMisMatchPercentage": 30.03200453442699,
          "misMatchPercentage": "30.03",
          "analysisTime": 457
        },
        "diffImage": "../bitmaps_test/20230707-120500/failed_diff_backstop_default_Homepage_0_document_0_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});