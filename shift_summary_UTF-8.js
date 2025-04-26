/*
Usage:

babel-node shift_summary_UTF-8.js 石井
node shift_summary_UTF-8.js 石井

Necessary module
npm i puppeteer
npm install csv --save
npm install -g babel-cli
npm install  babel-preset-env
npm install ical
npm install dateformat
npm install date-utils
npm i readline-sync
.babelrc

nexeでコンパイル時、icalで引っかかるためnpm i -g bowser、util-deprecate、isarray、inherits、core-util-is等しないといけない
nexe shift_summary_UTF-8.js

端末によって、chrome.exeの場所が違うので書き直す必要有

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
const readlineSync = require('readline-sync');
const { exit } = require('process');



var text = 'this is text'
if ( !text.match(/text/)) {
  console.log('match!!');
}



let SCSS_K = readlineSync.question('SCSS K?');
console.log(`K	 ${SCSS_K}!`);
let SCSS_eV = readlineSync.question('SCSS eV?');
console.log(`eV	 ${SCSS_eV}!`);
let SCSS_uJ = readlineSync.question('SCSS uJ?');
console.log(`uJ	 ${SCSS_uJ}!`);



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
  walk() {
//	console.log(this._name + ' is walking');
  }
}







var sig1 = new Sig('scss_mode');
sig1.sid = '706314';
sig1.signame = 'scss_safety_oper_scss_beam_mode/status';	//'706314'
sig1.srv = 'xfweb-dmz-03.spring8.or.jp';
sig1.state = {
	'STANDBY': 1<<0,
	'NONE0': 1<<1,
	'GUN': 1<<2,
	'NONE1': 1<<3,
	'NONE2': 1<<4,
	'BL1': 1<<5,
	'NONE3': 1<<6,
	'NONE4': 1<<7,
	'NONE5': 1<<8,
	'NONE6': 1<<9,
	'GUNAGING': 1<<10,
	'NONE7': 1<<11,
	'NORMAL': 1<<12
};

var sig2 = new Sig('xfel_mode');
sig2.sid = '621540';
sig2.signame = 'xfel_safety_oper_beam_mode_normal/status';
sig2.srv = 'srweb-dmz-03.spring8.or.jp';
sig2.state = {
	'NONE0': 1<<0,
	'NONE1': 1<<1,
	'NONE2': 1<<2,
	'NONE3': 1<<3,
	'NONE4': 1<<4,
	'BL1': 1<<5,
	'BL2': 1<<6,
	'BL3': 1<<7,
	'BL4': 1<<8,
	'BL5': 1<<9,
	'NONE5': 1<<10,
	'XSBT': 1<<11
};

var bl1_charge = new Sig('sccharge');
bl1_charge.sigid = '703598';
bl1_charge.signame = 'scss_mon_ct_cb4_1/charge';
bl1_charge.srv = 'xfweb-dmz-03.spring8.or.jp';

var bl1_energy = new Sig('scss_energy');
bl1_energy.sid = '706184';
bl1_energy.signame = 'scss_safety_intlk_bis_energy_scss/data';
bl1_energy.srv = 'xfweb-dmz-03.spring8.or.jp';

var bl1_repetition = new Sig('scss_repetition');
bl1_repetition.sid = '706315';
bl1_repetition.signame = 'scss_safety_oper_scss_beam_set/repetition';
bl1_repetition.srv = 'xfweb-dmz-03.spring8.or.jp';

var bl2_spec = new Sig('bl2spec');
bl2_spec.signame = 'xfel_bl_2_tc_spec_1/energy';
bl2_spec.srv = 'websvr02.spring8.or.jp';

var bl3_spec = new Sig('bl3spec');
bl3_spec.signame = 'xfel_bl_3_tc_spec_1/energy';
bl3_spec.srv = 'websvr02.spring8.or.jp';

var mono_x = new Sig('mono_x');
mono_x.sid = '606616';
mono_x.signame = 'xfel_id_bl3_ssch_mono_1_x1/position';
mono_x.srv = 'srweb-dmz-03.spring8.or.jp';

var b_v_xsbt_1 = new Sig('b_v_xsbt_1');
b_v_xsbt_1.sid = '621567';
b_v_xsbt_1.signame = 'xfel_mag_ps_b_v_xsbt_1/current_adc';
b_v_xsbt_1.srv = 'srweb-dmz-03.spring8.or.jp';


//console.log(sig1.name + '\t' +sig1.signame + '\t' + sig1.sid + '\t'  + sig1.srv + '\t' + sig1.state.NORMAL);











//	START	-----------------------------------------------------------------------
( async() => {

	console.log(process.argv.length);
	for(var i = 0;i < process.argv.length; i++){
		console.log("argv[" + i + "] = " + process.argv[i]);
	}

	var now = new Date();
	const path = process.cwd();
/*	 Get txt file	& check file exist 	*/
	
//	console.log(process.cwd());
	var file = "sacla_watch_data.txt";
//	var cmd = "\"C:\\Program Files (x86)\\WinSCP\\WinSCP.exe\" /console /script=getscript.txt /parameter \"C:\\me\\puppeteer\" \"/home/xfel/xfelopr/bin/table/sacla_watch_data/sacla_watch_data.txt\"";
//	var cmd = "\"C:\\Program Files (x86)\\WinSCP\\WinSCP.exe\" /console /script=getscript.txt /parameter \".\" \"/home/xfel/xfelopr/bin/table/sacla_watch_data/sacla_watch_data.txt\"";
//	var cmd = "\"C:\\Program Files (x86)\\WinSCP\\WinSCP.exe\" /console /script=getscript.txt /parameter \"C:\\me\\bin\" \"/home/xfel/xfelopr/bin/table/sacla_watch_data/sacla_watch_data.txt\"";
	var cmd = "\"C:\\Program Files (x86)\\WinSCP\\WinSCP.exe\" /console /script=getscript.txt /parameter \"" + path +  "\" \"/home/xfel/xfelopr/bin/table/sacla_watch_data/sacla_watch_data.txt\"";
//"C:\Program Files (x86)\WinSCP\WinSCP.exe" /console /script=getscript.txt /parameter "C:\me\tmp\node" "/home/xfel/xfelopr/bin/table/sacla_watch_data/sacla_watch_data.txt"
//	console.log(cmd);
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
//		console.log('OK:	Exsit\t');
	}else{
		console.log('File not exist!\t'	+ file);
		process.exit(1);
	}


	process.stdout.write('working[.           ]\r');


/*	Read CSV File		 http://m-miya.blog.jp/archives/1071324649.html	*/
	const fs = require('fs');
	let data = fs.readFileSync(file);
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
		window.alert( "Matono is too old!" ) ;
		process.exit(1);
	}
	let array;
	try {
		const recodes = csvParseSync(data, { columns:true });
		array = recodes;
	} catch(err) {
		console.log(err);
	}
	console.log("Beam Route = 	" + array[0]["Beam Energy"]);
	console.log("Beam Route = 	" + array[1]["Beam Energy"]);
	console.log("BL Rep = 	" + array[0]["BL Rep"]);	
	console.log("BL Rep = 	" + array[1]["BL Rep"]);	
	console.log("Photon Energy = 	" + array[0]["Photon Energy"]);	
	console.log("Photon Energy = 	" + array[1]["Photon Energy"]);	


	if(array[0]["BL Rep"]==29 || array[0]["BL Rep"]==31){
		array[0]["BL Rep"] = 30;
		console.log("DEBUG~~~~~~~~~~~~~~~ 	" + array[0]["BL Rep"]);	
	}else{
		console.log("DEBUG!!!!!!!!!!!!!!!! 	" + array[0]["BL Rep"]);	
	}
	



/*	Get ical	*/
//	console.log("-------------------------------------------------");
	process.stdout.write('working[..          ]\r');
    BL1.summary = await Promise.all([Get_summary(BL1.url,1000)]);
//	console.log(BL1.summary);
    BL1T.summary = await Promise.all([Get_summary(BL1T.url,1000)]);
//	console.log(BL1T.summary);

	if ( (BL1.summary+BL1T.summary).match(/BL-study/)) {
	//	console.log("1" + BL1.summary);
	}else if( (BL1.summary+BL1T.summary).match(/BL調整/)){
	//	console.log("2" + BL1.summary);
	}else{
	//	console.log("3" + BL1.summary);
	}
	process.stdout.write('working[...         ]\r');
    BL2.summary = await Promise.all([Get_summary(BL2.url,1000)]);
//	console.log(BL2.summary);
    BL2T.summary = await Promise.all([Get_summary(BL2T.url,1000)]);
//	console.log(BL2T.summary);
	process.stdout.write('working[....        ]\r');
    BL3.summary = await Promise.all([Get_summary(BL3.url,1000)]);
//	console.log(BL3.summary);
    BL3T.summary = await Promise.all([Get_summary(BL3T.url,1000)]);
//	console.log(BL3T.summary);


	BL1.summary = ((BL1.summary+BL1T.summary) == "") ?	"SASE 加速器調整" : "SASE " + BL1.summary;
	BL2.summary = (BL2.summary+BL2T.summary) == "" ?	"SASE 加速器調整" : "SASE " + BL2.summary;
	BL3.summary = (BL3.summary+BL3T.summary) == "" ?	"SASE 加速器調整" : "SASE " + BL3.summary;
	// console.log(BL1.summary+BL1T.summary);
	// console.log(BL2.summary+BL2T.summary);
	// console.log(BL3.summary+BL3T.summary);
	
	process.stdout.write('working[.....       ]\r');

	OPRADMIN.summary = await Promise.all([Get_summary(OPRADMIN.url,1000)]);
//	console.log(OPRADMIN.summary);
	process.stdout.write('working[......      ]\r');

/* download operation stat */
	var dateformat = require('dateformat');
	var stodate = dateformat(now, 'yyyy/mm/dd+HH:MM:ss');
	var stadate = dateformat(now.setSeconds(now.getSeconds()-30), 'yyyy/mm/dd+HH:MM:ss');
//	var stadate = dateformat(now.setMinutes(now.getMinutes()-1), 'yyyy/mm/dd+HH:MM:ss');
//	stodate = "2018/11/02+11:50:32";
//	stadate = "2018/11/02+11:50:31";
//	console.log(stadate);
//	console.log(stodate);


	b_v_xsbt_1.data = await download(b_v_xsbt_1.srv, b_v_xsbt_1.sid, stadate,stodate, 1);
//	console.log(b_v_xsbt_1.name + '\t' + b_v_xsbt_1.signame +  '\t' + b_v_xsbt_1.data);
//	process.exit(1);


	mono_x.data = await download(mono_x.srv, mono_x.sid, stadate,stodate, 1);
//	console.log(mono_x.name + '\t' +mono_x.signame +  '\t' + mono_x.data);


	bl1_charge.data = await download(bl1_charge.srv, bl1_charge.sigid, stadate,stodate, 1);
//	console.log(bl1_charge.name + '\t' +bl1_charge.signame +  '\t' + bl1_charge.data);
	bl1_charge.data = ((bl1_charge.data.toPrecision(2))*1000).toFixed(0);	//有効2桁で小数点以下切捨て
//	bl1_charge.data = ( Math.round(bl1_charge.data * 100) / 100　)*1000;
	bl1_charge.data = ( Math.round(bl1_charge.data * 100) / 100　);
//	console.log(bl1_charge.name + '\t' +bl1_charge.signame +  '\t' + bl1_charge.data);
	process.stdout.write('working[.......     ]\r');


	bl2_spec.data = await download_expsyncdac(bl2_spec.srv, bl2_spec.signame, stadate,stodate, 1);
	bl2_spec.data = ( Math.round(bl2_spec.data * 10) / 10　);
	//console.log(bl2_spec.name + '\t' +bl2_spec.signame +  '\t' + bl2_spec.data);
	process.stdout.write('working[........    ]\r');

	bl3_spec.data = await download_expsyncdac(bl3_spec.srv, bl3_spec.signame, stadate,stodate, 1);
	bl3_spec.data = ( Math.round(bl3_spec.data * 10) / 10　);
	//console.log(bl3_spec.name + '\t' +bl3_spec.signame +  '\t' + bl3_spec.data);
	process.stdout.write('working[.........   ]\r');

//	let test8 = readlineSync.question('degug8');

	var SCSSMODE;
	sig1.data = await download(sig1.srv, sig1.sid, stadate,stodate, 0);
	if(sig1.data & sig1.state.NORMAL) {
//	//	console.log("HIGH\t " + sig1.data);
	}else{
//	//	console.log("LOW\t " + sig1.data);
	}
	SCSSMODE = (sig1.data & sig1.state.NORMAL)? "Tuning":"Normal";
//	console.log("SCSSMODE\t<" + SCSSMODE + ">");
	process.stdout.write('working[..........  ]\r');

	bl1_energy.data = await download(bl1_energy.srv, bl1_energy.sid, stadate,stodate, 0);
	bl1_energy.data = Math.round(bl1_energy.data * 100) / 100;
//	console.log("bl1_energy.data\t " + bl1_energy.data);

	bl1_repetition.data = await download(bl1_repetition.srv, bl1_repetition.sid, stadate,stodate, 0);
//	console.log("bl1_repetition.data\t " + bl1_repetition.data);
	process.stdout.write('working[........... ]\r');

	var BL2MODE;
	var BL3MODE;
	sig2.data = await download(sig2.srv, sig2.sid, stadate,stodate, 0);
////	console.log(sig2.name + '\t' +sig2.signame + '\t' + sig2.sid + '\t'  + sig2.srv + '\t' + 'Data:\t' +sig2.data);
	if(sig2.data & sig2.state.BL2) {
//	//	console.log("HIGH\t ");
	}else{
//	//	console.log("LOW\t ");
	}
	if(sig2.data & sig2.state.BL3) {
//	//	console.log("HIGH\t ");
	}else{
//	//	console.log("LOW\t ");
	}
	BL2MODE = (sig2.data & sig2.state.BL2)? "Normal":"Tuning";
	BL3MODE = (sig2.data & sig2.state.BL3)? "Normal":"Tuning";
//	console.log("BL2MODE\t<" + BL2MODE + ">");
//	console.log("BL3MODE\t<" + BL3MODE + ">");
	process.stdout.write('working[............]\r');


	
	// I-Spec
	if(array[0]["Photon Energy"] < 4.5){	
		//bl2_spec.data = readlineSync.question('BL2 Photon Energy?');
		//console.log(`BL2 Photon Energy 	 ${bl2_spec.data}!`);
		bl2_spec.data = array[0]["Photon Energy"];
	}
	if(array[1]["Photon Energy"] < 6.5){	
		//bl2_spec.data = readlineSync.question('BL3 Photon Energy?');
		//console.log(`BL3 Photon Energy 	 ${bl2_spec.data}!`);
		bl3_spec.data = array[1]["Photon Energy"];
	}
	console.log("bl2_spec.data:	" + bl2_spec.data);



		
//--------------------------------------------------------------------

	if(mono_x.data > 0){	
		console.log(`\n\n\n Self-seed	\n\n\n `);
		array[1]["Pulse Energy"] = readlineSync.question('BL3 uJ?');
		console.log(`BL3	uJ:		 ${array[1]["Pulse Energy"]}!`);
		array[1]["K"] = readlineSync.question('BL3 K?');
		console.log(`BL3 K:	 ${array[1]["Pulse Energy"]}!`);
		BL3.summary = BL3.summary.replace( 'SASE', 'シード' );
	}

	
//--------------------------------------------------------------------

//--------------------------------------------------------------------



//--------------------------------------------------------------------

	console.log('DEBUG a\t');

//--------------------------------------------------------------------
	if (! (BL1.summary+BL1T.summary).match(/eV/)) {
		BL1T.summary = BL1T.summary + SCSS_eV + "eV ";
	}
    if(! (BL1.summary+BL1T.summary).match(/Hz/)){
		BL1T.summary = BL1T.summary + bl1_repetition.data.toString() + "Hz";
	}

	if (! (BL2.summary+BL2T.summary).match(/eV/)) {
		BL2T.summary = BL2T.summary + bl2_spec.data.toString() + "keV ";
	}
	if(! (BL2.summary+BL2T.summary).match(/Hz/)){
		BL2T.summary = BL2T.summary + array[0]["BL Rep"] + "Hz";
	}

	if (! (BL3.summary+BL3T.summary).match(/eV/)) {
		BL3T.summary = BL3T.summary + bl3_spec.data.toString() + "keV ";
	}
    if(! (BL3.summary+BL3T.summary).match(/Hz/)){
		BL3T.summary = BL3T.summary + array[1]["BL Rep"] + "Hz";
	}
	console.log(BL1.summary+BL1T.summary);
	console.log(BL2.summary+BL2T.summary);
	console.log(BL3.summary+BL3T.summary);
//--------------------------------------------------------------------

//	process.exit(200);
	console.log('DEBUG b\t');

/*	launch browser	*/
	const browser = await puppeteer.launch({
//		executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // for compile with "nexe"
		executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // for compile with "nexe"

		headless: false,
		"ignoreHTTPSErrors" : true,
		"slowMo" : 70,

		args: [
		  //'--proxy-server=192.168.100.252:8080',
		  //'--window-size=1000,900',
		  //'--window-position=0,0',
		  '--start-maximized',
		  '--no-sandbox'
		]
	});

	const page = await browser.newPage();

	await page.setViewport({width: 1600, height: 950});



  try {
  	
//	await page.goto('http://saclaopr19.spring8.or.jp/~summary/display_ui.html', {waitUntil: "domcontentloaded"});

	await page.goto('http://saclaopr19.spring8.or.jp/~summary/display_ui.html?sort=main_id%20desc&limit=0,3#EDIT', {waitUntil: "domcontentloaded"});

	

	await page.waitForSelector('#new');
	await page.click('#new');
	await page.waitForSelector('#edit');
	await page.click('#edit');

//	await page.waitFor('input[name=officer]');
	await page.waitForSelector('input[name="officer"]', {visible: true});

//	await page.focus('input[name=officer]','');
	await page.type('input[name=officer]', '');	//TEST
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=officer]', OPRADMIN.summary);

//	await page.type('input[name=oper]', "石井、久保田、住友、篠本、内村");
	console.log(process.argv[2]);
	if(process.argv.length>=3){
		console.log(process.argv[2]);
		await page.type('input[name=oper]', process.argv[2]);
	}

/*	User status */
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
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	if(b_v_xsbt_1.data > 100){	
		await page.keyboard.type('SR入射');
	}else{
		await page.keyboard.type('-');
	}
	



	


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

	await page.focus('input[name=intensity]', "");
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=intensity]', SCSS_uJ);

	await page.focus('input[name=k_value]', "");
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=k_value]', SCSS_K);
/**/
/**/
	console.log("Debug 	SCSSMODE <" + SCSSMODE +">");
//	await page.select('select[name="mode"]', SCSSMODE);
	if(SCSSMODE=="Normal"){
		await page.select('select[name="mode"]', "Normal");
	}else{
		await page.select('select[name="mode"]', "Tuning");
	}

	await page.focus('input[name=photon_energy]', "");	
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=photon_energy]', SCSS_eV);	
/**/

	
	await page.focus('input[name=repetition]', "");
	await page.keyboard.down('Control');
	await page.keyboard.press('KeyA');
	await page.keyboard.up('Control');
	await page.keyboard.press('Backspace');
	await page.type('input[name=repetition]', bl1_repetition.data.toString());

//	console.log("Debug 	bl1_repetition = 	" +bl1_repetition.data.toString());

		
//	
	if ( (BL1.summary+BL1T.summary).match(/BL-study/)) {
		console.log("1" + BL1.summary+BL1T.summary);
		await page.select('select[name="situation"]', 'BL-study');
	}else if( (BL1.summary+BL1T.summary).match(/BL調整/)){
		console.log("2" + BL1.summary+BL1T.summary);
		await page.select('select[name="situation"]', 'BL調整');
	}else if( (BL1.summary+BL1T.summary).match(/加速器調整/)){
		console.log("3" + BL1.summary+BL1T.summary);
		await page.select('select[name="situation"]', '加速器調整');
	}else{
		console.log("Notmatch" + BL1.summary+BL1T.summary);	
		await page.select('select[name="situation"]', 'ユーザー運転');
	}

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
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');
	if(BL2MODE=="Tuning"){
		await page.keyboard.press('ArrowDown');	
	}

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
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');	
	if ( (BL2.summary+BL2T.summary).match(/BL-study/)) {
		console.log("1" + BL2.summary+BL2T.summary);
	}else if( (BL2.summary+BL2T.summary).match(/BL調整/)){
		console.log("2" + BL2.summary+BL2T.summary);
		await page.keyboard.press('ArrowDown');
	}else if( (BL2.summary+BL2T.summary).match(/加速器調整/)){
		console.log("3" + BL2.summary+BL2T.summary);
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
	}else{
		console.log("4" + BL2.summary+BL2T.summary);	
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
	}





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
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');
	if(BL3MODE=="Tuning"){
		await page.keyboard.press('ArrowDown');	
	}

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



	await page.keyboard.press('Tab');
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('ArrowUp');	
	if ( (BL3.summary+BL3T.summary).match(/BL-study/)) {
		console.log("1" + BL3.summary+BL3T.summary);
	}else if( (BL3.summary+BL3T.summary).match(/BL調整/)){
		console.log("2" + BL3.summary+BL3T.summary);
		await page.keyboard.press('ArrowDown');
	}else if( (BL3.summary+BL3T.summary).match(/加速器調整/)){
		console.log("3" + BL3.summary+BL3T.summary);
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
	}else{
		console.log("4" + BL3.summary+BL3T.summary);	
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
	}







	// TEST
//	await page.focus('#wpcf7-f97-p311-o1 > form > p:nth-child(2) > label > span > input');
	await page.focus('form > div > div > div > div > table > tbody > tr > td > input');
	await page.keyboard.type('TEST');
//	await page.focus('#photon_energy');
//DAME	let items = await page.$$('input[name=repetition]');
//DAME	let pickup = await items[1];
//DAME	await page.type(pickup, "TESTETESES");
	






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
async function download_accsyncdac(srv, sid, sta, sto, a) {
	var url = 'http://SRV/cgi-bin/MDAQ/mdaq_sync_plot.py?daq_type=1&lsig=SID&Selection=Time&begin_bt=STA&end_bt=STO&filter=time&sampling=-1&repetition_rate=30&remainder=0&data_order=asc&Command=text';

	url = url.replace( "SRV", srv );
	url = url.replace( "SID", sid );
	url = url.replace( "STA", sta );
	url = url.replace( "STO", sto );
	
	const browser = await puppeteer.launch({
//			executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // for compile nexe
			executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // for compile nexe

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
		if(dat.length==0) return -1;
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
//			executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // for compile nexe
			executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // for compile nexe
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
		if(dat.length==0) return -1;
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

//	console.log(url);
	
	const browser = await puppeteer.launch({
//			executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // for compile nexe
			executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // for compile nexe
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
		if(dat.length==0) return -1;
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
