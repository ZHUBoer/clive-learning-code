const underscoreToCamel = (str) => {
  const parts = str.split('_');
  let result = parts[0];
  const len = parts.length;
  for (let i = 1; i < len; i++) {
    result += parts[i][0].toUpperCase() + parts[i].slice(1);
  }
  return result;
};

console.log(underscoreToCamel('under_score_to_camel'));