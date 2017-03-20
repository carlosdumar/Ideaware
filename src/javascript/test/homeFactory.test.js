
describe('Modulo home.services', function() {

    var homeFactory;
    var $httpBackend;

    beforeEach(function(){
        module('home.services');

        inject(function(_homeFactory_, _$httpBackend_) {
            homeFactory = _homeFactory_;
            $httpBackend = _$httpBackend_;
        });
    });

    describe('#getVideos', function() {

        it('debe devolver una lista de 10 videos', inject(function($http) {
            var $scope = {};

            var result = {};
            var response = { 
                    data: {
                        pageInfo: {
                            resultsPerPage: 10
                        }
                    } }

            $httpBackend
                .expectGET('https://www.googleapis.com/youtube/v3/search')
                .respond(400);
            
            $http.get('https://www.googleapis.com/youtube/v3/search')
                .then(function(response) {
                    $scope.carlos = response;
                })
                .catch(function(data, status){
                    $scope.carlos = status
                })

            expect($httpBackend.flush).toThrow();
           //expect(10).to.equal(10);
          /*var returnedPromise = homeFactory.getVideos();

          returnedPromise.then(function(response) {
              result = response;
          })

          
          expect(result).to.equal(response)
          //$httpBackend.flush();
          $httpBackend.flush();
          */

        }));
    });
    
});
//http://tylerfrankenstein.com/code/angular-service-unit-test
//https://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit/
//http://plnkr.co/edit/gist:d60fd17f0b9989fc071d?p=preview