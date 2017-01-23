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
        
			if(targets.length) 
			{
				if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
			else
            {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => 
                    {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_TOWER) 
                                && structure.energy < structure.energyCapacity;
                    }
                });
            
                if(targets.length > 0) 
                {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(targets[0]);
                    }
                }
            }
		}
		else 
		{
			var sources = creep.room.find(FIND_SOURCES);
			var closest = creep.pos.findClosestByRange(sources);
			creep.pos
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
			{
				creep.moveTo(sources[0]);
			}
		}
	}
};

module.exports = roleBuilder;
