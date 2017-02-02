var myApp = angular.module('eCartApp',['ngRoute','ngMaterial','ngSanitize','angularModalService']);

//Removes the hash from the URL
myApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

myApp.controller('homeController', ['$rootScope','$scope','$q', function ($rootScope, $scope,$q) {
    $rootScope.totalamount = 0;
    $rootScope.adPosts = new Array();
    $scope.urlMap = {buy:'pages/portal/buy.html',sell:'pages/portal/sell.html',account:'pages/portal/account.html'};
    $scope.currentNavItem = 'buy';
    $scope.goto = function (path) {
        window.location.hash = '#/'+path;
    }

    $rootScope.searchedText = '';
}]);

myApp.controller('buyController', ['$rootScope','$scope', function ($rootScope, $scope) {
    $scope.images = [{
        title:'Lenovo Vibe K5',
        src:'img/lenovo_vibe_k5.jpeg',
        price:'200',
        desc:'<ul><li>lorem ipsum dorem 1</li><li>lorem ipsum dorem 2</li><li>lorem ipsum dorem 3</li><li>lorem ipsum dorem 4</li></ul>'
    },{
        title:'Moto G 4',
        src:'img/moto_g4_plus.jpeg',
        price:'202',
        desc:'<ul><li>lorem ipsum dorem 1</li><li>lorem ipsum dorem 2</li><li>lorem ipsum dorem 3</li><li>lorem ipsum dorem 4</li></ul>'
    },{
        title:'Moto Z Play',
        src:'img/moto_z.jpeg',
        price:'300',
        desc:'<ul><li>lorem ipsum dorem 1</li><li>lorem ipsum dorem 2</li><li>lorem ipsum dorem 3</li><li>lorem ipsum dorem 4</li></ul>'
    },{
        title:'iPhone 6',
        src:'img/apple-iphone-6-1.jpg',
        price:'449',
        desc:'<ul><li>lorem ipsum dorem 1</li><li>lorem ipsum dorem 2</li><li>lorem ipsum dorem 3</li><li>lorem ipsum dorem 4</li></ul>'
    },{
        title:'iPhone 7',
        src:'img/apple-iphone-7-1.jpg',
        price:'889',
        desc:'<ul><li>lorem ipsum dorem 1</li><li>lorem ipsum dorem 2</li><li>lorem ipsum dorem 3</li><li>lorem ipsum dorem 4</li></ul>'
    },{
        title:'iPhone 7S',
        src:'img/apple-iphone-7-1.jpg',
        price:'959',
        desc:'<ul><li>lorem ipsum dorem 1</li><li>lorem ipsum dorem 2</li><li>lorem ipsum dorem 3</li><li>lorem ipsum dorem 4</li></ul>'
    },{
        title:'Google Pixel',
        src:'img/google-pixel-02.jpg',
        price:'659',
        desc:'<ul><li>lorem ipsum dorem 1</li><li>lorem ipsum dorem 2</li><li>lorem ipsum dorem 3</li><li>lorem ipsum dorem 4</li></ul>'
    },{
        title:'Google Pixel XL',
        src:'img/google-pixel-xl-2.jpg',
        price:'749',
        desc:'<ul><li>lorem ipsum dorem 1</li><li>lorem ipsum dorem 2</li><li>lorem ipsum dorem 3</li><li>lorem ipsum dorem 4</li></ul>'
    }];

    $scope.addToCart = function (index) {
        $rootScope.itemSelected = $scope.images[index];
        window.location.hash = '#/addToCart';
    }

    $scope.checkout = function () {
        $rootScope.totalamount += Number($scope.itemSelected.price);
        window.location.hash = '#/address';
    }

    $scope.proceedToPay = function () {
        window.location.hash = '#/payment';
    }
}]);

myApp.controller('sellController', ['$rootScope','$scope', function ($rootScope, $scope) {
    $scope.sellItem = {
        phone: '+31 '
    };
    $scope.submit = function () {
        $rootScope.adPosts.push($scope.sellItem);
        window.alert('The post has been submitted.');
        $scope.sellItem = {
            phone: '+31 '
        };
    };
}]);

myApp.controller('accountController', ['$rootScope','$scope', function ($rootScope, $scope) {

}]);

myApp.controller('paymentController', ['$rootScope','$scope', function ($rootScope, $scope) {
    $scope.payment = {};
    $scope.creditcardTypes = ['Mastercard', 'Maestro', 'Visa'];
    $scope.months = ['01', '02', '03','04', '05', '06', '07','08', '09', '10', '11', '12'];
    $scope.years = [];
    for(var i = 2016; i < 2030; i++) {
        $scope.years.push(i.toString());
    }
    $scope.pay = function () {
        $rootScope.itemSelected.payment = $scope.payment;
        window.location.hash = '#/confirmation';
    }
}]);
myApp.config(function ($routeProvider) {
    $routeProvider
    .when('/buy', {
        templateUrl: 'pages/portal/buy.html',
        controller: 'buyController'
    })
    .when('/sell', {
        templateUrl: 'pages/portal/sell.html',
        controller: 'sellController'
    })
    .when('/account', {
        templateUrl: 'pages/portal/account.html',
        controller: 'accountController'
    })
    .when('/addToCart', {
        templateUrl: 'pages/portal/addToCart.html',
        controller: 'buyController'
    })
    .when('/address', {
        templateUrl: 'pages/portal/deliveryAddress.html',
        controller: 'buyController'
    })
    .when('/payment', {
        templateUrl: 'pages/portal/payment.html',
        controller: 'paymentController'
    })
    .when('/confirmation', {
        templateUrl: 'pages/portal/confirmation.html'
    })
    .otherwise({redirectTo: '/buy'})
});

myApp.filter('productSearch', function ($rootScope) {
    return function(products) {
        var filteredProduct = [];
        for(var i = 0; i < products.length; i++) {
            if($rootScope.searchedText.length === 0 || products[i].title.toLowerCase().indexOf($rootScope.searchedText.toLowerCase()) === 0) {
                filteredProduct.push(products[i]);
            }
        }
        return filteredProduct;
    };
});