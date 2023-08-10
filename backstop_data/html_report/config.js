report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Homepage_0_document_0_desktop.png",
        "test": "../bitmaps_test/20230729-025842/backstop_default_Homepage_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Homepage_0_document_0_desktop.png",
        "label": "Homepage",
        "misMatchThreshold": 0.1,
        "url": "http://my.rockford.edu/",
        "referenceUrl": "https://mesa.ucop.edu/",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 15,
            "height": -6418
          },
          "rawMisMatchPercentage": 14.349590554035771,
          "misMatchPercentage": "14.35",
          "analysisTime": 177
        },
        "diffImage": "../bitmaps_test/20230729-025842/failed_diff_backstop_default_Homepage_0_document_0_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});