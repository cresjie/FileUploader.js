# fileUploader.js
Super lightweight library for ajax request and file upload.
# Requirements
* nothing

# constructor
- **fileUpload(options, headers)** 
 - options <sub>| Object</sub>
 - headers <sub>| Object</sub>

# Options
- **Url** <sub>*type: String*</sub>
 - request url
- **method** <sub> *default: 'GET'*</sub>
 - HTTP method
- **data**  <sub>*type: String, Object, FormData*</sub>
 - HTTP parameters
- **progress** <sub> *type: function(percent)*</sub>
 - event listener for progress event
- **abort**  <sub>*type: function*</sub>
 - triggers when the request is aborted
- **error** <sub>*type: function(response, event)*</sub>
 - triggers when error occur in the request
- **success** <sub>*type: function(response, event)*</sub>
 - triggers when the request is success: status 200
- **complete** <sub>*type: function(response, event)*</sub>
 - triggers either the request is error or success

# Headers

##### Defaults
- **Cache-Control:** no-cache
- **X-Requested-With:** XMLHttpRequest
 
 [see][1] HTTP Header list for more info.


[1]: https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
  
