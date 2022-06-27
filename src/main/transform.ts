import { css2style, style2css } from "./cssStyle";

enum TextType {
  "CSS" = 1,
  "STYLE" = 2,
}

export const transform = (text: string): string | void => {
  if (text.trim().length < 1) {
    console.log("no text");
    return;
  }
  const type = checkType(text);
  if (!type) {
    console.log("check text type failed");
    return;
  }
  if (type === TextType.CSS) {
    return css2style(text);
  }
  if (type === TextType.STYLE) {
    return style2css(text);
  }
};

/**
 * check css/style by , and ;
 */
const checkType = (text: string) => {
  const sNumber = text.split(",").length - 1;
  const cNumber = text.split(";").length - 1;
  if (sNumber > cNumber) {
    return TextType.STYLE;
  } else if (cNumber > sNumber) {
    return TextType.CSS;
  }
};
