/*
Usage:

node get_shift_situation_by_NewModule.js SCSS

Necessary module
npm install -g  puppeteer
npm install -g csv --save
npm install -g babel-cli
npm install -g @babel/preset-env	// 以下は古い　npm install -g babel-preset-env
npm install node-ical --prefix c:/module_of_Nodejs   		//icalが脆弱性のためnode-icalに変更　また、ライブラリなので、c:/module_of_Nodejs　に入れるようにした
npm install dateformat --prefix c:/module_of_Nodejs
npm install date-utils --prefix c:/module_of_Nodejs

npm install clipboardy --prefix c:/module_of_Nodejs      この方法でやって他のもimportでしないと行けない模様   clipboardy@4.0.0 は ESM（ECMAScript Module）専用 になっていて、CommonJS (require()) でそのまま使うと期待通りに動作しません。Node.js が clipboardy をオブジェクトとして読み込んでいるが、write 関数が存在しないのはこのためです。
#npm install clipboardy@3  --prefix c:/module_of_Nodejs 	ダメ		clipboardy@3.0.0 以前は CommonJS (require()) に対応しているので、ダウングレードすればこれまで通りの書き方で動作します。


.babelrc

npm list --depth=0   でローカルインストールしたモジュールの確認
npm list -g          でグローバルインストールしたモジュールの確認

特定のモジュールがインストールされているか確認
npm list clipboardy
npm list -g clipboardy

nexeでコンパイル時、icalで引っかかるためnpm i -g bowser、util-deprecate、isarray、inherits、core-util-is等しないといけない
*/

'use strict';


//import * as csv from "csv";
//import csvParse from "csv-parse";


/*
グローバル (-g)でインストールしたモジュールはrequireする必要なし
※　node-ical は CLI ツールではなくライブラリなので、グローバルに入れても意味がないんです。　
モジュールの種類				インストール方法				使い方
ライブラリ系（例: node-ical）	npm install（ローカル）			require() で読み込む
CLIツール系（例: nodemon）		npm install -g					コマンドラインで実行
*/

const parser = require('C:\\module_of_Nodejs\\node_modules\\node-ical');//旧　const parser = require('ical');
console.log("typeof(parser) = " + typeof(parser));
const dateformat = require('C:\\module_of_Nodejs\\node_modules\\dateformat');
console.log("typeof(dateformat) = " + typeof(dateformat));
const fs = require('fs');	//ES6	import * as fs from "fs";
//const {csvParseSync} = require('csv-parse/sync'); //古いconst csvParseSync = require('csv-parse/lib/sync');	//ES6	import csvParseSync from "csv-parse/lib/sync";
//const puppeteer = require('puppeteer');
process.on('unhandledRejection', console.dir);
//const copy = require('clipboard-copy');


//import clipboard from 'C:\\module_of_Nodejs\\node_modules\\clipboardy';ダメ
//import clipboard from 'C:\module_of_Nodejs\node_modules\clipboardy';ダメ
//import clipboard from 'C:\/module_of_Nodejs\/node_modules\/clipboardy';ダメ
//const clipboard = require('C:\\module_of_Nodejs\\node_modules\\clipboardy');ダメ
//clipboard.write("fdafs");ダメ
// const clipboardy = require('C:\\module_of_Nodejs\\node_modules\\clipboardy');
// clipboardy.write('Hello, world!');

//import clipboardy from 'clipboardy';
// import clipboardy from 'C:\\module_of_Nodejs\\node_modules\\clipboardy';
// clipboardy.write('Hello, world!');


//	--- Define 
class ICAL {
  constructor(name) {
    this.name = name;
  }
  set name(name) {
    this._name = name;
  }
  set url(url) {
    this._url = url;
  }
  set summary(summary) {
    this._summary = summary;
  }
  get name() {
    return this._name;
  }
  get url() {
    return this._url;
  }
  get summary() {
    return this._summary;
  }
  walk() {
//	console.log(this._name + ' is walking');
  }
}
 
var BL1 = new ICAL('BL1');
BL1.url = 'http://calsrv01.spring8.or.jp/davical/public.php/plan/BL1?ticket=4BY9wtIG';
var BL1T = new ICAL('BL1T');
BL1T.url = 'http://calsrv01.spring8.or.jp/davical/public.php/plan/BL1tuning?ticket=gqrMjPyN';
var BL2 = new ICAL('BL2');
BL2.url = 'http://calsrv01.spring8.or.jp/davical/public.php/plan/BL2?ticket=W67M6dJF';
var BL2T = new ICAL('BL2T');
BL2T.url = 'http://calsrv01.spring8.or.jp/davical/public.php/plan/BL2tuning?ticket=2xBwKpji';
var BL3 = new ICAL('BL3');
BL3.url = 'http://calsrv01.spring8.or.jp/davical/public.php/plan/BL3?ticket=oGtBR6Qy';
var BL3T = new ICAL('BL3T');
BL3T.url = 'http://calsrv01.spring8.or.jp/davical/public.php/plan/BL3tuning?ticket=BUejCUVJ';
var OPRADMIN = new ICAL('OPRADMIN');
OPRADMIN.url = "http://calsrv01.spring8.or.jp/davical/public.php/plan/officer?ticket=9GeU0BlZ";







//	START	-----------------------------------------------------------------------
( async() => {



/* */
	console.log("process.argv.length = " + process.argv.length);
	for(var i = 0;i < process.argv.length; i++){
		console.log("argv[" + i + "] = " + process.argv[i]);
	}
	

	const path = process.cwd();	

	var file = "shift_situation.txt";
	var out = ">本シフトの運転状況<\r\n";

	var now = new Date();
/*
	var dateformat = require('dateformat');
	var stodate = dateformat(now, 'yyyy/mm/dd+HH:MM:ss');
	var stadate = dateformat(now.setSeconds(now.getSeconds()-3), 'yyyy/mm/dd+HH:MM:ss');
*/
	var hour = now.getHours();
//	console.log("hours:	" + hour);

	var choku=0;

//	console.log("now.getFullYear:	" + now.getFullYear());
//	console.log("now.getMonth:	" + now.getMonth());
//	console.log("now.getDate:	" + now.getDate());

	/**/
	if(hour>=0 && hour <8){
		choku=2;
		var sta = new Date(now.getFullYear(),now.getMonth(),now.getDate()-1,17,0);
		var sto = new Date(now.getFullYear(),now.getMonth(),now.getDate(),1,0);
	}else if(hour>=8 && hour <16){
		choku=3;
		var sta = new Date(now.getFullYear(),now.getMonth(),now.getDate(),1,0);
		var sto = new Date(now.getFullYear(),now.getMonth(),now.getDate(),9,0);
	}else if(hour>=16){
		choku=1;
		var sta = new Date(now.getFullYear(),now.getMonth(),now.getDate(),9,0);
		var sto = new Date(now.getFullYear(),now.getMonth(),now.getDate(),17,0);	
	}
	
	console.log(choku	+ "choku:	"	+ sta + "	->	"	+ sto);
/*
	var dt = new Date();
//	var dt = dt.setDate(dt.getDate() - 3);

	console.log(now);
	console.log(dt);
	
	var dtshow = dateformat(dt, 'yyyy/mm/dd+HH:MM:ss');
	console.log(dtshow);

 
	var newdt = new Date( 2019, 1, 31, 22, 0 );
	console.log("newdt:	" + newdt);
//   var newdt = new Date( process.argv[2], process.argv[3]-1, process.argv[4], process.argv[5], process.argv[6] );
*/


/*	Get ical	*/
console.log("-------------------------------------------------");

if(process.argv[2]=="SCSS"){
		console.log(BL1.url);
		BL1.summary = await Promise.all([Get_summary(BL1.url,1000,sta)]);
		BL1T.summary = await Promise.all([Get_summary(BL1T.url,1000,sta)]);
		if((BL1.summary + BL1T.summary) == "") BL1.summary = "None"
		var BL1sum = BL1.summary + BL1T.summary;		
		BL1.summary = await Promise.all([Get_summary(BL1.url,1000,sto)]);
		BL1T.summary = await Promise.all([Get_summary(BL1T.url,1000,sto)]);
		if((BL1.summary + BL1T.summary) == "") BL1.summary = "None"
			console.log(BL1.summary + BL1T.summary);
		if(BL1sum != (BL1.summary + BL1T.summary)){
			BL1sum += " -> " + BL1.summary + BL1T.summary;
		}
		BL1sum = " BL1: " + BL1sum;
		console.log("BL1sum:	" + BL1sum);
		var out = out + BL1sum;
		console.log("out:	" + out);

}else if(process.argv[2]=="SACLA"){

		BL2.summary = await Promise.all([Get_summary(BL2.url,1000,sta)]);
		BL2T.summary = await Promise.all([Get_summary(BL2T.url,1000,sta)]);
		if((BL2.summary + BL2T.summary) == "") BL2.summary = "None"
		var BL2sum = BL2.summary + BL2T.summary;		
		BL2.summary = await Promise.all([Get_summary(BL2.url,1000,sto)]);
		BL2T.summary = await Promise.all([Get_summary(BL2T.url,1000,sto)]);
		if((BL2.summary + BL2T.summary) == "") BL2.summary = "None"
		console.log(BL2.summary + BL2T.summary);
		if(BL2sum != (BL2.summary + BL2T.summary)){
			BL2sum += " -> " + BL2.summary + BL2T.summary;
		}
		BL2sum = " BL2: " + BL2sum;
		//console.log(BL2sum);

    BL3.summary = await Promise.all([Get_summary(BL3.url,1000,sta)]);
		BL3T.summary = await Promise.all([Get_summary(BL3T.url,1000,sta)]);
		if((BL3.summary + BL3T.summary) == "") BL3.summary = "None"
		var BL3sum = BL3.summary + BL3T.summary;
    BL3.summary = await Promise.all([Get_summary(BL3.url,1000,sto)]);
		BL3T.summary = await Promise.all([Get_summary(BL3T.url,1000,sto)]);
		if((BL3.summary + BL3T.summary) == "") BL3.summary = "None"
		if(BL3sum != (BL3.summary + BL3T.summary)){
			BL3sum += " -> " + BL3.summary + BL3T.summary;
		}
		BL3sum = " BL3: " + BL3sum;
		//console.log(BL3.summary + BL3T.summary);
		//console.log(BL3sum);
		var out = out + BL2sum + " \r\n" + BL3sum;
		console.log(out);
}


		clipboard.writeSync(out);
		await writeFile(file, out);



})();





// Get Summary from ical--------------------------------------------
async function Get_summary(passVal, msec, setdate) {
	return new Promise(resolve => {
	  setTimeout(async () => {
		try {




var savepath = "tmp.ical"
await deleteFile(savepath);  // 削除完了を待つ
console.log('A	次の処理へ進みます');


await downloadFile(passVal, savepath);// ダウンロード完了を待つ
console.log('B	次の処理へ進みます');
			const data = await parser.parseFile(savepath);// ← コールバックではなく Promise    node-ical はコールバック形式ではなく、Promise形式
		    console.log("4	>>>>>>>>>>>>>.passVal = " +    passVal);  
			
		  for (const key in data) {
			const plan = data[key];
			const diff_sta = setdate.getTime() - plan.start;
			const diff_end = plan.end - setdate.getTime();
			if (diff_sta > 0 && diff_end > 0) {
				console.log(plan.start);
				console.log("typeof(dateformat) = " + typeof(dateformat));
				//console.log(dateformat(plan.start, 'yyyy/mm/dd+HH:MM:ss'));
//				console.log(dateformat(plan.start, 'yyyy/mm/dd+HH:MM:ss') + "\t" + dateformat(plan.end, 'yyyy/mm/dd+HH:MM:ss') + "\t" + plan.summary);
			  return resolve(plan.summary);
			}
		  }
		  resolve("");
		} catch (err) {
		  console.error("Error@Get_summary :	", err);
		  resolve("");
		}
	  }, msec);
	});
  }






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
    
	console.log(data);
  });
}

//ファイルの書き込み関数
function writeFile(path, data) {
  fs.writeFile(path, data, function (err) {
    if (err) {
        throw err;
    }
  });
}

//ファイルの追記関数
function appendFile(path, data) {
  fs.appendFile(path, data, function (err) {
    if (err) {
        throw err;
    }
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
	console.log("url:\t"+ url);	
		await page.goto(url, {waitUntil: "domcontentloaded"});

		const fsout = require('fs');
		var html = await page.evaluate(() => {	//page.evaluateメソッドで通常のJavaScript記述可
			return document.getElementsByTagName('form')[0].innerHTML
		}); 
	//	await fsout.writeFileSync('out.html', html);
		html = html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
		console.log("html = 	\n" + html);
		
		var resArray = html.split("\n");
		var res;
		Array.prototype.some.call(resArray, function(i,s) {
		console.log("DEBUG:	" + s + "\t"+ i);
//			var result = i.match(/\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}.\d{6},\s.+,\s.+,\s.+/);	//2018/11/01 16:41:28.523955, None, 60, None
			var result = i.match(/\d{9}\s\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}.\d{6}\s.+/);	//393466247 2018-11-01 17:28:58.152670 1.00291e+01 		
			if(result){
				console.log("0:	"	+	result[0]	+	"1:	"	+	result[1]);
				res = result[0].split(" ");
				dat.push(parseFloat(res[3]));
//				return true;
			}
		});
	console.log("lenght" + 	dat.length);
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
		console.log("url:\t"+ url);	
		await page.goto(url, {waitUntil: "domcontentloaded"});

		const fsout = require('fs');
		var html = await page.evaluate(() => {	//page.evaluateメソッドで通常のJavaScript記述可
			return document.getElementsByTagName('textarea')[0].innerHTML
		}); 
	//	await fsout.writeFileSync('out.html', html);
		console.log("html = 	\n" + html);
		var resArray = html.split("\n");
		var res;
		Array.prototype.some.call(resArray, function(i,s) {
		console.log(s + "\t"+ i);
			var result = i.match(/\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}.\d{3},\s.+,\s.+,\s.+/);
			if(result){
				res = result[0].split(",");
				if(res[2] === " 8.88e+32") {
					console.log("Err data ");
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







const fs_p = require('fs/promises');
const { exit } = require('process');

async function deleteFile(filepath) {
	try {
	  await fs_p.unlink(filepath);
	  console.log(`${filepath} を削除しました`);
	} catch (err) {
	  console.error(`削除失敗: ${err.message}`);
	}
  }

async function downloadFile(url, filename) {
  const res = await fetch(url);
  const data = await res.text(); // または res.arrayBuffer() や res.json()

  await fs_p.writeFile(filename, data);
  console.log(`${filename} を保存しました`);
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
