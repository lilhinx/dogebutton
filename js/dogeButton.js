var dogeButton = angular.module( 'dogeButtonApp', [ ] );
dogeButton.controller( "DogeController", function( $scope, $compile, $log )
{
	$scope.widgetCode = "wow";
	
	$scope.createWidgetCode = function( )
	{
		var btn = angular.element( document.createElement( 'doge-button' ) );      
	    $scope.widgetCode = $compile( btn )( $scope )[ 0 ];
		$log.info( $scope.widgetCode.innerHTML );
		
	};
	
	$scope.createWidgetCode( );
	
} );

dogeButton.directive( "dogeButton", function( )
{
	return {
		restrict:'E',
		scope:{ username:'=', texts:'=' },
		templateUrl:'/button.html'
	};
} );