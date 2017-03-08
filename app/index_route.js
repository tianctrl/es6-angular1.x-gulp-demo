import {homeStateUrl as defaultStateUrl} from './home/home_stateconfig';

export default function routeConfig($urlRouterProvider) {
	$urlRouterProvider.otherwise(defaultStateUrl);
}