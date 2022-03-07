document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('.sidebar .sidebar-link').forEach(function(element){
    
    element.addEventListener('click', function (e) {

      let nextEl = element.nextElementSibling;
      let parentEl  = element.parentElement;	

        if(nextEl) {
            e.preventDefault();	
            let mycollapse = new bootstrap.Collapse(nextEl);
            
            if(nextEl.classList.contains('show')){
              mycollapse.hide();
            } else {
                mycollapse.show();
                // find other submenus with class=show
                var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                // if it exists, then close all of them
                if(opened_submenu){
                  new bootstrap.Collapse(opened_submenu);
                }
            }
        }
    }); // addEventListener
  }) // forEach
}); 

sidebar = document.getElementById('sidebarMenu');
function sidebarToggle ()
{
  if (sidebar.classList.contains('hide')) {
    sidebar.classList.add('show');
    sidebar.classList.remove('hide');
  } else {
    sidebar.classList.add('hide');
    sidebar.classList.remove('show');
  }
}

/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Graphs
var ctx = document.getElementById('myChart')

  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: [
          15339,
          21345,
          18483,
          24003,
          19489,
          24092,
          22034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#FFCCCC',
        borderWidth: 4,
        pointBackgroundColor: '#FF97CC'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })

  var data = {
    labels: [
      "Cocina",
      "Utensilios",
      "Recetas",
      "Electrodomestidos"
    ],
    datasets: [
      {
        data: [170, 50, 70, 90],
        backgroundColor: [
          "#F0B2D0",
          "#F7BFD8",
          "#FBD5E5",
          "#FDEAF2"
        ],
        hoverBackgroundColor: [
          "#DF92B2",
          "#E2AFC5",
          "#FABEC0",
          "#FBC5FF"
        ]
      }]
  };
  var promisedDeliveryChart = new Chart(document.getElementById('myChart2'), {
    type: 'doughnut',
    data: data,
    options: {
       responsive: true,
      legend: {
        display: false
      }
    }
    
  });
  
})()



