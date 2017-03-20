import homeModule from './home/home_module';
import profileModule from './profile/profile_module';
import indexRoute from './index_route';
import navModule from './component/nav/nav_module';

export default angular.module('horTest',
	[
	  'ngAnimate',
	  'ngAria',
      'ngMaterial',
      'ngMessages',
      'ngResource',
      'ngSanitize',
      'ui.router',
      homeModule.name,
      profileModule.name,
      navModule.name,
    ])
	.config(indexRoute);