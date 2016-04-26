
define(
	[
		'jquery'
		,'jsorrery/NameSpace'
		,'jsorrery/scenario/CommonCelestialBodies'
		,'jsorrery/scenario/NearEarthObject'
		//,'jsorrery/scenario/MoonSOI'
	],
	function($, ns, common){


		var scenarios = {};
		var list = [];
		var scenario;
		for(var i = 3; i< arguments.length; i++) {
			scenario = arguments[i];
			scenario.bodies = scenario.bodies || {};

			if(scenario.commonBodies){
				$.each(scenario.commonBodies, function(i, bodyName) {
					scenario.bodies[bodyName] = $.extend({}, common[bodyName], scenario.bodies[bodyName]);
				});
			}
			scenarios[scenario.name] = scenario;
			list.push({
				name : scenario.name,
				title : scenario.title || scenario.name,
				help : scenario.help || ''
			});
		}


		return {
			get : function(which) {
				return scenarios[which];
			},
			getList : function(){
				return list;
			}
		};
	}
);
