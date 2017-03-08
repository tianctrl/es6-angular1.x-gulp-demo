import stateConfig from './home_stateconfig';

export default angular.module('horTest.home',
	[
	  'ui.router'
	])
	.config(stateConfig);