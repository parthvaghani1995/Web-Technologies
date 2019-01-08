<?php error_reporting(E_ERROR | E_PARSE); ?>
<?php error_reporting(0);?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>new</title>
        <script type="text/javascript">

        function checkempty(){
           if(document.getElementById('inputText').value==''){
             alert('Please Enter a symbol');
             return false;
          }
        }

        //Clear contents start
        function clearPressed() {
           if(document.getElementById('midTable')){
             document.getElementById('midTable').innerHTML = '';
          }
          if(document.getElementById('container')){
             document.getElementById('container').innerHTML='';
             document.getElementById('container').style.border=0;
          }
          if(document.getElementById('newsText')){
             document.getElementById('newsText').innerHTML=''
          }
          if(document.getElementById('buttonDiv')){
             document.getElementById('buttonDiv').innerHTML = '';
          }
           document.getElementById('inputText').value = "";

        }

            function changeimg() {
                if (document.getElementById('buttonImage').src == 'http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png') {
                    document.getElementById('buttonImage').src = 'http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Up.png';
                    document.getElementById('buttonText').innerHTML = "Click to hide stock news";
                    document.getElementById('newsText').style.display = "block";
                    return 0;
                } else {
                    document.getElementById('buttonImage').src = 'http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png';
                    document.getElementById('buttonText').innerHTML = "Click to show stock news";
                    document.getElementById('newsText').style.display = "none";
                    return 0;
                }
                return 0;
            }



            //Async request
            function createGraph(graphType){
               symbolName = document.getElementById('inputText').value;
               var xhttp = new XMLHttpRequest();
               if(graphType == 1){//SMAgraph
                  var url = 'https://www.alphavantage.co/query?function=SMA&symbol=' + symbolName + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ';
                  xhttp.onreadystatechange = function() {
                     if (this.readyState == 4 && this.status == 200) {
                        resp=this.responseText;
                        //console.log(this.responseText);
                        SMAgraph(resp);
                     }
                  };
               }
               if(graphType == 2){//EMAgraph
                  var url = 'https://www.alphavantage.co/query?function=EMA&symbol=' + symbolName + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ';
                  xhttp.onreadystatechange = function() {
                     if (this.readyState == 4 && this.status == 200) {
                        resp=this.responseText;
                        //console.log(this.responseText);
                        EMAgraph(resp);
                     }
                  };
               }
               if(graphType == 3){//STOCHgraph
                  var url = 'https://www.alphavantage.co/query?function=STOCH&symbol=' + symbolName + '&slowkmatype=1&slowdmatype=1&interval=daily&apikey=TYWWC92JUZSR9DOQ';
                  xhttp.onreadystatechange = function() {
                     if (this.readyState == 4 && this.status == 200) {
                        resp=this.responseText;
                        //console.log(this.responseText);
                        STOCHgraph(resp);
                     }
                  };
               }
               if(graphType == 4){//RSIgraph
                  var url = 'https://www.alphavantage.co/query?function=RSI&symbol=' + symbolName + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ';
                  xhttp.onreadystatechange = function() {
                     if (this.readyState == 4 && this.status == 200) {
                        resp=this.responseText;
                        //console.log(this.responseText);
                        RSIgraph(resp);
                     }
                  };
               }
               if(graphType == 5){//ADXgraph
                  var url = 'https://www.alphavantage.co/query?function=ADX&symbol=' + symbolName + '&interval=daily&time_period=10&apikey=TYWWC92JUZSR9DOQ';
                  xhttp.onreadystatechange = function() {
                     if (this.readyState == 4 && this.status == 200) {
                        resp=this.responseText;
                        //console.log(this.responseText);
                        ADXgraph(resp);
                     }
                  };
               }
               if(graphType == 6){//CCIgraph
                  var url = 'https://www.alphavantage.co/query?function=CCI&symbol=' + symbolName + '&interval=daily&time_period=10&apikey=TYWWC92JUZSR9DOQ';
                  xhttp.onreadystatechange = function() {
                     if (this.readyState == 4 && this.status == 200) {
                        resp=this.responseText;
                        //console.log(this.responseText);
                        CCIgraph(resp);
                     }
                  };
               }
               if(graphType == 7){//BBandsgraph
                  var url = 'https://www.alphavantage.co/query?function=BBANDS&symbol=' + symbolName + '&nbdevup=3&nbdevdn=3&interval=daily&time_period=5&series_type=close&apikey=TYWWC92JUZSR9DOQ';
                  xhttp.onreadystatechange = function() {
                     if (this.readyState == 4 && this.status == 200) {
                        resp=this.responseText;
                        //console.log(this.responseText);
                        BBANDSgraph(resp);
                     }
                  };
               }
               if(graphType == 8){//MACDgraph
                  var url = 'https://www.alphavantage.co/query?function=MACD&symbol=' + symbolName + '&interval=daily&series_type=close&apikey=TYWWC92JUZSR9DOQ';
                  xhttp.onreadystatechange = function() {
                     if (this.readyState == 4 && this.status == 200) {
                        resp=this.responseText;
                        //console.log(this.responseText);
                        MACDgraph(resp);
                     }
                  };
               }
               xhttp.open("GET", url, true);
               xhttp.send();

            }
            //Async request end

            //priceGraph Function starts

            //priceGraph Function ends

            function SMAgraph(data) {
                //var data = getJSON('https://www.alphavantage.co/query?function=SMA&symbol=' + symbolName + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ');
                //-------------------------------------------------------
                var parsedData = JSON.parse(data);
                var a = parsedData['Technical Analysis: SMA'];
                var b = parsedData['Meta Data']['3: Last Refreshed'];
                var todayDate = new Date(b);
                todayDate.setMonth(todayDate.getMonth() - 6);
                var dataArray = new Array();
                for (var key in a) {
                    //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                    //Date.UTC(2013,11,3)
                    var newDate = new Date(key);
                    var arr1 = newDate.getTime();
                    var arr2 = parseFloat(parsedData['Technical Analysis: SMA'][key]['SMA']);
                    var c = [arr1, arr2];
                    //console.log(c);
                    dataArray.push(c);
                    //console.log(arr1);
                    if (newDate < todayDate) {
                        break;
                    }
                }

                var tickArray = new Array();
                var lastTickDate = dataArray[dataArray.length-1][0];
                var firstTickDate = dataArray[0][0];

                while(firstTickDate>lastTickDate){
                   tickArray.push(firstTickDate);
                   firstTickDate -= 604800000
                  //console.log(firstTickDate);
               }

                Highcharts.chart('container', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Simple Moving Average (SMA)',
                        xDateFormat: '%Y-%m'
                    },
                    subtitle: {
                        text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                        useHTML: true
                    },
                    xAxis: [{
                            tickPositions: tickArray,
                            ordinal: true,
                            //tickInterval: 7 * 24 * 3600 * 1000,
                            type: 'datetime',
                            labels: {
                                format: '{value:%m/%d}',
                                enabled: true,
                                align: 'center',
                                rotation: -45
                            }
                        }],
                    tooltip: {
                        xDateFormat: '%m/%d'
                    },
                    yAxis: [{
                            lineWidth: 1,
                            title: {
                                text: 'SMA'
                            }
                        }
                    ],
                    legend: {
                        enabled: true,
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical'
                    },
                    plotOptions: {
                        line: {
                            color: '#c4392d',
                            marker: {
                                enabled: true,
                                radius: 2
                            },
                            lineWidth: 1
                        }
                    },
                    series: [{
                            type: 'line',
                            name: symbolName,
                            data: dataArray
                        }]
                });
            }

            function EMAgraph(data) {
                //var data = getJSON('https://www.alphavantage.co/query?function=EMA&symbol=' + symbolName + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ');
                //-------------------------------------------------------
                var parsedData = JSON.parse(data);
                var a = parsedData['Technical Analysis: EMA'];
                var b = parsedData['Meta Data']['3: Last Refreshed'];
                var todayDate = new Date(b);
                todayDate.setMonth(todayDate.getMonth() - 6);
                var dataArray = new Array();
                for (var key in a) {
                    //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                    //Date.UTC(2013,11,3)
                    var newDate = new Date(key);
                    var arr1 = newDate.getTime();
                    var arr2 = parseFloat(parsedData['Technical Analysis: EMA'][key]['EMA']);
                    var c = [arr1, arr2];
                    //console.log(c);
                    dataArray.push(c);
                    //console.log(arr1);
                    if (newDate < todayDate) {
                        break;
                    }
                }

                var tickArray = new Array();
                var lastTickDate = dataArray[dataArray.length-1][0];
                var firstTickDate = dataArray[0][0];

                while(firstTickDate>lastTickDate){
                   tickArray.push(firstTickDate);
                   firstTickDate -= 604800000
                  //console.log(firstTickDate);
               }

                Highcharts.chart('container', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Exponential Moving Average (EMA)',
                        xDateFormat: '%Y-%m'
                    },
                    subtitle: {
                        text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                        useHTML: true
                    },
                    xAxis: [{
                            tickPositions: tickArray,
                            ordinal: true,
                            //tickInterval: 7 * 24 * 3600 * 1000,
                            type: 'datetime',
                            labels: {
                                format: '{value:%m/%d}',
                                enabled: true,
                                align: 'center',
                                rotation: -45
                            }
                        }],
                    tooltip: {
                        xDateFormat: '%m/%d'
                    },
                    yAxis: [{
                            lineWidth: 1,
                            title: {
                                text: 'EMA'
                            }
                        }
                    ],
                    legend: {
                        enabled: true,
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical'
                    },
                    plotOptions: {
                        line: {
                            color: '#c4392d',
                            marker: {
                                enabled: true,
                                radius: 2
                            },
                            lineWidth: 1
                        }
                    },
                    series: [{
                            type: 'line',
                            name: symbolName,
                            data: dataArray
                        }]
                });
            }

            function STOCHgraph(data) {
                //var data = getJSON('https://www.alphavantage.co/query?function=STOCH&symbol=' + symbolName + '&interval=daily&apikey=TYWWC92JUZSR9DOQ');
                //-------------------------------------------------------
                var parsedData = JSON.parse(data);
                var a = parsedData['Technical Analysis: STOCH'];
                var b = parsedData['Meta Data']['3: Last Refreshed'];
                var todayDate = new Date(b);
                todayDate.setMonth(todayDate.getMonth() - 6);
                var slowKArray = new Array();
                var slowDArray = new Array();
                for (var key in a) {
                    //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                    //Date.UTC(2013,11,3)
                    var newDate = new Date(key);
                    var arr1 = newDate.getTime();
                    var arr2 = parseFloat(parsedData['Technical Analysis: STOCH'][key]['SlowK']);
                    var arr3 = parseFloat(parsedData['Technical Analysis: STOCH'][key]['SlowD']);
                    var c = [arr1, arr2];
                    var d = [arr1, arr3];
                    //console.log(c);
                    slowKArray.push(c);
                    slowDArray.push(d);

                    //console.log(arr1);
                    if (newDate < todayDate) {
                        break;
                    }
                }

                var tickArray = new Array();
                var lastTickDate = slowKArray[slowKArray.length-1][0];
                var firstTickDate = slowKArray[0][0];

                while(firstTickDate>lastTickDate){
                   tickArray.push(firstTickDate);
                   firstTickDate -= 604800000
                  //console.log(firstTickDate);
               }

                Highcharts.chart('container', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Stochastic Oscillator (STOCH)',
                        xDateFormat: '%Y-%m'
                    },
                    subtitle: {
                        text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                        useHTML: true
                    },
                    xAxis: [{
                            tickPositions: tickArray,
                            ordinal: true,
                            //tickInterval: 7 * 24 * 3600 * 1000,
                            //minTickInterval: 7*24 * 3600 * 1000,
                            type: 'datetime',
                            labels: {
                                format: '{value:%m/%d}',
                                enabled: true,
                                align: 'center',
                                rotation: -45
                            }
                        }],
                    tooltip: {
                        xDateFormat: '%m/%d'
                    },
                    yAxis: [{
                            lineWidth: 1,
                            title: {
                                text: 'STOCH'
                            }
                        }
                    ],
                    legend: {
                        enabled: true,
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical'
                    },
                    plotOptions: {
                        line: {
                            color: '#c4392d',
                            marker: {
                                enabled: true,
                                radius: 2
                            },
                            lineWidth: 1
                        }
                    },
                    series: [{
                            type: 'line',
                            name: symbolName + ' SlowK',
                            data: slowKArray
                        },
                        {
                            type: 'line',
                            name: symbolName + ' SlowD',
                            data: slowDArray,
                            color: '#0000ff'
                        }]
                });
            }

            function RSIgraph(data) {
                //var data = getJSON('https://www.alphavantage.co/query?function=RSI&symbol=' + symbolName + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ');
                //-------------------------------------------------------
                var parsedData = JSON.parse(data);
                var a = parsedData['Technical Analysis: RSI'];
                var b = parsedData['Meta Data']['3: Last Refreshed'];
                var todayDate = new Date(b);
                todayDate.setMonth(todayDate.getMonth() - 6);
                var dataArray = new Array();
                for (var key in a) {
                    //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                    //Date.UTC(2013,11,3)
                    var newDate = new Date(key);
                    var arr1 = newDate.getTime();
                    var arr2 = parseFloat(parsedData['Technical Analysis: RSI'][key]['RSI']);
                    var c = [arr1, arr2];
                    //console.log(c);
                    dataArray.push(c);
                    //console.log(arr1);
                    if (newDate < todayDate) {
                        break;
                    }
                }

                var tickArray = new Array();
                var lastTickDate = dataArray[dataArray.length-1][0];
                var firstTickDate = dataArray[0][0];

                while(firstTickDate>lastTickDate){
                   tickArray.push(firstTickDate);
                   firstTickDate -= 604800000
                   //console.log(firstTickDate);
               }

                Highcharts.chart('container', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Relative Strength Index (RSI)',
                        xDateFormat: '%Y-%m'
                    },
                    subtitle: {
                        text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                        useHTML: true
                    },
                    xAxis: [{
                            tickPositions: tickArray,
                            ordinal: true,
                            //tickInterval: 7 * 24 * 3600 * 1000,
                            type: 'datetime',
                            labels: {
                                format: '{value:%m/%d}',
                                enabled: true,
                                align: 'center',
                                rotation: -45
                            }
                        }],
                    tooltip: {
                        xDateFormat: '%m/%d'
                    },
                    yAxis: [{
                            lineWidth: 1,
                            title: {
                                text: 'RSI'
                            }
                        }
                    ],
                    legend: {
                        enabled: true,
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical'
                    },
                    plotOptions: {
                        line: {
                            color: '#c4392d',
                            marker: {
                                enabled: true,
                                radius: 2
                            },
                            lineWidth: 1
                        }
                    },
                    series: [{
                            type: 'line',
                            name: symbolName,
                            data: dataArray
                        }]
                });
            }

            function ADXgraph(data) {
                //var data = getJSON('https://www.alphavantage.co/query?function=ADX&symbol=' + symbolName + '&interval=daily&time_period=10&apikey=TYWWC92JUZSR9DOQ');
                //-------------------------------------------------------
                var parsedData = JSON.parse(data);
                var a = parsedData['Technical Analysis: ADX'];
                var b = parsedData['Meta Data']['3: Last Refreshed'];
                var todayDate = new Date(b);
                todayDate.setMonth(todayDate.getMonth() - 6);
                var dataArray = new Array();
                for (var key in a) {
                    //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                    //Date.UTC(2013,11,3)
                    var newDate = new Date(key);
                    var arr1 = newDate.getTime();
                    var arr2 = parseFloat(parsedData['Technical Analysis: ADX'][key]['ADX']);
                    var c = [arr1, arr2];
                    //console.log(c);
                    dataArray.push(c);
                    //console.log(arr1);
                    if (newDate < todayDate) {
                        break;
                    }
                }

                var tickArray = new Array();
               var lastTickDate = dataArray[dataArray.length-1][0];
               var firstTickDate = dataArray[0][0];

               while(firstTickDate>lastTickDate){
                 tickArray.push(firstTickDate);
                 firstTickDate -= 604800000
                 //console.log(firstTickDate);
              }

                Highcharts.chart('container', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Average Directional Movement Index (ADX)',
                        xDateFormat: '%Y-%m'
                    },
                    subtitle: {
                        text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                        useHTML: true
                    },
                    xAxis: [{
                            tickPositions: tickArray,
                            ordinal: true,
                            //tickInterval: 7 * 24 * 3600 * 1000,
                            type: 'datetime',
                            labels: {
                                format: '{value:%m/%d}',
                                enabled: true,
                                align: 'center',
                                rotation: -45
                            }
                        }],
                    tooltip: {
                        xDateFormat: '%m/%d'
                    },
                    yAxis: [{
                            lineWidth: 1,
                            title: {
                                text: 'ADX'
                            }
                        }
                    ],
                    legend: {
                        enabled: true,
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical'
                    },
                    plotOptions: {
                        line: {
                            color: '#c4392d',
                            marker: {
                                enabled: true,
                                radius: 2
                            },
                            lineWidth: 1
                        }
                    },
                    series: [{
                            type: 'line',
                            name: symbolName,
                            data: dataArray
                        }]
                });
            }

            function CCIgraph(data) {
                //var data = getJSON('https://www.alphavantage.co/query?function=CCI&symbol=' + symbolName + '&interval=daily&time_period=10&apikey=TYWWC92JUZSR9DOQ');
                //-------------------------------------------------------
                var parsedData = JSON.parse(data);
                var a = parsedData['Technical Analysis: CCI'];
                var b = parsedData['Meta Data']['3: Last Refreshed'];
                var todayDate = new Date(b);
                todayDate.setMonth(todayDate.getMonth() - 6);
                var dataArray = new Array();
                for (var key in a) {
                    //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                    //Date.UTC(2013,11,3)
                    var newDate = new Date(key);
                    var arr1 = newDate.getTime();
                    var arr2 = parseFloat(parsedData['Technical Analysis: CCI'][key]['CCI']);
                    var c = [arr1, arr2];
                    //console.log(c);
                    dataArray.push(c);
                    //console.log(arr1);
                    if (newDate < todayDate) {
                        break;
                    }
                }

               var tickArray = new Array();
               var lastTickDate = dataArray[dataArray.length-1][0];
               var firstTickDate = dataArray[0][0];

               while(firstTickDate>lastTickDate){
                 tickArray.push(firstTickDate);
                 firstTickDate -= 604800000
                 //console.log(firstTickDate);
              }

                Highcharts.chart('container', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Commodity Channel Index (CCI)',
                        xDateFormat: '%Y-%m'
                    },
                    subtitle: {
                        text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                        useHTML: true
                    },
                    xAxis: [{
                            tickPositions:tickArray,
                            ordinal: true,
                            //tickInterval: 7 * 24 * 3600 * 1000,
                            type: 'datetime',
                            labels: {
                                format: '{value:%m/%d}',
                                enabled: true,
                                align: 'center',
                                rotation: -45
                            }
                        }],
                    tooltip: {
                        xDateFormat: '%m/%d'
                    },
                    yAxis: [{
                            lineWidth: 1,
                            title: {
                                text: 'CCI'
                            }
                        }
                    ],
                    legend: {
                        enabled: true,
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical'
                    },
                    plotOptions: {
                        line: {
                            color: '#c4392d',
                            marker: {
                                enabled: true,
                                radius: 2
                            },
                            lineWidth: 1
                        }
                    },
                    series: [{
                            type: 'line',
                            name: symbolName,
                            data: dataArray
                        }]
                });
            }

            function BBANDSgraph(data) {
                //var data = getJSON('https://www.alphavantage.co/query?function=BBANDS&symbol=' + symbolName + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ');
                //-------------------------------------------------------
                var parsedData = JSON.parse(data);
                var a = parsedData['Technical Analysis: BBANDS'];
                var b = parsedData['Meta Data']['3: Last Refreshed'];
                var todayDate = new Date(b);
                todayDate.setMonth(todayDate.getMonth() - 6);
                var RUBandArray = new Array();
                var RLBandArray = new Array();
                var RMBandArray = new Array();
                for (var key in a) {
                    //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                    //Date.UTC(2013,11,3)
                    var newDate = new Date(key);
                    var arr1 = newDate.getTime();
                    var arr2 = parseFloat(parsedData['Technical Analysis: BBANDS'][key]['Real Upper Band']);
                    var arr3 = parseFloat(parsedData['Technical Analysis: BBANDS'][key]['Real Lower Band']);
                    var arr4 = parseFloat(parsedData['Technical Analysis: BBANDS'][key]['Real Middle Band']);
                    var c = [arr1, arr2];
                    var d = [arr1, arr3];
                    var e = [arr1, arr4];
                    //console.log(c);
                    RUBandArray.push(c);
                    RLBandArray.push(d);
                    RMBandArray.push(e);

                    //console.log(arr1);
                    if (newDate < todayDate) {
                        break;
                    }
                }

                var tickArray = new Array();
                var lastTickDate = RUBandArray[RUBandArray.length-1][0];
                var firstTickDate = RUBandArray[0][0];

                while(firstTickDate>lastTickDate){
                   tickArray.push(firstTickDate);
                   firstTickDate -= 604800000
                   //console.log(firstTickDate);
                }

                Highcharts.chart('container', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Bollinger Bands (BBANDS)',
                        xDateFormat: '%Y-%m'
                    },
                    subtitle: {
                        text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                        useHTML: true
                    },
                    xAxis: [{
                            tickPositions:tickArray,
                            ordinal: true,
                            //tickInterval: 7 * 24 * 3600 * 1000,
                            //minTickInterval: 7*24 * 3600 * 1000,
                            type: 'datetime',
                            labels: {
                                format: '{value:%m/%d}',
                                enabled: true,
                                align: 'center',
                                rotation:-45
                            }
                        }],
                    tooltip: {
                        xDateFormat: '%m/%d'
                    },
                    yAxis: [{
                            lineWidth: 1,
                            title: {
                                text: 'BBANDS'
                            }
                        }
                    ],
                    legend: {
                        enabled: true,
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical'
                    },
                    plotOptions: {
                        line: {
                            color: '#c4392d',
                            marker: {
                                enabled: true,
                                radius: 2
                            },
                            lineWidth: 1
                        }
                    },
                    series: [{
                            type: 'line',
                            name: symbolName + ' Real Upper Band',
                            data: RUBandArray,
                            color: '#000000'
                        },
                        {
                            type: 'line',
                            name: symbolName + ' Real Lower Band',
                            data: RLBandArray,
                            color: '#00ff00'
                        },
                        {
                            type: 'line',
                            name: symbolName + ' Real Medium Band',
                            data: RMBandArray,
                            color: '#ff0000'
                        }]
                });
            }

            function MACDgraph(data) {
                //var data = getJSON('https://www.alphavantage.co/query?function=MACD&symbol=' + symbolName + '&interval=daily&series_type=close&apikey=TYWWC92JUZSR9DOQ');
                //-------------------------------------------------------
                var parsedData = JSON.parse(data);
                var a = parsedData['Technical Analysis: MACD'];
                var b = parsedData['Meta Data']['3: Last Refreshed'];
                var todayDate = new Date(b);
                todayDate.setMonth(todayDate.getMonth() - 6);
                var dataArray = new Array();
                var MACDHistArray = new Array();
                var MACDSignalArray = new Array();

                for (var key in a) {
                    //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                    //Date.UTC(2013,11,3)
                    var newDate = new Date(key);
                    var arr1 = newDate.getTime();
                    var arr2 = parseFloat(parsedData['Technical Analysis: MACD'][key]['MACD']);
                    var arr3 = parseFloat(parsedData['Technical Analysis: MACD'][key]['MACD_Hist']);
                    var arr4 = parseFloat(parsedData['Technical Analysis: MACD'][key]['MACD_Signal']);
                    var c = [arr1, arr2];
                    var d = [arr1, arr3];
                    var e = [arr1, arr4];
                    //console.log(c);
                    dataArray.push(c);
                    MACDHistArray.push(d);
                    MACDSignalArray.push(e);
                    if (newDate < todayDate) {
                        break;
                    }
                }
                console.log(dataArray[dataArray.length-1][0]);
                console.log(dataArray[0][0]);
                var tickArray = new Array();
                var lastTickDate = dataArray[dataArray.length-1][0];
                var firstTickDate = dataArray[0][0];

                while(firstTickDate>lastTickDate){
                   tickArray.push(firstTickDate);
                   firstTickDate -= 604800000
                   //console.log(firstTickDate);
                }



                Highcharts.chart('container', {
                    chart: {
                        type: 'line',
                    },
                    title: {
                        text: 'Moving Average Convergence/Divergence (MACD)',
                        xDateFormat: '%Y-%m'
                    },
                    subtitle: {
                        text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                        useHTML: true
                    },
                    xAxis: [{
                            //categories: [],
                            //tickPixelInterval: 48.5,
                            tickPositions:tickArray,
                            type: 'datetime',
                            labels: {
                                format: '{value:%m/%d}',
                                enabled: true,
                                align: 'center',
                                rotation: -45
                            },
                            ordinal: true,
                        }],
                    tooltip: {
                        xDateFormat: '%m/%d'
                    },
                    yAxis: [{
                            lineWidth: 1,
                            title: {
                                text: 'MACD'
                            }
                        }
                    ],
                    legend: {
                        enabled: true,
                        align: 'right',
                        verticalAlign: 'middle',
                        layout: 'vertical'
                    },
                    plotOptions: {
                        line: {
                            color: '#c4392d',
                            marker: {
                                enabled: true,
                                radius: 2
                            },
                            lineWidth: 1
                        }
                    },
                    series: [{
                            type: 'line',
                            name: symbolName + ' MACD_Hist',
                            data: MACDHistArray,
                            color: '#000000'
                        },
                        {
                            type: 'line',
                            name: symbolName + ' MACD',
                            data: dataArray,
                            color: '#00ff00'
                        },
                        {
                            type: 'line',
                            name: symbolName + ' MACD_Signal',
                            data: MACDSignalArray,
                            color: '#ff0000'
                        }]
                });
            }
        </script>

        <style type="text/css">
           a{
              text-decoration: none;
           }
            #arrowimg{
                height:15px;
            }
            table, th, td {
                border: 1px solid rgb(215,215,215);
                border-collapse: collapse;
                table-layout: fixed;
                width : 100%;
            }
            th{
                background-color: whitesmoke;
                text-align: left;
                padding-top: 3px;
                padding-bottom: 3px;
            }
            td{
               text-align: center;
            }
            #formbox{
                background-color: whitesmoke;
                border: 1px solid silver;
                width: 400px;
                margin: 0 auto;
                height: 150px;
            }
            h1{
                margin-bottom: 1px;
                margin-top: 3px;
            }
            hr{
                margin-top: 0px;
            }
            #submitSymbol{
                margin-top: 5px;
                margin-left: 190px;
            }
            #clearSymbol{
                margin-left: 10px;
            }
            form{
                margin-left: 10px;
                margin-right: 10px;
            }
            #buttonDiv{
                text-align:center;
            }
            #buttonImage{
                height:20px;
            }
            #buttonText{
                margin-bottom: 2px;
                color: silver;
                font-size: 12px;
            }
            #buttonSpan{
                background: transparent;
                border: 0;
                cursor: pointer;
                outline: none;
            }
            #newsText{
                display: none;
                width: 1100px;
                margin: 0 auto;
            }
            #newsTable{
               background-color: whitesmoke;
            }
            #midTable{
               margin-top: 10px;
               margin-bottom: 10px;
               margin-left: auto;
               margin-right: auto;
               width:1100px;
            }
            #container{
               border: 2px solid rgb(215,215,215);
               width: 1100px;
            }
            .highcharts-root{
               width: 1100px;
            }
        </style>
    </head>

    <body id="body">
        <div id="formbox">
            <form method="post">
                <h1 align="center"><i>Stock Search</i></h1>
                <hr>
                Enter Stock Ticker Symbol:* <input type="text" name="symbol" id="inputText" value="<?php echo isset($_POST["symbol"]) ? $_POST["symbol"] : "" ?>"><br>
                <input type="submit" name="search" id="submitSymbol" value="Search" onclick="return checkempty();"><input type="button" name="clear" id="clearSymbol" value="Clear" onclick="javascript:clearPressed();"><br>
                <span class="leftalign"><i>* - Mandatory fields</i></span>
            </form>
        </div>
        <?php
        if (isset($_POST["search"])) {
            $stockSymbol = $_POST["symbol"];
            if (empty($stockSymbol)) {
                echo "<script>alert('Please Enter a Symbol');</script>";
            } else {
                $callURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" . $stockSymbol . "&apikey=TYWWC92JUZSR9DOQ";

                $response = file_get_contents($callURL);
                $sendtoFunction = $response;
                $data = json_decode($response, true);


                $parsedData = $data['Time Series (Daily)'];
                $array1=array();
                $array2=array();

                foreach ($parsedData as $key => $value) {
                   $arr = strtotime($key)+86400;
                   $arr1 = $arr*1000 ;
                   $arr2 = floatval($parsedData[$key]['4. close']);
                   $arr3 = floatval($parsedData[$key]['5. volume']);
                   $ar1=[$arr1,$arr2];
                   $ar2=[$arr1,$arr3];
                   array_push($array1,$ar1);
                   array_push($array2,$ar2);
                }
               $DatetoPass1 = (strtotime($data['Meta Data']['3. Last Refreshed'])*1000);
               $DatetoPass = "(".$DatetoPass1.")";




                if($data['Error Message']){
                   $outputString = "<div id='midTable'><table><col width=\"450\">";
                   $outputString .="<tr><th>Error</th><td>Error: No record has been found,Please enter a valid symbol.</td></tr></table>";
                   echo $outputString;
                   break;
                }
                $metaData = $data['Meta Data']; // Access metaData
                $lastDaySession = $metaData['3. Last Refreshed']; // Fetch Last Date
                $lastDayTime = strtotime($lastDaySession);
                $lastDayDate = date("Y-m-d", $lastDayTime);
                $dataTimeSeries = $data['Time Series (Daily)'];

                $i = 0;
                foreach ($dataTimeSeries as $key => $value) {//get previous date that has value
                    $i++;
                    if ($i == 2) {
                        $previousDayDate = $key;
                        break;
                    }
                }

                $lastDayArray = $dataTimeSeries[$lastDayDate];
                $previousDayArray = $dataTimeSeries[$previousDayDate];

                $currentClose = $lastDayArray['4. close'];
                $previousClose = $previousDayArray['4. close'];
                $changeClose = round($currentClose - $previousClose,2);

                $changePercentage = ($changeClose / $currentClose) * 100;
                $changePercentage = round($changePercentage, 2);

                function getImageAddress($a, $b) {
                   $checkSign = $a-$b;
                    if ($checkSign <= 0) {
                        return "http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png";
                    } else {
                        return "http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png";
                    }
                }

                $outputString = "<div id='midTable'><table><col width=\"300\">";
                $outputString .="<tr><th>Symbol</th><td>" . $metaData['2. Symbol'] . "</td></tr>"; //Table Symbol
                $outputString .="<tr><th>Close</th><td>" . $currentClose . "</td></tr>";
                $outputString .="<tr><th>Open</th><td>" . $lastDayArray['1. open'] . "</td></tr>";
                $outputString .="<tr><th>Previous Close</th><td>" . $previousClose . "</td></tr>";
                $outputString .="<tr><th>Change</th><td>" . $changeClose . "&nbsp;<img src='" . getImageAddress($currentClose, $previousClose) . "' id='arrowimg'>" . "</td></tr>";
                $outputString .="<tr><th>Change Percentage</th><td>" . $changePercentage . "&nbsp;%<img src='" . getImageAddress($currentClose, $previousClose) . "' id='arrowimg'>" . "</td></tr>";
                $outputString .="<tr><th>Day's Range</th><td>" . $lastDayArray['3. low'] . "-" . $lastDayArray['2. high'] . "</td></tr>";
                $outputString .="<tr><th>Volume</th><td>" . number_format($lastDayArray['5. volume']) . "</td></tr>";
                $outputString .="<tr><th>Timestamp</th><td id='lastDayRefreshed'>" . substr($lastDaySession,0,10) . "</td></tr>";
                $outputString .="<tr><th>Indicators</th><td style=\"word-spacing:20px\">" . "<a href='javascript:;' onclick='priceGraph()'>Price</a> <a href='javascript:;' onclick='createGraph(1)'>SMA</a> <a href='javascript:;' onclick='createGraph(2)'>EMA</a> <a href='javascript:;' onclick='createGraph(3)'>STOCH</a> <a href='javascript:;' onclick='createGraph(4)'>RSI</a> <a href='javascript:;' onclick='createGraph(5)'>ADX</a> <a href='javascript:;' onclick='createGraph(6)'>CCI</a> <a href='javascript:;' onclick='createGraph(7)'> BBANDS</a> <a href='javascript:;' onclick='createGraph(8)'> MACD </a>" . "</td></tr>";
                $outputString .="</table></div>";
                echo $outputString;

                echo "<div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div>";

                echo "<script>document.addEventListener(\"DOMContentLoaded\", function(event){priceGraph();});</script>";
                $crosscheck = 1; //variable to check if this table has been loaded
            }
        }
        ?>


        <?php
        if ($crosscheck == 1) {
            echo "<div id=\"buttonDiv\"><button id='buttonSpan' onclick='changeimg()'><p id='buttonText'>Click to show stock news</p><img id='buttonImage' src='http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png'></button></div>";
//            echo "<div id=\"newsText\"></div>";
        }
        ?>
        <div id="newsText"></div>
        <!--Getting xml data -->

        <?php
        if ($crosscheck == 1) {
        $callURL = "https://seekingalpha.com/api/sa/combined/".$stockSymbol.".xml";
        $response = file_get_contents($callURL);

        $xml = simplexml_load_string($response) or die("Error: Cannot create object");

        foreach ($xml->channel->item as $a) {
            $b = $a->link;
            if (preg_match("/\/article\//", $b)) {
                $dataArray[] = array('title' => (string) $a->title, 'link' => (string) $a->link, 'pubDate' => (string) substr($a->pubDate, 0, -6));
            }
        }
        $b = json_encode($dataArray);
        echo "<script>document.addEventListener(\"DOMContentLoaded\", function(event){jsf($b);});</script>";
     }?>

        <script>
            function jsf(text) {
                var newsOutput = "<table id='newsTable'>";
                for (i = 0; i < 5; i++) {
                    newsOutput += "<tr><td style='text-align: left;padding-top: 4px;padding-bottom: 4px;'><a href=" + text[i]['link'] + " target='_blank'>" + text[i]['title'] + "</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Publication Time: " + text[i]['pubDate'] + "</td></tr>";
                }
                newsOutput += "</table>"
                document.getElementById('newsText').innerHTML = newsOutput;
            }

        </script>


        <script src="https://code.highcharts.com/stock/highstock.js"></script>
        <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
        <script>
        function priceGraph() {
           symbolName = document.getElementById('inputText').value;
           //var data = getJSON('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbolName + '&apikey=TYWWC92JUZSR9DOQ');
           //console.log(data);
           /*<?php $abc = json_encode($sendtoFunction);?>

           var parsedData = JSON.parse(<?php echo $abc?>);
           //console.log(chek);
           //-------------------------------------------------------
           //var parsedData = JSON.parse(data);
           console.log(parsedData);
           var a = parsedData['Time Series (Daily)'];
           var dataArray = new Array();
           var ColumnArray = new Array();
           //console.log(a);
           for (var key in a) {
                //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                //Date.UTC(2013,11,3)
                var newDate = new Date(key);
                var arr1 = newDate.getTime();
                var arr2 = parseFloat(parsedData['Time Series (Daily)'][key]['1. open']);
                var arr3 = parseFloat(parsedData['Time Series (Daily)'][key]['5. volume']);
                var c = [arr1, arr2];
                var d = [arr1, arr3];
                //console.log(c);
                dataArray.push(c);
                ColumnArray.push(d);
                //console.log(arr1);
           }*/
           //-------------------------------------------------------
           var today = document.getElementById('lastDayRefreshed').innerHTML
           var todayDate = '(' + today.substr(5,2) + '/' + today.substr(8,2) + '/' + today.substr(0,4) +')';
           //var today = new Date(<?php echo $DatetoPass1 ?>);
           //console.log(today);
           //console.log(parsedData['Meta Data']['3. Last Refreshed']);
           /*var dd = today.getDate()+1;
           var mm = today.getMonth() + 1; //January is 0!
           var yyyy = today.getFullYear();
           if (dd < 10) {
                dd = '0' + dd;
           }
           if (mm < 10) {
                mm = '0' + mm;
           }
           todayDate = '(' + mm + '/' + dd + '/' + yyyy + ')';*/
           //-------------------------------------------------------
            var colArray1 = <?php echo json_encode($array2); ?>;
           var dataArray1 = <?php echo json_encode($array1); ?>;


           var tickArray = new Array();
           var lastTickDate = colArray1[colArray1.length-1][0];
           var firstTickDate = colArray1[0][0];

           while(firstTickDate>lastTickDate){
             tickArray.push(firstTickDate);
             firstTickDate -= 604800000
             //console.log(firstTickDate);
          }

           //console.log(dataArray1);
           Highcharts.chart('container', {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: 'Stock Price ' + todayDate,
                    xDateFormat: '%Y-%m'
                },
                subtitle: {
                    text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                    useHTML: true
                },
                xAxis: [{
                        ordinal: true,
                        tickPositions: tickArray,
                        //tickInterval: 7 * 24 * 3600 * 1000,
                        type: 'datetime',
                        labels: {
                           format: '{value:%m/%d}',
                           enabled: true,
                           align: 'center'
                        }
                    }],
                yAxis: [{
                        lineWidth: 1,
                        title: {
                           text: 'Stock Price'
                        }
                    },
                    {
                        title: {
                           text: 'Volume'
                        },
                        opposite: true,
                        tickInterval: 50000000
                    }
                ],
                tooltip: {
                    xDateFormat: '%m/%d'
                },
                legend: {
                    enabled: true,
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical'
                },
                plotOptions: {
                    area: {
                        color: '#c4392d',
                        fillOpacity: 0.5,
                        marker: {
                           radius: 1
                        },
                        lineWidth: 1,
                        states: {
                           hover: {
                                lineWidth: 1
                           }
                        },
                        threshold: null
                    },
                    column: {
                        color: '#FFFFFF'
                    }
                },
                series: [{
                        type: 'area',
                        name: symbolName,
                        data: dataArray1
                    }, {
                        type: 'column',
                        name: symbolName + ' Volume',
                        data: colArray1,
                        yAxis: 1,
                        xAxis: 0,
                        pointWidth: 5
                    }]
           });
        }
        </script>
    </body>
</html>
