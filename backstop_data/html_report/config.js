report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Homepage_0_document_0_desktop.png",
        "test": "../bitmaps_test/20230628-061625/backstop_default_Homepage_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Homepage_0_document_0_desktop.png",
        "label": "Homepage",
        "misMatchThreshold": 0.1,
        "url": "https://dev-greyscalegorilla.pantheonsite.io//",
        "referenceUrl": "https://greyscalegorilla.com",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": 349
          },
          "rawMisMatchPercentage": 29.99485485268631,
          "misMatchPercentage": "29.99",
          "analysisTime": 471
        },
        "diffImage": "../bitmaps_test/20230628-061625/failed_diff_backstop_default_Homepage_0_document_0_desktop.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_JOIN-PLUS_0_document_0_desktop.png",
        "test": "../bitmaps_test/20230628-061625/backstop_default_JOIN-PLUS_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_JOIN-PLUS_0_document_0_desktop.png",
        "label": "JOIN-PLUS",
        "misMatchThreshold": 0.1,
        "url": "https://dev-greyscalegorilla.pantheonsite.io/join-plus",
        "referenceUrl": "https://greyscalegorilla.com/join-plus",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": 189
          },
          "rawMisMatchPercentage": 26.03754261758976,
          "misMatchPercentage": "26.04",
          "analysisTime": 398
        },
        "diffImage": "../bitmaps_test/20230628-061625/failed_diff_backstop_default_JOIN-PLUS_0_document_0_desktop.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_BLOG_0_document_0_desktop.png",
        "test": "../bitmaps_test/20230628-061625/backstop_default_BLOG_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_BLOG_0_document_0_desktop.png",
        "label": "BLOG",
        "misMatchThreshold": 0.1,
        "url": "https://dev-greyscalegorilla.pantheonsite.io/blog",
        "referenceUrl": "https://greyscalegorilla.com/blog",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -82
          },
          "rawMisMatchPercentage": 41.04946275979434,
          "misMatchPercentage": "41.05",
          "analysisTime": 250
        },
        "diffImage": "../bitmaps_test/20230628-061625/failed_diff_backstop_default_BLOG_0_document_0_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});