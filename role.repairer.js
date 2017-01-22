var roleRepairer = {
  
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) 
        {
            var NodeNumber = Math.floor(Math.random() * 2);
            
            creep.memory.nodenumber = NodeNumber;
            creep.memory.repairing = false;
            creep.say('Collecting');
        }
        
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) 
        {
            creep.memory.repairing = true;
            creep.say('Repairing');
        }

        if(creep.memory.repairing) 
        {
            var targets = creep.room.find(FIND_STRUCTURES, {
             filter: object => object.hits < (object.hitsMax/2)
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) 
            {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) 
                {
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
            if(creep.harvest(sources[creep.memory.nodenumber]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(sources[creep.memory.nodenumber]);
                
            }
        }
    }
}; 
module.exports = roleRepairer;