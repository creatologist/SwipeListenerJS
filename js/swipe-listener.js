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
	
	this.offsetX = element.offsetLeft;
	this.offsetY = element.offsetTop;
	
	this.reset();
	
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
	    
	    window.addEventListener('mouseup', this, false);
	    window.addEventListener('touchleave', this, false);
	    window.addEventListener('touchcancel', this, false);
	    
	    
	    // if using window.ontouchend already, add our func into old func
	    var self = this;
	    if ( window.ontouchend ) {
	    	var rand = 'ontouchend' + Math.random();
	    	window[ rand ] = window.ontouchend;
	    	window.ontouchend = function( e ) {
	    		window[ rand ].call( e );
	    		self.onTouchEnd( e );
	    	};
	    } else {
	    	window.ontouchend = function( e ) {
	    		self.onTouchEnd( e );
	    	};
	    }
	    
	    //this.element.addEventListener('click', this, false);
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
	reset: function() {
		this.x = 0;
		this.y = 0;
		
		this.startX = 0;
		this.startY = 0;
		
		this.endX = 0;
		this.endY = 0;
		
		this.globalX = 0;
		this.globalY = 0;
		
		this.globalStartX = 0;
		this.globalStartY = 0;
		
		this.globalEndX = 0;
		this.globalEndY = 0;
	},
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
		//e.stopPropagation();
		this.startTime = new Date();
		
		if ( e.touches && e.touches[0] ) {
			this.globalStartX = e.touches[0].pageX;
			this.globalStartY = e.touches[0].pageY;
		} else {
			this.globalStartX = e.x;
			this.globalStartY = e.y;
		}
		
		this.startX = this.globalStartX - this.offsetX;
		this.startY = this.globalStartY - this.offsetY;
		
		if ( this.options.onTouchStart ) this.options.onTouchStart( this );
	},
	onTouchMove : function( e ) {
		
		e.preventDefault();
		//e.stopPropagation();
		if ( e.touches && e.touches[0] ) {
			this.globalX = e.touches[0].pageX;
			this.globalY = e.touches[0].pageY;
		} else {
			this.globalX = e.x;
			this.globalY = e.y;
		}
		
		this.x = this.globalX - this.offsetX;
		this.y = this.globalY - this.offsetY;
		
		if ( this.options.onTouchMove ) this.options.onTouchMove( this );
	},
	onTouchEnd : function( e ) {
		//e.preventDefault();
		//e.stopPropagation();
		var dTime = new Date() - this.startTime;
		
		if ( e.touches && e.touches[0] ) {
			this.globalEndX = e.touches[0].pageX;
			this.globalEndY = e.touches[0].pageY;
		} else {
			this.globalEndX = e.x;
			this.globalEndY = e.y;
		}
		
		this.endX = this.globalEndX - this.offsetX;
		this.endY = this.globalEndY - this.offsetY;
		
		var dX = this.globalEndX - this.globalStartX;
		var dY = this.globalEndY - this.globalStartY;
		
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