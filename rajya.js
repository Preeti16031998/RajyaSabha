fetch('http://localhost:3000/rajyasabha').then(function (response) {
  return response.json();
}).then(function (data) {
  var col = [];
  for (var i = 0; i < data.length; i++) {
    for (var key in data[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  var table = document.createElement("table");
  var tr = table.insertRow(-1);
  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  for (var i = 0; i < data.length; i++) {
    tr = table.insertRow(-1);
    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = data[i][col[j]];
    }
  }
  var cont = document.getElementById('container');
  cont.innerHTML = "";
  cont.append(table);

  // var minis=[];
  // for(var i=0;i<data.length;i++){
  //   if(minis.indexOf(data[i].ministry)===-1){
  //     minis.push(data[i].ministry);
  //   }
  // }
  // console.log(minis);

  var map = new Map();
  for (var i = 0; i < data.length; i++) {
    if (!map.has(data[i].ministry)) {
      map.set(data[i].ministry, 1);
    }
    else {
      let x = map.get(data[i].ministry);
      x++;
      map.delete(data[i].ministry);
      map.set(data[i].ministry, x);
    }
  }
  //console.log(map);

  var bararray = [];
  var ministry=[];
  var i = 0;
  map.forEach((value, key) => {
    ministry[i]=key;
    bararray[i] = value;
    i++;
  })
  //console.log(bararray);

  d3.select(".chart")
    .selectAll("div")
    .data(bararray)
    .enter().append("div")
    .style("width", function (d) { return d  + "px"; })
    .style("background-color","blue")
    .style("padding","2px")
    .style("margin","5px")
    .text(function (d) { return d; });
});

function searchfunc() {
  var inp = document.getElementById('myInput');
  var filter = inp.value.toUpperCase();
  var tab = document.getElementsByTagName('table');
  var tr = document.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}