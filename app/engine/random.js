export const Random = {
  int: function (max, min){
    return Math.floor(Random.float(max, min));
  },
  float: function (max, min){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}
