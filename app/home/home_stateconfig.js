import {HomeController} from './home_controller';

export const homeStateName = 'home';

export const homeStateUrl = '/home';

export default function stateConfig($stateProvider) {
	$stateProvider.state(homeStateName, {
		url: homeStateUrl,
		views: {
		  '': {
		  	controller: HomeController,
		  	controllerAs: '$ctrl',
		  	templateUrl: 'home/home.html',
		  }
		}
	})
}