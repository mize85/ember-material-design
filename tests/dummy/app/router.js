import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import googlePageView from './mixins/google-page-view';

const Router = EmberRouter.extend(googlePageView, {
  location: config.locationType,
  rootURL: config.rootURL
});


export default Router.map(function() {
  this.route('buttons');
  this.route('content');
  this.route('divider');
  this.route('card');
  this.route('input');
  this.route('list');
  this.route('toolbar');
  this.route('checkbox');
  this.route('slider');
  this.route('progress-circular');
  this.route('progress-linear');
  this.route('icon');
  this.route('radio-button');
  this.route('tabs');
  this.route('typography');
  this.route('tooltip');
  this.route('toast');
  this.route('whiteframe');
  this.route('sidenav');
  this.route('fab-toolbar');
  this.route('fab-speed-dial');
  this.route('menu');
});
