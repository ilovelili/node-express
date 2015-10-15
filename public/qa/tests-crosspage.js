var Browser = require("zombie"),
    assert = require("chai").assert,
    browser;

suite('Cross-page-tests', function() {
    setup(function() {
        browser = new Browser();
    });

    test('requesting a group rate quote from the hood river tour page ' +
        'should populate the referrer field',
        function(done) {
            var referrer = 'http://{{IP}}:{{PORT}}/tours/hood-river'.replace('{{IP}}', process.env.IP).replace('{{PORT}}', process.env.PORT);
            browser.visit(referrer, function() {
                browser.clickLink('.requestGroupRate', function() {
                    assert(browser.field('referrer').value === referrer);
                    done();
                });
            });
        });

    test('requesting a group rate from the oregon coast tour page should ' +
        'populate the referrer field',
        function(done) {
            var referrer = 'http://{{IP}}:{{PORT}}/tours/oregon-coast'.replace('{{IP}}', process.env.IP).replace('{{PORT}}', process.env.PORT);
            browser.visit(referrer, function() {
                browser.clickLink('.requestGroupRate', function() {
                    assert(browser.field('referrer').value === referrer);
                    done();
                });
            });
        });
        
    test('visiting the "request group rate" page dirctly should result ' +
        'in an empty referrer field',
        function(done) {
            browser.visit('http://{{IP}}:{{PORT}}/tours/request-group-rate'.replace('{{IP}}', process.env.IP).replace('{{PORT}}', process.env.PORT),
                function() {
                    assert(browser.field('referrer').value === '');
                    done();
                });
        });

});