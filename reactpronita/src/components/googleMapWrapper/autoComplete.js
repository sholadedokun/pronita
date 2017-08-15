import React, {Component} from 'react';
import {fetchRestaurants, getLongLat, failedToConnect} from '../../actions';
import {connect} from 'react-redux'
class autocomplete extends(Component){
    shouldComponentUpdate(){
        return false
    }
    componentDidMount(){
        var self=this;
        var placeSearch, autocomplete;
        try{
            autocomplete = new window.google.maps.places.Autocomplete(
                this.refs.searchBar,
                {types: ['geocode']}
            );
            autocomplete.addListener('place_changed', fillInAddress);

            function fillInAddress() {
                // Get the place details from the autocomplete object.
                var place = autocomplete.getPlace();
                const position = {latitude:place.geometry.location.lat(), longitude:place.geometry.location.lng()}
                const longPos= {coords:{latitude:position.latitude, longitude:position.longitude }}
                self.props.getLongLat('auto', longPos);
                self.props.fetchRestaurants(position)
            }
        }
        catch(e){
            this.props.getLongLat()
        }

    }
    render(){

        return(
            <input type="text" placeholder="Type Location" ref="searchBar" />
        )


    }
}
export default connect(null, {fetchRestaurants, getLongLat, failedToConnect})(autocomplete);
