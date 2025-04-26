/*
Usage:

babel-node get_byWinscp.js

Necessary module
npm i puppeteer
npm install csv --save
npm install -g babel-cli
npm install  babel-preset-env
npm install ical
npm install dateformat
npm install date-utils
.babelrc


nexeでコンパイル時、icalで引っかかるためnpm i -g bowser、util-deprecate、isarray、inherits、core-util-is等しないといけない
*/

'use strict';

/**/
//import * as csv from "csv";
//import csvParse from "csv-parse";


const parser = require('ical');
const dateformat = require('dateformat');
const fs = require('fs');	//ES6	import * as fs from "fs";
const csvParseSync = require('csv-parse/lib/sync');	//ES6	import csvParseSync from "csv-parse/lib/sync";
const puppeteer = require('puppeteer');
process.on('unhandledRejection', console.dir);











//	START	-----------------------------------------------------------------------
( async() => {


	for(var i = 0;i < process.argv.length; i++){
		console.log("argv[" + i + "] = " + process.argv[i]);
	}

	var now = new Date();
	const path = process.cwd();
/*	 Get txt file	& check file exist 	*/
	
	console.log(process.cwd());
	var file = "xfopcon-09.png";
	var cmd = "\"C:\\Program Files (x86)\\WinSCP\\WinSCP.exe\" /console /script=getscript.txt /parameter \"" + path +  "\" \"/home/xfel/xfelopr/kenichi/screenshot/" + file+ "\"";

	console.log(cmd);
	var fs0 = require('fs');
	try {
		fs0.unlinkSync(file);
	} catch(err) {
		console.log(err);
	}

	const childProcess = require('child_process');
	childProcess.execSync(cmd, (error, stdout, stderr) => {
	  if(error) {
		console.log(stderr);
		return;
	  }else {
//		console.log(stdout);
	  }
	});
	
	if(isExistFile(file)){
		console.log('OK:	Exsit\t');
	}else{
		console.log('File not exist!\t'	+ file);
		process.exit(1);
	}



/*		*/
const fs = require('fs');
var stat = fs.statSync(file);

//	console.log("stat	\t" + stat.mtime);
//	console.log("stat	\t" + stat.atime);
//	console.log("stat	\t" + stat.ctime);
//	console.log("stat	\t" + stat.birthtime);

//	console.log("File create time:\t" + stat.mtime.toLocaleString());
var diff = now.getTime() - stat.mtime.getTime();
//	console.log("Diff:\t" + diff/(1000*60) + "\tmin.");
if(diff/(1000*60) > 10){
	console.log("Time over:	Diff\t" + diff/(1000*60) + "\tmin.");
//	window.alert( "Matono is too old!" ) ;
	process.exit(1);
}



	process.stdout.write('working[.           ]\r');


	process.stdout.write('working[............]\r');


  
  
})();







// min から max までの乱数を返す関数
function getRandomArbitary(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}



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
			var result = i.match(/\d{9},\s\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}.\d{3},\s.+/);	//			470390546, 2018/11/16 13:36:51.009376, 0.063946, 

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

/*	SCSS+ ACC
formatをtextにしてもダメ。。。。
http://srweb-dmz-03.spring8.or.jp/cgi-bin/MDAQ/mdaq_plot.py?b=2018/11/02+10:29&e=2018/11/02+10:30&period=900&bel=be&format=plot&sampling=auto&_sig0=607249

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
//	console.log("url:\t"+ url);	
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
//				console.log("0:	"	+	result[0]	+	"1:	"	+	result[1]);
				res = result[0].split(" ");
				dat.push(parseFloat(res[3]));
//				return true;
			}
		});
//	//	console.log("lenght" + 	dat.length);
	console.log("dat[0] = " + 	dat[0] + "	dat[1] = " + 	dat[1]);

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
//	//	console.log("url:\t"+ url);	
		await page.goto(url, {waitUntil: "domcontentloaded"});

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
		if(dat.length==0) return;
		if(a==0) return dat[0];
		var val = await ave(dat);		
		return val;
	}catch (e) {
		console.log(e);
	//	console.log("Exception.");
		process.exit(200);
	}

	return -1;
}







//-------------------------------------------------------------------------------------
async function ave(dat) {

/*
	dat.forEach(function(v, i, a){
	  console.log(v);
	});
*/
		var sum  = function(dat) {
			return dat.reduce(function(prev, current, i, dat) {
				return prev+current;
			});
		};
		var average = function(dat, fn) {
			return sum(dat, fn)/dat.length;
		};
//	//	console.log( "average:	" +	average(dat) ); 

	return average(dat);
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
