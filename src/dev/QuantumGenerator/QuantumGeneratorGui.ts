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
		"indicator": {type: "image", x: 145 * guiScaleNew, y: 21 * guiScaleNew, bitmap: "quantum_generator_off", scale: guiScaleNew},
		"powerMinus100": {type: "button", x: 0 * guiScaleNew, y: 50 * guiScaleNew, bitmap: "quantum_generator_button_2", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changePower", {value: -100});
			}
		}},
		"powerMinus10": {type: "button", x: 40 * guiScaleNew, y: 50 * guiScaleNew, bitmap: "quantum_generator_button_1", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changePower", {value: -10});
			}
		}},
		"powerMinus1": {type: "button", x: 80 * guiScaleNew, y: 50 * guiScaleNew, bitmap: "quantum_generator_button_0", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changePower", {value: -1});
			}
		}},
		"powerPlus1": {type: "button", x: 120 * guiScaleNew, y: 50 * guiScaleNew, bitmap: "quantum_generator_button_0", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changePower", {value: 1});
			}
		}},
		"powerPlus10": {type: "button", x: 160 * guiScaleNew, y: 50 * guiScaleNew, bitmap: "quantum_generator_button_1", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changePower", {value: 10});
			}
		}},
		"powerPlus100": {type: "button", x: 200 * guiScaleNew, y: 50 * guiScaleNew, bitmap: "quantum_generator_button_2", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changePower", {value: 100});
			}
		}},
		"voltageMinus100": {type: "button", x: 0 * guiScaleNew, y: 90 * guiScaleNew, bitmap: "quantum_generator_button_1", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changeVoltage", {value: -100});
			}
		}},
		"voltageMinus10": {type: "button", x: 100 * guiScaleNew, y: 90 * guiScaleNew, bitmap: "quantum_generator_button_1", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changeVoltage", {value: -10});
			}
		}},
		"voltageMinus1": {type: "button", x: 200 * guiScaleNew, y: 90 * guiScaleNew, bitmap: "quantum_generator_button_1", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changeVoltage", {value: -1});
			}
		}},
		"voltagePlus1": {type: "button", x: 300 * guiScaleNew, y: 90 * guiScaleNew, bitmap: "quantum_generator_button_1", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changeVoltage", {value: 1});
			}
		}},
		"voltagePlus10": {type: "button", x: 400 * guiScaleNew, y: 90 * guiScaleNew, bitmap: "quantum_generator_button_0", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changeVoltage", {value: 10});
			}
		}},
		"voltagePlus100": {type: "button", x: 500 * guiScaleNew, y: 90 * guiScaleNew, bitmap: "quantum_generator_button_1", scale: guiScaleNew, clicker: {
			onClick: function(_, container: ItemContainer) {
				container.sendEvent("changeVoltage", {value: 100});
			}
		}},
	}
});