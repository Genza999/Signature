## Signature
Complete any delivery service App with this Signature widget.
This widget allows you to save a signature to an attribute.
The widget implements bezier curves and velocity for the smooth drawing of the signature

## Features
* Record signature in an attribute
* Customizable size, pencolor, pen size ,drawing preferences i.e max and min width and grid
* Reset button to delete signature and reset the canvas

## Configuration
Add the widget to a dataview. Connect the data URL property to an unlimited String attribute of the dataview context object.

## Demo project
[https://mxtestproject102.mxapps.io/](https://mxtestproject102.mxapps.io)

## Usage

### Appearance configuration
![Data source](/assets/Appearance.PNG)
- This is where you select the attribute which is to hold the sigature string. The attribute must be an unlimited string.

![Data source](/assets/penCustomization.PNG)
- In the pen customization, this is where you can customize your own pen size, the pen color, the maximum and minimum pen width and the velocity pressure.

![Data source](/assets/response.PNG)
- The signature timeout can be set from here(time before the signature is saved to an image) and both the responsive and responsive ratio.

![Data source](/assets/canvas.PNG)
- You can customize the canvas height and width from here.

![Data source](/assets/grid.PNG)
- Whether to show a grid background or not, the size of the y-axis and the x-axis of the grid,
color of the grid and the grid border size can all be customized from here.


### Properties
* *Pen color* - HTML color code of the pen.
* *Pen size* - Size of the pen in pixels.
* *Signature timeout* - Amount of milliseconds the widget will wait after the user has stopped writing before saving the signature.
* *Canvast height* - Height of writable area in pixels.
* *Canvas width* - Width of writable area in pixels.
* *Show background grid* - When set to yes, a grid is shown in the background of the writable area.
* *Grid X* - The distance in pixels between gridlines in the horizontal direction.
* *Grid Y* - The distance in pixels between gridlines in the vertical direction.
* *Grid color* - HTML color code of the grid
* *Grid border width* - Width of canvas border in pixels
* *Reset caption* - Caption that is shown on the button with which you can remove an existing signature.
* *Data URL* - Unlimited string attribute that is used to save the signature.
* *minWidth(float)* - Minimum width of a line. Defaults to 0.5.
* *maxWidth(float)* - Maximum width of a line. Defaults to 2.5.
* *velocityFilterWeight(float)* - Weight used to modify new velocity based on the previous    velocity. Defaults to 0.7.

## Compatibility
The widget is usable and works smoothly in Google chrome, Internet explorer. 
In Firefox by setting dom.w3c_pointer_events.enabled to “true” in about:config you can get to use the widget.(Thats if initially it wasnt working)

