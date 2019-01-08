var app = angular.module('myApp', ['ngAnimate','ngMaterial']);


app.controller("autocompleteController", function($scope, $http,$rootScope){
   $('#GetQuoteBtn').prop("disabled", true);
   $scope.DisplayError = true;

  this.querySearch = function(query){
     $('#GetQuoteBtn').prop("disabled", false);
     $scope.DisplayError = true;
     $("md-autocomplete").removeClass("has-error");
    return $http.get("http://pnodejs-env.us-west-2.elasticbeanstalk.com/autocomplete", {params: {alphabet: query}})
    .then(function(response){
       //console.log(response);

       //console.log(response.data);
      return response.data;
    })
  }


  function searchTextChange(text) {
      //console.log(text);
    }

    $(document).on('click', 'md-autocomplete', function(){
      $scope.DisplayError = false;
      $("md-autocomplete").addClass("has-error");
    });


  $(document).on('click', '#GetQuoteBtn', function(){
     $rootScope.selectedSymbolname = $scope.selectedItem.Symbol;
     //console.log($rootScope.selectedSymbolname);
     $scope.startFetchingData();
  });
  /*$scope.selectedItem = {
      Symbol: "Arkansas".toLowerCase(),
   };*/
   $("#clrBtn").click(function(){
      $scope.goright = true;
      $('#lftbtn').prop("disabled", true);
      $('#GetQuoteBtn').prop("disabled", true);
      self.selectedItem = " ";
      $scope.searchText = null;
      $('#GetQuoteBtn').prop("disabled", true);
     $scope.DisplayError = true;
      $("md-autocomplete md-autocomplete-wrap input").val("");
      $('.StockDetailsDiv').hide();
      $('.FavouritesDiv').show("slide", {
         direction: 'right'
      }, 600);

   });

});


app.controller('stockCtrl', function ($scope, $http, $timeout,$window,$rootScope) {

$scope.otherloading = $scope.loadingPriceVolumeChart;
$scope.goright = true;
//console.log($scope.goright)
/*setInterval(function(){
     $scope.favloading();
  }, 5000)*/


/*-----------------------------------------------------*/
   //console.log($("#autoRefresh").parent());
   //console.log($("#autoRefresh").val());

   var myrefresh = '';

   $('input[type=checkbox][name=autoRefresh]').change(function() {
        //console.log($("#autoRefresh").parent().hasClass("btn-default"));
        if(!$("#autoRefresh").parent().hasClass("btn-default")){
           myrefresh = setInterval(function(){
                $scope.favloading();
             }, 5000)
        }if($("#autoRefresh").parent().hasClass("btn-default")){
           clearInterval(myrefresh);
        }
    });

   /*-----------------------------------------------------*/
   /*$(function () {
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
         var target = $(e.target).attr("href")
         console.log(target);
         if(target == "#smaChart" ){
            $scope.otherloading = $scope.loadingsmaChart;
            if($scope.loadingsmaChart == true ){
               $scope.otherloading = true;
            }
         }
         if(target == "#priceChart" ){
            $scope.otherloading = $scope.loadingPriceVolumeChart;
            if($scope.loadingPriceVolumeChart == true){
               $scope.otherloading = true;
            }
         }
         if(target == "#emaChart" ){
            $scope.otherloading = $scope.loadingemaChart;
            if($scope.loadingemaChart == true){
               $scope.otherloading = true;
            }
         }
         if(target == "#stochChart" ){
            $scope.otherloading = $scope.loadingSTOCHChart;
            if($scope.loadingSTOCHChart == true){
               $scope.otherloading = true;
            }
         }
         if(target == "#rsiChart" ){
            $scope.otherloading = $scope.loadingRSIChart;
            if($scope.loadingRSIChart == true){
               $scope.otherloading = true;
            }
         }
         if(target == "#adxChart" ){
            $scope.otherloading = $scope.loadingADXChart;
            if($scope.loadingADXChart == true){
               $scope.otherloading = true;
            }
         }
         if(target == "#cciChart" ){
            $scope.otherloading = $scope.loadingCCIChart;
            if($scope.loadingCCIChart == true){
               $scope.otherloading = true;
            }
         }
         if(target == "#bbandsChart" ){
            $scope.otherloading = $scope.loadingBBANDSChart;
            if($scope.loadingBBANDSChart == true){
               $scope.otherloading = true;
            }
         }
         if(target == "#macdChart" ){
            $scope.otherloading = $scope.loadingMACDChart;
            if($scope.loadingMACDChart == true){
               $scope.otherloading = true;
            }
         }
         console.log(target + " " + $scope.otherloading);
      });
   })*/
  /*-----------------------------------------------------*/

  $('#facebook').click(function() {
     //console.log($("ul#Charts li.active")[0]['id']);
    if($("ul#Charts li.active")[0]['id'] == "price"){
         $scope.chartData =$scope.chartpvg;
      }
      if($("ul#Charts li.active")[0]['id'] == "sma"){
         $scope.chartData =$scope.chartsmag;
      }
      if($("ul#Charts li.active")[0]['id'] == "ema"){
         $scope.chartData =$scope.chartemag;
      }
      if($("ul#Charts li.active")[0]['id'] == "stoch"){
         $scope.chartData =$scope.chartstochg;
      }
      if($("ul#Charts li.active")[0]['id'] == "rsi"){
         $scope.chartData =$scope.chartrsig;
      }
      if($("ul#Charts li.active")[0]['id'] == "adx"){
         $scope.chartData =$scope.chartadxg;
      }
      if($("ul#Charts li.active")[0]['id'] == "cci"){
         $scope.chartData =$scope.chartccig;
      }
      if($("ul#Charts li.active")[0]['id'] == "bbands"){
         $scope.chartData =$scope.chartbbandsg;
      }
      if($("ul#Charts li.active")[0]['id'] == "macd"){
         $scope.chartData =$scope.chartmacdg;
      }
     var chart = $scope.chartData;
     //console.log(chart);
  function serialize(obj) {
       return Object.keys(obj).map(function(p) {
           return encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]);
       }).join("&");
  }

  function postToFacebook(url) {
     //console.log(chart.options.exporting.url + url);
       var url = chart.options.exporting.url + url,
        title = chart.options.title.text;
       window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '&t=' +
        encodeURIComponent(title), 'sharer', 'toolbar=0,status=0,width=626,height=436');
  }

  $.ajax({
       type: 'POST',
       data: serialize({
           svg: chart.getSVGForExport(),
           type: 'image/png',
           async: true
       }),
       url: chart.options.exporting.url,
       success: postToFacebook,
       error: function(e) {
           throw e;
       }
  });
  });
/*-----------------------------------------------------*/
$scope.favloading = function(){
   function stockArr() {
    this.Sym = '';
    this.SPrice = '';
    this.Changedi = '';
    this.Changep = '';
    this.vol = '';
    this.imgs = '';
    this.txtclass = '';
}
   if($window.localStorage.length!==0){
      var n = $window.localStorage.length;
      var favArray = new Array();
      var favDisplayArray = new Array();
      for(i=0;i<n;i++){
         var key = $window.localStorage.key(i);
         var val = $window.localStorage[key];
         favArray.push(val);
      }
      //console.log(favArray);
      var k=0;
      for(j=0;j<favArray.length;j++){
         if(!Number.isInteger(parseInt(favArray[j]))){

            $http({
               method: "GET",
               url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/priceVolume/" + favArray[j]
           }).then(function mySuccess(response) {

               var fetchedData = response.data;
               //console.log(parsedData["rss"]["channel"][0]["item"][0]['title'][0]);
               if (fetchedData['Error Message']) {
                   $scope.loading = false;
                   $scope.loadingErrorStock = true;
               }
               //console.log(typeof(response.data));
               try{
                  var lastRefreshedDate = fetchedData['Meta Data']['3. Last Refreshed'].toString().substring(0, 10);
               }catch(e){
                  favDisplayArray[k] = new stockArr();
                  favDisplayArray[k].Sym = "N/A"
                  favDisplayArray[k].SPrice = "NA";
                  favDisplayArray[k].Changedi = "NA";
                  favDisplayArray[k].Changep = "NA";
                  favDisplayArray[k].imgs = "NA";
                  favDisplayArray[k].txtclass = "NA";
                  favDisplayArray[k].vol = "NA";
                  k++
               }

               //Manipulation of Data
               var lastRefreshedDate = fetchedData['Meta Data']['3. Last Refreshed'].toString().substring(0, 10);
               var dataTimeSeries = fetchedData['Time Series (Daily)'];
               var i = 0;
               var previousDayDate = '';
               var imgsrc = '';
               var changeClass = '';
               angular.forEach(dataTimeSeries, function (value, key) {
                   i++;
                   if (i == 2) {
                       previousDayDate = key;
                   }
               });
               //change percentage calculation
               //console.log(lastRefreshedDate.toString().substring(0, 10));
               var currentClose = dataTimeSeries[lastRefreshedDate.toString().substring(0, 10)]['4. close'];
               var previousClose = dataTimeSeries[previousDayDate.toString().substring(0, 10)]['4. close'];
               var changeClose = currentClose - previousClose;
               changePercentage = (changeClose / currentClose) * 100;
               //console.log(changePercentage);

               //arrow image selection
               if (changeClose > 0) {
                   imgsrc = "http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png";
                   changeClass = "text-success";
               } else {
                   imgsrc = "http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png";
                   changeClass = "text-danger";
               }

               //Display of Data in proper Labels
               var stockSymbolLabel1 = fetchedData['Meta Data']['2. Symbol'];
               var lastPriceLabel1 = fetchedData['Time Series (Daily)'][lastRefreshedDate.substring(0, 10).toString()]['4. close'];
               //console.log($scope.lastPriceLabel);
               var changePercentageLabel1 = changePercentage;
               var imgsrcLabel1 = imgsrc;
               var changeLabel1 = changeClose;
               var changeClassLabel1 = changeClass;
               var volumeLabel1 = fetchedData['Time Series (Daily)'][lastRefreshedDate.toString().substring(0, 10)]['5. volume'];
               var dayRangeLowLabel1 = fetchedData['Time Series (Daily)'][lastRefreshedDate.toString().substring(0, 10)]['3. low'];
               var dayRangeHighLabel1 = fetchedData['Time Series (Daily)'][lastRefreshedDate.toString().substring(0, 10)]['2. high'];
               var openLabel1 = fetchedData['Time Series (Daily)'][lastRefreshedDate.toString().substring(0, 10)]['1. open'];
               //console.log(fetchedData);

               favDisplayArray[k] = new stockArr();
               favDisplayArray[k].Sym = stockSymbolLabel1;
               favDisplayArray[k].SPrice = parseFloat(lastPriceLabel1);
               favDisplayArray[k].Changedi = changeLabel1;
               favDisplayArray[k].Changep = changePercentageLabel1;
               favDisplayArray[k].imgs = imgsrcLabel1;
               favDisplayArray[k].txtclass = changeClass;
               favDisplayArray[k].vol = volumeLabel1;
               k++;

           }, function myError(response) {
              //console.log("Failed");
           });

         }
      }
      $scope.favDisplayFront = favDisplayArray;
   }else{
      //console.log("EMPT");
   }
};
/*-----------------------------------------------------*/



$(document).on('click', '#leftbtn', function(){
   $scope.goright = false;
   //console.log($scope.goright);
});


$(document).on('click', '.symb', function(){
   var $item = $(this).closest("tr").find(".symb").text();
   $rootScope.selectedSymbolname = $item;
   $("md-autocomplete md-autocomplete-wrap input").val($rootScope.selectedSymbolname);
   $('#GetQuoteBtn').prop("disabled", false);
      if(localStorage.numOfFav){
         var CurrentSymbolName = $rootScope.selectedSymbolname;
         var n = localStorage.length;
         for(i=0;i<n;i++){
            var key = localStorage.key(i);
            var val = localStorage[key];
            if(CurrentSymbolName == val){
               //alert("FOUND");
               $( "#starChange" ).removeClass( "glyphicon-star-empty" ).addClass( "glyphicon-star" );
               break;
            }else{
               $( "#starChange" ).removeClass( "glyphicon-star" ).addClass( "glyphicon-star-empty" );
            }
         }

      }
   $scope.startFetchingData();
   //alert($item);
});

   $scope.addToLs = function(){
      $timeout($scope.favloading(), 6000);
   }

   $scope.dis = function(a){
      if(a=="none"){
         $scope.OrderDisable = true;
      }else{
         $scope.OrderDisable = false;
      }
   }
   $scope.OrderDisable = true;
   $scope.AsD = "false";
   $scope.changeAsD = function(a){
      if(a=="true"){
         $scope.AsD = "true";
         $scope.AssD = true;
      }
      if(a=="false"){
         $scope.AssD = false;
      }
   }

   $scope.ckbox = function(myCheckbox){
      alert(myCheckbox);
   }


    $scope.AssD = "true";
    $scope.loadingErrorStock = false;
    $scope.sortDir = false;
    $scope.sortBy = "none";

    $scope.fbloading = false;

    $scope.checkaloading = function (a) {
        alert(a);
        if (a == 0) {
            while ($scope.loading == true || $scope.loadingPriceVolumeChart == true) {
                return true;
            }
        }
        if (a == 1) {
            $interval(function () {
                if ($scope.loadingsmaChart == true) {
                    $scope.fbloading = true;
                } else {
                    $scope.fbloading = false;
                }
            }, 500);
        }
        if (a == 2) {
            while ($scope.loading == true || $scope.loadingemaChart == true) {
                return true;
            }
        }
        if (a == 3) {
            while ($scope.loading == true || $scope.loadingSTOCHChart == true) {
                return true;
            }
        }
        if (a == 4) {
            while ($scope.loading == true || $scope.loadingRSIChart == true) {
                return true;
            }
        }
        if (a == 5) {
            while ($scope.loading == true || $scope.loadingADXChart == true) {
                return true;
            }
        }
        if (a == 6) {
            while ($scope.loading == true || $scope.loadingCCIChart == true) {
                return true;
            }
        }
        if (a == 7) {
            while ($scope.loading == true || $scope.loadingBBANDSChart == true) {
                return true;
            }
        }
        if (a == 8) {
            while ($scope.loading == true || $scope.loadingMACDChart == true) {
                return true;
            }
        }
        return false;
    };

    $scope.goleft = function(){
      $scope.FavVis = false;
   };

    $("#GetQuoteBtn").click(function(){
      $scope.FavVis = true;
      $scope.goright = false;
      if(localStorage.numOfFav){
         var CurrentSymbolName = $rootScope.selectedSymbolname;
         var n = localStorage.length;
         for(i=0;i<n;i++){
            var key = localStorage.key(i);
            var val = localStorage[key];
            if(CurrentSymbolName == val){
               //alert("FOUND");
               $( "#starChange" ).removeClass( "glyphicon-star-empty" ).addClass( "glyphicon-star" );
               break;
            }else{
               $( "#starChange" ).removeClass( "glyphicon-star" ).addClass( "glyphicon-star-empty" );
            }
         }

      }
   });



    $scope.startFetchingData = function () {
      //console.log($scope.symbolName);
      //console.log($("ul#Charts li.active"));
        $timeout($scope.loadPriceVolumeChart(), 2000);
        $scope.loadData();

        $timeout($scope.loadsmaChart(), 4000);
        $scope.loademaChart();
        $timeout($scope.loadSTOCHChart(), 4000);
        $scope.loadRSIChart();
        $scope.loadADXChart();
        $scope.loadCCIChart();
        $scope.loadBBANDSChart();
        $scope.loadMACDChart();
        $scope.loadNewsArticle();
        $scope.loadStockChart();
    };

    $scope.loadPriceVolumeChart = function () {
        //console.log("function loadPriceVolumeChart");
        $scope.loadingPriceVolumeChart = true;
        $scope.loadingErrorPriceVolumeChart = false;
        //console.log($rootScope.selectedSymbolname);
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/priceVolume/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;
            //console.log(parsedData);

            try{
               var temp = parsedData['Meta Data']['3. Last Refreshed'];
            }catch(e){
               $scope.loadingPriceVolumeChart = false;
               $scope.loadingErrorPriceVolumeChart = true;
            }


            var a = parsedData['Time Series (Daily)'];
            //console.log(parsedData);
            //console.log(parsedData['Meta Data']['3. Last Refreshed'].toString().substring(0, 10));
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
            }


            var tickArray = new Array();
            var lastTickDate = dataArray[dataArray.length - 1][0];
            var firstTickDate = dataArray[0][0];

            while (firstTickDate > lastTickDate) {
                tickArray.push(firstTickDate);
                firstTickDate -= 604800000
                //console.log(firstTickDate);
            }

            //console.log(dataArray1);

            chartpv = Highcharts.chart('priceChartContainer', {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: $rootScope.selectedSymbolname + ' Stock Price and Volume ',
                    xDateFormat: '%Y-%m'
                },
                subtitle: {
                    text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
                    useHTML: true
                },
                xAxis: [{
                    tickPositions: tickArray,
                    //tickInterval: 1 * 24 * 3600 * 1000,
                    ordinal: true,
                    labels: {
                        format: '{value:%m/%d}',
                        enabled: true,
                        align: 'center',
                        rotation: -45
                    }
   }],
                yAxis: [{
                    title: {
                        text: 'Stock Price'
                    },
                    legend: {
                        enabled: false
                    },
                    min: 0
   }, {
                    title: {
                        text: 'volume'
                    },
                    legend: {
                        enabled: false
                    },
                    opposite: true,
   }],
                plotOptions: {
                    area: {
                        color: 'rgb(22,120,184)',
                        fillOpacity: 0.5,
                        marker: {
                            radius: 0
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 2
                            }
                        },
                        threshold: null
                    },
                    column: {
                        color: 'red'
                    }
                },
                tooltip: {
                    shared: false,
                    xDateFormat: '%m/%d'
                },
                series: [{
                    type: 'area',
                    name: "Price",
                    data: dataArray,
   }, {
                    type: 'column',
                    name:' Volume',
                    yAxis: 1,
                    xAxis: 0,
                    maxPointWidth: 5,
                    data: ColumnArray
   }]
            });

            $scope.chartpvg = chartpv;

            $scope.loadingPriceVolumeChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingPriceVolumeChart = false;
                $scope.loadingErrorPriceVolumeChart = true;
                //console.log('empty PV chart');
            }
        }, function myError(response) {
            $scope.loadingPriceVolumeChart = false;
            $scope.loadingErrorPriceVolumeChart = true;
        });

    };

    $scope.loadsmaChart = function () {
        //console.log("function loadsmaChart");
        $scope.loadingsmaChart = true;
        $scope.loadingErrorsmaChart = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/SMA/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;

            try{
               var temp = parsedData['Meta Data']['3. Last Refreshed'];
            }catch(e){
               $scope.loadingsmaChart = false;
               $scope.loadingErrorsmaChart = true;
            }

            //console.log(parsedData);
            var a = parsedData['Technical Analysis: SMA'];
            var b = parsedData['Meta Data']['3: Last Refreshed'].toString().substring(0, 10);
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
            var lastTickDate = dataArray[dataArray.length - 1][0];
            var firstTickDate = dataArray[0][0];


            /*if ($(window).width() > 739) {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 604800000
                    //console.log(firstTickDate);
                }
            } else {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 1209600000
                    //console.log(firstTickDate);
                }
            }*/

            chartsma = Highcharts.chart('smaChartContainer', {
                chart: {
                    type: 'line',
                    zoomType: 'x'
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
                    //tickPositions: tickArray,
                    //ordinal: true,
                    tickInterval: 1 * 24 * 3600 * 1000,
                    //showLastLabel: true,
                    endOnTick: true,
                    type: 'datetime',
                    minTickInterval: 2,
                    labels: {
                        format: '{value:%m/%d}',
                        enabled: true,
                        align: 'center',
                        rotation: -45,
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
                },
                plotOptions: {
                    line: {
                        color: '#c4392d',
                        //lineWidth: 3
                    }
                },
                series: [{
                    type: 'line',
                    name: $rootScope.selectedSymbolname,
                    data: dataArray
                }]
            });

            $scope.chartsmag = chartsma;
            //console.log($scope.abchart);

            $scope.loadingsmaChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingsmaChart = false;
                $scope.loadingErrorsmaChart = true;
                //console.log('empty SMA chart');
            }
        }, function myError(response) {
            $scope.loadingsmaChart = false;
            $scope.loadingErrorsmaChart = true;
        });

    };

    $scope.loademaChart = function () {
        //console.log("function loademaChart");
        $scope.loadingemaChart = true;
        $scope.loadingErroremaChart = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/EMA/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;

            try{
               var temp = parsedData['Meta Data']['3. Last Refreshed'];
            }catch(e){
               $scope.loadingemaChart = false;
               $scope.loadingErroremaChart = true;
            }

            //console.log(parsedData);
            var a = parsedData['Technical Analysis: EMA'];
            var b = parsedData['Meta Data']['3: Last Refreshed'].toString().substring(0, 10);
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
            var lastTickDate = dataArray[dataArray.length - 1][0];
            var firstTickDate = dataArray[0][0];


            chartema = Highcharts.chart('emaChartContainer', {
                chart: {
                    type: 'line',
                    zoomType: 'x'
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
                    //tickPositions: tickArray,
                    //ordinal: true,
                    tickInterval: 1 * 24 * 3600 * 1000,
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
                    enabled: true
                },
                plotOptions: {
                    line: {
                        color: '#c4392d',
                    }
                },
                series: [{
                    type: 'line',
                    name: $rootScope.selectedSymbolname,
                    data: dataArray
                 }]
            });

            $scope.chartemag = chartema;

            $scope.loadingemaChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingemaChart = false;
                $scope.loadingErroremaChart = true;
                //console.log('empty SMA chart');
            }
        }, function myError(response) {
            $scope.loadingemaChart = false;
            $scope.loadingErroremaChart = true;
        });

    };

    $scope.loadSTOCHChart = function () {
        //console.log("function loadSTOCHChart");
        $scope.loadingSTOCHChart = true;
        $scope.loadingErrorSTOCHChart = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/STOCH/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;

            try{
               var temp = parsedData['Meta Data']['3. Last Refreshed'];
            }catch(e){
               $scope.loadingSTOCHChart = false;
               $scope.loadingErrorSTOCHChart = true;
            }
            //console.log(parsedData);
            var a = parsedData['Technical Analysis: STOCH'];
            var b = parsedData['Meta Data']['3: Last Refreshed'].toString().substring(0, 10);
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
            var lastTickDate = slowKArray[slowKArray.length - 1][0];
            var firstTickDate = slowKArray[0][0];

            /*if ($(window).width() > 739) {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 604800000
                    //console.log(firstTickDate);
                }
            } else {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 1209600000
                    //console.log(firstTickDate);
                }
            }*/

            chartstoch = Highcharts.chart('STOCHChartContainer', {
                chart: {
                    type: 'line',
                    zoomType: 'x'
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
                    //tickPositions: tickArray,
                    //ordinal: true,
                    tickInterval: 1 * 24 * 3600 * 1000,
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
                },
                plotOptions: {
                    line: {
                        color: '#c4392d',
                    }
                },
                series: [{
                        type: 'line',
                        name: $rootScope.selectedSymbolname + ' SlowK',
                        data: slowKArray
                    },
                    {
                        type: 'line',
                        name: $rootScope.selectedSymbolname + ' SlowD',
                        data: slowDArray,
                        color: '#0000ff'
                    }]
            });
            $scope.chartstochg = chartstoch;

            $scope.loadingSTOCHChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingSTOCHChart = false;
                $scope.loadingErrorSTOCHChart = true;
                //console.log('empty SMA chart');
            }
        }, function myError(response) {
            $scope.loadingSTOCHChart = false;
            $scope.loadingErrorSTOCHChart = true;
        });

    };

    $scope.loadRSIChart = function () {
        //console.log("function loadSTOCHChart");
        $scope.loadingRSIChart = true;
        $scope.loadingErrorRSIChart = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/RSI/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;

            try{
               var temp = parsedData['Meta Data']['3. Last Refreshed'];
            }catch(e){
               $scope.loadingRSIChart = false;
               $scope.loadingErrorRSIChart = true;
            }

            //console.log(parsedData);
            var a = parsedData['Technical Analysis: RSI'];
            var b = parsedData['Meta Data']['3: Last Refreshed'].toString().substring(0, 10);
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
            var lastTickDate = dataArray[dataArray.length - 1][0];
            var firstTickDate = dataArray[0][0];

            /*if ($(window).width() > 739) {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 604800000
                    //console.log(firstTickDate);
                }
            } else {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 1209600000
                    //console.log(firstTickDate);
                }
            }*/

            chartrsi = Highcharts.chart('RSIChartContainer', {
                chart: {
                    type: 'line',
                    zoomType: 'x'
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
                    //tickPositions: tickArray,
                    //ordinal: true,
                    tickInterval: 1 * 24 * 3600 * 1000,
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
                },
                plotOptions: {
                    line: {
                        color: '#c4392d',
                    }
                },
                series: [{
                    type: 'line',
                    name: $rootScope.selectedSymbolname,
                    data: dataArray
                    }]
            });
            $scope.chartrsig = chartrsi;

            $scope.loadingRSIChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingRSIChart = false;
                $scope.loadingErrorRSIChart = true;
                //console.log('empty SMA chart');
            }
        }, function myError(response) {
            $scope.loadingRSIChart = false;
            $scope.loadingErrorRSIChart = true;
        });

    };

    $scope.loadADXChart = function () {
        //console.log("function loadADXChart");
        $scope.loadingADXChart = true;
        $scope.loadingErrorADXChart = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/ADX/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;

            try{
               var temp = parsedData['Meta Data']['3. Last Refreshed'];
            }catch(e){
               $scope.loadingADXChart = false;
               $scope.loadingErrorADXChart = true;
            }

            //console.log(parsedData);
            var a = parsedData['Technical Analysis: ADX'];
            var b = parsedData['Meta Data']['3: Last Refreshed'].toString().substring(0, 10);
            var todayDate = new Date(b);
            todayDate.setMonth(todayDate.getMonth() - 6);
            var dataArray = new Array();
            for (var key in a) {
                ////console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
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
            var lastTickDate = dataArray[dataArray.length - 1][0];
            var firstTickDate = dataArray[0][0];

            /*if ($(window).width() > 739) {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 604800000
                    //console.log(firstTickDate);
                }
            } else {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 1209600000
                    //console.log(firstTickDate);
                }
            }*/

            chartadx = Highcharts.chart('ADXChartContainer', {
                chart: {
                    type: 'line',
                    zoomType: 'x'
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
                    //tickPositions: tickArray,
                    //ordinal: true,
                    tickInterval: 1 * 24 * 3600 * 1000,
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
                },
                plotOptions: {
                    line: {
                        color: '#c4392d',
                    }
                },
                series: [{
                    type: 'line',
                    name: $rootScope.selectedSymbolname,
                    data: dataArray
                    }]
            });
            $scope.chartadxg = chartadx;
            $scope.loadingADXChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingADXChart = false;
                $scope.loadingErrorADXChart = true;
                //console.log('empty SMA chart');
            }
        }, function myError(response) {
            $scope.loadingADXChart = false;
            $scope.loadingErrorADXChart = true;
        });

    };

    $scope.loadCCIChart = function () {
        //console.log("function loadADXChart");
        $scope.loadingCCIChart = true;
        $scope.loadingErrorCCIChart = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/CCI/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;

            try{
               var temp = parsedData['Meta Data']['3. Last Refreshed'];
            }catch(e){
               $scope.loadingCCIChart = false;
               $scope.loadingErrorCCIChart = true;
            }

            //console.log(parsedData);
            var a = parsedData['Technical Analysis: CCI'];
            var b = parsedData['Meta Data']['3: Last Refreshed'].toString().substring(0, 10);
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
            var lastTickDate = dataArray[dataArray.length - 1][0];
            var firstTickDate = dataArray[0][0];

            /*if ($(window).width() > 739) {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 604800000
                    //console.log(firstTickDate);
                }
            } else {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 1209600000
                    //console.log(firstTickDate);
                }
            }*/

            chartcci = Highcharts.chart('CCIChartContainer', {
                chart: {
                    type: 'line',
                    zoomType: 'x'
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
                    //tickPositions: tickArray,
                    //ordinal: true,
                    tickInterval: 1 * 24 * 3600 * 1000,
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
                },
                plotOptions: {
                    line: {
                        color: '#c4392d',
                    }
                },
                series: [{
                    type: 'line',
                    name: $rootScope.selectedSymbolname,
                    data: dataArray
                    }]
            });
            $scope.chartccig = chartcci;
            $scope.loadingCCIChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingCCIChart = false;
                $scope.loadingErrorCCIChart = true;
                //console.log('empty CCI chart');
            }
        }, function myError(response) {
            $scope.loadingCCIChart = false;
            $scope.loadingErrorCCIChart = true;
        });

    };

    $scope.loadBBANDSChart = function () {
        //console.log("function loadADXChart");
        $scope.loadingBBANDSChart = true;
        $scope.loadingErrorBBANDSChart = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/BBANDS/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;

            try{
               var temp = parsedData['Meta Data']['3. Last Refreshed'];
            }catch(e){
               $scope.loadingBBANDSChart = false;
               $scope.loadingErrorBBANDSChart = true;
            }

            //console.log(parsedData);
            var a = parsedData['Technical Analysis: BBANDS'];
            var b = parsedData['Meta Data']['3: Last Refreshed'].toString().substring(0, 10);
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
            var lastTickDate = RUBandArray[RUBandArray.length - 1][0];
            var firstTickDate = RUBandArray[0][0];

            /*if ($(window).width() > 739) {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 604800000
                    //console.log(firstTickDate);
                }
            } else {
                while (firstTickDate > lastTickDate) {
                    tickArray.push(firstTickDate);
                    firstTickDate -= 1209600000
                    //console.log(firstTickDate);
                }
            }*/

            chartbbands = Highcharts.chart('BBANDSChartContainer', {
                chart: {
                    type: 'line',
                    zoomType: 'x'
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
                    //tickPositions: tickArray,
                    //ordinal: true,
                    tickInterval: 1 * 24 * 3600 * 1000,
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
                            text: 'BBANDS'
                        }
                    }
                ],
                legend: {
                    enabled: true,
                },
                plotOptions: {
                    line: {
                        color: '#c4392d',
                    }
                },
                series: [{
                        type: 'line',
                        name: $rootScope.selectedSymbolname + ' Real Upper Band',
                        data: RUBandArray,
                        color: '#000000'
                    },
                    {
                        type: 'line',
                        name: $rootScope.selectedSymbolname + ' Real Lower Band',
                        data: RLBandArray,
                        color: '#00ff00'
                    },
                    {
                        type: 'line',
                        name: $rootScope.selectedSymbolname + ' Real Medium Band',
                        data: RMBandArray,
                        color: '#ff0000'
                    }]
            });
            $scope.chartbbandsg = chartbbands;
            $scope.loadingBBANDSChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingBBANDSChart = false;
                $scope.loadingErrorBBANDSChart = true;
                //console.log('empty BBANDS chart');
            }
        }, function myError(response) {
            $scope.loadingBBANDSChart = false;
            $scope.loadingErrorBBANDSChart = true;
        });

    };

    $scope.loadMACDChart = function () {
        //console.log("function loadMACDChart");
        $scope.loadingMACDChart = true;
        $scope.loadingErrorMACDChart = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/MACD/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;

            try{
               var temp = parsedData['Meta Data']['3. Last Refreshed'];
            }catch(e){
               $scope.loadingMACDChart = false;
               $scope.loadingErrorMACDChart = true;
            }

            //console.log(parsedData);
            var a = parsedData['Technical Analysis: MACD'];

            var b = parsedData['Meta Data']['3: Last Refreshed'].toString().substring(0, 10);
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
            //console.log(dataArray[dataArray.length - 1][0]);
            //console.log(dataArray[0][0]);
            var tickArray = new Array();
            var lastTickDate = dataArray[dataArray.length - 1][0];
            var firstTickDate = dataArray[0][0];

            /*while (firstTickDate > lastTickDate) {
                tickArray.push(firstTickDate);
                firstTickDate -= 604800000
                //console.log(firstTickDate);
            }*/



            chartmacd = Highcharts.chart('MACDChartContainer', {
                chart: {
                    type: 'line',
                    zoomType: 'x'
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
                    tickInterval: 1 * 24 * 3600 * 1000,
                    //tickPositions: tickArray,
                    type: 'datetime',
                    labels: {
                        format: '{value:%m/%d}',
                        enabled: true,
                        align: 'center',
                        rotation: -45
                    },
                    //ordinal: true,
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
                },
                plotOptions: {
                    line: {
                        color: '#c4392d',
                    }
                },
                series: [{
                        type: 'line',
                        name: $rootScope.selectedSymbolname + ' MACD_Hist',
                        data: MACDHistArray,
                        color: '#000000'
                    },
                    {
                        type: 'line',
                        name: $rootScope.selectedSymbolname + ' MACD',
                        data: dataArray,
                        color: '#00ff00'
                    },
                    {
                        type: 'line',
                        name: $rootScope.selectedSymbolname + ' MACD_Signal',
                        data: MACDSignalArray,
                        color: '#ff0000'
                    }]
            });
            $scope.chartmacdg = chartmacd;
            $scope.loadingMACDChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingMACDChart = false;
                $scope.loadingErrorMACDChart = true;
                //console.log('empty MACD chart');
            }
        }, function myError(response) {
            $scope.loadingMACDChart = false;
            $scope.loadingErrorMACDChart = true;
        });

    };


    $scope.loadStockChart = function () {
        //console.log("function loadStockChart");
        $scope.loadingStockChart = true;
        $scope.loadingErrorStockChart = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/priceVolumeFull/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;

            try{
               var temp = parsedData['Time Series (Daily)'];
            }catch(e){
               $scope.loadingStockChart = false;
               $scope.loadingErrorStockChart = true;
            }

            var a = parsedData['Time Series (Daily)'];
            //console.log(parsedData);
            //console.log(parsedData['Meta Data']['3. Last Refreshed'].toString().substring(0, 10));
            var dataArray = new Array();
            //console.log(a);
            for (var key in a) {
                //console.log(key + "- "+ parsedData['Time Series (Daily)'][key]['1. open']);
                //Date.UTC(2013,11,3)
                var newDate = new Date(key);
                var arr1 = newDate.getTime();
                var arr2 = parseFloat(parsedData['Time Series (Daily)'][key]['1. open']);
                var c = [arr1, arr2];
                //console.log(c);
                dataArray.push(c);
            }
            console.log(dataArray);

            if ($(window).width() > 739){
               var buttn = [ {
                   type: 'week',
                   count: 1,
                   text: '1w'
               }, {
                   type: 'month',
                   count: 1,
                   text: '1m'
               },{
                   type: 'month',
                   count: 3,
                   text: '3m'
               },{
                   type: 'month',
                   count: 6,
                   text: '6m'
               }, {
      				type: 'ytd',
      				text: 'YTD'
   			   },{
                   type: 'year',
                   count: 1,
                   text: '1y'
               }, {
                   type: 'all',
                   text: 'All'
               }]
               //console.log(buttn)
            }else{
               var buttn = [ {
                   type: 'month',
                   count: 1,
                   text: '1m'
               },{
                   type: 'month',
                   count: 3,
                   text: '3m'
               },{
                   type: 'month',
                   count: 6,
                   text: '6m'
               },{
                   type: 'year',
                   count: 1,
                   text: '1y'
               }, {
                   type: 'all',
                   text: 'All'
               }]
            }


            Highcharts.stockChart('StockChartContainer', {

        chart: {
            height: 400
        },

        title: {
            text: $rootScope.selectedSymbolname + ' Stock Value'
        },

        subtitle: {
            text: "<a href='https://www.alphavantage.co/' style='text-decoration:none;' target='_blank'>Source:Alpha Vantage</a>",
            useHTML: true
        },
        yAxis: {
            title: {
                text: 'Stock Value'
            }
        },

        rangeSelector: {
            selected: 1,
            buttons: buttn,
        },

        series: [{
            name: $rootScope.selectedSymbolname,
            data: dataArray.reverse(),
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2,
            }
        }],

        tooltip:{
           split:false
        },

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    chart: {
                        height: 400
                    },
                }
            }]
        }
    });

            $scope.loadingStockChart = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingStockChart = false;
                $scope.loadingErrorStockChart = true;
                //console.log('empty MACD chart');
            }
        }, function myError(response) {
            $scope.loadingStockChart = false;
            $scope.loadingErrorStockChart = true;
        });

    };


    $scope.loadNewsArticle = function () {
        //console.log("function loadsmaChart");
        $scope.loadingNewsArticles = true;
        $scope.loadingErrorNewsArticles = false;
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/NEWS/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {

            var parsedData = response.data;
            //console.log(parsedData["rss"]["channel"][0]["item"][0]['title'][0]);
            //console.log(parsedData);

            try{
               var temp = parsedData["rss"]["channel"][0]["item"];
            }catch(e){
               $scope.loadingNewsArticles = false;
               $scope.loadingErrorNewsArticles = true;
            }

            function NewsArticle() {
                this.title = '';
                this.link = '';
                this.author = '';
                this.pubdate = '';
            }
            var articleArray = new Array();
            var a = parsedData["rss"]["channel"][0]["item"];

            var j = 0;
            var patt = /article/;
            for (i = 0; i < a.length; i++) {
                if (patt.test(a[i]['link'])) {
                    articleArray[j] = new NewsArticle();
                    articleArray[j].title = a[i]['title'][0];
                    articleArray[j].link = a[i]['link'][0];
                    articleArray[j].author = a[i]['sa:author_name'][0];
                    articleArray[j].pubdate = a[i]['pubDate'][0].slice(0,-5) + "ED";
                    if (j >= 4) {
                        break;
                    }
                    j++;
                }
            }
            $scope.articles = articleArray;
            $scope.loadingNewsArticles = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loadingNewsArticles = false;
                $scope.loadingErrorNewsArticles = true;
                //console.log('empty NewsArticle');
            }
        }, function myError(response) {
            $scope.loadingNewsArticles = false;
            $scope.loadingErrorNewsArticles = true;
        });



    };

    $('.slideBtn').click(function() {
        if ($('.StockDetailsDiv').is(":visible")) {
            $('.StockDetailsDiv').hide();
            $('.FavouritesDiv').show("slide", {
                direction: 'right'
            }, 600);
        } else {
            $('.FavouritesDiv').hide();
            $('.StockDetailsDiv').show("slide", {
                direction: 'left'
            }, 600);
        }
    });





    $scope.loadData = function () {
        $('.FavouritesDiv').hide();
        $('.StockDetailsDiv').show("slide", {
            direction: 'left'
        }, 600);
        //console.log("function loadData");
        $scope.loading = true;
        $scope.loadingErrorStock = false;
        //console.log($rootScope.selectedSymbolname);
        $http({
            method: "GET",
            url: "http://pnodejs-env.us-west-2.elasticbeanstalk.com/priceVolume/" + $rootScope.selectedSymbolname
        }).then(function mySuccess(response) {
            var fetchedData = response.data;

            if (fetchedData['Error Message']) {
                $scope.loading = false;
                $scope.loadingErrorStock = true;
            }

            //Manipulation of Data
            var lastRefreshedDate = fetchedData['Meta Data']['3. Last Refreshed'].toString().substring(0, 10);
            var dataTimeSeries = fetchedData['Time Series (Daily)'];
            var i = 0;
            var previousDayDate = '';
            var imgsrc = '';
            var changeClass = '';
            angular.forEach(dataTimeSeries, function (value, key) {
                i++;
                if (i == 2) {
                    previousDayDate = key;
                }
            });
            //change percentage calculation
            //console.log(lastRefreshedDate.toString().substring(0, 10));
            var currentClose = dataTimeSeries[lastRefreshedDate.toString().substring(0, 10)]['4. close'];
            var previousClose = dataTimeSeries[previousDayDate.toString().substring(0, 10)]['4. close'];
            var changeClose = currentClose - previousClose;
            changePercentage = (changeClose / currentClose) * 100;
            //console.log(changePercentage);

            var timestamp = moment.tz(fetchedData['Meta Data']['3. Last Refreshed'],"US/Eastern");
            if(timestamp.hour()==0 && timestamp.minute()==0 && timestamp.second()==0 && timestamp.millisecond()==0){
               timestamp.hour(16);
               timestamp.minute(0);
               timestamp.second(0);
               timestamp.millisecond(0);
            }

            $scope.timeStampLabel = moment.tz(timestamp,"US/Eastern").format("YYYY-MM-DD HH:mm:ss zz");

            //arrow image selection
            if (changeClose > 0) {
                imgsrc = "http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png";
                changeClass = "text-success";
            } else {
                imgsrc = "http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png";
                changeClass = "text-danger";
            }



            var a = fetchedData['Time Series (Daily)'];
            var loopcount=1;
            for (var key in a) {
                var onedayagoclose = parseFloat(fetchedData['Time Series (Daily)'][key]['4. close']);
                if(loopcount==2){
                   break;
                }
                loopcount++;
            }


            if(timestamp.hour()>15){
               $scope.previousCloseLabel = fetchedData['Time Series (Daily)'][lastRefreshedDate.substring(0, 10).toString()]['4. close'];
            }else{
               $scope.previousCloseLabel = onedayagoclose;
            }

            //Display of Data in proper Labels
            $scope.stockSymbolLabel = fetchedData['Meta Data']['2. Symbol'];
            $scope.lastPriceLabel = fetchedData['Time Series (Daily)'][lastRefreshedDate.substring(0, 10).toString()]['4. close'];

            $scope.changePercentageLabel = changePercentage;
            $scope.imgsrcLabel = imgsrc;
            $scope.changeLabel = changeClose;
            $scope.changeClassLabel = changeClass;
            $scope.volumeLabel = fetchedData['Time Series (Daily)'][lastRefreshedDate.toString().substring(0, 10)]['5. volume'];
            $scope.dayRangeLowLabel = fetchedData['Time Series (Daily)'][lastRefreshedDate.toString().substring(0, 10)]['3. low'];
            $scope.dayRangeHighLabel = fetchedData['Time Series (Daily)'][lastRefreshedDate.toString().substring(0, 10)]['2. high'];
            $scope.openLabel = fetchedData['Time Series (Daily)'][lastRefreshedDate.toString().substring(0, 10)]['1. open'];
            //console.log(fetchedData['Time Series (Daily)'][lastRefreshedDate.toString()]['4. close']);
            $scope.loading = false;
            if (JSON.stringify(response.data) == "{}") {
                $scope.loading = false;
                $scope.loadingErrorStock = true;
                //console.log('empty');
            }
            //console.log($scope.myWelcome['Technical Analysis: SMA']['2017-10-25']);
        }, function myError(response) {
            $scope.loading = false;
            $scope.loadingErrorStock = true;
            $scope.myWelcome = response.statusText;
        });
    };

});
