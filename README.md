#SwipeListener
Easily tap into swipe events for desktop and mobile/touch. Swipe events are specific to your elements bounding box and doesn't drag/drop your element around.

### View Example
[http://christophermil.es/SwipeListener](http://christophermil.es/SwipeListener)

### Sample Code
```javascript
	
	$content = document.getElementById( 'content' );
	
	swipeListener = new SwipeListener( $content, {
		onSwipeLeft: function( sl ) {...},
		onSwipeRight: function( sl ) {...}
	});
	
```

### 
```javascript
	// SwipeListener events
	+ onTouchStart: function( swipeListener ) {..}
	+ onTouchEnd: function( swipeListener ) {..}
	+ onSwipeLeft: function( swipeListener ) {..}
	+ onSwipeRight: function( swipeListener ) {..}
	+ onSwipeUp: function( swipeListener ) {..}
	+ onSwipeDown: function( swipeListener ) {..}
	+ onResize: function( swipeListener ) {..}
	
	// SwipeListener options
	+ minX  /* default: 0 - minimum ∆X (in pixels) before triggering a swipe */
	+ minY  /* default: 0 - minimum ∆Y (in pixels) triggering a swipe */
	+ minXPercent  /* minimum ∆X (in percent - based on width) */
	+ minYPercent  /* minimum ∆Y (in percent - based on height) */
```
