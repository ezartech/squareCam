
// Copyright (c) 2015-2016, ezAR Technologies
//
// Simulates a square camera view by creating mask that overlays
// the longest dimension of a mobile device display. The mask is 
// updated on device rotation, i.e., orientationchange events
// @author wayne@ezartech.com
// @license modified MIT 
// 
// squareCam.enable() - call to show the mask
// squareCam.disable() - call to hide the mask

var squareCam = {
   
    _initialize: function() {  
        var body = document.getElementsByTagName('body')[0];

        //add mask1 div
        var newNode = document.createElement('div');
        newNode.id = "ezarmask1";
        newNode.className = 'ezarmask';
        body.appendChild(newNode);

        //add mask2 div
        newNode = document.createElement('div');
        newNode.id = "ezarmask2";
        newNode.className = 'ezarmask';
        body.appendChild(newNode);
    },
 
    enable: function(aBool) {
        window.addEventListener("orientationchange", this._onOrientationChange.bind(squareCam), false);
        
        //make mask divs visible
        var node = document.getElementById('ezarmask1');
        node.style.display = "block";
        node = document.getElementById('ezarmask2');
        node.style.display = "block";

        this._updateMasks();
    },

    disable: function() {
        window.removeEventListener("orientationchange", this._onOrientationChange);

        //hide mask divs
        var node = document.getElementById('ezarmask1');
        node.style.display = "none";
        node = document.getElementById('ezarmask2');
        node.style.display = "none";
    },

    _onOrientationChange: function() {
        this._updateMasks();
    },

    //cache initial portrait & landscape dimensions
    //this is due to odd results on my nexus5 android 6 device
    // where the width was inconsistent after several rotations 
    // resulting in misaligned mask2
    _pwindowWidth: 0,
    _pwindowHt: 0,
    _lwindowWidth: 0,
    _lwindowHt: 0,

    _updateMasks: function() {
        setTimeout(function() {         
         var maskWidth, maskHt;               
         var orientation = screen.orientation.angle % 180 === 0 ? 'portrait' : 'landscape'

         var mask1, mask2;
         mask1 = document.getElementById('ezarmask1');
         mask2 = document.getElementById('ezarmask2');

         mask1.style.left = "0px";
         mask1.style.top = "0px";

         if (orientation == 'portrait') {
            if (!this._pwindowWidth) 
                this._pwindowWidth = window.outerWidth;
            if (!this._pwindowHt) 
                this._pwindowHt = window.outerHeight; 

            if (this._pwindowHt < this.pwindowWidth) {
                var tmp = this._pwindowWidth;
                this._pwindowWidth = this._pwindowHt;
                this._pwindowHt = tmp;
            }

            //console.log('pwidth', this._pwindowWidth, 'pheight', this._pwindowHt);

            //set mask at top & bottom of screen
            maskWidth = "100%";
            maskHt = (this._pwindowHt - this._pwindowWidth) / 2;
            
            mask1.style.width = maskWidth;
            mask1.style.height = maskHt + "px";  

            mask2.style.left = "0px";
            mask2.style.top = this._pwindowWidth + maskHt + "px";  
            mask2.style.width = maskWidth;
            mask2.style.height = maskHt + "px";

         } else { //landscape
            if (!this._lwindowWidth) 
                this._lwindowWidth = window.outerWidth;
            if (!this._lwindowHt) 
                this._lwindowHt = window.outerHeight; 

            if (this._lwindowWidth < this._lwindowHt) {
                var tmp = this._lwindowHt;
                this._lwindowHt = this._lwindowWidth;
                this._lwindowWidth = tmp;
            }
            
            //console.log('lwidth', this._lwindowWidth, 'lheight', this._lwindowHt);

            //set mask at left & right sides of screen
            maskHt = "100%";
            maskWidth = (this._lwindowWidth - this._lwindowHt) / 2;

            mask1.style.width = maskWidth + "px";
            mask1.style.height = maskHt;  

            mask2.style.left = this._lwindowHt + maskWidth + "px";
            mask2.style.top =  "0px";         
            mask2.style.width = maskWidth + "px";
            mask2.style.height = maskHt;
         }
       }, 200);
    }

};

squareCam._initialize();