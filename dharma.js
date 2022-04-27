var ctx = document.getElementById("myChart");
var jsonData = [];
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["2015-01", "2015-02", "2015-03", "2015-04", "2015-05", "2015-06", "2015-07", "2015-08", "2015-09", "2015-10", "2015-11", "2015-12"],
    datasets: [{
      label: `Session's Data`,
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    scales: {
      xAxes: [{
        ticks: {
          maxRotation: 90,
          minRotation: 80
        },
          gridLines: {
          offsetGridLines: true // à rajouter
        }
      },
      {
        position: "top",
        ticks: {
          maxRotation: 90,
          minRotation: 80
        },
        gridLines: {
          offsetGridLines: true // et matcher pareil ici
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

function appendChartData(event) {
 var x = document.getElementById("email").value;
 console.log(x);
 const sample = jsonData.filter((data) => {
   if(data.Email===x) {
     return data.userdata;
   }
 });
  let usersessiondata = sample[0].userdata
  myChart.data.labels = usersessiondata.map((data) => {
        return data.date;
      });
  myChart.data.datasets = [{
      data: usersessiondata.map((data) => {
          return data.Duration;
      }),
      label:  x + " Session Attendence",
      borderWidth: 1,
      borderColor: "#953553",


  }]
  myChart.update();
}

function getBatchJson() {
  var x = document.getElementById("batches").value;
  fetch(x + ".json")
  .then(response => response.json())
  .then(json => {
    jsonData = json;
    for (const item of jsonData)
    {
        var option = document.createElement("option");
        option.value = item.Email;
        option.text = item.Email;
        select.appendChild(option);
    }});
    var select = document.createElement("select");
    select.name = "email";
    select.id = "email";
    select.onchange = appendChartData;
    
    var label = document.createElement("label");
    label.innerHTML = "Choose Email Id: "
    label.htmlFor = "email";
    document.getElementById("container").appendChild(label).appendChild(select);
}

