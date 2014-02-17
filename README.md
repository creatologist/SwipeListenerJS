#SwipeListener
Easily tap into swipe events for desktop and mobile/touch. Swipe events are specific to your elements bounding box and doesn't drag/drop your element around.

### Example
[http://christophermil.es/SwipeListener](http://christophermil.es/SwipeListener)

### Example Code
```javascript
	
	$element = document.getElementById( 'element' );
	
	swipeListener = new SwipeListener( $element, {
		onSwipeLeft: function( sl ) {
			sl.doSomething( sl.deltaX );
		},
		onSwipeRight: function( sl ) {...}
	});
	
	swipeListener.doSomething = function( dist ) {...};
	
```

### 
```javascript
	// SwipeListener events
	+ onTouchStart: function( swipeListener ) {...}
	+ onTouchEnd: function( swipeListener ) {...}
	+ onSwipeLeft: function( swipeListener ) {...}
	+ onSwipeRight: function( swipeListener ) {...}
	+ onSwipeUp: function( swipeListener ) {...}
	+ onSwipeDown: function( swipeListener ) {...}
	+ onResize: function( swipeListener ) {...}
	
	// SwipeListener options
	+ minX  /* default: 0 - minimum ∆X (in pixels) before triggering a swipe */
	+ minY  /* default: 0 - minimum ∆Y (in pixels) triggering a swipe */
	+ minXPercent  /* minimum ∆X (in percent - based on width) */
	+ minYPercent  /* minimum ∆Y (in percent - based on height) */
	
	// SwipeListener vars
	+ deltaX
	+ deltaY
	+ startX
	+ startY
	+ x
	+ y
	+ endX
	+ endY
	+ width /* of element */
	+ height /* of element */
```
