/*
 * Run4Rights
 * Copyright (C) 2016
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
window.utils = {
  clamp: function(number, min, max) {
    return Math.min(Math.max(number, min), max)
  },

  routeDistance: function(route) {
    var distance = 0;
    for (var i = 1; i < route.length; ++i) {
      distance += utils.distance(route[i - 1], route[i]);
    }
    return distance;
  },

  scrollTo: function(hash) {
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 500, function(){
       window.location.hash = hash;
    });
  },

  toRadians: function(deg) {
    return deg * Math.PI / 180;
  },

  // Función que dadas 2 coordenadas devuelve la distancia en Km
  // Fuente: http://www.movable-type.co.uk/scripts/latlong.html
  distance: function(point1, point2) {
    var R = 6371;
    var latRad1 = utils.toRadians(point1.lat);
    var latRad2 = utils.toRadians(point2.lat);
    var difLat = utils.toRadians(point2.lat - point1.lat);
    var difLon = utils.toRadians(point2.lng - point1.lng);

    var a = Math.sin(difLat / 2) * Math.sin(difLat / 2) +
            Math.cos(latRad1) * Math.cos(latRad2) *
            Math.sin(difLon / 2) * Math.sin(difLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  },

  average: function(point1, point2, reached_distance) {
    if (reached_distance == null)
      reached_distance = utils.distance(point1, point2) / 2;

    var total_distance = utils.distance(point1, point2);
    var percentage = reached_distance / total_distance;

    return {
      lat: point1.lat + (point2.lat - point1.lat) * percentage,
      lng: point1.lng + (point2.lng - point1.lng) * percentage
    };
  }
};
