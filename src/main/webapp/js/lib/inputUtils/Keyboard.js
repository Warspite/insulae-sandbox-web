var Keyboard = function()
{
	this.keyDownHandler = this.keyDown.bind(this);
	this.keyPressHandler = this.keyPress.bind(this);
	this.keyUpHandler = this.keyUp.bind(this);
	document.addEventListener("keydown", this.keyDownHandler, false);
	document.addEventListener("keypress", this.keyPressHandler, false);
	document.addEventListener("keyup", this.keyUpHandler, false);

	this.keysDown = new Array();
	this.keysReleased = new Array();
	
	this.htmlNodesWithFocus = {};
	
	this.setupFocusListeners();
};

Keyboard.prototype.keyDown = function(e)
{
	if (!this.isMozilla && !e.ctrlKey && !e.altKey && !e.altKey && !e.metaKey)
	{
		this.processKey(e, e.keyCode);
	}
};

Keyboard.prototype.keyPress = function(e)
{
	if (this.isMozilla && !e.ctrlKey && !e.altKey && !e.altKey && !e.metaKey)
	{
		this.processKey(e, (e.keyCode != 0) ? e.keyCode : (e.charCode === 32) ? 32 : 0);
	}
};

Keyboard.prototype.keyUp = function(e)
{
	if (e.keyCode == 37) { this.removeKey(Key.LEFT);  }
	else if (e.keyCode == 39) { this.removeKey(Key.RIGHT); }
	else if (e.keyCode == 38) { this.removeKey(Key.UP);    }
	else if (e.keyCode == 40) { this.removeKey(Key.DOWN);  }
	else if (e.keyCode == 67) { this.removeKey(Key.C);  }
	else if (e.keyCode == 88) { this.removeKey(Key.X);  }
	else if (e.keyCode == 90) { this.removeKey(Key.Z);  }
};

Keyboard.prototype.processKey = function(e, keyCode)
{
	if( this.anyInputElementHasFocus() )
		return;
	
	if 		(keyCode == 37) { stopEvent(e); this.addKey(Key.LEFT);  }
	else if (keyCode == 39) { stopEvent(e); this.addKey(Key.RIGHT); }
	else if (keyCode == 38) { stopEvent(e); this.addKey(Key.UP);    }
	else if (keyCode == 40) { stopEvent(e); this.addKey(Key.DOWN);  }
	else if (keyCode == 67) { stopEvent(e); this.addKey(Key.C);  }
	else if (keyCode == 88) { stopEvent(e); this.addKey(Key.X);  }
	else if (keyCode == 90) { stopEvent(e); this.addKey(Key.Z);  }
};

Keyboard.prototype.addKey = function(key)
{
	this.keysDown[key.val] = true;
};

Keyboard.prototype.removeKey = function(key)
{
	this.keysReleased[key.val] = true;
};

Keyboard.prototype.tick = function(elapsedTime)
{
	for(i = 0; i < Key.numberOfKeys; i++)
	{
		if(this.keysReleased[i])
		{
			this.keysDown[i] = false;
			this.keysReleased[i] = false;
		}
	}
};

Keyboard.prototype.anyInputElementHasFocus = function()
{
	for(i in this.htmlNodesWithFocus)
		if(this.htmlNodesWithFocus[i])
			return true;

	return false;
};

Keyboard.prototype.isKeyDown = function(key)
{
	return this.keysDown[key.val];
};

Keyboard.prototype.setupFocusListeners = function()
{
    var keyboard = this;

	var inputs = document.getElementsByTagName('input');
	for (i in inputs) {
    	if (inputs[i].type === 'text' || inputs[i].type === 'password') {
    		inputs[i].onfocus = function() { keyboard.htmlNodesWithFocus[this.id] = true; }
    		inputs[i].onblur = function() { keyboard.htmlNodesWithFocus[this.id] = false; }
        }
	}
};