var mockedAndroiadInterface = {
  onGo: function(fromAddress, toAddress) {
    onDrivingTime(50);
    onUpdate(50, "6 דרום", "1 min gao");
  },
  onNotify :function(maxDrivingTime) {
  //here the android will invoke onUpdate(...) each min and at the ned it will invoke onTimeToGo()
    setTimeout(function(){ onTimeToGo(40,"6 דרום", "now");},3000);
  }
};

var androidInterface = androidInterface || mockedAndroiadInterface;

var drivingTimeVal = function () {
  return Number($("#maxDrivingTime").val()) || 0;
};

TouchClick("#notify", function () {
  $("#myCollapse").collapse('hide');
  androidInterface.onNotify(drivingTimeVal());
});

TouchClick("#go", function () {
  androidInterface.onGo($("#fromAddress").val(), $("#toAddress").val());
});

TouchClick("#minus", function () {
  $("#maxDrivingTime").val(drivingTimeVal() - 1);
});

TouchClick("#plus", function () {
  $("#maxDrivingTime").val(drivingTimeVal() + 1);
});

function onDrivingTime(drivingTime) {
  $("#maxDrivingTime").val(drivingTime);
  $("#myCollapse").collapse('show');
}

function onUpdate(drivingTime, route, updatedAt) {
  $(".time-to-destination").show();
  $(".drivingTime").text(drivingTime);
  $(".route").text(route);
  $(".updatedAt").text(updatedAt);
}

function onTimeToGo(drivingTime, route, updatedAt) {
  onUpdate(drivingTime, route, updatedAt);
  $("#myCollapse").collapse('show');
  $("#time2go").show();
}

function TouchClick(sel, fnc) {
  $(sel).on('touchstart click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    if (event.handled !== true) {
      fnc(event);
      event.handled = true;
    } else {
      return false;
    }
  });
}

