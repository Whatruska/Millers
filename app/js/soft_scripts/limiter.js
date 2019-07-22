function isLimiterClass(string) {
  var search = string.indexOf("lim-");
  //console.log(string + " " + search);
  if (search != -1) {
    return true;
  } else {
    return false;
  }
}

function getLimitFromClass(string) {
  var index = string.indexOf("-") + 1;
  return Number(string.substring(index));
}

function getLimOfElem(classList) {
  var lim = -1;
  classList.forEach(function (clas) {;
    if (isLimiterClass(clas)) {
      lim = getLimitFromClass(clas);
    };
  });
  return lim;
}

function pushElemsToArray(selector, array) {
  $(selector).each(function (ind) {
    var elem = $(selector)[ind];
    //console.log(elem);
    var classes = elem.classList;
    //console.log(classes);
    var limit = getLimOfElem(classes);
    //console.log(limit);
    if (limit > -1) {
      array.push(
        [elem, limit]
      );
    };
  });
};

function formLimiterArray(){
  var array = []
  pushElemsToArray('input', array);
  pushElemsToArray('textarea', array);
  //console.log(array);
  return array;
}

function addLimit(field, limit) {
  field.onkeydown = function (e) {
    var length = field.value.length;
    //console.log(e);
    //console.log(length);
    if (length >= limit && e.keyCode != 8) {
      e.preventDefault();
    };
  };
};

function limit() {
  var arr = formLimiterArray();
  arr.forEach(function (obj) {
    addLimit(
      obj[0],
      obj[1]
    );
  });
};

limit();
