var dogeButton = angular.module( 'dogeButtonApp', [ ] );
dogeButton.controller( "DogeIndexController", function( $scope, $compile, $log, $rootScope )
{	
	$scope.username = 'lilhinx';
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

dogeButton.controller( "DogeButtonController", function( $scope, $compile, $log, $rootScope )
{
	$scope.dogeImage = "/images/dogebutton_99.png";
	$scope.dogeImageGlasses = "/images/dogebutton_glasses_99.png";
	$scope.buttonImage = $scope.dogeImage;
	
	$scope.dogeClick = function( )
	{
		$scope.buttonImage = $scope.dogeImageGlasses;
	};
} );

dogeButton.controller( "DogeEmdedController", function( $scope, $compile, $log, $rootScope, $window )
{
	$scope.formUrl = function( )
	{
		$scope.url = "http://"+ $window.location.host + "/button.html?username="+$scope.username;
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
		templateUrl:'/doge-button.html'
	};
} );

dogeButton.directive( "dogeEmbed", function( )
{
	return {
		restrict:'E',
		scope:true,
		controller:"DogeEmdedController",
		templateUrl:'/doge-embed.html'
	};
} );