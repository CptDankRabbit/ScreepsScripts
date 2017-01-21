 function GetCost (parts)
 {
 	var cost = 0;
 	for (var i = 0; i < parts.length; i++)
 	{
 		var part = parts[i];
 		cost += BODYPART_COST[part];
 	}
 	
 	return cost;
 }

module.exports.GetCost = GetCost;
