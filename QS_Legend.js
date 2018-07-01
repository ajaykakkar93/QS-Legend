define(["qlik" ,"css!./style.css"],
function (qlik) {
	return {
		initialProperties: {
			legendMeta:[]
        },
		definition:{
			type: "items",
			component: "accordion",
			items: {
				LegendStyle: {
					label:"Legend Style",
					items: {
						Orientation: {
								type: "string",
								component: "buttongroup",
								label: "Orientation buttons",
								ref: "orientation",
								options: [{
									value: "v",
									label: "Vertical",
									tooltip: "Select for vertical"
								}, {
									value: "h",
									label: "Horizontal",
									tooltip: "Select for horizontal"
								}],
								defaultValue: "v"
						}
						// add more prop here
					}
				},
				LegendMetaData: {
					label:"Legend Settings",
					type:"array",
					ref:"legendMeta",
					min:1,
					max:10,
					itemTitleRef:"value",
					allowAdd: true,
                    allowRemove: true,
                    addTranslation: "Add Legend",
					items:{
						bgcolor: {
								ref: "bgcolor",
								label: "Legend Background Color",
								type: "string",
								defaultValue: "#4286f4",
								expression:"optional"
						},
						value: {
								ref: "value",
								label: "Legend Value",
								type: "string",
								defaultValue: "Legend 1",
								expression:"optional"
						}
					}
				}
				// end
			}
		},
		support : {
			snapshot: true,
			export: true,
			exportData : false
		},
		paint: function ($element,layout) {
			//add your rendering code here
			$element.empty();
			var objId=layout.qInfo.qId;
			console.log(layout);
			var html='';
			var scale = layout.orientation == 'v'? 'legend-scale' : 'Horizontal-scale';
			var labels = layout.orientation == 'v'? 'legend-labels' : 'Horizontal-labels';
				//Horizontal-scale to legend-scale
				//Horizontal-labels to legend-labels
			html+='<div class="my-legend">'+
				'<div class="'+scale+'">'+
				  '<ul class="'+labels+'" id="legend_'+objId+'">'+
				  '</ul>'+
				'</div>'+
				'</div>';
			$element.html(html);
			$.each(layout.legendMeta,function(key,val){
				var bgcolor = val.bgcolor,
					cId = val.cId,
					value = val.value;
					$('#legend_'+objId).append('<li><span id="legend_cid_'+cId+'" style="background:'+bgcolor+';"></span>'+value+'</li>');
			});
			//needed for export
			return qlik.Promise.resolve();
		}
	};
} );

