var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if(creep.memory.building && creep.carry.energy == 0) 
		{
			creep.memory.building = false;
			creep.say('Harvesting');
		}
		if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
			creep.memory.building = true;
			creep.say('Building');
		}

		if(creep.memory.building) 
		{
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
			if(targets.length) {
				if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
		}
		else {
			var sources = creep.room.find(FIND_SOURCES);
			var closest = creep.pos.findClosestByRange(sources);
			if(creep.harvest(closest[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(closest[0]);
			}
		}
	}
};

module.exports = roleBuilder;
