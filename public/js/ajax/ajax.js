function showError(text, id){
  $('#' + id).css({
    'background-color' : '#FF7373',
    'border-color' : 'red',
    'color' : 'white'
  });
  $('#' + id).hover(function () {
    $('#' + id).css({
      'background-color' : '',
      'border-color' : '',
      'color' : ''
    });
  })
  $('#error')[0].innerText = text;
  $('#error').css({
      'visibility' : 'visible'
  });
};

function authorize() {
  $('error').css({
      'visibility' : 'hidden'
  });
  document.location.reload(true);
};
