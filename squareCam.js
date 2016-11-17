
// Copyright (c) 2015-2016, ezAR Technologies
//
// Simulates a square camera view by creating mask that overlays
// the longest dimension of a mobile device display. The mask is 
// updated on device rotation, i.e., orientationchange events
// @author wayne@ezartech.com
// @license modified MIT 
// 
// Create a containing element (div) with id 'ezarcontainer' into which the 
//  mask will be displayed. Typically this container will fill 100% of the
//  app UI.
//
// squareCam.enable() - call to show the mask
// squareCam.disable() - call to hide the mask

var squareCam = {
    _mask1: null,
    _mask2: null,
    _initialize: function() {  

        this._element = document.getElementById('ezarcontainer');

        //add mask1 div
        this._mask1 = document.createElement('div');
        this._mask1.id = "ezarmask1";
        this._mask1.className = 'ezarmask';
        //body.appendChild(newNode);

        //add mask2 div
        this._mask2 = document.createElement('div');
        this._mask2.id = "ezarmask2";
        this._mask2.className = 'ezarmask';
        //body.appendChild(newNode);
    },

    enable: function() {
        var element= this._element;
        var mask1  = this._mask1;
        var mask2  = this._mask2;

        window.addEventListener("orientationchange", this._onOrientationChange.bind(this), false);

        //make mask divs visible
        element.appendChild(mask1);
        mask1.style.display = "block";
        
        element.appendChild(mask2);
        mask2.style.display = "block";
        
        this._updateMasks();
    },

    disable: function() {
        window.removeEventListener("orientationchange", this._onOrientationChange);

        //hide mask divs       
        this._mask1.style.display = "none";
        this._mask1.style.display = "none";

        this._element.removeChild(_mask1);
        this._element.removeChild(_mask2);        
    },

    getSize: function() {
        return this._size;
    },

    _element: null, 

    _onOrientationChange: function() {
        this._updateMasks();
    },

    //cache initial portrait & landscape dimensions
    //this is due to odd results on my nexus5 android 6 device
    // where the width was inconsistent after several rotations 
    // resulting in misaligned mask2
    _size: 0,
    _pwindowWidth: 0,
    _pwindowHt: 0,
    _lwindowWidth: 0,
    _lwindowHt: 0,

    _updateMasks: function() {
        setTimeout(function() {         
         var maskWidth, maskHt;               
         //var orientation = screen.orientation.angle % 180 === 0 ? 'portrait' : 'landscape'
         var orientation = (this._element.offsetWidth < this._element.offsetHeight) ? 
            'portrait' : 'landscape'
         
         var mask1, mask2;
         mask1 = this._mask1;
         mask2 = this._mask2;

         mask1.style.left = "0px";
         mask1.style.top = "0px";

         if (orientation == 'portrait') {
            if (!this._pwindowWidth) 
                this._pwindowWidth = this._element.offsetWidth;
            if (!this._pwindowHt) 
                this._pwindowHt = this._element.offsetHeight; 

            if (this._pwindowHt < this.pwindowWidth) {
                var tmp = this._pwindowWidth;
                this._pwindowWidth = this._pwindowHt;
                this._pwindowHt = tmp;
            }

            this._size - this._pwindowWidth;

            //console.log('size', this._size, 'pwidth', this._pwindowWidth, 'pheight', this._pwindowHt);

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
                this._lwindowWidth = this._element.offsetWidth;
            if (!this._lwindowHt) 
                this._lwindowHt = this._element.offsetHeight; 

            if (this._lwindowWidth < this._lwindowHt) {
                var tmp = this._lwindowHt;
                this._lwindowHt = this._lwindowWidth;
                this._lwindowWidth = tmp;
            }
            
            this._size - this._pwindowWidth;

            //console.log('size', this._size, 'lwidth', this._lwindowWidth, 'lheight', this._lwindowHt);

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
       }.bind(this), 200);
    }

};

squareCam._initialize();