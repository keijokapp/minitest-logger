// no imports

import LoadedPromise from './LoadedPromise';
import { assert } from './assert';


function App(name) {
	var rootElement = null;
	var controllers = [ ];
	var controlledElements = [ ];

	var bootstrap = function() {
		var e = rootElement.querySelectorAll('[ng-controller]');
		for(var i = 0, l = e.length; i < l; i++) {
			
		}
	}

	LoadedPromise.then(function() {
		rootElement = document.querySelector('[ng-app='+name+']');
		
		if(!rootElement) throw new Error;

	
	}

	return {
		controller: function(name, controller) {
			console.assert(controller instanceof Controller);
			this.controller.push(controller);
			if(rootElement) searchControllers();
		},
		
		service: function
		
		
	}
}



export default window.angular.module('logger', []);

