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



700001~ scss_llrf
700243~ scss_tmg
700434~ scss_util
700958~ scss_vac
701248~ scss_rf
702540~ scss_util
702772~ scss_mag
703154~ scss_tmg  この辺乱れてる
703241~ scss_mon
704824~ scss_ct
705062~ scss_id
706075~ scss_safety
706378~ scss_tmg_bl1
707350まで完了

*/

'use strict';

const dateformat = require('dateformat');
const fs = require('fs');	//ES6	import * as fs from "fs";
const csvParseSync = require('csv-parse/lib/sync');	//ES6	import csvParseSync from "csv-parse/lib/sync";
const puppeteer = require('puppeteer');
process.on('unhandledRejection', console.dir);





 

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








//	START	-----------------------------------------------------------------------
( async() => {

	fs.writeFileSync( "output.txt" , "テキストファイルの中身" );

	var now = new Date();
	const path = process.cwd();





	/* download operation stat */
//	console.log("-------------------------------------------------");
	var dateformat = require('dateformat');
	var stodate = dateformat(now, 'yyyy/mm/dd+HH:MM:ss');
	var stadate = dateformat(now.setSeconds(now.getSeconds()-3), 'yyyy/mm/dd+HH:MM:ss');
//	var stadate = dateformat(now.setMinutes(now.getMinutes()-1), 'yyyy/mm/dd+HH:MM:ss');
//	stodate = "2018/11/02+11:50:32";
//	stadate = "2018/11/02+11:50:31";
//	console.log(stadate);
//	console.log(stodate);


  for(let i = 704340; i < 799999; i++) {   // 7000000 ~ 704340まで完了
//	for(let i = 703578; i < 799999; i++) {
		var ans = await get_sigid(i);
		
		ans = ans + "\r\n";
		console.log(i +  '\t' + ans);
		appendFile("all.txt", ans);

		if ( ans.match(/_bpm_/) && ans.match(/charge/)) {
			appendFile("bpm_charge.txt", ans);
		}else if( ans.match(/_bpm_/) && ans.match(/_x\/position/)){
			appendFile("bpm_x_position.txt", ans);		appendFile("bpm_charge.txt", "\n");
		}else if( ans.match(/_bpm_/) && ans.match(/_y\/position/)){
			appendFile("bpm_y_position.txt", ans);		appendFile("bpm_charge.txt", "\n");
		}else if( ans.match(/_bpm_/) && ans.match(/phase/)){
			appendFile("bpm_phase.txt", ans);		appendFile("bpm_charge.txt", "\n");
		}else if( ans.match(/_msbpm_/) && ans.match(/_x\/position/)){
			appendFile("msbpm_x_position.txt", ans);
		}else if( ans.match(/_msbpm_/) && ans.match(/_y\/position/)){
			appendFile("msbpm_y_position.txt", ans);
		}else if( ans.match(/_msbpm_/) && ans.match(/_x\/width/)){
			appendFile("bpm_x_width.txt", ans);
		}else if( ans.match(/_ct_/) && ans.match(/charge/)){
			appendFile("ct_charge.txt", ans);
		}else if( ans.match(/_llrf_/) && ans.match(/ave\/amplitude/)){
			appendFile("llrf_ave_amplitude.txt", ans);
		}else if( ans.match(/_llrf_/) && ans.match(/ave\/phase/)){
			appendFile("llrf_ave_phase.txt", ans);
		}else if( ans.match(/_llrf_/) && ans.match(/ta\/amplitude/)){
			appendFile("llrf_ta_amplitude.txt", ans);
		}else if( ans.match(/_llrf_/) && ans.match(/ta\/phase/)){
			appendFile("llrf_ta_phase.txt", ans);
		}else if( ans.match(/_llrf_/) && ans.match(/_ta\/voltage/)){
			appendFile("llrf_ta_voltage.txt", ans);
		}else if( ans.match(/_llrf_/) && ans.match(/_tb\/voltage/)){
			appendFile("llrf_tb_voltage.txt", ans);
		}else if( ans.match(/_llrf_/) && ans.match(/_ta\/current/)){
			appendFile("llrf_ta_current.txt", ans);
		}else if( ans.match(/_llrf_/) && ans.match(/_tb\/current/)){
			appendFile("llrf_tb_current.txt", ans);
		}else if( ans.match(/_csr_/) && ans.match(/_adc\/voltage/)){
			appendFile("csr_adc_voltage.txt", ans);
		}else{

		}
	}





  
})();






//ファイルの追記関数
function appendFile(path, data) {
  fs.appendFile(path, data, function (err) {
    if (err) {
        throw err;
    }
  });
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
async function get_sigid(sid) {
	var url = 'http://xfweb-dmz-03.spring8.or.jp/cgi-bin/MDAQ/mdaq_config.py?sig_id=SID'

	url = url.replace( "SID", sid );
	
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
		await page.goto(url, {waitUntil: "domcontentloaded"});

		const fsout = require('fs');
		var html = await page.evaluate(() => {	//page.evaluateメソッドで通常のJavaScript記述可
			return document.getElementsByTagName('h3')[0].innerHTML
		});
		
//  	await fsout.writeFileSync('out.html', html);
//		console.log("html = 	\n" + html);
		html = html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
		html = html.replace(/Signal name: /g,'');
		html = html.replace(/\(ID:/g,'');
		html = html.replace(/\)/g,'');
		html = html.replace( ' ', ',' );
//		html = html + '\n';
//		console.log("html = 	\n" + html);
		await browser.close();
		return html;
	}catch (e) {
		console.log(e);
		process.exit(200);
	}

	return -1;
}









