export const css2style = (text: string) => {
  const objs = splitText(text, ";");
  return objs
    .map((obj) => {
      const key = dashToCamelCase(obj.key);
      const value = checkNumber(obj.value) ? obj.value : `"${obj.value}"`;
      return `${key}: ${value},`;
    })
    .join("\n");
};

export const style2css = (text: string) => {
  const objs = splitText(text, ",");
  return objs
    .map((obj) => {
      const key = camelCaseToDash(obj.key.replace(/"|'/g, ""));
      let value = obj.value.replace(/"|'/g, "");
      if (checkNumber(value) && checkAutoPx(key)) {
        value = value + "px";
      }
      return `${key}: ${value};`;
    })
    .join("\n");
};

function splitText(text: string, separator: string) {
  const rows = text.split(separator);
  const objs: { key: string; value: string }[] = [];
  rows.forEach((row) => {
    const idx = row.indexOf(":");
    if (idx > 0) {
      const key = row.slice(0, idx).trim();
      const value = row.slice(idx + 1).trim();
      if (key.length && value.length) {
        objs.push({ key, value });
      }
    }
  });
  return objs;
}

function dashToCamelCase(text: string) {
  return text.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function camelCaseToDash(text: string): string {
  return text.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function checkNumber(text: string) {
  return Number(text).toString() === text;
}

/**
 * Check whether automatically appends the string "px" for you after your number value. See here: https://react-cn.github.io/react/tips/style-props-value-px.html
 */
function checkAutoPx(key: string) {
  const keys = [
    "animationIterationCount",
    "boxFlex",
    "boxFlexGroup",
    "boxOrdinalGroup",
    "columnCount",
    "fillOpacity",
    "flex",
    "flexGrow",
    "flexPositive",
    "flexShrink",
    "flexNegative",
    "flexOrder",
    "fontWeight",
    "lineClamp",
    "lineHeight",
    "opacity",
    "order",
    "orphans",
    "stopOpacity",
    "strokeDashoffset",
    "strokeOpacity",
    "strokeWidth",
    "tabSize",
    "widows",
    "zIndex",
    "zoom",
  ];
  for (let k of keys) {
    if (key.indexOf(k) > -1) {
      return false;
    }
  }
  return true;
}
