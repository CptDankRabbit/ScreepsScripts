 //To Execute
 //require('misc').RoleCall;
 
 function RoleCall()
 {
    var NameAllHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var NameAllBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var NameAllUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var NameAllRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
	
	var TotalCreeps = NameAllHarvesters.length + NameAllBuilders.length + NameAllUpgraders.length + NameAllRepairers.length;
	
   	console.log("Name of all Harvesters = " + NameAllHarvesters)
	console.log("Name of all Builders = " + NameAllBuilders)
	console.log("Name of all Upgraders = " + NameAllUpgraders)
	console.log("Name of all Repairers = " + NameAllRepairers)
	console.log("Total Creeps = " + TotalCreeps)
	//console.log("")
}

module.exports.GetCost = RoleCall();
