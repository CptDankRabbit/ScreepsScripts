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
		    var containers = creep.room.find(FIND_STRUCTURES, //Finds Containers with Energy
            { 
                filter: 
                    (structure) => { return (structure.structureType == STRUCTURE_CONTAINER) 
                                    && (structure.store[RESOURCE_ENERGY] > 0); }
            });
            
	        var source = creep.pos.findClosestByPath(containers); //Finds Closest Containers
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            { 
                creep.moveTo(source);
            }
            else
            {
                var sources = creep.room.find(FIND_SOURCES)
                var closest = creep.pos.findClosestByRange(sources)
                
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[1]);
                }
                else
                {
                    creep.moveTo(Game.flags.Idle);
                }
            }
            
			/*var sources = creep.room.find(FIND_SOURCES); //Old method to use nodes, now uses containers than nodes.
			var closest = creep.pos.findClosestByRange(sources);
			creep.pos
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
			{
				creep.moveTo(sources[0]);
			}
			else
            {
                creep.moveTo(Game.flags.Idle);
            }*/
		}
	}
};

module.exports = roleBuilder;
