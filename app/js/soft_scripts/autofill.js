function pushElemToArray(array, selector){
  $(selector).each(function (ind) {
    var elem = $(selector)[ind];
    array.push(
      [elem, elem.value]
    );
  });
}

function formAutoFillArray(){
  var result = [];
  pushElemToArray(result, 'input');
  pushElemToArray(result, 'textArea');
  return result;
};

function addListener(field, key) {
  field.onclick = function (e) {
    var val = this.value;
    if (val == key) {
      this.value = '';
    }
  }
  field.onblur = function (e) {
    var val = this.value;
    if (val == '') {
      this.value = key;
    }
  }
};

function autofill(){
  var fields = formAutoFillArray();
  fields.forEach(function(elem) {
    addListener(elem[0], elem[1]);
    elem[0].value = elem[1];
  });
};

autofill();
