/**
 * Created by thotar on 1/13/2017.
 */

var app = angular
        .module('Gal', ['thatisuday.ng-image-gallery'])
        .controller('main', function($scope, $timeout, $interval){
            /*  $scope.counter = 5;
             var counterIntvl = $interval(function(){
             $scope.counter = $scope.counter - 1;
             if($scope.counter == 0){
             $interval.cancel(counterIntvl);
             }
             }, 1000);
             */
            $scope.images = [
                {
                    title : 'My first image',
                    alt : 'photo1',
                    url : '../demo/demo-images/1.jpg',

                },
                {
                    title : 'Second image',
                    alt : 'photo2',
                    url : '../demo/demo-images/2.jpg',

                },
                {
                    title : 'Third image',
                    alt : 'photo3',
                    url : '../demo/demo-images/3.jpg',
                },
                {
                    title : 'Fourth image',
                    alt : 'photo4',
                    url : '../demo/demo-images/4.jpg',
                },
                {
                    title : 'Fifth image',
                    alt : 'photo5',
                    url : '../demo/demo-images/5.jpg',
                },
                {
                    title : 'Seventh image',
                    alt : 'photo7',
                    url : '../demo/demo-images/7.jpg',
                },
                {
                    title : 'Eighth image',
                    alt : 'photo8',
                    url : '../demo/demo-images/8.jpg',
                },
                {
                    title : 'Ninth image',
                    alt : 'photo9',
                    url : '../demo/demo-images/9.jpg',
                },
                {
                    title : 'Tenth image',
                    alt : 'photo101',
                    url : '../demo/demo-images/10.jpg',
                }

            ];

            /*  $scope.moreImages = [
             {
             url : '../demo/demo-images/10.jpg',
             thumbUrl : '../demo/demo-images/thumbs/10.jpg',
             bubbleUrl : '../demo/demo-images/bubbles/10.jpg',
             },
             {
             url : '../demo/demo-images/11.jpg',
             thumbUrl : '../demo/demo-images/thumbs/11.jpg',
             bubbleUrl : '../demo/demo-images/bubbles/11.jpg',
             extUrl : 'http://google.com/image/11'
             },
             {
             title : 'My twelth image',
             alt : 'photo12',
             url : '../demo/demo-images/12.jpg',
             thumbUrl : '../demo/demo-images/thumbs/12.jpg',
             bubbleUrl : '../demo/demo-images/bubbles/12.jpg',
             },
             {
             url : '../demo/demo-images/13.jpg',
             thumbUrl : '../demo/demo-images/thumbs/13.jpg',
             bubbleUrl : '../demo/demo-images/bubbles/13.jpg'
             }
             ];
             */
            // $scope.conf = {
            //     imgAnim : 'fadeup'
            //  };

            /*****************************************************/

            // $timeout(function(){
            //  $scope.images = $scope.images.concat($scope.moreImages);
            // }, 5000);

            $scope.addPhoto = function(){
                var n = Math.floor(Math.random() * 13) + 1;
                $scope.images.push(
                    {
                        url : '../demo/demo-images/' + n + '.jpg',
                        thumbUrl : '../demo/demo-images/thumbs/' + n + '.jpg',
                        bubbleUrl : '../demo/demo-images/bubbles/' + n + '.jpg'
                    }
                );
            }

            $scope.removePhoto = function(){
                if($scope.images.length > 1) $scope.images.pop();
            }

            // Background close
            $scope.bgClose = false;
            $scope.closeOnBackground = function(){
                $scope.bgClose = !$scope.bgClose;
            }

            // Gallery methods gateway
            $scope.methods = {};
            $scope.openGallery = function(){
                $scope.methods.open();
            };

            // Gallery callbacks
            $scope.opened = function(){
                console.info('Gallery opened!');
            }

            $scope.closed = function(){
                console.warn('Gallery closed!');
            }
        })
    ;