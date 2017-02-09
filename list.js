$('.SmartList1').each(function() {
  $(this).nextUntil(".SmartList1").andSelf().wrapAll('<ol />');
  $(this).nextUntil(".SmartList2").andSelf().wrapAll('<li />');
});
