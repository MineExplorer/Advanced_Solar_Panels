const guiQuantumGenerator = new UI.StandardWindow({
	standard: {
		header: {text: {text: Translation.translate("quantum_generator")}},
		background: {color: Color.parseColor("#5c5c5c")}
	},

	drawing: [
		{type: "bitmap", x: 91 * guiScaleNew, y: 21 * guiScaleNew, bitmap: "quantum_generator_info", scale: guiScaleNew},
		{type: "bitmap", x: 91 * guiScaleNew, y: 65 * guiScaleNew, bitmap: "quantum_generator_info", scale: guiScaleNew}
	],

	elements: {
		"textOutput": {type: "text", x: 40 * guiScaleNew, y: 26 * guiScaleNew, width: 300, height: 30 * guiScaleNew, text: Translation.translate("Output: ")},
		"textOutputAmount": {type: "text", x: 100 * guiScaleNew, y: 26 * guiScaleNew, width: 300, height: 30 * guiScaleNew, text: "0"},
		"textVoltage": {type: "text", x: 40 * guiScaleNew, y: 70 * guiScaleNew, width: 300, height: 30 * guiScaleNew, text: Translation.translate("Voltage: ")},
		"textVoltageAmount": {type: "text", x: 100 * guiScaleNew, y: 70 * guiScaleNew, width: 300, height: 30 * guiScaleNew, text: "0"},
		"indicator": {type: "image", x: 145 * guiScaleNew, y: 21 * guiScaleNew, bitmap: "quantum_generator_off", scale: guiScaleNew}
	}
});