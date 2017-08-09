var roleRepairer = {
  
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) 
        {
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
            
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) =>s.hits < (s.hitsMax / 2) &&  s.structureType == STRUCTURE_CONTAINER ||
                s.hits < (s.hitsMax / 2) && s.structureType != STRUCTURE_WALL
                
            });
            
             if (structure != undefined) 
             {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(structure);
                }
            }
            else
            {
                creep.moveTo(Game.flags.Idle);
            }
           /*var targets = creep.room.find(FIND_STRUCTURES,{
             filter: object => object.hits < (object.hitsMax/2)
            });

            targets.sort((a,b) => a.hits - b.hits);
            
            //console.log(targets[0]);

            if(targets.length > 0) 
            {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0]);
                }
            }*/
        } 
        else 
        {
            var sources = creep.room.find(FIND_SOURCES); //usage = sources[0]
            var closest = creep.pos.findClosestByRange(sources);
			creep.pos;
            
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(sources[0]);
            }
        }
    }
}; 
module.exports = roleRepairer;