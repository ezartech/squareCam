#ezAR squareCam 
This JavaScript utility simulates a square camera when used with the ezAR VideoOverlay 
plugin for Cordova. Call squareCam.enable() to reveal a css stylable mask that crops 
the cameraView dimensions to square. The mask size and positioning is updated on each
orientationChange.
 

##Getting Started
Copy the squareCam.css and squareCam.js files into your project and add to your main html file.

         <link rel="stylesheet" type="text/css" href="pathto/squareCam.css">
         <script type="text/javascript" src="pathto/squareCam.js"></script>

Next reveal the squareCam masks to simulate a square cameraView using the 
JavaScript api, 

         squareCam.enable() 

Return to full screen cameraView using

         squareCam.disable()


Here's a snippet that works starts the ezAR VideoOverlay plugin in a square format

        ezar.initializeVideoOverlay(
            function() {
                ezar.getBackCamera().start(
                   function() { squareCam.enable() });
                },
            function(err) {
                alert('unable to init ezar: ' + err);
        });
                    
##Additional Documentation        
See [ezartech.com](http://ezartech.com) for documentation and support.

##License
squareCam is licensed under a [modified MIT license](http://www.ezartech.com/ezarstartupkit-license).


Copyright (c) 2015-2016, ezAR Technologies


