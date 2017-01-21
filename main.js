var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

	var tower = Game.getObjectById('TOWER_ID');
	if(tower) {
		var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax
		});
		if(closestDamagedStructure) {
			tower.repair(closestDamagedStructure);
		}

		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(closestHostile) {
			tower.attack(closestHostile);
		}
	}
	
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

	if(harvesters.length < 2) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
		
		if (newName != ERR_NOT_ENOUGH_ENERGY)
			console.log('Spawning new harvester: ' + newName);
	}
	

	if(builders.length < 1) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'builder'});
		
		if (newName != ERR_NOT_ENOUGH_ENERGY)
			console.log('Spawning new builder: ' + newName);
	}
	

	if(upgraders.length < 1) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
		
		if (newName != ERR_NOT_ENOUGH_ENERGY)
			console.log('Spawning new upgrader: ' + newName);
	}

	
	for(var name in Game.creeps) {
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
	}
}
