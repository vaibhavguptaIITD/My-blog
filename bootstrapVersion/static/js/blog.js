var About = {
		initAbout: function()
		{
			var languagesData = 
			{
				"Java":8,
				"Javascript":9,
				"PHP":5,
				"XML":7,
				"XSL":8
					
			},
			languagesChart = Charts.createBarChart(languagesData,"languagesChart",'Computer languages vs proficiency'),
	        frameWorkData = {
		    	'Spring 2.5+':8,
		    	'Hibernate':7,
		    	'Struts 2':9,
		    	'Node.js':7,
		    	'Mybatis':8,
		    	'jQuery':9,
		    	'Maven':8
		    	
		    },
		   frameWorksChart = Charts.createBarChart(frameWorkData,"frameworksChart",'Frameworks vs proficiency'),
		   donutChartsData = 
		   {
				"hcentiveSSE":
				{

	    		   "Spring":
	    		   {
	    	   			"Spring MVC":[20,"Spring MVC is used as the web framework. We migrated the code from Struts 2 to Spring MVC and followed Rest based URL patterns."],
	    	   			"Spring Security":[10,"Spring Security is used to manage role based authentication and authorization."]
	    		   },
	    		   "Javascript":
	    		   {
	    			   "jQuery":[30,"jQuery is used for DOM manipulation. External widgets are applied to the product to enhance usability."],
	    			   "Templating":[10, "In order to decouple javascript code with HTML markup, used jQuery template."],
	    			   "Core Javascript":[20,"I have worked on object oriented javascript and used best practices for high performance. <a hef='#'>Click here</a> for my javascript collection."]
	    		   },
	    		   "Mybatis":
	    		   {
	    			   "Mybatis":[5,"Queries for reports have been implemented using Mybatis"]
	    		   },
	    		   "Hibernate":
	    		   {
	    			   "Hibernate":[4,""]
	    		   },
	    		   "Maven":
	    		   {
	    			   "Maven":[6,"Application is managed using Maven. I have written archetypes and added plugins for JS/CSS minification."]
	    		   }
	    		   
				},
				"hcentiveSE":
				{
					"Struts 2":
					{
						"Struts 2":[20,"Struts 2 was used as the web framework."]
					},
					"Spring":
	    		   {
	    	   			"Spring Security":[10,"Spring Security was used to manage role based authentication and authorization."]
	    		   },
	    		   "Javascript":
	    		   {
	    			   "jQuery":[30,"jQuery is used for DOM manipulation. External widgets are applied to the product to enhance usability."],
	    			   "Validations":[10,"Added client side validations using jQuery Validation plugin. I have written additional validation methods not packaged with the plugin."],
	    			   "Core Javascript":[20,"I have worked on object oriented javascript and used best practices for high performance."]
	    		   },
	    		   "iBatis":
	    		   {
	    			   "iBatis":[5]
	    		   },
	    		   "Hibernate":
	    		   {
	    			   "Hibernate":[4]
	    		   },
	    		   "Maven":
	    		   {
	    			   "Maven":[6,"Application is managed using Maven. I have written archetypes and added plugins for JS/CSS minification."]
	    		   }
					
				},
				"manhASE":
				{
					"JSF":
					{
						"JSF":[30,"Created and maintained tags for the inhouse tag library. Used JSF as the web framework."]
					
					},
					"JSP/Servlets":
					{
						"JSP":[30],
						"Servlet":[20]
						
					},
					"Javascript":
					{
						"Cross browser issues":[10, "Making the application work on IE 6/ IE 7/ IE 8"],
						"Core javascript":[10]
					}
					
				}
				
		   };
			$(".chartControl").click(function()
					{
						var othis = $(this),
						iChild = othis.find("i"),
						id = this.id,
						chartId = id.split("-")[0],
						chartContainer = $("#"+chartId+"-Chart");
						if(iChild.hasClass("icon-plus-sign"))
						{
							chartContainer.slideDown();
							var chart = Charts.createDonutChart(donutChartsData[chartId],chartId+"-Chart","Technologies");
							iChild.data("chart",chart);
							iChild.removeClass("icon-plus-sign").addClass("icon-minus-sign");
							
						}
						else
						{
							var chart = iChild.data("chart");
							chartContainer.slideUp();
							if(chart)
							{
								chart.destroy();
							}
							iChild.removeClass("icon-minus-sign").addClass("icon-plus-sign");
							
						}
				
					}).each(function()
							{
								var othis = $(this),
								iChild = othis.find("i"),
								chartId = this.id.split("-")[0],
								chart = Charts.createDonutChart(donutChartsData[chartId],chartId+"-Chart","Technologies");
								iChild.data("chart",chart);
						
							});
			
	        
		}	
		
},

Charts = {
		
		createDonutChart: function(data, containerId, text)
		{
			var colors = Highcharts.getOptions().colors,
	    	innerDonutData = [],
	    	outerDonutData = [],
	    	categories = _.keys(data),
	    	innerCategory = null,
	    	i = 0;
	    	for(; i < categories.length; i++)
	    	{
	    		var value = data[categories[i]],
	    		innerKeys = _.keys(value),
	    		j = 0,
	    		cummulativeY = 0;
	    		for(; j < innerKeys.length ; j++)
	    		{
	    			var innerValue = value[innerKeys[j]][0],
	    			brightness = 0.2 - (j / innerKeys.length) / 5 ; 
	    			outerDonutData.push({
	    				name: innerKeys[j],
	    				y: innerValue,
	    				color: Highcharts.Color(colors[i]).brighten(brightness).get(),
	    				tooltip:(value[innerKeys[j]].length > 1)?value[innerKeys[j]][1]:""
	    			});
	    			cummulativeY += innerValue;
	    		}
	    		
	    		innerDonutData.push({
    				name: categories[i],
    				y: cummulativeY,
    				color: colors[i]
    			});
	    		
	    	}
			var chart = new Highcharts.Chart({
	    		chart: {
	    			renderTo: containerId,
	    			type: 'pie'
	    		},
	    		title: {
	    			"text": text
	    		},
	    		yAxis: {
	    			title: {
	    				text: 'Percentage'
	    			}
	    		},
	    		plotOptions: {
	    			pie: {
	    				shadow: false
	    			}
	    		},
	    		tooltip: {
	    			formatter: function() {
	    				if(this.point.tooltip)
	    				{
	    					return this.point.tooltip;
	    				}
	    				return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
	    			}
	    		},
	    		series: [{
	    			name: 'Technology',
	    			data: innerDonutData,
	    			size: '60%',
	    			dataLabels: {
	    				formatter: function() {
	    					return this.y > 5 ? this.point.name : null;
	    				},
	    				color: 'white',
	    				distance: -30
	    			}
	    		}, {
	    			name: 'Breakdown',
	    			data: outerDonutData,
	    			innerSize: '60%',
	    			dataLabels: {
	    				formatter: function() {
	    					// display only if larger than 1
	    					return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
	    				}
	    			}
	    		}]
	    	});
			return chart;
		},
		createBarChart: function(data, chartContainer, title)
		{
			var chart = new Highcharts.Chart({
	            chart: {
	                renderTo: chartContainer,
	                type:'bar'
	            },
	            title: {
	                text: title
	            },
	            xAxis: {
	    			categories: _.keys(data)
	    		},
	    		yAxis: {
	    			min: 0,
	    			title: {
	    				text: 'Proficiency'
	    			}
	    		},
	    		legend: {
	    			backgroundColor: '#FFFFFF',
	    			reversed: true
	    		},
	    		tooltip: {
	    			formatter: function() {
	    				return ''+
	    					this.series.name +': '+ this.y +'';
	    			}
	    		},
	    		plotOptions: {
	    			bar: {
	    				dataLabels: {
	    					enabled: true
	    				}
	    			}
	    		},
	    			series: [{
	    			name: 'Proficiency',
	    			data: _.values(data)
	    			}]
	        });
			
			return chart;
			
		}
}

