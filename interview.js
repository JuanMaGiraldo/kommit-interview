const { S_IFREG } = require("constants");

tanks = ["A", "B", "C", "D"];
capacity = [10, 25, 30, 53];
pipelines = [
  ["A", "B", 1],
  ["A", "C", 4],
  ["C", "D", 8],
];
inflow = 4;
time = 20;

dataTanks = {};

tanks.forEach((tank, i) => {
  dictPipelines = [];
  pipelines.forEach((tuberia) => {
    if (tuberia[0] == tank) {
      dictPipelines.push([tuberia[1], tuberia[2]]);
    }
  });
  dataTanks[tank] = {
    capacity: capacity[i],
    storage: 0,
    pipelines: dictPipelines,
  };
});

for (let i = 0; i < time; i++) {
  tank = dataTanks[tanks[0]];
  fillPipelines(tank);
  tank.storage += inflow;
}

function fillPipelines(tank) {
  tank.pipelines.forEach((pipeline) => {
    if (tank.storage != 0 && !tankIsFull(pipeline[0])) {
      fillTank(tank, dataTanks[pipeline[0]], pipeline[1]);
    }
  });
}

function fillTank(tankInflow, tankToFill, inflow) {
  if (tankToFill.pipelines != []) {
    fillPipelines(tankToFill);
  }
  var { storage } = tankInflow;
  capacityToFill = tankToFill.capacity;
  storageToFill = tankToFill.storage;

  if (storage < inflow) {
    inflow = storage;
  }
  if (capacityToFill < storageToFill + inflow) {
    inflow = capacityToFill - storageToFill;
  }

  tankToFill.storage += inflow;
  tankInflow.storage -= inflow;
}

function tankIsFull(tank) {
  return dataTanks[tank].capacity == dataTanks[tank].storage;
}

console.log(dataTanks);
