/*
   ___        _                                                    ____                                 ____
  / _ \      | |                                            _     / ___|          _                    |  _ \                         _
 | (_) |   __| |  _    _   __ _   _ __     ___    ___    __| |   | |__     ___   | |   __ _   _ __     | |_) |  __ _   _ __     ___  | |  ___
 |  _  |  / _` | \ \  / / / _` | | '_ \   / __|  / _ \  / _` |    \__ \   / _ \  | |  / _` | | '__|    |  __/  / _` | | '_ \   / _ \ | | / __|
 | | | | | (_| |  \ \/ / | (_| | | | | | | |__  |  __/ | (_| |    ___| | | (_) | | | | (_| | | |       | |    | (_| | | | | | |  __/ | | \__ \
 |_| |_|  \__,_|   \__/   \__,_| |_| |_|  \___|  \___|  \__,_|   |____/   \___/  |_|  \__,_| |_|       |_|     \__,_| |_| |_|  \___| |_| |___/
                     
 by MrMacflame (VK: vk.com/mrmacflame), MajaProduction (VK: vk.com/mc.maja) and MineExplorer (VK: vk.com/vlad.gr2027, YouTube: http://www.youtube.com/c/MineExplorer2027)

 This code is a copyright, do not distribute.
*/
Callback.addCallback("LevelLoaded", function(){
	Game.message(ChatColor.PURPLE + "Advanced Solar Panels v1.1");
});

var nativeGetLightLevel = ModAPI.requireGlobal("Level.getBrightness");

var GUI_BAR_STANDART_SCALE = 3.2;

ModAPI.registerAPI("ASPAddonLoaded", null);