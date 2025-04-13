// string找最大重复 不区分大小写
const stringT = 'ahsdoalshdasadAHJGS';

const sortStringToMap = (sT) => {
  // string的自有方法，将字符串都转化为小写。
  const s = sT.toLowerCase();
  // 建立一个map,key:value <=> string:重复数
  const mapS = new Map();
  for (let i = 0; i < s.length; i++) {
    if (mapS.has(s[i])) {
      mapS.set(s[i], mapS.get(s[i]) + 1);
    } else {
      mapS.set(s[i], 1); // 没出现过，就放入 map中，计数为 1。
    }
  }
  return (Array.from(mapS).sort((a, b) => b[1] - a[1]))[0]; // map转为数组，二维数组。Array.sort((a, b) => b - a) 是降序排列。
}

console.log(sortStringToMap(stringT)); // [ 'a', 5 ]