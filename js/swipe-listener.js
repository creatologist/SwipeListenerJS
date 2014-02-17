/*	
		=========================================================================================
 		*
		*	SwipeListener
 		*
 		=========================================================================================
		*----------------------------------------------------------------------------------------
 		*
 		*	listen to swipe events within an element - for desktop & mobile/touch
 		*
 		=========================================================================================
		*
		*   author          >>  Christopher Miles
		* 
		*   site            >>  http://ChristopherMil.es
		*   github          >>  http://github.com/creatologist
		*
		=========================================================================================
*/

//===============================================================================================
//-----------------------------------------------------------------------------------------------

var SwipeListener = function( element, options, finishCallback ) {
	this.element = element;
	
	this.startTime;
	
	this.x	= 0;
	this.y = 0;
	
	this.startX = 0;
	this.startY = 0;
	
	this.endX = 0;
	this.endY = 0;
	
	this.minX = 0;
	this.minY = 0;
	
	this.deltaX = 0;
	this.deltaY = 0;
	
	this.width = element.offsetWidth;
	this.height = element.offsetHeight;
	
	this.options = options || {};
	
	if ( this.element.addEventListener) {
	    this.element.addEventListener('mousedown', this, false);
	    this.element.addEventListener('touchstart', this, false);
	    
	    this.element.addEventListener('drag', this, false);
	    this.element.addEventListener('touchmove', this, false);
	    
	    
	    this.element.addEventListener('mouseup', this, false);
	    this.element.addEventListener('touchleave', this, false);
	    this.element.addEventListener('touchcancel', this, false);
	    this.element.addEventListener('touchend', this, false);
	    
	    this.element.addEventListener('webkitTransitionEnd', this, false);
	    this.element.addEventListener('msTransitionEnd', this, false);
	    this.element.addEventListener('oTransitionEnd', this, false);
	    this.element.addEventListener('transitionend', this, false);
	    this.element.addEventListener('click', this, false);
	    window.addEventListener('resize', this, false);
	}
	
	if ( this.options.minX ) this.minX = this.options.minX / this.width;
	if ( this.options.minY ) this.minY = this.options.minY / this.height;
	
	if ( this.options.minXPercent ) this.minX = this.options.minXPercent;
	if ( this.options.minYPercent ) this.minY = this.options.minYPercent;
	
	this.onResize();
	
	if ( typeof options == 'function' ) options( this );
	else if ( finishCallback && typeof finishCallback == 'function' ) finishCallback( this );
};

SwipeListener.prototype = {
	
	isTouchDevice: function() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	},
	
	handleEvent: function(e) {
	    switch (e.type) {
	    	case 'mousedown':
	    	case 'touchstart': this.onTouchStart(e); break;
	    	
	    	case 'drag':
	    	case 'mousemove':
	    	case 'touchmove': this.onTouchMove(e); break;
	    	
	    	case 'mouseup':
	    	case 'touchcancel':
	    	case 'touchleave':
	    	case 'touchend': this.onTouchEnd(e); break;
	    	
	    	case 'resize': this.onResize( e ); break;
	    }
	},
	
	onTouchStart : function( e ) {
		//e.preventDefault();
		//e.preventDefault();
		this.startTime = new Date();
		
		if ( e.touches ) {
			this.startX = e.touches[0].pageX;
			this.startY = e.touches[0].pageY;
		} else {
			this.startX = e.x;
			this.startY = e.y;
		}
		
		if ( this.options.onTouchStart ) this.options.onTouchStart( this );
	},
	onTouchMove : function( e ) {
		
		e.preventDefault();
		//e.stopPropagation();
		if ( e.touches ) {
			this.x = e.touches[0].pageX;
			this.y = e.touches[0].pageY;
		} else {
			this.x = e.x;
			this.y = e.y;
		}
		
		if ( this.toCheck ) clearTimeout( this.toCheck );
		
		var self = this;
		this.toCheck = setTimeout( function() {
			self.onTouchEnd( e );
		}, 75 );
		
		if ( this.options.onTouchMove ) this.options.onTouchMove( this );
	},
	onTouchEnd : function( e ) {
		//e.preventDefault();
		//e.stopPropagation();
		var dTime = new Date() - this.startTime;
		
		if ( e.touches ) {
			this.endX = e.touches[0].pageX;
			this.endY = e.touches[0].pageY;
		} else {
			this.endX = e.x;
			this.endY = e.y;
		}
		
		var dX = this.endX - this.startX;
		var dY = this.endY - this.startY;
		
		this.deltaX = dX;
		this.deltaY = dY;
		
		var x = Math.abs( dX );
		var y = Math.abs( dY );
		
		var pX = x / this.width;
		var pY = y / this.height;
		
		if ( this.options.onTouchEnd ) this.options.onTouchEnd( this );
		
		if ( x > y ) {
		
			if ( this.minX < pX ) {
				if ( dX < 0 ) {
					if ( this.options.onSwipeLeft ) {
						 this.options.onSwipeLeft( this );
					}
				} else {
					if ( this.options.onSwipeRight ) {
						this.options.onSwipeRight( this );
					}
				}
			}
		} else {
		
			if ( this.minY < pY ) {
				if ( dY < 0 ) {
					if ( this.options.onSwipeUp ) {
						this.options.onSwipeUp( this );
					}
				} else {
					if ( this.options.onSwipeDown ) {
						this.options.onSwipeDown( this );
					}
				}
			}
		}
		
	},
	
	onResize: function( e ) {
		
		this.width = this.element.offsetWidth;
		this.height = this.element.offsetHeight;
		//this.width = this.element.getBoundingClientRect().width;
		//this.height = this.element.getBoundingClientRect().width;
		
		if ( this.options.onResize ) this.options.onResize( this );
		
	}
};