import axios from 'axios';
import * as userActions from './userActions'
import _ from 'lodash';
// import { browserHistory } from 'react-router';
import {
  FETCH_CITYNAME_ERROR,
  FETCH_AUTOCOMPLETE,
  FETCH_AUTOCOMPLETE_ERROR,
  FETCH_POSITION,
  FETCH_POSITION_ERROR,
  FETCH_RESTAURANT,
  FETCH_RESTAURANT_DETAILS,
  FETCH_RESTAURANT_ERROR,
  FAIL_TO_CONNECT

} from './actionTypes';

const ROOT_URL = 'https://maps.googleapis.com/maps/api/';
const SUB_URL_CITYNAME = `${ROOT_URL}geocode/json`
const SUB_URL_AUTOCOMPLETE = `${ROOT_URL}place/autocomplete/json`
const API_KEY = 'AIzaSyCvs8x7JdUhluxqW70x858O7Y5paUpIqN4'
const google= window.google;
let map;
let service;
let prevRestautants=[];
let prevLocation=''
export function getLongLat(fromAutoFill, fillPosition){
    return function(dispatch) {
        if(!fromAutoFill){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition( setPosition, setPositionError);
            }
            else{
                dispatch({
                    type: FETCH_POSITION_ERROR,
                    payload: 'Geolocation not supported'
                })
            }
        }
        else{
            setPosition(fillPosition)
        }
        function setPosition(position, error){

            dispatch({
                type: FETCH_POSITION,
                payload: {latitude:position.coords.latitude, longitude:position.coords.longitude}
            })
        }
        function setPositionError(){
            if(google){
                dispatch({
                    type: FETCH_POSITION_ERROR,
                    payload: 'Unable to get your Position'
                })
            }
            else{
                dispatch({
                    type: FAIL_TO_CONNECT,
                    payload: 'Seems Internet is down... reconnect and try again'
                })
            }

        }

    }
}

export function citynameAutoComplete(input){


}
function createMapService(latitude, longitude, callback){
    try{
        var mylocation = new google.maps.LatLng(latitude, longitude);
        map = new google.maps.Map(document.getElementById('map'), {
            center: mylocation,
            zoom: 15
        });
        service = new google.maps.places.PlacesService(map);
        callback(null, {service, mylocation} )
    }
    catch(e){
        callback('Error connecting to the Internet... please check your connection', null)
    }
}
export function loadMore(allRestaurants, pagination){
    return function(dispatch) {
        pagination.nextPage(function(data){
            console.log(data)
            dispatch({
                type: 'FETCH_MORE_RESTAURANT',
                payload: [...allRestaurants, ...data]
            })

        })
    }
}
export function fetchRestaurants(position){

    return function(dispatch) {
        createMapService(position.latitude, position.longitude,  function(error, response){

            if(error){
                dispatch({
                    type: FETCH_RESTAURANT_ERROR,
                    payload: 'Fetching Restaurants failed Please Check your Internet Connection'
                });
            }
            else{
                var request = {
                    location: response.mylocation,
                    radius: '500',
                    type: ['restaurant']
                };
                response.service.nearbySearch(request, function(payload, status, pagination){

                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        let allRestaurants=payload;

                        if(_.isEqual(request.location, prevLocation)){
                            allRestaurants = [...prevRestautants, ...payload]
                        }
                        prevLocation= request.location;
                        // console.log(request.location)

                        if(pagination.hasNextPage){
                            prevRestautants=allRestaurants
                        }
                        dispatch({
                            type: FETCH_RESTAURANT,
                            payload: {result:allRestaurants, pagination}
                        });


                    }
                    if(status==="ZERO_RESULTS" && payload.length===0){
                        dispatch({
                            type: FETCH_RESTAURANT_ERROR,
                            payload: "Can't Find A restaurant in your area"
                        });
                    }
                });
            }
        })
    }
}

export function fetchDetails(position, restaurantId) {
    return function(dispatch){
        createMapService(position.longitude, position.latitude, function(error, response){
            if(error){
                dispatch({
                    type: FETCH_RESTAURANT_ERROR,
                    payload: 'Fetching Restaurant failed, Please Check your Internet Connection'
                });
            }
            else{
                response.service.getDetails({ placeId: restaurantId }, function(place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        dispatch({
                            type: FETCH_RESTAURANT_DETAILS,
                            payload : place
                        });
                    }
                });
            }
        })
    }
}

export function switcher(){
    return function(dispatch){
        prevRestautants =[]
        dispatch({
            type: FETCH_CITYNAME_ERROR,
            payload: 'Unable to find City'
        })
    }
}
export function failedToConnect(){
    return function(dispatch){
        dispatch({
            type: FAIL_TO_CONNECT,
            payload: 'Seems Internet is down... reconnect and try again'
        })
    }
}

 export {userActions};
