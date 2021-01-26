(function() {
	var Utf8 = require('jazor-encoding').utf8;
	var e = [];
	e[65] = 0;
	e[66] = 1;
	e[67] = 2;
	e[68] = 3;
	e[69] = 4;
	e[70] = 5;
	e[71] = 6;
	e[72] = 7;
	e[73] = 8;
	e[74] = 9;
	e[75] = 10;
	e[76] = 11;
	e[77] = 12;
	e[78] = 13;
	e[79] = 14;
	e[80] = 15;
	e[81] = 16;
	e[82] = 17;
	e[83] = 18;
	e[84] = 19;
	e[85] = 20;
	e[86] = 21;
	e[87] = 22;
	e[88] = 23;
	e[89] = 24;
	e[90] = 25;
	e[97] = 26;
	e[98] = 27;
	e[99] = 28;
	e[100] = 29;
	e[101] = 30;
	e[102] = 31;
	e[103] = 32;
	e[104] = 33;
	e[105] = 34;
	e[106] = 35;
	e[107] = 36;
	e[108] = 37;
	e[109] = 38;
	e[110] = 39;
	e[111] = 40;
	e[112] = 41;
	e[113] = 42;
	e[114] = 43;
	e[115] = 44;
	e[116] = 45;
	e[117] = 46;
	e[118] = 47;
	e[119] = 48;
	e[120] = 49;
	e[121] = 50;
	e[122] = 51;
	e[48] = 52;
	e[49] = 53;
	e[50] = 54;
	e[51] = 55;
	e[52] = 56;
	e[53] = 57;
	e[54] = 58;
	e[55] = 59;
	e[56] = 60;
	e[57] = 61;
	e[43] = 62;
	e[47] = 63;
	e[61] = 64;
	var f = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/", "="];
	var d = function(t) {
		var s = "";
		var g, h, j = "";
		var k, m, n, o = "";
		var p = 0,
			q = t.length,
			r = q - q % 3;
		while (p < r) {
			g = t[p++];
			h = t[p++];
			j = t[p++];
			k = g >> 2;
			m = ((g & 3) << 4) | (h >> 4);
			n = ((h & 15) << 2) | (j >> 6);
			o = j & 63;
			s += f[k] + f[m] + f[n] + f[o]
		}
		if (q - r == 2) {
			g = t[p++];
			h = t[p++];
			s += f[g >> 2] + f[((g & 3) << 4) | (h >> 4)] + f[((h & 15) << 2)] + "="
		} else {
			if (q - r == 1) {
				g = t[p++];
				s += f[g >> 2] + f[((g & 3) << 4)] + "=="
			}
		}
		return s
	};
	var c = function(t) {
		t = t.replace(/\s/g, "");
		if (t == "") {
			return []
		}
		var s = [];
		var g, h, j = "";
		var k, m, n, o = "";
		var p = 0,
			q = t.length,
			r = q;
		if (t.slice(-1) == "=") {
			r = q - 4
		}
		while (p < r) {
			k = e[t.charCodeAt(p++)];
			m = e[t.charCodeAt(p++)];
			n = e[t.charCodeAt(p++)];
			o = e[t.charCodeAt(p++)];
			g = (k << 2) | (m >> 4);
			h = ((m & 15) << 4) | (n >> 2);
			j = ((n & 3) << 6) | o;
			s.push(g, h, j)
		}
		if (q != r) {
			k = e[t.charCodeAt(p++)];
			m = e[t.charCodeAt(p++)];
			if (t.slice(-2) == "==") {
				s.push((k << 2) | (m >> 4))
			} else {
				if (t.slice(-1) == "=") {
					n = e[t.charCodeAt(p++)];
					s.push((k << 2) | (m >> 4), ((m & 15) << 4) | (n >> 2))
				}
			}
		}
		return s
	};
	var b = {};
	b.e = d;
	b.d = c;
	b.encode = function(g) {
		if (typeof g == "string") {
			g = Utf8.getByteArray(g)
		}
		return d(g)
	};
	b.decode = function(g) {
		return Utf8.getString(c(g))
	}
	module.exports = b;
})();