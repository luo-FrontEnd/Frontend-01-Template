function match(string) {
    let state = start;
    for (const s of string) {
      state = state(s);
    }
    return state === end;
  }
  
  function start(s) {
    if (s === 'a') {
      return foundA;
    } else {
      return start;
    }
  }
  
  function  end(s) {
    return end;
  }
  
  function foundA(s) {
    if (s === 'b') {
      return foundB;
    } else {
      return start(s);
    }
  }
  
  function foundB(s) {
    if (s === 'c') {
      return foundC;
    } else {
      return start(s);
    }
  }
  
  function foundC(s) {
    if (s === 'a') {
      return foundA2;
    } else {
      return start(s);
    }
  }
  
  function foundA2(s) {
    if (s === 'b') {
      return foundB2;
    } else {
      return start(s);
    }
  }
  
  function foundB2(s) {
    if (s === 'x') {
      return end;
    } else {
      return foundB(s);
    }
  }
  
  console.log(match("I am abcabcabx")); 
  console.log(match("I am aaabcabcabx"));
  console.log(match("I am ababcabcabx"));
  console.log(match("I am xabcabcabc"));