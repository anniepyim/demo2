$( document ).ready(function() {
var datacontent = 
[{label: "Hepatocyte",value: 10},
{label: "Bone marrow cell",value: 2},
{label: "Extraembryonic endoderm stem cell",value: 1},
{label: "Cerebellum cell",value: 4},
{label: "Embryonic brain cell",value: 5},
{label: "Neural progenitor",value: 3},
{label: "Heart cell",value: 3},
{label: "Fetal liver erythroblast",value: 1},
{label: "Pro-B cell",value: 2},
{label: "Brain cell",value: 1},
{label: "Neural precursor",value: 1},
{label: "Induced pluripotent cell",value: 7},
{label: "Embryonic heart cell",value: 4},
{label: "Neuronal precursor",value: 4},
{label: "Testis cell",value: 3},
{label: "Embryoid body",value: 2},
{label: "Muscle progenitor",value: 5},
{label: "Intestinal cell",value: 4},
{label: "Myoblast",value: 1},
{label: "Thymus cell",value: 2},
{label: "Embryonic stem cell",value: 176},
{label: "Motor neuron progenitor",value: 3},
{label: "Cortex cell",value: 4},
{label: "Pre-iPS cell",value: 10},
{label: "Trophoblast stem cell",value: 2},
{label: "Olfactory bulb cell",value: 5},
{label: "Embryonic carcinoma cell",value: 2},
{label: "T helper2 cell",value: 1},
{label: "Placenta cell",value: 3},
{label: "Spleen cell",value: 3},
{label: "Embryonic limb cell",value: 2},
{label: "Embryonic fibroblast",value: 14},
{label: "Secondary fibroblast",value: 2},
{label: "Lung cell",value: 5},
{label: "Neural progenitor cell",value: 2},
{label: "Dermal fibroblast",value: 2},
{label: "Neural stem cell",value: 4},
{label: "Liver cell",value: 3},
{label: "Embryonic liver cell",value: 1}];

d3.csv("testcell.csv", function(error, data) {

  data.forEach(function(d) {
    d.count = +d.count;
  });

var pie = new d3pie("piechart-container", {
		size: {
			pieOuterRadius: "80%",
			canvasHeight: $(document).height()*0.45,
			canvasWidth: $(document).width()*0.37,
		},
		data: {
			sortOrder: "value-asc",
			smallSegmentGrouping: {
				enabled: true,
				value: 1,
				valueType: "percentage",
				label: "Others",
				color: "#999999"
			},
			content: datacontent
		}
	});
	});
})