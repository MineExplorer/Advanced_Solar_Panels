function getSolarPanelGuiContent(name: string, maxOutput: number): UI.WindowContent {
	return {
		standard: {
			header: {text: {text: Translation.translate(name)}},
			inventory: {standard: true},
			background: {standard: true}
		},
		
		params: {
			slot: "asp_slot"
		},
		
		drawing: [
			{type: "background", color: android.graphics.Color.parseColor("#353535")},
			{type: "bitmap", x: 350, y: 40, bitmap: "asp_background", scale: 2.1},
			{type: "bitmap", x: 398, y: 107, bitmap: "asp_energybar_0", scale: GUI_SCALE},
		],
		
		elements: {
			"energyScale": {type: "scale", x: 398 + GUI_SCALE * 4, y: 107, direction: 0, value: 0.5, bitmap: "asp_energybar_1", scale: GUI_SCALE},
			"slot1": {type: "slot", x: 400, y: 235},
			"slot2": {type: "slot", x: 459, y: 235},
			"slot3": {type: "slot", x: 518, y: 235},
			"slot4": {type: "slot", x: 577, y: 235},
			"textStorage": {type: "text", x: 515, y: 105, width: 300, height: 50, text: Translation.translate("Storage: ")},
			"textOutput": {type: "text", x: 515, y: 145, width: 300, height: 20, text: Translation.translate("Max Output: ") + maxOutput + " EU/t"},
			"textGen": {type: "text", x: 515, y: 185, width: 300, height: 39, text: Translation.translate("Generating: ")},
			"light": {type: "image", x: 426, y: 175, bitmap: "asp_dark", scale: GUI_SCALE}
		}
	}
}
