var dogeButton = angular.module( 'dogeButtonApp', [ ] );
dogeButton.controller( "DogeController", function( $scope, $compile, $log, $rootScope )
{	
	$scope.createWidgetCode = function( )
	{
		var btn = angular.element( document.createElement( 'doge-button' ) );
	    $scope.widgetCode = $compile( btn )( $scope )[ 0 ];
	};
	
	$rootScope.wow = "wowo";
	
	$scope.$watch( "username", function( )
	{
		$log.info( "yo" );
		$rootScope.username = $scope.username;
		$scope.createWidgetCode( );
	} );
	
} );

dogeButton.directive( "dogeButton", function( )
{
	return {
		restrict:'E',
		scope:{ texts:'=' },
		templateUrl:'/doge-button.html'
	};
} );

dogeButton.directive( "dogeEmbed", function( )
{
	return {
		restrict:'E',
		scope:{ texts:'=' },
		templateUrl:'/doge-embed.html'
	};
} );