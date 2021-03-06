 (function () {
	'use strict';
	angular
		.module('parkalot').factory('back', function($http,Backand) {

			//search backand for parking with params on distance away from destination
			function searchParking(lat,lng, dist, price)
			{
				if (typeof dist == "undefined" || dist === "")
				{
					dist = 1000;
				}
				if (typeof price == "undefined" || price === "")
				{
					price = 1000000;
				}
				else
				{
					price = parseInt(price);
				}
				return $http ({
  					method: 'GET',
  					url: 'https://api.backand.com:443/1/objects/Parking',
  					params: {
  						filter:
  						{
  							"q":{
  								"Location": {"$withinFeet" : [[lat, lng], parseInt(dist)]}, 
  								"price": {"$lt" : price}
  							}
  						},
  					}
				});

			}

			//signup for user
		 	function postData(data,token)
		 	{
				data.token = token;
		 		
		 		return $http ({
  					method: 'POST',
  					data: data,
  					url: 'https://api.backand.com:443/1/objects/user',
  					
		 		});
		 	}

		 	//login for user
		 	var login = function(data){
		 		var loginArray = [
		 		{
		 			"fieldName" : "email",
		 			"operator" : "equals",
		 			"value" : data.email,
		 		},
		 		{
		 			"fieldName" : "password",
		 			"operator" : "equals",
		 			"value" : data.password,
		 		}
		 		]

		 		return $http (
		 		{
		 			method: 'GET',
		 			data: data,
		 			url:'https://api.backand.com:443/1/objects/user',
		 			params: {
		 				filter:loginArray,
		 			}
		 		});
		 	}

		 	//get user by id in localstorage
		 	var userGet= function(data){
		 		var tokenArray = [
		 		{
		 			"fieldName" : "token", 
		 			"operator" : "equals",
		 			"value" : data,
		 		}]
		 		var single = $http({
		 			method: 'GET',
		 			url: 'https://api.backand.com:443/1/objects/user',
		 			params: {
		 				filter:tokenArray,
		 			}
		 		});
		 		return single;

		 	}
		 	//edit user information
		 	var editUser = function(data, id){
		 		
		 		var edit = $http({
		 			method: 'PUT',
		 			data:data,
		 			url: Backand.getApiUrl() + '/1/objects/user/' + id,
		 		});
		 		return edit;
		 	}
		 
		 	//save id to local storage
			 	var saveUserInfo = function(userid)
			 	{
			 		localStorage.setItem('userID',userid);
			 	}
			//get id from local storage 	
			 	var getUserInfo = function()
			 	{
			 		return localStorage.getItem('userID');
			 	}
			 //save token to local storage	
			 	var saveToken = function(token)
			 	{
			 		localStorage.setItem('token',token);
			 	}
			//get token from local storage 	
			 	var getToken = function()
			 	{
			 		return localStorage.getItem('token');
			 	}

			//function for loging out of app
			var logout = function(){
				localStorage.removeItem('userID');
				localStorage.removeItem('token');
				return true;
			} 

			//allow use outside of factory
		 	return {
		 		postData:postData,
		 		saveUserInfo:saveUserInfo,
		 		getUserInfo:getUserInfo,
		 		saveToken:saveToken,
		 		getToken:getToken,
		 		login:login,
		 		userGet:userGet,
		 		logout:logout,
		 		editUser:editUser,
		 		searchParking:searchParking,

		 	}
	});
})();

