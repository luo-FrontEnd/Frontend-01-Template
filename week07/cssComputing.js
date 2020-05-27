const css = require('css');
let rules = [];
function addCSSRules (text) {
  var ast = css.parse(text);
  // console.log(JSON.stringify(ast, null, "    "));
  rules.push(...ast.stylesheet.rules);
  console.log(rules)
}
function match (element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }

  if (selector.charAt(0) == "#") {
    var attr = element.attributes.filter(attr => attr.name == "id")[0];
    if (attr && attr.value === selector.replace("#", ''))
      return true;
  } else if (selector.charAt(0) == ".") {
    var attr = element.attributes.filter(attr => attr.name == "class")[0];
    if(attr){
      let attrArray = attr.value.split(' ');
      let selectorClass = selector.replace(".", '').replace(/\./g," ").split(" ");

      if(attrArray.length > 0){ 
        if(attrArray.length >= selectorClass.length){ // element的class 包含该rule下所有class，则为true
          let isContain = true;
          for(let i = 0; i< selectorClass.length; i++){
            if(attrArray.indexOf(selectorClass[i]) == -1){
              isContain = false;
            }
          }
          if(isContain) return true;
        }
      } 
    }

/*     if (attr && attr.value === selector.replace(".", ''))
      return true; */
  } else {
    if (element.tagName === selector) {
      return true;
    }
  }
  return false;
}

function specificity (selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(" ");
  for (let part of selectorParts) {
    if (part.charAt(0) == "#") {
      p[1] += 1;
    } else if (part.charAt(0) == ".") {
     let cls = part.replace(".", '').replace(/\./g," ").split(" ");
     p[2] += cls.length;
    } else {
     p[3] += 1;
    }
  }
  return p;
}

let stacks = [];
function computeCSS (element) {
  // var elements = stack.slice().reverse(); // slice不传参数即复制一份，reverse从内向外
  if (!element.computedStyle) {
    element.computedStyle = {};
  }
  for (let rule of rules) {

    var selectorParts = rule.selectors[0].split(" ").reverse();
    if (!match(element, selectorParts[0])) { // 不匹配
      continue;
    }

    let matched = false;

    let currentElement = element.parent;
    var j = 1;
    while (currentElement != null && j < selectorParts.length) {
      if (match(currentElement, selectorParts[j])) {
        j++;
      }
      currentElement = currentElement.parent;
    }

    if (j >= selectorParts.length) {
      matched = true;
    }
    if(matched){
      let sp = specificity(rule.selectors[0]);
      let computedStyle = element.computedStyle;
      for(let declaration of rule.declarations){
        if(!computedStyle[declaration.property]){
          computedStyle[declaration.property] = {}
        }
        if(!computedStyle[declaration.property].specificity){
          computedStyle[declaration.property].specificity = sp;
          computedStyle[declaration.property].value = declaration.value;
        }else if(compare(computedStyle[declaration.property].specificity, sp) <= 0){
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        }
      }
    }
  }
  return element;
}

function compare (sp1, sp2) {
  if (sp1[0] - sp2[0])
    return sp1[0] - sp2[0];
  if (sp1[1] - sp2[1])
    return sp1[1] - sp2[1];
  if (sp1[2] - sp2[2])
    return sp1[2] - sp2[2];
  return sp1[3] - sp2[3];
}

module.exports = {
  addCSSRules,
  computeCSS
}