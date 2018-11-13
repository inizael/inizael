function nodeControl(ngpDocument){
	var ngvDocument = document;
	/* FUNCIONES LOCALES */

		var lStart = function(){
			try {
				if(ngpDocument){
					ngvDocument = ngpDocument;
				}
			}catch(e){
				throw new Error("Error in the script, the error can not be detected.");
			}	
		}

		var lTypeVariable = function(value, type){
			var response = false;
			if(typeof type == "string" && (value != undefined || value)){
				if(typeof value == type) {
					response = true;
				}
			}
			return response;
		}

		var lGetFileType = function(src, type){
			var response = {type: null, attr: null, attributes: {}};
			if(typeof src === "string"){
				var teste = [];
				var srcExtension = src.split(".")[src.split(".").length - 1];
				teste.push(srcExtension);
				if(typeof type === "string"){
					teste.push(type);
				}
				var types = [
					[["js","script"], ["script", "script"], ["javascript", "script"], ["jscript", "script"], ["ts", "script"]],
					[["style", "link"], ["css", "link"], ["sass", "link"], ["link", "link"]],
					[["img", "img"], ["image", "img"], ["imagen", "img"], ["imagenes", "img"], ["jpg", "img"], ["png", "img"], ["jpeg","img"], ["gif", "img"]]
				];
				var attributes = [["script", "src"], ["link", "href"], ["img", "src"]];
				var reqAttr = [["script", {type: "text/javascript"}], ["link", {rel: "stylesheet"}]];
				for(var a = 0; a < teste.length; a ++){
					for(var i = 0; i < types.length; i ++){
						for(var e = 0; e < types[i].length; e ++){
							if(teste[a] == types[i][e][0] && !response.type){
								response.type = types[i][e][1];
								for(var o = 0; o < attributes.length; o ++){
									if(response.type == attributes[o][0]){
										response.attr = attributes[o][1];
										break;
									}
								}
								for(var u = 0;u < reqAttr.length; u++ ){
									if(response.type == reqAttr[u][0]){
										response.attributes = reqAttr[u][1];
									}
								}
							}
						}
					}
				}
			}
			return response;
		}

		var lmultipleLoad = function(files, position){
			return new Promise(function(onsuccess, onerror){
				if(Array.isArray(files)){
					var loadCount = 0;
					for(var i = 0; i < files.length; i ++){
						lrequire(files[i], position).then(function(e){
							loadCount ++;
							if(loadCount == files.length -1){
								onsuccess();
							}
						}, function(e){
							onerror(e);
						});
					}
				}else {
					onerror({ Error: "A list of directories was expected."});
				}
			});
		}

		var lrequire = function(file, position, attributes){
			return new Promise(function(success, error){
				var formato =  lGetFileType(file);
				var nodePosition = ngvDocument.querySelector(position) || ngvDocument.querySelector("html");
				if(formato.type != undefined){
					var importar = ngvDocument.createElement(formato.type);
					/* Insertar atributos requeridos */
					for(var ar in formato.attributes){
						importar.setAttribute(ar, formato.attributes[ar]);
					}
					importar.setAttribute("status", "pending");
					importar.setAttribute(formato.attr, file);
					importar.onload = function () {
						importar.setAttribute("status", "success");
						success(true);
					}
					importar.onerror = function () {
						importar.setAttribute("status", "error");
						error({
							error: "Error when importing, the file can not be accessed"
						});
					}
					/* Insertar atributos del usuario */
					if(typeof attributes == "object"){
						for (var au in attributes) {
							importar.setAttribute(au, attributes[au]);
						}
					}
					if(nodePosition){
						if (nodePosition == ngvDocument.querySelector("html")){
							console.warn("The file was imported into the html because the required position is not valid, this could cause problems.")
						}
						nodePosition.appendChild(importar);
					}else {
						error({error: "Position is not specified or is an invalid position"});
					}
				}else {
					error({error: "The format you want to import is not valid"});
				}
			});
		}


		var lBuild = function(object){
			var $this = this;
			return new Promise(function(resolve, reject){
				var nodes = [];
				if(typeof object == 'object'){
					for(var node in object){
						var type = lTypeVariable(object[node].type, 'string') ? object[node].type : 'div',
							name = lTypeVariable(object[node].name, 'string') ? object[node].name : node,
							position = lTypeVariable(object[node].position, 'string') ? object[node].position : 'html',
							repeat = lTypeVariable(object[node].repeat, 'boolean') ? object[node].repeat : true,
							first = lTypeVariable(object[node].first, 'boolean') ? object[node].first : false,
							build = (repeat == false && !$this.exist(name) || repeat == true);
						if(build == true) {
							var eBuild = ngvDocument.createElement(type);
							if(typeof object[node].attributes == "object") {
								for(var attribute in object[node].attributes){
									eBuild.setAttribute(attribute, object[node].attributes[attribute]);
								}
							}
							eBuild.setAttribute('ndkey', name);
							var parentNode = ngvDocument.querySelector(position);
							if(typeof object[node].html == "string") {
								eBuild.innerHTML = object[node].html;
							}
							if(parentNode){
								var successnode = {};
								if(first) {
									successnode = {name: name, node: parentNode.insertBefore(eBuild, parentNode.firstChild), status: true, request: object[node], reason: "ok."};
								}else {
									successnode = {name: name, node: parentNode.appendChild(eBuild), status: true, request: object[node], reason: "ok."};
								}
								nodes.push(successnode);
							}else {
								var failnode = {name: name, node: null, status: false, request: object[node], reason: "parentNode does not exist."};
								nodes.push(failnode);
							}
						}else {
							/*NO FUE CREADO*/
							var failnode = {name: name, node: null, status: false, request: object[node], reason: "The element already exists"};
							nodes.push(failnode);
						}
					}
					resolve(nodes);
				}else {
					reject({reason: "Is not a object", request: object, status: false, nodes: nodes});
				}
			});
		}

		var lExist = function(ndkey){
			var elemento = ngvDocument.querySelector('[ndkey="' + ndkey + '"]');
			var existe = elemento ? true : false;
			return existe;
		}

		var lGet = function(ndkey) {
			var attributos = {};
			var element = ngvDocument.querySelector('[ndkey="' + ndkey + '"]');
			if(element){
				for(var attr in element.attributes){
					if(element.attributes[attr].nodeName != undefined){
						attributos[element.attributes[attr].nodeName] = element.attributes[attr].nodeValue;
					}
				}
			}
			return attributos;
		}

		var lDestroy = function(ndkey) {
			var element = ngvDocument.querySelector('[ndkey="' + ndkey + '"]');
			var destroy = false;
			if (element) {
				if (element.parentNode.removeChild(element)) {
					destroy = true;
				}
			}
			return destroy;
		}

		var lClean = function(ndkey) {
			var element = ngvDocument.querySelector("[ndkey='" + ndkey + "']");
			if (element) {
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
			}
		}

	/* FUNCIONES PUBLICAS */

		this.build = lBuild;
		this.exist = lExist;
		this.get = lGet;
		this.destroy = lDestroy;
		this.clean = lClean;
		this.import = lrequire;
		this.importList = lmultipleLoad;
	/* INICIO */
		lStart();
}
