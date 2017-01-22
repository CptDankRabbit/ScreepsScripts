var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () 
{

	var tower = Game.getObjectById('TOWER_ID');
	if(tower) 
	{
		var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax});
			
		if(closestDamagedStructure) 
		{
			tower.repair(closestDamagedStructure);
		}

		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(closestHostile) 
		{
			tower.attack(closestHostile);
		}
	}
	
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	var builders   = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var upgraders  = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var repairers  = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
	if(harvesters.length <= 4) 
	{
		var newName = Game.spawns['InitialSpawn'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester'}); //[WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE] == 500 Energy
		
		if (newName != ERR_NOT_ENOUGH_ENERGY)
			console.log('Spawning new harvester: ' + newName);
	}
	

	if(builders.length <= 3) 
	{
		var newName = Game.spawns['InitialSpawn'].createCreep([WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: 'builder'});
		
		if (newName != ERR_NOT_ENOUGH_ENERGY)
			console.log('Spawning new builder: ' + newName);
	}
	

	if(upgraders.length <= 3) 
	{
		var newName = Game.spawns['InitialSpawn'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'}); //Add 1 work
		
		if (newName != ERR_NOT_ENOUGH_ENERGY)
			console.log('Spawning new upgrader: ' + newName);
	}
	
	if(repairers.length <= 1)
	{
	    var newName = Game.spawns['InitialSpawn'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer'});
		
		if (newName != ERR_NOT_ENOUGH_ENERGY)
			console.log('Spawning new repairer: ' + newName);
	}

	
	for(var name in Game.creeps) 
	{
		var creep = Game.creeps[name];
		if(creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		}
		if(creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		}
		if(creep.memory.role == 'builder') {
			roleBuilder.run(creep);
		}
		if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
	}
	
}
