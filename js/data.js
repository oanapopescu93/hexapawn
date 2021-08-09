var nr = 200;
var enemy_moves_data = [];

$(document).ready(function(){
	if (window.innerWidth < 960){
		if(window.innerHeight < window.innerWidth){
			//small landscape				
			nr = 200;				
		} else {
			//small portrait
			nr = 100;
		}			
	} else {
		//big
		nr = 200;
	}

	enemy_moves_data = 
	[
		[
			{
				pattern_id: '2-0',
				pattern: {
					you: [{x: 0, y: 1*nr},{x: 1*nr, y: 2*nr},{x: 2*nr, y: 2*nr}],
					enemy: [{x: 0, y: 0},{x: 1*nr, y: 0},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 0, x2: 0, y2: 1*nr},
					{c:1, x1: 1*nr, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:2, x1: 2*nr, y1: 0, x2: 2*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '2-1',
				pattern: {
					you: [{x: 0, y: 2*nr},{x: 1*nr, y: 1*nr},{x: 2*nr, y: 2*nr}],
					enemy: [{x: 0, y: 0},{x: 1*nr, y: 0},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 0, y1: 0, x2: 0, y2: 1*nr},
					{c:1, x1: 0, y1: 0, x2: 1*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '2-2',//
				pattern: {
					you: [{x: 0, y: 2*nr},{x: 0, y: 2*nr},{x: 2*nr, y: 1*nr}],
					enemy: [{x: 0, y: 0},{x: 1*nr, y: 0},{x: 2*nr, y: 0}]
				},
				choice: [
					//{c:0, x1: 0, y1: 0, x2: 0, y2: 1*nr},
					//{c:1, x1: 1*nr, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:2, x1: 1*nr, y1: 0, x2: 2*nr, y2: 1*nr},
				]
			},
		],
		[
			{
				pattern_id: '4-0',
				pattern: {
					you: [{x: 1*nr, y: 1*nr},{x: 2*nr, y: 2*nr}],
					enemy: [{x: 0, y: 0},{x: 0, y: 1*nr},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 0, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:1, x1: 0, y1: 1*nr, x2: 0, y2: 2*nr},
					{c:2, x1: 2*nr, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:3, x1: 2*nr, y1: 0, x2: 2*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '4-1',
				pattern: {
					you: [{x: 0, y: 1*nr},{x: 2*nr, y: 2*nr}],
					enemy: [{x: 1*nr, y: 0},{x: 1*nr, y: 1*nr},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 1*nr, x2: 0, y2: 1*nr},
					{c:1, x1: 2*nr, y1: 0, x2: 2*nr, y2: 1*nr},
					{c:2, x1: 1*nr, y1: 1*nr, x2: 1*nr, y2: 2*nr},
					{c:3, x1: 1*nr, y1: 1*nr, x2: 2*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '4-2',
				pattern: {
					you: [{x: 0, y: 1*nr},{x: 1*nr, y: 1*nr}, {x: 1*nr, y: 2*nr}],
					enemy: [{x: 0, y: 0},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 0, y1: 0, x2: 0, y2: 1*nr},
					{c:1, x1: 2*nr, y1: 0, x2: 2*nr, y2: 1*nr},
					{c:2, x1: 2*nr, y1: 0, x2: 1*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '4-3',
				pattern: {
					you: [{x: 0, y: 1*nr},{x: 2*nr, y: 1*nr}, {x: 2*nr, y: 2*nr}],
					enemy: [{x: 0, y: 0},{x: 1*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 0, x2: 0, y2: 1*nr},
					{c:1, x1: 1*nr, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:2, x1: 1*nr, y1: 0, x2: 2*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '4-4',
				pattern: {
					you: [{x: 0, y: 2*nr},{x: 2*nr, y: 1*nr}],
					enemy: [{x: 1*nr, y: 0},{x: 1*nr, y: 1*nr},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 0, x2: 2*nr, y2: 1*nr},
					{c:1, x1: 1*nr, y1: 1*nr, x2: 1*nr, y2: 2*nr},
					{c:2, x1: 1*nr, y1: 1*nr, x2: 0, y2: 2*nr},
				]
			},
			{
				pattern_id: '4-5',
				pattern: {
					you: [{x: 0, y: 2*nr},{x: 1*nr, y: 1*nr},{x: 2*nr, y: 1*nr}],
					enemy: [{x: 0, y: 1*nr},{x: 1*nr, y: 0},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 0, x2: 2*nr, y2: 1*nr},
					{c:1, x1: 2*nr, y1: 0, x2: 1*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '4-6',
				pattern: {
					you: [{x: 0, y: 0},{x: 0, y: 1*nr},{x: 2*nr, y: 0}],
					enemy: [{x: 0, y: 1*nr},{x: 1*nr, y: 0},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 0, y1: 1*nr, x2: 0, y2: 2*nr},
					{c:1, x1: 0, y1: 1*nr, x2: 1*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '4-7',
				pattern: {
					you: [{x: 0, y: 1*nr},{x: 1*nr, y: 1*nr},{x: 2*nr, y: 1*nr}],
					enemy: [{x: 0, y: 0},{x: 1*nr, y: 0},{x: 2*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 0, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:1, x1: 1*nr, y1: 0, x2: 0, y2: 1*nr},
				]
			},
			{
				pattern_id: '4-8',
				pattern: {				
					you: [{x: 1*nr, y: 1*nr},{x: 2*nr, y: 2*nr}],
					enemy: [{x: 1*nr, y: 0},{x: 2*nr, y: 0}],
				},
				choice: [
					{c:0, x1: 2*nr, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:1, x1: 2*nr, y1: 0, x2: 2*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '4-9',
				pattern: {				
					you: [{x: 1*nr, y: 1*nr},{x: 0, y: 2*nr}],
					enemy: [{x: 1*nr, y: 0},{x: 2*nr, y: 0}],
				},
				choice: [
					{c:0, x1: 2*nr, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:1, x1: 2*nr, y1: 0, x2: 2*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '4-10',
				pattern: {
					you: [{x: 0, y: 1*nr},{x: 2*nr, y: 2*nr}],
					enemy: [{x: 0, y: 0},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 2*nr, y1: 0, x2: 2*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '4-11',//
				pattern: {
					you: [{x: 0, y: 1*nr},{x: 1*nr, y: 2*nr}],
					enemy: [{x: 0, y: 0},{x: 2*nr, y: 0},{x: 2*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 2*nr, y1: 1*nr, x2: 2*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '4-12',//
				pattern: {
					you: [{x: 0, y: 2*nr},{x: 1*nr, y: 1*nr}],
					enemy: [{x: 0, y: 0},{x: 2*nr, y: 0},{x: 2*nr, y: 1*nr}]
				},
				choice: [
					//{c:0, x1: 2*nr, y1: 1*nr, x2: 2*nr, y2: 2*nr},
					{c:1, x1: 2*nr, y1: 0, x2: 1*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '4-13',//
				pattern: {
					you: [{x: 0, y: 0},{x: 2*nr, y: 1*nr}],
					enemy: [{x: 0, y: 0},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 0, y1: 0, x2: 0, y2: 1*nr},
				]
			},
		],
		[
			{
				pattern_id: '6-0',
				pattern: {
					you: [{x: 2*nr, y: 1*nr}],
					enemy: [{x: 0, y: 1*nr},{x: 1*nr, y: 1*nr},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 0, y1: 1*nr, x2: 0, y2: 2*nr},
					{c:1, x1: 1*nr, y1: 1*nr, x2: 1*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '6-1',
				pattern: {
					you: [{x: 0, y: 1*nr},{x: 1*nr, y: 1*nr},{x: 2*nr, y: 1*nr}],
					enemy: [{x: 0, y: 0}]
				},
				choice: [
					{c:0, x1: 0, y1: 0, x2: 1*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '6-2',
				pattern: {
					you: [{x: 1*nr, y: 1*nr},{x: 2*nr, y: 1*nr}],
					enemy: [{x: 0, y: 1*nr},{x: 1*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 0, y1: 1*nr, x2: 0, y2: 2*nr},
					{c:1, x1: 1*nr, y1: 0, x2: 2*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '6-3',
				pattern: {
					you: [{x: 0, y: 1*nr},{x: 1*nr, y: 1*nr}],
					enemy: [{x: 1*nr, y: 0},{x: 2*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 0, x2: 0, y2: 1*nr},
					{c:1, x1: 2*nr, y1: 1*nr, x2: 2*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '6-4',
				pattern: {
					you: [{x: 2*nr, y: 1*nr}],
					enemy: [{x: 0, y: 0},{x: 0, y: 1*nr}, {x: 1*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 0, y1: 1*nr, x2: 0, y2: 2*nr},
					{c:1, x1: 1*nr, y1: 1*nr, x2: 1*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '6-5',
				pattern: {
					you: [{x: 0, y: 1*nr}],
					enemy: [{x: 1*nr, y: 1*nr},{x: 2*nr, y: 0},{x: 2*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 1*nr, x2: 1*nr, y2: 2*nr},
					{c:1, x1: 2*nr, y1: 1*nr, x2: 2*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '6-6',
				pattern: {
					you: [{x: 1*nr, y: 1*nr}],
					enemy: [{x: 0, y: 1*nr},{x: 2*nr, y: 0}]
				},
				choice: [
					{c:0, x1: 0, y1: 1*nr, x2: 0, y2: 2*nr},
					{c:1, x1: 2*nr, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:2, x1: 2*nr, y1: 0, x2: 2*nr, y2: 1*nr},
				]
			},
			{
				pattern_id: '6-7',
				pattern: {
					you: [{x: 0, y: 1*nr}],
					enemy: [{x: 1*nr, y: 0},{x: 1*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 0, x2: 0, y2: 1*nr},
					{c:1, x1: 1*nr, y1: 1*nr, x2: 1*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '6-8',
				pattern: {
					you: [{x: 2*nr, y: 1*nr}],
					enemy: [{x: 1*nr, y: 0},{x: 1*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 0, x2: 2*nr, y2: 1*nr},
					{c:1, x1: 1*nr, y1: 1*nr, x2: 1*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '6-9',
				pattern: {
					you: [{x: 1*nr, y: 1*nr}],
					enemy: [{x: 0, y: 0},{x: 0, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 0, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:1, x1: 0, y1: 1*nr, x2: 0, y2: 2*nr},
				]
			},
			{
				pattern_id: '6-10',
				pattern: {
					you: [{x: 1*nr, y: 1*nr}],
					enemy: [{x: 2*nr, y: 0},{x: 2*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 2*nr, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:1, x1: 2*nr, y1: 1*nr, x2: 2*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '6-11',
				pattern: {
					you: [{x: 0, y: 1*nr}],
					enemy: [{x: 0, y: 0},{x: 1*nr, y: 1*nr},{x: 2*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 1*nr, y1: 1*nr, x2: 1*nr, y2: 2*nr},
					{c:1, x1: 2*nr, y1: 1*nr, x2: 2*nr, y2: 2*nr},
				]
			},
			{
				pattern_id: '6-12',
				pattern: {
					you: [{x: 1*nr, y: 1*nr}],
					enemy: [{x: 0, y: 0},{x: 2*nr, y: 1*nr}]
				},
				choice: [
					{c:0, x1: 0, y1: 0, x2: 0, y2: 1*nr},
					{c:1, x1: 0, y1: 0, x2: 1*nr, y2: 1*nr},
					{c:1, x1: 2*nr, y1: 1*nr, x2: 2*nr, y2: 2*nr},
				]
			},
		],
	]
});







