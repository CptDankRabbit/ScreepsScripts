var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy !== creep.carryCapacity) 
        {   
            var sources = creep.room.find(FIND_SOURCES);
			var closest = creep.pos.findClosestByRange(sources);
            if(creep.harvest(closest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closest);
                creep.say('Collecting')
            }
        }
        else 
        {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => 
                    {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) 
                                && structure.energy < structure.energyCapacity;
                    }
            });
            
            if(targets.length > 0) 
            {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0]);
                    creep.say('Storing')
                }
                
            }
        }
    }
};

module.exports = roleHarvester;
