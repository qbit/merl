var fs = require('fs'),

fstab = function(o) {
	var def_map = {
		'0': 'device',
		'1': 'location',
		'2': 'type',
		'3': 'opts',
		'4': 'freq',
		'5': 'passno'
	};
	o = o || {};

	this.fstab = o.fstab || '/etc/fstab';
	this.delim = o.delim || '\n';
	this.ldelim = o.ldelim || /\s+/;
	this.map = o.map || def_map;
	this.key = o.key || 1;

	return this;
}

fstab.prototype.parse = function(d) {
	if (d) {
		var a = d.split(this.delim), i, l, p,
		ret = {}, ii, ll;
		for(i = 0, l = a.length; i < l; i++) {
			p = a[i];
			if (p && !p.match(/^#/)) {
				p = p.split(this.ldelim);
				ret[p[this.key]] = {}; // should always be mount point
				for (ii = 0, ll = p.length; ii < ll; ii++) {
					if (p[ii].match(',')) {
						p[ii] = p[ii].split(',');
					}
					ret[p[this.key]][this.map[ii]] = p[ii];
				}
			}
		}
	}

	return ret;
};

fstab.prototype.enumerate = function(fn) {
	var self = this;
	fs.readFile(this.fstab, 'utf8', function(err, data) {
		if (err) {
			throw err;
		}

		fn.call(null, self.parse(data));
	});
};

module.exports = fstab;
