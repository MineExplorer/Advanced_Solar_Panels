ModAPI.addAPICallback("ICore", function(api){
	Launch({
		ICore: api,
		MobEffect: Native.PotionEffect,
		Machine: api.requireGlobal("Machine"),
		MachineRecipe: api.requireGlobal("MachineRecipe"),
		ArmorNanoHelmet: api.requireGlobal("ArmorNanoHelmet"),
		ArmorQuantumHelmet: api.requireGlobal("ArmorQuantumHelmet"),
	});
});