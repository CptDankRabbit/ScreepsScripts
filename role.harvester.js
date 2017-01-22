var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var NodeNumber = Math.floor(Math.random() * 2);
        //console.log(NodeNumber);
        
        if(!creep.memory.harvesting && creep.carry.energy == 0){
            creep.memory.harvesting = true;
            creep.memory.nodenumber = NodeNumber; //Attempting to choose random node
			creep.say('Harvesting');
        }
        
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
			creep.memory.harvesting = false;
			creep.say('Storing');
		}
		
        if(creep.memory.harvesting) 
        {   
            var sources = creep.room.find(FIND_SOURCES);
			var closest = creep.pos.findClosestByRange(sources);
			creep.pos
            if(creep.harvest(sources[creep.memory.nodenumber]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.nodenumber]);
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
                }
                
            }
        }
    }
};

module.exports = roleHarvester;
