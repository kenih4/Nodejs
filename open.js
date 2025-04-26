/*
Usage:

babel-node shift_summary_UTF-8.js

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


const parser = require('ical');
const dateformat = require('dateformat');
const fs = require('fs');	//ES6	import * as fs from "fs";
const csvParseSync = require('csv-parse/lib/sync');	//ES6	import csvParseSync from "csv-parse/lib/sync";
const puppeteer = require('puppeteer');
process.on('unhandledRejection', console.dir);









//	START	-----------------------------------------------------------------------
( async() => {


	
	


	



/*	launch browser	*/
	const browser = await puppeteer.launch({
		executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // for compile with "nexe"

		headless: false,
		"ignoreHTTPSErrors" : true,
		"slowMo" : 10,

		args: [
		  //'--proxy-server=192.168.100.252:8080',
		  //'--window-size=1000,900',
		  //'--window-position=0,0',
		  '--start-maximized',
		  '--no-sandbox'
		]
	});


	var page = [];

	for (var i=0; i<5; i++) {
		page[i] = await browser.newPage();
		await page[i].setViewport({width: 1600, height: 950});
	}

/*
	const page0 = await browser.newPage();
	const page1 = await browser.newPage();

	await page0.setViewport({width: 1600, height: 950});
	await page1.setViewport({width: 1600, height: 950});
*/


  try {

	
	await page[0].goto('http://xayagiku.spring8.or.jp/status.sacla/BL1/index.html', {waitUntil: "domcontentloaded"});
	await page[1].goto('http://xayagiku.spring8.or.jp/status.sacla/BL2/index.html', {waitUntil: "domcontentloaded"});
	await page[2].goto('http://xayagiku.spring8.or.jp/status.sacla/BL3/index.html', {waitUntil: "domcontentloaded"});
	
	await page[3].goto('http://saclaopr19.spring8.or.jp/~summary/display_ui.html', {waitUntil: "domcontentloaded"});

	await page[4].goto('http://saclaopr19.spring8.or.jp/~sp8/shiftsummary/serch.html', {waitUntil: "domcontentloaded"});
	await page[4].waitForSelector('input[name="serch"]');
	await page[4].click('input[name="serch"][value="Past_7days"]');



//	await page[0].bringToFront();

/*	
	await page0.goto('http://saclaopr19.spring8.or.jp/~summary/display_ui.html', {waitUntil: "domcontentloaded"});
	await page1.goto('http://saclaopr19.spring8.or.jp/~sp8/shiftsummary/serch.html', {waitUntil: "domcontentloaded"});

	
	http://xayagiku.spring8.or.jp/status.sacla/BL2/index.html
	http://xayagiku.spring8.or.jp/status.sacla/BL3/index.html

	await page1.waitForSelector('input[name="serch"]');
//<input type="submit" name="serch" value="Past_7days"></input>
await page1.click('input[name="serch"][value="Past_7days"]');
//await page.click('input[name="publish"]');
*/





//	await page1.waitForSelector('#Past_7days');
//	await page1.click('#Past_7days');

	/*

//<button class="new_form" id="new" type="button">新規作成</button>
	await page.waitForSelector('#new');
	await page.click('#new');
	await page.waitForSelector('#edit');
	await page.click('#edit');

//	await page.waitFor('input[name=officer]');
	await page.waitForSelector('input[name="officer"]', {visible: true});

	await page.focus('input[name=officer]','');
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=officer]', OPRADMIN.summary);

//	await page.type('input[name=oper]', "石井、真殿");
	await page.type('input[name=user_status]', '');
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(BL1.summary + BL1T.summary);

	await page.keyboard.press('Tab');
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(BL2.summary + BL2T.summary);
	await page.keyboard.press('Tab');
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(BL3.summary + BL3T.summary);
	await page.keyboard.press('Tab');
	await page.keyboard.type('-');
	
	


//	console.log("Debug 	bl1_energy.data <" + bl1_energy.data.toString() +">");

	await page.focus('input[name=beam_energy]','');
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=beam_energy]', bl1_energy.data.toString());

	await page.focus('input[name=charge]', "");
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=charge]', bl1_charge.data.toString());	
/*
	await page.focus('input[name=intensity]', "");
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=intensity]', "test");

	await page.focus('input[name=k_value]', "");
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=k_value]', "test");
	
	await page.focus('input[name=repetition]', "");
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=repetition]', bl1_repetition.data.toString());

//	console.log("Debug 	bl1_repetition = 	" +bl1_repetition.data.toString());

		
//	await page.select('select[name="situation"]', 'ユーザー運転');
	await page.keyboard.press('Tab');

	await page.keyboard.press('Tab');
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[0]["Beam Energy"]);
//	console.log("Debug 	array[0][Beam Energy]= 	" + array[0]["Beam Energy"]);
	
	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[0]["RFDEF CT"]);
	
	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[0]["Pulse Energy"]);

	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[0]["K"]);

	await page.keyboard.press('Tab');
	if(BL2MODE=="Normal") await page.keyboard.press('ArrowUp');	

	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(bl2_spec.data.toString());

	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[0]["BL Rep"]);

	

	await page.keyboard.press('Tab');

	await page.keyboard.press('Tab');
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[1]["Beam Energy"]);
//	console.log("Debug 	array[1][Beam Energy]= 	" + array[1]["Beam Energy"]);
	
	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[1]["RFDEF CT"]);
	
	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[1]["Pulse Energy"]);

	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[1]["K"]);

	await page.keyboard.press('Tab');
	if(BL3MODE=="Normal") await page.keyboard.press('ArrowUp');	

	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(bl3_spec.data.toString());

	await page.keyboard.press('Tab');	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.keyboard.type(array[1]["BL Rep"]);









	// TEST
//	await page.focus('#wpcf7-f97-p311-o1 > form > p:nth-child(2) > label > span > input');
	await page.focus('form > div > div > div > div > table > tbody > tr > td > input');
	await page.keyboard.type('TEST');
//	await page.focus('#photon_energy');
//DAME	let items = await page.$$('input[name=repetition]');
//DAME	let pickup = await items[1];
//DAME	await page.type(pickup, "TESTETESES");
	


*/



    // 検索結果のページタイトルを取得してコンソールへ表示
    //const links = await page.evaluate(() => {
    //  const anchors = Array.from(document.querySelectorAll('h3 a'));
    //  return anchors.map(anchor => anchor.textContent);
    //});
    //console.log(links.join('\n'));

    // 検索結果のページのリンクを適当選んでクリック
    //let linkElmList = await page.$$('h3.r a');
    //let target = getRandomArbitary(0, 4);
    //await linkElmList[target].click({waitUntil: 'networkidle2', timeout: 2500});

  }
  catch (e) {
//	console.log(e);
//	console.log("Exception.");
    await browser.close();
    process.exit(200);
  }
  
  
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
async function download_expsyncdac(srv, signame, sta, sto, a) {
	var url = 'http://SRV/plot_multi.cgi?&Command=data&LeftSignals=SIGNAME&LeftMax=&LeftMin=&LeftLogy=&RightSignals=&RightMax=&RightMin=&RightLogy=&XSignals=&XMax=&XMin=&XLog=&XY=Trend&BeginTime=STA&EndTime=STO&Selection=Time';

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
	//	console.log(e);
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
//		//	console.log(s + "\t"+ i);
			var result = i.match(/\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}.\d{6},\s.+,\s.+,\s.+/);
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
	//	console.log(e);
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
