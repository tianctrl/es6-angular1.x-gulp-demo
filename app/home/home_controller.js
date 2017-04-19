export class HomeController {
	constructor() {
		this.name = 'home page';
	}

	$onInit() {
		console.log('home page start');
	}

    $onDestroy() {
        console.log('home page stop');
    }
}