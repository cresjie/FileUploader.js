(function(window){
	
	window.fileUploader = function(options, header){
		var _options = {
			method: 'get',
			data:{}
		},
			_header = {
				'Cache-Control': 'no-cache',
				'X-Requested-With': 'XMLHttpRequest',
		};

		if( !(this instanceof fileUploader)){
			return new fileUploader(options, header);
		}

		this.extend(_options, options);
		this.extend(_header, header);
		var xhr = new XMLHttpRequest();

		if(_options.method.toLowerCase() == 'get'){
			var params = Object.keys(_options.data).map(function(k) {
					    return encodeURIComponent(k) + '=' + encodeURIComponent(_options.data[k])
					}).join('&')
			xhr.open(_options.method, _options.url + '?'+params);
		}else
			xhr.open(_options.method, _options.url);

		for(var key in _header)
			xhr.setRequestHeader(key, _header[key]);

		if(typeof _options.data == 'object')
			_options.data = this.toFormData(_options.data);

		//add events
		xhr.upload.onprogress =  _options.progress;
		xhr.onabort = _options.abort;
		xhr.onload = function(e){

			var response = xhr.responseText;

			if(xhr.getResponseHeader("content-type") && xhr.getResponseHeader("content-type").indexOf("application/json") > -1 ){
				try {
	              response = JSON.parse(response);
	            } catch (_error) {
	              e = _error;
	              response = "Invalid JSON response from server.";
	            }
			}
			if(xhr.status == 200){
				if(_options.success)
					_options.success.call(this,response,e);
			}else{
				if(_options.error)
					_options.error.call(this,response,e)
			}

			if(_options.complete)
				_options.complete.call(this,response,e)
		};
		

		xhr.send(_options.data);

		this.abort = function(){
			xhr.abort();
			return this;
		}
		this.getRequest = function(){
			return xhr;
		}
		return this;
	}

	fileUploader.prototype.toFormData = function(key,value){
		var formData = new FormData();
		if(key.constructor == String){
			formData.append(key,value);
		}
		if(key.constructor == Object){
			for(var field in key)
				formData.append(field, key[field]);
		}
		return formData;
	}
	fileUploader.prototype.extend = function(obj,obj2){
		for(var field in obj2){
			obj[field] = obj2[field];
		}
		return obj;
	}

})(window);
