#SwipeListener
Easily tap into swipe events for desktop and mobile/touch. Swipe events are specific to your elements bounding box and doesn't drag/drop your element around.

### View Example
[http://christophermil.es/SwipeListener](http://christophermil.es/SwipeListener)

### Sample Code
```javascript
	
	$content = document.getElementById( 'content' );
	
	swipeListener = new SwipeListener( $content, {
		onSwipeLeft : function( sl ) {...},
		onSwipeRight : function( sl ) {...}
	});
	
```

### 
```javascript
	// SwipeListener events
	+ onTouchStart( swipeListener )
	+ onTouchEnd( swipeListener )
	+ onSwipeLeft( swipeListener )
	+ onSwipeRight( swipeListener )
	+ onSwipeUp( swipeListener )
	+ onSwipeDown( swipeListener )
	+ onResize( swipeListener )
	
	// SwipeListener options
	+ minX  /* minimum ∆X before triggering a swipe */
	+ minY  /* minimum ∆Y before triggering a swipe */
	+ minXPercent  /* minimum ∆X (in percent - based on width) */
	+ minYPercent  /* minimum ∆Y (in percent - based on height) */
```
