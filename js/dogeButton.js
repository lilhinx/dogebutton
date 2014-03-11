var dogeButton = angular.module( 'dogeButtonApp', [ ] );
dogeButton.controller( "DogeIndexController", function( $scope, $compile, $log, $rootScope )
{	
	$scope.username = '';
	$scope.createWidgetCode = function( )
	{
		var btn = angular.element( document.createElement( 'doge-embed' ) );
		btn.attr( 'username', $scope.username );
	    $scope.widgetCode = $compile( btn )( $scope )[ 0 ];
	};
	
	$scope.$watch( "username", function( )
	{
		$scope.createWidgetCode( );
	} );
	
} );

dogeButton.controller( "DogeButtonController", function( $scope, $compile, $log, $rootScope, $window, $timeout )
{
	$scope.dogeImage = "images/dogebutton_99.png";
	$scope.dogeImageGlasses = "images/dogebutton_glasses_99.png";
	$scope.buttonImage = $scope.dogeImage;
	
	$scope.dogeClick = function( )
	{
		$scope.buttonImage = $scope.dogeImageGlasses;
		$timeout( $scope.openTwitterIntent, 10 );
	};
	
	$scope.openTwitterIntent = function( )
	{
		var username = $scope.getParameterByName( "username" );
		var text = "@tipdoge tip " + username + " 10 DOGE w/ #dogebutton";
		var encoded = encodeURIComponent( text );
		var url = "https://twitter.com/intent/tweet?text="+encoded;
		var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes';
		var width = 550;
		var height = 420;
		$window.open( url, 'intent', windowOptions + ',width=' + width +',height=' + height );
	}
	
	$scope.getParameterByName = function( name )
	{
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
	
	$scope.infoButton = function( )
	{
		$window.parent.location.href = 'http://dogebutton.biz';
	};
	
} );

dogeButton.controller( "DogeEmdedController", function( $scope, $compile, $log, $rootScope, $window )
{
	$scope.formUrl = function( )
	{
		$scope.url = "http://"+ $window.location.host + "/button.html?username="+ $scope.username;
	};
	
	$scope.$watch( "username", function( )
	{
		$scope.formUrl( );
	} );
	
	$scope.formUrl( );
	
} );

dogeButton.directive( "dogeButton", function( )
{
	return {
		restrict:'E',
		scope:{ texts:'=' },
		controller:"DogeButtonController",
		templateUrl:'doge-button.html'
	};
} );

dogeButton.directive( "dogeEmbed", function( )
{
	return {
		restrict:'E',
		scope:true,
		controller:"DogeEmdedController",
		templateUrl:'doge-embed.html'
	};
} );


dogeButton.directive( 'atPrefix', function( )
{
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function( scope, element, attrs, controller )
		{
			function hasNoPrefix( value )
			{
				return value && !/^\@/.test( value ) && "@".indexOf( value ) === -1;
			}
			
			function ensureAtPrefix( value )
			{
				// Need to add prefix if we don't have http:// prefix already AND we don't have part of it
				if( hasNoPrefix( value ) )
				{
					controller.$setViewValue( '@' + value );
					controller.$render( );
					return '@' + value;
				}
				return value;
			}
			
			controller.$formatters.splice( 0, 0, ensureAtPrefix );
			controller.$parsers.splice( 0, 0, ensureAtPrefix );
		}
	};
});

