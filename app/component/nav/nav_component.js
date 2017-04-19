export class NavController {
    constructor() {
        this.home = 'Home';
        this.profile = 'Profile';
    }

    $onInit() {
        console.log('onInit event');
    }

    $onDestroy() {
        console.log('onDestroy event');
    }
}

export const navComponent = {
    controller: NavController,
    templateUrl: 'component/nav/nav.html'
};