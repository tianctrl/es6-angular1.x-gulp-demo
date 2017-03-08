import {ProfileController} from './profile_controller';

export const stateName = 'profile';

export const stateUrl = '/profile';

export default function stateConfig($stateProvider) {
	$stateProvider.state(stateName, {
		url: stateUrl,
		views: {
			'': {
				controller: ProfileController,
				controllerAs: '$ctrl',
				templateUrl: 'profile/profile.html',
			}
		}
	})
}