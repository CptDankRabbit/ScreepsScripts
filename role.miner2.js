/* FOR OTHER CREEPS TO ACCESS THE CONTAINER!
    var containers = creep.room.find(FIND_STRUCTURES, 
    { 
        filter: 
        (structure) => { return (structure.structureType == STRUCTURE_CONTAINER) 
                                && (structure.store[RESOURCE_ENERGY] > 0); }
    });
    
    var source = creep.pos.findClosestByPath(containers);
    if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
    { 
        creep.moveTo(source);
    }*/

var roleMiner2 = { 
    /** @param {Creep} creep **/ 
    run: function(creep) {
        
        var targets = creep.room.find(FIND_STRUCTURES, 
        { filter: 
            (structure) => { return (structure.structureType == STRUCTURE_CONTAINER) 
            && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity); } 
        });
            
        if(targets.length > 0) 
        { 
            //var NodeNumber = _.filter(Game.creeps, (creep) => creep.memory.role == "NodeNumber");
            
            if(creep.pos.getRangeTo(targets[1]) == 0) 
            { 
                var source = creep.pos.findClosestByPath(FIND_SOURCES); 
                creep.harvest(source); 
            } 
            else 
            { 
                creep.moveTo(targets[1]); 
            }
        } 
        
    }
}
    
module.exports = roleMiner2;
