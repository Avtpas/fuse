do( factory =()->
	
	### midware function ###
	totFunc = (value,param,first,callback)->
		rs = [].reduce.call param,(memo,crs)->
			if typeof crs is 'string'
				func = fuleMap[crs]
				callback func(value),memo if func
			else if typeof crs is 'object'
				func = ruleMap[crs.rule]
				callback func(value,crs.param),memo if func
			else if typeof crs is 'function'
				callback crs(),memo
			false
		,first

	### rules ###
	ruleMap = {
		"require":(value)->
			return false if value is undefined
			return (""+value).length isnt 0
		"AND":(value,param)->
			totFunc value,param,true,(a,b)->
				a and b
		"OR":(value,param)->
			totFunc value,param,false,(a,b)->
				a or b
		"NOT":(value,param)->
			totFunc value,param,false,(a,b)->
				not a
		"NO":-> true
	}
	return {
		check:(text,rules)->
			try
				for i in [0..rules.length]
					rule = rules[i]
					handler = ruleMap[rule.rule]
					rs = false
					if handler
						rs = handler text,rule.param
					else
						reg = rule.regexp
						if reg
							r = new RegExp(reg)
							rs = r.test text
					if !rs
						return {
							result:false
							message:rule.message
						}
			catch
				return {
					result:false
					message:'unknown error'
				}
			return {
				result:true
			}
	}
)->
	define = window.define
	if(define and windowdefine.cmd)
		define (require,exports,module)->
			module.exports = factory()
		return
	else if window.jQuery
		window.jQuery.fuse = factory()
	else 
		window.fuse = factory()
