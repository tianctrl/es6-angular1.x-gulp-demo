import stateConfig from './profile_stateconfig';

export default angular.module('horTest.profile',
	[
	  'ui.router'
	])
	.config(stateConfig);