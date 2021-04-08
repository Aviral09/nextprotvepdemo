var state_view = true;

const viewFeature = (e) => {
	const curr = e.value;
	if (!curr) {
		alert("Please enter a valid accession number.");
		return;
	}
  if(state_view)
	  getFeatureViewer(curr);
};

const getFeatureViewer = (url_data) => {
	const applicationName = "Demo";
	const clientInfo = "Aviral";
	const nx = new Nextprot.Client(applicationName, clientInfo);
	let isoform = url_data;
	var options = {
		showAxis: true,
		showSequence: true,
		brushActive: true,
		toolbar: true,
		bubbleHelp: true,
		zoomMax: 10,
	};

  //add buttons for programmatic zoom

	nxFeatureViewer(nx, isoform, "#fv2", options)
		.then(function (ff) {
			const styles = [
				{
					name: "Propeptide",
					className: "pro",
					color: "#B3B3B3",
					type: "rect",
					filter: "Processing",
				},
				{
					name: "Mature protein",
					className: "mat",
					color: "#B3B3C2",
					type: "rect",
					filter: "Processing",
				},
				{
					name: "Variant",
					className: "variant",
					color: "rgba(0,255,154,0.3)",
					type: "unique",
					filter: "Variant",
				},
				{
					name: "Disulfide bond",
					className: "dsB",
					color: "#B3B3E1",
					type: "path",
					filter: "Modified Residue",
				},
			];
			ff.addNxFeature(
				["propeptide", "mature-protein", "variant", "disulfide-bond"],
				styles
			);
		})
		.then(() => {state_view = false;})
		.catch((err) => {
			alert("Something went wrong! Please try again.");
		});
};



