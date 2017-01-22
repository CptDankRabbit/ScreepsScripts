var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            var NodeNumber = Math.floor(Math.random() * 2);
            
            creep.memory.nodenumber = NodeNumber;
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
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.nodenumber]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.nodenumber]);
            }
        }
    }
};

module.exports = roleUpgrader;
