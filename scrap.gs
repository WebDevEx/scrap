function onOpen() { 
  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu('GET PRICES')
      .addItem('SCRAPE DATA', 'getResult')
      .addToUi();      
}

function getResult(){

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var number = sheet.getLastRow();
  
  for(var i = 2; i <= number; i++){
    var address = sheet.getRange(i, 1).getValue();
    var result = getData(address);
    sheet.getRange(i, 2).setValue( result);
  }
}

function getData(address){
///////////////////////////////////////////////////
/////////https://horizonxi.com/items///////////////
///////////////////////////////////////////////////
  var url = "XXX"+address;

  var content = UrlFetchApp.fetch(url).getContentText();

  // SpreadsheetApp.getUi().alert(content);

  var result = '';
  var pos = content.indexOf('sale:');
  if ( pos > 0){
    result = content.substring(pos+5, content.indexOf('sell_date')-1);
  }  
  if(result == 'b'){
    result = 1;
  }
  
  return result;
}