var os = require('os'),
fst = require('./lib/fstab'),
ret = {};

fstab = new fst();

for (var i in os) {
	if (typeof os[i] === 'function') {
		ret[i] = os[i]();
	} else {
		ret[i] = os[i];
	}
}

ret.fstab = fstab.enumerate(function(data) {
	ret.fstab = data;
	console.log(ret);
});

