/* -------------------------------------- Création du graph ------------------------------------ */

new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: SickHistoricAggregated.date, //
    datasets: [{ 
        data: SickHistoricAggregated.sick, //
        label: "personnes Infectées",
        borderColor: "#3e95cd",
        fill: false,
		borderWidth: 2,
		pointRadius:3,
		pointHoverRadius:4,
        lineTension: 0
      }, { 
        data: SickHistoricAggregated.dead, //
        label: "Morts",
        borderColor: "#FC3D32",
        fill: false,
		borderWidth: 2,
		pointRadius:3,
		pointHoverRadius:4,
        lineTension: 0
      }
    ]
  },
  options: {
	maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Evolution du COVID-19',
	  padding:15
    },
	legend: {
		display: false,
	},
	scales: {
		yAxes: [{
			scaleLabel: {
			display: false,
			labelString: 'Nombre de cas',
			ticks: {
				callback: function(value) {if (value % 1 === 0) {return value;}} // keep integer only
			},
			}
		}],
		xAxes :[{
			labels: SickHistoricAggregated.day, //
			scaleLabel: {
			display: true,
			labelString: 'Jours depuis le 1er infecté (20-03-2020)',
			ticks: {
			},
			}
		}]
	}
  }
});
Chart.defaults.global.defaultFontColor = '#bdbdbd';

//Chart.defaults.global.elements.line.backgroundColor = 
