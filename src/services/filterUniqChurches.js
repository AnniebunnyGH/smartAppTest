export function filterUniqCherches(churches, newChurhes) {
  const newChurchesList = churches.concat([]);
  for (let i = 0; i < newChurhes.length; i += 1) {
    let isChurchNew = true;
    for (let j = 0; j < churches.length; j += 1) {
      if (newChurhes[i].id === churches[j].id) {
        isChurchNew = false;
        break;
      }
    }
    if (isChurchNew) {
      newChurchesList.push(newChurhes[i]);
    }
  }
  return newChurchesList;
}
