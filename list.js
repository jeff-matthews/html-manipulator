$('p.SmartList1').each(function() {
  $(this).nextUntil("SmartList1").andSelf().wrapAll('<ol />');
  $(this).nextUntil("p.SmartList2").andSelf().wrapAll('<li />');
  $(this).removeClass("SmartList1").removeAttr("madcap*");
});
