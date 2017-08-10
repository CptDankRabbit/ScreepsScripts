var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.memory.resource == null)
        {
            creep.memory.resource = 1;
        }
        
        if(!creep.memory.harvesting && creep.carry.energy == 0)
        {
            creep.memory.harvesting = true;
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
            if(creep.harvest(sources[creep.memory.resource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.resource]);
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
                                &&  structure.energy < structure.energyCapacity;
                    }
            });
            
            if(targets.length > 0) 
            {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0]);
                }
                
            }
            else //if all extensions are filled, place in container or Repair :D
            {
            
                /*var targets = creep.room.find(FIND_STRUCTURES, 
                { filter: 
                        (structure) => { return (structure.structureType == STRUCTURE_CONTAINER) 
                                && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity); } 
                });
            
                if(targets.length > 0) 
                { 
            
                    if(creep.pos.getRangeTo(targets[0]) == 0) 
                    { 
                        var source = creep.pos.findClosestByPath(FIND_SOURCES); 
                        creep.harvest(source); 
                    }   
                    else 
                    { 
                        creep.moveTo(targets[0]); 
                    }
                }*/
                //Repair if nothing to do
                var targets = creep.room.find(FIND_STRUCTURES,{
                 filter: object => object.hits < (object.hitsMax/2)
                });

                targets.sort((a,b) => a.hits - b.hits);
            
                console.log(targets[0]);

                if(targets.length != 0) 
                {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(targets[0]);
                    }
                }
                else
                {
                    //do construstions if nothing to repair
                   var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
			        if(targets.length) 
        			{
				        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					    creep.moveTo(targets[0]);
				        }
			        }
                }
            }
            
            
        }
    }
};

module.exports = roleHarvester;
