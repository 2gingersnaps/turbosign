
'use strict';



angular
    .module('robbi')
    .controller('SigningPageCtrl', SigningPageCtrl);

SigningPageCtrl.$inject = ['$scope', '$http', '$log', '$window', '$stateParams', '$document', '$interval'];

function SigningPageCtrl($scope, $http, $log, $window, $stateParams, $document, $interval) {


  $scope.partHash = $stateParams.participantHash;
  $log.debug('PASSED INTO SIGNING PAGE CONTROLLER VIA $stateParams.participantHash: ' + $scope.partHash);



// //////////////////////////////////////////////////////////////////////////
// ZOOM FACTOR //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

  $scope.preferredPageWidth = 840;
  $scope.zoomFactor = 100;
  // $scope.zoomFactor = 101 * document.documentElement.clientWidth / $scope.preferredPageWidth;

  // var w = angular.element($window);
  // w.bind('resize', function () {
  //   $scope.box0Width = document.getElementById('rk-box-0').offsetWidth;
  //   $scope.zoomFactor = 91 * $scope.box0Width / $scope.preferredPageWidth;
  //   $log.debug('new zoomFactor: ' + $scope.zoomFactor);
  // });


// ///////////////////////////////////////////////////////////////////////////
// UX variables //////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////

    $scope.rkState = {

      "signatureModalOpen": false,
      "initialsModalOpen": false,
      "declineModalOpen": false,
      "disclosuresModalOpen": false,
      "loadingModalOpen": true,
      "trayOpen": false,
      "userAuthentic": false,
      "passwordModalOpen": true,
      "showDev": false,
      "formComplete":  false,
      "reminderModalOpen": false,
      "termsOfUseModalOpen": false,
      "preferredSigUrl": '',
      "preferredInitialsUrl": '',
      "signaturePreference": "type",
      "initialsPreference": "type",
      "documentDeclined": false,
      "bypassSignatureModal": false,
      "bypassInitialsModal": false,
      "blankAlert": false,
      "longerInitials": false,
      "longerSignature": false,
      "assignedFont": 'Playfair Display',
      "currentMark": {}

    };

  $scope.date = new Date();






// //////////////////////////////////////////////////////////////////////////
// PASSWORD /////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////

  // $scope.validatePassword = function (item) {
  //   if ( item == master.document.password ) {
  //     rkState.userAuthentic = true
  //   }
  // };



// /////////////////////////////////////////////////////////
// MOBILE NAVBAR ///////////////////////////////////////////
// /////////////////////////////////////////////////////////

  $scope.isCollapsed = true;
  $scope.mobileFontSize = 8;
  $scope.navMenu = [

  ];

// ///////////////////////////////////////////////////////////////////////////
// GET CANVAS URL LENGTH ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////

  $scope.getDataUrlLength = function() {
    $interval($scope.getIt, 100);
  };

  $scope.endGetDataUrlLength = function() {
    $interval.cancel($scope.getIt);
  };

  $scope.getIt = function (param) {
    $scope.rkState.currentMark = param;
    // $log.debug('THINGS ARE HAPPENING');
  };

// ///////////////////////////////////////////////////////////////////////////
// SET FIELD DATA TO EMPTY STRING ////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////

  $scope.setFieldData = function () {
    for (var i = 0; i < $scope.master.participantFields.length; i++) {
      $scope.master.participantFields[i].data = '';
    }
  };

// ///////////////////////////////////////////////////////////////////////////
// SET FIELD UNIQUE IDs //////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////

  $scope.setFieldIds = function () {
    for (var i = 0; i < $scope.master.participantFields.length; i++) {
      $scope.master.participantFields[i].id = i + 1;
    }
  };

// ///////////////////////////////////////////////////////////////////////////
// SET PAGE NUMBERS //////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////

  $scope.setPageIds = function () {
    for (var i = 0; i < $scope.master.pages.length; i++) {
      $scope.master.pages[i].id = i + 1;
    }
  };

// ///////////////////////////////////////////////////////////////////////////
// ASSIGN BORDER COLOR ///////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////


  $scope.assignBorderColor = function () {
    for (var i = 0; i < $scope.master.participantFields.length; i++) {
      if (!$scope.master.participantFields[i].required) {
        $scope.master.participantFields[i].borderColor = "#f6c56b";
      }
      if ($scope.master.participantFields[i].required) {
        $scope.master.participantFields[i].borderColor = "red";
      }
    }
  };


// ///////////////////////////////////////////////////////////////////////////
// INITIALZIE CANVAS DATA AND ASSIGNED FONT
// ///////////////////////////////////////////////////////////////////////////

  $scope.initializeCanvasDataAndAssignedFont = function () {
    for (var i = 0; i < $scope.master.participantFields.length; i++) {
      if ($scope.master.participantFields[i].type == 'SIGNATURE') {
        $scope.master.participantFields[i].canvasData = "";
        $scope.master.participantFields[i].assignedFont = $scope.rkState.assignedFont;
      }
      if ($scope.master.participantFields[i].type == 'INITIALS') {
        $scope.master.participantFields[i].canvasData = "";
        $scope.master.participantFields[i].assignedFont = $scope.rkState.assignedFont;
      }
    }
  };

// ///////////////////////////////////////////////////////////////////////////
// ASSIGN PARTICIPANT FONT ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////

  $scope.assignParticipantFont = function () {
    if ($scope.master.participant.order % 4 == 0) {
      $scope.rkState.assignedFont = 'Great Vibes';
      $log.debug('the assignedFont is Great Vibes: ' + $scope.rkState.assignedFont);
    }
    if ($scope.master.participant.order % 4 == 1) {
      $scope.rkState.assignedFont = 'Kaushan Script';
      $log.debug('the assignedFont is Kaushan Script: ' + $scope.rkState.assignedFont);
    }
    if ($scope.master.participant.order % 4 == 2) {
      $scope.rkState.assignedFont = 'Pacifico';
      $log.debug('the assignedFont is Pacifico: ' + $scope.rkState.assignedFont);
    }
    if ($scope.master.participant.order % 4 == 3) {
      $scope.rkState.assignedFont = 'Playfair Display';
      $log.debug('the assignedFont is Playfair Display: ' + $scope.rkState.assignedFont);
    }
  };


// ///////////////////////////////////////////////////////////////////////////
// CONVERT FIELD WIDTH AND HEIGHT FROM PERCENTAGE OF PAGE SIZE TO PIXELS /////
// ///////////////////////////////////////////////////////////////////////////

  // $scope.convertFieldSize = function () {
  //   for (var i = 0; i < $scope.master.participantFields.length; i++) {
  //     // find current page number
  //     $scope.currentPageNumber = $scope.master.participantFields[i].pageNumber;
  //     // find the page width and height of current page
  //     $scope.currentPageWidth = $scope.master.pages[$scope.currentPageNumber - 1].pageWidth;
  //     $scope.currentPageHeight = $scope.master.pages[$scope.currentPageNumber - 1].pageHeight;
  //     // convert from percentage of page width and height to pixels from left and top
  //     $scope.master.participantFields[i].width = $scope.master.participantFields[i].width * $scope.currentPageWidth / 100;
  //     $scope.master.participantFields[i].height = $scope.master.participantFields[i].height * $scope.currentPageHeight / 100;
  //   }
  // };

  $scope.convertFieldSize = function () {
    for (var i = 0; i < $scope.master.participantFields.length; i++) {
      $scope.master.participantFields[i].width = 180;
      $scope.master.participantFields[i].height = 20;
    }
  };


// ///////////////////////////////////////////////////////////////////////////
// DETECT APPROVAL UX ////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////

  $scope.detectApprovalDoc = function() {
    $scope.allFields = $scope.master.participantFields;
    $scope.completeSignatureFields = $scope.allFields.filter(function(item) {
      return (item.type === "SIGNATURE");
    });
    // console.log('NUMBER of SIGNATURE FIELDS: ' + $scope.completeSignatureFields.length);
    if ($scope.completeSignatureFields.length === 0) {
      $scope.master.approvalDoc = true;
    }
  };


// ///////////////////////////////////////////////////////////////////////////
// FIELD SERVICES ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

  // $scope.alertFocus = function (param) {
  //   var elem = $document.find(param);
  //   // var elem = document.getElementById(param);
  //   elem.style = "border-color:red";
  // }

  // $scope.alertFocus = function () {
  //   if (master.participant.name == '') {
  //     // var elem = $document.find('C');
  //     var elem = document.getElementById('C');
  //     elem.style = "border-color:red";
  //   }
  // };

  $scope.getFieldStatusLite = function() {
    $scope.allFields = $scope.master.participantFields;
    // $log.debug('getFieldStatusLite $scope.allFields:' + $scope.allFields);
    $scope.incompleteFields = $scope.allFields.filter(function(item) {
      return item.complete === false;
    });
    $scope.reqRem = $scope.incompleteFields.filter(function(item) {
      return item.required === true;
    });

  };

  $scope.getContinuousFieldStatus = function() {
    $interval($scope.getFieldStatus, 100);
    // $log.debug('STATUSES ARE HAPPENING');
  };

  $scope.getFieldStatus = function() {
    $scope.allFields = $scope.master.participantFields;
    // $log.debug('$scope.allFields:' + $scope.allFields);
    $scope.incompleteFields = $scope.allFields.filter(function(item) {
      return item.complete === false;
    });
    $scope.reqRem = $scope.incompleteFields.filter(function(item) {
      return item.required === true;
    });
    $scope.reqRemSig = $scope.reqRem.filter(function(item) {
      return item.type == 'SIGNATURE';
    });
    $scope.reqRemInitials = $scope.incompleteFields.filter(function(item) {
      return item.type == 'INITIALS';
    });
    $scope.reqRemText = $scope.incompleteFields.filter(function(item) {
      return item.type == 'TEXT';
    });
    $scope.reqRemCheckbox = $scope.incompleteFields.filter(function(item) {
      return item.type == 'CHECKBOX';
    });



    $scope.completeSignatureFields = $scope.allFields.filter(function(item) {
      return (item.complete === true) && (item.type === "SIGNATURE");
    });
    // console.log('NUMBER of COMPLETED SIGNATURES: ' + $scope.completeSignatureFields.length);


    if ($scope.completeSignatureFields.length > 0) {
      $scope.rkState.bypassSignatureModal = true;
    }
    if ($scope.completeSignatureFields.length == 0) {
      $scope.rkState.bypassSignatureModal = false;
    }
    // console.log('$scope.rkState.bypassSignatureModal is ' + $scope.rkState.bypassSignatureModal);



    $scope.completeInitialsFields = $scope.allFields.filter(function(item) {
      return (item.complete === true) && (item.type === "INITIALS");
    });
    // console.log('NUMBER of COMPLETED INITIALS: ' + $scope.completeInitialsFields.length);


    if ($scope.completeInitialsFields.length > 0) {
      $scope.rkState.bypassInitialsModal = true;
    }
    if ($scope.completeInitialsFields.length == 0) {
      $scope.rkState.bypassInitialsModal = false;
    }
    // $log.debug('$scope.rkState.bypassInitialsModal is ' + $scope.rkState.bypassInitialsModal);
  };





  $scope.updateChosenDrawnSignature = function(item) {
    if ($scope.rkState.preferredSigUrl.length < 4000) {
      $scope.rkState.bypassSignatureModal = false;
      $scope.rkState.longerSignature = true;
      $scope.rkState.alertFocus('D');
    }
    if ($scope.rkState.preferredSigUrl.length > 3999) {
      if ($scope.master.participant.name == '') {
        $scope.rkState.blankAlert = true;
        $scope.rkState.alertFocus('C');
      }
    }
    if (($scope.rkState.preferredSigUrl.length > 3999) && ($scope.master.participant.name != '')) {
      $scope.master.participantFields[item - 1].canvasData = $scope.rkState.preferredSigUrl;
      $scope.master.participantFields[item - 1].complete = true;
      $scope.rkState.signaturePreference = 'draw';
      $scope.rkState.signatureModalOpen = false;
      $scope.getFieldStatus();
    }
  };

  $scope.updateChosenTypedSignature = function(item) {
    if ($scope.master.participant.name.length > 0) {
      $scope.master.participantFields[item - 1].data = $scope.master.participant.name;
      $scope.master.participantFields[item - 1].complete = true;
      $scope.rkState.preference = 'type';
      $scope.rkState.signatureModalOpen = false;
      $scope.getFieldStatus();
    }
    // if ($scope.master.participant.name.length == 0) {
    //   $scope.rkState.blankAlert = true;
    //   $scope.rkState.alertFocus('C');
    // }
  };

  $scope.updateChosenDrawnInitials = function(item) {
    if ($scope.rkState.preferredInitialsUrl.length < 3200) {
      $scope.rkState.bypassInitialsModal = false;
      $scope.rkState.longerInitials = true;
      $scope.alertFocus('B');
    }
    if ($scope.rkState.preferredInitialsUrl.length > 3199) {
      if ($scope.master.typedInitials == '') {
        $scope.rkState.blankAlert = true;
        $scope.alertFocus('A');
      }
    }
    if (($scope.rkState.preferredInitialsUrl.length > 3199) && ($scope.master.typedInitials != '')) {
      $scope.master.participantFields[item - 1].canvasData = $scope.rkState.preferredInitialsUrl;
      $scope.master.participantFields[item - 1].complete = true;
      $scope.rkState.initialsPreference = 'draw';
      $scope.rkState.initialsModalOpen = false;
      $scope.getFieldStatus();
    }
  };

  $scope.updateChosenTypedInitials = function(item) {
    if ($scope.master.typedInitials.length > 0) {
      $scope.master.participantFields[item - 1].data = $scope.master.typedInitials;
      $scope.master.participantFields[item - 1].complete = true;
      $scope.rkState.preference = 'type';
      $scope.rkState.initialsModalOpen = false;
      $scope.getFieldStatus();
    }
    // if ($scope.master.typedInitials.length == 0) {
    //   $scope.rkState.blankAlert = true;
    //   $scope.alertFocus('A');
    // }
  };

  $scope.unapply = function (param) {
    $scope.master.participantFields[param].data = '';
    $scope.master.participantFields[param].canvasData = '';
    $scope.master.participantFields[param].complete = false;
    $scope.getFieldStatus();
  };






// ///////////////////////////////////////////////////////////////////////
// MOCK GET REQUEST //////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

var mockResponse = {

  "logo": "https://s3.amazonaws.com/agency_logos/10008.png",
  // "usePassword": "Yes", TBA
  "name": "TEST DOCUMENT",
  "senderName": "Robbi",
  "participant":

    {
      "email":"charlestonheartstrings@gmail.com",
      "agreeToEsign": false,
      "order": 0
      // "name": ""
      // Full name of current participant will be set to "" by the UI and then collected in the form
    },



  "pages":

    [
      {
          "number": 0,
          "width": "840",
          "height": "1087",
          "url": "//s3.amazonaws.com/turbosign-images/sample-page-one",
          "landscape": "0"
      },

      {
          "number": 1,
          "width": "840",
          "height": "1087",
          "url": "//s3.amazonaws.com/turbosign-images/sample-page-two",
          "landscape": "0"
      },

      {
          "number": 2,
          "width": "840",
          "height": "1087",
          "url": "https://s3.amazonaws.com/turbosign-images/sample-page-three",
          "landscape": "0"
      }

    ],

  "participantFields":

    [

          {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 9,
          "type": "FULLNAME",
          "width": 5,
          "height": 2,
          "x": 11.5,
          "y": 84,
          "required":true,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 0,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 5,
          "type": "SIGNATURE",
          "width": 10,
          "height": .5,
          "x": 41,
          "y": 83,
          "required":true,
          // initialized by the UI to be empty
          // "data": "",
          // "canvasData": "",
          // "assignedFont": "",
          "pageNumber": 0,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 1,
          "type": "DATE",
          "width": 90,
          "height": 2,
          "x": 71,
          "y": 84,
          "required":true,
          // initialized by the UI to be empty
          // "data": "",
          // "canvasData": "",
          // "assignedFont": "",
          "pageNumber": 0,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 5,
          "type": "SIGNATURE",
          "width": 10,
          "height": .5,
          "x": 42,
          "y": 27,
          "required":true,
          // initialized by the UI to be empty
          // "data": "",
          // "canvasData": "",
          // "assignedFont": "",
          "pageNumber": 1,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 5,
          "type": "SIGNATURE",
          "width": 10,
          "height": .5,
          "x": 42,
          "y": 30.6,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          // "canvasData": "",
          // "assignedFont": "",
          "pageNumber": 1,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 6,
          "type": "INITIALS",
          "width": 10,
          "height": 5,
          "x": 42,
          "y": 37.6,
          "required":true,
          // initialized by the UI to be empty
          // "data": "",
          // "canvasData": "",
          // "assignedFont": "",
          "pageNumber": 1,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 6,
          "type": "INITIALS",
          "width": 10,
          "height": 5,
          "x": 42,
          "y": 41.2,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          // "canvasData": "",
          // "assignedFont": "",
          "pageNumber": 1,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 2,
          "type": "TEXT",
          "width": 90,
          "height": 2,
          "x": 42,
          "y": 49.5,
          "required":true,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 1,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 2,
          "type": "TEXT",
          "width": 90,
          "height": 2,
          "x": 42,
          "y": 53,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 1,
          "complete": false
      },

      {
        // initialized by the UI beginning with 1 instead of zero
        // "id": 3,
          "type": "CHECKBOX",
          "width": 5,
          "height": 2,
          "x": 42,
          "y": 60,
          "required":true,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 1,
          "complete": false
      },

      {
        // initialized by the UI beginning with 1 instead of zero
        // "id": 3,
          "type": "CHECKBOX",
          "width": 5,
          "height": 2,
          "x": 42,
          "y": 63.5,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 1,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 1,
          "type": "DATE",
          "width": 90,
          "height": 2,
          "x": 45,
          "y": 86,
          "required":true,
          // initialized by the UI to be empty
          // "data": "",
          // "canvasData": "",
          // "assignedFont": "",
          "pageNumber": 1,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 9,
          "type": "FULLNAME",
          "width": 5,
          "height": 2,
          "x": 57,
          "y": 89.5,
          "required":true,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 1,
          "complete": false
      },

      {
        // initialized by the UI beginning with 1 instead of zero
        // "id": 3,
          "type": "CHECKBOX",
          "width": 5,
          "height": 2,
          "x": 10,
          "y": 16,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      },

      {
        // initialized by the UI beginning with 1 instead of zero
        // "id": 3,
          "type": "CHECKBOX",
          "width": 5,
          "height": 2,
          "x": 10,
          "y": 19.3,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      },

      {
        // initialized by the UI beginning with 1 instead of zero
        // "id": 3,
          "type": "CHECKBOX",
          "width": 5,
          "height": 2,
          "x": 10,
          "y": 23,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      },

      {
        // initialized by the UI beginning with 1 instead of zero
        // "id": 3,
          "type": "CHECKBOX",
          "width": 5,
          "height": 2,
          "x": 10,
          "y": 26.5,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      },

      {
        // initialized by the UI beginning with 1 instead of zero
        // "id": 3,
          "type": "CHECKBOX",
          "width": 5,
          "height": 2,
          "x": 10,
          "y": 29.8,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      },

      {
        // initialized by the UI beginning with 1 instead of zero
        // "id": 3,
          "type": "CHECKBOX",
          "width": 5,
          "height": 2,
          "x": 10,
          "y": 33.5,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      },

      {
        // initialized by the UI beginning with 1 instead of zero
        // "id": 3,
          "type": "CHECKBOX",
          "width": 5,
          "height": 2,
          "x": 10,
          "y": 37,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 2,
          "type": "TEXT",
          "width": 90,
          "height": 2,
          "x": 20,
          "y": 66,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 2,
          "type": "TEXT",
          "width": 90,
          "height": 2,
          "x": 20,
          "y": 70,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      },

      {
          // initialized by the UI beginning with 1 instead of zero
          // "id": 2,
          "type": "TEXT",
          "width": 90,
          "height": 2,
          "x": 20,
          "y": 74,
          "required":false,
          // initialized by the UI to be empty
          // "data": "",
          "pageNumber": 2,
          "complete": false
      }

    ]
}


  $scope.getMockDocumentData = function() {

    $scope.master = mockResponse;
    $scope.rkState.loadingModalOpen = false;
    $scope.assignBorderColor ();
    $scope.convertFieldSize ();
    $scope.master.participant.name = '';
    $scope.setFieldData ();
    $scope.master.approvalDoc = false;
    $scope.detectApprovalUX ();
    $scope.setFieldIds ();
  };


// ////////////////////////////////////////////////////////////////////////////////
// GET DOCUMENT DATA //////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////


  $scope.master = {};

  $scope.getDocumentData = function() {

    $log.debug('GETTING DATA for: ' + $scope.partHash);

    if ($scope.partHash == 'ui-test') {
      $log.debug('GETTING MOCK DATA ...');
      $scope.master = mockResponse;
      $scope.master.participant.name = '';
      $scope.setFieldData ();
      $scope.setFieldIds ();
      $scope.assignBorderColor ();
      $scope.assignParticipantFont ();
      $scope.convertFieldSize ();
      $scope.master.approvalDoc = false;
      $scope.detectApprovalDoc ();
      $scope.master.typedInitials = '';
      $scope.initializeCanvasDataAndAssignedFont ();
      $scope.getFieldStatus();
      $scope.rkState.loadingModalOpen = false;
    }

    };

  $scope.document = 'HAPPY DAYS';
  // decide what to send back and build a new document object from $scope.master....
  $scope.updateDocumentData = function() {

    $scope.document = $scope.master;

    $log.debug('TESTING UPDATE DOCUMENT DATA BUTTON ...');
    $log.debug('The new document Object looks like this: ' + $scope.document);


      if ($scope.rkState.formComplete === false) {
        $log.debug('FORM IS NOT YET COMPLETE');
      }

    };

}
