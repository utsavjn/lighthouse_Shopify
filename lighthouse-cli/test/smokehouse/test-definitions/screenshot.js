/**
 * @license Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/** @type {LH.Config.Json} */
const config = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    screenEmulation: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false,
      disabled: false,
    },
  },
};

const elements = {
  body: {
    top: 8,
    bottom: 1008,
    left: 8,
    right: 1008,
    width: 1000,
    height: 1000,
  },
  p: {
    top: 8,
    left: 8,
    height: '>40',
  },
};

/**
 * @type {Smokehouse.ExpectedRunnerResult}
 */
const expectations = {
  artifacts: {
    FullPageScreenshot: {
      screenshot: {
        width: '>1000',
        height: '>1000',
        data: /data:image\/webp;base64,.{10000,}$/,
      },
      nodes: {
        // Gathered with no execution context isolation, shared between both FR and legacy.
        'page-0-P': {...elements.p},

        // Legacy execution context IDs.
        // Note: The first number (5) in these ids comes from an executionContextId, and has the potential to change.
        // The following P is the same element as above but from a different JS context. This element
        // starts with height ~18 and grows over time. See screenshot.html.
        '5-0-BODY': {_legacyOnly: true, ...elements.body, _maxChromiumVersion: '104.0.5098.0'},
        '5-2-P': {_legacyOnly: true, ...elements.p, _maxChromiumVersion: '104.0.5098.0'},
        '5-3-HTML': {_legacyOnly: true, _maxChromiumVersion: '104.0.5098.0'},
        // Legacy runner execution context ID changed after 104.0.5100.0
        '4-0-BODY': {_legacyOnly: true, ...elements.body, _minChromiumVersion: '104.0.5100.0'},
        '4-2-P': {_legacyOnly: true, ...elements.p, _minChromiumVersion: '104.0.5100.0'},
        '4-3-HTML': {_legacyOnly: true, _minChromiumVersion: '104.0.5100.0'},

        // Fraggle rock should contain the same elements just with different ids.
        '9-0-P': {_fraggleRockOnly: true, ...elements.p},
        '9-2-BODY': {_fraggleRockOnly: true, ...elements.body},
        '9-1-HTML': {_fraggleRockOnly: true},
      },
    },
  },
  lhr: {
    requestedUrl: 'http://localhost:10200/screenshot.html?width=1000px&height=1000px',
    finalUrl: 'http://localhost:10200/screenshot.html?width=1000px&height=1000px',
    audits: {},
  },
};

export default {
  id: 'screenshot',
  expectations,
  config,
};
