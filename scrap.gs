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




/////////////////////////////////////////////////////////////

//////Get Data from api//////////////////////////////////////

/////////////////////////////////////////////////////////////


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
    try{
      var result = getData1(address);
      sheet.getRange(i, 2).setValue( result);
    }catch(e){      
      sheet.getRange(i, 2).setValue('');
    }

    try{
      var result = getData2(address);
      sheet.getRange(i, 3).setValue(result);
    }catch(e){      
      sheet.getRange(i, 3).setValue('');
    }    
  }
}

function getData1(address){
  var url = 'https://api.horizonxi.com/api/v1/items/' + address + '/ah?stack=true';
  var res = UrlFetchApp.fetch(url);
  var content = res.getContentText();
  var json = JSON.parse(content);
  var sale = json[0]['sale'];
  return sale;
}

function getData2(address){
  var url = 'https://api.horizonxi.com/api/v1/items/' + address + '/ah?stack=false';
  var res = UrlFetchApp.fetch(url);
  var content = res.getContentText();
  var json = JSON.parse(content);
  var sale = json[0]['sale'];
  return sale;
}

// function getData1(address){
//   // var url = "https://horizonxi.com/items/"+address;
//   var url1 = 'https://api.horizonxi.com/api/v1/items/' + address + '/ah?stack=true';
//   // var url2 = 'https://api.horizonxi.com/api/v1/items/' + address + '/ah?stack=false';

//   var res1 = UrlFetchApp.fetch(url1);
//   // var res2 = UrlFetchApp.fetch(url2);  

//   if(res1 == ''){
//     SpreadsheetApp.getUi().alert("No");
//   }else{
//     var content1 = res1.getContentText();
//     var json1 = JSON.parse(content1);
//     var sale1 = json1[0]['sale'];
//     SpreadsheetApp.getUi().alert(sale1);
//   }
//   if(res2 == ''){
//     SpreadsheetApp.getUi().alert('No');
//   }else{
//     var content2 = res2.getContentText();  
//     var json2 = JSON.parse(content2);
//     var sale2 = json2[0]['sale'];
//     SpreadsheetApp.getUi().alert(sale2);
//   }

// SpreadsheetApp.getUi().alert()

//   var result = '';
//   // var pos = content.indexOf('sale:');
//   // if ( pos > 0){
//   //   result = content.substring(pos+5, content.indexOf('sell_date')-1);
//   // }  
//   // if(result == 'b'){
//   //   result = 1;
//   // }
  
//   return result;
// }