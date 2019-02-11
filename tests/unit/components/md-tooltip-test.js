import { run, later } from '@ember/runloop';
import $ from 'jquery';
import {
    moduleForComponent,
    test
    } from 'ember-qunit';

import Ember from 'ember';
import config from '../../../config/environment';

moduleForComponent('md-tooltip', {
    // Specify the other units that are required for this test
    needs: ['service:utility']
});

var template = Ember.HTMLBars.compile(
    'test'
);

var rootElement = $(config.APP.rootElement);

test('it renders', function(assert) {

    assert.expect(2);

    // Creates the component instance
    var component = this.subject({
        rootElement: rootElement,
        template: template
    });
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');

});

test('it is visible on mouseover', function(assert) {
    var component = this.subject({
        rootElement: rootElement,
        template: template,
        delay: 0
    });

    this.render();

    var e = $.Event('mouseenter');
    run(() => {
        $(component.get('parent')).trigger(e);

        later(this, () => {
            assert.equal(component.get('visible'), true);
        }, 1);
    });
});

test('it becomes invisible on mouseleave', function(assert) {
    assert.expect(2);

    var done = assert.async();

    var component = this.subject({
        rootElement: rootElement,
        template: template,
        delay: 1
    });

    this.render();

    var e = $.Event('mouseenter');
    run(() => {
        $(component.get('parent')).trigger(e);

        later(this, () => {
            assert.equal(component.get('visible'), true, 'Tooltip is visible');
        }, 5);
    });

    run(() => {
        var e2 = $.Event('mouseleave');
        later(this, () => {
            $(component.get('parent')).trigger(e2);
        }, 10);
    });

    later(this, () => {
        assert.equal(component.get('visible'), false, 'Tooltip is hidden');
        done();
    }, 20);


});

test('it should wait for delay before being visible on mouseenter', function(assert) {

    var done = assert.async();

    assert.expect(2);

    var component = this.subject({
        rootElement: rootElement,
        template: template,
        delay: 7
    });

    this.render();

    var e = $.Event('mouseenter');

    run(() => {
        $(component.get('parent')).trigger(e);
        assert.equal(component.get('visible'), false, 'Tooltip still invisible');

        setTimeout(() => {
            assert.equal(component.get('visible'), true, 'Tooltip is visible');
            done();
        }, 15);
    });
});

test('it should show if setVisible is set to true', function(assert) {
    var component = this.subject({
        rootElement: rootElement,
        template: template,
        delay: 1
    });

    this.render();

    run(() => {
        component.set('visible', true);
    });

    later(this, () => {
        var tooltipContent = $(document.body).find('md-tooltip').find('.md-content');
        assert.ok(tooltipContent.hasClass('md-show'), 'Tooltip is visible');
    }, 2);

});

