/*
Usage:

babel-node daq_FB.js SACLA 2019 2 23 17 20
babel-node daq_FB.js SCSS 2019 2 23 17 20

Necessary module
npm i puppeteer
npm install csv --save
npm install -g babel-cli
npm install  babel-preset-env
npm install ical
npm install dateformat
npm install date-utils
npm install xlsx
npm install dialog
.babelrc

nexeでコンパイル時、icalで引っかかるためnpm i -g bowser、util-deprecate、isarray、inherits、core-util-is等しないといけない

*/

'use strict';

const dateformat = require('dateformat');
const fs = require('fs');	//ES6	import * as fs from "fs";
const csvParseSync = require('csv-parse/lib/sync');	//ES6	import csvParseSync from "csv-parse/lib/sync";
const puppeteer = require('puppeteer');
process.on('unhandledRejection', console.dir);

const XLSX = require("xlsx");
const Utils = XLSX.utils;

const dialog = require('dialog');



 

//	--- Define 
class Sig {
  constructor(name) {
    this.name = name;
  }
  set name(name) {
    this._name = name;
  }
  set signame(signame) {
    this._signame = signame;
  }
  set sigid(sigid) {
    this._sigid = sigid;
	}
  set dt(dt) {
    this._dt = dt;
	}	
  set flg_bl1(flg_bl1) {
    this._flg_bl1 = flg_bl1;
	}
  set flg_bl2(flg_bl2) {
    this._flg_bl2 = flg_bl2;
	}		
  set flg_bl3(flg_bl3) {
    this._flg_bl3 = flg_bl3;
  }				
  set srv(srv) {
    this._srv = srv;
  }
  set state(state) {
    this._state = state;
  }
  set data(data) {
    this._data = data;
	}
  set ave(ave) {
    this._ave = ave;
	}
  set std(std) {
    this._std = std;
  }
  get name() {
    return this._name;
  }
  get signame() {
    return this._signame;
  }
  get sigid() {
    return this._sigid;
  }
  get srv() {
    return this._srv;
	}
  get dt() {
    return this._dt;
	}
  get flg_bl1() {
    return this._flg_bl1;
	}
  get flg_bl2() {
    return this._flg_bl2;
	}
  get flg_bl3() {
    return this._flg_bl3;
  }				
  get state() {
    return this._state;
  }
  get data() {
    return this._data;
	}
  get ave() {
    return this._ave;
	}
  get std() {
    return this._std;
  }	
  walk() {
//	console.log(this._name + ' is walking');
  }
}




console.log("process.argv.length = " + process.argv.length);
for(var i = 0;i < process.argv.length; i++){
	console.log("argv[" + i + "] = " + process.argv[i]);
}


var fname = "";
if(process.argv[2]=='SACLA'){
	fname = "signal_xfel_fb.xlsx";
}else{
	fname = "signal_scss_fb.xlsx";
}
console.log("fname:		" + fname);
const book = XLSX.readFile(fname);

var tbl = new Array(300);
for(let i = 0; i < tbl.length; i++) {
	tbl[i] = new Sig();
	if(process.argv[2]=='SACLA'){
		tbl[i].srv = 'srweb-dmz-03.spring8.or.jp';	//SACLA
	}else{
		tbl[i].srv = 'xfweb-dmz-03.spring8.or.jp';	//SCSS+ 
	}
}




if (	process.argv.length <= 2){
	dialog.info('none arg:	exsample	daq_FB.js 2019 2 9 19 20');
	console.log('none arg:	exsample	daq_FB.js 2019 2 9 19 20');
	process.exit();
}





//	START	-----------------------------------------------------------------------
( async() => {


	var newc=0;	
	var i=0;
	var now = new Date();
	const path = process.cwd();


	// Excel
	let sheetNames = book.SheetNames;
	console.log(sheetNames);
	const sheet1 = book.Sheets[sheetNames[0]];
	const sheet2 = book.Sheets[sheetNames[1]];
	const sheet3 = book.Sheets[sheetNames[2]];
	let range1 = sheet1['!ref'];		console.log(range1);
	let range2 = sheet2['!ref'];		console.log(range2);
	let range3 = sheet3['!ref'];		console.log(range3);
	var range1Val;
	var range2Val;
	var range3Val;
	if (typeof range1 !== "undefined")	range1Val = Utils.decode_range(range1);
	if (typeof range2 !== "undefined")	range2Val = Utils.decode_range(range2);
	if (typeof range3 !== "undefined")	range3Val = Utils.decode_range(range3);	
	console.log(Utils.decode_range(range1));
	console.log(range1Val.e.c);
	console.log(range2);
	if (typeof range2 !== "undefined"){
		newc = range2Val.e.c + 1;
	}
	console.log("newc " + newc);
	
	// get sig id from excel
	for (let r=range1Val.s.r ; r <= range1Val.e.r ; r++) {
			for (let c=range1Val.s.c ; c <= range1Val.e.c ; c++) {
					let adr = Utils.encode_cell({c:c, r:r});
					let cell = sheet1[adr];
					if (typeof cell !== "undefined" && typeof cell.v !== "undefined") {
						//console.log(`r=${r} c=${c}	${adr} type:${cell.t} value:${cell.v} text:${cell.w}`);
						if(c==0)	tbl[r].signame	= cell.w;
						if(c==1)	tbl[r].sigid		= cell.v;
						if(c==2)	tbl[r].dt		= cell.v;
						if(c==3)	tbl[r].flg_bl1		= cell.v;
						if(c==4)	tbl[r].flg_bl2		= cell.v;
						if(c==5)	tbl[r].flg_bl3		= cell.v;
					}
			}
	}




	// download 
	var dateformat = require('dateformat');

	var pdate = new Date(process.argv[3],process.argv[4]-1,process.argv[5],process.argv[6],process.argv[7]);

	var stodate = dateformat(pdate, 'yyyy/mm/dd+HH:MM:ss');
	var stadate = dateformat(pdate.setSeconds(pdate.getSeconds()-10), 'yyyy/mm/dd+HH:MM:ss');


	// download operation mode
	
	var bl1_opr_mode_bit = 12;
	var bl2_opr_mode_bit = 6;
	var bl3_opr_mode_bit = 7;
	var bl1_opr_mode = 0;
	var bl2_opr_mode = 0;
	var bl3_opr_mode = 0;	
	var ave=0,std=0;
	if(process.argv[2]=='SACLA'){
		[ave, std] = await download('srweb-dmz-03.spring8.or.jp', 621540, stadate,stodate, 1);	//'xfel_safety_oper_beam_mode_normal/status'
		console.log("MODE:		"+ ave+ "	"+std);	
		bl2_opr_mode = bitext(ave, bl2_opr_mode_bit);
		bl3_opr_mode = bitext(ave, bl3_opr_mode_bit);
		if ((bl2_opr_mode+bl3_opr_mode) == 0){ // Tuning mode	
			console.log("Tuning MODE			EXIT");
			process.exit();
		}	
		console.log("bl2_opr_mode:		" + bl2_opr_mode);
		console.log("bl3_opr_mode:		" + bl3_opr_mode);	
	}else{
		[ave, std] = await download('xfweb-dmz-03.spring8.or.jp', 706314, stadate,stodate, 1);	//'scss_safety_oper_scss_beam_mode/status'
		console.log("MODE:		"+ ave+ "	"+std);	
		bl1_opr_mode = bitext(ave, bl1_opr_mode_bit);
		console.log("bl1_opr_mode:		" + bl1_opr_mode);
		bl1_opr_mode = ~bl1_opr_mode;
		bl1_opr_mode = bl1_opr_mode & 1;
		if (bl1_opr_mode == 0){ // Tuning mode	
			console.log("Tuning MODE			EXIT");
			process.exit();
		}	
		console.log("bl1_opr_mode:		" + bl1_opr_mode);
	}

	// download ct emission
	ave=0,std=0;
	if(process.argv[2]=='SACLA'){
		[ave, std] = await download('srweb-dmz-03.spring8.or.jp', 529693, stadate,stodate, 1);	//'xfel_mon_ct_inj_238_2/charge'
	}else{
		[ave, std] = await download('xfweb-dmz-03.spring8.or.jp', 703573, stadate,stodate, 1);	//'scss_mon_ct_inj_238_2/charge'
	}
	console.log("CT:		"+ ave+ "	"+std);
	if (ave < 0.3){ 
		console.log("LOW CT		EXIT");
		process.exit();
	}	
	

	/*
	var stodate = dateformat(now, 'yyyy/mm/dd+HH:MM:ss');
	var stadate = dateformat(now.setSeconds(now.getSeconds()-10), 'yyyy/mm/dd+HH:MM:ss');
	*/
	//	var stadate = dateformat(now.setMinutes(now.getMinutes()-1), 'yyyy/mm/dd+HH:MM:ss');
	console.log(stadate + "	"+ stodate);
	sheet2[Utils.encode_cell({c:newc, r:0})] = { t: "s", v: stodate, w: stodate };
	sheet3[Utils.encode_cell({c:newc, r:0})] = { t: "s", v: stodate, w: stodate };


//	flg_bl2 && bl2_opr_mode || flg_bl3 && bl3_opr_mode

//	for(i = 1; i < 3; i++) {
	for(i = 1; i < range1Val.e.r+1; i++) {
//		console.log("tbl[i].flg_bl1:	" + tbl[i].flg_bl1 +	"	bl1_opr_mode:		" + bl1_opr_mode);
		if((process.argv[2]=='SACLA' && (tbl[i].flg_bl2 && bl2_opr_mode || tbl[i].flg_bl3 && bl3_opr_mode))	||	(process.argv[2]=='SCSS' && tbl[i].flg_bl1 && bl1_opr_mode)){
			var stadate = dateformat(pdate.setSeconds(pdate.getSeconds()-tbl[i].dt), 'yyyy/mm/dd+HH:MM:ss');
			[tbl[i].ave, tbl[i].std] = await download(tbl[i].srv, tbl[i].sigid, stadate,stodate, 1);
			console.log(tbl[i].signame +  '\t' + tbl[i].ave +  '\t' + tbl[i].std);
			sheet2[Utils.encode_cell({c:newc, r:i})] = { t: "n", v: tbl[i].ave, w: tbl[i].ave };
			sheet3[Utils.encode_cell({c:newc, r:i})] = { t: "n", v: tbl[i].std, w: tbl[i].std };
		}
	}


	var range_new = {s: {c:0, r:0}, e: {c:newc, r:range1Val.e.r+1 }};	//	http://blog.64p.org/entry/2014/06/17/115212
	sheet2["!ref"] = XLSX.utils.encode_range(range_new);
	sheet3["!ref"] = XLSX.utils.encode_range(range_new);
	XLSX.writeFile(book, fname);





	var check_list="";
	var e_fb_std = 0;
	for(i = 1; i < range1Val.e.r+1; i++) {
		if((process.argv[2]=='SACLA' && (tbl[i].flg_bl2 && bl2_opr_mode || tbl[i].flg_bl3 && bl3_opr_mode))	||	(process.argv[2]=='SCSS' && tbl[i].flg_bl1 && bl1_opr_mode)){
			if (	!tbl[i].signame.match(/inv_hv\/set_voltage/) && tbl[i].std < 0.001){
				check_list += tbl[i].signame + "\n";
	//			dialog.info('Check ' + tbl[i].signame);
			}
			if ( tbl[i].signame.match(/inv_hv\/set_voltage/)) {
				e_fb_std += tbl[i].std;
	//			console.log(tbl[i].signame +  '\t' + tbl[i].ave +  '\t' + tbl[i].std);
			}
		}
	}

	if (	process.argv[2]=='SACLA' && e_fb_std < 0.001){
		check_list += "Energy_FB\n";
//		dialog.info('Check E_FB' + e_fb_std);
	}


	console.log('check_list:	\t' + check_list);
	if (	check_list != ""){
	//	dialog.info('check_list:\n' + check_list);
		check_list.replace(/\r?\n/g, '');
		var exec = require('child_process').exec;
		var cmd = 'ECHO msgbox \"' + check_list.replace(/\r?\n/g, '') + '\",vbYesNoCancel,\"check\" > %TEMP%/msgboxtest.vbs & %TEMP%/msgboxtest.vbs && ping -n 1 localhost > nul && rm %TEMP%/msgboxtest.vbs'
		console.log('cmd:	\t' + cmd);
		exec(cmd, function(err, stdout, stderr){
			if (err) { console.log(err); } 
		});	
		/*
		exec('ECHO msgbox \"fb\",vbYesNoCancel,\"check\" > %TEMP%/msgboxtest.vbs & %TEMP%/msgboxtest.vbs && ping -n 1 localhost > nul && rm %TEMP%/msgboxtest.vbs', function(err, stdout, stderr){
			if (err) { console.log(err); } 
		});	*/		
	}


  
})();



























//ファイル読み込み関数
function readFile(path) {
  fs.readFile(path, 'utf8', function (err, data) {

    if (err) {
        throw err;
    }
    
//	console.log(data);
  });
}




function isExistFile(file) {
  try {
    fs.statSync(file);
    return true
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }
}


//bit抽出
function bitext(val,bit) {
//	console.log(val);
	val = val >> bit;
	val = val & 1;
//	console.log(val);
	return  val;
}









//-------------------------------------------------------------------------------------
async function download_accsyncdac(srv, sid, sta, sto, a) {
	var url = 'http://SRV/cgi-bin/MDAQ/mdaq_sync_plot.py?daq_type=1&lsig=SID&Selection=Time&begin_bt=STA&end_bt=STO&filter=time&sampling=-1&repetition_rate=30&remainder=0&data_order=asc&Command=text';

	url = url.replace( "SRV", srv );
	url = url.replace( "SID", sid );
	url = url.replace( "STA", sta );
	url = url.replace( "STO", sto );
	
	const browser = await puppeteer.launch({
			executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // for compile nexe

			headless: true,
			"ignoreHTTPSErrors" : true,
			"slowMo" : 20,

			args: [
		//'--proxy-server=192.168.100.252:8080',
		'--window-size=10,90',
		'--window-position=100,50',
		'--no-sandbox'
			]
	});

	var dat = new Array();	

	const page = await browser.newPage();

	await page.setViewport({width: 1600, height: 950});

	try {
		console.log("url:\t"+ url);	
		await page.goto(url, {waitUntil: "domcontentloaded"});

		const fsout = require('fs');
		var html = await page.evaluate(() => {	//page.evaluateメソッドで通常のJavaScript記述可
			return document.getElementsByTagName('body')[0].innerHTML
		});

//  	await fsout.writeFileSync('out.html', html);
//		console.log("html = 	\n" + html);
		html = html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
		
		var resArray = html.split("\n");
		var res;
		Array.prototype.some.call(resArray, function(i,s) {
			var result = i.match(/\d{9},\s\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}.\d{6},\s.+/);	//			470390546, 2018/11/16 13:36:51.009376, 0.063946, 

			if(result){
				res = result[0].split(",");
				console.log("0:	"	+	res[0]	+	"1:	"	+	res[1] +	"2:	"	+	res[2]);
				dat.push(parseFloat(res[2]));
			}
		});
		console.log("lenght" + 	dat.length);
		console.log("dat[0] = " + 	dat[0] + "	dat[1] = " + 	dat[1]);

		await browser.close();
		if(dat.length==0) return;
		if(a==0) return dat[0];
		var val = await ave(dat);	
		return val;
	}catch (e) {
		console.log(e);
		process.exit(200);
	}

	return -1;
}






//-------------------------------------------------------------------------------------
async function download_expsyncdac(srv, signame, sta, sto, a) {
	var url = 'http://SRV/cgi-bin/xdaq/plot_multi.cgi?&Command=data&LeftSignals=SIGNAME&LeftMax=&LeftMin=&LeftLogy=&RightSignals=&RightMax=&RightMin=&RightLogy=&XSignals=&XMax=&XMin=&XLog=&XY=Trend&BeginTime=STA&EndTime=STO&Selection=Time';

/* EXP
'http://websvr02.spring8.or.jp/cgi-bin/xdaq/plot_multi.cgi?&Command=data&LeftSignals=xfel_bl_2_tc_spec_1/energy&LeftMax=&LeftMin=&LeftLogy=&RightSignals=&RightMax=&RightMin=&RightLogy=&XSignals=&XMax=&XMin=&XLog=&XY=Trend&BeginTime=2018-10-26%2023:55:02&EndTime=2018-10-26%2023:56:09&Selection=Time'
*/

/*	SACLA ACC
http://srweb-dmz-03.spring8.or.jp/cgi-bin/MDAQ/mdaq_sync_plot.py?daq_type=1&lsig=535888&Selection=Time&begin_bt=2018/11/16+11:55:52&end_bt=2018/11/16+11:56:52&filter=time&sampling=-1&repetition_rate=30&remainder=0&data_order=asc&Command=text

http://srweb-dmz-03.spring8.or.jp/cgi-bin/MDAQ/mdaq_sync_plot.py?daq_type=1&lsig=SIGID&Selection=Time&begin_bt=STA&end_bt=STO&filter=time&sampling=-1&repetition_rate=30&remainder=0&data_order=asc&Command=text

*/
	url = url.replace( "SRV", srv );
	url = url.replace( "SIGNAME", signame );
	url = url.replace( "STA", sta );
	url = url.replace( "STO", sto );
	
	const browser = await puppeteer.launch({
			executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // for compile nexe

			headless: true,
			"ignoreHTTPSErrors" : true,
			"slowMo" : 20,

			args: [
		//'--proxy-server=192.168.100.252:8080',
		'--window-size=10,90',
		'--window-position=100,50',
		'--no-sandbox'
			]
	});

	var dat = new Array();	

	const page = await browser.newPage();

	await page.setViewport({width: 1600, height: 950});

	try {
//	//	console.log("url:\t"+ url);	
		await page.goto(url, {waitUntil: "domcontentloaded"});

		const fsout = require('fs');
		var html = await page.evaluate(() => {	//page.evaluateメソッドで通常のJavaScript記述可
			return document.getElementsByTagName('form')[0].innerHTML
		}); 
	//	await fsout.writeFileSync('out.html', html);
		html = html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
//	//	console.log("html = 	\n" + html);
		
		var resArray = html.split("\n");
		var res;
		Array.prototype.some.call(resArray, function(i,s) {
//		//	console.log("DEBUG:	" + s + "\t"+ i);
//			var result = i.match(/\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}.\d{6},\s.+,\s.+,\s.+/);	//2018/11/01 16:41:28.523955, None, 60, None
			var result = i.match(/\d{9}\s\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}.\d{6}\s.+/);	//393466247 2018-11-01 17:28:58.152670 1.00291e+01 		
			if(result){
//			//	console.log("0:	"	+	result[0]	+	"1:	"	+	result[1]);
				res = result[0].split(" ");
				dat.push(parseFloat(res[3]));
//				return true;
			}
		});
//	//	console.log("lenght" + 	dat.length);
//	//	console.log("dat[0] = " + 	dat[0] + "	dat[1] = " + 	dat[1]);

		await browser.close();
		if(dat.length==0) return;
		if(a==0) return dat[0];
		var val = await ave(dat);	
//		return average(dat).toPrecision(3);	//有効数字
//		return val.toFixed(1);		//小数点以下
		return val;
	}catch (e) {
		console.log(e);
	//	console.log("Exception.");
		process.exit(200);
	}

	return -1;
}






//-------------------------------------------------------------------------------------
async function download(srv, sigid, sta, sto, a) {

	var url = 'http://SRV/cgi-bin/MDAQ/mdaq_data.py?sig_id=SIGID&daq_type=0&b=STA&e=STO&period=900&bel=be&format=text&_style0=line&yloglin=lin&ymin=&ymax=&sampling=-1&data_order=asc&legend_pos=right&dt_fmt=0&gw=640&runave=0&hide_err=on&s=submit';
	url = url.replace( "SRV", srv );
	url = url.replace( "SIGID", sigid );
	url = url.replace( "STA", sta );
	url = url.replace( "STO", sto );
	
	const browser = await puppeteer.launch({
			executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // for compile nexe

			headless: true,
			"ignoreHTTPSErrors" : true,
			"slowMo" : 20,

			args: [
		//'--proxy-server=192.168.100.252:8080',
		'--window-size=10,90',
		'--window-position=100,50',
		'--no-sandbox'
			]
	});

	var dat = new Array();

	const page = await browser.newPage();

	await page.setViewport({width: 1600, height: 950});

	try {
//		console.log("url:\t"+ url);	
//		await page.goto(url, {waitUntil: "domcontentloaded"});
		await page.goto(url, {waitUntil: "networkidle0"});	//networkidle2：コネクション数が2個以下である状態が500ミリ秒続いたとき

		const fsout = require('fs');
		var html = await page.evaluate(() => {	//page.evaluateメソッドで通常のJavaScript記述可
			return document.getElementsByTagName('textarea')[0].innerHTML
		}); 
	//	await fsout.writeFileSync('out.html', html);
//	//	console.log("html = 	\n" + html);
		var resArray = html.split("\n");
		var res;
		Array.prototype.some.call(resArray, function(i,s) {
		//	console.log(s + "\t"+ i);
			var result = i.match(/\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}.\d{3},\s.+,\s.+,\s.+/);
			if(result){
				res = result[0].split(",");
				if(res[2] === " 8.88e+32") {
				//	console.log("Err data ");
				}else{
					dat.push(parseFloat(res[2]));
				}
			}
		});
		await browser.close();
		if(dat.length==0) return  [0,0];	
//		dat.forEach( function( value, index ) {
//			console.log( index + '：' + value );
//		});
		if(a==0) return dat[0];
		var [ave,std] = await get_ave_std(dat);
//		console.log(ave + "\t" + std);
		return [ave,std];
	}catch (e) {
		console.log(e);
	//	console.log("Exception.");
		process.exit(200);
	}

	return  [0,0];
}








//-------------------------------------------------------------------------------------







//-------------------------------------------------------------------------------------
async function get_ave_std(dat) {
	const average = dat.reduce((previous, current) =>
			previous + current  // 要素をすべて足す
	) / dat.length;  // 平均を求める
	const standardDeviation = Math.sqrt(  // 分散の平方根を求める
			dat.map((current) => {  // 各要素について
					let difference = current - average;  // 平均値との差を求める
					return difference ** 2;  // 差を2乘する
			})
			.reduce((previous, current) =>
					previous + current  // 差の2乗をすべて足す
			) / dat.length  // 差の2乗の平均が分散
	);
//		console.log(standardDeviation);	
		return [average,standardDeviation];
}
	







//		Get Summary from ical--------------------------------------------
function Get_summary(passVal, msec) {
  return new Promise(resolve =>
      setTimeout(() => {
		var now = new Date();
		parser.fromURL(passVal, {}, function(err, data) {
		  for(var plan in data) {
			var diff_sta = now.getTime() - data[plan].start;
			var diff_end = data[plan].end - now.getTime();
			if(diff_sta>0 && diff_end >0){
	//		//	console.log(dateformat(data[plan].start, 'yyyy/mm/dd+HH:MM:ss') + "\t" + dateformat(data[plan].end, 'yyyy/mm/dd+HH:MM:ss') + "\t" + data[plan].summary);
				resolve(data[plan].summary);
			}
		  }
			resolve("");
		});
    }, msec)
      )
}












//	Not Use	----------------------------------------------------------------------------

	/* OK	Read CSV File  using module		[npm install csv --save]	https://www.gesource.jp/weblog/?p=7653	 
	var tes0;
	const fs = require('fs');
	const csv = require('csv');
	const parser = csv.parse((err, data) => {
	//	console.log('CSV rows count =' + data.length);		
	    data.forEach(function(element, index, array) {
		//	console.log(index + ' row\t' + element);
			tes0=array[0];
		});
	//	console.log('ANS0:	\t' + tes0);
	});
	fs.createReadStream(file).pipe(parser);
	*/


/*
function puts(str) {
  // ① Promiseコンストラクタを new して、promiseオブジェクトを返す
  return new Promise(function(resolve) {

	var dateformat = require('dateformat');
	var now = new Date();
	parser.fromURL(str, {}, function(err, data) {
	  for(var plan in data) {
		var diff_sta = now.getTime() - data[plan].start;
		var diff_end = data[plan].end - now.getTime();
		if(diff_sta>0 && diff_end >0){
//		//	console.log(dateformat(data[plan].start, 'yyyy/mm/dd+HH:MM:ss') + "\t" + dateformat(data[plan].end, 'yyyy/mm/dd+HH:MM:ss') + "\t" + data[plan].summary);
			resolve(data[plan].summary);
		}
	  }
	});

  });
}
*/
