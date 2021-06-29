// const sortable = await import('./sortable.min.js');
// sortable.init();
import('../assets/sortable.min.js');
import lodash from 'lodash';
import axios from 'axios';
import moment from 'moment';
moment.locale('th');

console.log("Hello World!");

// Copied from https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
async function tableFromJson() {
	// the json data. (you can change the values for output.)
	const Tasks = (await axios.get('https://omsinkrissada.sytes.net/api/homework/list')).data;
	// const Tasks = (await axios.get('http://localhost:3003/list')).data;
	// const Tasks = [
	// 	{
	// 		"id": 2,
	// 		"name": "Poster \"COVID เป็นเหตุ AC สังเกตได้\"",
	// 		"detail": "ออกแบบโปสเตอร์และใส่เพลง intro ให้มี 4 คอร์ดหลัก",
	// 		"dueDate": null,
	// 		"dueTime": null
	// 	},
	// 	{
	// 		"id": 10,
	// 		"name": "present ทวีป social",
	// 		"detail": "งานกลุ่ม 3-4 คน",
	// 		"dueDate": null,
	// 		"dueTime": null
	// 	},
	// 	{
	// 		"id": 35,
	// 		"name": "ใบงานร่ายกาย สุขฯ",
	// 		"detail": "[Link ใบงาน](http://classroom.assumption.ac.th/Files/MultiMedia/5ba214f4-3c19-47cd-9341-9debc3ba3b3c/6a7796bf-bf3f-4702-8f1a-eabd95295e23.pdf)",
	// 		"dueDate": "2021-06-29T17:00:00.000Z",
	// 		"dueTime": null
	// 	},
	// 	{
	// 		"id": 37,
	// 		"name": "mindmap ฟิสิกส์",
	// 		"detail": null,
	// 		"dueDate": "2021-07-01T17:00:00.000Z",
	// 		"dueTime": null
	// 	}
	// ];


	var col = [];
	for (var i = 0; i < Tasks.length; i++) {
		for (var key in Tasks[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}


	// Create table header row using the extracted headers above.
	let tr = document.getElementById('table-header-row');                   // table row.

	for (var i = 0; i < col.length; i++) {
		var th = document.createElement("th");      // table header.
		if (col[i] === 'dueDate') {
			th.setAttribute('data-sorted', 'true');
			th.setAttribute('data-sorted-direction', "ascending");
		}
		th.innerHTML = lodash.startCase(col[i]);
		tr.appendChild(th);
	}

	// add json data to the table as rows.
	const val = document.getElementById('table-value');
	for (var i = 0; i < Tasks.length; i++) {

		// tr = table.insertRow(-1);
		const row = document.createElement('tr');

		for (var j = 0; j < col.length; j++) {
			// var tabCell = tr.insertCell(-1);
			const value = Tasks[i][col[j]];
			let cell = document.createElement('td');

			if (col[j] === 'dueDate') {
				cell.setAttribute('data-value', value != null ? moment(value).valueOf() : 16249860000000);
				value = value != null ? moment(value).format('L') : '';
			}

			cell.innerHTML = value;
			row.appendChild(cell);
		}
		val.appendChild(row);
	}

	// Now, add the newly created table with json data, to a container.
	// var divShowData = document.getElementById('showData');
	// divShowData.innerHTML = "";
	// divShowData.appendChild(table);
	// console.log('appended');
}
tableFromJson().then(() => {
	const table = document.getElementById('the-table');
	table.setAttribute('data-sortable', '');
	Sortable.initTable(table);
});