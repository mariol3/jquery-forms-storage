/*
 *	Simple jQuery plugin to automate forms storing through
 *	the HTML5 Storage API. 
 *
 *	NOTE:	This is not a pro code. It's just an experiment
 *			that I made and decided to share with other people
 *			with this type of problem. Sorry if best pratices
 *			don't live here! :P
 *
 *	Author: Mario Grimaldi <mario.grimaldi89@gmail.com>
 *
 *	WARNING: 	To work it needs that form elements have at least
 *				an id or a name.
 *
 *	TODO:
 *			add a clear method.
 */


(function($) {

	// Plugin methods
	var methods = {
		// Store all values of a form elements
		store:	function() {
			console.log("Storing : " + this.attr("id"));
			var form = this.get(0); // Gets the form DOM
			
			if(form && form.tagName.toLowerCase() == 'form') {
				var formElements = form.elements;
				
				for(var i=0; i<formElements.length; i++) {
					var element = formElements[i];
					var tagName = element.tagName.toLowerCase();
					var key = element.name || element.id;
					
					/*
					 * If nor name or id are setted then there isn't a valid
					 * key to associate the element value. Skip this element.
					 */
					if(!key) {
						throw new Error("Couldn't store an " + tagName + " element. Check for elements to have names or ids!");
						continue;
					}
					
					if(tagName == 'input') {
						var type = element.type.toLowerCase();
						
						if(type == 'text' || type == 'password' || type == 'file') {
							localStorage.setItem(key, element.value);
						}
						else if(type == 'checkbox' || type == 'radio') {
							localStorage.setItem(key, true);
							localStorage.setItem(element.value, element.checked);
						}
					}
					else if(tagName == 'select') {
						localStorage.setItem(key, element.selectedIndex);
					}
					else if(tagName == 'textarea') {
						localStorage.setItem(key, element.value);
					}
				}
			}
			else {
				throw new TypeError('The element specified is not a form.');
			}
		},
		
		// Retrieves all values of a form elements
		backup:	function(form) {
			console.log("Backup : " + this.attr("id"));
			var form = this.get(0); // Gets the form DOM
			
			if(form && form.tagName.toLowerCase() == 'form') {
				var formElements = form.elements;
				
				for(var i=0; i<formElements.length; i++) {
					var element = formElements[i];
					var tagName = element.tagName.toLowerCase();
					var key = element.name || element.id;
					var backup = localStorage.getItem(key);
					
					/*
					 * If nor name or id are setted then there isn't a valid
					 * key to associate the element value. Skip this element.
					 */
					if(!key) {
						throw new Error("Couldn't backup a " + tagName + " element. Check for elements to have names or ids!");
						continue;
					}
					
					if(backup) {
						if(tagName == 'input') {
							var type = element.type.toLowerCase();
							
							if(type == 'text' || type == 'password' || type == 'file') {
								element.value = backup;
							}
							else if(type == 'checkbox' || type == 'radio') {
								var checked = localStorage.getItem(element.value) == 'true';
								element.checked = checked;
							}
						}
						else if(tagName == 'select') {
							element.selectedIndex = backup;
						}
						else if(tagName == 'textarea') {
							element.value = backup;
						}
					}
				}
			}
			else {
				throw new TypeError('The element specified is not a form.');
			}
		}
	};

	// Plugin entry point method
	$.fn.formStorage = function(method) {
		
		if (methods[method]) {
			return this.each(function() {
				var $this = $(this);
				methods[method].apply($this);
			});
		}
		else {
			$.error("Method " + method + " does not exist on jQuery.formStorage");
		}
	
	};

})(jQuery);