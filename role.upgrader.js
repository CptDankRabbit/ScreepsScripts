var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) 
        {
            creep.memory.upgrading = false;
            creep.say('Harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('Upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else 
        {
            var miner = _.filter(Game.creeps, (creep) => creep.memory.role == "miner");
            
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
            }
            
	        //Old Method -- Was to mine node, new method collects from container!
	        /*var source = creep.pos.findClosestByPath(containers);
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            { 
                creep.moveTo(source);
            }*/
        }
    }
};

module.exports = roleUpgrader;
